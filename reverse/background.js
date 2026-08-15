const API_BASE_URL = 'https://tibiabot.online/api';
const SITE_URL = 'https://tibiabot.online/';
const SITE_URLS = ['https://tibiabot.online/', 'https://www.tibiabot.online/'];
const SESSION_COOKIE = 'TIBIAPASS';
const AUTH_STORAGE = {
  loggedIn: 'tibiaBotLoggedIn',
  user: 'tibiaBotUser',
  checkedAt: 'tibiaBotAuthCheckedAt',
  vip: 'tibiaBotVip',
  contaStatus: 'tibiaBotContaStatus'
};

const VERSION_STORAGE = {
  required: 'tibiaBotRequiredVersion',
  installed: 'tibiaBotInstalledVersion',
  outdated: 'tibiaBotExtensionOutdated',
  checkedAt: 'tibiaBotVersionCheckedAt',
  message: 'tibiaBotVersionMessage'
};
const VIP_ALARM_EXPIRE = 'tibiaBotVipExpire';
const VIP_ALARM_POLL = 'tibiaBotVipPoll';
const PLAY_URL_HINT = 'https://baiakidle.com/jogar/';

function getInstalledExtensionVersion() {
  try {
    const manifest = chrome.runtime.getManifest?.() || {};
    return String(manifest.version || '').trim();
  } catch (_) {
    return '';
  }
}

/** client >= required → true */
function isExtensionVersionAllowed(clientVersion, requiredVersion) {
  const client = String(clientVersion || '').trim();
  const required = String(requiredVersion || '').trim();
  if (!client || !required) return false;

  const pa = client.split('.').map((p) => Number(p) || 0);
  const pb = required.split('.').map((p) => Number(p) || 0);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i += 1) {
    const a = pa[i] || 0;
    const b = pb[i] || 0;
    if (a > b) return true;
    if (a < b) return false;
  }
  return true;
}

async function persistVersionState({ required, outdated, message }) {
  const installed = getInstalledExtensionVersion();
  await chrome.storage.local.set({
    [VERSION_STORAGE.required]: required || '',
    [VERSION_STORAGE.installed]: installed,
    [VERSION_STORAGE.outdated]: !!outdated,
    [VERSION_STORAGE.checkedAt]: Date.now(),
    [VERSION_STORAGE.message]: message || ''
  });
  return {
    installed,
    required: required || '',
    outdated: !!outdated,
    message: message || ''
  };
}

async function fetchRequiredVersionFromApi() {
  const installed = getInstalledExtensionVersion();
  const urls = [
    `${API_BASE_URL}/version.php`
  ];

  for (const url of urls) {
    try {
      const res = await fetch(`${url}?v=${Date.now()}`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-Extension-Version': installed
        }
      });
      const data = await res.json().catch(() => null);
      if (data && data.requiredVersion) {
        const required = String(data.requiredVersion).trim();
        const outdated = data.allowed === false || !isExtensionVersionAllowed(installed, required);
        return persistVersionState({
          required,
          outdated,
          message: outdated
            ? data.message ||
              `Atualize a extensão. Mínima: ${required} (você tem ${installed || '?'}).`
            : ''
        });
      }
    } catch (_) {}
  }
  return null;
}

async function applyExtensionPayload(extension) {
  if (!extension || typeof extension !== 'object') return null;
  const required = String(extension.requiredVersion || '').trim();
  if (!required) return null;
  const installed = getInstalledExtensionVersion();
  const outdated =
    extension.allowed === false || !isExtensionVersionAllowed(installed, required);
  return persistVersionState({
    required,
    outdated,
    message: outdated
      ? extension.message ||
        `Atualize a extensão. Mínima: ${required} (você tem ${installed || '?'}).`
      : ''
  });
}

async function getVersionGate() {
  const data = await chrome.storage.local.get([
    VERSION_STORAGE.required,
    VERSION_STORAGE.outdated,
    VERSION_STORAGE.message,
    VERSION_STORAGE.checkedAt
  ]);
  const age = Date.now() - (Number(data[VERSION_STORAGE.checkedAt]) || 0);
  if (!data[VERSION_STORAGE.required] || age > 5 * 60 * 1000) {
    const fresh = await fetchRequiredVersionFromApi();
    if (fresh) return fresh;
  }
  const installed = getInstalledExtensionVersion();
  const required = String(data[VERSION_STORAGE.required] || '').trim();
  const outdated =
    !!data[VERSION_STORAGE.outdated] ||
    (required ? !isExtensionVersionAllowed(installed, required) : false);
  return {
    installed,
    required,
    outdated,
    message: data[VERSION_STORAGE.message] || ''
  };
}

async function assertExtensionUpToDate() {
  const gate = await getVersionGate();
  if (gate.outdated) {
    await stopAllModulesOnPlayTabs();
    throw new Error(
      gate.message ||
        `Extensão desatualizada. Mínima: ${gate.required} (você tem ${gate.installed || '?'}).`
    );
  }
  return gate;
}

/** produto_id no banco → bot da extensão */
const BOT_PRODUCT_ID = {
  baiak_idle: 1
};

function isBaiakIdlePlayUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const u = new URL(url);
    const host = String(u.hostname || '').toLowerCase();
    if (host !== 'baiakidle.com' && host !== 'www.baiakidle.com') return false;
    const path = String(u.pathname || '');
    return path === '/jogar' || path === '/jogar/' || path.startsWith('/jogar/');
  } catch (_) {
    return false;
  }
}

/** Home do Baiak Idle (ex.: https://baiakidle.com/), sem /jogar/. */
function isBaiakIdleHomeUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const u = new URL(url);
    const host = String(u.hostname || '').toLowerCase();
    if (host !== 'baiakidle.com' && host !== 'www.baiakidle.com') return false;
    const path = String(u.pathname || '');
    return path === '/' || path === '';
  } catch (_) {
    return false;
  }
}

const RECONECT_ALARM = 'tibiaBotReconectTick';
const RECONECT_POLL_MS = 5000;
let reconectIntervalId = null;
let reconectBusy = false;

async function queryBaiakIdleTabs() {
  try {
    return (
      (await chrome.tabs.query({
        url: [
          'https://baiakidle.com/*',
          'https://www.baiakidle.com/*',
          'https://baiakidle.com/',
          'https://www.baiakidle.com/'
        ]
      })) || []
    );
  } catch (_) {
    return [];
  }
}

async function tickReconect() {
  if (reconectBusy) return;
  reconectBusy = true;
  try {
    const meta = MODULES.reconect;
    if (!meta) return;
    const data = await chrome.storage.local.get(meta.storageKey);
    if (!data[meta.storageKey]) return;

    const auth = await requireAuth().catch(() => null);
    if (!auth?.loggedIn || !auth?.vip) return;
    if (!isVipForProduct(auth.contaStatus, meta.productId)) return;

    const tabs = await queryBaiakIdleTabs();
    let hasPlay = false;
    /** @type {chrome.tabs.Tab[]} */
    const homeTabs = [];
    for (const tab of tabs) {
      if (isBaiakIdlePlayUrl(tab?.url)) hasPlay = true;
      else if (isBaiakIdleHomeUrl(tab?.url)) homeTabs.push(tab);
    }
    if (hasPlay || !homeTabs.length) return;

    const target = homeTabs.find((t) => t?.id) || null;
    if (!target?.id) return;

    const playHost = String(new URL(target.url).hostname || 'baiakidle.com');
    await chrome.tabs.update(target.id, {
      url: `https://${playHost}/jogar/`
    });
  } catch (err) {
    console.warn('[Tibia Bot] Reconect falhou:', err?.message || err);
  } finally {
    reconectBusy = false;
  }
}

async function startReconectWatcher() {
  if (reconectIntervalId == null) {
    reconectIntervalId = setInterval(() => {
      void tickReconect();
    }, RECONECT_POLL_MS);
  }
  try {
    await chrome.alarms.create(RECONECT_ALARM, {
      periodInMinutes: Math.max(1, Math.ceil(RECONECT_POLL_MS / 60000))
    });
  } catch (_) {}
  void tickReconect();
}

async function stopReconectWatcher() {
  if (reconectIntervalId != null) {
    clearInterval(reconectIntervalId);
    reconectIntervalId = null;
  }
  try {
    await chrome.alarms.clear(RECONECT_ALARM);
  } catch (_) {}
}

async function syncReconectWatcherFromStorage() {
  const meta = MODULES.reconect;
  if (!meta) return;
  const data = await chrome.storage.local.get(meta.storageKey);
  if (data[meta.storageKey]) {
    await startReconectWatcher();
  } else {
    await stopReconectWatcher();
  }
}

const AUTOBOSS_CYCLE_ALARM = 'tibiaBotAutoBossCycle';
/** Horário local do reinício automático diário (jogo zera à 00:00). */
const AUTOBOSS_CYCLE_HOUR = 0;
const AUTOBOSS_CYCLE_MINUTE = 5;
const STORAGE_KEY_AUTOBOSS_AUTO_CYCLE = 'baiakIdleAutoBossAutoCycle';
const STORAGE_KEY_AUTOBOSS_CYCLE_STARTED_AT = 'baiakIdleAutoBossCycleStartedAt';
const STORAGE_KEY_AUTOBOSS_PLAYLIST = 'baiakIdleAutoBossPlaylist';
const STORAGE_KEY_AUTOBOSS_PRESETS = 'baiakIdleAutoBossPresets';
const STORAGE_KEY_AUTOBOSS_SOLO_ESCAPE = 'baiakIdleAutoBossSoloEscape';
const STORAGE_KEY_AUTOBOSS_FIGHT_TIMER = 'baiakIdleAutoBossFightTimer';
const STORAGE_KEY_AUTOBOSS_END_HELPER_EQUIP = 'baiakIdleAutoBossEndHelperEquip';
const STORAGE_KEY_BOSS_TRACK = 'baiakIdleBossTrack';
const STORAGE_KEY_AUTOBOSS_RUN = 'baiakIdleAutoBossRun';
let autoBossCycleBusy = false;

function clampAutoBossPresetId(raw) {
  const n = Number(raw);
  return n === 2 || n === 3 ? n : 1;
}

/**
 * Próximo 00:05 local estritamente após `fromMs`.
 * Ex.: fez hoje 14h → amanhã 00:05; alarm às 00:05 → próximo dia 00:05.
 */
function nextAutoBossCycleDueAt(fromMs) {
  const from = Math.max(0, Number(fromMs) || Date.now());
  const d = new Date(from);
  const due = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    AUTOBOSS_CYCLE_HOUR,
    AUTOBOSS_CYCLE_MINUTE,
    0,
    0
  );
  if (due.getTime() <= from) {
    due.setDate(due.getDate() + 1);
  }
  return due.getTime();
}

/** Fim do cooldown do boss: próxima meia-noite local após o âncora (reset diário do jogo). */
function bossDailyCooldownExpiresAt(fromMs) {
  const from = Math.max(0, Number(fromMs) || Date.now());
  const d = new Date(from);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, 0, 0, 0, 0).getTime();
}

/**
 * Playlist usada ao iniciar (ciclo diário 00:05 / background).
 * Preferência: baiakIdleAutoBossPresets.sets[active]; senão lista legada.
 */
function resolveAutoBossPlaylistFromStorage(stored) {
  const presets = stored?.[STORAGE_KEY_AUTOBOSS_PRESETS];
  if (presets && typeof presets === 'object') {
    const sets =
      presets.sets && typeof presets.sets === 'object' ? presets.sets : presets;
    const active = clampAutoBossPresetId(presets.active);
    const list = sets[active] != null ? sets[active] : sets[String(active)];
    if (Array.isArray(list)) return list;
  }
  return Array.isArray(stored?.[STORAGE_KEY_AUTOBOSS_PLAYLIST])
    ? stored[STORAGE_KEY_AUTOBOSS_PLAYLIST]
    : [];
}

function isBossOnCooldownForCycle(track) {
  if (!track || typeof track !== 'object') return false;
  const finished = !!(track.finished || track.killed || track.died);
  const startedAt = Number(track.startedAt) || 0;
  if (!finished && !startedAt) return false;
  const anchor = Number(track.finishedAt) || startedAt || 0;
  if (anchor) {
    // Reset diário do jogo (00:00): disponível a partir da meia-noite seguinte.
    return Date.now() < bossDailyCooldownExpiresAt(anchor);
  }
  const expiresAt = Number(track.expiresAt) || 0;
  return expiresAt > Date.now();
}

function buildEligibleAutoBossQueue(playlist, trackById) {
  const byId = trackById && typeof trackById === 'object' ? trackById : {};
  return (Array.isArray(playlist) ? playlist : [])
    .map((entry) => {
      const id = String(entry?.id || '').trim();
      const name = String(entry?.name || id).trim();
      if (!id || !name) return null;
      if (isBossOnCooldownForCycle(byId[id])) return null;
      return { id, name };
    })
    .filter(Boolean);
}

async function queryBaiakIdlePlayTabs() {
  try {
    return (
      (await chrome.tabs.query({
        url: [
          'https://baiakidle.com/jogar',
          'https://baiakidle.com/jogar/*',
          'https://www.baiakidle.com/jogar',
          'https://www.baiakidle.com/jogar/*'
        ]
      })) || []
    );
  } catch (_) {
    return [];
  }
}

async function clearAutoBossCycleAlarm() {
  try {
    await chrome.alarms.clear(AUTOBOSS_CYCLE_ALARM);
  } catch (_) {}
}

