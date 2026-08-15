/* TB-WM u=179 e=a07d5b4cfa x=f2e5047b9289 t=1786720286 s=feeb71f243bd32cc */
(function(){try{window.__TIBIABOT_WM__={u:179,t:1786720286,x:"f2e5047b9289",s:"feeb71f243bd32cc"};}catch(e){}})();

// MÃ³dulo Baiak Idle (MAIN): PresenÃ§a
// Reescreve o index-* UMA vez e injeta sÃ³ blob (rede do index estÃ¡ bloqueada via DNR).
// Nunca 2Â° client.

(function () {
  const FLAG = '__tibiaBotPresencePatch';
  if (window[FLAG] && (window[FLAG].done || window[FLAG].running)) return;
  if (window.__tibiaBotGameClientInjected) {
    window[FLAG] = { done: true, ok: false, reason: 'already_client' };
    return;
  }

  const boot = window.__tibiaBotPresencaBoot;
  if (!boot || typeof boot.claim !== 'function') {
    window[FLAG] = { done: true, ok: false, reason: 'no_boot' };
    return;
  }

  window[FLAG] = { running: true, done: false, ok: false, reason: 'waiting_hold' };

  function absoluteUrl(url) {
    try {
      return new URL(String(url), location.href).href;
    } catch (_) {
      return String(url || '');
    }
  }

  function moduleDirUrl(moduleUrl) {
    try {
      const u = new URL(absoluteUrl(moduleUrl));
      u.hash = '';
      u.search = '';
      const path = u.pathname || '/';
      const i = path.lastIndexOf('/');
      u.pathname = i >= 0 ? path.slice(0, i + 1) : '/';
      return u.href;
    } catch (_) {
      return location.origin + '/jogar/assets/';
    }
  }

  function rewriteGameBundle(code) {
    let out = String(code || '');
    let hits = 0;

    function apply(next) {
      if (next !== out) {
        hits += 1;
        out = next;
      }
    }

    // Enforce OFF: trocar a expressÃ£o inteira (inclui rt()/jt()), nunca sÃ³
    // "antibot_presence_enforce===!0"â"!1" (vira "rt().!1" â SyntaxError).
    apply(out.split('rt().antibot_presence_enforce===!0').join('!1'));
    apply(out.split('jt().antibot_presence_enforce===!0').join('!1'));
    apply(
      out
        .split('antibot_presence_enforce===!0')
        .join('antibot_presence_enforce===!1')
    );
    apply(
      out
        .split('antibot_presence_enforce===true')
        .join('antibot_presence_enforce===false')
    );
    // Cura se um patch antigo jÃ¡ tiver gerado "rt().!1" / "jt().!1".
    apply(out.split('rt().!1').join('!1'));
    apply(out.split('jt().!1').join('!1'));

    apply(
      out.replace(
        /\.note\(\s*([A-Za-z_$][\w$]*)\.isTrusted\s*===\s*!0\s*,/g,
        '.note(!0,'
      )
    );
    apply(
      out.replace(
        /\.note\(\s*([A-Za-z_$][\w$]*)\.isTrusted\s*==\s*!0\s*,/g,
        '.note(!0,'
      )
    );

    // Minifiers mudam b8/xL â y7/W$ etc.; aceitar qualquer id.
    apply(
      out.replace(
        /isPresent:\s*\(\)\s*=>\s*[A-Za-z_$][\w$]*\s*\?\s*[A-Za-z_$][\w$]*\.isPresent\(\s*performance\.now\(\)\s*\)\s*:\s*!0/g,
        'isPresent:()=>!0'
      )
    );

    // rX/sX (build antigo) ou Mie/Iie (build atual)
    apply(
      out.replace(
        /function (rX|Mie)\(([A-Za-z_$][\w$]*)\)\{return!\2\.enforce\|\|\2\.system\?!1:!\2\.present\}/g,
        'function $1($2){return!1}'
      )
    );
    apply(
      out.replace(
        /function (sX|Iie)\(([A-Za-z_$][\w$]*)\)\{return!\2\.system&&!\2\.present\}/g,
        'function $1($2){return!1}'
      )
    );

    apply(out.split('const oX=5e3').join('const oX=864e5'));
    apply(out.split('const oX=5000').join('const oX=864e5'));

    return { code: out, hits };
  }

  function absolutizeRelativeImports(code, baseDir) {
    const base = String(baseDir || '');
    if (!base) return { code, count: 0 };
    let count = 0;
    const next = String(code).replace(
      /import\s*\(\s*(["'])(\.\/[^"'?#]+)\1\s*\)/g,
      (full, quote, rel) => {
        try {
          const abs = new URL(rel, base).href;
          count += 1;
          return 'import(' + quote + abs + quote + ')';
        } catch (_) {
          return full;
        }
      }
    );
    return { code: next, count };
  }

  async function run() {
    try {
      if (window.__tibiaBotGameClientInjected) {
        window[FLAG] = { done: true, ok: false, reason: 'already_client' };
        return;
      }

      let wait = { ok: false, reason: 'no_wait' };
      if (typeof boot.waitForHold === 'function') {
        wait = await boot.waitForHold(12000);
      } else {
        const st = boot.getState ? boot.getState() : {};
        wait =
          st.held && st.pendingUrl
            ? { ok: true, url: st.pendingUrl }
            : { ok: false, reason: 'empty' };
      }

      if (!wait || !wait.ok) {
        // tenta descobrir URL de outro jeito antes de falhar
        try {
          if (typeof boot.discoverIndexUrl === 'function') boot.discoverIndexUrl();
          else if (typeof boot.scanAndHold === 'function') boot.scanAndHold();
        } catch (_) {}
        const st0 = boot.getState ? boot.getState() : null;
        if (!st0 || !st0.pendingUrl) {
          window[FLAG] = {
            done: true,
            ok: false,
            reason: (wait && wait.reason) || 'hold_fail',
            boot: st0
          };
          try {
            if (boot.releaseOriginal) await boot.releaseOriginal(true);
          } catch (_) {}
          return;
        }
      }

      if (window.__tibiaBotGameClientInjected) {
        window[FLAG] = { done: true, ok: false, reason: 'already_client' };
        return;
      }

      let claimed = boot.claim();
      // claim "already_claimed" com URL ainda Ã© usÃ¡vel
      if (claimed && claimed.reason === 'already_claimed' && claimed.url) {
        claimed = { ok: true, reason: 'reclaim', url: claimed.url };
      }
      if (!claimed || !claimed.ok || !claimed.url) {
        window[FLAG] = {
          done: true,
          ok: false,
          reason: (claimed && claimed.reason) || 'claim_fail',
          boot: boot.getState ? boot.getState() : null
        };
        try {
          if (boot.releaseOriginal) await boot.releaseOriginal(true);
        } catch (_) {}
        return;
      }

      window[FLAG] = {
        running: true,
        done: false,
        ok: false,
        reason: 'fetching',
        url: claimed.url
      };

      const abs = absoluteUrl(claimed.url);
      const baseDir = moduleDirUrl(abs);

      // fetch = xmlhttprequest (nÃ£o bloqueado pelo DNR de script)
      const res = await fetch(abs, {
        credentials: 'include',
        cache: 'force-cache',
        mode: 'cors'
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);

      const raw = await res.text();
      let { code, hits } = rewriteGameBundle(raw);
      const absImp = absolutizeRelativeImports(code, baseDir);
      code = absImp.code;

      if (window.__tibiaBotGameClientInjected) {
        window[FLAG] = { done: true, ok: false, reason: 'race_already_client' };
        return;
      }

      // Ãnica injeÃ§Ã£o de client â via boot (marca global + strip sourcemap)
      let injected = false;
      if (typeof boot.prepareAndInject === 'function') {
        injected = !!boot.prepareAndInject(code, 'patch', baseDir);
      } else if (typeof boot.injectClientBlob === 'function') {
        injected = !!boot.injectClientBlob(code, 'patch');
      } else {
        // fallback legacy
        if (typeof boot.markPatched === 'function') boot.markPatched();
        const blob = new Blob([code], { type: 'text/javascript' });
        const blobUrl = URL.createObjectURL(blob);
        const s = document.createElement('script');
        s.type = 'module';
        s.crossOrigin = 'anonymous';
        s.dataset.tbPresencePatched = '1';
        s.dataset.tbPresenceClient = '1';
        s.src = blobUrl;
        window.__tibiaBotGameClientInjected = true;
        (document.head || document.documentElement).appendChild(s);
        injected = true;
      }

      if (!injected) {
        window[FLAG] = {
          done: true,
          ok: false,
          reason: 'inject_skipped',
          boot: boot.getState ? boot.getState() : null
        };
        try {
          if (boot.releaseOriginal) await boot.releaseOriginal(true);
        } catch (_) {}
        return;
      }

      window[FLAG] = {
        done: true,
        ok: true,
        reason: 'injected',
        url: abs,
        baseDir,
        rewritten: hits > 0,
        hits,
        importFixes: absImp.count,
        bytes: code.length
      };

      if (hits === 0) {
        console.warn(
          '[Tibia Bot] Presence: bundle sem padrÃµes conhecidos (anti-bot pode ter mudado).'
        );
      } else {
        try {
          console.log('[Tibia Bot] Presence: index reescrito, hits=' + hits);
        } catch (_) {}
      }
    } catch (err) {
      console.warn('[Tibia Bot] Presence falhou, liberando index original:', err);
      window[FLAG] = {
        done: true,
        ok: false,
        reason: 'fetch_fail',
        error: String(err && err.message ? err.message : err)
      };
      try {
        if (boot.releaseOriginal) {
          const r = boot.releaseOriginal(true);
          if (r && typeof r.then === 'function') await r;
        }
      } catch (_) {}
    }
  }

  void run();
})();
