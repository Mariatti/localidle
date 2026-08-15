/**
 * Hold / captura da URL do index (document_start, MAIN).
 *
 * NÃO usamos DNR para bloquear o index: chunks (ex. WebGLRenderer) reimportam
 * o entry com circular dependency — se o index for bloqueado, o jogo morre.
 *
 * Anti dual-client:
 * 1) Neutraliza <script src=index-*> do HTML antes de rodar
 * 2) Import map: URL de rede do index → blob único (mesmo module graph)
 * 3) Flag global + inject 1x
 */
(function () {
  if (window.__tibiaBotPresencaBoot) return;

  const INDEX_RE = /\/assets\/index-[A-Za-z0-9_-]+\.js(?:\?.*)?$/i;
  const INDEX_IN_TEXT_RE =
    /(?:https?:\/\/[^"'\\\s]+)?\/jogar\/assets\/index-[A-Za-z0-9_-]+\.js/i;
  const UNCLAIMED_RELEASE_MS = 45000;
  const CLAIMED_STUCK_MS = 60000;

  const state = {
    pendingUrl: '',
    held: false,
    claimed: false,
    released: false,
    missed: false,
    patched: false,
    clientInjected: false,
    reason: '',
    injectKind: '',
    clientBlobUrl: ''
  };

  const waiters = [];
  let releaseInFlight = null;
  let injectSeq = 0;
  let stuckTimer = null;

  function isIndexBundle(url) {
    try {
      return INDEX_RE.test(String(url || ''));
    } catch (_) {
      return false;
    }
  }

  function absUrl(url) {
    try {
      return new URL(String(url), location.href).href;
    } catch (_) {
      return String(url || '');
    }
  }

  function scriptSrc(el) {
    if (!el) return '';
    try {
      const a = el.getAttribute && el.getAttribute('src');
      if (a) return String(a);
    } catch (_) {}
    try {
      return String(el.src || '');
    } catch (_) {
      return '';
    }
  }

  function flushWaiters(result) {
    while (waiters.length) {
      try {
        waiters.shift()(result);
      } catch (_) {}
    }
  }

  function rememberUrl(url, how) {
    const abs = absUrl(url);
    if (!isIndexBundle(abs) && !isIndexBundle(url)) return false;
    if (!state.pendingUrl) {
      state.pendingUrl = isIndexBundle(abs) ? abs : absUrl(url);
      state.held = true;
      state.missed = false;
      state.reason = how || 'held';
      flushWaiters({ ok: true, reason: state.reason, url: state.pendingUrl });
    } else {
      state.held = true;
    }
    return true;
  }

  function discoverIndexUrl() {
    if (state.pendingUrl) return state.pendingUrl;

    try {
      const list = document.getElementsByTagName('script');
      for (let i = 0; i < list.length; i++) {
        const el = list[i];
        if (el && el.dataset && el.dataset.tbPresenceClient === '1') continue;
        const src = scriptSrc(el);
        if (src && isIndexBundle(src)) {
          rememberUrl(src, 'held_dom');
          break;
        }
      }
    } catch (_) {}

    if (state.pendingUrl) return state.pendingUrl;

    try {
      const entries = performance.getEntriesByType('resource') || [];
      for (let i = 0; i < entries.length; i++) {
        const n = entries[i] && entries[i].name;
        if (n && isIndexBundle(n)) {
          rememberUrl(n, 'held_perf');
          break;
        }
      }
    } catch (_) {}

    if (state.pendingUrl) return state.pendingUrl;

    try {
      const html = String(
        document.documentElement && document.documentElement.outerHTML
          ? document.documentElement.outerHTML
          : ''
      );
      const m = html.match(INDEX_IN_TEXT_RE);
      if (m && m[0]) rememberUrl(m[0], 'held_html');
    } catch (_) {}

    try {
      const links = document.querySelectorAll(
        'link[rel="modulepreload"], link[rel="preload"][as="script"]'
      );
      for (let i = 0; i < links.length; i++) {
        const href = links[i].getAttribute('href') || links[i].href || '';
        if (href && isIndexBundle(href)) {
          rememberUrl(href, 'held_link');
          break;
        }
      }
    } catch (_) {}

    return state.pendingUrl || '';
  }

  function killNetworkIndexScripts() {
    try {
      const list = document.getElementsByTagName('script');
      for (let i = list.length - 1; i >= 0; i--) {
        const el = list[i];
        if (!el) continue;
        if (el.dataset && el.dataset.tbPresenceClient === '1') continue;
        if (el.dataset && el.dataset.tbPresenceImportMap === '1') continue;
        const src = scriptSrc(el);
        if (!src || !isIndexBundle(src)) continue;

        rememberUrl(src, 'held_kill');

        try {
          el.dataset.tbPresencaHold = '1';
        } catch (_) {}
        try {
          el.type = 'text/plain';
        } catch (_) {}
        try {
          el.removeAttribute('src');
        } catch (_) {}
        try {
          el.remove();
        } catch (_) {}
      }
    } catch (_) {}

    try {
      const links = document.querySelectorAll('link[rel="modulepreload"], link[rel="preload"]');
      for (let i = links.length - 1; i >= 0; i--) {
        const el = links[i];
        const href = el.getAttribute('href') || el.href || '';
        if (!href || !isIndexBundle(href)) continue;
        rememberUrl(href, 'held_preload');
        try {
          el.remove();
        } catch (_) {}
      }
    } catch (_) {}
  }

  function noteIndexUrl(url, how) {
    const ok = rememberUrl(url, how);
    if (ok) killNetworkIndexScripts();
    return ok;
  }

  function tryHoldFromElement(el) {
    if (!el || el.tagName !== 'SCRIPT') return false;
    if (el.dataset && el.dataset.tbPresenceClient === '1') return false;
    const src = scriptSrc(el);
    if (!src || !isIndexBundle(src)) return false;
    noteIndexUrl(src, 'held_dom');
    return true;
  }

  function scanAndHold() {
    // depois do client, nunca matar nosso importmap/blob
    if (state.clientInjected) return true;
    killNetworkIndexScripts();
    discoverIndexUrl();
    try {
      const list = document.getElementsByTagName('script');
      for (let i = 0; i < list.length; i++) {
        tryHoldFromElement(list[i]);
      }
    } catch (_) {}
    return !!state.held && !!state.pendingUrl;
  }

  function scheduleStuckRelease() {
    if (stuckTimer) clearTimeout(stuckTimer);
    stuckTimer = setTimeout(() => {
      stuckTimer = null;
      if (!state.clientInjected && !window.__tibiaBotGameClientInjected) {
        try {
          console.warn('[Tibia Bot] Timeout claim — liberando client original (1x)');
        } catch (_) {}
        void releaseOriginal(true);
      }
    }, CLAIMED_STUCK_MS);
  }

  function absolutizeRelativeSpecifiers(code, baseDir) {
    if (!baseDir) return String(code || '');
    let out = String(code || '');
    const repl = (full, quote, rel) => {
      try {
        return full.replace(quote + rel + quote, quote + new URL(rel, baseDir).href + quote);
      } catch (_) {
        return full;
      }
    };
    // dynamic import("./x")
    out = out.replace(/import\s*\(\s*(["'])(\.\/[^"'?#]+)\1\s*\)/g, repl);
    // from "./x"
    out = out.replace(/from\s*(["'])(\.\/[^"'?#]+)\1/g, repl);
    // side-effect import "./x"
    out = out.replace(
      /(?:^|[;\s{(])import\s*(["'])(\.\/[^"'?#]+)\1/g,
      (full, quote, rel) => {
        try {
          return full.replace(quote + rel + quote, quote + new URL(rel, baseDir).href + quote);
        } catch (_) {
          return full;
        }
      }
    );
    return out;
  }

  function prepareClientCode(code, baseDir) {
    let out = absolutizeRelativeSpecifiers(code, baseDir);
    out = out.replace(/\/\/[#@]\s*sourceMappingURL\s*=\s*[^\n\r]*/g, '');
    out = out.replace(/\/\/[#@]\s*sourceURL\s*=\s*[^\n\r]*/g, '');
    out += '\n//# sourceURL=tibia-bot-game-client.js\n';
    return out;
  }

  /** Specifiers que chunks usam para reimportar o entry. */
  function indexImportAliases(indexUrl) {
    const aliases = new Set();
    const abs = absUrl(indexUrl);
    if (!abs) return [];
    aliases.add(abs);
    try {
      const u = new URL(abs);
      aliases.add(u.pathname);
      if (u.pathname.startsWith('/')) {
        aliases.add(u.pathname.slice(1));
      }
      // sem query
      u.search = '';
      u.hash = '';
      aliases.add(u.href);
      aliases.add(u.pathname);
    } catch (_) {}
    return [...aliases].filter(Boolean);
  }

  /**
   * Import map: qualquer import da URL de rede do index resolve para o MESMO blob.
   * Assim WebGLRenderer ↔ index circular usa 1 grafo e 1 WebSocket.
   * NÃO revogar o blob URL (map continua apontando nele).
   */
  function installImportMap(indexUrl, blobUrl) {
    const aliases = indexImportAliases(indexUrl);
    if (!aliases.length) return false;
    const imports = {};
    for (let i = 0; i < aliases.length; i++) {
      imports[aliases[i]] = blobUrl;
    }
    try {
      // remove map anterior nosso
      const old = document.querySelector('script[data-tb-presence-import-map="1"]');
      if (old) old.remove();
    } catch (_) {}
    try {
      const im = document.createElement('script');
      im.type = 'importmap';
      im.dataset.tbPresenceImportMap = '1';
      im.textContent = JSON.stringify({ imports: imports });
      const parent = document.head || document.documentElement;
      // importmap precisa vir antes de qualquer module
      parent.insertBefore(im, parent.firstChild);
      return true;
    } catch (err) {
      try {
        console.warn('[Tibia Bot] importmap falhou', err);
      } catch (_) {}
      return false;
    }
  }

  function injectClientBlob(code, kind) {
    if (state.clientInjected || window.__tibiaBotGameClientInjected) {
      return false;
    }

    const js = String(code || '');
    if (!js) return false;

    const indexUrl = state.pendingUrl || discoverIndexUrl();
    const seq = ++injectSeq;
    window.__tibiaBotGameClientInjected = true;
    state.clientInjected = true;
    state.injectKind = kind || 'unknown';
    if (kind === 'patch') {
      state.patched = true;
      state.claimed = true;
    } else {
      state.released = true;
    }
    if (stuckTimer) {
      clearTimeout(stuckTimer);
      stuckTimer = null;
    }

    try {
      killNetworkIndexScripts();

      const blob = new Blob([js], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      state.clientBlobUrl = url;

      if (indexUrl) {
        installImportMap(indexUrl, url);
      }

      const s = document.createElement('script');
      s.type = 'module';
      s.crossOrigin = 'anonymous';
      s.dataset.tbPresenceClient = '1';
      s.dataset.tbPresenceKind = kind || 'unknown';
      if (kind === 'patch') s.dataset.tbPresencePatched = '1';
      // src = blob: single entry. Chunks usam rede; reimport do index → importmap → blob.
      s.src = url;
      s.onerror = () => {
        if (seq !== injectSeq) return;
        if (kind === 'patch' && !state.released) {
          window.__tibiaBotGameClientInjected = false;
          state.clientInjected = false;
          state.patched = false;
          state.claimed = false;
          void releaseOriginal(true);
        }
      };
      (document.head || document.documentElement).appendChild(s);
      try {
        console.log(
          '[Tibia Bot] Client único injetado (' +
            (kind || '?') +
            ') seq=' +
            seq +
            (indexUrl ? ' +importmap' : '')
        );
      } catch (_) {}
      return true;
    } catch (_) {
      window.__tibiaBotGameClientInjected = false;
      state.clientInjected = false;
      state.patched = false;
      return false;
    }
  }

  function markPatched() {
    state.patched = true;
    state.claimed = true;
    state.clientInjected = true;
    window.__tibiaBotGameClientInjected = true;
    killNetworkIndexScripts();
  }

  function claim() {
    if (state.clientInjected || state.patched || window.__tibiaBotGameClientInjected) {
      return { ok: false, reason: 'already_injected', url: '' };
    }
    if (state.claimed) {
      if (state.pendingUrl) {
        return { ok: true, reason: 'already_claimed', url: state.pendingUrl };
      }
      return { ok: false, reason: 'already_claimed_empty', url: '' };
    }
    scanAndHold();
    discoverIndexUrl();
    if (!state.pendingUrl) {
      return { ok: false, reason: 'empty', url: '' };
    }
    state.claimed = true;
    state.held = true;
    scheduleStuckRelease();
    return { ok: true, reason: 'ok', url: state.pendingUrl };
  }

  function waitForHold(timeoutMs) {
    const ms = Math.max(100, Number(timeoutMs) || 12000);
    if (state.clientInjected || window.__tibiaBotGameClientInjected) {
      return Promise.resolve({ ok: false, reason: 'already_injected', url: '' });
    }
    scanAndHold();
    if (state.pendingUrl) {
      state.held = true;
      return Promise.resolve({ ok: true, reason: 'held', url: state.pendingUrl });
    }

    return new Promise((resolve) => {
      let settled = false;
      const finish = (result) => {
        if (settled) return;
        settled = true;
        resolve(result);
      };
      waiters.push(finish);
      const started = Date.now();
      const iv = setInterval(() => {
        scanAndHold();
        if (state.pendingUrl) {
          clearInterval(iv);
          finish({ ok: true, reason: 'held', url: state.pendingUrl });
          return;
        }
        if (Date.now() - started >= ms) {
          clearInterval(iv);
          discoverIndexUrl();
          if (state.pendingUrl) {
            finish({ ok: true, reason: 'held_late', url: state.pendingUrl });
          } else {
            finish({ ok: false, reason: 'timeout', url: '' });
          }
        }
      }, 40);
    });
  }

  async function resolveIndexUrl() {
    scanAndHold();
    let url = state.pendingUrl || discoverIndexUrl();
    if (url) return url;
    try {
      const res = await fetch(location.href, {
        credentials: 'include',
        cache: 'no-cache',
        mode: 'cors'
      });
      if (res.ok) {
        const html = await res.text();
        const m = String(html).match(INDEX_IN_TEXT_RE);
        if (m && m[0]) {
          rememberUrl(m[0], 'held_page_fetch');
          return state.pendingUrl;
        }
      }
    } catch (_) {}
    return '';
  }

  async function releaseOriginal(force) {
    if (state.clientInjected || window.__tibiaBotGameClientInjected) {
      return false;
    }
    if (state.claimed && !force) return false;

    if (releaseInFlight) return releaseInFlight;

    releaseInFlight = (async () => {
      if (force) state.claimed = false;

      const url = await resolveIndexUrl();
      if (!url) {
        state.missed = true;
        state.reason = 'no_url';
        try {
          console.warn('[Tibia Bot] releaseOriginal: sem URL do index');
        } catch (_) {}
        return false;
      }

      try {
        const res = await fetch(url, {
          credentials: 'include',
          cache: 'force-cache',
          mode: 'cors'
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        let code = await res.text();

        let baseDir = '';
        try {
          const u = new URL(url);
          const path = u.pathname || '/';
          const i = path.lastIndexOf('/');
          u.pathname = i >= 0 ? path.slice(0, i + 1) : '/';
          u.search = '';
          u.hash = '';
          baseDir = u.href;
        } catch (_) {}

        code = prepareClientCode(code, baseDir);

        if (state.clientInjected || window.__tibiaBotGameClientInjected) {
          return false;
        }

        const ok = injectClientBlob(code, 'original');
        if (ok) {
          state.released = true;
          state.reason = force ? 'release_force' : 'release_timeout';
          flushWaiters({ ok: false, reason: 'released', url: '' });
        }
        return ok;
      } catch (err) {
        try {
          console.warn('[Tibia Bot] releaseOriginal falhou', err);
        } catch (_) {}
        return false;
      } finally {
        releaseInFlight = null;
      }
    })();

    return releaseInFlight;
  }

  function prepareAndInject(code, kind, baseDir) {
    return injectClientBlob(prepareClientCode(code, baseDir || ''), kind || 'patch');
  }

  function getState() {
    return {
      held: state.held,
      claimed: state.claimed,
      released: state.released,
      missed: state.missed,
      patched: state.patched,
      clientInjected: state.clientInjected,
      pendingUrl: state.pendingUrl,
      reason: state.reason,
      injectKind: state.injectKind
    };
  }

  try {
    const proto = HTMLScriptElement.prototype;
    const desc = Object.getOwnPropertyDescriptor(proto, 'src');
    if (desc && desc.configurable && desc.set && desc.get) {
      Object.defineProperty(proto, 'src', {
        configurable: true,
        enumerable: desc.enumerable,
        get: function () {
          return desc.get.call(this);
        },
        set: function (v) {
          if (isIndexBundle(v) && !(this.dataset && this.dataset.tbPresenceClient === '1')) {
            noteIndexUrl(v, 'held_src');
            return;
          }
          return desc.set.call(this, v);
        }
      });
    }
  } catch (_) {}

  try {
    const origSetAttr = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function (name, value) {
      if (
        this instanceof HTMLScriptElement &&
        String(name).toLowerCase() === 'src' &&
        isIndexBundle(value) &&
        !(this.dataset && this.dataset.tbPresenceClient === '1')
      ) {
        noteIndexUrl(value, 'held_setattr');
        return;
      }
      return origSetAttr.call(this, name, value);
    };
  } catch (_) {}

  try {
    const mo = new MutationObserver(() => {
      if (!state.clientInjected) scanAndHold();
    });
    mo.observe(document.documentElement || document, {
      childList: true,
      subtree: true
    });
    setTimeout(() => {
      try {
        mo.disconnect();
      } catch (_) {}
    }, CLAIMED_STUCK_MS + 10000);
  } catch (_) {}

  scanAndHold();
  setInterval(() => {
    if (state.clientInjected) return;
    scanAndHold();
  }, 80);

  setTimeout(() => {
    if (!state.clientInjected && !state.claimed) {
      void releaseOriginal(true);
    }
  }, UNCLAIMED_RELEASE_MS);

  window.__tibiaBotPresencaBoot = {
    claim,
    releaseOriginal,
    markPatched,
    waitForHold,
    getState,
    isIndexBundle,
    scanAndHold,
    injectClientBlob,
    prepareAndInject,
    prepareClientCode,
    noteIndexUrl,
    discoverIndexUrl
  };
})();