async function scheduleAutoBossCycleAlarm(whenMs) {
  const when = Math.max(Date.now() + 5000, Number(whenMs) || 0);
  try {
    await chrome.alarms.create(AUTOBOSS_CYCLE_ALARM, { when });
  } catch (err) {
    console.warn('[Tibia Bot] AutoBoss ciclo: falha ao agendar', err?.message || err);
  }
}

async function syncAutoBossCycleSchedule() {
  const data = await chrome.storage.local.get([
    STORAGE_KEY_AUTOBOSS_AUTO_CYCLE,
    STORAGE_KEY_AUTOBOSS_CYCLE_STARTED_AT
  ]);
  if (!data[STORAGE_KEY_AUTOBOSS_AUTO_CYCLE]) {
    await clearAutoBossCycleAlarm();
    return;
  }
  const startedAt = Number(data[STORAGE_KEY_AUTOBOSS_CYCLE_STARTED_AT]) || 0;
  if (!startedAt) {
    await clearAutoBossCycleAlarm();
    return;
  }

  const dueAt = nextAutoBossCycleDueAt(startedAt);
  const now = Date.now();
  if (now >= dueAt) {
    void fireAutoBossCycle('due');
    return;
  }
  await scheduleAutoBossCycleAlarm(dueAt);
}

async function startAutoBossFromBackground({ reason = 'cycle' } = {}) {
  const auth = await requireAuth().catch(() => null);
  if (!auth?.loggedIn || !auth?.vip) {
    throw new Error('Login/VIP necessário para AutoBoss automático.');
  }
  if (!isVipForProduct(auth.contaStatus, MODULES.autoboss?.productId)) {
    throw new Error('VIP do Baiak-Idle necessária.');
  }
  await assertExtensionUpToDate();

  const stored = await chrome.storage.local.get([
    STORAGE_KEY_AUTOBOSS_PLAYLIST,
    STORAGE_KEY_AUTOBOSS_PRESETS,
    STORAGE_KEY_BOSS_TRACK
  ]);
  const playlist = resolveAutoBossPlaylistFromStorage(stored);
  const trackById = stored[STORAGE_KEY_BOSS_TRACK]?.byId || {};
  const queue = buildEligibleAutoBossQueue(playlist, trackById);
  if (!queue.length) {
    return { success: false, empty: true, reason: 'Fila vazia (cooldown ou playlist).' };
  }

  await chrome.storage.local.set({
    baiakIdlePularBossEnabled: false,
    baiakIdleAutoBossEnabled: true,
    [STORAGE_KEY_AUTOBOSS_RUN]: {
      running: true,
      queue: queue.map((b, i) => ({
        id: b.id,
        name: b.name,
        status: i === 0 ? 'fighting' : 'waiting',
        outcome: null
      })),
      index: 0,
      currentId: queue[0].id,
      stopAfterCurrent: false
    }
  });

  const tabs = await queryBaiakIdlePlayTabs();
  let injected = 0;
  for (const tab of tabs) {
    if (!tab?.id || !isBaiakIdlePlayUrl(tab.url)) continue;
    try {
      await injectModule(tab.id, 'autoboss', { autoStart: true });
      injected += 1;
    } catch (err) {
      console.warn('[Tibia Bot] AutoBoss ciclo inject:', err?.message || err);
    }
  }

  return {
    success: injected > 0 || tabs.length === 0,
    injected,
    count: queue.length,
    reason
  };
}

async function fireAutoBossCycle(trigger) {
  if (autoBossCycleBusy) return;
  autoBossCycleBusy = true;
  try {
    const data = await chrome.storage.local.get([
      STORAGE_KEY_AUTOBOSS_AUTO_CYCLE,
      STORAGE_KEY_AUTOBOSS_CYCLE_STARTED_AT
    ]);
    if (!data[STORAGE_KEY_AUTOBOSS_AUTO_CYCLE]) {
      await clearAutoBossCycleAlarm();
      return;
    }
    const startedAt = Number(data[STORAGE_KEY_AUTOBOSS_CYCLE_STARTED_AT]) || 0;
    if (!startedAt) {
      await clearAutoBossCycleAlarm();
      return;
    }

    const dueAt = nextAutoBossCycleDueAt(startedAt);
    const now = Date.now();
    if (now < dueAt - 2000) {
      await scheduleAutoBossCycleAlarm(dueAt);
      return;
    }

    const result = await startAutoBossFromBackground({ reason: trigger || 'cycle' });
    if (result?.empty) {
      // Cooldowns ainda ativos: tenta de novo em 30 min, mantém âncora.
      await scheduleAutoBossCycleAlarm(now + 30 * 60 * 1000);
      console.warn('[Tibia Bot] AutoBoss ciclo: fila vazia, retry em 30 min');
      return;
    }

    // Âncora = este disparo; próximo automático = amanhã 00:05.
    await chrome.storage.local.set({
      [STORAGE_KEY_AUTOBOSS_CYCLE_STARTED_AT]: now
    });
    const nextDue = nextAutoBossCycleDueAt(now);
    await scheduleAutoBossCycleAlarm(nextDue);
    console.info(
      '[Tibia Bot] AutoBoss ciclo reiniciado (' +
        (result?.count || 0) +
        ' bosses). Próximo às 00:05 (' +
        new Date(nextDue).toLocaleString() +
        ').'
    );
  } catch (err) {
    console.warn('[Tibia Bot] AutoBoss ciclo falhou:', err?.message || err);
    try {
      await scheduleAutoBossCycleAlarm(Date.now() + 30 * 60 * 1000);
    } catch (_) {}
  } finally {
    autoBossCycleBusy = false;
  }
}

/**
 * Empurra configs para o MAIN world sem <script blob:> (bloqueado pela CSP da página).
 * payload keys: selectedHunt, moverTiers, staminaConfig, autoSellConfig,
 * autoAnuncioConfig, venderLootBoss, bossHelperEquip, autoBossSoloEscape,
 * autoBossFightTimer ({enabled, minutes}), autoBossEndHelperEquip (boolean),
 * codexPlaylist (array), codexEnabled (boolean; default true)
 */
async function pushMainWorldVars(tabId, vars) {
  if (!tabId || !vars || typeof vars !== 'object') return { success: false };
  await chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    func: (payload) => {
      if (!payload || typeof payload !== 'object') return;
      if (Object.prototype.hasOwnProperty.call(payload, 'selectedHunt')) {
        window.__baiakIdleSelectedHunt = payload.selectedHunt || null;
      }
      if (Object.prototype.hasOwnProperty.call(payload, 'moverTiers')) {
        window.__baiakIdleMoverItensTiers = payload.moverTiers || {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false
        };
      }
      if (Object.prototype.hasOwnProperty.call(payload, 'staminaConfig')) {
        window.__baiakIdleStaminaConfig = payload.staminaConfig || {
          minPct: 15,
          maxPct: 30
        };
      }
      if (Object.prototype.hasOwnProperty.call(payload, 'autoSellConfig')) {
        window.__baiakIdleAutoSellConfig = payload.autoSellConfig || { minPct: 70 };
      }
      if (Object.prototype.hasOwnProperty.call(payload, 'autoAnuncioConfig')) {
        window.__baiakIdleAutoAnuncioConfig = payload.autoAnuncioConfig || {
          channel: 'geral',
          text: '',
          intervalMin: 5
        };
      }
      if (Object.prototype.hasOwnProperty.call(payload, 'venderLootBoss')) {
        window.__baiakIdleAutoSellVenderLootBoss = !!payload.venderLootBoss;
      }
      if (Object.prototype.hasOwnProperty.call(payload, 'bossHelperEquip')) {
        window.__baiakIdleBossHelperEquip =
          payload.bossHelperEquip && typeof payload.bossHelperEquip === 'object'
            ? payload.bossHelperEquip
            : {};
      }
      if (Object.prototype.hasOwnProperty.call(payload, 'autoBossSoloEscape')) {
        window.__baiakIdleAutoBossSoloEscape = !!payload.autoBossSoloEscape;
      }
      if (Object.prototype.hasOwnProperty.call(payload, 'autoBossFightTimer')) {
        const t = payload.autoBossFightTimer;
        if (t && typeof t === 'object') {
          const minutes = Math.max(1, Math.min(300, Math.round(Number(t.minutes) || 30)));
          window.__baiakIdleAutoBossFightTimer = {
            enabled: !!t.enabled,
            minutes
          };
        } else {
          window.__baiakIdleAutoBossFightTimer = { enabled: false, minutes: 30 };
        }
      }
      if (Object.prototype.hasOwnProperty.call(payload, 'autoBossEndHelperEquip')) {
        window.__baiakIdleAutoBossEndHelperEquip = !!payload.autoBossEndHelperEquip;
      }
      if (Object.prototype.hasOwnProperty.call(payload, 'codexPlaylist')) {
        window.__baiakIdleCodexPlaylist = Array.isArray(payload.codexPlaylist)
          ? payload.codexPlaylist
          : [];
      }
      if (Object.prototype.hasOwnProperty.call(payload, 'codexEnabled')) {
        window.__baiakIdleCodexEnabled = payload.codexEnabled !== false;
      }
    },
    args: [vars]
  });
  return { success: true };
}

function normalizeBossHelperEquipMap(raw) {
  const out = {};
  if (!raw || typeof raw !== 'object') return out;
  for (const [id, cfg] of Object.entries(raw)) {
    const key = String(id || '').trim();
    if (!key || !cfg || typeof cfg !== 'object') continue;
    out[key] = {
      ssa: cfg.ssa === true,
      mightRing: cfg.mightRing === true
    };
  }
  return out;
}

function resolveBossHelperEquip(map, bossId) {
  const id = String(bossId || '').trim();
  const cfg = id && map && typeof map === 'object' ? map[id] : null;
  if (cfg && typeof cfg === 'object') {
    return {
      ssa: cfg.ssa === true,
      mightRing: cfg.mightRing === true
    };
  }
  return { ssa: false, mightRing: false };
}

