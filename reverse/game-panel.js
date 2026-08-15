// Modal in-page do TibiaBot (Baiak Idle /jogar/) — mesma lógica/mensagens do popup

(function () {
  const ROOT_ID = 'tibia-bot-game-panel-root';
  const STYLE_ID = 'tibia-bot-game-panel-style';
  const STORAGE_KEY_SELECTED_HUNT = 'baiakIdleSelectedHunt';
  const STORAGE_KEY_HUNT_RANK = 'baiakIdleHuntRank';
  const STORAGE_KEY_CODEX_PLAYLIST = 'baiakIdleCodexPlaylist';
  /** Master on/off da entrega automática do Codex (Auto Sell). Default: ligado. */
  const STORAGE_KEY_CODEX_ENABLED = 'baiakIdleCodexEnabled';
  /** Overlay de status dos Codex selecionados. */
  const STORAGE_KEY_CODEX_OVERLAY = 'baiakIdleCodexOverlayEnabled';
  const STORAGE_KEY_CODEX_OVERLAY_POS = 'baiakIdleCodexOverlayPos';
  const CODEX_STATUS_OVERLAY_ID = 'tibia-bot-codex-status-overlay';
  const CODEX_ITEM_DONE_KEY = '__baiakIdleCodexItemDone';
  const CODEX_PLAYLIST_MAX = 5;
  const STORAGE_KEY_MOVER_TIERS = 'baiakIdleMoverItensTiers';
  const STORAGE_KEY_MOVER_ENABLED = 'baiakIdleMoverItensEnabled';
  const STORAGE_KEY_STAMINA_CONFIG = 'baiakIdleStaminaConfig';
  const STORAGE_KEY_STAMINA_ENABLED = 'baiakIdleStaminaEnabled';
  const STORAGE_KEY_XP_HORA_ENABLED = 'baiakIdleXpHoraEnabled';
  const STORAGE_KEY_GOLD_HORA_ENABLED = 'baiakIdleGoldHoraEnabled';
  const STORAGE_KEY_MAPA_ENTIDADES_ENABLED = 'baiakIdleMapaEntidadesEnabled';
  const STORAGE_KEY_RETORNAR_HUNT_ENABLED = 'baiakIdleRetornarHuntEnabled';
  const STORAGE_KEY_RECONECT_ENABLED = 'baiakIdleReconectEnabled';
  const STORAGE_KEY_AUTO_SELL_VENDER_LOOT_BOSS = 'baiakIdleAutoSellVenderLootBoss';
  const STORAGE_KEY_AUTO_SELL_CONFIG = 'baiakIdleAutoSellConfig';
  const STORAGE_KEY_AUTO_ANUNCIO_CONFIG = 'baiakIdleAutoAnuncioConfig';
  const STORAGE_KEY_AUTO_ANUNCIO_ENABLED = 'baiakIdleAutoAnuncioEnabled';
  const STORAGE_KEY_CHARACTERS = 'baiakIdleCharacters';
  const STORAGE_KEY_OVERLAY_VISIBLE = 'tibiaBotOverlayVisible';
  const STORAGE_KEY_OCULTAR_NOMES = 'baiakIdleOcultarNomesEnabled';
  const STORAGE_KEY_BOSS_TRACK = 'baiakIdleBossTrack';
  const STORAGE_KEY_AUTOBOSS_PLAYLIST = 'baiakIdleAutoBossPlaylist';
  /** Presets 1–3; PLAYLIST espelha o preset ativo (compat. background/ciclo). */
  const STORAGE_KEY_AUTOBOSS_PRESETS = 'baiakIdleAutoBossPresets';
  const STORAGE_KEY_AUTOBOSS_RUN = 'baiakIdleAutoBossRun';
  const STORAGE_KEY_AUTOBOSS_AUTO_CYCLE = 'baiakIdleAutoBossAutoCycle';
  const STORAGE_KEY_AUTOBOSS_CYCLE_STARTED_AT = 'baiakIdleAutoBossCycleStartedAt';
  const STORAGE_KEY_AUTOBOSS_SOLO_ESCAPE = 'baiakIdleAutoBossSoloEscape';
  const STORAGE_KEY_AUTOBOSS_FIGHT_TIMER = 'baiakIdleAutoBossFightTimer';
  const STORAGE_KEY_AUTOBOSS_END_HELPER_EQUIP = 'baiakIdleAutoBossEndHelperEquip';
  const DEFAULT_FIGHT_TIMER_MIN = 30;
  const STORAGE_KEY_BOSS_HELPER_EQUIP = 'baiakIdleBossHelperEquip';
  /** Reinício automático diário (horário local); jogo zera à 00:00. */
  const AUTOBOSS_CYCLE_HOUR = 0;
  const AUTOBOSS_CYCLE_MINUTE = 5;
  const AUTOBOSS_PLAYLIST_MAX = 40;
  const AUTOBOSS_PRESET_IDS = [1, 2, 3];
  const BOSS_HELPER_ITEM_IMG = {
    ssa: 'https://baiakidle.com/api/things/object/3081.png',
    mightRing: 'https://baiakidle.com/api/things/object/3048.png'
  };
  const SITE_URL = 'https://tibiabot.online/';
  const CONTA_URL = 'https://tibiabot.online/conta.html';

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
    if (due.getTime() <= from) due.setDate(due.getDate() + 1);
    return due.getTime();
  }

  function bossDailyCooldownExpiresAt(fromMs) {
    const from = Math.max(0, Number(fromMs) || Date.now());
    const d = new Date(from);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, 0, 0, 0, 0).getTime();
  }

  const MODULES = [
    {
      id: 'pular_boss',
      storageKey: 'baiakIdlePularBossEnabled',
      toggleId: 'gpPularBossToggle',
      startMsg: 'BAIAKIDLE_START_PULAR_BOSS',
      stopMsg: 'BAIAKIDLE_STOP_PULAR_BOSS',
      label: 'Pular Boss',
      desc: 'Detecta o boss e reinicia a hunt.',
      hidden: true
    },
    {
      id: 'member_dead',
      storageKey: 'baiakIdleMemberDeadEnabled',
      toggleId: 'gpMemberDeadToggle',
      startMsg: 'BAIAKIDLE_START_MEMBER_DEAD',
      stopMsg: 'BAIAKIDLE_STOP_MEMBER_DEAD',
      label: 'Membro Morto',
      desc: 'Detecta membro morto e reinicia a hunt.'
    },
    {
      id: 'retornar_hunt',
      storageKey: STORAGE_KEY_RETORNAR_HUNT_ENABLED,
      toggleId: 'gpRetornarHuntToggle',
      startMsg: 'BAIAKIDLE_START_RETORNAR_HUNT',
      stopMsg: 'BAIAKIDLE_STOP_RETORNAR_HUNT',
      label: 'Retornar Hunt',
      desc: 'Manutenção → reconectar · Cidade → hunt ativa.'
    },
    {
      id: 'reconect',
      storageKey: STORAGE_KEY_RECONECT_ENABLED,
      toggleId: 'gpReconectToggle',
      startMsg: 'BAIAKIDLE_START_RECONECT',
      stopMsg: 'BAIAKIDLE_STOP_RECONECT',
      label: 'Reconect',
      desc: 'Home → /jogar/ · sem char online → F5 a cada 30s.'
    },
    {
      id: 'auto_sell',
      storageKey: 'baiakIdleAutoSellEnabled',
      toggleId: 'gpAutoSellToggle',
      startMsg: 'BAIAKIDLE_START_AUTO_SELL',
      stopMsg: 'BAIAKIDLE_STOP_AUTO_SELL',
      label: 'Auto Sell',
      desc: 'Vende quando a mochila atinge o % configurado.',
      kind: 'auto_sell'
    },
    {
      id: 'stamina',
      storageKey: STORAGE_KEY_STAMINA_ENABLED,
      toggleId: 'gpStaminaToggle',
      startMsg: 'BAIAKIDLE_START_STAMINA',
      stopMsg: 'BAIAKIDLE_STOP_STAMINA',
      label: 'Stamina',
      desc: '% mínima → treino online · % máxima → volta à hunt.',
      kind: 'stamina'
    },
    {
      id: 'xp_hora',
      storageKey: STORAGE_KEY_XP_HORA_ENABLED,
      toggleId: 'gpXpHoraToggle',
      startMsg: 'BAIAKIDLE_START_XP_HORA',
      stopMsg: 'BAIAKIDLE_STOP_XP_HORA',
      label: 'XP/h',
      desc: 'XP/h = XP Gain ÷ Session (#an-session). Tempo da sessão fica ao lado de Baiak-Idle no overlay.'
    },
    {
      id: 'gold_hora',
      storageKey: STORAGE_KEY_GOLD_HORA_ENABLED,
      toggleId: 'gpGoldHoraToggle',
      startMsg: 'BAIAKIDLE_START_GOLD_HORA',
      stopMsg: 'BAIAKIDLE_STOP_GOLD_HORA',
      label: 'Gold/h',
      desc: 'Gold/h = Balance ÷ Session (#an-session). Tempo da sessão fica ao lado de Baiak-Idle no overlay.'
    },
    {
      id: 'gold_media',
      storageKey: 'baiakIdleGoldMediaEnabled',
      runBtnId: 'gpGoldMediaRun',
      startMsg: 'BAIAKIDLE_START_GOLD_MEDIA',
      stopMsg: 'BAIAKIDLE_STOP_GOLD_MEDIA',
      label: 'Média Gold',
      desc: 'Market → Histórico (3 pág.) · coins por 100.000.000 gold.',
      kind: 'gold_media',
      oneShot: true
    },
    {
      id: 'recarregar_itens',
      storageKey: 'baiakIdleRecarregarItensEnabled',
      toggleId: 'gpRecarregarItensToggle',
      startMsg: 'BAIAKIDLE_START_RECARREGAR_ITENS',
      stopMsg: 'BAIAKIDLE_STOP_RECARREGAR_ITENS',
      label: 'Recarregar',
      desc: 'Itens vazios no backpack → Recarregar com silver token.'
    },
    {
      id: 'coletar_recompensa',
      storageKey: 'baiakIdleColetarRecompensaEnabled',
      toggleId: 'gpColetarRecompensaToggle',
      startMsg: 'BAIAKIDLE_START_COLETAR_RECOMPENSA',
      stopMsg: 'BAIAKIDLE_STOP_COLETAR_RECOMPENSA',
      label: 'Daily Reward',
      desc: 'Coleta a recompensa diária quando o badge do Daily estiver disponível.'
    },
    {
      id: 'kills_hora',
      storageKey: 'baiakIdleKillsHoraEnabled',
      toggleId: 'gpKillsHoraToggle',
      startMsg: 'BAIAKIDLE_START_KILLS_HORA',
      stopMsg: 'BAIAKIDLE_STOP_KILLS_HORA',
      label: 'Kills/h',
      desc: 'Conta quantos monstros foram mortos e qual o melhor para ativar Prey.',
      kind: 'kills_hora'
    },
    {
      id: 'mapa_entidades',
      storageKey: STORAGE_KEY_MAPA_ENTIDADES_ENABLED,
      toggleId: 'gpMapaEntidadesToggle',
      startMsg: 'BAIAKIDLE_START_MAPA_ENTIDADES',
      stopMsg: 'BAIAKIDLE_STOP_MAPA_ENTIDADES',
      label: 'Mapa',
      desc: 'Mini-mapa de party/monstros via nameplates (teste). Posição sticky.',
      hidden: true
    },
    {
      id: 'auto_anuncio',
      storageKey: STORAGE_KEY_AUTO_ANUNCIO_ENABLED,
      toggleId: 'gpAutoAnuncioToggle',
      startMsg: 'BAIAKIDLE_START_AUTO_ANUNCIO',
      stopMsg: 'BAIAKIDLE_STOP_AUTO_ANUNCIO',
      label: 'Auto Anúncio',
      desc: 'Envia sua mensagem no canal escolhido em intervalo.',
      kind: 'auto_anuncio'
    },
    {
      id: 'mover_itens',
      storageKey: STORAGE_KEY_MOVER_ENABLED,
      startMsg: 'BAIAKIDLE_START_MOVER_ITENS',
      stopMsg: 'BAIAKIDLE_STOP_MOVER_ITENS',
      label: 'Mover Itens',
      desc: 'Move os itens com tier escolhido para o backpack.',
      kind: 'tiers'
    }
  ];

  /** @type {{ loggedIn?: boolean, vip?: boolean, contaStatus?: any, user?: any, extensionOutdated?: boolean, requiredVersion?: string, installedVersion?: string, versionMessage?: string }} */
  let lastAuth = { loggedIn: false, vip: false, extensionOutdated: false };
  let currentHuntRankId = 'todas';
  let currentCodexRankId = 'todas';
  let currentCodexTab = 'catalog'; // catalog | selected
  /** @type {Array<{id:number,name:string,huntName?:string,slug?:string}>} */
  let codexPlaylist = [];
  /** Entrega automática do Codex (antes da venda). Default true. */
  let codexEnabled = true;
  /** Overlay de status dos Codex ativos. */
  let codexOverlayEnabled = false;
  let codexOverlayTimer = null;
  let codexOverlayDragBound = false;
  /** @type {{ left: number, top: number } | null} */
  let codexOverlayPos = null;
  /** @type {{ name?: string, level?: number } | null} */
  let selectedHunt = null;
  let expandedHuntName = '';
  let huntCodexOpenName = '';
  let huntsEnsurePromise = null;
  let codexEnsurePromise = null;
  let bound = false;

  function isBaiakIdlePlayPage() {
    try {
      const host = String(location.hostname || '').toLowerCase();
      if (host !== 'baiakidle.com' && host !== 'www.baiakidle.com') return false;
      const path = String(location.pathname || '');
      return path === '/jogar' || path === '/jogar/' || path.startsWith('/jogar/');
    } catch (_) {
      return false;
    }
  }

  if (!isBaiakIdlePlayPage()) return;

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function setStatus(message, type) {
    const node = $('#gpStatus');
    if (!node) return;
    node.textContent = message || '';
    node.className = 'gp-status' + (type ? ' ' + type : '');
  }

  function formatVipEnd(ts) {
    const n = Number(ts) || 0;
    if (!n) return '';
    const d = new Date(n * 1000);
    const pad = (x) => (x < 10 ? '0' + x : String(x));
    return (
      pad(d.getDate()) +
      '/' +
      pad(d.getMonth() + 1) +
      '/' +
      d.getFullYear() +
      ' ' +
      pad(d.getHours()) +
      ':' +
      pad(d.getMinutes())
    );
  }

  function isVipAuth(auth) {
    if (!auth?.loggedIn) return false;
    if (auth.vip === true) return true;
    const cs = auth.contaStatus;
    if (!cs?.vip) return false;
    const fim = Number(cs.data_final) || 0;
    if (fim && fim * 1000 <= Date.now()) return false;
    return true;
  }

  async function syncAuth() {
    try {
      const res = await chrome.runtime.sendMessage({ type: 'TIBIA_BOT_AUTH_SYNC', reason: 'game-panel' });
      return res || { loggedIn: false, vip: false };
    } catch (_) {
      return { loggedIn: false, vip: false };
    }
  }

  function ensureStyles() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      (document.head || document.documentElement).appendChild(style);
    }
    style.textContent = `
      #${ROOT_ID} {
        --gp-bg: #0c1219;
        --gp-panel: #141c27;
        --gp-line: #243041;
        --gp-text: #e8eef6;
        --gp-muted: #93a4b8;
        --gp-ok: #3dba7a;
        --gp-accent: #d4a24c;
        --gp-err: #f87171;
        position: fixed;
        inset: 0;
        z-index: 2147483000;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 16px;
        font-family: "Segoe UI", Tahoma, sans-serif;
        color: var(--gp-text);
      }
      #${ROOT_ID}.is-open { display: flex; }
      #${ROOT_ID} .gp-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(6, 10, 16, 0.72);
        backdrop-filter: blur(2px);
      }
      #${ROOT_ID} .gp-dialog {
        position: relative;
        z-index: 1;
        width: min(760px, calc(100vw - 24px));
        max-height: min(92vh, 860px);
        overflow: auto;
        border: 1px solid var(--gp-line);
        border-radius: 14px;
        background:
          radial-gradient(120% 90% at 100% 0%, rgba(212, 162, 76, 0.14) 0%, transparent 45%),
          radial-gradient(120% 100% at 0% 0%, #162033 0%, var(--gp-bg) 55%);
        box-shadow: 0 18px 48px rgba(0, 0, 0, 0.45);
        padding: 16px;
        transition: width 0.18s ease;
      }
      #${ROOT_ID}.is-autoboss-open .gp-dialog {
        width: min(840px, calc(100vw - 24px));
        overflow: hidden;
      }
      #${ROOT_ID}.is-hunt-open .gp-dialog,
      #${ROOT_ID}.is-codex-open .gp-dialog {
        width: min(1040px, calc(100vw - 24px));
        overflow: hidden;
      }
      #${ROOT_ID} #gpModules {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
        align-items: start;
      }
      #${ROOT_ID} #gpModules .gp-module {
        margin-bottom: 0;
        height: 100%;
      }
      #${ROOT_ID} #gpModules .gp-module[data-module="auto_anuncio"],
      #${ROOT_ID} #gpModules .gp-module[data-module="stamina"],
      #${ROOT_ID} #gpModules .gp-module[data-module="mover_itens"],
      #${ROOT_ID} #gpModules .gp-module[data-module="auto_sell"],
      #${ROOT_ID} #gpModules .gp-module[data-module="kills_hora"],
      #${ROOT_ID} #gpModules .gp-module[data-module="gold_media"] {
        grid-column: 1 / -1;
      }
      @media (max-width: 640px) {
        #${ROOT_ID} #gpModules {
          grid-template-columns: 1fr;
        }
        #${ROOT_ID} #gpModules .gp-module[data-module="auto_anuncio"],
        #${ROOT_ID} #gpModules .gp-module[data-module="stamina"],
        #${ROOT_ID} #gpModules .gp-module[data-module="mover_itens"],
        #${ROOT_ID} #gpModules .gp-module[data-module="auto_sell"],
        #${ROOT_ID} #gpModules .gp-module[data-module="kills_hora"],
        #${ROOT_ID} #gpModules .gp-module[data-module="gold_media"] {
          grid-column: auto;
        }
      }
      #${ROOT_ID} .gp-brand {
        font-size: 11px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--gp-muted);
        margin-bottom: 4px;
      }
      #${ROOT_ID} .gp-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 12px;
      }
      #${ROOT_ID} .gp-title {
        margin: 0;
        font-size: 20px;
        font-weight: 700;
      }
      #${ROOT_ID} .gp-top-actions {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
        position: relative;
      }
      #${ROOT_ID} .gp-close,
      #${ROOT_ID} .gp-gear {
        border: 1px solid var(--gp-line);
        background: var(--gp-panel);
        color: var(--gp-text);
        border-radius: 8px;
        width: 34px;
        height: 34px;
        cursor: pointer;
        font-size: 18px;
        line-height: 1;
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }
      #${ROOT_ID} .gp-gear {
        font-size: 16px;
        color: var(--gp-muted);
      }
      #${ROOT_ID} .gp-gear:hover,
      #${ROOT_ID} .gp-gear.is-open {
        color: var(--gp-accent);
        border-color: rgba(212, 162, 76, 0.55);
      }
      #${ROOT_ID} .gp-settings {
        display: none;
        position: absolute;
        top: calc(100% + 6px);
        right: 0;
        z-index: 5;
        min-width: 240px;
        max-width: 300px;
        max-height: min(70vh, 420px);
        overflow: auto;
        padding: 10px 12px;
        border: 1px solid var(--gp-line);
        border-radius: 10px;
        background: var(--gp-panel);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
      }
      #${ROOT_ID} .gp-settings.is-open { display: block; }
      #${ROOT_ID} .gp-settings-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      #${ROOT_ID} .gp-settings-row + .gp-settings-row {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid var(--gp-line);
      }
      #${ROOT_ID} .gp-settings-label {
        font-size: 12px;
        color: var(--gp-text);
        line-height: 1.35;
      }
      #${ROOT_ID} .gp-settings-hint {
        margin: 2px 0 0;
        font-size: 11px;
        color: var(--gp-muted);
      }
      #${ROOT_ID} .gp-settings-chars {
        display: block;
      }
      #${ROOT_ID} .gp-settings-chars-head {
        font-size: 12px;
        font-weight: 700;
        color: var(--gp-text);
        margin: 0 0 6px;
      }
      #${ROOT_ID} .gp-settings-chars-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      #${ROOT_ID} .gp-settings-char {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 6px 8px;
        border: 1px solid rgba(212, 162, 76, 0.2);
        border-radius: 8px;
        background: rgba(18, 26, 39, 0.7);
      }
      #${ROOT_ID} .gp-settings-char-name {
        font-size: 12px;
        font-weight: 700;
        color: var(--gp-text);
        line-height: 1.3;
        word-break: break-word;
      }
      #${ROOT_ID} .gp-settings-char-meta {
        font-size: 11px;
        color: var(--gp-muted);
        line-height: 1.3;
      }
      #${ROOT_ID} .gp-settings-chars-empty {
        margin: 0;
        font-size: 11px;
        color: var(--gp-muted);
        line-height: 1.35;
      }
      #${ROOT_ID} .gp-userrow {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 10px;
        font-size: 12px;
        color: var(--gp-muted);
      }
      #${ROOT_ID} .gp-vip-pill {
        display: inline-flex;
        align-items: center;
        padding: 2px 8px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        border: 1px solid transparent;
      }
      #${ROOT_ID} .gp-vip-pill.is-vip {
        color: #bbf7d0;
        background: rgba(22, 101, 52, 0.28);
        border-color: #166534;
      }
      #${ROOT_ID} .gp-vip-pill.is-free {
        color: #fecaca;
        background: rgba(127, 29, 29, 0.22);
        border-color: #7f1d1d;
      }
      #${ROOT_ID} .gp-banner {
        border: 1px solid;
        border-radius: 10px;
        padding: 10px 12px;
        font-size: 12px;
        line-height: 1.45;
        margin-bottom: 10px;
      }
      #${ROOT_ID} .gp-banner a { color: inherit; font-weight: 700; }
      #${ROOT_ID} .gp-view { display: none; }
      #${ROOT_ID} .gp-view.is-active { display: block; }
      #${ROOT_ID} .gp-module {
        border: 1px solid var(--gp-line);
        border-radius: 12px;
        background: linear-gradient(180deg, #1a2433 0%, var(--gp-panel) 100%);
        padding: 12px;
        margin-bottom: 10px;
      }
      #${ROOT_ID} .gp-module.is-locked { opacity: 0.55; }
      #${ROOT_ID} .gp-module-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
      }
      #${ROOT_ID} .gp-module-title { font-size: 14px; font-weight: 700; color: var(--gp-accent); }
      #${ROOT_ID} .gp-module-desc { margin-top: 4px; font-size: 11px; color: var(--gp-muted); line-height: 1.4; }
      #${ROOT_ID} .gp-kills-fields {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid rgba(212, 162, 76, 0.14);
      }
      #${ROOT_ID} .gp-kills-summary {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px 14px;
        font-size: 12px;
        color: var(--gp-muted);
        font-variant-numeric: tabular-nums;
      }
      #${ROOT_ID} .gp-kills-summary strong {
        color: var(--gp-accent);
        font-weight: 700;
      }
      #${ROOT_ID} .gp-kills-session {
        margin-left: auto;
        color: #3dba7a;
        font-variant-numeric: tabular-nums;
        font-weight: 600;
      }
      #${ROOT_ID} .gp-kills-list {
        margin-top: 8px;
        max-height: 220px;
        overflow-y: auto;
        overscroll-behavior: contain;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      #${ROOT_ID} .gp-kills-empty {
        font-size: 11px;
        color: var(--gp-muted);
        padding: 6px 2px;
      }
      #${ROOT_ID} .gp-kills-row {
        display: grid;
        grid-template-columns: 36px minmax(0, 1fr) auto auto;
        gap: 8px;
        align-items: center;
        padding: 5px 6px;
        border-radius: 6px;
        background: rgba(0, 0, 0, 0.18);
      }
      #${ROOT_ID} .gp-kills-row.is-top {
        background: rgba(212, 162, 76, 0.12);
        box-shadow: inset 0 0 0 1px rgba(212, 162, 76, 0.22);
      }
      #${ROOT_ID} .gp-kills-spr,
      #${ROOT_ID} .gp-kills-spr-ph {
        width: 32px;
        height: 32px;
        object-fit: contain;
        image-rendering: pixelated;
      }
      #${ROOT_ID} .gp-kills-spr-ph {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: var(--gp-muted);
        background: rgba(255, 255, 255, 0.04);
        border-radius: 4px;
      }
      #${ROOT_ID} .gp-kills-name {
        font-size: 12px;
        font-weight: 600;
        color: #e8edf5;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        gap: 6px;
        min-width: 0;
      }
      #${ROOT_ID} .gp-kills-name-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
      }
      #${ROOT_ID} .gp-kills-trophy {
        flex: 0 0 auto;
        font-size: 13px;
        line-height: 1;
        filter: drop-shadow(0 0 2px rgba(224, 179, 90, 0.55));
      }
      #${ROOT_ID} .gp-kills-n {
        font-size: 12px;
        font-variant-numeric: tabular-nums;
        color: #3dba7a;
        font-weight: 700;
        white-space: nowrap;
      }
      #${ROOT_ID} .gp-kills-exp {
        font-size: 11px;
        font-variant-numeric: tabular-nums;
        color: var(--gp-accent);
        white-space: nowrap;
        min-width: 4.5em;
        text-align: right;
      }
      #${ROOT_ID} .gp-switch {
        position: relative;
        width: 42px;
        height: 24px;
        flex-shrink: 0;
      }
      #${ROOT_ID} .gp-switch input {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
      }
      #${ROOT_ID} .gp-switch span {
        position: absolute;
        inset: 0;
        background: #334155;
        border-radius: 999px;
        cursor: pointer;
        transition: background 0.15s;
      }
      #${ROOT_ID} .gp-switch span::after {
        content: "";
        position: absolute;
        width: 18px;
        height: 18px;
        left: 3px;
        top: 3px;
        background: #e8eef6;
        border-radius: 50%;
        transition: transform 0.15s;
      }
      #${ROOT_ID} .gp-switch input:checked + span { background: var(--gp-ok); }
      #${ROOT_ID} .gp-switch input:checked + span::after { transform: translateX(18px); }
      #${ROOT_ID} .gp-switch input:disabled + span { opacity: 0.5; cursor: not-allowed; }
      #${ROOT_ID} .gp-tier-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
      #${ROOT_ID} .gp-tier-chip {
        min-width: 48px;
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid var(--gp-line);
        background: #1a2433;
        color: var(--gp-text);
        font-weight: 700;
        font-size: 12px;
        cursor: pointer;
      }
      #${ROOT_ID} .gp-tier-chip:disabled { opacity: 0.5; cursor: not-allowed; }
      #${ROOT_ID} .gp-stamina-fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-top: 10px;
      }
      #${ROOT_ID} .gp-perm-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid rgba(148, 163, 184, 0.18);
      }
      #${ROOT_ID} .gp-perm-row-label {
        font-size: 12px;
        font-weight: 600;
        color: var(--gp-text);
      }
      #${ROOT_ID} .gp-perm-row-hint {
        margin-top: 2px;
        font-size: 10px;
        color: var(--gp-muted);
        line-height: 1.35;
      }
      #${ROOT_ID} .gp-stamina-field {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      #${ROOT_ID} .gp-stamina-field label {
        font-size: 11px;
        color: var(--gp-muted);
        font-weight: 600;
      }
      #${ROOT_ID} .gp-stamina-input-wrap {
        display: flex;
        align-items: center;
        gap: 4px;
        border: 1px solid rgba(212, 162, 76, 0.28);
        border-radius: 8px;
        background: #121a27;
        padding-right: 10px;
      }
      #${ROOT_ID} .gp-stamina-input-wrap:focus-within {
        border-color: rgba(212, 162, 76, 0.55);
      }
      #${ROOT_ID} .gp-stamina-field input {
        width: 100%;
        border: 0;
        border-radius: 8px;
        background: transparent;
        color: var(--gp-ink);
        padding: 8px 4px 8px 10px;
        font-size: 13px;
        font-weight: 600;
        outline: none;
        appearance: textfield;
        -moz-appearance: textfield;
      }
      #${ROOT_ID} .gp-stamina-field input::-webkit-outer-spin-button,
      #${ROOT_ID} .gp-stamina-field input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      #${ROOT_ID} .gp-stamina-pct-suffix {
        color: var(--gp-accent, #d4a24c);
        font-size: 13px;
        font-weight: 700;
        flex-shrink: 0;
        user-select: none;
      }
      #${ROOT_ID} .gp-stamina-field input:disabled { opacity: 0.5; }
      #${ROOT_ID} .gp-stamina-input-wrap:has(input:disabled) { opacity: 0.7; }
      #${ROOT_ID} .gp-stamina-warn {
        display: none;
        margin: 8px 0 0;
        font-size: 11px;
        line-height: 1.35;
        color: #f87171;
        font-weight: 600;
      }
      #${ROOT_ID} .gp-stamina-warn.is-on { display: block; }
      #${ROOT_ID} .gp-anuncio-fields {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 10px;
      }
      #${ROOT_ID} .gp-anuncio-fields .gp-stamina-field {
        width: 100%;
      }
      #${ROOT_ID} .gp-anuncio-row {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 8px;
      }
      #${ROOT_ID} .gp-anuncio-fields select,
      #${ROOT_ID} .gp-anuncio-fields textarea {
        width: 100%;
        border: 1px solid rgba(212, 162, 76, 0.28);
        border-radius: 8px;
        background: #121a27;
        color: var(--gp-text);
        padding: 8px 10px;
        font-size: 12px;
        font-weight: 600;
        outline: none;
        font-family: inherit;
        resize: vertical;
        min-height: 64px;
      }
      #${ROOT_ID} .gp-anuncio-fields select:focus,
      #${ROOT_ID} .gp-anuncio-fields textarea:focus {
        border-color: rgba(212, 162, 76, 0.55);
      }
      #${ROOT_ID} .gp-anuncio-fields select:disabled,
      #${ROOT_ID} .gp-anuncio-fields textarea:disabled {
        opacity: 0.5;
      }
      #${ROOT_ID} .gp-anuncio-hint {
        margin: 0;
        font-size: 10px;
        color: var(--gp-muted);
        text-align: right;
      }
      #${ROOT_ID} .gp-hunt-ranks { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
      #${ROOT_ID} .gp-hunt-rank {
        border: 1px solid var(--gp-line);
        background: #1a2433;
        color: var(--gp-muted);
        border-radius: 999px;
        padding: 4px 10px;
        font-size: 11px;
        cursor: pointer;
      }
      #${ROOT_ID} .gp-hunt-rank.is-on {
        color: #1a1205;
        background: var(--gp-accent);
        border-color: var(--gp-accent);
        font-weight: 700;
      }
      #${ROOT_ID} .gp-hunt-list { min-height: 0; }
      #${ROOT_ID} .gp-hunt-item {
        border: 1px solid var(--gp-line);
        border-radius: 10px;
        padding: 8px 10px;
        margin-bottom: 6px;
        cursor: pointer;
        background: #1a2433;
      }
      #${ROOT_ID} .gp-hunt-item.is-active { border-color: rgba(212, 162, 76, 0.7); }
      #${ROOT_ID} .gp-hunt-item.is-expanded { background: #1f2b3d; }
      #${ROOT_ID} .gp-hunt-row {
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 80px;
      }
      #${ROOT_ID} .gp-hunt-col-info {
        flex: 3 1 0;
        min-width: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }
      #${ROOT_ID} .gp-hunt-col-mobs {
        flex: 4 1 0;
        min-width: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      #${ROOT_ID} .gp-hunt-col-rec {
        flex: 3 1 0; /* 30% da row → Ataque 15% + Defesa 15% */
        min-width: 0;
        display: flex;
        justify-content: stretch;
        align-items: flex-start;
      }
      #${ROOT_ID} .gp-hunt-item-name {
        font-size: 12px;
        font-weight: 700;
        color: var(--gp-text);
        line-height: 1.25;
        word-break: break-word;
      }
      #${ROOT_ID} .gp-hunt-item-meta {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
      }
      #${ROOT_ID} .gp-hunt-item-lvl {
        color: var(--gp-muted);
        white-space: nowrap;
        font-size: 11px;
      }
      #${ROOT_ID} .gp-hunt-rec {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 8px;
        width: 100%;
        font-size: 10px;
        color: var(--gp-muted);
      }
      #${ROOT_ID} .gp-hunt-rec-block {
        flex: 1 1 0; /* metade da coluna de 30% → 15% cada */
        min-width: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 3px;
      }
      #${ROOT_ID} .gp-hunt-rec-block + .gp-hunt-rec-block {
        padding-left: 8px;
        border-left: 1px solid rgba(36, 48, 65, 0.95);
      }
      #${ROOT_ID} .gp-hunt-rec-head {
        font-weight: 800;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        font-size: 9px;
        color: var(--gp-text);
        opacity: 0.85;
      }
      #${ROOT_ID} .gp-hunt-rec-head.is-atk { color: #86efac; }
      #${ROOT_ID} .gp-hunt-rec-head.is-def { color: #93c5fd; }
      #${ROOT_ID} .gp-hunt-rec-row {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 4px;
        max-width: 100%;
      }
      #${ROOT_ID} .gp-hunt-rec-tag {
        font-weight: 700;
        letter-spacing: 0.02em;
        white-space: nowrap;
        font-size: 9px;
      }
      #${ROOT_ID} .gp-hunt-rec-tag.is-fraco { color: #86efac; }
      #${ROOT_ID} .gp-hunt-rec-tag.is-neutro { color: #f0d060; }
      #${ROOT_ID} .gp-hunt-rec-tag.is-forte { color: #f87171; }
      #${ROOT_ID} .gp-hunt-rec-tag.is-defesa { color: #93c5fd; }
      #${ROOT_ID} .gp-hunt-rec-icons {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 3px;
      }
      #${ROOT_ID} .gp-hunt-rec-ico {
        width: 16px;
        height: 16px;
        object-fit: contain;
        image-rendering: pixelated;
        border-radius: 3px;
      }
      #${ROOT_ID} .gp-hunt-rec-ico.is-fraco {
        background: rgba(34, 197, 94, 0.14);
        box-shadow: 0 0 0 1px rgba(134, 239, 172, 0.35);
      }
      #${ROOT_ID} .gp-hunt-rec-ico.is-neutro {
        background: rgba(240, 208, 96, 0.14);
        box-shadow: 0 0 0 1px rgba(240, 208, 96, 0.35);
      }
      #${ROOT_ID} .gp-hunt-rec-ico.is-forte {
        background: rgba(248, 113, 113, 0.14);
        box-shadow: 0 0 0 1px rgba(248, 113, 113, 0.35);
      }
      #${ROOT_ID} .gp-hunt-rec-ico.is-defesa {
        background: rgba(59, 130, 246, 0.16);
        box-shadow: 0 0 0 1px rgba(147, 197, 253, 0.4);
      }
      #${ROOT_ID} .gp-hunt-rec-def-list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
        width: 100%;
      }
      #${ROOT_ID} .gp-hunt-rec-def-item {
        display: flex;
        align-items: center;
        gap: 4px;
        min-width: 0;
        line-height: 1.15;
      }
      #${ROOT_ID} .gp-hunt-rec-def-pct {
        font-size: 10px;
        font-weight: 700;
        color: #93c5fd;
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
      }
      #${ROOT_ID} .gp-hunt-rec-def-name {
        font-size: 9px;
        color: var(--gp-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 0;
      }
      #${ROOT_ID} .gp-hunt-rec-empty {
        font-size: 10px;
        color: var(--gp-muted);
        opacity: 0.55;
      }
      #${ROOT_ID} .gp-hunt-lean {
        display: inline-block;
        padding: 1px 6px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.04em;
        line-height: 1.4;
      }
      #${ROOT_ID} .gp-hunt-lean.is-exp {
        color: #86efac;
        background: rgba(34, 197, 94, 0.16);
      }
      #${ROOT_ID} .gp-hunt-lean.is-loot {
        color: #f0d060;
        background: rgba(212, 162, 76, 0.2);
      }
      #${ROOT_ID} .gp-hunt-previews {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
        width: 100%;
      }
      #${ROOT_ID} .gp-hunt-preview {
        width: 72px;
        height: 72px;
        object-fit: contain;
        image-rendering: pixelated;
      }
      #${ROOT_ID} .gp-hunt-preview-ph {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 72px;
        height: 72px;
        border-radius: 8px;
        background: #0f1724;
        font-size: 10px;
        font-weight: 700;
        color: var(--gp-accent);
      }
      #${ROOT_ID} .gp-hunt-cards {
        display: flex;
        justify-content: center;
        align-items: stretch;
        flex-wrap: nowrap;
        gap: 8px;
        margin-top: 10px;
        padding-bottom: 4px;
      }
      #${ROOT_ID} .gp-hunt-card {
        flex: 1 1 0;
        width: 0;
        min-width: 0;
        max-width: 240px;
        border: 1px solid var(--gp-line);
        border-radius: 10px;
        background: #152030;
        padding: 8px;
        cursor: default;
      }
      #${ROOT_ID} .gp-hunt-card-sprite,
      #${ROOT_ID} .gp-hunt-card-sprite-ph {
        display: block;
        width: 56px;
        height: 56px;
        margin: 0 auto 6px;
        object-fit: contain;
        image-rendering: pixelated;
      }
      #${ROOT_ID} .gp-hunt-card-sprite-ph {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        background: #0f1724;
        font-size: 12px;
        font-weight: 700;
        color: var(--gp-accent);
      }
      #${ROOT_ID} .gp-hunt-card-name {
        font-size: 11px;
        font-weight: 700;
        text-align: center;
        color: var(--gp-accent);
        line-height: 1.25;
        margin-bottom: 6px;
        min-height: 2.5em;
      }
      #${ROOT_ID} .gp-hunt-card-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;
        margin-bottom: 8px;
      }
      #${ROOT_ID} .gp-hunt-card-stat {
        display: flex;
        justify-content: space-between;
        gap: 4px;
        font-size: 10px;
        padding: 3px 5px;
        border-radius: 6px;
        background: #0f1724;
      }
      #${ROOT_ID} .gp-hunt-card-stat span { color: var(--gp-muted); }
      #${ROOT_ID} .gp-hunt-card-stat b { font-weight: 600; }
      #${ROOT_ID} .gp-hunt-card-label {
        font-size: 10px;
        color: var(--gp-muted);
        margin: 0 0 4px;
        font-weight: 600;
      }
      #${ROOT_ID} .gp-hunt-card-res {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 3px;
        margin-bottom: 8px;
      }
      #${ROOT_ID} .gp-hunt-card-res-item {
        display: flex;
        align-items: center;
        gap: 3px;
        font-size: 9px;
        min-width: 0;
      }
      #${ROOT_ID} .gp-hunt-card-res-item img {
        width: 12px;
        height: 12px;
        flex-shrink: 0;
      }
      #${ROOT_ID} .gp-hunt-card-res-item b {
        font-weight: 600;
        white-space: nowrap;
      }
      #${ROOT_ID} .gp-hunt-card-res-item b.is-weak { color: #86efac; }
      #${ROOT_ID} .gp-hunt-card-res-item b.is-resist { color: #f0d060; }
      #${ROOT_ID} .gp-hunt-card-loot {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
      #${ROOT_ID} .gp-hunt-card-loot .gp-ab-item {
        width: 28px;
        height: 28px;
      }
      #${ROOT_ID} .gp-hunt-card-loot .gp-ab-item img {
        width: 24px;
        height: 24px;
      }
      #${ROOT_ID} .gp-btn-activate {
        margin-top: 8px;
        width: 100%;
        border: 0;
        border-radius: 8px;
        padding: 8px;
        font-weight: 700;
        cursor: pointer;
        background: var(--gp-accent);
        color: #1a1205;
      }
      #${ROOT_ID} .gp-btn-activate.btn-go-hunt {
        background: linear-gradient(180deg, #3dba7a, #2a9b62);
        color: #062014;
      }
      #${ROOT_ID} .gp-hunt-actions {
        display: flex;
        gap: 8px;
        margin-top: 8px;
      }
      #${ROOT_ID} .gp-hunt-actions .gp-btn-activate,
      #${ROOT_ID} .gp-hunt-actions .gp-btn-codex {
        flex: 1;
        margin-top: 0;
      }
      #${ROOT_ID} .gp-btn-codex {
        border: 1px solid var(--gp-accent);
        border-radius: 8px;
        padding: 8px;
        font-weight: 700;
        cursor: pointer;
        background: transparent;
        color: var(--gp-accent);
      }
      #${ROOT_ID} .gp-btn-codex.is-on {
        background: var(--gp-accent);
        color: #1a1205;
      }
      #${ROOT_ID} .gp-hunt-codex-panel {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid var(--gp-line);
      }
      #${ROOT_ID} .gp-hunt-codex-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 8px;
        font-size: 11px;
        color: var(--gp-muted);
      }
      #${ROOT_ID} .gp-hunt-codex-head b {
        color: var(--gp-accent);
        font-weight: 700;
      }
      #${ROOT_ID} .gp-hunt-codex-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 280px;
        overflow-y: auto;
      }
      #${ROOT_ID} .gp-hunt-codex-item.is-own {
        border-color: rgba(212, 162, 76, 0.55);
      }
      #${ROOT_ID} .gp-hunt-codex-item .gp-cx-tile.is-in-loot .gp-cx-tile-box {
        border-color: #3dba7a;
        box-shadow: 0 0 0 1px rgba(61, 186, 122, 0.35);
      }
      #${ROOT_ID} .gp-hunt-codex-item .gp-cx-tile.is-missing .gp-cx-tile-box {
        opacity: 0.4;
      }
      #${ROOT_ID} .gp-hunt-codex-item .gp-cx-tile.is-missing .gp-cx-tile-n {
        opacity: 0.55;
      }
      #${ROOT_ID} .gp-hunt-codex-farm {
        font-size: 10px;
        font-weight: 700;
        color: #86efac;
        white-space: nowrap;
      }
      #${ROOT_ID} .gp-hunt-codex-farm.is-partial {
        color: #f0d060;
      }
      #${ROOT_ID} .gp-cx-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      #${ROOT_ID} .gp-cx-item {
        border: 1px solid var(--gp-line);
        border-radius: 10px;
        background: rgba(20, 28, 39, 0.85);
        padding: 10px 12px;
      }
      #${ROOT_ID} .gp-cx-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 8px;
      }
      #${ROOT_ID} .gp-cx-name {
        font-weight: 700;
        font-size: 13px;
        color: var(--gp-text);
      }
      #${ROOT_ID} .gp-cx-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 4px;
        font-size: 11px;
        color: var(--gp-muted);
      }
      #${ROOT_ID} .gp-cx-lvl {
        color: var(--gp-accent);
        font-weight: 700;
      }
      #${ROOT_ID} .gp-cx-bonus {
        flex: 0 1 auto;
        max-width: 42%;
        text-align: right;
        font-size: 11px;
        font-weight: 600;
        color: #86efac;
        line-height: 1.35;
      }
      #${ROOT_ID} .gp-cx-tiles {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      #${ROOT_ID} .gp-cx-tile {
        width: 44px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
      }
      #${ROOT_ID} .gp-cx-tile-box {
        width: 36px;
        height: 36px;
        border-radius: 7px;
        border: 1px solid var(--gp-line);
        background: #0a1018;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      #${ROOT_ID} .gp-cx-tile-box img {
        width: 28px;
        height: 28px;
        object-fit: contain;
        image-rendering: pixelated;
      }
      #${ROOT_ID} .gp-cx-tile-n {
        font-size: 10px;
        font-weight: 700;
        color: var(--gp-muted);
        line-height: 1.1;
      }
      #${ROOT_ID} .gp-cx-item .gp-btn-activate {
        margin-top: 10px;
      }
      #${ROOT_ID} .gp-cx-item.is-picked {
        border-color: rgba(212, 162, 76, 0.7);
      }
      #${ROOT_ID} .gp-cx-actions {
        display: flex;
        gap: 8px;
        margin-top: 10px;
      }
      #${ROOT_ID} .gp-cx-actions .gp-btn-activate,
      #${ROOT_ID} .gp-cx-actions .gp-cx-pick-btn {
        flex: 1;
        margin-top: 0;
      }
      #${ROOT_ID} .gp-cx-pick-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        border-radius: 8px;
        border: 1px solid var(--gp-line);
        padding: 8px;
        font-weight: 700;
        cursor: pointer;
      }
      #${ROOT_ID} .gp-cx-pick-btn.is-add {
        background: rgba(22, 163, 74, 0.18);
        border-color: rgba(34, 197, 94, 0.55);
        color: #86efac;
      }
      #${ROOT_ID} .gp-cx-pick-btn.is-remove {
        background: rgba(185, 28, 28, 0.18);
        border-color: rgba(248, 113, 113, 0.55);
        color: #fca5a5;
      }
      #${ROOT_ID} .gp-cx-pick-btn:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }
      #${ROOT_ID} .gp-cx-enable {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 10px;
        padding: 8px 10px;
        border: 1px solid var(--gp-line);
        border-radius: 8px;
        background: #152030;
      }
      #${ROOT_ID} .gp-cx-enable.is-off {
        border-color: rgba(248, 113, 113, 0.35);
        background: rgba(185, 28, 28, 0.1);
      }
      #${ROOT_ID} .gp-cx-enable-label {
        display: block;
        font-size: 12px;
        font-weight: 700;
        color: var(--gp-text);
      }
      #${ROOT_ID} .gp-cx-enable-hint {
        display: block;
        margin-top: 2px;
        font-size: 11px;
        color: var(--gp-muted);
      }
      #${ROOT_ID} .gp-cx-overlay-btn {
        display: block;
        width: 100%;
        margin: 0 0 10px;
        border: 1px solid var(--gp-line);
        border-radius: 8px;
        background: #152030;
        color: var(--gp-text);
        padding: 8px 10px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
      }
      #${ROOT_ID} .gp-cx-overlay-btn.is-on {
        border-color: rgba(61, 186, 122, 0.65);
        background: rgba(61, 186, 122, 0.14);
        color: #86efac;
      }
      #${ROOT_ID} .gp-cx-tabs {
        display: flex;
        gap: 6px;
        margin-bottom: 10px;
      }
      #${ROOT_ID} .gp-cx-tabs[hidden] { display: none !important; }
      #${ROOT_ID} .gp-cx-tab {
        flex: 1;
        border: 1px solid var(--gp-line);
        border-radius: 8px;
        background: #152030;
        color: var(--gp-muted);
        padding: 8px 10px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
      }
      #${ROOT_ID} .gp-cx-tab.is-on {
        border-color: rgba(212, 162, 76, 0.7);
        color: var(--gp-accent);
        background: rgba(212, 162, 76, 0.12);
      }
      #${ROOT_ID} .gp-cx-tab-n {
        font-weight: 800;
        opacity: 0.95;
      }
      #${ROOT_ID} .gp-run-btn {
        margin-top: 10px;
        width: 100%;
        border: 0;
        border-radius: 8px;
        padding: 9px 12px;
        font-weight: 700;
        font-size: 13px;
        cursor: pointer;
        background: linear-gradient(180deg, #f0c14b, #d4a017);
        color: #1a1205;
      }
      #${ROOT_ID} .gp-run-btn:hover:not(:disabled) { filter: brightness(1.06); }
      #${ROOT_ID} .gp-run-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      #${ROOT_ID} .gp-status {
        margin-top: 8px;
        font-size: 12px;
        color: var(--gp-muted);
        min-height: 1.2em;
        line-height: 1.4;
      }
      #${ROOT_ID} .gp-status.ok { color: #86efac; }
      #${ROOT_ID} .gp-status.err { color: var(--gp-err); }
      #${ROOT_ID} .gp-cta {
        display: inline-block;
        margin-top: 8px;
        padding: 10px 14px;
        border-radius: 8px;
        background: var(--gp-accent);
        color: #1a1205;
        font-weight: 700;
        text-decoration: none;
        font-size: 13px;
      }
      #${ROOT_ID} .gp-autoboss-btn {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin: 0 0 10px;
        padding: 12px 14px;
        border: 1px solid rgba(212, 162, 76, 0.45);
        border-radius: 10px;
        background: linear-gradient(135deg, rgba(212, 162, 76, 0.16), rgba(20, 28, 39, 0.9));
        color: var(--gp-text);
        cursor: pointer;
        font: inherit;
        text-align: left;
      }
      #${ROOT_ID} .gp-autoboss-btn:hover {
        border-color: var(--gp-accent);
        background: linear-gradient(135deg, rgba(212, 162, 76, 0.24), rgba(20, 28, 39, 0.95));
      }
      #${ROOT_ID} .gp-autoboss-btn strong {
        display: block;
        font-size: 14px;
      }
      #${ROOT_ID} .gp-autoboss-btn strong .gp-soon {
        margin-left: 6px;
        font-weight: 600;
        font-size: 12px;
        color: var(--gp-muted);
      }
      #${ROOT_ID} .gp-autoboss-btn span {
        display: block;
        margin-top: 2px;
        font-size: 11px;
        color: var(--gp-muted);
      }
      #${ROOT_ID} #gpHuntActiveLabel strong {
        color: var(--gp-accent);
        font-weight: 700;
      }
      #${ROOT_ID} .gp-ab-modal {
        position: absolute;
        inset: 0;
        z-index: 5;
        display: none;
        flex-direction: column;
        border-radius: 14px;
        overflow: hidden;
        background: var(--gp-bg);
        border: 1px solid var(--gp-line);
        /* Não herda largura da viewport — fica só dentro do dialog */
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        box-sizing: border-box;
      }
      #${ROOT_ID} .gp-ab-modal.is-open { display: flex; }
      #${ROOT_ID} .gp-ab-top {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 14px;
        border-bottom: 1px solid var(--gp-line);
        background: var(--gp-panel);
        flex-shrink: 0;
      }
      #${ROOT_ID} .gp-ab-tabs {
        display: flex;
        gap: 6px;
        padding: 8px 12px 0;
        background: var(--gp-bg);
        flex-shrink: 0;
        border-bottom: 1px solid var(--gp-line);
      }
      #${ROOT_ID} .gp-ab-tabs[hidden] { display: none !important; }
      #${ROOT_ID} .gp-ab-tab {
        flex: 1;
        height: 34px;
        border: 1px solid var(--gp-line);
        border-radius: 8px 8px 0 0;
        border-bottom: none;
        background: rgba(20, 28, 39, 0.65);
        color: var(--gp-muted);
        cursor: pointer;
        font: 600 12px/1 "Segoe UI", Tahoma, sans-serif;
      }
      #${ROOT_ID} .gp-ab-tab.is-on {
        background: var(--gp-panel);
        color: var(--gp-accent);
        border-color: rgba(212, 162, 76, 0.45);
      }
      #${ROOT_ID} .gp-ab-tab-n {
        margin-left: 4px;
        font-weight: 700;
        color: var(--gp-muted);
      }
      #${ROOT_ID} .gp-ab-pl-btn {
        position: absolute;
        top: 3px;
        right: 3px;
        z-index: 3;
        width: 18px;
        height: 18px;
        border-radius: 5px;
        border: 1px solid transparent;
        cursor: pointer;
        font: 700 12px/1 "Segoe UI", Tahoma, sans-serif;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      }
      #${ROOT_ID} .gp-ab-pl-btn.is-add {
        background: rgba(22, 163, 74, 0.2);
        border-color: rgba(34, 197, 94, 0.65);
        color: #4ade80;
      }
      #${ROOT_ID} .gp-ab-pl-btn.is-add:hover {
        background: rgba(22, 163, 74, 0.35);
      }
      #${ROOT_ID} .gp-ab-pl-btn.is-remove {
        background: rgba(185, 28, 28, 0.22);
        border-color: rgba(248, 113, 113, 0.65);
        color: #f87171;
      }
      #${ROOT_ID} .gp-ab-pl-btn.is-remove:hover {
        background: rgba(185, 28, 28, 0.38);
      }
      #${ROOT_ID} .gp-ab-playlist-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 100%;
        margin: 0 0 10px;
        height: 36px;
        border-radius: 8px;
        border: 1px solid var(--gp-line);
        cursor: pointer;
        font: 700 13px/1 "Segoe UI", Tahoma, sans-serif;
      }
      #${ROOT_ID} .gp-ab-playlist-btn .gp-ab-playlist-n {
        font-weight: 800;
        opacity: 0.9;
      }
      #${ROOT_ID} .gp-ab-playlist-btn.is-add {
        background: rgba(22, 163, 74, 0.18);
        border-color: rgba(34, 197, 94, 0.55);
        color: #86efac;
      }
      #${ROOT_ID} .gp-ab-playlist-btn.is-remove {
        background: rgba(185, 28, 28, 0.18);
        border-color: rgba(248, 113, 113, 0.55);
        color: #fca5a5;
      }
      #${ROOT_ID} .gp-ab-preset-block {
        margin: 0 0 12px;
        padding: 10px 10px 8px;
        border-radius: 10px;
        border: 1px solid rgba(212, 162, 76, 0.22);
        background: rgba(0, 0, 0, 0.18);
      }
      #${ROOT_ID} .gp-ab-preset-title {
        margin: 0 0 8px;
        font: 700 13px/1.25 "Segoe UI", Tahoma, sans-serif;
        color: #f0e6d2;
        letter-spacing: 0.01em;
      }
      #${ROOT_ID} .gp-ab-preset-btns {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 6px;
      }
      #${ROOT_ID} .gp-ab-preset-btns .gp-ab-playlist-btn {
        width: 100%;
        margin: 0;
        height: 40px;
        flex-direction: column;
        gap: 3px;
        font-size: 12px;
        padding: 4px 4px;
      }
      #${ROOT_ID} .gp-ab-preset-btns .gp-ab-playlist-n {
        font-size: 11px;
        font-weight: 700;
        opacity: 0.85;
      }
      #${ROOT_ID} .gp-ab-preset-tabs {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 6px;
        margin: 0 0 10px;
      }
      #${ROOT_ID} .gp-ab-preset-tab {
        height: 32px;
        border-radius: 8px;
        border: 1px solid var(--gp-line);
        background: rgba(255, 255, 255, 0.04);
        color: #d4c4a8;
        font: 700 11px/1 "Segoe UI", Tahoma, sans-serif;
        cursor: pointer;
        padding: 0 4px;
      }
      #${ROOT_ID} .gp-ab-preset-tab.is-on {
        border-color: rgba(212, 162, 76, 0.65);
        background: rgba(212, 162, 76, 0.16);
        color: #f5e6c8;
      }
      #${ROOT_ID} .gp-ab-preset-mini {
        position: absolute;
        top: 4px;
        right: 4px;
        z-index: 2;
        display: flex;
        gap: 2px;
      }
      #${ROOT_ID} .gp-ab-preset-mini .gp-ab-pl-btn {
        position: static;
        width: 20px;
        height: 20px;
        font-size: 10px;
        border-radius: 5px;
      }
      #${ROOT_ID} .gp-ab-run {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        margin: 0;
        border-bottom: 1px solid rgba(212, 162, 76, 0.18);
        background: var(--gp-bg);
        flex-shrink: 0;
      }
      #${ROOT_ID} .gp-ab-run[hidden] {
        display: none !important;
      }
      #${ROOT_ID} .gp-ab-run-btn {
        flex: 0 0 auto;
        height: 34px;
        padding: 0 14px;
        border-radius: 8px;
        border: 1px solid rgba(212, 162, 76, 0.55);
        background: linear-gradient(180deg, #c4922f, #9a6f1c);
        color: #1a1208;
        font: 700 12px/1 "Segoe UI", Tahoma, sans-serif;
        cursor: pointer;
        white-space: nowrap;
      }
      #${ROOT_ID} .gp-ab-run-btn:hover:not(:disabled) {
        filter: brightness(1.06);
      }
      #${ROOT_ID} .gp-ab-run-btn:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }
      #${ROOT_ID} .gp-ab-run-btn.is-stop {
        background: rgba(185, 28, 28, 0.28);
        border-color: rgba(248, 113, 113, 0.65);
        color: #fecaca;
      }
      #${ROOT_ID} .gp-ab-run-meta {
        flex: 1 1 140px;
        min-width: 0;
        font-size: 11px;
        color: var(--gp-muted);
        line-height: 1.35;
      }
      #${ROOT_ID} .gp-ab-run-meta strong {
        color: #f0d9a8;
        font-weight: 700;
      }
      #${ROOT_ID} .gp-ab-auto {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 0 0 auto;
        margin-left: auto;
        padding: 4px 8px;
        border-radius: 8px;
        border: 1px solid rgba(212, 162, 76, 0.28);
        background: rgba(20, 28, 39, 0.55);
      }
      #${ROOT_ID} .gp-ab-auto-opts {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        flex: 0 0 auto;
        margin-left: auto;
      }
      #${ROOT_ID} .gp-ab-auto-opts .gp-ab-auto {
        margin-left: 0;
      }
      #${ROOT_ID} .gp-ab-auto-label {
        font-size: 11px;
        font-weight: 700;
        color: #f0d9a8;
        white-space: nowrap;
        line-height: 1.2;
      }
      #${ROOT_ID} .gp-ab-auto-hint {
        display: block;
        font-size: 10px;
        font-weight: 500;
        color: var(--gp-muted);
      }
      #${ROOT_ID} .gp-ab-timer-mins {
        width: 46px;
        height: 26px;
        border-radius: 6px;
        border: 1px solid rgba(212, 162, 76, 0.35);
        background: rgba(12, 18, 26, 0.9);
        color: #f0d9a8;
        font: 700 12px/1 "Segoe UI", Tahoma, sans-serif;
        text-align: center;
        padding: 0 4px;
      }
      #${ROOT_ID} .gp-ab-timer-mins:disabled {
        opacity: 0.45;
      }
      #${ROOT_ID} .gp-ab-timer-unit {
        font-size: 10px;
        font-weight: 600;
        color: var(--gp-muted);
        margin-right: 2px;
      }
      #${ROOT_ID} .gp-ab-reset-btn {
        flex: 0 0 auto;
        height: 32px;
        padding: 0 10px;
        border-radius: 8px;
        border: 1px solid var(--gp-line);
        background: rgba(20, 28, 39, 0.9);
        color: var(--gp-muted);
        font: 600 11px/1 "Segoe UI", Tahoma, sans-serif;
        cursor: pointer;
        white-space: nowrap;
      }
      #${ROOT_ID} .gp-ab-reset-btn:hover:not(:disabled) {
        border-color: rgba(248, 113, 113, 0.55);
        color: #fca5a5;
      }
      #${ROOT_ID} .gp-ab-reset-btn:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }
      #${ROOT_ID} .gp-ab-top h3 {
        margin: 0;
        flex: 1;
        font-size: 15px;
        font-weight: 700;
        min-width: 0;
      }
      #${ROOT_ID} .gp-ab-top h3 .gp-soon {
        margin-left: 4px;
        font-weight: 600;
        font-size: 12px;
        color: var(--gp-muted);
      }
      #${ROOT_ID} #gpHuntModal .gp-ab-top {
        position: relative;
        justify-content: flex-end;
        min-height: 56px;
      }
      #${ROOT_ID} #gpHuntModal .gp-ab-top h3,
      #${ROOT_ID} #gpCodexModal .gp-ab-top h3 {
        flex: 0 0 auto;
        position: relative;
        z-index: 1;
        margin-right: auto;
      }
      #${ROOT_ID} #gpHuntModal .gp-hunt-top-brand,
      #${ROOT_ID} #gpCodexModal .gp-hunt-top-brand {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
        font-size: 11px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--gp-accent);
        font-weight: 700;
        pointer-events: none;
        white-space: nowrap;
      }
      #${ROOT_ID} #gpHuntModal .gp-ab-close,
      #${ROOT_ID} #gpCodexModal .gp-ab-close {
        position: relative;
        z-index: 1;
      }
      #${ROOT_ID} .gp-ab-back,
      #${ROOT_ID} .gp-ab-close {
        border: 1px solid var(--gp-line);
        background: var(--gp-bg);
        color: var(--gp-text);
        border-radius: 8px;
        height: 32px;
        min-width: 32px;
        padding: 0 10px;
        cursor: pointer;
        font: 600 12px/1 "Segoe UI", Tahoma, sans-serif;
      }
      #${ROOT_ID} .gp-ab-back[hidden] { display: none !important; }
      #${ROOT_ID} .gp-ab-body {
        flex: 1;
        overflow: auto;
        padding: 12px;
      }
      #${ROOT_ID} .gp-ab-grid {
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 8px;
      }
      #${ROOT_ID} .gp-ab-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        padding: 8px 4px;
        border: 1px solid var(--gp-line);
        border-radius: 10px;
        background: rgba(20, 28, 39, 0.85);
        cursor: pointer;
        color: inherit;
        font: inherit;
        min-width: 0;
        position: relative;
        overflow: visible;
        text-align: center;
        user-select: none;
      }
      #${ROOT_ID} .gp-ab-card:hover {
        border-color: rgba(212, 162, 76, 0.55);
      }
      #${ROOT_ID} .gp-ab-card.is-killed {
        border-color: rgba(148, 163, 184, 0.55);
      }
      #${ROOT_ID} .gp-ab-card-badges {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        min-height: 16px;
        width: 100%;
      }
      #${ROOT_ID} .gp-ab-skull {
        font-size: 14px;
        line-height: 1;
        filter: grayscale(0.15);
      }
      #${ROOT_ID} .gp-ab-cd {
        font-size: 10px;
        font-weight: 700;
        color: #fbbf24;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      #${ROOT_ID} .gp-ab-track-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin: 0 0 12px;
        padding: 8px 10px;
        border: 1px solid var(--gp-line);
        border-radius: 8px;
        background: rgba(20, 28, 39, 0.75);
        font-size: 12px;
      }
      #${ROOT_ID} .gp-ab-track-row .gp-ab-cd { font-size: 12px; }
      #${ROOT_ID} .gp-ab-sprite,
      #${ROOT_ID} .gp-ab-sprite-lg {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        background: #0a1018;
        border: 1px solid var(--gp-line);
        object-fit: contain;
        image-rendering: pixelated;
      }
      #${ROOT_ID} .gp-ab-sprite-lg { width: 72px; height: 72px; }
      #${ROOT_ID} .gp-ab-sprite-ph {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: 700;
        color: var(--gp-muted);
        text-align: center;
        padding: 2px;
      }
      #${ROOT_ID} .gp-ab-card-name {
        font-size: 10px;
        font-weight: 600;
        text-align: center;
        line-height: 1.25;
        width: 100%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      #${ROOT_ID} .gp-ab-empty {
        margin: 24px 8px;
        text-align: center;
        color: var(--gp-muted);
        font-size: 13px;
      }
      #${ROOT_ID} .gp-ab-search {
        position: sticky;
        top: 0;
        z-index: 2;
        margin: 0 0 12px;
        padding-bottom: 2px;
        background: linear-gradient(180deg, var(--gp-bg) 70%, transparent);
      }
      #${ROOT_ID} .gp-ab-search input {
        width: 100%;
        box-sizing: border-box;
        height: 36px;
        padding: 0 12px;
        border: 1px solid var(--gp-line);
        border-radius: 8px;
        background: var(--gp-panel);
        color: var(--gp-text);
        font: 600 13px/1.2 "Segoe UI", Tahoma, sans-serif;
        outline: none;
      }
      #${ROOT_ID} .gp-ab-search input::placeholder {
        color: var(--gp-muted);
        font-weight: 500;
      }
      #${ROOT_ID} .gp-ab-search input:focus {
        border-color: rgba(212, 162, 76, 0.65);
      }
      #${ROOT_ID} .gp-ab-search-meta {
        margin: 6px 2px 0;
        font-size: 11px;
        color: var(--gp-muted);
      }
      #${ROOT_ID} .gp-ab-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin: 0 0 12px;
      }
      #${ROOT_ID} .gp-ab-nav-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        height: 32px;
        min-width: 32px;
        padding: 0 10px;
        border: 1px solid var(--gp-line);
        border-radius: 8px;
        background: var(--gp-bg);
        color: var(--gp-text);
        cursor: pointer;
        font: 600 12px/1 "Segoe UI", Tahoma, sans-serif;
      }
      #${ROOT_ID} .gp-ab-nav-btn:hover:not(:disabled) {
        border-color: rgba(212, 162, 76, 0.55);
        color: var(--gp-accent);
      }
      #${ROOT_ID} .gp-ab-nav-btn:disabled {
        opacity: 0.35;
        cursor: default;
      }
      #${ROOT_ID} .gp-ab-nav-pos {
        font-size: 11px;
        font-weight: 600;
        color: var(--gp-muted);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      #${ROOT_ID} .gp-ab-fight {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        margin: 0 0 14px;
        height: 40px;
        padding: 0 14px;
        border: 1px solid rgba(212, 162, 76, 0.55);
        border-radius: 10px;
        background: linear-gradient(135deg, rgba(212, 162, 76, 0.22), rgba(20, 28, 39, 0.95));
        color: var(--gp-text);
        cursor: pointer;
        font: 700 14px/1 "Segoe UI", Tahoma, sans-serif;
      }
      #${ROOT_ID} .gp-ab-fight:hover:not(:disabled) {
        border-color: var(--gp-accent);
        color: var(--gp-accent);
      }
      #${ROOT_ID} .gp-ab-fight:disabled {
        opacity: 0.55;
        cursor: default;
      }
      #${ROOT_ID} .gp-ab-fight-ico {
        font-size: 16px;
        line-height: 1;
      }
      #${ROOT_ID} .gp-ab-helper {
        margin: 0 0 12px;
        padding: 10px;
        border: 1px solid var(--gp-line);
        border-radius: 10px;
        background: rgba(20, 28, 39, 0.72);
      }
      #${ROOT_ID} .gp-ab-helper-title {
        margin: 0 0 8px;
        font-size: 11px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--gp-muted);
      }
      #${ROOT_ID} .gp-ab-helper-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }
      #${ROOT_ID} .gp-ab-helper-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        min-height: 40px;
        padding: 6px 8px;
        border: 1px solid var(--gp-line);
        border-radius: 8px;
        background: rgba(12, 18, 26, 0.85);
        color: var(--gp-text);
        cursor: pointer;
        text-align: left;
        font: 600 11px/1.2 "Segoe UI", Tahoma, sans-serif;
      }
      #${ROOT_ID} .gp-ab-helper-toggle.is-on {
        border-color: rgba(87, 184, 90, 0.65);
        background: rgba(87, 184, 90, 0.12);
      }
      #${ROOT_ID} .gp-ab-helper-toggle.is-off {
        border-color: rgba(229, 57, 53, 0.45);
        opacity: 0.85;
      }
      #${ROOT_ID} .gp-ab-helper-toggle img {
        width: 28px;
        height: 28px;
        image-rendering: pixelated;
        flex: 0 0 auto;
      }
      #${ROOT_ID} .gp-ab-helper-toggle .gp-ab-helper-meta {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }
      #${ROOT_ID} .gp-ab-helper-toggle .gp-ab-helper-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      #${ROOT_ID} .gp-ab-helper-toggle .gp-ab-helper-state {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--gp-muted);
      }
      #${ROOT_ID} .gp-ab-helper-toggle.is-on .gp-ab-helper-state {
        color: #57b85a;
      }
      #${ROOT_ID} .gp-ab-helper-toggle.is-off .gp-ab-helper-state {
        color: #e57373;
      }
      #${ROOT_ID} .gp-ab-detail-head {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        margin-bottom: 14px;
      }
      #${ROOT_ID} .gp-ab-detail-meta { flex: 1; min-width: 0; }
      #${ROOT_ID} .gp-ab-detail-name {
        margin: 0 0 6px;
        font-size: 16px;
        font-weight: 700;
      }
      #${ROOT_ID} .gp-ab-rarity {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: var(--gp-accent);
      }
      #${ROOT_ID} .gp-ab-rarity img { width: 14px; height: 14px; }
      #${ROOT_ID} .gp-ab-statrows { display: grid; gap: 6px; margin-bottom: 14px; }
      #${ROOT_ID} .gp-ab-statrow {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        font-size: 12px;
        padding: 6px 8px;
        border-radius: 8px;
        background: rgba(20, 28, 39, 0.75);
        border: 1px solid var(--gp-line);
      }
      #${ROOT_ID} .gp-ab-statrow span { color: var(--gp-muted); }
      #${ROOT_ID} .gp-ab-statrow b { font-weight: 600; text-align: right; }
      #${ROOT_ID} .gp-ab-section {
        margin-bottom: 14px;
      }
      #${ROOT_ID} .gp-ab-section-title {
        margin: 0 0 8px;
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--gp-muted);
      }
      #${ROOT_ID} .gp-ab-res-grid {
        display: grid;
        gap: 6px;
      }
      #${ROOT_ID} .gp-ab-res {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
      }
      #${ROOT_ID} .gp-ab-res img { width: 16px; height: 16px; flex-shrink: 0; }
      #${ROOT_ID} .gp-ab-res-val { margin-left: auto; font-variant-numeric: tabular-nums; }
      #${ROOT_ID} .gp-ab-res-val.is-weak { color: #4ade80; }
      #${ROOT_ID} .gp-ab-res-val.is-resist { color: #e4c00a; }
      #${ROOT_ID} .gp-ab-combat {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
        margin-bottom: 14px;
      }
      #${ROOT_ID} .gp-ab-combat .gp-ab-section { margin-bottom: 0; }
      #${ROOT_ID} .gp-ab-def-grid {
        display: grid;
        gap: 6px;
      }
      #${ROOT_ID} .gp-ab-def {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
      }
      #${ROOT_ID} .gp-ab-def img { width: 16px; height: 16px; flex-shrink: 0; }
      #${ROOT_ID} .gp-ab-def-pct {
        margin-left: auto;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        color: #93c5fd;
      }
      @media (max-width: 560px) {
        #${ROOT_ID} .gp-ab-combat {
          grid-template-columns: 1fr;
        }
      }
      #${ROOT_ID} .gp-ab-loot {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      #${ROOT_ID} .gp-ab-item {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        border: 1px solid var(--gp-line);
        background: #0a1018;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      #${ROOT_ID} .gp-ab-item img {
        width: 32px;
        height: 32px;
        object-fit: contain;
        image-rendering: pixelated;
      }
    `;
  }

  function ensureDom() {
    ensureStyles();
    let root = document.getElementById(ROOT_ID);
    if (root) {
      const dialog = root.querySelector('.gp-dialog');
      const modal = root.querySelector('#gpAutoBossModal');
      const huntModal = root.querySelector('#gpHuntModal');
      const codexModal = root.querySelector('#gpCodexModal');
      // HTML antigo quebrava o </div> do AutoBoss e jogava o modal no root (tela cheia).
      // Também reconstrói quando hunts ainda estão no accordion antigo.
      if (
        !dialog ||
        !modal ||
        !dialog.contains(modal) ||
        !huntModal ||
        !dialog.contains(huntModal) ||
        !codexModal ||
        !dialog.contains(codexModal) ||
        root.querySelector('#gpHuntBox')
      ) {
        try {
          root.remove();
        } catch (_) {}
        root = null;
        bound = false;
      }
    }
    if (root) {
      // Painel antigo sem abas do AutoBoss (hot-reload da extensão).
      if (!root.querySelector('#gpAbTabs')) {
        const modal = root.querySelector('#gpAutoBossModal');
        const body = root.querySelector('#gpAbBody');
        if (modal && body) {
          const tabs = document.createElement('div');
          tabs.className = 'gp-ab-tabs';
          tabs.id = 'gpAbTabs';
          tabs.innerHTML =
            '<button type="button" class="gp-ab-tab is-on" data-ab-tab="catalog">Catálogo</button>' +
            '<button type="button" class="gp-ab-tab" data-ab-tab="selected">Bosses Selecionados<span class="gp-ab-tab-n" id="gpAbSelectedCount"></span></button>';
          modal.insertBefore(tabs, body);
        }
      }
      if (!root.querySelector('#gpCodexTabs')) {
        const body = root.querySelector('#gpCodexBody');
        const ranks = root.querySelector('#gpCodexRanks');
        if (body && ranks) {
          const tabs = document.createElement('div');
          tabs.className = 'gp-cx-tabs';
          tabs.id = 'gpCodexTabs';
          tabs.innerHTML =
            '<button type="button" class="gp-cx-tab is-on" data-cx-tab="catalog">Catálogo</button>' +
            '<button type="button" class="gp-cx-tab" data-cx-tab="selected">Codex Selecionados<span class="gp-cx-tab-n" id="gpCodexSelectedCount"></span></button>';
          body.insertBefore(tabs, ranks);
        }
      }
      if (!root.querySelector('#gpCodexEnabledToggle')) {
        const body = root.querySelector('#gpCodexBody');
        const tabs = root.querySelector('#gpCodexTabs');
        if (body && tabs) {
          const bar = document.createElement('div');
          bar.className = 'gp-cx-enable';
          bar.id = 'gpCodexEnableBar';
          bar.title = 'Liga/desliga toda entrega automática do Codex no Auto Sell';
          bar.innerHTML =
            '<div><span class="gp-cx-enable-label">Codex automático</span>' +
            '<span class="gp-cx-enable-hint" id="gpCodexEnableHint">Entrega antes da venda</span></div>' +
            '<label class="gp-switch"><input type="checkbox" id="gpCodexEnabledToggle" checked><span></span></label>';
          body.insertBefore(bar, tabs);
        }
      }
      if (!root.querySelector('#gpCodexOverlayBtn')) {
        const body = root.querySelector('#gpCodexBody');
        const tabs = root.querySelector('#gpCodexTabs');
        const bar = root.querySelector('#gpCodexEnableBar');
        if (body && tabs) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'gp-cx-overlay-btn';
          btn.id = 'gpCodexOverlayBtn';
          btn.textContent = 'Ativar overlay';
          body.insertBefore(btn, tabs);
          if (bar && bar.nextSibling !== btn) {
            try {
              body.insertBefore(btn, bar.nextSibling);
            } catch (_) {}
          }
        }
      }
      if (!root.querySelector('#gpAbRunBar')) {
        const modal = root.querySelector('#gpAutoBossModal');
        const body = root.querySelector('#gpAbBody');
        if (modal && body) {
          const run = document.createElement('div');
          run.className = 'gp-ab-run';
          run.id = 'gpAbRunBar';
          run.hidden = true;
          run.innerHTML =
            '<button type="button" class="gp-ab-run-btn" id="gpAbRunBtn">Iniciar</button>' +
            '<div class="gp-ab-run-meta" id="gpAbRunMeta">Selecione bosses e inicie a fila.</div>' +
            '<div class="gp-ab-auto-opts">' +
            '<div class="gp-ab-auto" title="Com Auto ligado, reinicia a fila sozinho todo dia a partir de 00:05 (após o reset 00:00)">' +
            '<div><span class="gp-ab-auto-label">Automático</span><span class="gp-ab-auto-hint">diário 00:05</span></div>' +
            '<label class="gp-switch"><input type="checkbox" id="gpAbAutoCycleToggle"><span></span></label>' +
            '</div>' +
            '<div class="gp-ab-auto" title="Se só 1 personagem ficar vivo na party, aborta o boss, vai à cidade e segue para o próximo">' +
            '<div><span class="gp-ab-auto-label">Solo</span><span class="gp-ab-auto-hint">1 vivo → cidade</span></div>' +
            '<label class="gp-switch"><input type="checkbox" id="gpAbSoloEscapeToggle"><span></span></label>' +
            '</div>' +
            '<div class="gp-ab-auto" title="Limite de tempo por boss. Ao estourar: foge (confirmar saída) e recarrega a página">' +
            '<div><span class="gp-ab-auto-label">Cooldown</span><span class="gp-ab-auto-hint">sair se passar min</span></div>' +
            '<input type="number" class="gp-ab-timer-mins" id="gpAbFightTimerMins" min="1" max="300" step="1" value="30" title="Minutos">' +
            '<span class="gp-ab-timer-unit">min</span>' +
            '<label class="gp-switch"><input type="checkbox" id="gpAbFightTimerToggle"><span></span></label>' +
            '</div>' +
            '<div class="gp-ab-auto" title="Ao finalizar a fila: LIGADO → ativa amuleto e anel no Helper Boss; DESLIGADO → desativa os dois">' +
            '<div><span class="gp-ab-auto-label">Amu/Anel</span><span class="gp-ab-auto-hint">fim fila → Ativo/Inativo</span></div>' +
            '<label class="gp-switch"><input type="checkbox" id="gpAbEndHelperEquipToggle"><span></span></label>' +
            '</div>' +
            '</div>';
          modal.insertBefore(run, body);
        }
      }
      if (root.querySelector('#gpAbRunBar') && !root.querySelector('#gpAbAutoCycleToggle')) {
        const bar = root.querySelector('#gpAbRunBar');
        if (bar) {
          let opts = bar.querySelector('.gp-ab-auto-opts');
          if (!opts) {
            opts = document.createElement('div');
            opts.className = 'gp-ab-auto-opts';
            bar.appendChild(opts);
          }
          const auto = document.createElement('div');
          auto.className = 'gp-ab-auto';
          auto.title =
            'Com Auto ligado, reinicia a fila sozinho todo dia a partir de 00:05 (após o reset 00:00)';
          auto.innerHTML =
            '<div><span class="gp-ab-auto-label">Automático</span><span class="gp-ab-auto-hint">diário 00:05</span></div>' +
            '<label class="gp-switch"><input type="checkbox" id="gpAbAutoCycleToggle"><span></span></label>';
          opts.appendChild(auto);
        }
      }
      if (root.querySelector('#gpAbRunBar') && !root.querySelector('#gpAbSoloEscapeToggle')) {
        const bar = root.querySelector('#gpAbRunBar');
        if (bar) {
          let opts = bar.querySelector('.gp-ab-auto-opts');
          if (!opts) {
            opts = document.createElement('div');
            opts.className = 'gp-ab-auto-opts';
            bar.appendChild(opts);
          }
          const solo = document.createElement('div');
          solo.className = 'gp-ab-auto';
          solo.title =
            'Se só 1 personagem ficar vivo na party, aborta o boss, vai à cidade e segue para o próximo';
          solo.innerHTML =
            '<div><span class="gp-ab-auto-label">Solo</span><span class="gp-ab-auto-hint">1 vivo → cidade</span></div>' +
            '<label class="gp-switch"><input type="checkbox" id="gpAbSoloEscapeToggle"><span></span></label>';
          opts.appendChild(solo);
        }
      }
      if (root.querySelector('#gpAbRunBar') && !root.querySelector('#gpAbFightTimerToggle')) {
        const bar = root.querySelector('#gpAbRunBar');
        if (bar) {
          let opts = bar.querySelector('.gp-ab-auto-opts');
          if (!opts) {
            opts = document.createElement('div');
            opts.className = 'gp-ab-auto-opts';
            bar.appendChild(opts);
          }
          const timer = document.createElement('div');
          timer.className = 'gp-ab-auto';
          timer.title =
            'Limite de tempo por boss. Ao estourar: foge (confirmar saída) e recarrega a página';
          timer.innerHTML =
            '<div><span class="gp-ab-auto-label">Cooldown</span><span class="gp-ab-auto-hint">sair se passar min</span></div>' +
            '<input type="number" class="gp-ab-timer-mins" id="gpAbFightTimerMins" min="1" max="300" step="1" value="30" title="Minutos">' +
            '<span class="gp-ab-timer-unit">min</span>' +
            '<label class="gp-switch"><input type="checkbox" id="gpAbFightTimerToggle"><span></span></label>';
          opts.appendChild(timer);
        }
      }
      if (root.querySelector('#gpAbRunBar') && !root.querySelector('#gpAbEndHelperEquipToggle')) {
        const bar = root.querySelector('#gpAbRunBar');
        if (bar) {
          let opts = bar.querySelector('.gp-ab-auto-opts');
          if (!opts) {
            opts = document.createElement('div');
            opts.className = 'gp-ab-auto-opts';
            bar.appendChild(opts);
          }
          const endEquip = document.createElement('div');
          endEquip.className = 'gp-ab-auto';
          endEquip.title =
            'Ao finalizar a fila: LIGADO → ativa amuleto e anel no Helper Boss; DESLIGADO → desativa os dois';
          endEquip.innerHTML =
            '<div><span class="gp-ab-auto-label">Amu/Anel</span><span class="gp-ab-auto-hint">fim fila → Ativo/Inativo</span></div>' +
            '<label class="gp-switch"><input type="checkbox" id="gpAbEndHelperEquipToggle"><span></span></label>';
          opts.appendChild(endEquip);
        }
      }
      if (!root.querySelector('#gpAbResetTrack')) {
        const top = root.querySelector('#gpAutoBossModal .gp-ab-top');
        const closeBtn = root.querySelector('#gpAbClose');
        if (top && closeBtn) {
          const reset = document.createElement('button');
          reset.type = 'button';
          reset.className = 'gp-ab-reset-btn';
          reset.id = 'gpAbResetTrack';
          reset.title = 'Zera cooldowns e status dos bosses';
          reset.textContent = 'Zerar contadores';
          top.insertBefore(reset, closeBtn);
        }
      }
      if (!root.querySelector('#gpSettingsChars')) {
        const settings = root.querySelector('#gpSettings');
        if (settings) {
          const box = document.createElement('div');
          box.className = 'gp-settings-row gp-settings-chars';
          box.id = 'gpSettingsChars';
          box.innerHTML =
            '<div class="gp-settings-chars-head">Personagens</div>' +
            '<div class="gp-settings-chars-list" id="gpCharactersList">' +
            '<p class="gp-settings-chars-empty">Nenhum personagem capturado ainda.</p>' +
            '</div>';
          settings.appendChild(box);
        }
      }
      return root;
    }

    root = document.createElement('div');
    root.id = ROOT_ID;
    root.setAttribute('data-tibia-bot', 'game-panel');
    root.innerHTML =
      '<div class="gp-backdrop" data-gp-close="1"></div>' +
      '<div class="gp-dialog" role="dialog" aria-modal="true" aria-label="TibiaBot">' +
      '<div class="gp-top">' +
      '<div><div class="gp-brand">TibiaBot.Online</div><h2 class="gp-title">Baiak-Idle</h2></div>' +
      '<div class="gp-top-actions">' +
      '<button type="button" class="gp-gear" id="gpGearBtn" aria-label="Configurações" aria-expanded="false" title="Configurações">⚙</button>' +
      '<button type="button" class="gp-close" data-gp-close="1" aria-label="Fechar">×</button>' +
      '<div class="gp-settings" id="gpSettings" hidden>' +
      '<div class="gp-settings-row">' +
      '<div><div class="gp-settings-label">Overlay</div>' +
      '<p class="gp-settings-hint">Apenas exibe ou oculta o painel dos módulos.</p></div>' +
      '<label class="gp-switch" title="Mostrar/ocultar overlay">' +
      '<input type="checkbox" id="gpOverlayToggle" checked>' +
      '<span></span></label>' +
      '</div>' +
      '<div class="gp-settings-row">' +
      '<div><div class="gp-settings-label">Ocultar nomes</div>' +
      '<p class="gp-settings-hint">Oculta nome dos seus personagens.</p></div>' +
      '<label class="gp-switch" title="Ocultar nomes">' +
      '<input type="checkbox" id="gpOcultarNomesToggle">' +
      '<span></span></label>' +
      '</div>' +
      '<div class="gp-settings-row gp-settings-chars" id="gpSettingsChars">' +
      '<div class="gp-settings-chars-head">Personagens</div>' +
      '<div class="gp-settings-chars-list" id="gpCharactersList">' +
      '<p class="gp-settings-chars-empty">Nenhum personagem capturado ainda.</p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="gp-userrow">' +
      '<span id="gpUserLabel"></span>' +
      '<span id="gpVipPill" class="gp-vip-pill is-free">Free</span>' +
      '</div>' +
      '<div id="gpVersionBanner" class="gp-banner" hidden></div>' +
      '<div id="gpVipBanner" class="gp-banner" hidden></div>' +
      '<div id="gpViewLocked" class="gp-view">' +
      '<p style="margin:0 0 8px;font-size:13px;line-height:1.45;color:var(--gp-muted)">Faça login em tibiabot.online para usar os módulos.</p>' +
      '<a class="gp-cta" href="' +
      SITE_URL +
      '?cadastro=1" target="_blank" rel="noopener">Abrir tibiabot.online</a>' +
      '</div>' +
      '<div id="gpViewOutdated" class="gp-view">' +
      '<p style="margin:0;font-size:13px;line-height:1.45;color:var(--gp-muted)">Atualize a extensão para usar os módulos do Baiak-Idle.</p>' +
      '</div>' +
      '<div id="gpViewMain" class="gp-view">' +
      '<button type="button" class="gp-autoboss-btn" id="gpAutoBossBtn">' +
      '<div><strong>AutoBoss</strong><span>Catálogo · playlist · fila automática</span></div>' +
      '<span aria-hidden="true">›</span>' +
      '</button>' +
      '<button type="button" class="gp-autoboss-btn" id="gpHuntBtn">' +
      '<div><strong>Hunts</strong><span id="gpHuntActiveLabel">Nenhuma hunt selecionada.</span></div>' +
      '<span aria-hidden="true">›</span>' +
      '</button>' +
      '<button type="button" class="gp-autoboss-btn" id="gpCodexBtn">' +
      '<div><strong>Codex</strong><span>Catálogo · itens · ir à hunt</span></div>' +
      '<span aria-hidden="true">›</span>' +
      '</button>' +
      '<div id="gpModules"></div>' +
      '</div>' +
      '<div class="gp-status" id="gpStatus"></div>' +
      '<div class="gp-ab-modal" id="gpAutoBossModal" hidden>' +
      '<div class="gp-ab-top">' +
      '<button type="button" class="gp-ab-back" id="gpAbBack" hidden>← Voltar</button>' +
      '<h3 id="gpAbTitle">AutoBoss</h3>' +
      '<button type="button" class="gp-ab-reset-btn" id="gpAbResetTrack" title="Zera cooldowns e status dos bosses">Zerar contadores</button>' +
      '<button type="button" class="gp-ab-close" id="gpAbClose" aria-label="Fechar AutoBoss">×</button>' +
      '</div>' +
      '<div class="gp-ab-tabs" id="gpAbTabs">' +
      '<button type="button" class="gp-ab-tab is-on" data-ab-tab="catalog">Catálogo</button>' +
      '<button type="button" class="gp-ab-tab" data-ab-tab="selected">Bosses Selecionados<span class="gp-ab-tab-n" id="gpAbSelectedCount"></span></button>' +
      '</div>' +
      '<div class="gp-ab-run" id="gpAbRunBar" hidden>' +
      '<button type="button" class="gp-ab-run-btn" id="gpAbRunBtn">Iniciar</button>' +
      '<div class="gp-ab-run-meta" id="gpAbRunMeta">Selecione bosses e inicie a fila.</div>' +
      '<div class="gp-ab-auto-opts">' +
      '<div class="gp-ab-auto" title="Com Auto ligado, reinicia a fila sozinho todo dia a partir de 00:05 (após o reset 00:00)">' +
      '<div><span class="gp-ab-auto-label">Automático</span><span class="gp-ab-auto-hint">diário 00:05</span></div>' +
      '<label class="gp-switch"><input type="checkbox" id="gpAbAutoCycleToggle"><span></span></label>' +
      '</div>' +
      '<div class="gp-ab-auto" title="Se só 1 personagem ficar vivo na party, aborta o boss, vai à cidade e segue para o próximo">' +
      '<div><span class="gp-ab-auto-label">Solo</span><span class="gp-ab-auto-hint">1 vivo → cidade</span></div>' +
      '<label class="gp-switch"><input type="checkbox" id="gpAbSoloEscapeToggle"><span></span></label>' +
      '</div>' +
      '<div class="gp-ab-auto" title="Limite de tempo por boss. Ao estourar: foge (confirmar saída) e recarrega a página">' +
      '<div><span class="gp-ab-auto-label">Timer</span><span class="gp-ab-auto-hint">sair se passar min</span></div>' +
      '<input type="number" class="gp-ab-timer-mins" id="gpAbFightTimerMins" min="1" max="300" step="1" value="30" title="Minutos">' +
      '<span class="gp-ab-timer-unit">min</span>' +
      '<label class="gp-switch"><input type="checkbox" id="gpAbFightTimerToggle"><span></span></label>' +
      '</div>' +
      '<div class="gp-ab-auto" title="Ao finalizar a fila: LIGADO → ativa amuleto e anel no Helper Boss; DESLIGADO → desativa os dois">' +
      '<div><span class="gp-ab-auto-label">Amu/Anel</span><span class="gp-ab-auto-hint">fim fila → Ativo/Inativo</span></div>' +
      '<label class="gp-switch"><input type="checkbox" id="gpAbEndHelperEquipToggle"><span></span></label>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="gp-ab-body" id="gpAbBody"></div>' +
      '</div>' +
      '<div class="gp-ab-modal" id="gpHuntModal" hidden>' +
      '<div class="gp-ab-top">' +
      '<h3 id="gpHuntTitle">Hunts</h3>' +
      '<div class="gp-hunt-top-brand">TibiaBot.Online</div>' +
      '<button type="button" class="gp-ab-close" id="gpHuntClose" aria-label="Fechar Hunts">×</button>' +
      '</div>' +
      '<div class="gp-ab-body" id="gpHuntBody">' +
      '<div class="gp-hunt-ranks" id="gpHuntRanks"></div>' +
      '<div class="gp-hunt-list" id="gpHuntList"></div>' +
      '</div>' +
      '</div>' +
      '<div class="gp-ab-modal" id="gpCodexModal" hidden>' +
      '<div class="gp-ab-top">' +
      '<h3 id="gpCodexTitle">Codex</h3>' +
      '<div class="gp-hunt-top-brand">TibiaBot.Online</div>' +
      '<button type="button" class="gp-ab-close" id="gpCodexClose" aria-label="Fechar Codex">×</button>' +
      '</div>' +
      '<div class="gp-ab-body" id="gpCodexBody">' +
      '<div class="gp-cx-enable" id="gpCodexEnableBar" title="Liga/desliga toda entrega automática do Codex no Auto Sell">' +
      '<div><span class="gp-cx-enable-label">Codex automático</span>' +
      '<span class="gp-cx-enable-hint" id="gpCodexEnableHint">Entrega antes da venda</span></div>' +
      '<label class="gp-switch"><input type="checkbox" id="gpCodexEnabledToggle" checked><span></span></label>' +
      '</div>' +
      '<button type="button" class="gp-cx-overlay-btn" id="gpCodexOverlayBtn">Ativar overlay</button>' +
      '<div class="gp-cx-tabs" id="gpCodexTabs">' +
      '<button type="button" class="gp-cx-tab is-on" data-cx-tab="catalog">Catálogo</button>' +
      '<button type="button" class="gp-cx-tab" data-cx-tab="selected">Codex Selecionados<span class="gp-cx-tab-n" id="gpCodexSelectedCount"></span></button>' +
      '</div>' +
      '<div class="gp-hunt-ranks" id="gpCodexRanks"></div>' +
      '<div class="gp-cx-list" id="gpCodexList"></div>' +
      '</div>' +
      '</div>' +
      '</div>';

    const modulesBox = root.querySelector('#gpModules');
    for (const mod of MODULES) {
      if (mod.hidden) continue;
      if (mod.kind === 'tiers') {
        const el = document.createElement('div');
        el.className = 'gp-module';
        el.dataset.module = mod.id;
        el.innerHTML =
          '<div class="gp-module-title">' +
          mod.label +
          '</div>' +
          '<div class="gp-module-desc">' +
          mod.desc +
          '</div>' +
          '<div class="gp-tier-chips" id="gpMoverTiers">' +
          '<button type="button" class="gp-tier-chip" data-tier="0" data-color="#cfd2d8" title="Common">T0</button>' +
          '<button type="button" class="gp-tier-chip" data-tier="1" data-color="#57b85a" title="Uncommon">T1</button>' +
          '<button type="button" class="gp-tier-chip" data-tier="2" data-color="#4a90e8" title="Rare">T2</button>' +
          '<button type="button" class="gp-tier-chip" data-tier="3" data-color="#a05be0" title="Epic">T3</button>' +
          '<button type="button" class="gp-tier-chip" data-tier="4" data-color="#e0b35a" title="Dourado">T4</button>' +
          '<button type="button" class="gp-tier-chip" data-tier="5" data-color="#e53935" title="Mítico">T5</button>' +
          '</div>';
        modulesBox.appendChild(el);
        continue;
      }

      if (mod.kind === 'stamina') {
        const el = document.createElement('div');
        el.className = 'gp-module';
        el.dataset.module = mod.id;
        el.innerHTML =
          '<div class="gp-module-row">' +
          '<div><div class="gp-module-title"></div><div class="gp-module-desc"></div></div>' +
          '<label class="gp-switch"><input type="checkbox" id="' +
          mod.toggleId +
          '"><span></span></label>' +
          '</div>' +
          '<div class="gp-stamina-fields" id="gpStaminaFields">' +
          '<div class="gp-stamina-field">' +
          '<label for="gpStaminaMinPct">Mín. → Treino</label>' +
          '<div class="gp-stamina-input-wrap">' +
          '<input id="gpStaminaMinPct" type="number" min="0" max="99" step="1" value="15" inputmode="numeric" aria-label="Porcentagem mínima">' +
          '<span class="gp-stamina-pct-suffix" aria-hidden="true">%</span>' +
          '</div>' +
          '</div>' +
          '<div class="gp-stamina-field">' +
          '<label for="gpStaminaMaxPct">Máx. → Hunt</label>' +
          '<div class="gp-stamina-input-wrap">' +
          '<input id="gpStaminaMaxPct" type="number" min="1" max="100" step="1" value="30" inputmode="numeric" aria-label="Porcentagem máxima">' +
          '<span class="gp-stamina-pct-suffix" aria-hidden="true">%</span>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '<p class="gp-stamina-warn" id="gpStaminaWarn" hidden>Stamina abaixo de 15% perde 50% de XP e loot.</p>';
        el.querySelector('.gp-module-title').textContent = mod.label;
        el.querySelector('.gp-module-desc').textContent = mod.desc;
        modulesBox.appendChild(el);
        continue;
      }

      if (mod.kind === 'auto_sell') {
        const el = document.createElement('div');
        el.className = 'gp-module';
        el.dataset.module = mod.id;
        el.innerHTML =
          '<div class="gp-module-row">' +
          '<div><div class="gp-module-title"></div><div class="gp-module-desc"></div></div>' +
          '<label class="gp-switch"><input type="checkbox" id="' +
          mod.toggleId +
          '"><span></span></label>' +
          '</div>' +
          '<div class="gp-perm-row">' +
          '<div>' +
          '<div class="gp-perm-row-label">VenderLootBoss</div>' +
          '<div class="gp-perm-row-hint">Antes de vender, libera a proteção do autosell.</div>' +
          '</div>' +
          '<label class="gp-switch" title="VenderLootBoss">' +
          '<input type="checkbox" id="gpVenderLootBossToggle"><span></span>' +
          '</label>' +
          '</div>' +
          '<div class="gp-stamina-fields" id="gpAutoSellFields">' +
          '<div class="gp-stamina-field">' +
          '<label for="gpAutoSellMinPct">Vender ao atingir</label>' +
          '<div class="gp-stamina-input-wrap">' +
          '<input id="gpAutoSellMinPct" type="number" min="1" max="100" step="1" value="70" inputmode="numeric" aria-label="Porcentagem da mochila">' +
          '<span class="gp-stamina-pct-suffix" aria-hidden="true">%</span>' +
          '</div>' +
          '</div>' +
          '</div>';
        el.querySelector('.gp-module-title').textContent = mod.label;
        el.querySelector('.gp-module-desc').textContent = mod.desc;
        modulesBox.appendChild(el);
        continue;
      }

      if (mod.kind === 'auto_anuncio') {
        const el = document.createElement('div');
        el.className = 'gp-module';
        el.dataset.module = mod.id;
        el.innerHTML =
          '<div class="gp-module-row">' +
          '<div><div class="gp-module-title"></div><div class="gp-module-desc"></div></div>' +
          '<label class="gp-switch"><input type="checkbox" id="' +
          mod.toggleId +
          '"><span></span></label>' +
          '</div>' +
          '<div class="gp-anuncio-fields" id="gpAutoAnuncioFields">' +
          '<div class="gp-anuncio-row">' +
          '<div class="gp-stamina-field">' +
          '<label for="gpAutoAnuncioChannel">Canal</label>' +
          '<select id="gpAutoAnuncioChannel" aria-label="Canal do chat">' +
          '<option value="geral">Geral</option>' +
          '<option value="comunicados">Comunicados</option>' +
          '<option value="help">Help</option>' +
          '<option value="market">Market</option>' +
          '</select>' +
          '</div>' +
          '<div class="gp-stamina-field">' +
          '<label for="gpAutoAnuncioInterval">Intervalo (min)</label>' +
          '<div class="gp-stamina-input-wrap">' +
          '<input id="gpAutoAnuncioInterval" type="number" min="1" max="120" step="1" value="5" inputmode="numeric" aria-label="Intervalo em minutos">' +
          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="gp-stamina-field">' +
          '<label for="gpAutoAnuncioText">Mensagem</label>' +
          '<textarea id="gpAutoAnuncioText" maxlength="200" rows="3" placeholder="Texto do anúncio (máx. 200)"></textarea>' +
          '<p class="gp-anuncio-hint" id="gpAutoAnuncioCount">0 / 200</p>' +
          '</div>' +
          '</div>';
        el.querySelector('.gp-module-title').textContent = mod.label;
        el.querySelector('.gp-module-desc').textContent = mod.desc;
        modulesBox.appendChild(el);
        continue;
      }

      if (mod.kind === 'kills_hora') {
        const el = document.createElement('div');
        el.className = 'gp-module';
        el.dataset.module = mod.id;
        el.innerHTML =
          '<div class="gp-module-row">' +
          '<div><div class="gp-module-title"></div><div class="gp-module-desc"></div></div>' +
          '<label class="gp-switch"><input type="checkbox" id="' +
          mod.toggleId +
          '"><span></span></label>' +
          '</div>' +
          '<div class="gp-kills-fields" id="gpKillsFields">' +
          '<div class="gp-kills-summary" id="gpKillsSummary">' +
          '<span>Kills: <strong id="gpKillsTotal">0</strong></span>' +
          '<span>Exp: <strong id="gpKillsExp">0</strong></span>' +
          '<span>Taxa: <strong id="gpKillsRate">0/h</strong></span>' +
          '<span class="gp-kills-session" id="gpKillsSession" title="Mesma Session do overlay (#an-session)">—</span>' +
          '</div>' +
          '<div class="gp-kills-list" id="gpKillsList" aria-live="polite">' +
          '<div class="gp-kills-empty">Ligue o módulo para iniciar o histórico da sessão.</div>' +
          '</div>' +
          '</div>';
        el.querySelector('.gp-module-title').textContent = mod.label;
        el.querySelector('.gp-module-desc').textContent = mod.desc;
        modulesBox.appendChild(el);
        continue;
      }

      if (mod.kind === 'gold_media') {
        const el = document.createElement('div');
        el.className = 'gp-module';
        el.dataset.module = mod.id;
        el.innerHTML =
          '<div class="gp-module-row">' +
          '<div><div class="gp-module-title"></div><div class="gp-module-desc"></div></div>' +
          '</div>' +
          '<button type="button" class="gp-run-btn" id="' +
          mod.runBtnId +
          '">Analisar média</button>';
        el.querySelector('.gp-module-title').textContent = mod.label;
        el.querySelector('.gp-module-desc').textContent = mod.desc;
        modulesBox.appendChild(el);
        continue;
      }

      const el = document.createElement('div');
      el.className = 'gp-module';
      el.dataset.module = mod.id;
      el.innerHTML =
        '<div class="gp-module-row">' +
        '<div><div class="gp-module-title"></div><div class="gp-module-desc"></div></div>' +
        '<label class="gp-switch"><input type="checkbox" id="' +
        mod.toggleId +
        '"><span></span></label>' +
        '</div>';
      el.querySelector('.gp-module-title').textContent = mod.label;
      el.querySelector('.gp-module-desc').textContent = mod.desc;
      modulesBox.appendChild(el);
    }

    (document.body || document.documentElement).appendChild(root);
    return root;
  }

  function showView(viewId) {
    const root = ensureDom();
    root.querySelectorAll('.gp-view').forEach((el) => {
      el.classList.toggle('is-active', el.id === viewId);
    });
  }

  function applyModulesLock(locked) {
    const root = ensureDom();
    root.querySelectorAll('.gp-module').forEach((el) => {
      el.classList.toggle('is-locked', !!locked);
    });
    for (const mod of MODULES) {
      if (!mod.toggleId) continue;
      const toggle = document.getElementById(mod.toggleId);
      if (toggle) toggle.disabled = !!locked;
    }
    root.querySelectorAll('#gpMoverTiers .gp-tier-chip').forEach((btn) => {
      btn.disabled = !!locked;
    });
    root.querySelectorAll(
      '#gpStaminaMinPct, #gpStaminaMaxPct, #gpAutoSellMinPct, #gpAutoAnuncioChannel, #gpAutoAnuncioInterval, #gpAutoAnuncioText, #gpGoldMediaRun'
    ).forEach((input) => {
      input.disabled = !!locked;
    });
    const venderLootBoss = document.getElementById('gpVenderLootBossToggle');
    if (venderLootBoss) venderLootBoss.disabled = !!locked;
  }

  function setVipPill(vip) {
    const el = $('#gpVipPill');
    if (!el) return;
    el.textContent = vip ? 'VIP' : 'Free';
    el.className = 'gp-vip-pill ' + (vip ? 'is-vip' : 'is-free');
  }

  function setVipBanner(auth) {
    const el = $('#gpVipBanner');
    if (!el) return;
    if (auth?.extensionOutdated) {
      el.hidden = true;
      return;
    }
    const vip = isVipAuth(auth);
    if (vip) {
      const fim = formatVipEnd(auth.contaStatus?.data_final);
      el.hidden = false;
      el.style.borderColor = '#166534';
      el.style.background = 'rgba(22, 101, 52, 0.22)';
      el.style.color = '#bbf7d0';
      el.innerHTML = fim
        ? 'VIP ativa · termina em <strong>' + fim + '</strong>'
        : 'VIP ativa.';
      return;
    }
    el.hidden = false;
    el.style.borderColor = '#7f1d1d';
    el.style.background = 'rgba(127, 29, 29, 0.22)';
    el.style.color = '#fecaca';
    el.innerHTML =
      'Conta Free. <a href="' +
      CONTA_URL +
      '" target="_blank" rel="noopener">Compre VIP ou recrute</a> para liberar os módulos.';
  }

  function setVersionBanner(auth) {
    const el = $('#gpVersionBanner');
    if (!el) return;
    if (!auth?.extensionOutdated) {
      el.hidden = true;
      el.innerHTML = '';
      return;
    }
    const required = auth.requiredVersion || '?';
    const installed = auth.installedVersion || '?';
    el.hidden = false;
    el.style.borderColor = '#92400e';
    el.style.background = 'rgba(146, 64, 14, 0.28)';
    el.style.color = '#fde68a';
    el.innerHTML =
      '<strong>Atualização obrigatória</strong><br>' +
      (auth.versionMessage ||
        'Sua extensão está desatualizada. Atualize para usar o Baiak-Idle.') +
      '<br><span style="opacity:.9">Mínima: ' +
      required +
      ' · Instalada: ' +
      installed +
      '</span><br><a href="' +
      SITE_URL +
      '" target="_blank" rel="noopener">Abrir tibiabot.online</a>';
  }

  function applyAuthUi(auth) {
    lastAuth = auth || { loggedIn: false, vip: false, extensionOutdated: false };
    const loggedIn = !!auth?.loggedIn;
    const userLabel = $('#gpUserLabel');

    if (!loggedIn) {
      if (userLabel) userLabel.textContent = '';
      setVipPill(false);
      setVersionBanner(auth);
      setVipBanner(auth);
      showView('gpViewLocked');
      applyModulesLock(true);
      return false;
    }

    const nome = auth.user?.nome || auth.user?.email || '';
    const first = nome ? String(nome).split(' ')[0] : 'Conta conectada';
    if (userLabel) userLabel.textContent = nome ? 'Olá, ' + first : 'Conta conectada';

    const vip = isVipAuth(auth);
    setVipPill(vip);
    setVersionBanner(auth);
    setVipBanner(auth);

    if (auth.extensionOutdated) {
      showView('gpViewOutdated');
      applyModulesLock(true);
      return true;
    }

    showView('gpViewMain');
    applyModulesLock(!vip);
    return true;
  }

  function getHuntRanks() {
    return window.BAIAK_IDLE_HUNT_RANKS || [];
  }

  function getHuntList() {
    return window.BAIAK_IDLE_HUNTS || [];
  }

  function getHuntDetailsCatalog() {
    return Array.isArray(window.BAIAK_IDLE_HUNT_DETAILS)
      ? window.BAIAK_IDLE_HUNT_DETAILS
      : [];
  }

  function getHuntDetails(idOrName) {
    if (typeof window.BAIAK_IDLE_GET_HUNT === 'function') {
      return window.BAIAK_IDLE_GET_HUNT(idOrName);
    }
    const key = String(idOrName || '')
      .trim()
      .toLowerCase();
    if (!key) return null;
    return (
      getHuntDetailsCatalog().find((h) => h && h.id === key) ||
      getHuntDetailsCatalog().find(
        (h) => h && String(h.name || '').toLowerCase() === key
      ) ||
      null
    );
  }

  async function ensureHuntDetailsCatalogLoaded() {
    if (getHuntDetailsCatalog().length) return true;
    if (huntsEnsurePromise) return huntsEnsurePromise;

    huntsEnsurePromise = (async () => {
      const response = await chrome.runtime.sendMessage({
        type: 'BAIAKIDLE_ENSURE_HUNTS'
      });
      if (!response?.success) {
        throw new Error(response?.error || 'Falha ao carregar detalhes das hunts.');
      }
      return true;
    })()
      .catch((err) => {
        console.warn('[Tibia Bot] catálogo de hunts:', err);
        return false;
      })
      .finally(() => {
        huntsEnsurePromise = null;
      });

    return huntsEnsurePromise;
  }

  function huntsForRank(rankId) {
    const ranks = getHuntRanks();
    const rank = ranks.find((r) => r.id === rankId) || ranks[0];
    const list = getHuntList();
    if (!rank || rank.id === 'todas') return list.slice();
    return list.filter((h) => h.level >= rank.min && h.level <= rank.max);
  }

  function getHuntLean(hunt) {
    const fromList = String(hunt?.lean || '').toLowerCase();
    if (fromList === 'exp' || fromList === 'loot') return fromList;
    const details = getHuntDetails(hunt?.name || hunt);
    const fromDetails = String(details?.lean || '').toLowerCase();
    if (fromDetails === 'exp' || fromDetails === 'loot') return fromDetails;
    return '';
  }

  function huntLeanBadgeHtml(lean) {
    if (lean !== 'exp' && lean !== 'loot') return '';
    const label = lean === 'exp' ? 'EXP' : 'LOOT';
    const title =
      lean === 'exp'
        ? 'Rende mais EXP que loot (por esforço de kill)'
        : 'Rende mais LOOT que exp (por esforço de kill)';
    return (
      '<span class="gp-hunt-lean is-' +
      lean +
      '" title="' +
      escapeHtml(title) +
      '">' +
      label +
      '</span>'
    );
  }

  function huntElementLabel(element) {
    const el = String(element || '').toLowerCase();
    if (!el) return '';
    return el.charAt(0).toUpperCase() + el.slice(1);
  }

  function huntElementIconUrl(element, icon) {
    if (icon) return String(icon);
    const el = String(element || '')
      .toLowerCase()
      .replace(/[^a-z]/g, '');
    if (!el) return '';
    return 'https://baiakidle.com/jogar/img/elements/' + el + '.png';
  }

  const HUNT_ELEMENT_ORDER = [
    'physical',
    'energy',
    'earth',
    'fire',
    'ice',
    'holy',
    'death'
  ];

  function huntElementKindFromValue(value) {
    const v = Number(value) || 0;
    if (v < 0) return 'fraco';
    if (v > 0) return 'forte';
    return 'neutro';
  }

  /**
   * Agrega elementos da hunt em Fraco / Neutro / Forte (média entre criaturas).
   * @returns {{ fraco: Array, neutro: Array, forte: Array }}
   */
  function getHuntElementGroups(huntName) {
    const details = getHuntDetails(huntName);
    const creatures = Array.isArray(details?.creatures) ? details.creatures : [];
    /** @type {Map<string, { element: string, icon: string, sum: number, count: number }>} */
    const map = new Map();
    for (const creature of creatures) {
      for (const r of creature?.resistances || []) {
        const element = String(r.element || '')
          .trim()
          .toLowerCase();
        if (!element) continue;
        const value = Number(r.value) || 0;
        const prev = map.get(element);
        if (!prev) {
          map.set(element, {
            element,
            icon: huntElementIconUrl(element, r.icon),
            sum: value,
            count: 1
          });
        } else {
          prev.sum += value;
          prev.count += 1;
          if (!prev.icon) prev.icon = huntElementIconUrl(element, r.icon);
        }
      }
    }

    const groups = { fraco: [], neutro: [], forte: [] };
    const list = Array.from(map.values()).map((e) => {
      const avg = e.count ? e.sum / e.count : 0;
      return {
        element: e.element,
        icon: e.icon,
        avg,
        kind: huntElementKindFromValue(avg)
      };
    });
    list.sort((a, b) => {
      const ia = HUNT_ELEMENT_ORDER.indexOf(a.element);
      const ib = HUNT_ELEMENT_ORDER.indexOf(b.element);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
    for (const e of list) groups[e.kind].push(e);
    return groups;
  }

  function normalizeHuntDamageElements(raw) {
    if (!raw) return [];
    const list = Array.isArray(raw) ? raw : [raw];
    /** @type {Array<{ element: string, icon: string, weight: number }>} */
    const out = [];
    for (const item of list) {
      if (!item) continue;
      if (typeof item === 'string') {
        const element = item.trim().toLowerCase();
        if (!element) continue;
        out.push({ element, icon: huntElementIconUrl(element), weight: 1 });
        continue;
      }
      if (typeof item === 'object') {
        const element = String(item.element || item.name || '')
          .trim()
          .toLowerCase();
        if (!element) continue;
        const weight = Number(item.weight ?? item.value ?? item.score ?? 1);
        out.push({
          element,
          icon: huntElementIconUrl(element, item.icon),
          weight: Number.isFinite(weight) && weight > 0 ? weight : 1
        });
      }
    }
    return out;
  }

  /**
   * Distribui scores em % inteiros que somam 100 (método do maior resto).
   * @param {Array<{ score: number }>} items
   * @returns {number[]}
   */
  function huntScoreToPercents(items) {
    const n = items.length;
    if (!n) return [];
    const scores = items.map((e) => Math.max(0, Number(e.score) || 0));
    const total = scores.reduce((s, v) => s + v, 0);
    if (total <= 0) {
      const base = Math.floor(100 / n);
      const out = Array(n).fill(base);
      for (let i = 0; i < 100 - base * n; i++) out[i] += 1;
      return out;
    }
    const raw = scores.map((v) => (v / total) * 100);
    const floors = raw.map((v) => Math.floor(v));
    let rest = 100 - floors.reduce((s, v) => s + v, 0);
    const order = raw
      .map((v, i) => ({ i, frac: v - floors[i] }))
      .sort((a, b) => b.frac - a.frac);
    for (let k = 0; k < order.length && rest > 0; k++, rest--) {
      floors[order[k].i] += 1;
    }
    return floors;
  }

  /**
   * Elementos de dano que as criaturas mais usam (Defesa).
   * Prefere `damageElements` / `attacks` no catálogo; senão usa os elementos
   * em que a hunt é mais resistente (Forte) — correlação típica no Tibia.
   * @returns {Array<{ element: string, icon: string, avg: number, score: number, pct: number, fromResist: boolean }>}
   */
  function getHuntDefenseElements(huntName) {
    const details = getHuntDetails(huntName);
    const creatures = Array.isArray(details?.creatures) ? details.creatures : [];
    /** @type {Map<string, { element: string, icon: string, score: number }>} */
    const map = new Map();
    let hasExplicit = false;

    for (const creature of creatures) {
      const explicit = normalizeHuntDamageElements(
        creature?.damageElements || creature?.attacks || creature?.damage
      );
      if (!explicit.length) continue;
      hasExplicit = true;
      for (const d of explicit) {
        const prev = map.get(d.element);
        if (!prev) {
          map.set(d.element, {
            element: d.element,
            icon: d.icon,
            score: d.weight
          });
        } else {
          prev.score += d.weight;
          if (!prev.icon) prev.icon = d.icon;
        }
      }
    }

    if (!hasExplicit) {
      const huntLevel = normalizeHuntDamageElements(
        details?.damageElements || details?.defenseElements
      );
      for (const d of huntLevel) {
        hasExplicit = true;
        const prev = map.get(d.element);
        if (!prev) {
          map.set(d.element, {
            element: d.element,
            icon: d.icon,
            score: d.weight
          });
        } else {
          prev.score += d.weight;
          if (!prev.icon) prev.icon = d.icon;
        }
      }
    }

    /** @type {Array<{ element: string, icon: string, avg: number, score: number, fromResist: boolean }>} */
    let ranked;
    if (!hasExplicit) {
      const groups = getHuntElementGroups(huntName);
      // Proxy: criaturas fortes num elemento costumam bater nele.
      // Peso = resistência média positiva (ex.: +50 / +30 / +20 → 50% / 30% / 20%).
      ranked = groups.forte
        .slice()
        .filter((e) => (e.avg || 0) > 0)
        .sort((a, b) => (b.avg || 0) - (a.avg || 0))
        .map((e) => ({
          element: e.element,
          icon: e.icon,
          avg: e.avg,
          score: e.avg,
          fromResist: true
        }));
    } else {
      ranked = Array.from(map.values())
        .map((e) => ({
          element: e.element,
          icon: e.icon,
          avg: e.score,
          score: e.score,
          fromResist: false
        }))
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          const ia = HUNT_ELEMENT_ORDER.indexOf(a.element);
          const ib = HUNT_ELEMENT_ORDER.indexOf(b.element);
          return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
        });
    }

    const pcts = huntScoreToPercents(ranked);
    return ranked
      .map((e, i) => ({ ...e, pct: pcts[i] || 0 }))
      .filter((e) => e.pct > 0);
  }

  function huntDefenseElementsHtml(items) {
    if (!items.length) return '';
    return (
      '<div class="gp-hunt-rec-def-list">' +
      items
        .map((r) => {
          const label = huntElementLabel(r.element);
          const src = huntElementIconUrl(r.element, r.icon);
          const pct = Math.round(Number(r.pct) || 0);
          const title = r.fromResist
            ? label +
              ': ' +
              pct +
              '% da defesa estimada (via resistência)'
            : label + ': ' + pct + '% do dano dos monstros';
          return (
            '<div class="gp-hunt-rec-def-item" title="' +
            escapeHtml(title) +
            '">' +
            (src
              ? '<img class="gp-hunt-rec-ico is-defesa" src="' +
                escapeHtml(src) +
                '" alt="' +
                escapeHtml(label) +
                '" loading="lazy">'
              : '') +
            '<span class="gp-hunt-rec-def-name">' +
            escapeHtml(label) +
            '</span>' +
            '<span class="gp-hunt-rec-def-pct">' +
            pct +
            '%</span>' +
            '</div>'
          );
        })
        .join('') +
      '</div>'
    );
  }

  function huntElementIconsHtml(items, kind, titleBuilder) {
    return items
      .map((r) => {
        const label = huntElementLabel(r.element);
        const src = huntElementIconUrl(r.element, r.icon);
        if (!src) return '';
        const title =
          typeof titleBuilder === 'function'
            ? titleBuilder(r, label, kind)
            : (() => {
                const avg = Math.round(r.avg);
                return (
                  label +
                  ': ' +
                  (avg > 0 ? '+' : '') +
                  avg +
                  '% (' +
                  kind +
                  ')'
                );
              })();
        return (
          '<img class="gp-hunt-rec-ico is-' +
          kind +
          '" src="' +
          escapeHtml(src) +
          '" alt="' +
          escapeHtml(label) +
          '" title="' +
          escapeHtml(title) +
          '" loading="lazy">'
        );
      })
      .join('');
  }

  function huntRecommendedElementsHtml(huntName) {
    const groups = getHuntElementGroups(huntName);
    const defense = getHuntDefenseElements(huntName);
    const hasAtk =
      groups.fraco.length || groups.neutro.length || groups.forte.length;
    if (!hasAtk && !defense.length) {
      return '<span class="gp-hunt-rec-empty">—</span>';
    }

    const row = (kind, label, items, titleBuilder) => {
      if (!items.length) return '';
      const icons = huntElementIconsHtml(items, kind, titleBuilder);
      if (!icons) return '';
      return (
        '<div class="gp-hunt-rec-row">' +
        '<span class="gp-hunt-rec-tag is-' +
        kind +
        '">' +
        label +
        ':</span>' +
        '<div class="gp-hunt-rec-icons">' +
        icons +
        '</div>' +
        '</div>'
      );
    };

    const atkBlock = hasAtk
      ? '<div class="gp-hunt-rec-block">' +
        '<div class="gp-hunt-rec-head is-atk">Ataque</div>' +
        row('fraco', 'Fraco', groups.fraco) +
        row('neutro', 'Neutro', groups.neutro) +
        row('forte', 'Forte', groups.forte) +
        '</div>'
      : '';

    const defList = defense.length ? huntDefenseElementsHtml(defense) : '';
    const defBlock = defList
      ? '<div class="gp-hunt-rec-block">' +
        '<div class="gp-hunt-rec-head is-def">Defesa</div>' +
        defList +
        '</div>'
      : '';

    return '<div class="gp-hunt-rec">' + atkBlock + defBlock + '</div>';
  }

  function huntPreviewsHtml(huntName) {
    const details = getHuntDetails(huntName);
    const creatures = Array.isArray(details?.creatures) ? details.creatures : [];
    if (!creatures.length) {
      return '<span class="gp-hunt-rec-empty">—</span>';
    }
    return (
      '<div class="gp-hunt-previews">' +
      creatures.map(huntCreaturePreviewHtml).join('') +
      '</div>'
    );
  }

  function huntSummaryRowHtml(hunt) {
    const lean = getHuntLean(hunt);
    return (
      '<div class="gp-hunt-row">' +
      '<div class="gp-hunt-col-info">' +
      '<div class="gp-hunt-item-name"></div>' +
      '<div class="gp-hunt-item-meta">' +
      '<span class="gp-hunt-item-lvl"></span>' +
      huntLeanBadgeHtml(lean) +
      '</div>' +
      '</div>' +
      '<div class="gp-hunt-col-mobs">' +
      huntPreviewsHtml(hunt.name) +
      '</div>' +
      '<div class="gp-hunt-col-rec">' +
      huntRecommendedElementsHtml(hunt.name) +
      '</div>' +
      '</div>'
    );
  }

  function updateHuntActiveLabel() {
    const el = $('#gpHuntActiveLabel');
    if (!el) return;
    if (selectedHunt && selectedHunt.name) {
      const lean = getHuntLean(selectedHunt);
      el.innerHTML =
        'Selecionada: <strong>' +
        escapeHtml(selectedHunt.name) +
        '</strong> · lvl ' +
        escapeHtml(String(selectedHunt.level || '—')) +
        (lean ? ' · ' + huntLeanBadgeHtml(lean) : '');
    } else {
      el.textContent = 'Nenhuma hunt selecionada.';
    }
  }

  function setHuntExpanded(open) {
    const root = document.getElementById(ROOT_ID);
    root?.classList.toggle('is-hunt-open', !!open);
  }

  function isHuntOpen() {
    const modal = $('#gpHuntModal');
    return !!(modal && modal.classList.contains('is-open'));
  }

  function closeHunt() {
    const modal = $('#gpHuntModal');
    const dialog = rootQueryDialog();
    if (dialog && !isAutoBossOpen() && !isCodexOpen()) dialog.style.overflow = '';
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.hidden = true;
    setHuntExpanded(false);
  }

  async function openHunt() {
    const modal = $('#gpHuntModal');
    if (!modal) return;
    closeAutoBoss();
    closeCodex();
    setSettingsOpen(false);
    const dialog = rootQueryDialog();
    if (dialog) dialog.style.overflow = 'hidden';
    modal.hidden = false;
    modal.classList.add('is-open');
    setHuntExpanded(true);
    renderHuntRanks();
    renderHuntList();
    void ensureHuntDetailsCatalogLoaded().then((ok) => {
      if (ok && isHuntOpen()) renderHuntList();
    });
  }

  function huntCreatureInitials(creature) {
    return String(creature?.name || '?')
      .split(/\s+/)
      .map((w) => w.charAt(0))
      .join('')
      .slice(0, 3)
      .toUpperCase();
  }

  function huntCreatureSpriteHtml(creature) {
    const initials = huntCreatureInitials(creature);
    if (creature?.sprite) {
      return (
        '<img class="gp-hunt-card-sprite" src="' +
        escapeHtml(creature.sprite) +
        '" alt="' +
        escapeHtml(creature.name) +
        '" loading="lazy">'
      );
    }
    return (
      '<div class="gp-hunt-card-sprite-ph" aria-hidden="true">' +
      escapeHtml(initials || '?') +
      '</div>'
    );
  }

  function huntCreaturePreviewHtml(creature) {
    const initials = huntCreatureInitials(creature);
    if (creature?.sprite) {
      return (
        '<img class="gp-hunt-preview" src="' +
        escapeHtml(creature.sprite) +
        '" alt="' +
        escapeHtml(creature.name) +
        '" title="' +
        escapeHtml(creature.name) +
        '" loading="lazy">'
      );
    }
    return (
      '<div class="gp-hunt-preview-ph" title="' +
      escapeHtml(creature?.name || '') +
      '" aria-hidden="true">' +
      escapeHtml(initials || '?') +
      '</div>'
    );
  }

  function huntCreatureLootHtml(creature) {
    const drops = creature?.drops || {};
    const all = []
      .concat(drops.common || [])
      .concat(drops.uncommon || [])
      .concat(drops.semiRare || [])
      .concat(drops.rare || [])
      .concat(drops.veryRare || []);
    if (!all.length) return '';
    const thumbs = all
      .map((it) => {
        const title = escapeHtml(it.name);
        const media = it.image
          ? '<img alt="' + title + '" src="' + escapeHtml(it.image) + '" loading="lazy">'
          : '<span class="gp-ab-item-name">' + title + '</span>';
        return '<div class="gp-ab-item" title="' + title + '">' + media + '</div>';
      })
      .join('');
    return (
      '<div class="gp-hunt-card-label">Loot</div>' +
      '<div class="gp-hunt-card-loot">' +
      thumbs +
      '</div>'
    );
  }

  function huntCreatureCardHtml(creature) {
    const resists = (creature.resistances || [])
      .map((r) => {
        const kindClass =
          r.kind === 'fraco' ? ' is-weak' : r.kind === 'resistente' ? ' is-resist' : '';
        return (
          '<div class="gp-hunt-card-res-item" title="' +
          escapeHtml(r.element + ': ' + formatResistValue(r) + ' (' + r.kind + ')') +
          '">' +
          (r.icon
            ? '<img src="' + escapeHtml(r.icon) + '" alt="' + escapeHtml(r.element) + '">'
            : '') +
          '<b class="' +
          kindClass.trim() +
          '">' +
          escapeHtml(formatResistValue(r)) +
          '</b>' +
          '</div>'
        );
      })
      .join('');

    return (
      '<div class="gp-hunt-card">' +
      huntCreatureSpriteHtml(creature) +
      '<div class="gp-hunt-card-name">' +
      escapeHtml(creature.name) +
      '</div>' +
      '<div class="gp-hunt-card-stats">' +
      '<div class="gp-hunt-card-stat"><span>HP</span><b>' +
      escapeHtml(formatBossHp(creature.hp)) +
      '</b></div>' +
      '<div class="gp-hunt-card-stat"><span>Exp</span><b>' +
      escapeHtml(formatBossHp(creature.exp)) +
      '</b></div>' +
      '</div>' +
      (resists
        ? '<div class="gp-hunt-card-label">Resistências</div><div class="gp-hunt-card-res">' +
          resists +
          '</div>'
        : '') +
      huntCreatureLootHtml(creature) +
      '</div>'
    );
  }

  function appendHuntCreatures(item, huntName) {
    const details = getHuntDetails(huntName);
    const creatures = Array.isArray(details?.creatures) ? details.creatures : [];
    if (!creatures.length) return;

    const wrap = document.createElement('div');
    wrap.className = 'gp-hunt-cards';
    wrap.addEventListener('click', (ev) => ev.stopPropagation());
    wrap.innerHTML = creatures.map(huntCreatureCardHtml).join('');
    item.appendChild(wrap);
  }

  function renderHuntRanks() {
    const box = $('#gpHuntRanks');
    if (!box) return;
    box.innerHTML = '';
    for (const rank of getHuntRanks()) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gp-hunt-rank' + (rank.id === currentHuntRankId ? ' is-on' : '');
      btn.textContent = rank.label;
      btn.addEventListener('click', async () => {
        currentHuntRankId = rank.id;
        expandedHuntName = '';
        huntCodexOpenName = '';
        await chrome.storage.local.set({ [STORAGE_KEY_HUNT_RANK]: rank.id });
        renderHuntRanks();
        renderHuntList();
      });
      box.appendChild(btn);
    }
  }

  function renderHuntList() {
    const box = $('#gpHuntList');
    if (!box) return;
    box.innerHTML = '';

    const hunts = huntsForRank(currentHuntRankId);

    if (!hunts.length) {
      box.innerHTML = '<div style="font-size:12px;color:var(--gp-muted)">Nenhuma hunt neste rank.</div>';
      return;
    }

    for (const hunt of hunts) {
      const isSaved = !!(selectedHunt && selectedHunt.name === hunt.name);
      const isExpanded = expandedHuntName === hunt.name;
      const item = document.createElement('div');
      item.className =
        'gp-hunt-item' +
        (isSaved ? ' is-active' : '') +
        (isExpanded ? ' is-expanded' : '');
      item.innerHTML = huntSummaryRowHtml(hunt);
      item.querySelector('.gp-hunt-item-name').textContent = hunt.name;
      item.querySelector('.gp-hunt-item-lvl').textContent = 'lvl ' + hunt.level;

      item.addEventListener('click', (ev) => {
        if (ev.target.closest('.gp-btn-activate')) return;
        if (ev.target.closest('.gp-btn-codex')) return;
        if (ev.target.closest('.gp-hunt-cards')) return;
        if (ev.target.closest('.gp-hunt-codex-panel')) return;
        const wasExpanded = expandedHuntName === hunt.name;
        expandedHuntName = wasExpanded ? '' : hunt.name;
        if (!expandedHuntName) huntCodexOpenName = '';
        else if (huntCodexOpenName && huntCodexOpenName !== hunt.name) {
          huntCodexOpenName = '';
        }
        if (expandedHuntName) {
          void ensureHuntDetailsCatalogLoaded().then(() => renderHuntList());
        }
        renderHuntList();
      });

      if (isExpanded) {
        const actions = document.createElement('div');
        actions.className = 'gp-hunt-actions';
        actions.addEventListener('click', (ev) => ev.stopPropagation());

        const codexBtn = document.createElement('button');
        codexBtn.type = 'button';
        codexBtn.className =
          'gp-btn-codex' + (huntCodexOpenName === hunt.name ? ' is-on' : '');
        codexBtn.textContent = 'Codex';
        codexBtn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          const opening = huntCodexOpenName !== hunt.name;
          huntCodexOpenName = opening ? hunt.name : '';
          if (opening) {
            void Promise.all([
              ensureHuntDetailsCatalogLoaded(),
              ensureCodexCatalogLoaded(),
              loadCodexPlaylist()
            ]).then(() => {
              if (isHuntOpen() && expandedHuntName === hunt.name) renderHuntList();
            });
          }
          renderHuntList();
        });
        actions.appendChild(codexBtn);

        const btn = document.createElement('button');
        btn.type = 'button';
        if (isSaved) {
          btn.className = 'gp-btn-activate btn-go-hunt';
          btn.textContent = 'Ir para a hunt';
          btn.addEventListener('click', async (ev) => {
            ev.stopPropagation();
            try {
              const auth = await syncAuth();
              if (!applyAuthUi(auth)) throw new Error('Faça login em tibiabot.online.');
              if (auth.extensionOutdated) {
                throw new Error(auth.versionMessage || 'Atualize a extensão.');
              }
              setStatus('Indo para ' + hunt.name + '…', 'ok');
              const response = await chrome.runtime.sendMessage({
                type: 'BAIAKIDLE_GO_HUNT',
                huntName: hunt.name
              });
              if (!response?.success) {
                throw new Error(response?.error || 'Falha ao ir para a hunt.');
              }
              setStatus('Navegando até ' + hunt.name + ' no jogo.', 'ok');
            } catch (error) {
              console.error('[Tibia Bot game-panel]', error);
              setStatus(error.message || 'Erro ao ir para a hunt.', 'err');
            }
          });
        } else {
          btn.className = 'gp-btn-activate';
          btn.textContent = 'Ativar';
          btn.addEventListener('click', async (ev) => {
            ev.stopPropagation();
            selectedHunt = {
              name: hunt.name,
              level: hunt.level,
              lean: getHuntLean(hunt) || undefined
            };
            expandedHuntName = hunt.name;
            await chrome.storage.local.set({ [STORAGE_KEY_SELECTED_HUNT]: selectedHunt });
            updateHuntActiveLabel();
            renderHuntList();
            setStatus('Hunt salva: ' + hunt.name + ' (lvl ' + hunt.level + ').', 'ok');
          });
        }
        actions.appendChild(btn);
        item.appendChild(actions);
        appendHuntCreatures(item, hunt.name);
        if (huntCodexOpenName === hunt.name) {
          appendHuntCodexPanel(item, hunt.name);
        }
      }

      box.appendChild(item);
    }
  }

  async function initHuntPicker() {
    const data = await chrome.storage.local.get([
      STORAGE_KEY_SELECTED_HUNT,
      STORAGE_KEY_HUNT_RANK
    ]);
    selectedHunt = data[STORAGE_KEY_SELECTED_HUNT] || null;
    currentHuntRankId = data[STORAGE_KEY_HUNT_RANK] || 'todas';
    expandedHuntName = '';
    huntCodexOpenName = '';
    if (!getHuntRanks().some((r) => r.id === currentHuntRankId)) {
      currentHuntRankId = 'todas';
    }
    updateHuntActiveLabel();
    if (isHuntOpen()) {
      renderHuntRanks();
      renderHuntList();
    }
  }

  function getCodexList() {
    return Array.isArray(window.BAIAK_IDLE_CODEX) ? window.BAIAK_IDLE_CODEX : [];
  }

  async function ensureCodexCatalogLoaded() {
    if (getCodexList().length) return true;
    if (codexEnsurePromise) return codexEnsurePromise;

    codexEnsurePromise = (async () => {
      const response = await chrome.runtime.sendMessage({
        type: 'BAIAKIDLE_ENSURE_CODEX'
      });
      if (!response?.success) {
        throw new Error(response?.error || 'Falha ao carregar o Codex.');
      }
      return true;
    })()
      .catch((err) => {
        console.warn('[Tibia Bot] catálogo do Codex:', err);
        return false;
      })
      .finally(() => {
        codexEnsurePromise = null;
      });

    return codexEnsurePromise;
  }

  function findHuntByName(name) {
    const key = String(name || '')
      .trim()
      .toLowerCase();
    if (!key) return null;
    return (
      getHuntList().find((h) => String(h.name || '').toLowerCase() === key) || null
    );
  }

  function getCodexLevel(entry) {
    const hunt = findHuntByName(entry?.huntName);
    const lvl = Number(hunt && hunt.level);
    return Number.isFinite(lvl) && lvl > 0 ? lvl : 0;
  }

  function getHuntLootObjectIds(huntName) {
    const details = getHuntDetails(huntName);
    const ids = new Set();
    for (const creature of details?.creatures || []) {
      for (const tier of ['common', 'uncommon', 'semiRare', 'rare', 'veryRare']) {
        for (const drop of creature.drops?.[tier] || []) {
          const objectId = Number(drop?.objectId);
          if (Number.isFinite(objectId) && objectId > 0) ids.add(objectId);
        }
      }
    }
    return ids;
  }

  function getCodexMatchesForHuntLoot(huntName) {
    const lootIds = getHuntLootObjectIds(huntName);
    const huntKey = String(huntName || '')
      .trim()
      .toLowerCase();
    const matches = [];

    for (const entry of getCodexList()) {
      const items = Array.isArray(entry.items) ? entry.items : [];
      if (!items.length) continue;

      const matchedItems = items.map((item) => ({
        ...item,
        inLoot: lootIds.has(Number(item.objectId))
      }));
      const farmable = matchedItems.filter((item) => item.inLoot).length;
      if (!farmable) continue;

      matches.push({
        entry,
        items: matchedItems,
        farmable,
        total: items.length,
        isOwnHunt:
          String(entry.huntName || '')
            .trim()
            .toLowerCase() === huntKey,
        completeHere: farmable === items.length
      });
    }

    matches.sort((a, b) => {
      if (a.isOwnHunt !== b.isOwnHunt) return a.isOwnHunt ? -1 : 1;
      if (a.completeHere !== b.completeHere) return a.completeHere ? -1 : 1;
      const ratioA = a.farmable / a.total;
      const ratioB = b.farmable / b.total;
      if (ratioB !== ratioA) return ratioB - ratioA;
      return getCodexLevel(a.entry) - getCodexLevel(b.entry);
    });

    return matches;
  }

  function huntCodexTileHtml(item) {
    const title =
      escapeHtml(item.name || '') +
      ' · ' +
      formatCodexQty(item.qty) +
      (item.inLoot ? ' · dropa aqui' : ' · não dropa aqui');
    return (
      '<div class="gp-cx-tile' +
      (item.inLoot ? ' is-in-loot' : ' is-missing') +
      '" title="' +
      title +
      '">' +
      '<div class="gp-cx-tile-box">' +
      '<img src="' +
      escapeHtml(codexItemIconUrl(item.objectId)) +
      '" alt="' +
      escapeHtml(item.name || '') +
      '" loading="lazy">' +
      '</div>' +
      '<span class="gp-cx-tile-n">' +
      formatCodexQty(item.qty) +
      '</span>' +
      '</div>'
    );
  }

  function appendHuntCodexPanel(item, huntName) {
    const panel = document.createElement('div');
    panel.className = 'gp-hunt-codex-panel';
    panel.addEventListener('click', (ev) => ev.stopPropagation());

    if (!getCodexList().length) {
      panel.innerHTML =
        '<div style="font-size:12px;color:var(--gp-muted)">Carregando catálogo do Codex…</div>';
      item.appendChild(panel);
      return;
    }

    const matches = getCodexMatchesForHuntLoot(huntName);
    const lootCount = getHuntLootObjectIds(huntName).size;

    if (!lootCount) {
      panel.innerHTML =
        '<div style="font-size:12px;color:var(--gp-muted)">Loot da hunt ainda não carregado.</div>';
      item.appendChild(panel);
      return;
    }

    if (!matches.length) {
      panel.innerHTML =
        '<div style="font-size:12px;color:var(--gp-muted)">Nenhum item de Codex dropa nesta hunt.</div>';
      item.appendChild(panel);
      return;
    }

    const head = document.createElement('div');
    head.className = 'gp-hunt-codex-head';
    head.innerHTML =
      '<span><b>' +
      escapeHtml(String(matches.length)) +
      '</b> Codex com loot aqui</span>' +
      '<span>' +
      escapeHtml(String(lootCount)) +
      ' itens catalogados na hunt</span>';

    const list = document.createElement('div');
    list.className = 'gp-hunt-codex-list';

    for (const match of matches) {
      const entry = match.entry;
      const lvl = getCodexLevel(entry);
      const huntLabel = String(entry.huntName || entry.category || '').trim();
      const farmClass =
        'gp-hunt-codex-farm' + (match.completeHere ? '' : ' is-partial');
      const farmLabel = match.completeHere
        ? 'Completo aqui'
        : match.farmable + '/' + match.total + ' itens aqui';
      const picked = isCodexInPlaylist(entry.id);

      const row = document.createElement('div');
      row.className =
        'gp-cx-item gp-hunt-codex-item' +
        (match.isOwnHunt ? ' is-own' : '') +
        (picked ? ' is-picked' : '');
      row.innerHTML =
        '<div class="gp-cx-head">' +
        '<div>' +
        '<div class="gp-cx-name">' +
        escapeHtml(entry.name || '') +
        '</div>' +
        '<div class="gp-cx-meta">' +
        '<span>#' +
        escapeHtml(String(entry.id || '')) +
        '</span>' +
        '<span class="gp-cx-lvl">' +
        (lvl ? 'lvl ' + lvl : 'lvl —') +
        '</span>' +
        (huntLabel ? '<span>' + escapeHtml(huntLabel) + '</span>' : '') +
        (match.isOwnHunt ? '<span>Codex desta hunt</span>' : '') +
        '</div>' +
        '</div>' +
        '<div class="gp-cx-bonus">' +
        escapeHtml(entry.bonus || '') +
        '</div>' +
        '</div>' +
        '<div class="gp-cx-tiles">' +
        match.items.map(huntCodexTileHtml).join('') +
        '</div>' +
        '<div class="' +
        farmClass +
        '">' +
        escapeHtml(farmLabel) +
        '</div>';

      const actions = document.createElement('div');
      actions.className = 'gp-cx-actions';
      const pickBtn = document.createElement('button');
      pickBtn.type = 'button';
      const atMax = !picked && codexPlaylist.length >= CODEX_PLAYLIST_MAX;
      pickBtn.className = 'gp-cx-pick-btn ' + (picked ? 'is-remove' : 'is-add');
      pickBtn.disabled = atMax;
      pickBtn.textContent = picked
        ? 'Remover (' + codexPlaylist.length + '/' + CODEX_PLAYLIST_MAX + ')'
        : atMax
          ? 'Lista cheia (' + CODEX_PLAYLIST_MAX + ')'
          : 'Marcar (' + codexPlaylist.length + '/' + CODEX_PLAYLIST_MAX + ')';
      pickBtn.title = atMax
        ? 'Limite de ' + CODEX_PLAYLIST_MAX + ' Codex selecionados'
        : picked
          ? 'Remover da lista'
          : 'Adicionar à lista';
      pickBtn.addEventListener('click', async (ev) => {
        ev.stopPropagation();
        try {
          const added = await toggleCodexInPlaylist(entry);
          renderHuntList();
          setStatus(
            added
              ? 'Codex marcado: ' + (entry.name || '#' + entry.id)
              : 'Codex removido da lista.',
            'ok'
          );
        } catch (error) {
          setStatus(error.message || 'Não foi possível marcar o Codex.', 'err');
        }
      });
      actions.appendChild(pickBtn);
      row.appendChild(actions);

      list.appendChild(row);
    }

    panel.appendChild(head);
    panel.appendChild(list);
    item.appendChild(panel);
  }

  function formatCodexQty(qty) {
    return Number(qty || 0).toLocaleString('pt-BR');
  }

  function codexItemIconUrl(objectId) {
    return 'https://baiakidle.com/api/things/object/' + Number(objectId) + '.png';
  }

  function normalizeCodexPlaylist(raw) {
    const out = [];
    const seen = new Set();
    const list = Array.isArray(raw) ? raw : [];
    for (const entry of list) {
      if (!entry || typeof entry !== 'object') continue;
      const id = Number(entry.id);
      if (!Number.isFinite(id) || id <= 0 || seen.has(id)) continue;
      seen.add(id);
      const items = Array.isArray(entry.items)
        ? entry.items
            .map((it) => ({
              name: String(it?.name || ''),
              objectId: Number(it?.objectId) || 0,
              qty: Number(it?.qty) || 0
            }))
            .filter((it) => it.objectId > 0 || it.name)
        : [];
      out.push({
        id,
        name: String(entry.name || '#' + id),
        huntName: String(entry.huntName || ''),
        slug: String(entry.slug || ''),
        items
      });
      if (out.length >= CODEX_PLAYLIST_MAX) break;
    }
    return out;
  }

  function enrichCodexPlaylistEntry(entry) {
    const base = {
      id: Number(entry?.id) || 0,
      name: String(entry?.name || ''),
      huntName: String(entry?.huntName || ''),
      slug: String(entry?.slug || ''),
      items: Array.isArray(entry?.items) ? entry.items.slice() : []
    };
    const full = findCodexById(base.id);
    if (full) {
      if (full.name) base.name = String(full.name);
      if (full.huntName != null) base.huntName = String(full.huntName || '');
      if (full.slug) base.slug = String(full.slug);
      if (Array.isArray(full.items) && full.items.length) {
        base.items = full.items.map((it) => ({
          name: String(it?.name || ''),
          objectId: Number(it?.objectId) || 0,
          qty: Number(it?.qty) || 0
        }));
      }
    }
    return base;
  }

  function isCodexInPlaylist(codexId) {
    const id = Number(codexId);
    return codexPlaylist.some((e) => Number(e.id) === id);
  }

  function syncCodexTabsUi() {
    const tabs = $('#gpCodexTabs');
    if (tabs) {
      tabs.querySelectorAll('.gp-cx-tab[data-cx-tab]').forEach((btn) => {
        const tab = btn.getAttribute('data-cx-tab');
        btn.classList.toggle('is-on', tab === currentCodexTab);
      });
    }
    const countEl = $('#gpCodexSelectedCount');
    if (countEl) {
      const n = codexPlaylist.length;
      countEl.textContent = n ? ' · ' + n + '/' + CODEX_PLAYLIST_MAX : '';
    }
    const ranks = $('#gpCodexRanks');
    if (ranks) ranks.hidden = currentCodexTab === 'selected';
  }

  async function loadCodexPlaylist() {
    try {
      const data = await chrome.storage.local.get(STORAGE_KEY_CODEX_PLAYLIST);
      codexPlaylist = normalizeCodexPlaylist(data[STORAGE_KEY_CODEX_PLAYLIST]).map(
        enrichCodexPlaylistEntry
      );
      // Regrava se o catálogo trouxe itens que ainda não estavam na storage.
      const prev = JSON.stringify(data[STORAGE_KEY_CODEX_PLAYLIST] || []);
      const next = JSON.stringify(codexPlaylist);
      if (prev !== next && codexPlaylist.length) {
        await chrome.storage.local.set({
          [STORAGE_KEY_CODEX_PLAYLIST]: codexPlaylist
        });
      }
    } catch (_) {
      codexPlaylist = [];
    }
    syncCodexTabsUi();
    return codexPlaylist;
  }

  function syncCodexEnableUi() {
    const toggle = $('#gpCodexEnabledToggle');
    const bar = $('#gpCodexEnableBar');
    const hint = $('#gpCodexEnableHint');
    if (toggle) {
      toggle.checked = !!codexEnabled;
      toggle.disabled = !isVipAuth(lastAuth) || !!lastAuth.extensionOutdated;
    }
    if (bar) bar.classList.toggle('is-off', !codexEnabled);
    if (hint) {
      hint.textContent = codexEnabled
        ? 'Entrega antes da venda'
        : 'Desativado — nenhuma entrega automática';
    }
  }

  async function loadCodexEnabled() {
    try {
      const data = await chrome.storage.local.get(STORAGE_KEY_CODEX_ENABLED);
      // Ausente = ligado (compatível com quem já usa playlist).
      codexEnabled = data[STORAGE_KEY_CODEX_ENABLED] !== false;
    } catch (_) {
      codexEnabled = true;
    }
    syncCodexEnableUi();
    return codexEnabled;
  }

  async function applyCodexEnabledToggle(enabled) {
    const toggle = $('#gpCodexEnabledToggle');
    try {
      if (toggle) toggle.disabled = true;
      const auth = await syncAuth();
      if (!applyAuthUi(auth)) throw new Error('Faça login em tibiabot.online.');
      if (!isVipAuth(auth)) {
        throw new Error('VIP necessária. Ative um voucher ou compre o plano em Minha conta.');
      }
      if (auth.extensionOutdated) {
        throw new Error(auth.versionMessage || 'Atualize a extensão.');
      }
      codexEnabled = !!enabled;
      await chrome.storage.local.set({
        [STORAGE_KEY_CODEX_ENABLED]: codexEnabled
      });
      syncCodexEnableUi();
      setStatus(
        codexEnabled
          ? 'Codex automático ligado (entrega antes da venda).'
          : 'Codex automático desligado — nenhuma entrega.',
        'ok'
      );
    } catch (error) {
      if (toggle) toggle.checked = !enabled;
      syncCodexEnableUi();
      setStatus(error.message || 'Erro ao alterar Codex automático.', 'err');
    } finally {
      if (toggle) {
        toggle.disabled = !isVipAuth(lastAuth) || !!lastAuth.extensionOutdated;
      }
    }
  }

  function syncCodexOverlayBtn() {
    const btn = $('#gpCodexOverlayBtn');
    if (!btn) return;
    btn.classList.toggle('is-on', !!codexOverlayEnabled);
    btn.textContent = codexOverlayEnabled ? 'Desativar overlay' : 'Ativar overlay';
  }

  async function loadCodexOverlayEnabled() {
    try {
      const data = await chrome.storage.local.get([
        STORAGE_KEY_CODEX_OVERLAY,
        STORAGE_KEY_CODEX_OVERLAY_POS
      ]);
      codexOverlayEnabled = !!data[STORAGE_KEY_CODEX_OVERLAY];
      const raw = data[STORAGE_KEY_CODEX_OVERLAY_POS];
      if (raw && typeof raw === 'object') {
        const left = Number(raw.left);
        const top = Number(raw.top);
        if (Number.isFinite(left) && Number.isFinite(top)) {
          codexOverlayPos = { left, top };
        }
      }
    } catch (_) {
      codexOverlayEnabled = false;
    }
    syncCodexOverlayBtn();
    syncCodexStatusOverlay();
    return codexOverlayEnabled;
  }

  async function applyCodexOverlayToggle(enabled) {
    try {
      const auth = await syncAuth();
      if (!applyAuthUi(auth)) throw new Error('Faça login em tibiabot.online.');
      if (!isVipAuth(auth)) {
        throw new Error('VIP necessária. Ative um voucher ou compre o plano em Minha conta.');
      }
      if (auth.extensionOutdated) {
        throw new Error(auth.versionMessage || 'Atualize a extensão.');
      }
      codexOverlayEnabled = !!enabled;
      await chrome.storage.local.set({
        [STORAGE_KEY_CODEX_OVERLAY]: codexOverlayEnabled
      });
      syncCodexOverlayBtn();
      syncCodexStatusOverlay();
      setStatus(
        codexOverlayEnabled
          ? 'Overlay do Codex ligado.'
          : 'Overlay do Codex desligado.',
        'ok'
      );
    } catch (error) {
      syncCodexOverlayBtn();
      setStatus(error.message || 'Erro ao alterar overlay do Codex.', 'err');
    }
  }

  function readActiveWaveHuntName() {
    try {
      const el =
        document.querySelector('#wave-title') ||
        document.querySelector('span#wave-title.pill');
      const text = String(el?.textContent || '')
        .replace(/\s+/g, ' ')
        .trim();
      if (!text) return '';
      if (/^(cidade|treino)/i.test(text)) return '';
      return text;
    } catch (_) {
      return '';
    }
  }

  function resolveCodexOverlayHuntName() {
    return readActiveWaveHuntName() || String(selectedHunt?.name || '').trim();
  }

  function loadCodexItemDoneMap() {
    try {
      const raw = sessionStorage.getItem(CODEX_ITEM_DONE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function normalizeCodexItemKeyName(name) {
    return String(name || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function isCodexItemMarkedDone(doneMap, entryId, item) {
    return !!getCodexItemDoneInfo(doneMap, entryId, item)?.done;
  }

  function getCodexItemDoneInfo(doneMap, entryId, item) {
    const map = doneMap?.[String(entryId)];
    if (!map || typeof map !== 'object') return null;
    const keys = [];
    const oid = Number(item?.objectId);
    if (Number.isFinite(oid) && oid > 0) keys.push('id:' + oid);
    const nm = normalizeCodexItemKeyName(item?.name);
    if (nm) keys.push('nm:' + nm);
    for (const k of keys) {
      const val = map[k];
      if (val === true) return { done: true };
      if (val && typeof val === 'object') {
        const need = Number(val.need);
        const cur = Number(val.cur);
        return {
          done: val.done !== false,
          cur: Number.isFinite(cur) ? cur : undefined,
          need: Number.isFinite(need) && need > 0 ? need : undefined
        };
      }
    }
    return null;
  }

  /** Progresso live das tiles do Codex do jogo, indexado por entryId. */
  function readGameCodexProgressById() {
    /** @type {Record<string, Record<string, {cur:number,need:number,done:boolean}>>} */
    const byEntry = {};
    try {
      const entries = document.querySelectorAll('#codex-list .cx-entry, .cx-list .cx-entry');
      for (const entryEl of entries) {
        const numEl = entryEl.querySelector('.cx-entry-num');
        const id = String(numEl?.textContent || '').replace(/[^\d]/g, '');
        if (!id) continue;
        const tileMap = {};
        entryEl.querySelectorAll('.cx-tile').forEach((tile) => {
          const raw = String(tile.querySelector('.cx-tile-n')?.textContent || '')
            .replace(/\s+/g, ' ')
            .trim();
          const m = raw.match(/(\d+)\s*\/\s*(\d+)/);
          if (!m) return;
          const cur = Number(m[1]);
          const need = Number(m[2]);
          if (!Number.isFinite(cur) || !Number.isFinite(need) || need <= 0) return;
          const src = String(
            tile.querySelector('img.cx-ico, img[src*="/object/"]')?.getAttribute?.('src') ||
              ''
          );
          const oidMatch = src.match(/\/object\/(\d+)/i);
          const oid = oidMatch ? Number(oidMatch[1]) : 0;
          if (!Number.isFinite(oid) || oid <= 0) return;
          tileMap['id:' + oid] = { cur, need, done: cur >= need };
        });
        byEntry[id] = tileMap;
      }
    } catch (_) {}
    return byEntry;
  }

  function destroyCodexStatusOverlay() {
    if (codexOverlayTimer) {
      clearInterval(codexOverlayTimer);
      codexOverlayTimer = null;
    }
    codexOverlayDragBound = false;
    try {
      document.getElementById(CODEX_STATUS_OVERLAY_ID)?.remove();
    } catch (_) {}
  }

  function applyCodexOverlayPosition(el, left, top) {
    if (!el) return { left: 16, top: 16 };
    const rect = el.getBoundingClientRect();
    const maxLeft = Math.max(8, window.innerWidth - rect.width - 8);
    const maxTop = Math.max(8, window.innerHeight - rect.height - 8);
    const nextLeft = Math.min(maxLeft, Math.max(8, Number(left) || 16));
    const nextTop = Math.min(maxTop, Math.max(8, Number(top) || 16));
    el.style.left = nextLeft + 'px';
    el.style.top = nextTop + 'px';
    el.style.right = 'auto';
    return { left: nextLeft, top: nextTop };
  }

  async function saveCodexOverlayPosition(left, top) {
    const pos = applyCodexOverlayPosition(
      document.getElementById(CODEX_STATUS_OVERLAY_ID),
      left,
      top
    );
    codexOverlayPos = pos;
    try {
      await chrome.storage.local.set({ [STORAGE_KEY_CODEX_OVERLAY_POS]: pos });
    } catch (_) {}
  }

  async function loadCodexOverlayPosition() {
    try {
      const data = await chrome.storage.local.get(STORAGE_KEY_CODEX_OVERLAY_POS);
      const raw = data[STORAGE_KEY_CODEX_OVERLAY_POS];
      if (raw && typeof raw === 'object') {
        const left = Number(raw.left);
        const top = Number(raw.top);
        if (Number.isFinite(left) && Number.isFinite(top)) {
          codexOverlayPos = { left, top };
          return codexOverlayPos;
        }
      }
    } catch (_) {}
    codexOverlayPos = null;
    return null;
  }

  function bindCodexOverlayDrag(el) {
    if (!el || el.dataset.cxOvDragBound === '1') return;
    el.dataset.cxOvDragBound = '1';
    codexOverlayDragBound = true;

    const handle = el.querySelector('[data-role="cx-ov-drag"]') || el;
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let originLeft = 0;
    let originTop = 0;

    const onMove = (event) => {
      if (!dragging) return;
      const point = event.touches ? event.touches[0] : event;
      if (!point) return;
      if (event.cancelable) event.preventDefault();
      applyCodexOverlayPosition(
        el,
        originLeft + (point.clientX - startX),
        originTop + (point.clientY - startY)
      );
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      el.style.opacity = '1';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onUp);
      const left = parseFloat(el.style.left) || 16;
      const top = parseFloat(el.style.top) || 16;
      void saveCodexOverlayPosition(left, top);
    };

    const onDown = (event) => {
      if (event.target?.closest?.('[data-role="cx-ov-close"]')) return;
      const point = event.touches ? event.touches[0] : event;
      if (!point) return;
      if (event.type === 'mousedown' && event.button !== 0) return;

      dragging = true;
      startX = point.clientX;
      startY = point.clientY;
      // Se ainda estiver com right:, converte para left/top antes de arrastar.
      if (!el.style.left || el.style.right !== 'auto') {
        const rect = el.getBoundingClientRect();
        applyCodexOverlayPosition(el, rect.left, rect.top);
      }
      originLeft = parseFloat(el.style.left) || el.getBoundingClientRect().left;
      originTop = parseFloat(el.style.top) || el.getBoundingClientRect().top;
      el.style.opacity = '0.92';

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      document.addEventListener('touchmove', onMove, { passive: false });
      document.addEventListener('touchend', onUp);
    };

    handle.addEventListener('mousedown', onDown);
    handle.addEventListener('touchstart', onDown, { passive: true });
  }

  function ensureCodexStatusOverlay() {
    let el = document.getElementById(CODEX_STATUS_OVERLAY_ID);
    if (el) {
      bindCodexOverlayDrag(el);
      return el;
    }
    el = document.createElement('div');
    el.id = CODEX_STATUS_OVERLAY_ID;
    el.setAttribute('data-tibia-bot', 'codex-status-overlay');
    el.style.cssText = [
      'position:fixed',
      'top:16px',
      'right:16px',
      'z-index:2147483646',
      'width:min(340px, calc(100vw - 24px))',
      'max-height:calc(100vh - 32px)',
      'display:flex',
      'flex-direction:column',
      'padding:12px 14px',
      'border-radius:12px',
      'background:rgba(12,18,25,0.94)',
      'border:1px solid rgba(212,162,76,0.55)',
      'box-shadow:0 12px 28px rgba(0,0,0,0.4)',
      'color:#e8eef6',
      'font:600 12px/1.4 Segoe UI, Tahoma, sans-serif',
      'pointer-events:auto',
      'overflow:hidden',
      'box-sizing:border-box'
    ].join(';');
    el.innerHTML =
      '<div data-role="cx-ov-drag" title="Arraste para mover" style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;flex:0 0 auto;cursor:grab;">' +
      '<div style="font-weight:800;color:#ecc874;">Codex status</div>' +
      '<div style="display:flex;align-items:center;gap:8px;">' +
      '<div style="font-size:11px;color:#93a4b8;letter-spacing:.12em;">⋮⋮</div>' +
      '<button type="button" data-role="cx-ov-close" style="border:1px solid rgba(148,163,184,.45);background:#152030;color:#e8eef6;border-radius:8px;width:28px;height:28px;cursor:pointer;font-weight:700;">×</button>' +
      '</div></div>' +
      '<div data-role="cx-ov-hunt" style="font-size:11px;color:#93a4b8;margin-bottom:8px;"></div>' +
      '<div data-role="cx-ov-legend" style="display:flex;flex-wrap:wrap;gap:8px;font-size:10px;color:#93a4b8;margin-bottom:10px;">' +
      '<span><i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#3dba7a;margin-right:4px;"></i>completo</span>' +
      '<span><i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#e0b35a;margin-right:4px;"></i>entregando</span>' +
      '<span><i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#e53935;margin-right:4px;"></i>fora da hunt</span>' +
      '</div>' +
      '<div data-role="cx-ov-body" style="flex:1 1 auto;min-height:0;overflow:auto;display:flex;flex-direction:column;gap:10px;"></div>';
    (document.documentElement || document.body).appendChild(el);
    el.querySelector('[data-role="cx-ov-close"]')?.addEventListener('click', (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      void applyCodexOverlayToggle(false);
    });
    if (codexOverlayPos) {
      applyCodexOverlayPosition(el, codexOverlayPos.left, codexOverlayPos.top);
    } else {
      void loadCodexOverlayPosition().then((pos) => {
        const node = document.getElementById(CODEX_STATUS_OVERLAY_ID);
        if (node && pos) applyCodexOverlayPosition(node, pos.left, pos.top);
      });
    }
    bindCodexOverlayDrag(el);
    return el;
  }

  function renderCodexStatusOverlay() {
    if (!codexOverlayEnabled) {
      destroyCodexStatusOverlay();
      return;
    }
    const el = ensureCodexStatusOverlay();
    const huntName = resolveCodexOverlayHuntName();
    const huntEl = el.querySelector('[data-role="cx-ov-hunt"]');
    if (huntEl) {
      huntEl.textContent = huntName
        ? 'Hunt ativa: ' + huntName
        : 'Hunt ativa: (não detectada — use o teleporte / hunt salva)';
    }

    const body = el.querySelector('[data-role="cx-ov-body"]');
    if (!body) return;

    const list = Array.isArray(codexPlaylist) ? codexPlaylist : [];
    if (!list.length) {
      body.innerHTML =
        '<div style="font-size:12px;color:#93a4b8;">Nenhum Codex selecionado.</div>';
      return;
    }

    void ensureHuntDetailsCatalogLoaded().catch(() => {});
    const lootIds = huntName ? getHuntLootObjectIds(huntName) : new Set();
    const hasLootData = lootIds.size > 0;
    const doneMap = loadCodexItemDoneMap();
    const liveProgress = readGameCodexProgressById();

    body.innerHTML = list
      .map((entry) => {
        const items = Array.isArray(entry.items) ? entry.items : [];
        let doneCount = 0;
        const tiles = items
          .map((it) => {
            const oid = Number(it.objectId) || 0;
            const live = liveProgress[String(entry.id)]?.['id:' + oid];
            const markedInfo = getCodexItemDoneInfo(doneMap, entry.id, it);
            const complete = !!(live?.done || markedInfo?.done);
            if (complete) doneCount += 1;
            const inLoot = !hasLootData || (oid > 0 && lootIds.has(oid));
            let state = 'delivering';
            let border = '#e0b35a';
            let titleExtra = 'entregando';
            if (complete) {
              state = 'done';
              border = '#3dba7a';
              titleExtra = 'completo';
            } else if (hasLootData && !inLoot) {
              state = 'missing';
              border = '#e53935';
              titleExtra = 'não cai na hunt ativa';
            }
            const needFallback = Number(it.qty) || 0;
            let prog = '';
            if (live) {
              prog = live.cur + ' / ' + live.need;
            } else if (markedInfo?.need) {
              prog =
                (Number.isFinite(markedInfo.cur) ? markedInfo.cur : markedInfo.need) +
                ' / ' +
                markedInfo.need;
            } else if (complete && needFallback > 0) {
              prog = needFallback + ' / ' + needFallback;
            } else if (needFallback > 0) {
              prog = '0 / ' + needFallback;
            }
            return (
              '<div title="' +
              escapeHtml((it.name || '#' + oid) + ' · ' + titleExtra + (prog ? ' · ' + prog : '')) +
              '" data-state="' +
              state +
              '" style="width:36px;text-align:center;">' +
              '<div style="width:34px;height:34px;border-radius:8px;border:2px solid ' +
              border +
              ';background:rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;overflow:hidden;">' +
              (oid
                ? '<img src="' +
                  escapeHtml(codexItemIconUrl(oid)) +
                  '" alt="" width="28" height="28" loading="lazy" style="display:block;">'
                : '') +
              '</div>' +
              (prog
                ? '<div style="font-size:9px;margin-top:2px;color:#93a4b8;">' +
                  escapeHtml(prog) +
                  '</div>'
                : '') +
              '</div>'
            );
          })
          .join('');

        const total = items.length || 0;
        return (
          '<div style="border:1px solid rgba(148,163,184,.28);border-radius:10px;padding:8px 10px;background:rgba(20,28,39,.85);">' +
          '<div style="display:flex;justify-content:space-between;gap:8px;margin-bottom:8px;">' +
          '<div style="font-weight:700;color:#e8eef6;">#' +
          escapeHtml(String(entry.id)) +
          ' ' +
          escapeHtml(entry.name || '') +
          '</div>' +
          '<div style="font-weight:800;color:#ecc874;white-space:nowrap;">' +
          doneCount +
          '/' +
          total +
          '</div>' +
          '</div>' +
          (entry.huntName
            ? '<div style="font-size:10px;color:#93a4b8;margin-bottom:6px;">' +
              escapeHtml(entry.huntName) +
              '</div>'
            : '') +
          '<div style="display:flex;flex-wrap:wrap;gap:6px;">' +
          (tiles ||
            '<span style="font-size:11px;color:#93a4b8;">Sem itens</span>') +
          '</div></div>'
        );
      })
      .join('');
  }

  function syncCodexStatusOverlay() {
    if (!codexOverlayEnabled) {
      destroyCodexStatusOverlay();
      return;
    }
    renderCodexStatusOverlay();
    if (!codexOverlayTimer) {
      codexOverlayTimer = setInterval(() => {
        if (!codexOverlayEnabled) {
          destroyCodexStatusOverlay();
          return;
        }
        renderCodexStatusOverlay();
      }, 2000);
    }
  }

  async function saveCodexPlaylist(next) {
    codexPlaylist = normalizeCodexPlaylist(next).map(enrichCodexPlaylistEntry);
    await chrome.storage.local.set({
      [STORAGE_KEY_CODEX_PLAYLIST]: codexPlaylist
    });
    syncCodexTabsUi();
    if (codexOverlayEnabled) renderCodexStatusOverlay();
    return codexPlaylist;
  }

  async function toggleCodexInPlaylist(entry) {
    const id = Number(entry?.id);
    if (!Number.isFinite(id) || id <= 0) return false;
    const exists = isCodexInPlaylist(id);
    let next;
    if (exists) {
      next = codexPlaylist.filter((e) => Number(e.id) !== id);
    } else {
      if (codexPlaylist.length >= CODEX_PLAYLIST_MAX) {
        throw new Error('Limite de ' + CODEX_PLAYLIST_MAX + ' Codex selecionados.');
      }
      next = codexPlaylist.concat([
        {
          id,
          name: String(entry.name || '#' + id),
          huntName: String(entry.huntName || ''),
          slug: String(entry.slug || ''),
          items: Array.isArray(entry.items) ? entry.items : []
        }
      ]);
    }
    await saveCodexPlaylist(next);
    return !exists;
  }

  function findCodexById(codexId) {
    const id = Number(codexId);
    return getCodexList().find((e) => Number(e?.id) === id) || null;
  }

  function codexForRank(rankId) {
    const ranks = getHuntRanks();
    const rank = ranks.find((r) => r.id === rankId) || ranks[0];
    const list = getCodexList();
    if (!rank || rank.id === 'todas') return list.slice();
    return list.filter((entry) => {
      const lvl = getCodexLevel(entry);
      return lvl >= rank.min && lvl <= rank.max;
    });
  }

  function setCodexExpanded(open) {
    const root = document.getElementById(ROOT_ID);
    root?.classList.toggle('is-codex-open', !!open);
  }

  function isCodexOpen() {
    const modal = $('#gpCodexModal');
    return !!(modal && modal.classList.contains('is-open'));
  }

  function closeCodex() {
    const modal = $('#gpCodexModal');
    const dialog = rootQueryDialog();
    if (dialog && !isAutoBossOpen() && !isHuntOpen()) dialog.style.overflow = '';
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.hidden = true;
    setCodexExpanded(false);
  }

  function openCodex() {
    const modal = $('#gpCodexModal');
    if (!modal) return;
    closeAutoBoss();
    closeHunt();
    setSettingsOpen(false);
    const dialog = rootQueryDialog();
    if (dialog) dialog.style.overflow = 'hidden';
    modal.hidden = false;
    modal.classList.add('is-open');
    setCodexExpanded(true);
    void loadCodexEnabled();
    void loadCodexOverlayEnabled();
    void loadCodexPlaylist().then(() => {
      if (!isCodexOpen()) return;
      renderCodexRanks();
      syncCodexTabsUi();
      renderCodexList();
      if (codexOverlayEnabled) renderCodexStatusOverlay();
    });
    const listBox = $('#gpCodexList');
    if (listBox && !getCodexList().length) {
      listBox.innerHTML =
        '<div style="font-size:12px;color:var(--gp-muted)">Carregando catálogo do Codex…</div>';
    } else {
      renderCodexRanks();
      syncCodexTabsUi();
      renderCodexList();
    }
    void ensureCodexCatalogLoaded().then((ok) => {
      if (!isCodexOpen()) return;
      if (!ok) {
        const box = $('#gpCodexList');
        if (box) {
          box.innerHTML =
            '<div style="font-size:12px;color:var(--gp-err)">Falha ao carregar o Codex. Faça login em tibiabot.online.</div>';
        }
        return;
      }
      void saveCodexPlaylist(codexPlaylist).then(() => {
        if (isCodexOpen()) renderCodexList();
      });
    });
  }

  function renderCodexRanks() {
    const box = $('#gpCodexRanks');
    if (!box) return;
    box.innerHTML = '';
    for (const rank of getHuntRanks()) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gp-hunt-rank' + (rank.id === currentCodexRankId ? ' is-on' : '');
      btn.textContent = rank.label;
      btn.addEventListener('click', () => {
        currentCodexRankId = rank.id;
        renderCodexRanks();
        renderCodexList();
      });
      box.appendChild(btn);
    }
    syncCodexTabsUi();
  }

  function appendCodexEntryCard(box, entry, { showGoHunt = true } = {}) {
    const item = document.createElement('div');
    const picked = isCodexInPlaylist(entry.id);
    item.className = 'gp-cx-item' + (picked ? ' is-picked' : '');
    const lvl = getCodexLevel(entry);
    const huntName = String(entry.huntName || '');
    const tiles = (entry.items || [])
      .map((it) => {
        const title =
          escapeHtml(it.name || '') + ' · ' + formatCodexQty(it.qty);
        return (
          '<div class="gp-cx-tile" title="' +
          title +
          '">' +
          '<div class="gp-cx-tile-box">' +
          '<img src="' +
          escapeHtml(codexItemIconUrl(it.objectId)) +
          '" alt="' +
          escapeHtml(it.name || '') +
          '" loading="lazy">' +
          '</div>' +
          '<span class="gp-cx-tile-n">' +
          formatCodexQty(it.qty) +
          '</span>' +
          '</div>'
        );
      })
      .join('');

    item.innerHTML =
      '<div class="gp-cx-head">' +
      '<div>' +
      '<div class="gp-cx-name">' +
      escapeHtml(entry.name || '') +
      '</div>' +
      '<div class="gp-cx-meta">' +
      '<span>#' +
      escapeHtml(String(entry.id || '')) +
      '</span>' +
      '<span class="gp-cx-lvl">' +
      (lvl ? 'lvl ' + lvl : 'lvl —') +
      '</span>' +
      '<span>' +
      escapeHtml(huntName || entry.category || 'Hunt') +
      '</span>' +
      '</div>' +
      '</div>' +
      '<div class="gp-cx-bonus">' +
      escapeHtml(entry.bonus || '') +
      '</div>' +
      '</div>' +
      '<div class="gp-cx-tiles">' +
      tiles +
      '</div>';

    const actions = document.createElement('div');
    actions.className = 'gp-cx-actions';

    const pickBtn = document.createElement('button');
    pickBtn.type = 'button';
    const atMax = !picked && codexPlaylist.length >= CODEX_PLAYLIST_MAX;
    pickBtn.className = 'gp-cx-pick-btn ' + (picked ? 'is-remove' : 'is-add');
    pickBtn.disabled = atMax;
    pickBtn.textContent = picked
      ? 'Remover (' + codexPlaylist.length + '/' + CODEX_PLAYLIST_MAX + ')'
      : atMax
        ? 'Lista cheia (' + CODEX_PLAYLIST_MAX + ')'
        : 'Marcar (' + codexPlaylist.length + '/' + CODEX_PLAYLIST_MAX + ')';
    pickBtn.title = atMax
      ? 'Limite de ' + CODEX_PLAYLIST_MAX + ' Codex selecionados'
      : picked
        ? 'Remover da lista'
        : 'Adicionar à lista';
    pickBtn.addEventListener('click', async (ev) => {
      ev.stopPropagation();
      try {
        const added = await toggleCodexInPlaylist(entry);
        renderCodexList();
        setStatus(
          added
            ? 'Codex marcado: ' + (entry.name || '#' + entry.id)
            : 'Codex removido da lista.',
          'ok'
        );
      } catch (error) {
        setStatus(error.message || 'Não foi possível marcar o Codex.', 'err');
      }
    });
    actions.appendChild(pickBtn);

    if (showGoHunt) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gp-btn-activate btn-go-hunt';
      btn.textContent = huntName ? 'Ir para ' + huntName : 'Ir para a hunt';
      btn.disabled = !huntName;
      btn.addEventListener('click', async (ev) => {
        ev.stopPropagation();
        try {
          const auth = await syncAuth();
          if (!applyAuthUi(auth)) throw new Error('Faça login em tibiabot.online.');
          if (auth.extensionOutdated) {
            throw new Error(auth.versionMessage || 'Atualize a extensão.');
          }
          setStatus('Indo para ' + huntName + '…', 'ok');
          const response = await chrome.runtime.sendMessage({
            type: 'BAIAKIDLE_GO_HUNT',
            huntName: huntName
          });
          if (!response?.success) {
            throw new Error(response?.error || 'Falha ao ir para a hunt.');
          }
          setStatus('Navegando até ' + huntName + ' no jogo.', 'ok');
        } catch (error) {
          console.error('[Tibia Bot game-panel]', error);
          setStatus(error.message || 'Erro ao ir para a hunt.', 'err');
        }
      });
      actions.appendChild(btn);
    }

    item.appendChild(actions);
    box.appendChild(item);
  }

  function renderCodexList() {
    const box = $('#gpCodexList');
    if (!box) return;
    box.innerHTML = '';
    syncCodexTabsUi();

    if (currentCodexTab === 'selected') {
      if (!codexPlaylist.length) {
        box.innerHTML =
          '<div style="font-size:12px;color:var(--gp-muted)">Nenhum Codex marcado. No catálogo, use Marcar (máx. ' +
          CODEX_PLAYLIST_MAX +
          ').</div>';
        return;
      }

      for (const picked of codexPlaylist) {
        const full = findCodexById(picked.id) || {
          id: picked.id,
          name: picked.name,
          huntName: picked.huntName,
          slug: picked.slug,
          bonus: '',
          items: []
        };
        appendCodexEntryCard(box, full, { showGoHunt: true });
      }
      return;
    }

    const entries = codexForRank(currentCodexRankId);
    if (!entries.length) {
      box.innerHTML =
        '<div style="font-size:12px;color:var(--gp-muted)">Nenhum Codex neste rank.</div>';
      return;
    }

    for (const entry of entries) {
      appendCodexEntryCard(box, entry, { showGoHunt: true });
    }
  }

  function defaultMoverTiers() {
    return { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false };
  }

  function anyMoverTierOn(tiers) {
    return !!(
      tiers &&
      (tiers[0] || tiers[1] || tiers[2] || tiers[3] || tiers[4] || tiers[5])
    );
  }

  async function renderMoverTierChips(vip = isVipAuth(lastAuth)) {
    const data = await chrome.storage.local.get(STORAGE_KEY_MOVER_TIERS);
    const tiers = data[STORAGE_KEY_MOVER_TIERS] || defaultMoverTiers();
    const root = $('#gpMoverTiers');
    if (!root) return;
    root.querySelectorAll('.gp-tier-chip').forEach((btn) => {
      const tier = String(btn.getAttribute('data-tier') || '');
      const on = !!tiers[tier] || !!tiers[Number(tier)];
      const color = btn.getAttribute('data-color') || '#cfd2d8';
      btn.classList.toggle('is-on', on);
      btn.disabled = !vip || !!lastAuth.extensionOutdated;
      btn.style.background = on ? color : '';
      btn.style.color = on ? '#0c1219' : '';
      btn.style.borderColor = on ? color : '';
    });
  }

  async function refreshModules() {
    const keys = MODULES.map((m) => m.storageKey).concat([
      STORAGE_KEY_AUTO_SELL_VENDER_LOOT_BOSS
    ]);
    const data = await chrome.storage.local.get(keys);
    const vip = isVipAuth(lastAuth);
    const active = [];

    for (const mod of MODULES) {
      if (mod.hidden) {
        if (data[mod.storageKey]) {
          void chrome.storage.local.set({ [mod.storageKey]: false });
          try {
            chrome.runtime.sendMessage({ type: mod.stopMsg });
          } catch (_) {}
        }
        continue;
      }
      const enabled = !!data[mod.storageKey];
      if (mod.toggleId) {
        const toggle = document.getElementById(mod.toggleId);
        if (toggle) {
          toggle.checked = enabled && vip && !lastAuth.extensionOutdated;
          toggle.disabled = !vip || !!lastAuth.extensionOutdated;
        }
      }
      if (enabled && vip && !lastAuth.extensionOutdated) active.push(mod.label);
    }

    const venderLootBoss = document.getElementById('gpVenderLootBossToggle');
    if (venderLootBoss) {
      venderLootBoss.checked = !!data[STORAGE_KEY_AUTO_SELL_VENDER_LOOT_BOSS];
      venderLootBoss.disabled = !vip || !!lastAuth.extensionOutdated;
    }

    await renderMoverTierChips(vip && !lastAuth.extensionOutdated);
    await renderStaminaFields(vip && !lastAuth.extensionOutdated);
    await renderAutoSellFields(vip && !lastAuth.extensionOutdated);
    await renderAutoAnuncioFields(vip && !lastAuth.extensionOutdated);
    applyModulesLock(!vip || !!lastAuth.extensionOutdated);

    if (!vip) {
      setStatus('VIP necessária para ativar módulos.', 'err');
      return;
    }
    if (active.length) {
      setStatus('Ativos: ' + active.join(', ') + '.', 'ok');
    } else {
      setStatus('Nenhum módulo ativo.');
    }
  }

  async function applyVenderLootBossToggle(enabled) {
    const toggle = document.getElementById('gpVenderLootBossToggle');
    try {
      if (toggle) toggle.disabled = true;
      const auth = await syncAuth();
      if (!applyAuthUi(auth)) throw new Error('Faça login em tibiabot.online.');
      if (!isVipAuth(auth)) {
        throw new Error('VIP necessária. Ative um voucher ou compre o plano em Minha conta.');
      }
      if (auth.extensionOutdated) {
        throw new Error(auth.versionMessage || 'Atualize a extensão.');
      }
      await chrome.storage.local.set({
        [STORAGE_KEY_AUTO_SELL_VENDER_LOOT_BOSS]: !!enabled
      });
      setStatus(
        enabled
          ? 'VenderLootBoss ativo (libera proteção antes de vender).'
          : 'VenderLootBoss desligado.',
        'ok'
      );
    } catch (error) {
      if (toggle) toggle.checked = !enabled;
      setStatus(error.message || 'Erro ao alterar VenderLootBoss.', 'err');
    } finally {
      if (toggle) {
        toggle.disabled = !isVipAuth(lastAuth) || !!lastAuth.extensionOutdated;
      }
    }
  }

  async function applyToggle(mod, enabled) {
    const toggle = mod.toggleId ? document.getElementById(mod.toggleId) : null;
    try {
      if (toggle) toggle.disabled = true;
      const auth = await syncAuth();
      if (!applyAuthUi(auth)) throw new Error('Faça login em tibiabot.online.');
      if (!isVipAuth(auth)) {
        throw new Error('VIP necessária. Ative um voucher ou compre o plano em Minha conta.');
      }
      if (auth.extensionOutdated) {
        throw new Error(auth.versionMessage || 'Atualize a extensão.');
      }

      await chrome.storage.local.set({ [mod.storageKey]: !!enabled });
      const response = await chrome.runtime.sendMessage({
        type: enabled ? mod.startMsg : mod.stopMsg
      });
      if (!response?.success) {
        throw new Error(response?.error || 'Falha ao aplicar ' + mod.label + '.');
      }
      if (enabled && mod.id !== 'reconect') requestCaptureCharacters('module:' + mod.id);
      await refreshModules();
      setStatus(
        enabled
          ? mod.id === 'reconect'
            ? mod.label + ' ativo (home→/jogar/ · F5 sem char).'
            : mod.label + ' ativo nesta aba.'
          : mod.label + ' desligado nesta aba.',
        'ok'
      );
    } catch (error) {
      console.error('[Tibia Bot game-panel]', error);
      if (toggle) toggle.checked = !enabled;
      await chrome.storage.local.set({ [mod.storageKey]: !enabled });
      setStatus(error.message || 'Erro ao alternar ' + mod.label + '.', 'err');
    } finally {
      if (toggle) toggle.disabled = !isVipAuth(lastAuth) || !!lastAuth.extensionOutdated;
    }
  }

  async function runGoldMediaOnce() {
    const mod = MODULES.find((m) => m.id === 'gold_media');
    const btn = document.getElementById(mod?.runBtnId || 'gpGoldMediaRun');
    try {
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Pesquisando...';
      }
      const auth = await syncAuth();
      if (!applyAuthUi(auth)) throw new Error('Faça login em tibiabot.online.');
      if (!isVipAuth(auth)) {
        throw new Error('VIP necessária. Ative um voucher ou compre o plano em Minha conta.');
      }
      if (auth.extensionOutdated) {
        throw new Error(auth.versionMessage || 'Atualize a extensão.');
      }
      if (!mod) throw new Error('Módulo Média Gold não encontrado.');

      setStatus('Média Gold: pesquisando Market…', 'ok');
      const response = await chrome.runtime.sendMessage({ type: mod.startMsg });
      if (!response?.success) {
        throw new Error(response?.error || 'Falha ao iniciar Média Gold.');
      }
      setStatus('Média Gold em andamento — veja o popup no jogo.', 'ok');
    } catch (error) {
      console.error('[Tibia Bot game-panel gold_media]', error);
      setStatus(error.message || 'Erro na Média Gold.', 'err');
    } finally {
      if (btn) {
        btn.disabled = !isVipAuth(lastAuth) || !!lastAuth.extensionOutdated;
        btn.textContent = 'Analisar média';
      }
    }
  }

  async function toggleMoverTier(tier) {
    const mod = MODULES.find((m) => m.id === 'mover_itens');
    if (!mod) return;
    const key = String(tier);

    try {
      const auth = await syncAuth();
      if (!applyAuthUi(auth)) throw new Error('Faça login em tibiabot.online.');
      if (!isVipAuth(auth)) {
        throw new Error('VIP necessária. Ative um voucher ou compre o plano em Minha conta.');
      }
      if (auth.extensionOutdated) {
        throw new Error(auth.versionMessage || 'Atualize a extensão.');
      }

      const data = await chrome.storage.local.get(STORAGE_KEY_MOVER_TIERS);
      const tiers = { ...defaultMoverTiers(), ...(data[STORAGE_KEY_MOVER_TIERS] || {}) };
      tiers[key] = !tiers[key];
      tiers[Number(key)] = tiers[key];
      const enabled = anyMoverTierOn(tiers);
      await chrome.storage.local.set({
        [STORAGE_KEY_MOVER_TIERS]: tiers,
        [STORAGE_KEY_MOVER_ENABLED]: enabled
      });
      await renderMoverTierChips(true);

      const response = await chrome.runtime.sendMessage({
        type: enabled ? mod.startMsg : mod.stopMsg
      });
      if (!response?.success) {
        throw new Error(response?.error || 'Falha ao aplicar Mover Itens.');
      }

      await refreshModules();
      const labels = ['T0', 'T1', 'T2', 'T3', 'T4', 'T5'].filter(
        (_, i) => tiers[i] || tiers[String(i)]
      );
      setStatus(
        enabled ? 'Mover Itens ativo: ' + labels.join(', ') + '.' : 'Mover Itens desligado.',
        'ok'
      );
    } catch (error) {
      console.error('[Tibia Bot game-panel]', error);
      setStatus(error.message || 'Erro ao alternar tier.', 'err');
      await renderMoverTierChips();
    }
  }

  function defaultStaminaConfig() {
    return { minPct: 15, maxPct: 30 };
  }

  function normalizeAutoSellConfig(raw) {
    let minPct = 70;
    if (raw && typeof raw === 'object') {
      const n = Number(raw.minPct);
      if (Number.isFinite(n)) minPct = n;
    } else if (Number.isFinite(Number(raw))) {
      minPct = Number(raw);
    }
    minPct = Math.max(1, Math.min(100, Math.round(minPct)));
    return { minPct };
  }

  async function renderAutoSellFields(vip = isVipAuth(lastAuth)) {
    const data = await chrome.storage.local.get(STORAGE_KEY_AUTO_SELL_CONFIG);
    const cfg = normalizeAutoSellConfig(data[STORAGE_KEY_AUTO_SELL_CONFIG]);
    const el = $('#gpAutoSellMinPct');
    const locked = !vip || !!lastAuth.extensionOutdated;
    if (el) {
      el.value = String(cfg.minPct);
      el.disabled = locked;
    }
  }

  async function saveAutoSellConfigFromInputs() {
    const el = $('#gpAutoSellMinPct');
    if (!el) return;
    try {
      const auth = await syncAuth();
      if (!applyAuthUi(auth)) throw new Error('Faça login em tibiabot.online.');
      if (!isVipAuth(auth)) {
        throw new Error('VIP necessária. Ative um voucher ou compre o plano em Minha conta.');
      }
      if (auth.extensionOutdated) {
        throw new Error(auth.versionMessage || 'Atualize a extensão.');
      }
      const cfg = normalizeAutoSellConfig({ minPct: el.value });
      el.value = String(cfg.minPct);
      await chrome.storage.local.set({ [STORAGE_KEY_AUTO_SELL_CONFIG]: cfg });
      setStatus('Auto Sell: vende ao atingir ' + cfg.minPct + '% da mochila.', 'ok');
    } catch (error) {
      console.error('[Tibia Bot game-panel]', error);
      setStatus(error.message || 'Erro ao salvar Auto Sell.', 'err');
      await renderAutoSellFields();
    }
  }

  function defaultAutoAnuncioConfig() {
    return { channel: 'geral', text: '', intervalMin: 5 };
  }

  function normalizeAutoAnuncioConfig(raw) {
    const base = defaultAutoAnuncioConfig();
    const channels = ['geral', 'comunicados', 'help', 'market'];
    if (!raw || typeof raw !== 'object') return base;
    const ch = String(raw.channel || '').trim().toLowerCase();
    if (channels.includes(ch)) base.channel = ch;
    base.text = String(raw.text || '').trim().slice(0, 200);
    const n = Number(raw.intervalMin);
    if (Number.isFinite(n)) {
      base.intervalMin = Math.max(1, Math.min(120, Math.round(n)));
    }
    return base;
  }

  function updateAutoAnuncioCount(text) {
    const count = $('#gpAutoAnuncioCount');
    if (!count) return;
    count.textContent = String(text || '').length + ' / 200';
  }

  async function renderAutoAnuncioFields(vip = isVipAuth(lastAuth)) {
    const data = await chrome.storage.local.get(STORAGE_KEY_AUTO_ANUNCIO_CONFIG);
    const cfg = normalizeAutoAnuncioConfig(data[STORAGE_KEY_AUTO_ANUNCIO_CONFIG]);
    const locked = !vip || !!lastAuth.extensionOutdated;
    const channel = $('#gpAutoAnuncioChannel');
    const interval = $('#gpAutoAnuncioInterval');
    const text = $('#gpAutoAnuncioText');
    if (channel) {
      channel.value = cfg.channel;
      channel.disabled = locked;
    }
    if (interval) {
      interval.value = String(cfg.intervalMin);
      interval.disabled = locked;
    }
    if (text) {
      text.value = cfg.text;
      text.disabled = locked;
    }
    updateAutoAnuncioCount(cfg.text);
  }

  async function saveAutoAnuncioConfigFromInputs() {
    const channel = $('#gpAutoAnuncioChannel');
    const interval = $('#gpAutoAnuncioInterval');
    const text = $('#gpAutoAnuncioText');
    if (!channel || !interval || !text) return;
    try {
      const auth = await syncAuth();
      if (!applyAuthUi(auth)) throw new Error('Faça login em tibiabot.online.');
      if (!isVipAuth(auth)) {
        throw new Error('VIP necessária. Ative um voucher ou compre o plano em Minha conta.');
      }
      if (auth.extensionOutdated) {
        throw new Error(auth.versionMessage || 'Atualize a extensão.');
      }
      const cfg = normalizeAutoAnuncioConfig({
        channel: channel.value,
        text: text.value,
        intervalMin: interval.value
      });
      channel.value = cfg.channel;
      interval.value = String(cfg.intervalMin);
      text.value = cfg.text;
      updateAutoAnuncioCount(cfg.text);
      await chrome.storage.local.set({ [STORAGE_KEY_AUTO_ANUNCIO_CONFIG]: cfg });
      setStatus(
        'Auto Anúncio: ' + cfg.channel + ' · a cada ' + cfg.intervalMin + ' min.',
        'ok'
      );
    } catch (error) {
      console.error('[Tibia Bot game-panel]', error);
      setStatus(error.message || 'Erro ao salvar Auto Anúncio.', 'err');
      await renderAutoAnuncioFields();
    }
  }

  function normalizeStaminaConfig(raw) {
    const base = defaultStaminaConfig();
    let minPct = Number(raw?.minPct);
    let maxPct = Number(raw?.maxPct);
    if (!Number.isFinite(minPct)) minPct = base.minPct;
    if (!Number.isFinite(maxPct)) maxPct = base.maxPct;
    minPct = Math.max(0, Math.min(99, Math.round(minPct)));
    maxPct = Math.max(1, Math.min(100, Math.round(maxPct)));
    if (minPct >= maxPct) {
      maxPct = Math.min(100, minPct + 1);
    }
    return { minPct, maxPct };
  }

  async function renderStaminaFields(vip = isVipAuth(lastAuth)) {
    const data = await chrome.storage.local.get(STORAGE_KEY_STAMINA_CONFIG);
    const cfg = normalizeStaminaConfig(data[STORAGE_KEY_STAMINA_CONFIG]);
    const minEl = $('#gpStaminaMinPct');
    const maxEl = $('#gpStaminaMaxPct');
    const locked = !vip || !!lastAuth.extensionOutdated;
    if (minEl) {
      minEl.value = String(cfg.minPct);
      minEl.disabled = locked;
    }
    if (maxEl) {
      maxEl.value = String(cfg.maxPct);
      maxEl.disabled = locked;
    }
    updateStaminaWarn(cfg.minPct);
  }

  function updateStaminaWarn(minPct) {
    const warn = $('#gpStaminaWarn');
    if (!warn) return;
    const n = Number(minPct);
    const show = Number.isFinite(n) && n < 15;
    warn.hidden = !show;
    warn.classList.toggle('is-on', show);
  }

  async function saveStaminaConfigFromInputs() {
    const minEl = $('#gpStaminaMinPct');
    const maxEl = $('#gpStaminaMaxPct');
    if (!minEl || !maxEl) return;

    try {
      const auth = await syncAuth();
      if (!applyAuthUi(auth)) throw new Error('Faça login em tibiabot.online.');
      if (!isVipAuth(auth)) {
        throw new Error('VIP necessária. Ative um voucher ou compre o plano em Minha conta.');
      }
      if (auth.extensionOutdated) {
        throw new Error(auth.versionMessage || 'Atualize a extensão.');
      }

      const cfg = normalizeStaminaConfig({
        minPct: minEl.value,
        maxPct: maxEl.value
      });
      minEl.value = String(cfg.minPct);
      maxEl.value = String(cfg.maxPct);
      updateStaminaWarn(cfg.minPct);
      await chrome.storage.local.set({ [STORAGE_KEY_STAMINA_CONFIG]: cfg });
      setStatus('Stamina: ≤' + cfg.minPct + '% treino · ≥' + cfg.maxPct + '% hunt.', 'ok');
    } catch (error) {
      console.error('[Tibia Bot game-panel]', error);
      setStatus(error.message || 'Erro ao salvar stamina.', 'err');
      await renderStaminaFields();
    }
  }

  let autoBossView = 'list'; // list | detail
  let autoBossTab = 'catalog'; // catalog | selected
  let autoBossSelectedId = '';
  let autoBossSearchQuery = '';
  /** @type {Record<string, any>} */
  let bossTrackById = {};
  let bossTrackTimer = null;
  /** @type {Array<{id:string,name:string}>} */
  let autoBossPlaylist = [];
  /** @type {{ active: number, sets: Record<number, Array<{id:string,name:string}>> }} */
  let autoBossPresets = {
    active: 1,
    sets: { 1: [], 2: [], 3: [] }
  };
  /** @type {Record<string, { ssa: boolean, mightRing: boolean }>} */
  let bossHelperEquipById = {};
  /** @type {{ running?: boolean, queue?: Array<{id:string,name:string}>, index?: number, currentId?: string }|null} */
  let autoBossRun = null;
  let autoBossRunAdvancing = false;
  let autoBossAutoCycle = false;
  let autoBossSoloEscape = false;
  let autoBossFightTimerEnabled = false;
  let autoBossFightTimerMinutes = DEFAULT_FIGHT_TIMER_MIN;
  let autoBossEndHelperEquip = false;
  let autoBossCycleStartedAt = 0;

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatKillsNum(n) {
    const v = Math.max(0, Math.round(Number(n) || 0));
    try {
      return v.toLocaleString('pt-BR');
    } catch (_) {
      return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  }

  /** Último snapshot do histórico Kills/h (para re-render). */
  let lastKillsPayload = null;

  function readGameSessionText() {
    try {
      const el =
        document.querySelector('#an-session') ||
        document.querySelector('b#an-session');
      return String(el?.textContent || '').trim();
    } catch (_) {
      return '';
    }
  }

  function formatSessionClock(sec) {
    const n = Math.max(0, Math.floor(Number(sec) || 0));
    if (!Number.isFinite(n)) return '';
    const h = Math.floor(n / 3600);
    const m = Math.floor((n % 3600) / 60);
    const s = n % 60;
    const pad = (v) => String(v).padStart(2, '0');
    return pad(h) + ':' + pad(m) + ':' + pad(s);
  }

  function renderKillsHistory(payload) {
    lastKillsPayload = payload || null;
    const totalEl = document.getElementById('gpKillsTotal');
    const expEl = document.getElementById('gpKillsExp');
    const rateEl = document.getElementById('gpKillsRate');
    const sessionEl = document.getElementById('gpKillsSession');
    const listEl = document.getElementById('gpKillsList');
    if (!listEl) return;

    const running = !!(payload && payload.running && payload.status !== 'stopped');
    const extra = payload?.extra || {};
    const total = Number(extra.total) || 0;
    const killsH = Number(extra.killsH) || 0;
    const expTotal = Number(extra.expTotal) || 0;
    const history = Array.isArray(extra.history) ? extra.history : [];
    const sessionText =
      readGameSessionText() ||
      (extra.sessionSec != null ? formatSessionClock(extra.sessionSec) : '') ||
      '—';

    if (totalEl) totalEl.textContent = formatKillsNum(total);
    if (expEl) expEl.textContent = formatKillsNum(expTotal);
    if (rateEl) rateEl.textContent = formatKillsNum(killsH) + '/h';
    if (sessionEl) sessionEl.textContent = sessionText;

    if (!running) {
      listEl.innerHTML =
        '<div class="gp-kills-empty">Ligue o módulo para iniciar o histórico da Session do jogo.</div>';
      return;
    }
    if (!history.length) {
      listEl.innerHTML =
        '<div class="gp-kills-empty">Nenhuma kill nesta Session ainda…</div>';
      return;
    }

    let topExp = -1;
    let topIdx = -1;
    for (let i = 0; i < history.length; i++) {
      const exp = Number(history[i]?.expTotal) || 0;
      if (exp > topExp) {
        topExp = exp;
        topIdx = i;
      }
    }

    listEl.innerHTML = history
      .map((row, i) => {
        const name = escapeHtml(row.name || '?');
        const kills = formatKillsNum(row.kills);
        const exp = formatKillsNum(row.expTotal);
        const isTop = !!(row.topExp) || (i === topIdx && topExp > 0);
        const spr = String(row.sprite || '').trim();
        const img = spr
          ? '<img class="gp-kills-spr" src="' +
            escapeHtml(spr) +
            '" alt="" loading="lazy" decoding="async">'
          : '<div class="gp-kills-spr-ph" aria-hidden="true">?</div>';
        const trophy = isTop
          ? '<span class="gp-kills-trophy" title="Maior exp nesta Session" aria-label="Mais exp">🏆</span>'
          : '';
        return (
          '<div class="gp-kills-row' +
          (isTop ? ' is-top' : '') +
          '" title="' +
          name +
          (isTop ? ' · mais exp' : '') +
          '">' +
          img +
          '<div class="gp-kills-name">' +
          '<span class="gp-kills-name-text">' +
          name +
          '</span>' +
          trophy +
          '</div>' +
          '<div class="gp-kills-n">×' +
          kills +
          '</div>' +
          '<div class="gp-kills-exp">' +
          exp +
          ' exp</div>' +
          '</div>'
        );
      })
      .join('');
  }

  function formatBossHp(n) {
    const v = Math.max(0, Math.round(Number(n) || 0));
    try {
      return v.toLocaleString('pt-BR');
    } catch (_) {
      return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  }

  function formatResistValue(r) {
    const n = Number(r?.value) || 0;
    const sign = n > 0 ? '+' : '';
    return sign + n + '%';
  }

  function getBossDefenseElements(boss) {
    const explicit = normalizeHuntDamageElements(
      boss?.damageElements || boss?.attacks || boss?.damage
    );
    /** @type {Array<{ element: string, icon: string, score: number }>} */
    let ranked;
    if (explicit.length) {
      ranked = explicit.map((e) => ({
        element: e.element,
        icon: e.icon || huntElementIconUrl(e.element),
        score: e.weight
      }));
    } else {
      ranked = (boss?.resistances || [])
        .filter((r) => (Number(r.value) || 0) > 0)
        .map((r) => ({
          element: String(r.element || '').toLowerCase(),
          icon: r.icon || huntElementIconUrl(r.element),
          score: Number(r.value) || 0
        }))
        .filter((r) => r.element)
        .sort((a, b) => b.score - a.score);
    }
    const pcts = huntScoreToPercents(ranked);
    return ranked
      .map((e, i) => ({
        element: e.element,
        icon: e.icon,
        score: e.score,
        pct: pcts[i] || 0
      }))
      .filter((e) => e.pct > 0);
  }

  function bossSpriteHtml(boss, large) {
    const cls = large ? 'gp-ab-sprite-lg' : 'gp-ab-sprite';
    if (boss?.sprite) {
      return (
        '<img class="' +
        cls +
        '" src="' +
        escapeHtml(boss.sprite) +
        '" alt="' +
        escapeHtml(boss.name) +
        '" loading="lazy">'
      );
    }
    const initials = String(boss?.name || '?')
      .split(/\s+/)
      .map((w) => w.charAt(0))
      .join('')
      .slice(0, 3)
      .toUpperCase();
    return (
      '<div class="' +
      cls +
      ' gp-ab-sprite-ph" aria-hidden="true">' +
      escapeHtml(initials || '?') +
      '</div>'
    );
  }

  function getBossCatalog() {
    return Array.isArray(window.BAIAK_IDLE_BOSSES) ? window.BAIAK_IDLE_BOSSES : [];
  }

  function normalizeBossSearch(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function filterBossCatalog(query) {
    const bosses = getBossCatalog();
    const q = normalizeBossSearch(query);
    if (!q) return bosses;
    return bosses.filter((boss) => {
      if (!boss) return false;
      const name = normalizeBossSearch(boss.name);
      const id = normalizeBossSearch(String(boss.id || '').replace(/_/g, ' '));
      return name.includes(q) || id.includes(q);
    });
  }

  function normalizePlaylist(list) {
    const out = [];
    const seen = new Set();
    (Array.isArray(list) ? list : []).forEach((item) => {
      if (out.length >= AUTOBOSS_PLAYLIST_MAX) return;
      let id = '';
      let name = '';
      if (typeof item === 'string') {
        id = item.trim();
        name = id;
      } else if (item && typeof item === 'object') {
        id = String(item.id || '').trim();
        name = String(item.name || id).trim();
      }
      if (!id || seen.has(id)) return;
      seen.add(id);
      out.push({ id, name });
    });
    return out;
  }

  function clampAutoBossPresetId(raw) {
    const n = Number(raw);
    return n === 2 || n === 3 ? n : 1;
  }

  function emptyAutoBossPresetSets() {
    return { 1: [], 2: [], 3: [] };
  }

  function applyActivePlaylistFromPresets() {
    const id = clampAutoBossPresetId(autoBossPresets.active);
    autoBossPresets.active = id;
    if (!autoBossPresets.sets || typeof autoBossPresets.sets !== 'object') {
      autoBossPresets.sets = emptyAutoBossPresetSets();
    }
    AUTOBOSS_PRESET_IDS.forEach((pid) => {
      autoBossPresets.sets[pid] = normalizePlaylist(autoBossPresets.sets[pid]);
    });
    autoBossPlaylist = autoBossPresets.sets[id] || [];
    return autoBossPlaylist;
  }

  /**
   * Normaliza presets e migra lista legada (sem presets) → Pre Set 1.
   * Quem só tem baiakIdleAutoBossPlaylist continua válido.
   */
  function normalizeAutoBossPresets(rawPresets, legacyPlaylist) {
    const sets = emptyAutoBossPresetSets();
    let active = 1;

    if (rawPresets && typeof rawPresets === 'object') {
      const srcSets =
        rawPresets.sets && typeof rawPresets.sets === 'object'
          ? rawPresets.sets
          : rawPresets;
      let hasAnySetKey = false;
      AUTOBOSS_PRESET_IDS.forEach((pid) => {
        const list = srcSets[pid] != null ? srcSets[pid] : srcSets[String(pid)];
        if (list != null) hasAnySetKey = true;
        sets[pid] = normalizePlaylist(list);
      });
      if (hasAnySetKey || rawPresets.sets) {
        active = clampAutoBossPresetId(rawPresets.active);
        return { active, sets, migrated: false };
      }
    }

    // Sem estrutura de presets → copiar playlist única antiga no Pre Set 1
    sets[1] = normalizePlaylist(legacyPlaylist);
    return { active: 1, sets, migrated: true };
  }

  function getPresetPlaylist(presetId) {
    const id = clampAutoBossPresetId(presetId);
    if (!autoBossPresets.sets || typeof autoBossPresets.sets !== 'object') {
      autoBossPresets.sets = emptyAutoBossPresetSets();
    }
    return normalizePlaylist(autoBossPresets.sets[id]);
  }

  function isBossInPlaylist(bossId, presetId) {
    const id = String(bossId || '');
    const list =
      presetId == null
        ? autoBossPlaylist
        : getPresetPlaylist(presetId);
    return list.some((b) => b && b.id === id);
  }

  function presetsTabsHtml() {
    return (
      '<div class="gp-ab-preset-tabs" role="tablist" aria-label="Pre sets do AutoBoss">' +
      AUTOBOSS_PRESET_IDS.map((pid) => {
        const n = getPresetPlaylist(pid).length;
        const on = clampAutoBossPresetId(autoBossPresets.active) === pid;
        return (
          '<button type="button" class="gp-ab-preset-tab' +
          (on ? ' is-on' : '') +
          '" data-ab-preset="' +
          pid +
          '" title="Usar Pre Set ' +
          pid +
          ' ao iniciar">' +
          'Pre Set ' +
          pid +
          (n ? ' (' + n + ')' : '') +
          '</button>'
        );
      }).join('') +
      '</div>'
    );
  }

  function syncAutoBossTabsUi() {
    const tabs = $('#gpAbTabs');
    if (!tabs) return;
    const inDetail = autoBossView === 'detail';
    tabs.hidden = !!inDetail;
    tabs.querySelectorAll('.gp-ab-tab[data-ab-tab]').forEach((btn) => {
      const tab = btn.getAttribute('data-ab-tab');
      btn.classList.toggle('is-on', tab === autoBossTab);
    });
    const countEl = $('#gpAbSelectedCount');
    if (countEl) {
      const active = clampAutoBossPresetId(autoBossPresets.active);
      const n = getPresetPlaylist(active).length;
      countEl.textContent = n
        ? ' · P' + active + ' (' + n + '/' + AUTOBOSS_PLAYLIST_MAX + ')'
        : ' · P' + active;
    }
  }

  async function loadAutoBossPlaylist() {
    try {
      const data = await chrome.storage.local.get([
        STORAGE_KEY_AUTOBOSS_PLAYLIST,
        STORAGE_KEY_AUTOBOSS_PRESETS
      ]);
      const normalized = normalizeAutoBossPresets(
        data[STORAGE_KEY_AUTOBOSS_PRESETS],
        data[STORAGE_KEY_AUTOBOSS_PLAYLIST]
      );
      autoBossPresets = { active: normalized.active, sets: normalized.sets };
      applyActivePlaylistFromPresets();

      // Persistência: grava presets; espelha ativo na chave antiga (ciclo / SW)
      const needWrite =
        normalized.migrated ||
        data[STORAGE_KEY_AUTOBOSS_PRESETS] == null ||
        JSON.stringify(data[STORAGE_KEY_AUTOBOSS_PLAYLIST] || []) !==
          JSON.stringify(autoBossPlaylist);
      if (needWrite) {
        await chrome.storage.local.set({
          [STORAGE_KEY_AUTOBOSS_PRESETS]: {
            active: autoBossPresets.active,
            sets: autoBossPresets.sets
          },
          [STORAGE_KEY_AUTOBOSS_PLAYLIST]: autoBossPlaylist
        });
      }
    } catch (_) {
      autoBossPresets = {
        active: 1,
        sets: emptyAutoBossPresetSets()
      };
      autoBossPlaylist = [];
    }
    syncAutoBossTabsUi();
    return autoBossPlaylist;
  }

  async function setActiveAutoBossPreset(presetId) {
    const id = clampAutoBossPresetId(presetId);
    autoBossPresets.active = id;
    applyActivePlaylistFromPresets();
    await chrome.storage.local.set({
      [STORAGE_KEY_AUTOBOSS_PRESETS]: {
        active: autoBossPresets.active,
        sets: autoBossPresets.sets
      },
      [STORAGE_KEY_AUTOBOSS_PLAYLIST]: autoBossPlaylist
    });
    syncAutoBossTabsUi();
    syncAutoBossRunUi();
    return id;
  }

  function isBossInPreset(bossId, presetId) {
    return isBossInPlaylist(bossId, presetId);
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

  function getBossHelperEquip(bossId) {
    const id = String(bossId || '').trim();
    const cfg = id ? bossHelperEquipById[id] : null;
    if (cfg && typeof cfg === 'object') {
      return {
        ssa: cfg.ssa === true,
        mightRing: cfg.mightRing === true
      };
    }
    return { ssa: false, mightRing: false };
  }

  async function loadBossHelperEquip() {
    try {
      const data = await chrome.storage.local.get(STORAGE_KEY_BOSS_HELPER_EQUIP);
      bossHelperEquipById = normalizeBossHelperEquipMap(
        data[STORAGE_KEY_BOSS_HELPER_EQUIP]
      );
    } catch (_) {
      bossHelperEquipById = {};
    }
    return bossHelperEquipById;
  }

  async function saveBossHelperEquipMap(map) {
    bossHelperEquipById = normalizeBossHelperEquipMap(map);
    await chrome.storage.local.set({
      [STORAGE_KEY_BOSS_HELPER_EQUIP]: bossHelperEquipById
    });
    return bossHelperEquipById;
  }

  async function setBossHelperEquipFlag(bossId, key, value) {
    const id = String(bossId || '').trim();
    if (!id || (key !== 'ssa' && key !== 'mightRing')) return getBossHelperEquip(id);
    const next = Object.assign({}, bossHelperEquipById);
    const cur = getBossHelperEquip(id);
    next[id] = {
      ssa: key === 'ssa' ? !!value : cur.ssa,
      mightRing: key === 'mightRing' ? !!value : cur.mightRing
    };
    await saveBossHelperEquipMap(next);
    return next[id];
  }

  function bossHelperEquipHtml(bossId) {
    const cfg = getBossHelperEquip(bossId);
    const mk = (key, label, on, img) =>
      '<button type="button" class="gp-ab-helper-toggle ' +
      (on ? 'is-on' : 'is-off') +
      '" data-boss-helper="' +
      escapeHtml(key) +
      '" data-boss-id="' +
      escapeHtml(bossId) +
      '" title="' +
      escapeHtml(label) +
      '">' +
      '<img src="' +
      escapeHtml(img) +
      '" alt="' +
      escapeHtml(label) +
      '" loading="lazy">' +
      '<span class="gp-ab-helper-meta">' +
      '<span class="gp-ab-helper-name">' +
      escapeHtml(label) +
      '</span>' +
      '<span class="gp-ab-helper-state">' +
      (on ? 'Ativo' : 'Inativo') +
      '</span>' +
      '</span>' +
      '</button>';
    return (
      '<div class="gp-ab-helper">' +
      '<div class="gp-ab-helper-title">Helper EK · sessão Boss</div>' +
      '<div class="gp-ab-helper-row">' +
      mk('ssa', 'Stone Skin Amulet', cfg.ssa, BOSS_HELPER_ITEM_IMG.ssa) +
      mk('mightRing', 'Might Ring', cfg.mightRing, BOSS_HELPER_ITEM_IMG.mightRing) +
      '</div></div>'
    );
  }

  function normalizeAutoBossRun(raw) {
    if (!raw || typeof raw !== 'object' || !raw.running) {
      return { running: false, queue: [], index: 0, currentId: '' };
    }
    const queue = Array.isArray(raw.queue)
      ? raw.queue
          .map((b) => ({
            id: String(b?.id || '').trim(),
            name: String(b?.name || b?.id || '').trim()
          }))
          .filter((b) => b.id && b.name)
      : [];
    const index = Math.max(0, Number(raw.index) || 0);
    return {
      running: true,
      queue,
      index,
      currentId: String(raw.currentId || queue[index]?.id || '')
    };
  }

  async function loadAutoBossRun() {
    try {
      const data = await chrome.storage.local.get(STORAGE_KEY_AUTOBOSS_RUN);
      autoBossRun = normalizeAutoBossRun(data[STORAGE_KEY_AUTOBOSS_RUN]);
    } catch (_) {
      autoBossRun = { running: false, queue: [], index: 0, currentId: '' };
    }
    syncAutoBossRunUi();
    return autoBossRun;
  }

  async function saveAutoBossRun(run) {
    autoBossRun = normalizeAutoBossRun(run);
    await chrome.storage.local.set({
      [STORAGE_KEY_AUTOBOSS_RUN]: autoBossRun.running
        ? {
            running: true,
            queue: autoBossRun.queue.map((b, i) => ({
              id: b.id,
              name: b.name,
              status: i === autoBossRun.index ? 'fighting' : 'waiting',
              outcome: null
            })),
            index: autoBossRun.index,
            currentId: autoBossRun.currentId,
            stopAfterCurrent: false
          }
        : { running: false }
    });
    syncAutoBossRunUi();
    return autoBossRun;
  }

  function getEligibleAutoBossQueue() {
    return autoBossPlaylist
      .map((entry) => {
        const id = String(entry?.id || '').trim();
        const name = String(entry?.name || id).trim();
        if (!id || !name) return null;
        const track = getBossTrack(id);
        if (isBossOnCooldown(track)) return null;
        return { id, name };
      })
      .filter(Boolean);
  }

  function formatAutoBossCycleNext() {
    if (!autoBossAutoCycle) return '';
    const startedAt = Number(autoBossCycleStartedAt) || 0;
    if (!startedAt) return 'Ligue e inicie para agendar o ciclo diário (00:05).';
    const dueAt = nextAutoBossCycleDueAt(startedAt);
    const d = new Date(dueAt);
    const pad = (n) => (n < 10 ? '0' + n : String(n));
    const stamp =
      pad(d.getDate()) +
      '/' +
      pad(d.getMonth() + 1) +
      ' ' +
      pad(d.getHours()) +
      ':' +
      pad(d.getMinutes());
    if (dueAt <= Date.now()) return 'Ciclo diário vencido · reinício pendente (00:05)';
    return 'Próximo ciclo: <strong>' + stamp + '</strong> (diário 00:05)';
  }

  async function loadAutoBossAutoCycle() {
    try {
      const data = await chrome.storage.local.get([
        STORAGE_KEY_AUTOBOSS_AUTO_CYCLE,
        STORAGE_KEY_AUTOBOSS_CYCLE_STARTED_AT,
        STORAGE_KEY_AUTOBOSS_SOLO_ESCAPE,
        STORAGE_KEY_AUTOBOSS_FIGHT_TIMER,
        STORAGE_KEY_AUTOBOSS_END_HELPER_EQUIP
      ]);
      autoBossAutoCycle = !!data[STORAGE_KEY_AUTOBOSS_AUTO_CYCLE];
      autoBossCycleStartedAt = Number(data[STORAGE_KEY_AUTOBOSS_CYCLE_STARTED_AT]) || 0;
      autoBossSoloEscape = !!data[STORAGE_KEY_AUTOBOSS_SOLO_ESCAPE];
      autoBossEndHelperEquip = !!data[STORAGE_KEY_AUTOBOSS_END_HELPER_EQUIP];
      const ft = data[STORAGE_KEY_AUTOBOSS_FIGHT_TIMER];
      if (ft && typeof ft === 'object') {
        autoBossFightTimerEnabled = !!ft.enabled;
        autoBossFightTimerMinutes = Math.max(
          1,
          Math.min(300, Math.round(Number(ft.minutes) || DEFAULT_FIGHT_TIMER_MIN))
        );
      } else {
        autoBossFightTimerEnabled = false;
        autoBossFightTimerMinutes = DEFAULT_FIGHT_TIMER_MIN;
      }
    } catch (_) {
      autoBossAutoCycle = false;
      autoBossCycleStartedAt = 0;
      autoBossSoloEscape = false;
      autoBossEndHelperEquip = false;
      autoBossFightTimerEnabled = false;
      autoBossFightTimerMinutes = DEFAULT_FIGHT_TIMER_MIN;
    }
    const toggle = $('#gpAbAutoCycleToggle');
    if (toggle) toggle.checked = autoBossAutoCycle;
    const soloToggle = $('#gpAbSoloEscapeToggle');
    if (soloToggle) soloToggle.checked = autoBossSoloEscape;
    const endEquipToggle = $('#gpAbEndHelperEquipToggle');
    if (endEquipToggle) endEquipToggle.checked = autoBossEndHelperEquip;
    const ftToggle = $('#gpAbFightTimerToggle');
    if (ftToggle) ftToggle.checked = autoBossFightTimerEnabled;
    const ftMins = $('#gpAbFightTimerMins');
    if (ftMins) {
      ftMins.value = String(autoBossFightTimerMinutes);
      ftMins.disabled = !autoBossFightTimerEnabled;
    }
    syncAutoBossRunUi();
    return autoBossAutoCycle;
  }

  async function setAutoBossFightTimer({ enabled, minutes } = {}) {
    if (enabled !== undefined) autoBossFightTimerEnabled = !!enabled;
    if (minutes !== undefined) {
      autoBossFightTimerMinutes = Math.max(
        1,
        Math.min(300, Math.round(Number(minutes) || DEFAULT_FIGHT_TIMER_MIN))
      );
    }
    await chrome.storage.local.set({
      [STORAGE_KEY_AUTOBOSS_FIGHT_TIMER]: {
        enabled: autoBossFightTimerEnabled,
        minutes: autoBossFightTimerMinutes
      }
    });
    const ftToggle = $('#gpAbFightTimerToggle');
    if (ftToggle) ftToggle.checked = autoBossFightTimerEnabled;
    const ftMins = $('#gpAbFightTimerMins');
    if (ftMins) {
      ftMins.value = String(autoBossFightTimerMinutes);
      ftMins.disabled = !autoBossFightTimerEnabled;
    }
    syncAutoBossRunUi();
    setStatus(
      autoBossFightTimerEnabled
        ? 'Timer ON · ' + autoBossFightTimerMinutes + ' min por boss; se estourar → foge e recarrega.'
        : 'Timer OFF.',
      'ok'
    );
  }

  async function setAutoBossSoloEscape(enabled) {
    autoBossSoloEscape = !!enabled;
    await chrome.storage.local.set({
      [STORAGE_KEY_AUTOBOSS_SOLO_ESCAPE]: autoBossSoloEscape
    });
    const toggle = $('#gpAbSoloEscapeToggle');
    if (toggle) toggle.checked = autoBossSoloEscape;
    syncAutoBossRunUi();
    setStatus(
      autoBossSoloEscape
        ? 'Solo ON · 1 vivo na party aborta o boss e vai à cidade.'
        : 'Solo OFF.',
      'ok'
    );
  }

  async function setAutoBossEndHelperEquip(enabled) {
    autoBossEndHelperEquip = !!enabled;
    await chrome.storage.local.set({
      [STORAGE_KEY_AUTOBOSS_END_HELPER_EQUIP]: autoBossEndHelperEquip
    });
    const toggle = $('#gpAbEndHelperEquipToggle');
    if (toggle) toggle.checked = autoBossEndHelperEquip;
    syncAutoBossRunUi();
    setStatus(
      autoBossEndHelperEquip
        ? 'Amu/Anel ON · ao fim da fila ativa amuleto e anel no Helper Boss.'
        : 'Amu/Anel OFF · ao fim da fila desativa amuleto e anel no Helper Boss.',
      'ok'
    );
  }

  async function setAutoBossAutoCycle(enabled) {
    autoBossAutoCycle = !!enabled;
    const payload = {
      [STORAGE_KEY_AUTOBOSS_AUTO_CYCLE]: autoBossAutoCycle
    };
    if (!autoBossAutoCycle) {
      // Mantém âncora se já existir (só deixa de agendar).
    } else if (!autoBossCycleStartedAt && autoBossRun?.running) {
      autoBossCycleStartedAt = Date.now();
      payload[STORAGE_KEY_AUTOBOSS_CYCLE_STARTED_AT] = autoBossCycleStartedAt;
    }
    await chrome.storage.local.set(payload);
    const toggle = $('#gpAbAutoCycleToggle');
    if (toggle) toggle.checked = autoBossAutoCycle;
    syncAutoBossRunUi();
    setStatus(
      autoBossAutoCycle
        ? 'AutoBoss automático ON · reinicia todo dia a partir de 00:05.'
        : 'AutoBoss automático OFF.',
      'ok'
    );
  }

  async function armAutoBossCycleFromStart() {
    if (!autoBossAutoCycle) return;
    autoBossCycleStartedAt = Date.now();
    await chrome.storage.local.set({
      [STORAGE_KEY_AUTOBOSS_CYCLE_STARTED_AT]: autoBossCycleStartedAt
    });
  }

  function syncAutoBossRunUi() {
    const bar = $('#gpAbRunBar');
    const btn = $('#gpAbRunBtn');
    const meta = $('#gpAbRunMeta');
    const resetBtn = $('#gpAbResetTrack');
    const autoToggle = $('#gpAbAutoCycleToggle');
    const soloToggle = $('#gpAbSoloEscapeToggle');
    const run = autoBossRun || { running: false, queue: [], index: 0 };
    if (resetBtn) resetBtn.disabled = !!run.running;
    if (autoToggle) autoToggle.checked = !!autoBossAutoCycle;
    if (soloToggle) soloToggle.checked = !!autoBossSoloEscape;
    if (!bar || !btn || !meta) return;

    const show = isAutoBossOpen() && autoBossView === 'list' && autoBossTab === 'selected';
    bar.hidden = !show;
    if (!show) return;

    const eligible = getEligibleAutoBossQueue();
    const cycleHint = formatAutoBossCycleNext();

    if (run.running) {
      btn.textContent = 'Parar';
      btn.classList.add('is-stop');
      btn.disabled = false;
      const total = run.queue.length;
      const pos = Math.min((run.index || 0) + 1, Math.max(total, 1));
      const cur = run.queue[run.index] || run.queue.find((b) => b.id === run.currentId);
      let html = cur
        ? 'Fila <strong>' +
          pos +
          '/' +
          total +
          '</strong> · enfrentando <strong>' +
          escapeHtml(cur.name) +
          '</strong>'
        : 'Fila ativa · ' + total + ' boss(es)';
      if (cycleHint) html += '<br>' + cycleHint;
      meta.innerHTML = html;
      return;
    }

    btn.textContent = 'Iniciar';
    btn.classList.remove('is-stop');
    btn.disabled = eligible.length === 0;
    const activePreset = clampAutoBossPresetId(autoBossPresets.active);
    const presetPrefix = 'Pre Set ' + activePreset + ' · ';
    let text =
      eligible.length > 0
        ? presetPrefix +
          eligible.length +
          ' boss' +
          (eligible.length === 1 ? '' : 'es') +
          ' sem cooldown prontos'
        : autoBossPlaylist.length
          ? presetPrefix + 'Todos em cooldown neste pre set.'
          : 'Adicione bosses no Pre Set ' +
            activePreset +
            ' para iniciar.';
    if (cycleHint) {
      meta.innerHTML = escapeHtml(text) + '<br>' + cycleHint;
    } else {
      meta.textContent = text;
    }
  }

  async function disablePularBossForBossFight() {
    const mod = MODULES.find((m) => m.id === 'pular_boss');
    if (!mod) return;
    try {
      const data = await chrome.storage.local.get(mod.storageKey);
      if (!data[mod.storageKey]) {
        const toggle = mod.toggleId ? document.getElementById(mod.toggleId) : null;
        if (toggle) toggle.checked = false;
        return;
      }
      await chrome.storage.local.set({ [mod.storageKey]: false });
      const toggle = mod.toggleId ? document.getElementById(mod.toggleId) : null;
      if (toggle) toggle.checked = false;
      const response = await chrome.runtime.sendMessage({ type: mod.stopMsg });
      if (!response?.success) {
        throw new Error(response?.error || 'Falha ao desligar Pular Boss.');
      }
      await refreshModules();
      setStatus('Pular Boss desligado (modo boss).', 'ok');
    } catch (error) {
      setStatus(error?.message || 'Não foi possível desligar Pular Boss.', 'err');
    }
  }

  async function stopAutoBossRun(reason) {
    autoBossRunAdvancing = false;
    try {
      await chrome.storage.local.set({
        [STORAGE_KEY_AUTOBOSS_RUN]: { running: false },
        baiakIdleAutoBossEnabled: false
      });
      await chrome.runtime.sendMessage({ type: 'BAIAKIDLE_STOP_AUTOBOSS' });
    } catch (_) {}
    autoBossRun = { running: false, queue: [], index: 0, currentId: '' };
    syncAutoBossRunUi();
    if (reason) setStatus(reason, 'ok');
  }

  async function startAutoBossRun() {
    const auth = await syncAuth();
    if (!applyAuthUi(auth)) throw new Error('Faça login em tibiabot.online.');
    if (!isVipAuth(auth)) {
      throw new Error('VIP necessária. Ative um voucher ou compre o plano em Minha conta.');
    }
    if (auth.extensionOutdated) {
      throw new Error(auth.versionMessage || 'Atualize a extensão.');
    }

    await loadBossTrack();
    await loadAutoBossPlaylist();
    const queue = getEligibleAutoBossQueue();
    if (!queue.length) {
      throw new Error('Nenhum boss sem cooldown na playlist.');
    }

    await disablePularBossForBossFight();
    await saveAutoBossRun({
      running: true,
      queue,
      index: 0,
      currentId: queue[0].id
    });
    await chrome.storage.local.set({ baiakIdleAutoBossEnabled: true });

    const response = await chrome.runtime.sendMessage({
      type: 'BAIAKIDLE_START_AUTOBOSS'
    });
    if (!response?.success) {
      await saveAutoBossRun({ running: false });
      await chrome.storage.local.set({ baiakIdleAutoBossEnabled: false });
      throw new Error(response?.error || 'Falha ao iniciar módulo AutoBoss.');
    }

    await armAutoBossCycleFromStart();

    closeAutoBoss();
    close();
    requestCaptureCharacters('autoboss');
    setStatus(
      'AutoBoss iniciado · Pre Set ' +
        clampAutoBossPresetId(autoBossPresets.active) +
        ' · ' +
        queue.length +
        ' boss(es) na fila.' +
        (autoBossAutoCycle ? ' Ciclo automático diário (00:05) armado.' : ''),
      'ok'
    );
  }

  async function advanceAutoBossRunIfNeeded() {
    // Orquestração ficou no módulo MAIN (autoboss.js).
  }

  async function saveAutoBossPlaylist(list, presetId) {
    const pid = clampAutoBossPresetId(
      presetId == null ? autoBossPresets.active : presetId
    );
    if (!autoBossPresets.sets || typeof autoBossPresets.sets !== 'object') {
      autoBossPresets.sets = emptyAutoBossPresetSets();
    }
    autoBossPresets.sets[pid] = normalizePlaylist(list);
    applyActivePlaylistFromPresets();
    await chrome.storage.local.set({
      [STORAGE_KEY_AUTOBOSS_PRESETS]: {
        active: autoBossPresets.active,
        sets: autoBossPresets.sets
      },
      [STORAGE_KEY_AUTOBOSS_PLAYLIST]: autoBossPlaylist
    });
    syncAutoBossTabsUi();
    return autoBossPlaylist;
  }

  async function toggleBossInPlaylist(bossId, bossName, presetId) {
    const id = String(bossId || '').trim();
    const name = String(bossName || id).trim();
    const pid = clampAutoBossPresetId(
      presetId == null ? autoBossPresets.active : presetId
    );
    if (!id) return false;
    const list = getPresetPlaylist(pid);
    const exists = list.some((b) => b && b.id === id);
    let next;
    if (exists) {
      next = list.filter((b) => b.id !== id);
    } else {
      if (list.length >= AUTOBOSS_PLAYLIST_MAX) {
        throw new Error(
          'Limite de ' +
            AUTOBOSS_PLAYLIST_MAX +
            ' bosses no Pre Set ' +
            pid +
            '.'
        );
      }
      next = list.concat([{ id, name }]);
    }
    await saveAutoBossPlaylist(next, pid);
    return !exists;
  }

  function playlistToggleBtnHtml(boss, compact) {
    if (compact) {
      return (
        '<div class="gp-ab-preset-mini" role="group" aria-label="Pre sets">' +
        AUTOBOSS_PRESET_IDS.map((pid) => {
          const on = isBossInPreset(boss?.id, pid);
          const count = getPresetPlaylist(pid).length;
          const atMax = !on && count >= AUTOBOSS_PLAYLIST_MAX;
          return (
            '<button type="button" class="gp-ab-pl-btn ' +
            (on ? 'is-remove' : 'is-add') +
            '" data-boss-playlist="' +
            escapeHtml(boss.id) +
            '" data-boss-name="' +
            escapeHtml(boss.name) +
            '" data-boss-preset="' +
            pid +
            '"' +
            (atMax ? ' disabled' : '') +
            ' title="' +
            (atMax
              ? 'Pre Set ' + pid + ' cheio (' + AUTOBOSS_PLAYLIST_MAX + ')'
              : on
                ? 'Remover do Pre Set ' + pid
                : 'Adicionar no Pre Set ' + pid) +
            ' (' +
            count +
            '/' +
            AUTOBOSS_PLAYLIST_MAX +
            ')">' +
            pid +
            '</button>'
          );
        }).join('') +
        '</div>'
      );
    }

    return (
      '<div class="gp-ab-preset-block">' +
      '<div class="gp-ab-preset-title">Adicionar boss no auto boss</div>' +
      '<div class="gp-ab-preset-btns">' +
      AUTOBOSS_PRESET_IDS.map((pid) => {
        const on = isBossInPreset(boss?.id, pid);
        const count = getPresetPlaylist(pid).length;
        const atMax = !on && count >= AUTOBOSS_PLAYLIST_MAX;
        return (
          '<button type="button" class="gp-ab-playlist-btn ' +
          (on ? 'is-remove' : 'is-add') +
          '" data-boss-playlist="' +
          escapeHtml(boss.id) +
          '" data-boss-name="' +
          escapeHtml(boss.name) +
          '" data-boss-preset="' +
          pid +
          '"' +
          (atMax ? ' disabled' : '') +
          ' title="' +
          (atMax
            ? 'Limite de ' + AUTOBOSS_PLAYLIST_MAX + ' no Pre Set ' + pid
            : on
              ? 'Remover do Pre Set ' + pid
              : 'Adicionar no Pre Set ' + pid) +
          '">' +
          'Pre Set ' +
          pid +
          ' <span class="gp-ab-playlist-n">(' +
          count +
          '/' +
          AUTOBOSS_PLAYLIST_MAX +
          ')</span>' +
          '</button>'
        );
      }).join('') +
      '</div></div>'
    );
  }

  function getBossIndex(bossId) {
    return getBossCatalog().findIndex((b) => b && b.id === bossId);
  }

  function pruneBossTrackMap(map) {
    const now = Date.now();
    const next = {};
    const src = map && typeof map === 'object' ? map : {};
    for (const [id, row] of Object.entries(src)) {
      if (!row || typeof row !== 'object') continue;
      const expiresAt = effectiveBossCooldownExpiresAt(row);
      if (expiresAt && expiresAt <= now) continue;
      next[id] = row;
    }
    return next;
  }

  function getBossTrack(bossId) {
    const id = String(bossId || '');
    if (!id) return null;
    const row = bossTrackById[id];
    if (!row) return null;
    const exp = effectiveBossCooldownExpiresAt(row);
    if (exp && exp <= Date.now()) return null;
    return row;
  }

  function formatMsCountdown(expiresAt) {
    const left = Math.max(0, (Number(expiresAt) || 0) - Date.now());
    if (left <= 0) return '';
    const totalSec = Math.floor(left / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) return h + 'h ' + String(m).padStart(2, '0') + 'm';
    return m + 'm ' + String(s).padStart(2, '0') + 's';
  }

  function isBossTrackFinished(track) {
    return !!(track && (track.finished || track.killed || track.died));
  }

  function effectiveBossCooldownExpiresAt(track) {
    if (!track || typeof track !== 'object') return 0;
    const anchor =
      Number(track.finishedAt) || Number(track.startedAt) || Number(track.expiresAt) || 0;
    if (!anchor) return Number(track.expiresAt) || 0;
    // Reset diário 00:00; se ainda houver expiresAt antigo (24h), usa o que liberar antes.
    const daily = bossDailyCooldownExpiresAt(anchor);
    const stored = Number(track.expiresAt) || 0;
    if (stored > 0) return Math.min(stored, daily);
    return daily;
  }

  /** Em cooldown até a meia-noite seguinte (reset diário do jogo). */
  function isBossOnCooldown(track) {
    if (!isBossTrackFinished(track)) return false;
    return effectiveBossCooldownExpiresAt(track) > Date.now();
  }

  function bossFinishedLabel(track) {
    if (!isBossTrackFinished(track)) return '';
    if (track.outcome === 'death' || track.died) {
      return '<span class="gp-ab-skull" title="Morreu no boss">💀</span> Finalizado';
    }
    return '<span class="gp-ab-skull" title="Boss derrotado">☠</span> Finalizado';
  }

  function bossCardBadgesHtml(boss) {
    const track = getBossTrack(boss?.id);
    if (!track) return '<div class="gp-ab-card-badges"></div>';
    const parts = [];
    if (isBossTrackFinished(track)) {
      parts.push(
        track.outcome === 'death' || track.died
          ? '<span class="gp-ab-skull" title="Morreu no boss — finalizado">💀</span>'
          : '<span class="gp-ab-skull" title="Boss derrotado — finalizado">☠</span>'
      );
    }
    // Contador só quando realmente está em recarga pós kill/morte
    if (isBossOnCooldown(track)) {
      const cd = formatMsCountdown(effectiveBossCooldownExpiresAt(track));
      if (cd) {
        parts.push(
          '<span class="gp-ab-cd" data-boss-cd="' +
            escapeHtml(String(boss?.id || '')) +
            '" title="Recarga até 00:00">' +
            escapeHtml(cd) +
            '</span>'
        );
      }
    }
    return '<div class="gp-ab-card-badges">' + parts.join('') + '</div>';
  }

  async function clearBossTrackCounters() {
    bossTrackById = {};
    await chrome.storage.local.set({
      [STORAGE_KEY_BOSS_TRACK]: {
        byId: {},
        pendingId: null,
        pendingName: ''
      }
    });
    if (isAutoBossOpen()) {
      renderAutoBoss();
      syncAutoBossRunUi();
    }
    setStatus('Contadores de boss zerados.', 'ok');
  }

  async function loadBossTrack() {
    try {
      const data = await chrome.storage.local.get(STORAGE_KEY_BOSS_TRACK);
      const raw = data[STORAGE_KEY_BOSS_TRACK] || {};
      const byId = pruneBossTrackMap(raw.byId || {});
      bossTrackById = byId;
      return { byId, pendingId: raw.pendingId || null, pendingName: raw.pendingName || '' };
    } catch (_) {
      bossTrackById = {};
      return { byId: {}, pendingId: null, pendingName: '' };
    }
  }

  async function markBossConfrontStarted(bossId, bossName) {
    const id = String(bossId || '').trim();
    const name = String(bossName || '').trim();
    if (!id || !name) return;
    const now = Date.now();
    const row = {
      id,
      name,
      startedAt: now,
      expiresAt: bossDailyCooldownExpiresAt(now),
      finished: false,
      finishedAt: null,
      outcome: null,
      killed: false,
      died: false,
      killedAt: null,
      diedAt: null
    };
    const current = await loadBossTrack();
    const byId = pruneBossTrackMap({ ...current.byId, [id]: row });
    bossTrackById = byId;
    await chrome.storage.local.set({
      [STORAGE_KEY_BOSS_TRACK]: {
        byId,
        pendingId: id,
        pendingName: name
      }
    });
  }

  function refreshBossCountdownsInDom() {
    const body = $('#gpAbBody');
    if (!body || !isAutoBossOpen()) return;
    let expired = false;
    body.querySelectorAll('[data-boss-cd]').forEach((el) => {
      const id = el.getAttribute('data-boss-cd');
      const track = getBossTrack(id);
      if (!isBossOnCooldown(track)) {
        el.textContent = '';
        expired = true;
        return;
      }
      const text = formatMsCountdown(effectiveBossCooldownExpiresAt(track));
      el.textContent = text;
      if (!text) expired = true;
    });
    if (expired) {
      syncAutoBossRunUi();
    }
  }

  function syncBossTrackTimer() {
    if (bossTrackTimer) {
      clearInterval(bossTrackTimer);
      bossTrackTimer = null;
    }
    if (!isAutoBossOpen()) return;
    bossTrackTimer = setInterval(() => {
      if (!isAutoBossOpen()) {
        clearInterval(bossTrackTimer);
        bossTrackTimer = null;
        return;
      }
      // expira entradas e atualiza textos
      const before = Object.keys(bossTrackById).length;
      bossTrackById = pruneBossTrackMap(bossTrackById);
      if (Object.keys(bossTrackById).length !== before && autoBossView === 'list') {
        renderAutoBoss();
        return;
      }
      refreshBossCountdownsInDom();
    }, 1000);
  }

  async function confrontBoss(bossId, bossName, opts = {}) {
    const id = String(bossId || '').trim();
    const name = String(bossName || '').trim();
    if (!name) {
      setStatus('Boss inválido.', 'err');
      return;
    }
    setStatus('Abrindo Chefes → ' + name + '…', 'ok');
    try {
      await disablePularBossForBossFight();
      // Enfrentar manual cancela a fila automática do módulo.
      if (autoBossRun?.running && !opts.fromAutoRun) {
        await stopAutoBossRun('');
      }
      if (id) await markBossConfrontStarted(id, name);
      requestCaptureCharacters('boss');
      closeAutoBoss();
      const helperEquip = getBossHelperEquip(id);
      const response = await chrome.runtime.sendMessage({
        type: 'BAIAKIDLE_GO_BOSS',
        bossName: name,
        bossId: id,
        helperEquip
      });
      if (!response?.success) {
        throw new Error(response?.error || 'Falha ao localizar o boss no jogo.');
      }
      setStatus('Localizando ' + name + ' no menu de Chefes…', 'ok');
    } catch (error) {
      setStatus(error?.message || 'Erro ao enfrentar o boss.', 'err');
    }
  }

  function navigateAutoBoss(delta) {
    const bosses = getBossCatalog();
    if (!bosses.length || !autoBossSelectedId) return;
    const idx = getBossIndex(autoBossSelectedId);
    if (idx < 0) return;
    const next = idx + delta;
    if (next < 0 || next >= bosses.length) return;
    autoBossSelectedId = bosses[next].id;
    autoBossView = 'detail';
    renderAutoBoss();
    const body = $('#gpAbBody');
    if (body) body.scrollTop = 0;
  }

  let bossesEnsurePromise = null;

  function setAutoBossExpanded(open) {
    const root = document.getElementById(ROOT_ID);
    root?.classList.toggle('is-autoboss-open', !!open);
  }

  function isAutoBossOpen() {
    const modal = $('#gpAutoBossModal');
    return !!(modal && modal.classList.contains('is-open'));
  }

  function closeAutoBoss() {
    const modal = $('#gpAutoBossModal');
    const dialog = rootQueryDialog();
    if (dialog && !isHuntOpen() && !isCodexOpen()) dialog.style.overflow = '';
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.hidden = true;
    autoBossView = 'list';
    autoBossTab = 'catalog';
    autoBossSelectedId = '';
    autoBossSearchQuery = '';
    setAutoBossExpanded(false);
    syncBossTrackTimer();
    syncAutoBossTabsUi();
    syncAutoBossRunUi();
  }

  function rootQueryDialog() {
    return document.querySelector('#' + ROOT_ID + ' .gp-dialog');
  }

  async function ensureBossCatalogLoaded() {
    if (getBossCatalog().length) return true;
    if (bossesEnsurePromise) return bossesEnsurePromise;

    bossesEnsurePromise = (async () => {
      const response = await chrome.runtime.sendMessage({
        type: 'BAIAKIDLE_ENSURE_BOSSES'
      });
      if (!response?.success) {
        throw new Error(response?.error || 'Falha ao carregar catálogo de bosses.');
      }
      if (!getBossCatalog().length) {
        throw new Error('Catálogo de bosses vazio.');
      }
      return true;
    })().finally(() => {
      bossesEnsurePromise = null;
    });

    return bossesEnsurePromise;
  }

  async function openAutoBoss() {
    const modal = $('#gpAutoBossModal');
    const body = $('#gpAbBody');
    const title = $('#gpAbTitle');
    const back = $('#gpAbBack');
    if (!modal) return;
    closeHunt();
    closeCodex();
    setSettingsOpen(false);
    const dialog = rootQueryDialog();
    if (dialog) dialog.style.overflow = 'hidden';
    modal.hidden = false;
    modal.classList.add('is-open');
    setAutoBossExpanded(true);
    autoBossView = 'list';
    autoBossTab = 'catalog';
    autoBossSelectedId = '';
    autoBossSearchQuery = '';
    if (title) title.textContent = 'AutoBoss';
    if (back) back.hidden = true;
    syncAutoBossTabsUi();
    if (body) {
      body.innerHTML = '<p class="gp-ab-empty">Carregando catálogo de bosses…</p>';
    }

    try {
      await ensureBossCatalogLoaded();
      await loadBossTrack();
      await loadAutoBossPlaylist();
      await loadBossHelperEquip();
      await loadAutoBossRun();
      await loadAutoBossAutoCycle();
      if (!isAutoBossOpen()) return;
      renderAutoBoss();
      syncBossTrackTimer();
      syncAutoBossRunUi();
    } catch (error) {
      if (!isAutoBossOpen() || !body) return;
      body.innerHTML =
        '<p class="gp-ab-empty">' +
        escapeHtml(error?.message || 'Não foi possível carregar os bosses.') +
        '</p>';
      syncAutoBossRunUi();
    }
  }

  function renderAutoBoss() {
    const body = $('#gpAbBody');
    const title = $('#gpAbTitle');
    const back = $('#gpAbBack');
    if (!body || !title || !back) return;

    if (autoBossView === 'detail' && autoBossSelectedId) {
      const boss =
        (typeof window.BAIAK_IDLE_GET_BOSS === 'function'
          ? window.BAIAK_IDLE_GET_BOSS(autoBossSelectedId)
          : null) || getBossCatalog().find((b) => b.id === autoBossSelectedId);
      if (!boss) {
        autoBossView = 'list';
        autoBossSelectedId = '';
        renderAutoBoss();
        return;
      }

      title.textContent = boss.name;
      back.hidden = false;
      syncAutoBossTabsUi();

      const catalog = getBossCatalog();
      const bossIndex = getBossIndex(boss.id);
      const bossPos = bossIndex >= 0 ? bossIndex + 1 : 0;
      const canPrev = bossIndex > 0;
      const canNext = bossIndex >= 0 && bossIndex < catalog.length - 1;

      const resists = (boss.resistances || [])
        .map((r) => {
          const kindClass =
            r.kind === 'fraco' ? ' is-weak' : r.kind === 'resistente' ? ' is-resist' : '';
          return (
            '<div class="gp-ab-res" title="' +
            escapeHtml(r.element + ': ' + formatResistValue(r) + ' (' + r.kind + ')') +
            '">' +
            '<img src="' +
            escapeHtml(r.icon || huntElementIconUrl(r.element)) +
            '" alt="' +
            escapeHtml(r.element) +
            '">' +
            '<span>' +
            escapeHtml(huntElementLabel(r.element) || r.element) +
            '</span>' +
            '<b class="gp-ab-res-val' +
            kindClass +
            '">' +
            escapeHtml(formatResistValue(r)) +
            '</b>' +
            '</div>'
          );
        })
        .join('');

      const defenseRows = getBossDefenseElements(boss);
      const defenseHtml = defenseRows
        .map((d) => {
          const label = huntElementLabel(d.element) || d.element;
          return (
            '<div class="gp-ab-def" title="' +
            escapeHtml(label + ': ' + d.pct + '% do dano do boss') +
            '">' +
            '<img src="' +
            escapeHtml(d.icon || huntElementIconUrl(d.element)) +
            '" alt="' +
            escapeHtml(label) +
            '">' +
            '<span>' +
            escapeHtml(label) +
            '</span>' +
            '<b class="gp-ab-def-pct">' +
            d.pct +
            '%</b>' +
            '</div>'
          );
        })
        .join('');

      const combatBlock =
        resists || defenseHtml
          ? '<div class="gp-ab-combat">' +
            (resists
              ? '<div class="gp-ab-section"><h4 class="gp-ab-section-title">Resistências</h4><div class="gp-ab-res-grid">' +
                resists +
                '</div></div>'
              : '<div></div>') +
            (defenseHtml
              ? '<div class="gp-ab-section"><h4 class="gp-ab-section-title">BOSS ATACA:</h4><div class="gp-ab-def-grid">' +
                defenseHtml +
                '</div></div>'
              : '<div></div>') +
            '</div>'
          : '';

      const lootBlock = (label, items) => {
        if (!items || !items.length) return '';
        const thumbs = items
          .map((it) => {
            const title = escapeHtml(it.name);
            const media = it.image
              ? '<img alt="' + title + '" src="' + escapeHtml(it.image) + '" loading="lazy">'
              : '<span class="gp-ab-item-name">' + title + '</span>';
            return '<div class="gp-ab-item" title="' + title + '">' + media + '</div>';
          })
          .join('');
        return (
          '<div class="gp-ab-section">' +
          '<h4 class="gp-ab-section-title">DROP ' +
          escapeHtml(label) +
          '</h4>' +
          '<div class="gp-ab-loot">' +
          thumbs +
          '</div></div>'
        );
      };

      body.innerHTML =
        '<div class="gp-ab-nav">' +
        '<button type="button" class="gp-ab-nav-btn" data-boss-nav="prev"' +
        (canPrev ? '' : ' disabled') +
        ' aria-label="Boss anterior">‹ Anterior</button>' +
        '<span class="gp-ab-nav-pos">' +
        escapeHtml(String(bossPos)) +
        ' / ' +
        escapeHtml(String(catalog.length)) +
        '</span>' +
        '<button type="button" class="gp-ab-nav-btn" data-boss-nav="next"' +
        (canNext ? '' : ' disabled') +
        ' aria-label="Próximo boss">Próximo ›</button>' +
        '</div>' +
        '<div class="gp-ab-detail-head">' +
        bossSpriteHtml(boss, true) +
        '<div class="gp-ab-detail-meta">' +
        '<h4 class="gp-ab-detail-name">' +
        escapeHtml(boss.name) +
        '</h4>' +
        '<div class="gp-ab-rarity">' +
        (boss.rarityIcon
          ? '<img src="' + escapeHtml(boss.rarityIcon) + '" alt="">'
          : '') +
        escapeHtml(boss.rarityLabel || boss.rarity) +
        '</div>' +
        '</div></div>' +
        (function () {
          const track = getBossTrack(boss.id);
          if (!track || !isBossOnCooldown(track)) return '';
          const cd = formatMsCountdown(effectiveBossCooldownExpiresAt(track));
          return (
            '<div class="gp-ab-track-row">' +
            '<span>' +
            bossFinishedLabel(track) +
            '</span>' +
            (cd
              ? '<span class="gp-ab-cd" data-boss-cd="' +
                escapeHtml(boss.id) +
                '" title="Recarga até 00:00">' +
                escapeHtml(cd) +
                '</span>'
              : '') +
            '</div>'
          );
        })() +
        playlistToggleBtnHtml(boss, false) +
        bossHelperEquipHtml(boss.id) +
        '<button type="button" class="gp-ab-fight" data-boss-fight="' +
        escapeHtml(boss.id) +
        '" data-boss-name="' +
        escapeHtml(boss.name) +
        '">' +
        '<span class="gp-ab-fight-ico" aria-hidden="true">⚔</span>' +
        'Enfrentar' +
        '</button>' +
        '<div class="gp-ab-statrows">' +
        '<div class="gp-ab-statrow"><span>HP</span><b>' +
        escapeHtml(formatBossHp(boss.hp)) +
        '</b></div>' +
        '<div class="gp-ab-statrow"><span>Summons</span><b>' +
        escapeHtml((boss.summons || []).join(', ') || '—') +
        '</b></div>' +
        '</div>' +
        (combatBlock) +
        lootBlock('Common', boss.drops?.common) +
        lootBlock('Uncommon', boss.drops?.uncommon) +
        lootBlock('Semi-Rare', boss.drops?.semiRare) +
        lootBlock('Rare', boss.drops?.rare) +
        lootBlock('Very Rare', boss.drops?.veryRare);
      syncBossTrackTimer();
      syncAutoBossRunUi();
      return;
    }

    title.textContent = 'AutoBoss';
    back.hidden = true;
    syncAutoBossTabsUi();
    const bosses = getBossCatalog();
    if (!bosses.length) {
      body.innerHTML =
        '<p class="gp-ab-empty">Nenhum boss catalogado ainda. Envie o HTML da cyclopedia para adicionarmos.</p>';
      syncAutoBossRunUi();
      return;
    }

    if (autoBossTab === 'selected') {
      const activePreset = clampAutoBossPresetId(autoBossPresets.active);
      const selectedBosses = autoBossPlaylist
        .map((entry) => {
          const full =
            (typeof window.BAIAK_IDLE_GET_BOSS === 'function'
              ? window.BAIAK_IDLE_GET_BOSS(entry.id)
              : null) || bosses.find((b) => b.id === entry.id);
          return (
            full || {
              id: entry.id,
              name: entry.name || entry.id,
              sprite: '',
              rarity: '',
              rarityLabel: ''
            }
          );
        })
        .filter(Boolean);

      const freeBosses = selectedBosses.filter((boss) => !isBossOnCooldown(getBossTrack(boss.id)));
      const onCd = selectedBosses.length - freeBosses.length;

      const presetHeader =
        presetsTabsHtml() +
        '<div class="gp-ab-search-meta" style="margin:0 0 10px">Pre Set ' +
        escapeHtml(String(activePreset)) +
        ' · ' +
        escapeHtml(String(freeBosses.length)) +
        ' livre' +
        (freeBosses.length === 1 ? '' : 's') +
        ' sem cooldown' +
        (onCd > 0 ? ' · ' + escapeHtml(String(onCd)) + ' em recarga' : '') +
        '</div>';

      if (!selectedBosses.length) {
        body.innerHTML =
          presetHeader +
          '<p class="gp-ab-empty">Nenhum boss neste pre set. No detalhe do boss, escolha Pre Set 1, 2 ou 3.</p>';
        syncBossTrackTimer();
        syncAutoBossRunUi();
        return;
      }

      body.innerHTML =
        presetHeader +
        '<div class="gp-ab-grid">' +
        selectedBosses
          .map((boss) => {
            const track = getBossTrack(boss.id);
            return (
              '<div class="gp-ab-card' +
              (isBossOnCooldown(track) ? ' is-killed' : '') +
              '" role="button" tabindex="0" data-boss-id="' +
              escapeHtml(boss.id) +
              '">' +
              playlistToggleBtnHtml(boss, true) +
              bossSpriteHtml(boss, false) +
              bossCardBadgesHtml(boss) +
              '<span class="gp-ab-card-name">' +
              escapeHtml(boss.name) +
              '</span></div>'
            );
          })
          .join('') +
        '</div>';
      syncBossTrackTimer();
      syncAutoBossRunUi();
      return;
    }

    const filtered = filterBossCatalog(autoBossSearchQuery);
    const q = String(autoBossSearchQuery || '');
    const meta = q
      ? filtered.length +
        ' de ' +
        bosses.length +
        ' boss' +
        (bosses.length === 1 ? '' : 'es')
      : bosses.length + ' boss' + (bosses.length === 1 ? '' : 'es');

    const cards = filtered.length
      ? '<div class="gp-ab-grid">' +
        filtered
          .map((boss) => {
            const track = getBossTrack(boss.id);
            return (
              '<div class="gp-ab-card' +
              (isBossOnCooldown(track) ? ' is-killed' : '') +
              '" role="button" tabindex="0" data-boss-id="' +
              escapeHtml(boss.id) +
              '">' +
              playlistToggleBtnHtml(boss, true) +
              bossSpriteHtml(boss, false) +
              bossCardBadgesHtml(boss) +
              '<span class="gp-ab-card-name">' +
              escapeHtml(boss.name) +
              '</span></div>'
            );
          })
          .join('') +
        '</div>'
      : '<p class="gp-ab-empty">Nenhum boss encontrado para "' +
        escapeHtml(q) +
        '".</p>';

    body.innerHTML =
      '<div class="gp-ab-search">' +
      '<input type="search" id="gpAbSearch" placeholder="Pesquisar boss pelo nome…" value="' +
      escapeHtml(q) +
      '" autocomplete="off" spellcheck="false">' +
      '<div class="gp-ab-search-meta">' +
      escapeHtml(meta) +
      '</div></div>' +
      cards;

    const search = body.querySelector('#gpAbSearch');
    if (search) {
      const len = search.value.length;
      search.focus();
      try {
        search.setSelectionRange(len, len);
      } catch (_) {}
    }
    syncBossTrackTimer();
    syncAutoBossRunUi();
  }

  function setSettingsOpen(open) {
    const menu = $('#gpSettings');
    const gear = $('#gpGearBtn');
    if (!menu || !gear) return;
    menu.hidden = !open;
    menu.classList.toggle('is-open', !!open);
    gear.classList.toggle('is-open', !!open);
    gear.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      requestCaptureCharacters('settings');
      void renderCharactersList();
    }
  }

  function requestCaptureCharacters(reason) {
    try {
      window.dispatchEvent(
        new CustomEvent('tibia-bot-capture-characters', {
          detail: { reason: String(reason || 'ui') }
        })
      );
    } catch (_) {}
    try {
      void chrome.runtime.sendMessage({
        type: 'TIBIA_BOT_CAPTURE_CHARACTERS',
        reason: String(reason || 'ui')
      });
    } catch (_) {}
  }

  function normalizeCharactersForUi(raw) {
    const list = Array.isArray(raw?.list) ? raw.list : Array.isArray(raw) ? raw : [];
    return list
      .map((row) => {
        if (!row || typeof row !== 'object') return null;
        const name = String(row.name || '').trim();
        if (!name) return null;
        return {
          name,
          className: String(row.className || row.class || row.vocation || '').trim(),
          level: Math.max(0, parseInt(String(row.level || '0').replace(/[^\d]/g, ''), 10) || 0)
        };
      })
      .filter(Boolean)
      .sort((a, b) => String(a.name).localeCompare(String(b.name), 'pt-BR'));
  }

  async function renderCharactersList() {
    const box = $('#gpCharactersList');
    if (!box) return;
    try {
      const data = await chrome.storage.local.get(STORAGE_KEY_CHARACTERS);
      const list = normalizeCharactersForUi(data[STORAGE_KEY_CHARACTERS]);
      if (!list.length) {
        box.innerHTML =
          '<p class="gp-settings-chars-empty">Nenhum personagem capturado ainda.</p>';
        return;
      }
      box.innerHTML = list
        .map((c) => {
          const metaParts = [];
          if (c.className) metaParts.push(escapeHtml(c.className));
          metaParts.push(c.level > 0 ? 'lvl ' + c.level : 'lvl —');
          return (
            '<div class="gp-settings-char">' +
            '<div class="gp-settings-char-name">' +
            escapeHtml(c.name) +
            '</div>' +
            '<div class="gp-settings-char-meta">' +
            metaParts.join(' · ') +
            '</div>' +
            '</div>'
          );
        })
        .join('');
    } catch (_) {
      box.innerHTML =
        '<p class="gp-settings-chars-empty">Não foi possível carregar personagens.</p>';
    }
  }

  async function syncOverlayToggleUi() {
    const toggle = $('#gpOverlayToggle');
    if (!toggle) return;
    try {
      const data = await chrome.storage.local.get(STORAGE_KEY_OVERLAY_VISIBLE);
      const visible =
        data[STORAGE_KEY_OVERLAY_VISIBLE] === undefined
          ? true
          : !!data[STORAGE_KEY_OVERLAY_VISIBLE];
      toggle.checked = visible;
    } catch (_) {
      toggle.checked = true;
    }
  }

  async function syncOcultarNomesToggleUi() {
    const toggle = $('#gpOcultarNomesToggle');
    if (!toggle) return;
    try {
      const data = await chrome.storage.local.get(STORAGE_KEY_OCULTAR_NOMES);
      toggle.checked = !!data[STORAGE_KEY_OCULTAR_NOMES];
      toggle.disabled = !isVipAuth(lastAuth) || !!lastAuth.extensionOutdated;
    } catch (_) {
      toggle.checked = false;
    }
  }

  async function applyOcultarNomesToggle(enabled) {
    const toggle = $('#gpOcultarNomesToggle');
    try {
      if (toggle) toggle.disabled = true;
      const auth = await syncAuth();
      if (!applyAuthUi(auth)) throw new Error('Faça login em tibiabot.online.');
      if (!isVipAuth(auth)) {
        throw new Error('VIP necessária. Ative um voucher ou compre o plano em Minha conta.');
      }
      if (auth.extensionOutdated) {
        throw new Error(auth.versionMessage || 'Atualize a extensão.');
      }

      await chrome.storage.local.set({ [STORAGE_KEY_OCULTAR_NOMES]: !!enabled });
      const response = await chrome.runtime.sendMessage({
        type: enabled ? 'BAIAKIDLE_START_OCULTAR_NOMES' : 'BAIAKIDLE_STOP_OCULTAR_NOMES'
      });
      if (!response?.success) {
        throw new Error(response?.error || 'Falha ao aplicar Ocultar nomes.');
      }
      if (enabled) requestCaptureCharacters('ocultar_nomes');
      void renderCharactersList();
      setStatus(enabled ? 'Nomes ocultos.' : 'Nomes restaurados.', 'ok');
    } catch (error) {
      console.error('[Tibia Bot game-panel]', error);
      if (toggle) toggle.checked = !enabled;
      await chrome.storage.local.set({ [STORAGE_KEY_OCULTAR_NOMES]: !enabled });
      setStatus(error.message || 'Erro ao alterar ocultar nomes.', 'err');
    } finally {
      if (toggle) toggle.disabled = !isVipAuth(lastAuth) || !!lastAuth.extensionOutdated;
    }
  }

  function bindOnce() {
    if (bound) return;
    bound = true;
    void loadAutoBossRun();
    void loadAutoBossAutoCycle();
    void loadCodexPlaylist().then(() => {
      void loadCodexOverlayEnabled();
    });
    const root = ensureDom();

    root.addEventListener('click', (ev) => {
      if (ev.target?.closest?.('[data-gp-close]')) {
        setSettingsOpen(false);
        close();
        return;
      }

      const gear = ev.target?.closest?.('#gpGearBtn');
      if (gear) {
        ev.preventDefault();
        ev.stopPropagation();
        const menu = $('#gpSettings');
        setSettingsOpen(!!menu?.hidden);
        return;
      }

      if (!ev.target?.closest?.('#gpSettings') && !ev.target?.closest?.('#gpGearBtn')) {
        setSettingsOpen(false);
      }
    });

    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && root.classList.contains('is-open')) {
        if (isAutoBossOpen()) {
          if (autoBossView === 'detail') {
            autoBossView = 'list';
            autoBossSelectedId = '';
            renderAutoBoss();
            return;
          }
          closeAutoBoss();
          return;
        }
        if (isHuntOpen()) {
          closeHunt();
          return;
        }
        if (isCodexOpen()) {
          closeCodex();
          return;
        }
        const menu = $('#gpSettings');
        if (menu && !menu.hidden) {
          setSettingsOpen(false);
          return;
        }
        close();
      }
    });

    $('#gpAutoBossBtn')?.addEventListener('click', () => {
      openAutoBoss();
    });

    $('#gpHuntBtn')?.addEventListener('click', () => {
      void openHunt();
    });

    $('#gpHuntClose')?.addEventListener('click', () => {
      closeHunt();
    });

    $('#gpCodexBtn')?.addEventListener('click', () => {
      openCodex();
    });

    $('#gpCodexClose')?.addEventListener('click', () => {
      closeCodex();
    });

    $('#gpCodexModal')?.addEventListener('click', (ev) => {
      const tabBtn = ev.target?.closest?.('#gpCodexTabs .gp-cx-tab[data-cx-tab]');
      if (!tabBtn) return;
      const tab = tabBtn.getAttribute('data-cx-tab') || 'catalog';
      if (tab !== 'catalog' && tab !== 'selected') return;
      currentCodexTab = tab;
      syncCodexTabsUi();
      renderCodexList();
    });

    $('#gpCodexModal')?.addEventListener('change', (ev) => {
      if (ev.target?.id !== 'gpCodexEnabledToggle') return;
      void applyCodexEnabledToggle(!!ev.target.checked);
    });

    $('#gpCodexModal')?.addEventListener('click', (ev) => {
      if (ev.target?.id !== 'gpCodexOverlayBtn' && !ev.target?.closest?.('#gpCodexOverlayBtn')) {
        return;
      }
      void applyCodexOverlayToggle(!codexOverlayEnabled);
    });

    $('#gpAbClose')?.addEventListener('click', () => {
      closeAutoBoss();
    });

    $('#gpAbBack')?.addEventListener('click', () => {
      autoBossView = 'list';
      autoBossSelectedId = '';
      renderAutoBoss();
    });

    // Delegação no modal: abas + Iniciar/Parar + zerar contadores (hot-reload safe).
    $('#gpAutoBossModal')?.addEventListener('click', (ev) => {
      const resetBtn = ev.target?.closest?.('#gpAbResetTrack');
      if (resetBtn) {
        ev.preventDefault();
        if (autoBossRun?.running) {
          setStatus('Pare o AutoBoss antes de zerar os contadores.', 'err');
          return;
        }
        void clearBossTrackCounters();
        return;
      }
      const runBtn = ev.target?.closest?.('#gpAbRunBtn');
      if (runBtn) {
        ev.preventDefault();
        void (async () => {
          try {
            runBtn.disabled = true;
            if (autoBossRun?.running) {
              await stopAutoBossRun('AutoBoss parado.');
              return;
            }
            autoBossTab = 'selected';
            autoBossView = 'list';
            syncAutoBossTabsUi();
            renderAutoBoss();
            await startAutoBossRun();
          } catch (error) {
            setStatus(error?.message || 'Erro ao iniciar AutoBoss.', 'err');
          } finally {
            syncAutoBossRunUi();
          }
        })();
        return;
      }
      const tabBtn = ev.target?.closest?.('#gpAbTabs .gp-ab-tab[data-ab-tab]');
      if (!tabBtn) return;
      const tab = tabBtn.getAttribute('data-ab-tab') || 'catalog';
      if (tab !== 'catalog' && tab !== 'selected') return;
      autoBossTab = tab;
      autoBossView = 'list';
      autoBossSelectedId = '';
      void (async () => {
        if (tab === 'selected') {
          await loadBossTrack();
          await loadAutoBossPlaylist();
        }
        if (!isAutoBossOpen()) return;
        renderAutoBoss();
        syncAutoBossRunUi();
      })();
    });

    $('#gpAutoBossModal')?.addEventListener('change', (ev) => {
      const cycleToggle = ev.target?.closest?.('#gpAbAutoCycleToggle');
      if (cycleToggle) {
        void setAutoBossAutoCycle(!!cycleToggle.checked).catch((error) => {
          cycleToggle.checked = !cycleToggle.checked;
          setStatus(error?.message || 'Erro ao alterar Automático.', 'err');
        });
        return;
      }
      const soloToggle = ev.target?.closest?.('#gpAbSoloEscapeToggle');
      if (soloToggle) {
        void setAutoBossSoloEscape(!!soloToggle.checked).catch((error) => {
          soloToggle.checked = !soloToggle.checked;
          setStatus(error?.message || 'Erro ao alterar Solo.', 'err');
        });
        return;
      }
      const timerToggle = ev.target?.closest?.('#gpAbFightTimerToggle');
      if (timerToggle) {
        void setAutoBossFightTimer({ enabled: !!timerToggle.checked }).catch((error) => {
          timerToggle.checked = !timerToggle.checked;
          setStatus(error?.message || 'Erro ao alterar Timer.', 'err');
        });
        return;
      }
      const endEquipToggle = ev.target?.closest?.('#gpAbEndHelperEquipToggle');
      if (endEquipToggle) {
        void setAutoBossEndHelperEquip(!!endEquipToggle.checked).catch((error) => {
          endEquipToggle.checked = !endEquipToggle.checked;
          setStatus(error?.message || 'Erro ao alterar Amu/Anel.', 'err');
        });
      }
    });

    $('#gpAutoBossModal')?.addEventListener('change', (ev) => {
      const mins = ev.target?.closest?.('#gpAbFightTimerMins');
      if (!mins) return;
      const n = Math.max(1, Math.min(300, Math.round(Number(mins.value) || DEFAULT_FIGHT_TIMER_MIN)));
      mins.value = String(n);
      void setAutoBossFightTimer({ minutes: n }).catch((error) => {
        setStatus(error?.message || 'Erro ao salvar minutos do Timer.', 'err');
      });
    });

    $('#gpAbBody')?.addEventListener('input', (ev) => {
      const input = ev.target?.closest?.('#gpAbSearch');
      if (!input || autoBossView !== 'list') return;
      autoBossSearchQuery = String(input.value || '');
      renderAutoBoss();
    });

    $('#gpAbBody')?.addEventListener('keydown', (ev) => {
      if (ev.key !== 'Escape') return;
      const input = ev.target?.closest?.('#gpAbSearch');
      if (!input || autoBossView !== 'list') return;
      if (!autoBossSearchQuery) return;
      ev.stopPropagation();
      autoBossSearchQuery = '';
      renderAutoBoss();
    });

    $('#gpAbBody')?.addEventListener('click', (ev) => {
      const helperBtn = ev.target?.closest?.('[data-boss-helper][data-boss-id]');
      if (helperBtn) {
        ev.preventDefault();
        ev.stopPropagation();
        const bossId = helperBtn.getAttribute('data-boss-id') || '';
        const key = helperBtn.getAttribute('data-boss-helper') || '';
        const cur = getBossHelperEquip(bossId);
        const nextVal = key === 'ssa' ? !cur.ssa : key === 'mightRing' ? !cur.mightRing : null;
        if (nextVal == null) return;
        void (async () => {
          const cfg = await setBossHelperEquipFlag(bossId, key, nextVal);
          const label = key === 'ssa' ? 'Stone Skin Amulet' : 'Might Ring';
          setStatus(
            label + ' ' + (cfg[key] ? 'ativo' : 'inativo') + ' neste boss.',
            'ok'
          );
          if (isAutoBossOpen() && autoBossView === 'detail') renderAutoBoss();
        })();
        return;
      }
      const playlistBtn = ev.target?.closest?.('[data-boss-playlist]');
      if (playlistBtn) {
        ev.preventDefault();
        ev.stopPropagation();
        const bossId = playlistBtn.getAttribute('data-boss-playlist') || '';
        const bossName = playlistBtn.getAttribute('data-boss-name') || bossId;
        const presetRaw = playlistBtn.getAttribute('data-boss-preset');
        const presetId =
          presetRaw != null && presetRaw !== ''
            ? clampAutoBossPresetId(presetRaw)
            : clampAutoBossPresetId(autoBossPresets.active);
        void (async () => {
          try {
            const added = await toggleBossInPlaylist(bossId, bossName, presetId);
            setStatus(
              added
                ? bossName + ' adicionado no Pre Set ' + presetId + '.'
                : bossName + ' removido do Pre Set ' + presetId + '.',
              'ok'
            );
            if (isAutoBossOpen()) renderAutoBoss();
          } catch (error) {
            setStatus(error?.message || 'Não foi possível alterar o pre set.', 'err');
          }
        })();
        return;
      }
      const presetTab = ev.target?.closest?.('[data-ab-preset]');
      if (presetTab) {
        ev.preventDefault();
        ev.stopPropagation();
        const pid = clampAutoBossPresetId(presetTab.getAttribute('data-ab-preset'));
        void (async () => {
          await setActiveAutoBossPreset(pid);
          if (isAutoBossOpen()) renderAutoBoss();
          setStatus('Pre Set ' + pid + ' ativo para iniciar.', 'ok');
        })();
        return;
      }
      const fightBtn = ev.target?.closest?.('.gp-ab-fight[data-boss-name]');
      if (fightBtn && !fightBtn.disabled) {
        ev.preventDefault();
        const bossName = fightBtn.getAttribute('data-boss-name') || '';
        const bossId = fightBtn.getAttribute('data-boss-fight') || '';
        fightBtn.disabled = true;
        void confrontBoss(bossId, bossName).finally(() => {
          try {
            fightBtn.disabled = false;
          } catch (_) {}
        });
        return;
      }
      const navBtn = ev.target?.closest?.('.gp-ab-nav-btn[data-boss-nav]');
      if (navBtn && !navBtn.disabled) {
        const dir = navBtn.getAttribute('data-boss-nav');
        if (dir === 'prev') navigateAutoBoss(-1);
        else if (dir === 'next') navigateAutoBoss(1);
        return;
      }
      const card = ev.target?.closest?.('.gp-ab-card[data-boss-id]');
      if (!card) return;
      autoBossSelectedId = card.getAttribute('data-boss-id') || '';
      if (!autoBossSelectedId) return;
      autoBossView = 'detail';
      renderAutoBoss();
    });

    $('#gpOverlayToggle')?.addEventListener('change', async (ev) => {
      const visible = !!ev.target.checked;
      try {
        await chrome.storage.local.set({ [STORAGE_KEY_OVERLAY_VISIBLE]: visible });
        setStatus(visible ? 'Overlay visível.' : 'Overlay oculto.', 'ok');
      } catch (error) {
        ev.target.checked = !visible;
        setStatus(error.message || 'Erro ao alterar overlay.', 'err');
      }
    });

    $('#gpOcultarNomesToggle')?.addEventListener('change', (ev) => {
      void applyOcultarNomesToggle(!!ev.target.checked);
    });

    for (const mod of MODULES) {
      if (mod.hidden || !mod.toggleId) continue;
      const toggle = document.getElementById(mod.toggleId);
      toggle?.addEventListener('change', () => {
        applyToggle(mod, !!toggle.checked);
      });
    }

    $('#gpGoldMediaRun')?.addEventListener('click', () => {
      void runGoldMediaOnce();
    });

    window.addEventListener('message', (event) => {
      if (event.source !== window) return;
      const data = event.data;
      if (!data || data.source !== 'TIBIA_BOT_MAIN') return;
      if (data.type !== 'MODULE_STATUS') return;
      const p = data.payload;
      if (!p || p.moduleId !== 'kills_hora') return;
      renderKillsHistory(p);
    });

    $('#gpVenderLootBossToggle')?.addEventListener('change', (ev) => {
      void applyVenderLootBossToggle(!!ev.target.checked);
    });

    $('#gpMoverTiers')?.addEventListener('click', (ev) => {
      const btn = ev.target?.closest?.('.gp-tier-chip');
      if (!btn || btn.disabled) return;
      const tier = Number(btn.getAttribute('data-tier'));
      if (!Number.isFinite(tier)) return;
      void toggleMoverTier(tier);
    });

    const staminaMin = $('#gpStaminaMinPct');
    const staminaMax = $('#gpStaminaMaxPct');
    if (staminaMin && !staminaMin.dataset.bound) {
      staminaMin.dataset.bound = '1';
      staminaMax.dataset.bound = '1';
      const onStaminaChange = () => {
        void saveStaminaConfigFromInputs();
      };
      staminaMin.addEventListener('input', () => {
        updateStaminaWarn(staminaMin.value);
      });
      staminaMin.addEventListener('change', onStaminaChange);
      staminaMax.addEventListener('change', onStaminaChange);
    }

    const autoSellMin = $('#gpAutoSellMinPct');
    if (autoSellMin && !autoSellMin.dataset.bound) {
      autoSellMin.dataset.bound = '1';
      autoSellMin.addEventListener('change', () => {
        void saveAutoSellConfigFromInputs();
      });
    }

    const anuncioChannel = $('#gpAutoAnuncioChannel');
    const anuncioInterval = $('#gpAutoAnuncioInterval');
    const anuncioText = $('#gpAutoAnuncioText');
    if (anuncioChannel && !anuncioChannel.dataset.bound) {
      anuncioChannel.dataset.bound = '1';
      if (anuncioInterval) anuncioInterval.dataset.bound = '1';
      if (anuncioText) anuncioText.dataset.bound = '1';
      const saveAnuncio = () => {
        void saveAutoAnuncioConfigFromInputs();
      };
      anuncioChannel.addEventListener('change', saveAnuncio);
      anuncioInterval?.addEventListener('change', saveAnuncio);
      anuncioText?.addEventListener('input', () => {
        updateAutoAnuncioCount(anuncioText.value);
      });
      anuncioText?.addEventListener('change', saveAnuncio);
    }

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== 'local') return;
      if (changes[STORAGE_KEY_OVERLAY_VISIBLE]) {
        const toggle = $('#gpOverlayToggle');
        if (toggle) {
          const visible =
            changes[STORAGE_KEY_OVERLAY_VISIBLE].newValue === undefined
              ? true
              : !!changes[STORAGE_KEY_OVERLAY_VISIBLE].newValue;
          toggle.checked = visible;
        }
      }
      if (changes[STORAGE_KEY_OCULTAR_NOMES]) {
        const toggle = $('#gpOcultarNomesToggle');
        if (toggle) toggle.checked = !!changes[STORAGE_KEY_OCULTAR_NOMES].newValue;
      }
      if (changes[STORAGE_KEY_CHARACTERS]) {
        void renderCharactersList();
      }
      if (changes[STORAGE_KEY_BOSS_TRACK]) {
        const raw = changes[STORAGE_KEY_BOSS_TRACK].newValue || {};
        bossTrackById = pruneBossTrackMap(raw.byId || {});
        if (isAutoBossOpen()) {
          renderAutoBoss();
          syncBossTrackTimer();
        } else {
          syncAutoBossRunUi();
        }
      }
      if (changes[STORAGE_KEY_AUTOBOSS_RUN]) {
        autoBossRun = normalizeAutoBossRun(changes[STORAGE_KEY_AUTOBOSS_RUN].newValue);
        syncAutoBossRunUi();
        if (isAutoBossOpen() && autoBossView === 'list' && autoBossTab === 'selected') {
          renderAutoBoss();
        }
      }
      if (changes[STORAGE_KEY_AUTOBOSS_PRESETS]) {
        const normalized = normalizeAutoBossPresets(
          changes[STORAGE_KEY_AUTOBOSS_PRESETS].newValue,
          autoBossPlaylist
        );
        autoBossPresets = { active: normalized.active, sets: normalized.sets };
        applyActivePlaylistFromPresets();
        syncAutoBossTabsUi();
        syncAutoBossRunUi();
        if (isAutoBossOpen()) {
          renderAutoBoss();
        }
      } else if (changes[STORAGE_KEY_AUTOBOSS_PLAYLIST]) {
        // Lista antiga espelhando o ativo (ou edição legada)
        const list = normalizePlaylist(
          changes[STORAGE_KEY_AUTOBOSS_PLAYLIST].newValue
        );
        const active = clampAutoBossPresetId(autoBossPresets.active);
        if (!autoBossPresets.sets) autoBossPresets.sets = emptyAutoBossPresetSets();
        autoBossPresets.sets[active] = list;
        autoBossPlaylist = list;
        syncAutoBossTabsUi();
        syncAutoBossRunUi();
        if (isAutoBossOpen() && autoBossView === 'list') {
          renderAutoBoss();
        }
      }
      if (
        changes[STORAGE_KEY_AUTOBOSS_AUTO_CYCLE] ||
        changes[STORAGE_KEY_AUTOBOSS_CYCLE_STARTED_AT] ||
        changes[STORAGE_KEY_AUTOBOSS_SOLO_ESCAPE] ||
        changes[STORAGE_KEY_AUTOBOSS_END_HELPER_EQUIP]
      ) {
        if (changes[STORAGE_KEY_AUTOBOSS_AUTO_CYCLE]) {
          autoBossAutoCycle = !!changes[STORAGE_KEY_AUTOBOSS_AUTO_CYCLE].newValue;
        }
        if (changes[STORAGE_KEY_AUTOBOSS_CYCLE_STARTED_AT]) {
          autoBossCycleStartedAt =
            Number(changes[STORAGE_KEY_AUTOBOSS_CYCLE_STARTED_AT].newValue) || 0;
        }
        if (changes[STORAGE_KEY_AUTOBOSS_SOLO_ESCAPE]) {
          autoBossSoloEscape = !!changes[STORAGE_KEY_AUTOBOSS_SOLO_ESCAPE].newValue;
        }
        if (changes[STORAGE_KEY_AUTOBOSS_END_HELPER_EQUIP]) {
          autoBossEndHelperEquip = !!changes[STORAGE_KEY_AUTOBOSS_END_HELPER_EQUIP].newValue;
        }
        const toggle = $('#gpAbAutoCycleToggle');
        if (toggle) toggle.checked = autoBossAutoCycle;
        const soloToggle = $('#gpAbSoloEscapeToggle');
        if (soloToggle) soloToggle.checked = autoBossSoloEscape;
        const endEquipToggle = $('#gpAbEndHelperEquipToggle');
        if (endEquipToggle) endEquipToggle.checked = autoBossEndHelperEquip;
        syncAutoBossRunUi();
      }
      if (changes[STORAGE_KEY_BOSS_HELPER_EQUIP]) {
        bossHelperEquipById = normalizeBossHelperEquipMap(
          changes[STORAGE_KEY_BOSS_HELPER_EQUIP].newValue
        );
        if (isAutoBossOpen() && autoBossView === 'detail') {
          renderAutoBoss();
        }
      }
      if (
        changes.tibiaBotLoggedIn ||
        changes.tibiaBotVip ||
        changes.tibiaBotContaStatus ||
        changes.tibiaBotUser ||
        changes.tibiaBotExtensionOutdated
      ) {
        void refreshOpenUi();
      }
      if (
        changes[STORAGE_KEY_SELECTED_HUNT] ||
        changes[STORAGE_KEY_HUNT_RANK] ||
        changes.baiakIdlePularBossEnabled ||
        changes.baiakIdleMemberDeadEnabled ||
        changes.baiakIdleRetornarHuntEnabled ||
        changes.baiakIdleAutoSellEnabled ||
        changes[STORAGE_KEY_AUTO_SELL_VENDER_LOOT_BOSS] ||
        changes[STORAGE_KEY_AUTO_ANUNCIO_ENABLED] ||
        changes[STORAGE_KEY_AUTO_ANUNCIO_CONFIG] ||
        changes[STORAGE_KEY_STAMINA_ENABLED] ||
        changes[STORAGE_KEY_STAMINA_CONFIG] ||
        changes[STORAGE_KEY_MOVER_ENABLED] ||
        changes[STORAGE_KEY_MOVER_TIERS]
      ) {
        const rootEl = document.getElementById(ROOT_ID);
        if (rootEl?.classList.contains('is-open')) {
          void refreshModules();
          if (changes[STORAGE_KEY_SELECTED_HUNT]) {
            selectedHunt = changes[STORAGE_KEY_SELECTED_HUNT].newValue || null;
            updateHuntActiveLabel();
            renderHuntList();
          }
        }
      }
      if (changes[STORAGE_KEY_CODEX_ENABLED]) {
        codexEnabled = changes[STORAGE_KEY_CODEX_ENABLED].newValue !== false;
        syncCodexEnableUi();
      }
      if (changes[STORAGE_KEY_CODEX_OVERLAY]) {
        codexOverlayEnabled = !!changes[STORAGE_KEY_CODEX_OVERLAY].newValue;
        syncCodexOverlayBtn();
        syncCodexStatusOverlay();
      }
      if (changes[STORAGE_KEY_CODEX_PLAYLIST] && codexOverlayEnabled) {
        void loadCodexPlaylist().then(() => {
          if (codexOverlayEnabled) renderCodexStatusOverlay();
        });
      }
      if (changes[STORAGE_KEY_SELECTED_HUNT] && codexOverlayEnabled) {
        selectedHunt = changes[STORAGE_KEY_SELECTED_HUNT].newValue || selectedHunt;
        renderCodexStatusOverlay();
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') return;
      const panelOpen = !!document.getElementById(ROOT_ID)?.classList.contains('is-open');
      // Revalida ao voltar à aba: Free (pode ter ativado VIP) ou painel aberto
      if (!isVipAuth(lastAuth) || panelOpen) {
        void refreshOpenUi();
      }
    });
  }

  async function refreshOpenUi() {
    const auth = await syncAuth();
    applyAuthUi(auth);
    await syncOverlayToggleUi();
    await syncOcultarNomesToggleUi();
    if (auth.loggedIn && !auth.extensionOutdated) {
      await initHuntPicker();
      await refreshModules();
    }
  }

  async function open() {
    ensureDom();
    bindOnce();
    const root = document.getElementById(ROOT_ID);
    root?.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
    setSettingsOpen(false);
    setStatus('');
    await refreshOpenUi();
  }

  function close() {
    closeAutoBoss();
    closeHunt();
    closeCodex();
    setSettingsOpen(false);
    const root = document.getElementById(ROOT_ID);
    root?.classList.remove('is-open', 'is-hunt-open', 'is-codex-open', 'is-autoboss-open');
    document.documentElement.style.overflow = '';
  }

  window.TibiaBotGamePanel = { open, close };

  window.addEventListener('tibiabot:open-panel', () => {
    void open();
  });
})();