const MODULES = {
  pular_boss: {
    botId: 'baiak_idle',
    botLabel: 'Baiak-Idle',
    productId: 1,
    storageKey: 'baiakIdlePularBossEnabled',
    autoStartFlag: '__BAIAKIDLE_AUTO_START_PULAR_BOSS__',
    instanceKey: '__baiakIdlePularBoss',
    className: 'BaiakIdlePularBossModule',
    startMsg: 'BAIAKIDLE_START_PULAR_BOSS',
    stopMsg: 'BAIAKIDLE_STOP_PULAR_BOSS',
    label: 'Pular Boss'
  },
  member_dead: {
    botId: 'baiak_idle',
    botLabel: 'Baiak-Idle',
    productId: 1,
    storageKey: 'baiakIdleMemberDeadEnabled',
    autoStartFlag: '__BAIAKIDLE_AUTO_START_MEMBER_DEAD__',
    instanceKey: '__baiakIdleMemberDead',
    className: 'BaiakIdleMemberDeadModule',
    startMsg: 'BAIAKIDLE_START_MEMBER_DEAD',
    stopMsg: 'BAIAKIDLE_STOP_MEMBER_DEAD',
    label: 'Membro Morto'
  },
  retornar_hunt: {
    botId: 'baiak_idle',
    botLabel: 'Baiak-Idle',
    productId: 1,
    storageKey: 'baiakIdleRetornarHuntEnabled',
    autoStartFlag: '__BAIAKIDLE_AUTO_START_RETORNAR_HUNT__',
    instanceKey: '__baiakIdleRetornarHunt',
    className: 'BaiakIdleRetornarHuntModule',
    startMsg: 'BAIAKIDLE_START_RETORNAR_HUNT',
    stopMsg: 'BAIAKIDLE_STOP_RETORNAR_HUNT',
    label: 'Retornar Hunt'
  },
  reconect: {
    botId: 'baiak_idle',
    botLabel: 'Baiak-Idle',
    productId: 1,
    storageKey: 'baiakIdleReconectEnabled',
    autoStartFlag: '__BAIAKIDLE_AUTO_START_RECONECT__',
    instanceKey: '__baiakIdleReconect',
    className: 'BaiakIdleReconectModule',
    startMsg: 'BAIAKIDLE_START_RECONECT',
    stopMsg: 'BAIAKIDLE_STOP_RECONECT',
    label: 'Reconect',
    backgroundNav: true
  },
  auto_sell: {
    botId: 'baiak_idle',
    botLabel: 'Baiak-Idle',
    productId: 1,
    storageKey: 'baiakIdleAutoSellEnabled',
    autoStartFlag: '__BAIAKIDLE_AUTO_START_AUTO_SELL__',
    instanceKey: '__baiakIdleAutoSell',
    className: 'BaiakIdleAutoSellModule',
    startMsg: 'BAIAKIDLE_START_AUTO_SELL',
    stopMsg: 'BAIAKIDLE_STOP_AUTO_SELL',
    label: 'Auto Sell'
  },
  mover_itens: {
    botId: 'baiak_idle',
    botLabel: 'Baiak-Idle',
    productId: 1,
    storageKey: 'baiakIdleMoverItensEnabled',
    autoStartFlag: '__BAIAKIDLE_AUTO_START_MOVER_ITENS__',
    instanceKey: '__baiakIdleMoverItens',
    className: 'BaiakIdleMoverItensModule',
    startMsg: 'BAIAKIDLE_START_MOVER_ITENS',
    stopMsg: 'BAIAKIDLE_STOP_MOVER_ITENS',
    label: 'Mover Itens'
  },
  stamina: {
    botId: 'baiak_idle',
    botLabel: 'Baiak-Idle',
    productId: 1,
    storageKey: 'baiakIdleStaminaEnabled',
    autoStartFlag: '__BAIAKIDLE_AUTO_START_STAMINA__',
    instanceKey: '__baiakIdleStamina',
    className: 'BaiakIdleStaminaModule',
    startMsg: 'BAIAKIDLE_START_STAMINA',
    stopMsg: 'BAIAKIDLE_STOP_STAMINA',
    label: 'Stamina'
  },
  xp_hora: {
    botId: 'baiak_idle',
    botLabel: 'Baiak-Idle',
    productId: 1,
    storageKey: 'baiakIdleXpHoraEnabled',
    autoStartFlag: '__BAIAKIDLE_AUTO_START_XP_HORA__',
    instanceKey: '__baiakIdleXpHora',
    className: 'BaiakIdleXpHoraModule',
    startMsg: 'BAIAKIDLE_START_XP_HORA',
    stopMsg: 'BAIAKIDLE_STOP_XP_HORA',
    label: 'XP/h'
  },
  gold_hora: {
    botId: 'baiak_idle',
    botLabel: 'Baiak-Idle',
    productId: 1,
    storageKey: 'baiakIdleGoldHoraEnabled',
    autoStartFlag: '__BAIAKIDLE_AUTO_START_GOLD_HORA__',
    instanceKey: '__baiakIdleGoldHora',
    className: 'BaiakIdleGoldHoraModule',
    startMsg: 'BAIAKIDLE_START_GOLD_HORA',
    stopMsg: 'BAIAKIDLE_STOP_GOLD_HORA',
    label: 'Gold/h'
  },
  gold_media: {
    botId: 'baiak_idle',
    botLabel: 'Baiak-Idle',
    productId: 1,
    storageKey: 'baiakIdleGoldMediaEnabled',
    autoStartFlag: '__BAIAKIDLE_AUTO_START_GOLD_MEDIA__',
    instanceKey: '__baiakIdleGoldMedia',
    className: 'BaiakIdleGoldMediaModule',
    startMsg: 'BAIAKIDLE_START_GOLD_MEDIA',
    stopMsg: 'BAIAKIDLE_STOP_GOLD_MEDIA',
    label: 'Média Gold',
    oneShot: true,
    hideFromOverlay: true
  },
  recarregar_itens: {
    botId: 'baiak_idle',
    botLabel: 'Baiak-Idle',
    productId: 1,
    storageKey: 'baiakIdleRecarregarItensEnabled',
    autoStartFlag: '__BAIAKIDLE_AUTO_START_RECARREGAR_ITENS__',
    instanceKey: '__baiakIdleRecarregarItens',
    className: 'BaiakIdleRecarregarItensModule',
    startMsg: 'BAIAKIDLE_START_RECARREGAR_ITENS',
    stopMsg: 'BAIAKIDLE_STOP_RECARREGAR_ITENS',
    label: 'Recarregar'
  },
  coletar_recompensa: {
    botId: 'baiak_idle',
    botLabel: 'Baiak-Idle',
    productId: 1,
    storageKey: 'baiakIdleColetarRecompensaEnabled',
    autoStartFlag: '__BAIAKIDLE_AUTO_START_COLETAR_RECOMPENSA__',
    instanceKey: '__baiakIdleColetarRecompensa',
    className: 'BaiakIdleColetarRecompensaModule',
    startMsg: 'BAIAKIDLE_START_COLETAR_RECOMPENSA',
    stopMsg: 'BAIAKIDLE_STOP_COLETAR_RECOMPENSA',
    label: 'Daily Reward'
  },
  kills_hora: {
    botId: 'baiak_idle',
    botLabel: 'Baiak-Idle',
    productId: 1,
    storageKey: 'baiakIdleKillsHoraEnabled',
    autoStartFlag: '__BAIAKIDLE_AUTO_START_KILLS_HORA__',
    instanceKey: '__baiakIdleKillsHora',
    className: 'BaiakIdleKillsHoraModule',
    startMsg: 'BAIAKIDLE_START_KILLS_HORA',
    stopMsg: 'BAIAKIDLE_STOP_KILLS_HORA',
    label: 'Kills/h'
  },
  mapa_entidades: {
    botId: 'baiak_idle',
    botLabel: 'Baiak-Idle',
    productId: 1,
    storageKey: 'baiakIdleMapaEntidadesEnabled',
    autoStartFlag: '__BAIAKIDLE_AUTO_START_MAPA_ENTIDADES__',
    instanceKey: '__baiakIdleMapaEntidades',
    className: 'BaiakIdleMapaEntidadesModule',
    startMsg: 'BAIAKIDLE_START_MAPA_ENTIDADES',
    stopMsg: 'BAIAKIDLE_STOP_MAPA_ENTIDADES',
    label: 'Mapa'
  },
  auto_anuncio: {
    botId: 'baiak_idle',
    botLabel: 'Baiak-Idle',
    productId: 1,
    storageKey: 'baiakIdleAutoAnuncioEnabled',
    autoStartFlag: '__BAIAKIDLE_AUTO_START_AUTO_ANUNCIO__',
    instanceKey: '__baiakIdleAutoAnuncio',
    className: 'BaiakIdleAutoAnuncioModule',
    startMsg: 'BAIAKIDLE_START_AUTO_ANUNCIO',
    stopMsg: 'BAIAKIDLE_STOP_AUTO_ANUNCIO',
    label: 'Auto Anúncio'
  },
  ocultar_nomes: {
    botId: 'baiak_idle',
    botLabel: 'Baiak-Idle',
    productId: 1,
    storageKey: 'baiakIdleOcultarNomesEnabled',
    autoStartFlag: '__BAIAKIDLE_AUTO_START_OCULTAR_NOMES__',
    instanceKey: '__baiakIdleOcultarNomes',
    className: 'BaiakIdleOcultarNomesModule',
    startMsg: 'BAIAKIDLE_START_OCULTAR_NOMES',
    stopMsg: 'BAIAKIDLE_STOP_OCULTAR_NOMES',
    label: 'Ocultar Nomes',
    hideFromOverlay: true
  },
  autoboss: {
    botId: 'baiak_idle',
    botLabel: 'Baiak-Idle',
    productId: 1,
    storageKey: 'baiakIdleAutoBossEnabled',
    autoStartFlag: '__BAIAKIDLE_AUTO_START_AUTOBOSS__',
    instanceKey: '__baiakIdleAutoBoss',
    className: 'BaiakIdleAutoBossModule',
    startMsg: 'BAIAKIDLE_START_AUTOBOSS',
    stopMsg: 'BAIAKIDLE_STOP_AUTOBOSS',
    label: 'AutoBoss',
    hideFromOverlay: true
  }
};

/* —— Auth exclusiva do Tibia Bot (cookie TIBIAPASS — não usa RAVISPASS) —— */

let authSyncTimer = null;
let authSyncInFlight = null;

function normalizeContaStatus(cs) {
  if (!cs || typeof cs !== 'object') {
    return {
      vip: false,
      label: 'Free',
      data_final: null,
      produto_id: null,
      produto_nome: null,
      mensagem: 'Compre sua VIP ou recrute um usuário.'
    };
  }
  let vip = !!cs.vip;
  const dataFinal = cs.data_final != null ? Number(cs.data_final) : null;
  if (vip && dataFinal && dataFinal * 1000 <= Date.now()) {
    vip = false;
  }
  return {
    vip,
    label: vip ? 'VIP' : 'Free',
    data_final: dataFinal && dataFinal > 0 ? dataFinal : null,
    produto_id: cs.produto_id != null ? Number(cs.produto_id) : null,
    produto_nome: cs.produto_nome || null,
    mensagem: vip
      ? null
      : (cs.mensagem || 'Compre sua VIP ou recrute um usuário.')
  };
}

function isVipForProduct(contaStatus, productId) {
  const cs = normalizeContaStatus(contaStatus);
  if (!cs.vip) return false;
  if (!productId) return true;
  if (cs.produto_id == null) return true;
  return Number(cs.produto_id) === Number(productId);
}

async function readSiteSessionCookieValue() {
  for (const url of SITE_URLS) {
    try {
      const c = await chrome.cookies.get({ url, name: SESSION_COOKIE });
      if (c && c.value) return String(c.value);
    } catch (_) {}
  }
  try {
    const all = await chrome.cookies.getAll({ name: SESSION_COOKIE });
    for (const c of all || []) {
      const host = String(c.domain || '').replace(/^\./, '');
      if ((host === 'tibiabot.online' || host.endsWith('.tibiabot.online')) && c.value) {
        return String(c.value);
      }
    }
  } catch (_) {}
  return '';
}

async function hasSiteSessionCookie() {
  return !!(await readSiteSessionCookieValue());
}

async function fetchSiteSession() {
  const sessionId = await readSiteSessionCookieValue();
  const installed = getInstalledExtensionVersion();
  const urls = [
    `${SITE_URL}api/auth/me.php`
  ];
  let lastErr = null;

  for (const url of urls) {
    try {
      const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Extension-Version': installed
      };
      if (sessionId) {
        headers['X-TibiaBot-Session'] = sessionId;
      }

      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers
      });
      const data = await res.json().catch(() => null);
      if (data?.extension) {
        await applyExtensionPayload(data.extension);
      }
      if (data && data.authenticated && data.user) {
        return {
          ok: true,
          user: data.user,
          conta_status: normalizeContaStatus(data.conta_status),
          extension: data.extension || null
        };
      }
      if (data && data.authenticated === false) {
        return {
          ok: false,
          user: null,
          conta_status: null,
          definite: true,
          extension: data.extension || null
        };
      }
    } catch (err) {
      lastErr = err;
    }
  }
  return { ok: false, user: null, conta_status: null, definite: false, error: lastErr?.message || null };
}

async function persistAuthState(loggedIn, user, contaStatus = null) {
  const cs = loggedIn ? normalizeContaStatus(contaStatus) : normalizeContaStatus(null);
  await chrome.storage.local.set({
    [AUTH_STORAGE.loggedIn]: !!loggedIn,
    [AUTH_STORAGE.user]: loggedIn && user ? user : null,
    [AUTH_STORAGE.checkedAt]: Date.now(),
    [AUTH_STORAGE.vip]: !!(loggedIn && cs.vip),
    [AUTH_STORAGE.contaStatus]: loggedIn ? cs : null
  });
  return cs;
}

async function stopAllModulesOnPlayTabs() {
  const tabs = await chrome.tabs.query({
    url: [
      'https://baiakidle.com/jogar',
      'https://baiakidle.com/jogar/*',
      'https://www.baiakidle.com/jogar',
      'https://www.baiakidle.com/jogar/*'
    ]
  });
  for (const tab of tabs) {
    if (!tab.id || !isBaiakIdlePlayUrl(tab.url)) continue;
    for (const name of Object.keys(MODULES)) {
      try {
        await stopModule(tab.id, name);
      } catch (_) {}
    }
    try {
      await broadcastOverlay(tab.id);
    } catch (_) {}
  }
}

async function pauseModulesKeepLogin(reason = 'vip_expired') {
  const keys = Object.values(MODULES).map((m) => m.storageKey);
  const clear = {};
  for (const key of keys) clear[key] = false;
  await chrome.storage.local.set(clear);
  await stopAllModulesOnPlayTabs();
  moduleAccessTokenCache = { token: '', expiresAtMs: 0 };
  bossesModuleCodeCache = '';
  huntsModuleCodeCache = '';
  codexModuleCodeCache = '';
  await clearPresencaModuleCache();
  console.info('[Tibia Bot] Módulos pausados:', reason);
}

async function clearAuthAndStopModules() {
  const keys = Object.values(MODULES).map((m) => m.storageKey);
  const clear = {
    [AUTH_STORAGE.loggedIn]: false,
    [AUTH_STORAGE.user]: null,
    [AUTH_STORAGE.vip]: false,
    [AUTH_STORAGE.contaStatus]: null
  };
  for (const key of keys) clear[key] = false;
  await chrome.storage.local.set(clear);
  await stopAllModulesOnPlayTabs();
  moduleAccessTokenCache = { token: '', expiresAtMs: 0 };
  bossesModuleCodeCache = '';
  huntsModuleCodeCache = '';
  codexModuleCodeCache = '';
  await clearPresencaModuleCache();
  try {
    await chrome.alarms.clear(VIP_ALARM_EXPIRE);
    await chrome.alarms.clear(VIP_ALARM_POLL);
  } catch (_) {}
}

async function scheduleVipMonitoring(contaStatus) {
  try {
    await chrome.alarms.clear(VIP_ALARM_EXPIRE);
    await chrome.alarms.clear(VIP_ALARM_POLL);
  } catch (_) {}

  const cs = normalizeContaStatus(contaStatus);
  try {
    await chrome.alarms.create(VIP_ALARM_POLL, {
      periodInMinutes: cs.vip ? 2 : 1
    });
  } catch (_) {}

  if (!cs.vip || !cs.data_final) return;

  const whenMs = cs.data_final * 1000;
  const delay = whenMs - Date.now();
  if (delay <= 0) {
    const prevUser = (await chrome.storage.local.get(AUTH_STORAGE.user))[AUTH_STORAGE.user];
    await pauseModulesKeepLogin('vip_expired_local');
    await persistAuthState(true, prevUser, { ...cs, vip: false, label: 'Free' });
    return;
  }

  try {
    await chrome.alarms.create(VIP_ALARM_EXPIRE, {
      when: Math.max(Date.now() + 1500, whenMs)
    });
  } catch (_) {}
}

async function syncAuthFromSite(reason = 'manual') {
  const versionGate = (await fetchRequiredVersionFromApi()) || (await getVersionGate());

  const hasCookie = await hasSiteSessionCookie();
  if (!hasCookie) {
    if (reason === 'cookie_removed') {
      await new Promise((r) => setTimeout(r, 400));
      if (await hasSiteSessionCookie()) {
        return syncAuthFromSite('cookie_removed_retry');
      }
    }
    const prev = await chrome.storage.local.get(AUTH_STORAGE.loggedIn);
    if (prev[AUTH_STORAGE.loggedIn]) {
      await clearAuthAndStopModules();
    } else {
      await persistAuthState(false, null, null);
    }
    return {
      loggedIn: false,
      user: null,
      vip: false,
      contaStatus: null,
      reason,
      extensionOutdated: !!versionGate?.outdated,
      requiredVersion: versionGate?.required || '',
      installedVersion: versionGate?.installed || getInstalledExtensionVersion(),
      versionMessage: versionGate?.message || ''
    };
  }

  const session = await fetchSiteSession();
  const gate = (await getVersionGate()) || versionGate;
  if (gate?.outdated) {
    await stopAllModulesOnPlayTabs();
  }

  if (session.ok && session.user) {
    const prevAuth = await chrome.storage.local.get([AUTH_STORAGE.vip, AUTH_STORAGE.loggedIn]);
    const wasVip = !!prevAuth[AUTH_STORAGE.vip];
    const cs = await persistAuthState(true, session.user, session.conta_status);
    if (!cs.vip || gate?.outdated) {
      await pauseModulesKeepLogin(reason + (gate?.outdated ? '_outdated' : '_no_vip'));
    } else if (!wasVip && cs.vip) {
      // VIP acabou de liberar: atualiza overlay nas abas do jogo
      try {
        await broadcastOverlay();
      } catch (_) {}
    }
    await scheduleVipMonitoring(cs);
    if (cs.vip && !gate?.outdated) {
      void prefetchPresencaModule();
    }
    return {
      loggedIn: true,
      user: session.user,
      vip: !!cs.vip,
      contaStatus: cs,
      reason,
      extensionOutdated: !!gate?.outdated,
      requiredVersion: gate?.required || '',
      installedVersion: gate?.installed || getInstalledExtensionVersion(),
      versionMessage: gate?.message || ''
    };
  }

  if (!session.definite) {
    const prev = await chrome.storage.local.get([
      AUTH_STORAGE.loggedIn,
      AUTH_STORAGE.user,
      AUTH_STORAGE.vip,
      AUTH_STORAGE.contaStatus
    ]);
    if (prev[AUTH_STORAGE.loggedIn]) {
      const cs = normalizeContaStatus(prev[AUTH_STORAGE.contaStatus]);
      if (!cs.vip && prev[AUTH_STORAGE.vip]) {
        await pauseModulesKeepLogin(reason + '_expired_cache');
        await persistAuthState(true, prev[AUTH_STORAGE.user], cs);
      } else if (cs.vip) {
        await scheduleVipMonitoring(cs);
      }
      if (gate?.outdated) {
        await stopAllModulesOnPlayTabs();
      }
      return {
        loggedIn: true,
        user: prev[AUTH_STORAGE.user] || null,
        vip: !!cs.vip,
        contaStatus: cs,
        reason: reason + '_keep',
        extensionOutdated: !!gate?.outdated,
        requiredVersion: gate?.required || '',
        installedVersion: gate?.installed || getInstalledExtensionVersion(),
        versionMessage: gate?.message || ''
      };
    }
  }

  const prev = await chrome.storage.local.get(AUTH_STORAGE.loggedIn);
  if (prev[AUTH_STORAGE.loggedIn]) {
    await clearAuthAndStopModules();
  } else {
    await persistAuthState(false, null, null);
  }
  return {
    loggedIn: false,
    user: null,
    vip: false,
    contaStatus: null,
    reason,
    extensionOutdated: !!gate?.outdated,
    requiredVersion: gate?.required || '',
    installedVersion: gate?.installed || getInstalledExtensionVersion(),
    versionMessage: gate?.message || ''
  };
}

function scheduleAuthSync(reason = 'manual') {
  clearTimeout(authSyncTimer);
  authSyncTimer = setTimeout(() => {
    authSyncInFlight = syncAuthFromSite(reason)
      .catch(() => ({ loggedIn: false, user: null, vip: false, contaStatus: null, reason: 'error' }))
      .finally(() => {
        authSyncInFlight = null;
      });
  }, 250);
  return authSyncInFlight;
}

async function requireAuth() {
  const data = await chrome.storage.local.get([
    AUTH_STORAGE.loggedIn,
    AUTH_STORAGE.checkedAt,
    AUTH_STORAGE.user,
    AUTH_STORAGE.vip,
    AUTH_STORAGE.contaStatus
  ]);
  const age = Date.now() - (Number(data[AUTH_STORAGE.checkedAt]) || 0);
  const cs = normalizeContaStatus(data[AUTH_STORAGE.contaStatus]);

  if (data[AUTH_STORAGE.loggedIn] && data[AUTH_STORAGE.vip] && !cs.vip) {
    return syncAuthFromSite('require_expired');
  }

  if (!data[AUTH_STORAGE.loggedIn] || age > 60_000) {
    return syncAuthFromSite('require');
  }

  return {
    loggedIn: true,
    user: data[AUTH_STORAGE.user] || null,
    vip: !!cs.vip,
    contaStatus: cs,
    reason: 'cache'
  };
}

async function requireVipForModule(moduleName) {
  await assertExtensionUpToDate();
  const auth = await requireAuth();
  if (!auth.loggedIn) {
    throw new Error('Faça login em tibiabot.online para usar os módulos.');
  }
  const meta = MODULES[moduleName];
  const productId = meta?.productId || BOT_PRODUCT_ID[meta?.botId] || 1;
  if (!isVipForProduct(auth.contaStatus, productId)) {
    throw new Error('VIP necessária. Ative um voucher ou compre o plano em Minha conta.');
  }
  return auth;
}

chrome.cookies.onChanged.addListener((changeInfo) => {
  const c = changeInfo?.cookie;
  if (!c || c.name !== SESSION_COOKIE) return;
  const host = String(c.domain || '').replace(/^\./, '');
  if (host !== 'tibiabot.online' && !host.endsWith('.tibiabot.online')) return;
  scheduleAuthSync(changeInfo.removed ? 'cookie_removed' : 'cookie_changed');
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (!alarm?.name) return;
  if (alarm.name === VIP_ALARM_EXPIRE || alarm.name === VIP_ALARM_POLL) {
    syncAuthFromSite(alarm.name).catch(() => {});
  }
  if (alarm.name === RECONECT_ALARM) {
    void tickReconect();
  }
  if (alarm.name === AUTOBOSS_CYCLE_ALARM) {
    void fireAutoBossCycle('alarm');
  }
});

syncAuthFromSite('startup').catch(() => {});
void syncReconectWatcherFromStorage();
void syncAutoBossCycleSchedule();
void restorePresencaModuleCache();

/** Cache em memória do catálogo de bosses (módulo de dados, sem auto-start). */
let bossesModuleCodeCache = '';
let huntsModuleCodeCache = '';
let codexModuleCodeCache = '';
/** Módulo interno Presença (anti-bot) — baixado da API, não fica no pacote. */
let presencaModuleCodeCache = '';
const PRESENCA_SESSION_KEY = 'tibiaBotPresencaModuleCode';
/** tabId → injeção em andamento / já aplicada nesta navegação */
const presencaInjectInFlight = new Map();

/** Token de curta duração para download de módulos (API). */
let moduleAccessTokenCache = { token: '', expiresAtMs: 0 };

function parseModuleApiError(text, fallback) {
  const raw = String(text || '').trim();
  if (!raw) return fallback;
  try {
    const data = JSON.parse(raw);
    if (data && typeof data.message === 'string' && data.message.trim()) {
      return data.message.trim();
    }
  } catch (_) {}
  const m = raw.match(/\/\/\s*Error:\s*(.+)/i);
  if (m && m[1]) return m[1].trim();
  // HTML 500 do nginx/PHP: devolve um trecho legível
  if (/<html|internal server error|fatal error/i.test(raw)) {
    return fallback + ' (erro no servidor)';
  }
  return fallback;
}

async function fetchModuleAccessToken({ force = false } = {}) {
  const now = Date.now();
  if (
    !force &&
    moduleAccessTokenCache.token &&
    moduleAccessTokenCache.expiresAtMs > now + 30_000
  ) {
    return moduleAccessTokenCache.token;
  }

  await assertExtensionUpToDate();
  const auth = await requireAuth();
  if (!auth.loggedIn) {
    throw new Error('Faça login em tibiabot.online para usar os módulos.');
  }
  if (!auth.vip) {
    throw new Error('VIP necessária. Ative um voucher ou compre o plano em Minha conta.');
  }

  const sessionId = await readSiteSessionCookieValue();
  if (!sessionId) {
    throw new Error('Sessão não encontrada. Abra tibiabot.online e faça login de novo.');
  }
  const installed = getInstalledExtensionVersion();
  // Não usar www: certificado SSL do www está inválido e mascara o erro real.
  const url = `${API_BASE_URL}/auth/module_token.php?v=${Date.now()}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'omit',
      cache: 'no-store',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Extension-ID': chrome.runtime.id,
        'X-Extension-Version': installed,
        'X-TibiaBot-Session': sessionId
      }
    });
    const data = await res.json().catch(() => null);
    if (data?.success && data.token) {
      const ttlSec = Number(data.ttl) || 300;
      const expSec = Number(data.expires_at) || Math.floor(now / 1000) + ttlSec;
      moduleAccessTokenCache = {
        token: String(data.token),
        expiresAtMs: expSec * 1000
      };
      return moduleAccessTokenCache.token;
    }
    throw new Error(
      data?.message ||
        (res.status === 401
          ? 'Faça login em tibiabot.online.'
          : res.status === 403
            ? 'VIP ou Extension ID sem permissão.'
            : `Falha ao obter token (HTTP ${res.status})`)
    );
  } catch (err) {
    const base = err instanceof Error ? err.message : String(err);
    if (base === 'Failed to fetch') {
      throw new Error(
        'Falha de rede ao obter token de módulo. Verifique se a API está no ar e recarregue a extensão.'
      );
    }
    throw err instanceof Error ? err : new Error(base);
  }
}

async function fetchModuleCode(moduleName) {
  const token = await fetchModuleAccessToken();
  const sessionId = await readSiteSessionCookieValue();
  if (!sessionId) {
    throw new Error('Sessão não encontrada. Abra tibiabot.online e faça login de novo.');
  }
  const installed = getInstalledExtensionVersion();
  const url = `${API_BASE_URL}/${moduleName}.php?v=${Date.now()}`;

  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Extension-ID': chrome.runtime.id,
    'X-Extension-Version': installed,
    'X-Module-Token': token,
    'X-TibiaBot-Session': sessionId
  };

  async function downloadOnce(moduleToken) {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'omit',
      cache: 'no-store',
      headers: { ...headers, 'X-Module-Token': moduleToken }
    });
    const raw = await response.text();
    return { response, raw };
  }

  try {
    let { response, raw } = await downloadOnce(token);

    if (!response.ok && response.status === 401 && /token/i.test(raw)) {
      const fresh = await fetchModuleAccessToken({ force: true });
      ({ response, raw } = await downloadOnce(fresh));
    }

    if (!response.ok) {
      throw new Error(parseModuleApiError(raw, `HTTP ${response.status} ao carregar ${moduleName}`));
    }

    let code = '';
    try {
      const data = JSON.parse(raw);
      if (data && data.success && typeof data.code === 'string') {
        code =
          data.encoding === 'base64'
            ? (() => {
                const bin = atob(data.code);
                const bytes = new Uint8Array(bin.length);
                for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
                return new TextDecoder('utf-8').decode(bytes);
              })()
            : data.code;
      } else if (data && data.message) {
        throw new Error(String(data.message));
      }
    } catch (err) {
      if (err instanceof Error && err.message && !/JSON|Unexpected|atob|URIMalformed/i.test(err.message)) {
        throw err;
      }
      // Compat: resposta antiga em JS puro
      code = raw;
    }

    if (!code || !code.trim() || code.trim().startsWith('// Error:')) {
      throw new Error(parseModuleApiError(raw || code, `Módulo ${moduleName} inválido ou vazio`));
    }
    return code;
  } catch (err) {
    const baseMsg = err instanceof Error ? err.message : String(err);
    if (baseMsg === 'Failed to fetch') {
      throw new Error(
        `Falha de rede ao carregar ${moduleName} em tibiabot.online. Recarregue a extensão e tente de novo.`
      );
    }
    throw err instanceof Error ? err : new Error(baseMsg);
  }
}

async function fetchBossesModuleCode({ force = false } = {}) {
  if (!force && bossesModuleCodeCache) return bossesModuleCodeCache;
  const code = await fetchModuleCode('bosses');
  bossesModuleCodeCache = code;
  return code;
}

async function fetchHuntsModuleCode({ force = false } = {}) {
  if (!force && huntsModuleCodeCache) return huntsModuleCodeCache;
  const code = await fetchModuleCode('hunts');
  huntsModuleCodeCache = code;
  return code;
}

async function fetchCodexModuleCode({ force = false } = {}) {
  if (!force && codexModuleCodeCache) return codexModuleCodeCache;
  const code = await fetchModuleCode('codex');
  codexModuleCodeCache = code;
  return code;
}

async function clearPresencaModuleCache() {
  presencaModuleCodeCache = '';
  presencaInjectInFlight.clear();
  try {
    await chrome.storage.session.remove(PRESENCA_SESSION_KEY);
  } catch (_) {}
}

async function restorePresencaModuleCache() {
  if (presencaModuleCodeCache) return presencaModuleCodeCache;
  try {
    const data = await chrome.storage.session.get(PRESENCA_SESSION_KEY);
    const code = data?.[PRESENCA_SESSION_KEY];
    if (typeof code === 'string' && code.trim()) {
      presencaModuleCodeCache = code;
      return code;
    }
  } catch (_) {}
  return '';
}

async function fetchPresencaModuleCode({ force = false } = {}) {
  const isHealthyPresencaSource = (code) =>
    typeof code === 'string' &&
    code.includes('waitForHold') &&
    code.includes('moduleDirUrl') &&
    code.includes('markPatched') &&
    // v2: reescritas fortes (isPresent/rX) — invalida cache antigo do session
    code.includes("isPresent:()=>!0");

  if (!force) {
    if (presencaModuleCodeCache && isHealthyPresencaSource(presencaModuleCodeCache)) {
      return presencaModuleCodeCache;
    }
    if (presencaModuleCodeCache) presencaModuleCodeCache = '';

    const restored = await restorePresencaModuleCache();
    if (isHealthyPresencaSource(restored)) {
      presencaModuleCodeCache = restored;
      return restored;
    }
    if (restored) {
      presencaModuleCodeCache = '';
      try {
        await chrome.storage.session.remove(PRESENCA_SESSION_KEY);
      } catch (_) {}
    }
  }
  const code = await fetchModuleCode('presenca');
  presencaModuleCodeCache = code;
  try {
    await chrome.storage.session.set({ [PRESENCA_SESSION_KEY]: code });
  } catch (_) {}
  return code;
}

/**
 * Pré-baixa o módulo Presença (VIP) para injetar no document_start sem atraso.
 */
async function prefetchPresencaModule() {
  try {
    await assertExtensionUpToDate();
    const auth = await requireAuth();
    if (!auth.loggedIn || !auth.vip) return false;
    await fetchPresencaModuleCode();
    return true;
  } catch (err) {
    console.warn('[Tibia Bot] Prefetch presença:', err?.message || err);
    return false;
  }
}

/**
 * Injeta o módulo Presença (MAIN) — só a lógica da API.
 * O hold do index é feito por presenca-boot.js no document_start.
 * Nunca reescreve se o index original já tiver corrido (evita 2 sessões).
 */
async function releasePresencaHold(tabId) {
  if (!tabId) return;
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      injectImmediately: true,
      func: () => {
        try {
          void window.__tibiaBotPresencaBoot?.releaseOriginal?.(true);
        } catch (_) {}
      }
    });
  } catch (_) {}
}

async function injectPresencaIntoTab(tabId, { forceFetch = false } = {}) {
  if (!tabId) return { success: false, reason: 'no_tab' };

  if (!forceFetch && presencaInjectInFlight.get(tabId) === 'done') {
    return { success: true, skipped: true, reason: 'already' };
  }
  if (presencaInjectInFlight.get(tabId) === 'pending') {
    return { success: true, skipped: true, reason: 'inflight' };
  }
  presencaInjectInFlight.set(tabId, 'pending');

  try {
    try {
      await assertExtensionUpToDate();
      await assertPlayTab(tabId);
    } catch (err) {
      presencaInjectInFlight.delete(tabId);
      return { success: false, reason: err?.message || 'tab' };
    }

    const auth = await requireAuth();
    if (!auth.loggedIn || !auth.vip) {
      await releasePresencaHold(tabId);
      presencaInjectInFlight.delete(tabId);
      return {
        success: false,
        reason: !auth.loggedIn ? 'not_logged_in' : 'no_vip'
      };
    }

    // já processou neste documento?
    const [probe] = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      injectImmediately: true,
      func: () => {
        try {
          window.__tibiaBotPresencaBoot?.scanAndHold?.();
        } catch (_) {}
        const p = window.__tibiaBotPresencePatch;
        if (p && p.running) return { done: false, running: true, reason: 'running' };
        if (p && p.done) return { done: true, ok: !!p.ok, reason: p.reason || '' };
        const b = window.__tibiaBotPresencaBoot?.getState?.();
        return {
          done: false,
          held: !!(b && b.held),
          missed: !!(b && b.missed),
          claimed: !!(b && b.claimed),
          released: !!(b && b.released),
          patched: !!(b && b.patched),
          reason: (b && b.reason) || '',
          pendingUrl: (b && b.pendingUrl) || ''
        };
      }
    });
    const st = probe?.result || {};
    if (st.running) {
      presencaInjectInFlight.set(tabId, 'done');
      return { success: true, skipped: true, reason: 'running' };
    }
    if (st.done) {
      presencaInjectInFlight.set(tabId, 'done');
      return { success: !!st.ok, skipped: true, reason: st.reason || 'already_done' };
    }
    if (st.patched) {
      presencaInjectInFlight.set(tabId, 'done');
      return { success: true, skipped: true, reason: 'patched' };
    }
    // released / missed sem hold: não injeta rewrite (evita 2 clients).
    // Se ainda está held (patcher não rodou), segue o inject.
    if (st.released && !st.held) {
      presencaInjectInFlight.set(tabId, 'done');
      return { success: false, skipped: true, reason: 'released' };
    }
    if (st.missed && !st.held) {
      presencaInjectInFlight.set(tabId, 'done');
      return { success: false, skipped: true, reason: 'missed_hold' };
    }

    const code = await fetchPresencaModuleCode({ force: forceFetch });
    if (!code || !String(code).trim()) {
      await releasePresencaHold(tabId);
      presencaInjectInFlight.delete(tabId);
      return { success: false, reason: 'empty' };
    }

    await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      injectImmediately: true,
      func: (source) => {
        try {
          const p = window.__tibiaBotPresencePatch;
          if (p && (p.done || p.running)) return;
          const blob = new Blob([source], { type: 'application/javascript' });
          const url = URL.createObjectURL(blob);
          const script = document.createElement('script');
          script.src = url;
          script.onload = () => {
            try {
              URL.revokeObjectURL(url);
            } catch (_) {}
          };
          script.onerror = () => {
            try {
              URL.revokeObjectURL(url);
            } catch (_) {}
            try {
              const r = window.__tibiaBotPresencaBoot?.releaseOriginal?.(true);
              if (r && typeof r.then === 'function') void r;
            } catch (_) {}
          };
          (document.documentElement || document.head || document.body).appendChild(script);
        } catch (err) {
          console.warn('[Tibia Bot] Falha ao injetar presença', err);
          try {
            const r = window.__tibiaBotPresencaBoot?.releaseOriginal?.(true);
            if (r && typeof r.then === 'function') void r;
          } catch (_) {}
        }
      },
      args: [code]
    });

    presencaInjectInFlight.set(tabId, 'done');
    return { success: true };
  } catch (err) {
    try {
      await releasePresencaHold(tabId);
    } catch (_) {}
    presencaInjectInFlight.delete(tabId);
    console.warn('[Tibia Bot] injectPresenca:', err?.message || err);
    return { success: false, reason: err?.message || String(err) };
  }
}

/**
 * Carrega o catálogo de hunts (criaturas) via API no isolated world.
 */
async function ensureHuntsCatalog(tabId, { force = false } = {}) {
  await assertExtensionUpToDate();
  await assertPlayTab(tabId);

  if (!force) {
    const [probeIso] = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'ISOLATED',
      func: () =>
        Array.isArray(window.BAIAK_IDLE_HUNT_DETAILS)
          ? window.BAIAK_IDLE_HUNT_DETAILS.length
          : 0
    });
    const [probeMain] = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      func: () =>
        Array.isArray(window.BAIAK_IDLE_HUNT_DETAILS)
          ? window.BAIAK_IDLE_HUNT_DETAILS.length
          : 0
    });
    const cachedIso = Number(probeIso?.result) || 0;
    const cachedMain = Number(probeMain?.result) || 0;
    if (cachedMain > 0 && cachedIso > 0) {
      return { success: true, cached: true, count: cachedMain };
    }
    // Isolated tem catálogo e MAIN não → copia para o page world (kills/h usa sprite+exp no MAIN)
    if (cachedIso > 0 && cachedMain === 0) {
      const [copy] = await chrome.scripting.executeScript({
        target: { tabId },
        world: 'ISOLATED',
        func: () =>
          Array.isArray(window.BAIAK_IDLE_HUNT_DETAILS)
            ? window.BAIAK_IDLE_HUNT_DETAILS
            : []
      });
      const catalog = Array.isArray(copy?.result) ? copy.result : [];
      if (catalog.length) {
        await chrome.scripting.executeScript({
          target: { tabId },
          world: 'MAIN',
          func: (cat) => {
            window.BAIAK_IDLE_HUNT_DETAILS = cat;
          },
          args: [catalog]
        });
        return { success: true, cached: true, mirrored: true, count: catalog.length };
      }
    }
  }

  const code = await fetchHuntsModuleCode({ force });

  async function injectAndRead(moduleCode, reload) {
    const [mainInject] = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      func: (src, shouldReload) =>
        new Promise((resolve, reject) => {
          try {
            if (
              !shouldReload &&
              Array.isArray(window.BAIAK_IDLE_HUNT_DETAILS) &&
              window.BAIAK_IDLE_HUNT_DETAILS.length > 0
            ) {
              resolve(window.BAIAK_IDLE_HUNT_DETAILS);
              return;
            }

            try {
              delete window.BAIAK_IDLE_HUNT_DETAILS;
            } catch (_) {
              window.BAIAK_IDLE_HUNT_DETAILS = undefined;
            }

            const blob = new Blob([src], { type: 'application/javascript' });
            const url = URL.createObjectURL(blob);
            const script = document.createElement('script');
            script.src = url;
            script.onload = () => {
              URL.revokeObjectURL(url);
              const catalog = Array.isArray(window.BAIAK_IDLE_HUNT_DETAILS)
                ? window.BAIAK_IDLE_HUNT_DETAILS
                : [];
              resolve(catalog);
            };
            script.onerror = () => {
              URL.revokeObjectURL(url);
              reject(new Error('Falha ao injetar catálogo de hunts.'));
            };
            (document.head || document.documentElement).appendChild(script);
          } catch (err) {
            reject(err instanceof Error ? err : new Error(String(err)));
          }
        }),
      args: [moduleCode, !!reload]
    });
    return Array.isArray(mainInject?.result) ? mainInject.result : [];
  }

  let hunts = await injectAndRead(code, force);
  if (!hunts.length && !force) {
    huntsModuleCodeCache = '';
    const fresh = await fetchHuntsModuleCode({ force: true });
    hunts = await injectAndRead(fresh, true);
  }

  if (!hunts.length) {
    throw new Error('Catálogo de hunts vazio ou inválido.');
  }

  await chrome.scripting.executeScript({
    target: { tabId },
    world: 'ISOLATED',
    func: (catalog) => {
      window.BAIAK_IDLE_HUNT_DETAILS = catalog;
      window.BAIAK_IDLE_GET_HUNT = function (idOrName) {
        const key = String(idOrName || '')
          .trim()
          .toLowerCase();
        if (!key) return null;
        return (
          catalog.find((h) => h && h.id === key) ||
          catalog.find((h) => h && String(h.name || '').toLowerCase() === key) ||
          null
        );
      };
      window.BAIAK_IDLE_GET_HUNT_CREATURE = function (huntIdOrName, creatureIdOrName) {
        const hunt = window.BAIAK_IDLE_GET_HUNT(huntIdOrName);
        if (!hunt) return null;
        const key = String(creatureIdOrName || '')
          .trim()
          .toLowerCase();
        if (!key) return null;
        const list = Array.isArray(hunt.creatures) ? hunt.creatures : [];
        return (
          list.find((c) => c && c.id === key) ||
          list.find((c) => c && String(c.name || '').toLowerCase() === key) ||
          null
        );
      };
    },
    args: [hunts]
  });

  return { success: true, cached: false, count: hunts.length };
}

/**
 * Carrega o catálogo do Codex via API no isolated world.
 */
async function ensureCodexCatalog(tabId, { force = false } = {}) {
  await assertExtensionUpToDate();
  await assertPlayTab(tabId);

  if (!force) {
    const [probe] = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'ISOLATED',
      func: () =>
        Array.isArray(window.BAIAK_IDLE_CODEX) ? window.BAIAK_IDLE_CODEX.length : 0
    });
    const cachedCount = Number(probe?.result) || 0;
    if (cachedCount > 0) {
      return { success: true, cached: true, count: cachedCount };
    }
  }

  const code = await fetchCodexModuleCode({ force });

  async function injectAndRead(moduleCode, reload) {
    const [mainInject] = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      func: (src, shouldReload) =>
        new Promise((resolve, reject) => {
          try {
            if (
              !shouldReload &&
              Array.isArray(window.BAIAK_IDLE_CODEX) &&
              window.BAIAK_IDLE_CODEX.length > 0
            ) {
              resolve(window.BAIAK_IDLE_CODEX);
              return;
            }

            try {
              delete window.BAIAK_IDLE_CODEX;
            } catch (_) {
              window.BAIAK_IDLE_CODEX = undefined;
            }

            const blob = new Blob([src], { type: 'application/javascript' });
            const url = URL.createObjectURL(blob);
            const script = document.createElement('script');
            script.src = url;
            script.onload = () => {
              URL.revokeObjectURL(url);
              const catalog = Array.isArray(window.BAIAK_IDLE_CODEX)
                ? window.BAIAK_IDLE_CODEX
                : [];
              resolve(catalog);
            };
            script.onerror = () => {
              URL.revokeObjectURL(url);
              reject(new Error('Falha ao injetar catálogo do Codex.'));
            };
            (document.head || document.documentElement).appendChild(script);
          } catch (err) {
            reject(err instanceof Error ? err : new Error(String(err)));
          }
        }),
      args: [moduleCode, !!reload]
    });
    return Array.isArray(mainInject?.result) ? mainInject.result : [];
  }

  let catalog = await injectAndRead(code, force);
  if (!catalog.length && !force) {
    codexModuleCodeCache = '';
    const fresh = await fetchCodexModuleCode({ force: true });
    catalog = await injectAndRead(fresh, true);
  }

  if (!catalog.length) {
    throw new Error('Catálogo do Codex vazio ou inválido.');
  }

  await chrome.scripting.executeScript({
    target: { tabId },
    world: 'ISOLATED',
    func: (list) => {
      window.BAIAK_IDLE_CODEX = list;
    },
    args: [catalog]
  });

  return { success: true, cached: false, count: catalog.length };
}

/**
 * Carrega o catálogo via API e disponibiliza no isolated world do content script.
 * MV3 bloqueia eval no isolated world — injeta como os outros módulos (blob no MAIN)
 * e copia só os dados serializáveis para o painel.
 */
async function ensureBossesCatalog(tabId, { force = false } = {}) {
  await assertExtensionUpToDate();
  await assertPlayTab(tabId);

  if (!force) {
    const [probe] = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'ISOLATED',
      func: () =>
        Array.isArray(window.BAIAK_IDLE_BOSSES) ? window.BAIAK_IDLE_BOSSES.length : 0
    });
    const cachedCount = Number(probe?.result) || 0;
    if (cachedCount > 0) {
      return { success: true, cached: true, count: cachedCount };
    }
  }

  const code = await fetchBossesModuleCode({ force });

  async function injectAndRead(moduleCode, reload) {
    const [mainInject] = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      func: (src, shouldReload) =>
        new Promise((resolve, reject) => {
          try {
            if (
              !shouldReload &&
              Array.isArray(window.BAIAK_IDLE_BOSSES) &&
              window.BAIAK_IDLE_BOSSES.length > 0
            ) {
              resolve(window.BAIAK_IDLE_BOSSES);
              return;
            }

            // Limpa catálogo anterior para detectar falha de parse do módulo.
            try {
              delete window.BAIAK_IDLE_BOSSES;
            } catch (_) {
              window.BAIAK_IDLE_BOSSES = undefined;
            }

            const blob = new Blob([src], { type: 'application/javascript' });
            const url = URL.createObjectURL(blob);
            const script = document.createElement('script');
            script.src = url;
            script.onload = () => {
              URL.revokeObjectURL(url);
              const catalog = Array.isArray(window.BAIAK_IDLE_BOSSES)
                ? window.BAIAK_IDLE_BOSSES
                : [];
              resolve(catalog);
            };
            script.onerror = () => {
              URL.revokeObjectURL(url);
              reject(new Error('Falha ao injetar catálogo de bosses.'));
            };
            (document.head || document.documentElement).appendChild(script);
          } catch (err) {
            reject(err instanceof Error ? err : new Error(String(err)));
          }
        }),
      args: [moduleCode, !!reload]
    });
    return Array.isArray(mainInject?.result) ? mainInject.result : [];
  }

  let bosses = await injectAndRead(code, force);
  if (!bosses.length && !force) {
    // Cache/SW pode ter módulo antigo inválido — força redownload.
    bossesModuleCodeCache = '';
    const fresh = await fetchBossesModuleCode({ force: true });
    bosses = await injectAndRead(fresh, true);
  }

  if (!bosses.length) {
    throw new Error('Catálogo de bosses vazio ou inválido.');
  }

  await chrome.scripting.executeScript({
    target: { tabId },
    world: 'ISOLATED',
    func: (catalog) => {
      window.BAIAK_IDLE_BOSSES = catalog;
      window.BAIAK_IDLE_GET_BOSS = function (idOrName) {
        const key = String(idOrName || '')
          .trim()
          .toLowerCase();
        if (!key) return null;
        return (
          catalog.find((b) => b && b.id === key) ||
          catalog.find((b) => b && String(b.name || '').toLowerCase() === key) ||
          null
        );
      };
    },
    args: [bosses]
  });

  return { success: true, cached: false, count: bosses.length };
}

async function assertPlayTab(tabId) {
  const tab = await chrome.tabs.get(tabId);
  if (!isBaiakIdlePlayUrl(tab?.url)) {
    throw new Error(`Abra a página do jogo: ${PLAY_URL_HINT}`);
  }
  return tab;
}

async function injectGoToHunt(tabId, huntName) {
  await assertExtensionUpToDate();
  await assertPlayTab(tabId);

  const name = String(huntName || '').trim();
  if (!name) {
    throw new Error('Nenhuma hunt ativa selecionada.');
  }

  const moduleCode = await fetchModuleCode('teleporte');
  const huntData = await chrome.storage.local.get('baiakIdleSelectedHunt');
  const selectedHunt = huntData.baiakIdleSelectedHunt || { name };

  await chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    func: (code, hunt, selected) => {
      window.__baiakIdleSelectedHunt = selected || hunt || null;

      const run = () => {
        const Teleporte = window.BaiakIdleTeleporte;
        if (!Teleporte?.goToHunt) {
          console.error('[Tibia Bot] BaiakIdleTeleporte.goToHunt indisponível');
          return;
        }
        void Teleporte.goToHunt(hunt);
      };

      const blob = new Blob([code], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => {
        URL.revokeObjectURL(url);
        try {
          run();
        } catch (err) {
          console.error('[Tibia Bot] Erro ao ir para a hunt', err);
        }
      };
      script.onerror = (error) => {
        URL.revokeObjectURL(url);
        console.error('[Tibia Bot] Erro ao injetar teleporte', error);
      };
      (document.head || document.documentElement).appendChild(script);
    },
    args: [moduleCode, name, selectedHunt]
  });

  return { success: true, hunt: name };
}

async function injectGoToBoss(tabId, bossName, opts = {}) {
  await assertExtensionUpToDate();
  await assertPlayTab(tabId);

  const name = String(bossName || '').trim();
  if (!name) {
    throw new Error('Nenhum boss informado.');
  }

  const bossId = String(opts.bossId || '').trim();
  const stored = await chrome.storage.local.get('baiakIdleBossHelperEquip');
  const equipMap = normalizeBossHelperEquipMap(stored.baiakIdleBossHelperEquip);
  const helperCfg =
    opts.helperEquip && typeof opts.helperEquip === 'object'
      ? {
          ssa: opts.helperEquip.ssa === true,
          mightRing: opts.helperEquip.mightRing === true
        }
      : resolveBossHelperEquip(equipMap, bossId);

  await pushMainWorldVars(tabId, { bossHelperEquip: equipMap });

  const moduleCode = await fetchModuleCode('teleporte');

  await chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    func: (code, boss, helperEquip) => {
      const run = async () => {
        try {
          const Helper = window.BaiakIdleHelperEquip;
          if (Helper?.configureForBoss) {
            await Helper.configureForBoss(helperEquip || { ssa: false, mightRing: false });
          }
        } catch (err) {
          console.error('[Tibia Bot] Falha ao configurar Helper antes do boss', err);
        }
        const Teleporte = window.BaiakIdleTeleporte;
        if (!Teleporte?.goToBoss) {
          console.error('[Tibia Bot] BaiakIdleTeleporte.goToBoss indisponível');
          return;
        }
        void Teleporte.goToBoss(boss);
      };

      const blob = new Blob([code], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => {
        URL.revokeObjectURL(url);
        try {
          void run();
        } catch (err) {
          console.error('[Tibia Bot] Erro ao ir para o boss', err);
        }
      };
      script.onerror = (error) => {
        URL.revokeObjectURL(url);
        console.error('[Tibia Bot] Erro ao injetar teleporte (boss)', error);
      };
      (document.head || document.documentElement).appendChild(script);
    },
    args: [moduleCode, name, helperCfg]
  });

  return { success: true, boss: name, helperEquip: helperCfg };
}

async function injectModule(tabId, moduleName, { autoStart = true } = {}) {
  await assertExtensionUpToDate();
  const meta = MODULES[moduleName];
  if (!meta) throw new Error(`Módulo desconhecido: ${moduleName}`);

  await assertPlayTab(tabId);
  const moduleCode = await fetchModuleCode(moduleName);
  const extra = await chrome.storage.local.get([
    'baiakIdleSelectedHunt',
    'baiakIdleMoverItensTiers',
    'baiakIdleStaminaConfig',
    'baiakIdleAutoSellVenderLootBoss',
    'baiakIdleAutoSellConfig',
    'baiakIdleAutoAnuncioConfig',
    'baiakIdleAutoBossRun',
    'baiakIdleBossHelperEquip',
    'baiakIdleCodexPlaylist',
    'baiakIdleCodexEnabled',
    STORAGE_KEY_AUTOBOSS_SOLO_ESCAPE,
    STORAGE_KEY_AUTOBOSS_FIGHT_TIMER,
    STORAGE_KEY_AUTOBOSS_END_HELPER_EQUIP
  ]);
  const selectedHunt = extra.baiakIdleSelectedHunt || null;
  const moveTiers = extra.baiakIdleMoverItensTiers || {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  };
  const staminaCfg = extra.baiakIdleStaminaConfig || { minPct: 15, maxPct: 30 };
  const venderLootBoss = !!extra.baiakIdleAutoSellVenderLootBoss;
  const autoSellCfg = extra.baiakIdleAutoSellConfig || { minPct: 70 };
  const autoAnuncioCfg = extra.baiakIdleAutoAnuncioConfig || {
    channel: 'geral',
    text: '',
    intervalMin: 5
  };
  const bossHelperEquip = normalizeBossHelperEquipMap(extra.baiakIdleBossHelperEquip);
  const autoBossSoloEscape = !!extra[STORAGE_KEY_AUTOBOSS_SOLO_ESCAPE];
  const fightTimerRaw = extra[STORAGE_KEY_AUTOBOSS_FIGHT_TIMER];
  const autoBossFightTimer = {
    enabled: !!(fightTimerRaw && fightTimerRaw.enabled),
    minutes: Math.max(
      1,
      Math.min(300, Math.round(Number(fightTimerRaw?.minutes) || 30))
    )
  };
  const autoBossEndHelperEquip = !!extra[STORAGE_KEY_AUTOBOSS_END_HELPER_EQUIP];
  const codexPlaylist = Array.isArray(extra.baiakIdleCodexPlaylist)
    ? extra.baiakIdleCodexPlaylist
    : [];
  const codexEnabled = extra.baiakIdleCodexEnabled !== false;
  const run = extra.baiakIdleAutoBossRun || null;
  const autoBossQueue =
    run && run.running && Array.isArray(run.queue)
      ? run.queue
          .map((b) => ({
            id: String(b?.id || '').trim(),
            name: String(b?.name || b?.id || '').trim()
          }))
          .filter((b) => b.id && b.name)
      : [];
  const autoBossIndex = Math.max(0, Number(run?.index) || 0);

  await chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    func: (
      code,
      shouldAutoStart,
      autoStartFlag,
      instanceKey,
      className,
      label,
      hunt,
      tiers,
      staminaConfig,
      venderLootBossFlag,
      autoSellConfig,
      autoAnuncioConfig,
      autoBossQueueArg,
      autoBossIndexArg,
      bossHelperEquipMap,
      autoBossSoloEscapeFlag,
      autoBossFightTimerCfg,
      autoBossEndHelperEquipFlag
    ) => {
      window.__baiakIdleSelectedHunt = hunt || null;
      window.__baiakIdleMoverItensTiers = tiers || {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      };
      window.__baiakIdleStaminaConfig = staminaConfig || { minPct: 15, maxPct: 30 };
      window.__baiakIdleAutoSellVenderLootBoss = !!venderLootBossFlag;
      window.__baiakIdleAutoSellConfig = autoSellConfig || { minPct: 70 };
      window.__baiakIdleAutoAnuncioConfig = autoAnuncioConfig || {
        channel: 'geral',
        text: '',
        intervalMin: 5
      };
      window.__baiakIdleBossHelperEquip =
        bossHelperEquipMap && typeof bossHelperEquipMap === 'object' ? bossHelperEquipMap : {};
      window.__baiakIdleAutoBossSoloEscape = !!autoBossSoloEscapeFlag;
      window.__baiakIdleAutoBossFightTimer =
        autoBossFightTimerCfg && typeof autoBossFightTimerCfg === 'object'
          ? {
              enabled: !!autoBossFightTimerCfg.enabled,
              minutes: Math.max(
                1,
                Math.min(300, Math.round(Number(autoBossFightTimerCfg.minutes) || 30))
              )
            }
          : { enabled: false, minutes: 30 };
      window.__baiakIdleAutoBossEndHelperEquip = !!autoBossEndHelperEquipFlag;
      window.__baiakIdleAutoBossQueue = Array.isArray(autoBossQueueArg) ? autoBossQueueArg : [];
      window.__baiakIdleAutoBossRunIndex = Number(autoBossIndexArg) || 0;
      window[autoStartFlag] = !!shouldAutoStart;

      const blob = new Blob([code], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => {
        URL.revokeObjectURL(url);
        try {
          if (shouldAutoStart) {
            if (!window[className]) {
              console.error(`[Tibia Bot] Classe ${className} não encontrada após injetar ${label}`);
              return;
            }
            if (!window[instanceKey]) {
              window[instanceKey] = new window[className]();
            }
            const started = window[instanceKey]?.start?.(
              Array.isArray(autoBossQueueArg) ? autoBossQueueArg : undefined
            );
            if (instanceKey === '__baiakIdleAutoBoss' && started === false) {
              console.error('[Tibia Bot] AutoBoss não iniciou (fila vazia ou erro).');
            }
          }
        } catch (err) {
          console.error(`[Tibia Bot] Erro ao iniciar ${label}`, err);
        }
      };
      script.onerror = (error) => {
        URL.revokeObjectURL(url);
        console.error(`[Tibia Bot] Erro ao injetar ${label}`, error);
      };
      (document.head || document.documentElement).appendChild(script);
    },
    args: [
      moduleCode,
      autoStart,
      meta.autoStartFlag,
      meta.instanceKey,
      meta.className,
      meta.label,
      selectedHunt,
      moveTiers,
      staminaCfg,
      venderLootBoss,
      autoSellCfg,
      autoAnuncioCfg,
      autoBossQueue,
      autoBossIndex,
      bossHelperEquip,
      autoBossSoloEscape,
      autoBossFightTimer,
      autoBossEndHelperEquip
    ]
  });

  await pushMainWorldVars(tabId, { codexPlaylist, codexEnabled });

  if (autoStart) {
    try {
      await chrome.tabs.sendMessage(tabId, {
        type: 'TIBIA_BOT_CAPTURE_CHARACTERS',
        reason: 'module:' + moduleName
      });
    } catch (_) {}
  }

  return { success: true };
}

async function stopModule(tabId, moduleName) {
  const meta = MODULES[moduleName];
  if (!meta) throw new Error(`Módulo desconhecido: ${moduleName}`);

  try {
    await assertPlayTab(tabId);
  } catch (_) {
    return { success: true, skipped: true };
  }

  await chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    func: (autoStartFlag, instanceKey, label) => {
      try {
        window[autoStartFlag] = false;
        window[instanceKey]?.stop?.();
      } catch (err) {
        console.error(`[Tibia Bot] Erro ao parar ${label}`, err);
      }
    },
    args: [meta.autoStartFlag, meta.instanceKey, meta.label]
  });

  return { success: true };
}

async function getActiveModulesSnapshot() {
  const keys = Object.values(MODULES).map((m) => m.storageKey);
  keys.push(STORAGE_KEY_AUTOBOSS_AUTO_CYCLE);
  keys.push(STORAGE_KEY_AUTOBOSS_SOLO_ESCAPE);
  keys.push(STORAGE_KEY_AUTOBOSS_FIGHT_TIMER);
  const data = await chrome.storage.local.get(keys);

  /** @type {Record<string, { botLabel: string, modules: string[] }>} */
  const byBot = {};

  for (const meta of Object.values(MODULES)) {
    if (!data[meta.storageKey]) continue;
    if (meta.hideFromOverlay) continue;
    if (!byBot[meta.botId]) {
      byBot[meta.botId] = { botLabel: meta.botLabel, modules: [] };
    }
    byBot[meta.botId].modules.push(meta.label);
  }

  if (data[STORAGE_KEY_AUTOBOSS_AUTO_CYCLE]) {
    const botId = 'baiak_idle';
    if (!byBot[botId]) {
      byBot[botId] = { botLabel: 'Baiak-Idle', modules: [] };
    }
    if (!byBot[botId].modules.includes('AutBoss 00:05')) {
      byBot[botId].modules.push('AutBoss 00:05');
    }
  }

  if (data[STORAGE_KEY_AUTOBOSS_SOLO_ESCAPE]) {
    const botId = 'baiak_idle';
    if (!byBot[botId]) {
      byBot[botId] = { botLabel: 'Baiak-Idle', modules: [] };
    }
    if (!byBot[botId].modules.includes('AutBoss Solo')) {
      byBot[botId].modules.push('AutBoss Solo');
    }
  }

  const fightTimer = data[STORAGE_KEY_AUTOBOSS_FIGHT_TIMER];
  if (fightTimer && fightTimer.enabled) {
    const botId = 'baiak_idle';
    if (!byBot[botId]) {
      byBot[botId] = { botLabel: 'Baiak-Idle', modules: [] };
    }
    const mins = Math.max(1, Math.min(300, Math.round(Number(fightTimer.minutes) || 30)));
    const label = 'AutBoss Timer ' + mins + 'm';
    if (!byBot[botId].modules.includes(label)) {
      byBot[botId].modules.push(label);
    }
  }

  return {
    hasActive: Object.keys(byBot).length > 0,
    bots: byBot
  };
}

async function getEnabledModuleNames() {
  const keys = Object.values(MODULES).map((m) => m.storageKey);
  const data = await chrome.storage.local.get(keys);
  return Object.entries(MODULES)
    .filter(([, meta]) => !!data[meta.storageKey])
    .map(([name]) => name);
}

async function broadcastOverlay(tabId = null) {
  const snapshot = await getActiveModulesSnapshot();
  const message = {
    type: 'TIBIA_BOT_OVERLAY_UPDATE',
    payload: snapshot
  };

  if (tabId) {
    try {
      const tab = await chrome.tabs.get(tabId);
      if (!isBaiakIdlePlayUrl(tab?.url)) return snapshot;
      await chrome.tabs.sendMessage(tabId, message);
    } catch (_) {}
    return snapshot;
  }

  const tabs = await chrome.tabs.query({
    url: [
      'https://baiakidle.com/jogar',
      'https://baiakidle.com/jogar/*',
      'https://www.baiakidle.com/jogar',
      'https://www.baiakidle.com/jogar/*'
    ]
  });
  await Promise.all(
    tabs.map(async (tab) => {
      if (!tab.id || !isBaiakIdlePlayUrl(tab.url)) return;
      try {
        await chrome.tabs.sendMessage(tab.id, message);
      } catch (_) {}
    })
  );

  return snapshot;
}

async function maybeReinjectOnTab(tabId, url) {
  if (!tabId || !isBaiakIdlePlayUrl(url)) return;

  try {
    await assertExtensionUpToDate();
  } catch (_) {
    return;
  }

  const auth = await requireAuth();
  if (!auth.loggedIn || !auth.vip) return;

  const enabledModules = await getEnabledModuleNames();
  for (const moduleName of enabledModules) {
    const meta = MODULES[moduleName];
    if (!isVipForProduct(auth.contaStatus, meta?.productId)) continue;
    try {
      await injectModule(tabId, moduleName, { autoStart: true });
    } catch (error) {
      console.warn(`[Tibia Bot] Re-injeção de ${moduleName} falhou:`, error?.message || error);
    }
  }

  await broadcastOverlay(tabId);
}

function moduleNameFromMessage(type) {
  for (const [name, meta] of Object.entries(MODULES)) {
    if (type === meta.startMsg) return { name, action: 'start' };
    if (type === meta.stopMsg) return { name, action: 'stop' };
  }
  return null;
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  (async () => {
    try {
      if (message?.type === 'TIBIA_BOT_CAPTURE_CHARACTERS') {
        const tabId = message.tabId || _sender?.tab?.id;
        if (tabId) {
          try {
            await chrome.tabs.sendMessage(tabId, {
              type: 'TIBIA_BOT_CAPTURE_CHARACTERS',
              reason: message.reason || 'message'
            });
          } catch (_) {}
        }
        sendResponse({ success: true });
        return;
      }

      if (message?.type === 'TIBIA_BOT_AUTH_SYNC' || message?.type === 'TIBIA_BOT_AUTH_GET') {
        const result = await syncAuthFromSite(message.reason || message.type);
        sendResponse({ success: true, ...result });
        return;
      }

      if (message?.type === 'TIBIA_BOT_VERSION_CHECK') {
        const gate = (await fetchRequiredVersionFromApi()) || (await getVersionGate());
        sendResponse({ success: true, ...(gate || {}) });
        return;
      }

      if (message?.type === 'TIBIA_BOT_AUTH_REQUIRE') {
        const result = await requireAuth();
        sendResponse({ success: true, ...result });
        return;
      }

      if (message?.type === 'BAIAKIDLE_GO_HUNT') {
        const tabId = message.tabId || _sender?.tab?.id;
        if (!tabId) throw new Error('tabId ausente');
        await requireAuth();
        const gate = await getVersionGate();
        if (gate?.outdated) {
          throw new Error(gate.message || 'Atualize a extensão.');
        }
        const huntName =
          message.huntName ||
          (await chrome.storage.local.get('baiakIdleSelectedHunt')).baiakIdleSelectedHunt?.name;
        const result = await injectGoToHunt(tabId, huntName);
        sendResponse(result);
        return;
      }

      if (message?.type === 'BAIAKIDLE_GO_BOSS') {
        const tabId = message.tabId || _sender?.tab?.id;
        if (!tabId) throw new Error('tabId ausente');
        await requireAuth();
        const gate = await getVersionGate();
        if (gate?.outdated) {
          throw new Error(gate.message || 'Atualize a extensão.');
        }
        const bossName = String(message.bossName || '').trim();
        if (!bossName) throw new Error('Nome do boss ausente.');
        const result = await injectGoToBoss(tabId, bossName, {
          bossId: message.bossId,
          helperEquip: message.helperEquip
        });
        sendResponse(result);
        return;
      }

      if (message?.type === 'BAIAKIDLE_ENSURE_BOSSES') {
        const tabId = message.tabId || _sender?.tab?.id;
        if (!tabId) throw new Error('tabId ausente');
        await requireAuth();
        const result = await ensureBossesCatalog(tabId, {
          force: !!message.force
        });
        sendResponse(result);
        return;
      }

      if (message?.type === 'BAIAKIDLE_ENSURE_HUNTS') {
        const tabId = message.tabId || _sender?.tab?.id;
        if (!tabId) throw new Error('tabId ausente');
        await requireAuth();
        const result = await ensureHuntsCatalog(tabId, {
          force: !!message.force
        });
        sendResponse(result);
        return;
      }

      if (message?.type === 'BAIAKIDLE_ENSURE_CODEX') {
        const tabId = message.tabId || _sender?.tab?.id;
        if (!tabId) throw new Error('tabId ausente');
        await requireAuth();
        const result = await ensureCodexCatalog(tabId, {
          force: !!message.force
        });
        sendResponse(result);
        return;
      }

      const parsed = moduleNameFromMessage(message?.type);
      if (parsed) {
        const meta = MODULES[parsed.name];
        if (!meta) throw new Error(`Módulo desconhecido: ${parsed.name}`);

        if (meta.backgroundNav && parsed.name === 'reconect') {
          const tabId = message.tabId || _sender?.tab?.id || null;
          if (parsed.action === 'start') {
            await requireVipForModule(parsed.name);
            await chrome.storage.local.set({ [meta.storageKey]: true });
            await startReconectWatcher();
            let result = { success: true };
            if (tabId) {
              try {
                const tab = await chrome.tabs.get(tabId);
                if (isBaiakIdlePlayUrl(tab?.url)) {
                  result = await injectModule(tabId, parsed.name, { autoStart: true });
                }
              } catch (_) {}
            }
            await broadcastOverlay(tabId);
            sendResponse(result);
          } else {
            const auth = await requireAuth();
            if (!auth.loggedIn) {
              throw new Error('Faça login em tibiabot.online para usar os módulos.');
            }
            await chrome.storage.local.set({ [meta.storageKey]: false });
            await stopReconectWatcher();
            if (tabId) {
              try {
                await stopModule(tabId, parsed.name);
              } catch (_) {}
            }
            await broadcastOverlay(tabId);
            sendResponse({ success: true });
          }
          return;
        }

        const tabId = message.tabId || _sender?.tab?.id;
        if (!tabId) throw new Error('tabId ausente');

        if (parsed.action === 'start') {
          await requireVipForModule(parsed.name);
          if (!meta.oneShot) {
            await chrome.storage.local.set({ [meta.storageKey]: true });
          } else {
            await chrome.storage.local.set({ [meta.storageKey]: false });
          }
          // Kills/h precisa do catálogo (sprite + exp por monstro) no MAIN
          if (parsed.name === 'kills_hora') {
            try {
              await ensureHuntsCatalog(tabId, { force: false });
            } catch (_) {}
          }
          const result = await injectModule(tabId, parsed.name, { autoStart: true });
          await broadcastOverlay(tabId);
          sendResponse(result);
        } else {
          const auth = await requireAuth();
          if (!auth.loggedIn) {
            throw new Error('Faça login em tibiabot.online para usar os módulos.');
          }
          await chrome.storage.local.set({ [meta.storageKey]: false });
          const result = await stopModule(tabId, parsed.name);
          await broadcastOverlay(tabId);
          sendResponse(result);
        }
        return;
      }

      if (message?.type === 'TIBIA_BOT_INJECT_PRESENCA') {
        const tabId = message.tabId || _sender?.tab?.id;
        const url = message.url || _sender?.tab?.url;
        if (!tabId || !isBaiakIdlePlayUrl(url)) {
          sendResponse({ success: true, skipped: true });
          return;
        }
        const result = await injectPresencaIntoTab(tabId);
        sendResponse(result);
        return;
      }

      if (message?.type === 'BAIAKIDLE_PAGE_READY' || message?.type === 'TIBIA_BOT_PAGE_READY') {
        const tabId = message.tabId || _sender?.tab?.id;
        const url = message.url || _sender?.tab?.url;
        if (!isBaiakIdlePlayUrl(url)) {
          sendResponse({ success: true, skipped: true });
          return;
        }
        const auth = await requireAuth();
        if (!auth.loggedIn || !auth.vip) {
          sendResponse({
            success: true,
            skipped: true,
            reason: !auth.loggedIn ? 'not_logged_in' : 'no_vip'
          });
          return;
        }
        // late inject só se o boot ainda mantiver o hold sem claim
        void injectPresencaIntoTab(tabId);
        await maybeReinjectOnTab(tabId, url);
        sendResponse({ success: true });
        return;
      }

      if (message?.type === 'TIBIA_BOT_SYNC_OVERLAY') {
        if (message.tabId) {
          const tab = await chrome.tabs.get(message.tabId);
          if (!isBaiakIdlePlayUrl(tab?.url)) {
            sendResponse({ success: true, skipped: true });
            return;
          }
        }
        await broadcastOverlay(message.tabId || null);
        sendResponse({ success: true });
        return;
      }

      if (message?.type === 'TIBIA_BOT_GET_ACTIVE_MODULES') {
        const senderUrl = _sender?.tab?.url || '';
        if (_sender?.tab?.id && !isBaiakIdlePlayUrl(senderUrl)) {
          sendResponse({ success: false, error: 'Fora da página do jogo' });
          return;
        }
        sendResponse({ success: true, payload: await getActiveModulesSnapshot() });
        return;
      }

      if (message?.type === 'TIBIA_BOT_PUSH_MAIN_VARS') {
        const tabId = message.tabId || _sender?.tab?.id;
        if (!tabId) {
          sendResponse({ success: false, error: 'Tab inválida' });
          return;
        }
        const tab = await chrome.tabs.get(tabId);
        if (!isBaiakIdlePlayUrl(tab?.url)) {
          sendResponse({ success: true, skipped: true });
          return;
        }
        await pushMainWorldVars(tabId, message.vars || {});
        sendResponse({ success: true });
        return;
      }

      sendResponse({ success: false, error: 'Mensagem desconhecida' });
    } catch (error) {
      sendResponse({ success: false, error: error?.message || String(error) });
    }
  })();

  return true;
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') return;
  const touched = Object.keys(changes).some((key) =>
    Object.values(MODULES).some((m) => m.storageKey === key)
  );
  if (touched) {
    broadcastOverlay();
  }

  if (changes.baiakIdleReconectEnabled) {
    void syncReconectWatcherFromStorage();
  }

  if (
    changes.baiakIdleAutoBossAutoCycle ||
    changes.baiakIdleAutoBossCycleStartedAt
  ) {
    void syncAutoBossCycleSchedule();
    void broadcastOverlay();
  }

  if (changes.baiakIdleAutoBossSoloEscape) {
    const enabled = !!changes.baiakIdleAutoBossSoloEscape.newValue;
    void broadcastOverlay();
    (async () => {
      try {
        const tabs = await chrome.tabs.query({
          url: [
            'https://baiakidle.com/jogar',
            'https://baiakidle.com/jogar/*',
            'https://www.baiakidle.com/jogar',
            'https://www.baiakidle.com/jogar/*'
          ]
        });
        await Promise.all(
          (tabs || []).map(async (tab) => {
            if (!tab?.id) return;
            try {
              await pushMainWorldVars(tab.id, { autoBossSoloEscape: enabled });
            } catch (_) {}
          })
        );
      } catch (_) {}
    })();
  }

  if (changes.baiakIdleAutoBossFightTimer) {
    const raw = changes.baiakIdleAutoBossFightTimer.newValue || {};
    const cfg = {
      enabled: !!raw.enabled,
      minutes: Math.max(1, Math.min(300, Math.round(Number(raw.minutes) || 30)))
    };
    void broadcastOverlay();
    (async () => {
      try {
        const tabs = await chrome.tabs.query({
          url: [
            'https://baiakidle.com/jogar',
            'https://baiakidle.com/jogar/*',
            'https://www.baiakidle.com/jogar',
            'https://www.baiakidle.com/jogar/*'
          ]
        });
        await Promise.all(
          (tabs || []).map(async (tab) => {
            if (!tab?.id) return;
            try {
              await pushMainWorldVars(tab.id, { autoBossFightTimer: cfg });
            } catch (_) {}
          })
        );
      } catch (_) {}
    })();
  }

  if (changes.baiakIdleAutoBossEndHelperEquip) {
    const enabled = !!changes.baiakIdleAutoBossEndHelperEquip.newValue;
    void broadcastOverlay();
    (async () => {
      try {
        const tabs = await chrome.tabs.query({
          url: [
            'https://baiakidle.com/jogar',
            'https://baiakidle.com/jogar/*',
            'https://www.baiakidle.com/jogar',
            'https://www.baiakidle.com/jogar/*'
          ]
        });
        await Promise.all(
          (tabs || []).map(async (tab) => {
            if (!tab?.id) return;
            try {
              await pushMainWorldVars(tab.id, { autoBossEndHelperEquip: enabled });
            } catch (_) {}
          })
        );
      } catch (_) {}
    })();
  }

  if (changes.baiakIdleSelectedHunt) {
    const hunt = changes.baiakIdleSelectedHunt.newValue || null;
    (async () => {
      try {
        const tabs = await chrome.tabs.query({
          url: [
            'https://baiakidle.com/jogar',
            'https://baiakidle.com/jogar/*',
            'https://www.baiakidle.com/jogar',
            'https://www.baiakidle.com/jogar/*'
          ]
        });
        await Promise.all(
          (tabs || []).map(async (tab) => {
            if (!tab?.id) return;
            try {
              await pushMainWorldVars(tab.id, { selectedHunt: hunt });
            } catch (_) {}
          })
        );
      } catch (_) {}
    })();
  }

  if (changes.baiakIdleMoverItensTiers) {
    const tiers = changes.baiakIdleMoverItensTiers.newValue || {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false
    };
    (async () => {
      try {
        const tabs = await chrome.tabs.query({
          url: [
            'https://baiakidle.com/jogar',
            'https://baiakidle.com/jogar/*',
            'https://www.baiakidle.com/jogar',
            'https://www.baiakidle.com/jogar/*'
          ]
        });
        await Promise.all(
          (tabs || []).map(async (tab) => {
            if (!tab?.id) return;
            try {
              await pushMainWorldVars(tab.id, { moverTiers: tiers });
            } catch (_) {}
          })
        );
      } catch (_) {}
    })();
  }

  if (changes.baiakIdleStaminaConfig) {
    const staminaCfg = changes.baiakIdleStaminaConfig.newValue || {
      minPct: 15,
      maxPct: 30
    };
    (async () => {
      try {
        const tabs = await chrome.tabs.query({
          url: [
            'https://baiakidle.com/jogar',
            'https://baiakidle.com/jogar/*',
            'https://www.baiakidle.com/jogar',
            'https://www.baiakidle.com/jogar/*'
          ]
        });
        await Promise.all(
          (tabs || []).map(async (tab) => {
            if (!tab?.id) return;
            try {
              await pushMainWorldVars(tab.id, { staminaConfig: staminaCfg });
            } catch (_) {}
          })
        );
      } catch (_) {}
    })();
  }

  if (changes.baiakIdleAutoSellVenderLootBoss) {
    const venderLootBoss = !!changes.baiakIdleAutoSellVenderLootBoss.newValue;
    (async () => {
      try {
        const tabs = await chrome.tabs.query({
          url: [
            'https://baiakidle.com/jogar',
            'https://baiakidle.com/jogar/*',
            'https://www.baiakidle.com/jogar',
            'https://www.baiakidle.com/jogar/*'
          ]
        });
        await Promise.all(
          (tabs || []).map(async (tab) => {
            if (!tab?.id) return;
            try {
              await pushMainWorldVars(tab.id, { venderLootBoss });
            } catch (_) {}
          })
        );
      } catch (_) {}
    })();
  }

  if (changes.baiakIdleCodexPlaylist) {
    const codexPlaylist = Array.isArray(changes.baiakIdleCodexPlaylist.newValue)
      ? changes.baiakIdleCodexPlaylist.newValue
      : [];
    (async () => {
      try {
        const tabs = await chrome.tabs.query({
          url: [
            'https://baiakidle.com/jogar',
            'https://baiakidle.com/jogar/*',
            'https://www.baiakidle.com/jogar',
            'https://www.baiakidle.com/jogar/*'
          ]
        });
        await Promise.all(
          (tabs || []).map(async (tab) => {
            if (!tab?.id) return;
            try {
              await pushMainWorldVars(tab.id, { codexPlaylist });
            } catch (_) {}
          })
        );
      } catch (_) {}
    })();
  }

  if (changes.baiakIdleCodexEnabled) {
    const codexEnabled = changes.baiakIdleCodexEnabled.newValue !== false;
    (async () => {
      try {
        const tabs = await chrome.tabs.query({
          url: [
            'https://baiakidle.com/jogar',
            'https://baiakidle.com/jogar/*',
            'https://www.baiakidle.com/jogar',
            'https://www.baiakidle.com/jogar/*'
          ]
        });
        await Promise.all(
          (tabs || []).map(async (tab) => {
            if (!tab?.id) return;
            try {
              await pushMainWorldVars(tab.id, { codexEnabled });
            } catch (_) {}
          })
        );
      } catch (_) {}
    })();
  }

  if (changes.baiakIdleBossHelperEquip) {
    const bossHelperEquip = normalizeBossHelperEquipMap(
      changes.baiakIdleBossHelperEquip.newValue
    );
    (async () => {
      try {
        const tabs = await chrome.tabs.query({
          url: [
            'https://baiakidle.com/jogar',
            'https://baiakidle.com/jogar/*',
            'https://www.baiakidle.com/jogar',
            'https://www.baiakidle.com/jogar/*'
          ]
        });
        await Promise.all(
          (tabs || []).map(async (tab) => {
            if (!tab?.id) return;
            try {
              await pushMainWorldVars(tab.id, { bossHelperEquip });
            } catch (_) {}
          })
        );
      } catch (_) {}
    })();
  }

  if (changes.baiakIdleAutoSellConfig) {
    const autoSellCfg = changes.baiakIdleAutoSellConfig.newValue || { minPct: 70 };
    (async () => {
      try {
        const tabs = await chrome.tabs.query({
          url: [
            'https://baiakidle.com/jogar',
            'https://baiakidle.com/jogar/*',
            'https://www.baiakidle.com/jogar',
            'https://www.baiakidle.com/jogar/*'
          ]
        });
        await Promise.all(
          (tabs || []).map(async (tab) => {
            if (!tab?.id) return;
            try {
              await pushMainWorldVars(tab.id, { autoSellConfig: autoSellCfg });
            } catch (_) {}
          })
        );
      } catch (_) {}
    })();
  }

  if (changes.baiakIdleAutoAnuncioConfig) {
    const autoAnuncioCfg = changes.baiakIdleAutoAnuncioConfig.newValue || {
      channel: 'geral',
      text: '',
      intervalMin: 5
    };
    (async () => {
      try {
        const tabs = await chrome.tabs.query({
          url: [
            'https://baiakidle.com/jogar',
            'https://baiakidle.com/jogar/*',
            'https://www.baiakidle.com/jogar',
            'https://www.baiakidle.com/jogar/*'
          ]
        });
        await Promise.all(
          (tabs || []).map(async (tab) => {
            if (!tab?.id) return;
            try {
              await pushMainWorldVars(tab.id, { autoAnuncioConfig: autoAnuncioCfg });
            } catch (_) {}
          })
        );
      } catch (_) {}
    })();
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (isBaiakIdlePlayUrl(tab?.url)) {
    // cedo: loading / troca de URL — limpa marca de injeção da navegação anterior
    if (changeInfo.status === 'loading' || changeInfo.url) {
      presencaInjectInFlight.delete(tabId);
      void injectPresencaIntoTab(tabId);
    }
  }
  if (changeInfo.status !== 'complete') return;
  maybeReinjectOnTab(tabId, tab?.url);
  if (isBaiakIdleHomeUrl(tab?.url)) {
    void tickReconect();
  }
});

chrome.tabs.onRemoved.addListener(() => {
  void tickReconect();
});
