/* TB-WM u=179 e=a07d5b4cfa x=f2e5047b9289 t=1786720277 s=6aedb4030ab616b0 */
(function(){try{window.__TIBIABOT_WM__={u:179,t:1786720277,x:"f2e5047b9289",s:"6aedb4030ab616b0"};}catch(e){}})();

// Seletores Baiak Idle â centralizados para todos os mÃ³dulos
// Uso: window.BaiakIdleSeletores.findElement(BaiakIdleSeletores.AUTO_SELL.SELL_ALL, 'SELL_ALL')
// Sempre sobrescreve (versÃ£o sobe) para nÃ£o ficar preso em build antigo na pÃ¡gina.

(function () {
        const VERSION = 30;

    class BaiakIdleSeletores {
        static get VERSION() {
            return VERSION;
        }

        static get DEBUG() {
            return Boolean(window.__BAIAKIDLE_SELECTORS_DEBUG);
        }

        /**
         * MantÃ©m a janela de âpresenÃ§a humanaâ do jogo quente.
         * O antibot sÃ³ conta pointer/key/touch (nÃ£o el.click puro).
         * Com o patch de presenÃ§a, isTrusted deixa de importar.
         */
        static pulseHumanPresence() {
            try {
                const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
                const x = 8 + Math.floor((now / 17) % 40);
                const y = 8 + Math.floor((now / 23) % 40);
                const base = {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: x,
                    clientY: y,
                    screenX: x,
                    screenY: y,
                    pointerId: 1,
                    pointerType: 'mouse',
                    isPrimary: true,
                    button: 0,
                    buttons: 1
                };
                const target = document.body || document.documentElement || window;
                try {
                    target.dispatchEvent(new PointerEvent('pointermove', base));
                } catch (_) {
                    try {
                        target.dispatchEvent(new MouseEvent('mousemove', base));
                    } catch (__) {}
                }
                try {
                    target.dispatchEvent(new PointerEvent('pointerdown', base));
                } catch (_) {
                    try {
                        target.dispatchEvent(new MouseEvent('mousedown', base));
                    } catch (__) {}
                }
                try {
                    window.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            bubbles: true,
                            cancelable: true,
                            key: 'Shift',
                            code: 'ShiftLeft',
                            keyCode: 16,
                            which: 16
                        })
                    );
                } catch (_) {}
                return true;
            } catch (_) {
                return false;
            }
        }

        /**
         * Clique preferindo presenÃ§a + fallback el.click().
         * @param {Element|null} el
         * @returns {boolean}
         */
        static safeClick(el) {
            if (!el) return false;
            try {
                this.pulseHumanPresence();
            } catch (_) {}
            try {
                if (!this.isClickable(el)) return false;
            } catch (_) {}
            try {
                el.click();
                return true;
            } catch (_) {
                return false;
            }
        }

        // ====================================================================
        // PULAR BOSS
        // ====================================================================
        static get PULAR_BOSS() {
            return {
                BOSSBAR_FRAME: [
                    '.bossbar-frame'
                ],
                BOSSBAR_HP: [
                    '.bossbar-hp'
                ]
            };
        }

        // ====================================================================
        // MEMBER DEAD (membro morto no party)
        // ====================================================================
        static get MEMBER_DEAD() {
            return {
                MEMBER: [
                    '.member.dead',
                    'div.member.dead'
                ]
            };
        }

        // ====================================================================
        // OCULTAR NOMES (party + nickname da conta)
        // ====================================================================
        static get OCULTAR_NOMES() {
            return {
                PARTY_LIST: [
                    '#party-list',
                    '#party-list.party',
                    'div#party-list.party',
                    '.party'
                ],
                MEMBER_NAME: [
                    '.m-name',
                    'span.m-name'
                ],
                /** Nomes da party com escopo completo (fallback se PARTY_LIST falhar) */
                MEMBER_NAME_SCOPED: [
                    '#party-list .m-name',
                    '#party-list.party .m-name',
                    'div#party-list.party .m-name',
                    '.party .m-name'
                ],
                HUD_NICK: [
                    '#hud-nick',
                    'div#hud-nick.hud-nick',
                    '.hud-nick'
                ],
                MEMBER: [
                    '#party-list .member',
                    '.party .member',
                    'div.member'
                ],
                MEMBER_LEVEL: [
                    '.m-lvl',
                    '.m-level',
                    '[data-level]',
                    '[data-lvl]'
                ],
                MEMBER_META: [
                    '.m-meta',
                    'div.m-meta',
                    '#party-list .m-meta',
                    '.party .m-meta'
                ],
                HUD_LEVEL: [
                    '#hud-level',
                    '#hud-lvl',
                    '.hud-level',
                    '.hud-lvl'
                ],
                HUD_GOLD: [
                    'b#hud-gold',
                    '#hud-gold'
                ],
                HUD_COINS: [
                    'b#hud-coins',
                    '#hud-coins'
                ],
                STAMINA_PANEL: [
                    'section#stamina-panel',
                    '#stamina-panel',
                    'section.panel#stamina-panel'
                ]
            };
        }

        // ====================================================================
        // HUNTS / TELEPORTES
        // Abre o menu: clicar #wave-title â aparece #teleport-menu.tp-menu
        // OpÃ§Ãµes do menu (data-tp):
        //   city | exercise | offline-exercise | hunts | offline-hunt | boss
        // Fluxo cidade: WAVE_TITLE â TP_CITY â confirma wave-title "Cidade"
        // Fluxo hunt:   WAVE_TITLE â TP_HUNTS â rank Todas â monstro â CaÃ§ar
        // (o texto atual do #wave-title NÃO deve ser usado como hunt alvo)
        // ====================================================================
        static get HUNTS() {
            return {
                WAVE_TITLE: [
                    '#wave-title',
                    'span#wave-title.pill',
                    'span.pill#wave-title'
                ],

                /** Menu flutuante de teleportes */
                TP_MENU: [
                    '#teleport-menu',
                    'div#teleport-menu.tp-menu',
                    'div.tp-menu#teleport-menu',
                    '.tp-menu'
                ],
                TP_HEAD: [
                    '#teleport-menu .tp-head',
                    '.tp-menu .tp-head'
                ],
                TP_OPTS: [
                    '#teleport-menu button.tp-opt',
                    '.tp-menu button.tp-opt',
                    'button.tp-opt'
                ],

                /** Cidade */
                TP_CITY: [
                    '#teleport-menu button.tp-opt[data-tp="city"]',
                    'div#teleport-menu.tp-menu button.tp-opt[data-tp="city"]',
                    'button.tp-opt[data-tp="city"]'
                ],
                /** Treino online */
                TP_EXERCISE: [
                    '#teleport-menu button.tp-opt[data-tp="exercise"]',
                    'div#teleport-menu.tp-menu button.tp-opt[data-tp="exercise"]',
                    'button.tp-opt[data-tp="exercise"]'
                ],
                /** Treino offline (pode vir com .tp-off + data-bank="exercise") */
                TP_OFFLINE_EXERCISE: [
                    '#teleport-menu button.tp-opt[data-tp="offline-exercise"]',
                    'div#teleport-menu.tp-menu button.tp-opt[data-tp="offline-exercise"]',
                    'button.tp-opt[data-tp="offline-exercise"]'
                ],
                /** Hunts */
                TP_HUNTS: [
                    '#teleport-menu button.tp-opt[data-tp="hunts"]',
                    'div#teleport-menu.tp-menu button.tp-opt[data-tp="hunts"]',
                    'button.tp-opt[data-tp="hunts"]'
                ],
                /** Hunt offline (pode vir com .tp-off + data-bank="hunt") */
                TP_OFFLINE_HUNT: [
                    '#teleport-menu button.tp-opt[data-tp="offline-hunt"]',
                    'div#teleport-menu.tp-menu button.tp-opt[data-tp="offline-hunt"]',
                    'button.tp-opt[data-tp="offline-hunt"]'
                ],
                /** Chefes */
                TP_BOSS: [
                    '#teleport-menu button.tp-opt[data-tp="boss"]',
                    'div#teleport-menu.tp-menu button.tp-opt[data-tp="boss"]',
                    'button.tp-opt[data-tp="boss"]'
                ],

                /** Lista / categorias apÃ³s abrir Hunts */
                SP_CATS: [
                    '.sp-cats'
                ],
                /** Clique em "Todas": use findSpCatByLabel('Todas') */
                SP_CAT: [
                    '.sp-cats button.sp-cat'
                ],
                HUNT_LIST: [
                    '.sp-list.hunt-grid',
                    'div.sp-list.hunt-grid'
                ],
                STAGE_ROW: [
                    '.sp-list.hunt-grid .im-row.stage-row',
                    '.hunt-grid .stage-row'
                ],
                STAGE_NAME: [
                    '.stage-name-line b',
                    'b'
                ],
                STAGE_LVL: [
                    '.stage-lvl',
                    'span.stage-lvl'
                ],
                STAGE_GO: [
                    'button.stage-go',
                    '.stage-actions button.stage-go'
                ]
            };
        }

        // ====================================================================
        // BOSSES (modal Chefes via teleporte data-tp="boss")
        // Fluxo: WAVE_TITLE â TP_BOSS â #boss-modal-body â .boss-cell
        // â .boss-cell.expanded â button.boss-fight.boss-cell-go (Enfrentar)
        // tip/title: "Shadowpelt Â· 2 vitÃ³rias"
        // ====================================================================
        static get BOSS() {
            return {
                MODAL_BODY: [
                    '#boss-modal-body',
                    'div#boss-modal-body'
                ],
                MODAL_CARD: [
                    '.im-card.sp-mode',
                    'div.im-card.sp-mode'
                ],
                SEARCH: [
                    '#boss-modal-body input.pick-search',
                    '.boss-pane-list input.pick-search',
                    'input.pick-search'
                ],
                TAB: [
                    '#boss-modal-body button.boss-tab',
                    '.boss-tabs button.boss-tab'
                ],
                PANE_LIST: [
                    '#boss-modal-body .boss-pane-list',
                    '.boss-pane.boss-pane-list'
                ],
                LIST: [
                    '#boss-modal-body .sp-list.boss-cardgrid',
                    '.boss-pane-list .sp-list.boss-cardgrid',
                    '.sp-list.boss-cardgrid'
                ],
                CELL: [
                    '#boss-modal-body .boss-pane-list .boss-cell',
                    '.boss-pane-list .boss-cell',
                    '.sp-list.boss-cardgrid .boss-cell'
                ],
                CELL_ADD: [
                    '.boss-cell-add'
                ],
                /** BotÃ£o Enfrentar (aparece apÃ³s expandir a cÃ©lula). */
                CELL_FIGHT: [
                    'button.boss-fight.boss-cell-go',
                    'button.boss-cell-go',
                    'button.boss-fight',
                    '.boss-cell-detail button.boss-fight'
                ],
                CELL_NAME: [
                    'b.boss-cell-name',
                    '.boss-cell-name'
                ],
                CLOSE: [
                    '#boss-modal-close',
                    'button#boss-modal-close.im-closebtn'
                ]
            };
        }

        // ====================================================================
        // MANUTENÃÃO / RECONEXÃO
        // Tela: .auth-card â #conn-retry ("Tentar de novo")
        // ====================================================================
        static get MAINTENANCE() {
            return {
                CARD: [
                    '.auth-card',
                    'div.auth-card'
                ],
                TITLE: [
                    '.auth-card .auth-title',
                    '.auth-title'
                ],
                HINT: [
                    '#conn-hint',
                    '.auth-card #conn-hint',
                    '.voc-hint#conn-hint'
                ],
                RETRY: [
                    'button#conn-retry',
                    '#conn-retry'
                ]
            };
        }

        // ====================================================================
        // STAMINA
        // ====================================================================
        static get STAMINA() {
            return {
                PCT: [
                    '#stamina-pct',
                    'b#stamina-pct',
                    'b[id="stamina-pct"]'
                ]
            };
        }

        // ====================================================================
        // CHAT / AUTO ANÃNCIO
        // Abas: .chat-tab[data-tab=geral|comunicados|help|market|serverlog]
        // Input: #chat-input (maxlength 240 no jogo; anÃºncio usa atÃ© 200)
        // Expandir/minimizar: #chat-min
        // ====================================================================
        static get CHAT() {
            return {
                TABLIST: ['#chat-tablist', '.chat-tablist', 'div.chat-tabs'],
                TAB: [
                    '.chat-tab[data-tab="{tab}"]',
                    'button.chat-tab[data-tab="{tab}"]'
                ],
                INPUT: [
                    'input#chat-input',
                    '#chat-input'
                ],
                EXPAND: [
                    'button#chat-min',
                    '#chat-min'
                ]
            };
        }

        // ====================================================================
        // ANALYTICS (painel Session / XP Gain / XP/h do jogo)
        // ====================================================================
        static get ANALYTICS() {
            return {
                SESSION: ['#an-session', 'b#an-session'],
                XP_H: ['#an-xph', 'b#an-xph'],
                XP_GAIN: ['#an-raw', 'b#an-raw'],
                KILLS: ['#an-kills', 'b#an-kills'],
                LOOT: ['#an-loot', 'b#an-loot'],
                SUPPLIES: ['#an-supplies', 'b#an-supplies'],
                BALANCE: ['#an-balance', 'b#an-balance']
            };
        }

        // ====================================================================
        // HELPER (Equipamento â sessÃ£o Boss â Amuleto / Anel)
        // Fluxo prÃ©-boss: TAB â EK â Equipamento â Boss â Ativo/Inativo
        // ====================================================================
        static get HELPER() {
            return {
                TAB: ['#tab-helper', 'div#tab-helper.tab', '.tab#tab-helper'],
                CHAR_BTNS: ['.helper-head-left .bar-char', '.helper-head-left button.bar-char'],
                MENU_BTNS: ['.helper-menubtn', 'button.helper-menubtn'],
                PROFILE_BTNS: [
                    '.helper-head-right .helper-profilebtn',
                    '.helper-head-right button.helper-profilebtn'
                ],
                EQUIP_SUBTABS: [
                    '.helper-equipsubtabs .helper-equipsubtab',
                    'button.helper-equipsubtab'
                ],
                CHECKS: ['label.helper-check', '.helper-check'],
                CLOSE: [
                    '#helper-modal-close',
                    'button#helper-modal-close',
                    'button#helper-modal-close.im-closebtn',
                    'button.im-closebtn[data-i18n="Fechar"]',
                    '.helper-panel .im-closebtn',
                    '.helper-shell .im-closebtn'
                ]
            };
        }

        // ====================================================================
        // CODEX (ProgressÃ£o â Codex)
        // Fluxo: TAB_PROGRESSAO â TAB â LAYOUT
        // Lateral: Favoritos | Todas | Hunts | Bosses | Equipamento | Efeitos Totais
        // Lista: #codex-list .cx-entry â button.cx-give (Entregar)
        // ====================================================================
        static get CODEX() {
            return {
                /** Menu "Progressao" (abre submenu prey/build/forja/imbuir/codex). */
                TAB_PROGRESSAO: [
                    '#tab-progressao',
                    'div#tab-progressao.tab',
                    'div#tab-progressao.tab-group-trigger',
                    '.tab#tab-progressao'
                ],
                /** Item "Codex" dentro do submenu Progressao. */
                TAB: [
                    '#tab-codex',
                    'div#tab-codex.tab',
                    '.tab#tab-codex'
                ],
                LAYOUT: [
                    '.store-layout.codex-layout',
                    'div.store-layout.codex-layout',
                    '.codex-layout'
                ],
                SIDE: [
                    '.codex-layout .store-side.codex-side',
                    '.store-side.codex-side',
                    '.codex-side'
                ],
                /** Abas laterais: use findCodexSideTab('Todas'|'Hunts'|'Bosses'|â¦). */
                SIDE_TAB: [
                    '.codex-side button.store-sidebtn.codex-tab',
                    'button.store-sidebtn.codex-tab',
                    'button.codex-tab'
                ],
                SIDE_TAB_LABEL: ['.codex-tab-label'],
                SIDE_TAB_COUNT: ['.codex-tab-count'],
                MAIN: [
                    '.codex-layout .store-main.codex-main',
                    '.store-main.codex-main',
                    '.codex-main'
                ],
                PANE_LIST: [
                    '#codex-pane-list',
                    'div#codex-pane-list.codex-pane',
                    '.codex-pane#codex-pane-list'
                ],
                PANE_TOTALS: [
                    '#codex-pane-tot',
                    'div#codex-pane-tot.codex-pane',
                    '.codex-pane#codex-pane-tot'
                ],
                FILTERS: [
                    '#codex-pane-list .cx-filters',
                    '.cx-filters'
                ],
                SEARCH: [
                    '#codex-pane-list input.cx-search',
                    'input.cx-search',
                    '.cx-filters input.cx-search'
                ],
                ATTR_SELECT: [
                    '#codex-pane-list select.cx-attr',
                    'select.cx-attr',
                    '.cx-filters select.cx-attr'
                ],
                CHECK: [
                    '#codex-pane-list label.cx-check',
                    'label.cx-check'
                ],
                LIST_WRAP: [
                    '#codex-pane-list .cx-listwrap',
                    '.cx-listwrap'
                ],
                LIST: [
                    '#codex-list',
                    'div#codex-list.cx-list',
                    '.cx-list#codex-list',
                    '#codex-pane-list .cx-list'
                ],
                ENTRY: [
                    '#codex-list .cx-entry',
                    '.cx-list .cx-entry',
                    'div.cx-entry'
                ],
                ENTRY_NUM: ['.cx-entry-num'],
                ENTRY_NAME: ['.cx-entry-name'],
                ENTRY_CAT: ['.cx-entry-cat'],
                ENTRY_BONUS: ['.cx-entry-bonus'],
                ENTRY_STAR: ['button.cx-star', '.cx-star'],
                ENTRY_BAR: ['.cx-bar'],
                ENTRY_BAR_FILL: ['.cx-bar-fill'],
                ENTRY_TILES: ['.cx-tiles'],
                ENTRY_TILE: ['.cx-tile'],
                ENTRY_GIVE: ['button.cx-give', '.cx-give'],
                SCREENS: [
                    '#codex-screens',
                    'div#codex-screens.cx-screens',
                    '.cx-screens'
                ],
                SCREEN_BTN: [
                    '#codex-screens button.cx-screen',
                    'button.cx-screen'
                ],
                PAGER: [
                    '#codex-pager',
                    'div#codex-pager.cx-pager',
                    '.cx-pager'
                ],
                PAGER_BTN: [
                    '#codex-pager button.cx-pgbtn',
                    'button.cx-pgbtn'
                ],
                PAGER_INPUT: [
                    '#codex-pager input.cx-pginput',
                    'input.cx-pginput'
                ],
                PAGER_TOTAL: [
                    '#codex-pager .cx-pgtot',
                    '.cx-pgtot'
                ],
                /** Fecha o modal do Codex apÃ³s entregar. */
                CLOSE: [
                    'button#codex-modal-close.im-closebtn',
                    'button#codex-modal-close',
                    '#codex-modal-close'
                ]
            };
        }

        // ====================================================================
        // AUTO SELL
        // Venda: SELL_ALL â CONFIRM_YES
        // VenderLootBoss (antes da venda): CFG â NAV_PROTECAO â Desligado â
        //   CONFIRM_YES ("Liberar atÃ© a venda") â MODAL_CLOSE
        // ====================================================================
        static get AUTO_SELL() {
            return {
                SELL_ALL: [
                    'button#sell-all.mini-btn',
                    'button#sell-all',
                    '#sell-all'
                ],
                CONFIRM_YES: [
                    'button#confirm-yes',
                    '#confirm-yes'
                ],
                CFG: [
                    'button#autosell-cfg.mini-btn',
                    'button#autosell-cfg',
                    '#autosell-cfg'
                ],
                NAV_PROTECAO: [
                    'button.set-navitem[data-cat="protecao"]',
                    '.set-navitem[data-cat="protecao"]',
                    'button[data-cat="protecao"]'
                ],
                MODAL_CLOSE: [
                    'button#autosell-modal-close.im-closebtn',
                    'button#autosell-modal-close',
                    '#autosell-modal-close'
                ]
            };
        }

        // ====================================================================
        // ITENS / INVENTÃRIO
        // Origem (loot): #inv-grid  â  destino (guardar): #backpack-grid
        // Raridade via data-cmpitem.tier:
        //   0 Common (#cfd2d8) | 1 Uncommon (#57b85a) | 2 Rare (#4a90e8)
        //   3 Epic (#a05be0) | 4 Dourado (#e0b35a) | 5 MÃ­tico (#e53935)
        // Shift+clique no #inv-grid move a pilha para o Backpack.
        // ====================================================================
        static get ITEMS() {
            return {
                INV_GRID: [
                    '#inv-grid',
                    'div.invgrid#inv-grid',
                    'div#inv-grid.invgrid'
                ],
                BACKPACK_GRID: [
                    '#backpack-grid',
                    'div.invgrid#backpack-grid',
                    'div#backpack-grid.invgrid'
                ],
                CELL: [
                    '.cell'
                ],
                INV_COUNT: [
                    'b#inv-count',
                    '#inv-count'
                ],
                CELL_ITEM: [
                    '.cell[data-cmpitem]'
                ],
                /** Materiais empilhÃ¡veis (loot/stack) â sem data-cmpitem. */
                CELL_MAT: [
                    '.cell.mat'
                ],
                CELL_EMPTY: [
                    '.cell:not([data-cmpitem]):not(.mat)'
                ],
                QTY: [
                    'span.qty'
                ],
                TIER: {
                    0: { id: 0, key: 'common', label: 'Common', color: '#cfd2d8' },
                    1: { id: 1, key: 'uncommon', label: 'Uncommon', color: '#57b85a' },
                    2: { id: 2, key: 'rare', label: 'Rare', color: '#4a90e8' },
                    3: { id: 3, key: 'epic', label: 'Epic', color: '#a05be0' },
                    4: { id: 4, key: 'legendary', label: 'Dourado', color: '#e0b35a' },
                    5: { id: 5, key: 'mythic', label: 'MÃ­tico', color: '#e53935' }
                }
            };
        }

        /**
         * Busca o primeiro elemento que casar com a lista de seletores.
         * @param {string[]} selectorArray
         * @param {string} selectorName
         * @param {ParentNode|null} root
         * @returns {Element|null}
         */
        static findElement(selectorArray, selectorName = 'Desconhecido', root = null) {
            const scope = root && typeof root.querySelector === 'function' ? root : document;
            const list = Array.isArray(selectorArray) ? selectorArray : [];

            if (this.DEBUG) {
                console.log(`[BaiakIdle Seletores] Buscando: ${selectorName}`, list);
            }

            for (const selector of list) {
                try {
                    const element = scope.querySelector(selector);
                    if (element) {
                        if (this.DEBUG) {
                            console.log(`[BaiakIdle Seletores] OK ${selectorName} via: ${selector}`);
                        }
                        return element;
                    }
                } catch (error) {
                    if (this.DEBUG) {
                        console.warn(`[BaiakIdle Seletores] Seletor invÃ¡lido: ${selector}`, error);
                    }
                }
            }

            if (this.DEBUG) {
                console.log(`[BaiakIdle Seletores] NÃ£o encontrado: ${selectorName}`);
            }
            return null;
        }

        /**
         * Todos os elementos que casarem com a lista de seletores (sem duplicar).
         * @param {string[]} selectorArray
         * @param {string} selectorName
         * @param {ParentNode|null} root
         * @returns {Element[]}
         */
        static findElements(selectorArray, selectorName = 'Desconhecido', root = null) {
            const scope = root && typeof root.querySelectorAll === 'function' ? root : document;
            const list = Array.isArray(selectorArray) ? selectorArray : [];
            const out = [];
            const seen = new Set();

            for (const selector of list) {
                try {
                    scope.querySelectorAll(selector).forEach((el) => {
                        if (!el || seen.has(el)) return;
                        seen.add(el);
                        out.push(el);
                    });
                } catch (error) {
                    if (this.DEBUG) {
                        console.warn(`[BaiakIdle Seletores] Seletor invÃ¡lido: ${selector}`, error);
                    }
                }
            }

            if (this.DEBUG) {
                console.log(`[BaiakIdle Seletores] ${selectorName}: ${out.length} elemento(s)`);
            }
            return out;
        }

        /**
         * NÃ³s de nome a mascarar: .m-name da party + #hud-nick.
         * @returns {Element[]}
         */
        static findNameNodesToMask() {
            const out = [];
            const seen = new Set();

            const party = this.findElement(this.OCULTAR_NOMES.PARTY_LIST, 'PARTY_LIST');
            if (party) {
                for (const el of this.findElements(this.OCULTAR_NOMES.MEMBER_NAME, 'MEMBER_NAME', party)) {
                    if (seen.has(el)) continue;
                    seen.add(el);
                    out.push(el);
                }
            }

            // Fallback se PARTY_LIST nÃ£o achar, ainda tenta nomes com escopo da party
            if (!out.length) {
                for (const el of this.findElements(
                    this.OCULTAR_NOMES.MEMBER_NAME_SCOPED,
                    'MEMBER_NAME_SCOPED'
                )) {
                    if (seen.has(el)) continue;
                    seen.add(el);
                    out.push(el);
                }
            }

            const nick = this.findElement(this.OCULTAR_NOMES.HUD_NICK, 'HUD_NICK');
            if (nick && !seen.has(nick)) {
                out.push(nick);
            }

            return out;
        }

        /** VocaÃ§Ãµes conhecidas (mais longas primeiro) para parse de ".m-name". */
        static get VOCATIONS() {
            return [
                'Elder Druid',
                'Master Sorcerer',
                'Royal Paladin',
                'Elite Knight',
                'Exalted Monk',
                'Druid',
                'Sorcerer',
                'Paladin',
                'Knight',
                'Monk'
            ];
        }

        /**
         * Separa "Druid Ravi" â { className: 'Druid', name: 'Ravi' }.
         * @param {string} raw
         * @returns {{ className: string, name: string }|null}
         */
        static parseClassAndName(raw) {
            const text = String(raw || '')
                .trim()
                .replace(/\s+/g, ' ');
            if (!text || text === 'TibiaBot.Online') return null;
            for (const vocation of this.VOCATIONS) {
                if (text === vocation) {
                    return { className: vocation, name: '' };
                }
                const prefix = vocation + ' ';
                if (text.length > prefix.length && text.slice(0, prefix.length).toLowerCase() === prefix.toLowerCase()) {
                    return {
                        className: vocation,
                        name: text.slice(prefix.length).trim()
                    };
                }
            }
            return { className: '', name: text };
        }

        /**
         * LÃª nÃ­vel perto de um nÃ³ de nome (party member / HUD).
         * NÃ£o concatena dÃ­gitos de HP/porcentagem (ex.: "252"+"60" â 25260).
         * @param {Element|null} nameEl
         * @returns {number}
         */
        static parseLevelValue(value) {
            const s = String(value || '').trim();
            if (!s) return 0;
            const labeled = s.match(/(?:^|[^\w])(?:lv\.?|lvl|level)\s*[:.]?\s*(\d{1,5})(?:\b|$)/i);
            if (labeled) {
                const n = parseInt(labeled[1], 10);
                return Number.isFinite(n) && n > 0 && n < 100000 ? n : 0;
            }
            // Barras tipo "12345/67890" ou "252 / 60" â nÃ£o Ã© level puro
            if (/\d+\s*\/\s*\d+/.test(s)) return 0;
            if (/^\d{1,5}$/.test(s)) {
                const n = parseInt(s, 10);
                return n > 0 ? n : 0;
            }
            // Um Ãºnico nÃºmero isolado no texto curto
            if (s.length <= 12) {
                const m = s.match(/^.*?(\d{1,5}).*$/);
                if (m && (s.match(/\d/g) || []).join('').length === m[1].length) {
                    const n = parseInt(m[1], 10);
                    return Number.isFinite(n) && n > 0 && n < 100000 ? n : 0;
                }
            }
            return 0;
        }

        /** Prefere level plausÃ­vel (corrige 25260 quando o real Ã© 252). */
        static preferLevel(prev, next) {
            const a = Math.max(0, Number(prev) || 0);
            const b = Math.max(0, Number(next) || 0);
            if (!a) return b;
            if (!b) return a;
            const as = String(a);
            const bs = String(b);
            if (as.startsWith(bs) && as.length > bs.length) return b;
            if (bs.startsWith(as) && bs.length > as.length) return a;
            return b;
        }

        static readLevelNear(nameEl) {
            if (!nameEl) return 0;

            const member =
                nameEl.closest?.('.member') ||
                nameEl.closest?.('#party-list [class*="member"]') ||
                null;
            if (member) {
                const meta = member.querySelector?.('.m-meta');
                const fromMeta = this.parseMemberMeta(meta?.textContent || meta?.getAttribute?.('data-tb-original-meta'));
                if (fromMeta?.level) return fromMeta.level;

                for (const sel of this.OCULTAR_NOMES.MEMBER_LEVEL) {
                    try {
                        const el = member.querySelector(sel);
                        if (!el) continue;
                        const n = this.parseLevelValue(
                            el.getAttribute?.('data-level') ||
                                el.getAttribute?.('data-lvl') ||
                                el.textContent
                        );
                        if (n) return n;
                    } catch (_) {}
                }
                const dataLvl =
                    member.getAttribute?.('data-level') ||
                    member.getAttribute?.('data-lvl') ||
                    member.dataset?.level ||
                    member.dataset?.lvl;
                const fromData = this.parseLevelValue(dataLvl);
                if (fromData) return fromData;
            }

            if (nameEl.id === 'hud-nick' || nameEl.classList?.contains('hud-nick')) {
                const hudLvl = this.findElement(this.OCULTAR_NOMES.HUD_LEVEL, 'HUD_LEVEL');
                const n = this.parseLevelValue(hudLvl?.textContent);
                if (n) return n;
            }
            return 0;
        }

        /**
         * Parseia ".m-meta" â "Druid Â· lvl 273".
         * @param {string} raw
         * @returns {{ className: string, level: number }|null}
         */
        static parseMemberMeta(raw) {
            const text = String(raw || '')
                .trim()
                .replace(/\s+/g, ' ');
            if (!text || text === 'â Â· lvl â' || text === 'TibiaBot.Online') return null;
            const m = text.match(/^(.+?)\s*Â·\s*lvl\s*(\d{1,5})\b/i);
            if (!m) return null;
            const className = String(m[1] || '').trim();
            const level = this.parseLevelValue(m[2]);
            if (!className && !level) return null;
            return { className, level };
        }

        /**
         * NÃ³s .m-meta da party (classe Â· lvl).
         * @returns {Element[]}
         */
        static findMemberMetaNodes() {
            const out = [];
            const seen = new Set();
            const party = this.findElement(this.OCULTAR_NOMES.PARTY_LIST, 'PARTY_LIST');
            const roots = party ? [party] : [document];
            for (const root of roots) {
                for (const el of this.findElements(this.OCULTAR_NOMES.MEMBER_META, 'MEMBER_META', root === document ? undefined : root)) {
                    if (seen.has(el)) continue;
                    seen.add(el);
                    out.push(el);
                }
            }
            return out;
        }

        /**
         * Snapshot dos personagens visÃ­veis (party + HUD), com nome real se mascarado.
         * @returns {Array<{ name: string, className: string, level: number }>}
         */
        static getCharactersSnapshot() {
            const ATTR = 'data-tb-original-name';
            const ATTR_META = 'data-tb-original-meta';
            const byKey = new Map();

            const upsert = (rawName, className, levelHint) => {
                const parsed = this.parseClassAndName(rawName);
                if (!parsed || !parsed.name) return;
                const key = parsed.name
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
                if (!key) return;
                const prev = byKey.get(key) || {
                    name: parsed.name,
                    className: '',
                    level: 0
                };
                byKey.set(key, {
                    name: parsed.name || prev.name,
                    className: className || parsed.className || prev.className || '',
                    level: this.preferLevel(prev.level, levelHint)
                });
            };

            const party = this.findElement(this.OCULTAR_NOMES.PARTY_LIST, 'PARTY_LIST');
            const members = party
                ? Array.from(party.querySelectorAll('.member'))
                : Array.from(document.querySelectorAll('#party-list .member, .party .member'));

            for (const member of members) {
                const nameEl = member.querySelector('.m-name');
                let raw = '';
                try {
                    const saved = String(nameEl?.getAttribute?.(ATTR) || '').trim();
                    if (saved && saved !== 'TibiaBot.Online') raw = saved;
                } catch (_) {}
                if (!raw) {
                    raw = String(nameEl?.textContent || '').trim();
                    if (raw === 'TibiaBot.Online') raw = '';
                }
                const metaEl = member.querySelector('.m-meta');
                let metaRaw = '';
                try {
                    const savedMeta = String(metaEl?.getAttribute?.(ATTR_META) || '').trim();
                    if (savedMeta) metaRaw = savedMeta;
                } catch (_) {}
                if (!metaRaw) metaRaw = String(metaEl?.textContent || '').trim();
                const meta = this.parseMemberMeta(metaRaw);
                upsert(raw, meta?.className || '', meta?.level || this.readLevelNear(nameEl));
            }

            const nick = this.findElement(this.OCULTAR_NOMES.HUD_NICK, 'HUD_NICK');
            if (nick) {
                let raw = '';
                try {
                    const saved = String(nick.getAttribute?.(ATTR) || '').trim();
                    if (saved && saved !== 'TibiaBot.Online') raw = saved;
                } catch (_) {}
                if (!raw) {
                    raw = String(nick.textContent || '').trim();
                    if (raw === 'TibiaBot.Online') raw = '';
                }
                if (raw) upsert(raw, '', this.readLevelNear(nick));
            }

            return Array.from(byKey.values()).sort((a, b) =>
                String(a.name).localeCompare(String(b.name), 'pt-BR')
            );
        }

        /**
         * Texto atual do #wave-title (ex.: "Cidade", "Cobras").
         * @returns {string}
         */
        static getWaveTitleText() {
            const el = this.findElement(this.HUNTS.WAVE_TITLE, 'WAVE_TITLE');
            return String(el?.textContent || '').trim();
        }

        /**
         * % atual de stamina (#stamina-pct), ou null se nÃ£o achar/parsear.
         * @returns {number|null}
         */
        static getStaminaPct() {
            const el = this.findElement(this.STAMINA.PCT, 'STAMINA_PCT');
            if (!el) return null;
            const raw = String(el.textContent || '').trim();
            const m = raw.match(/(\d+(?:[.,]\d+)?)/);
            if (!m) return null;
            const n = parseFloat(String(m[1]).replace(',', '.'));
            if (!Number.isFinite(n)) return null;
            return Math.max(0, Math.min(100, n));
        }

        /**
         * Parseia nÃºmeros no formato BR (1.234.567 ou 1.234,5).
         * @param {string} text
         * @returns {number|null}
         */
        static parseBrNumber(text) {
            let s = String(text || '').trim();
            if (!s) return null;
            s = s.replace(/[^\d.,\-]/g, '');
            if (!s || s === '-' || s === '.' || s === ',') return null;
            if (s.includes(',') && s.includes('.')) {
                s = s.replace(/\./g, '').replace(',', '.');
            } else if (s.includes(',')) {
                s = s.replace(',', '.');
            } else if ((s.match(/\./g) || []).length > 1) {
                s = s.replace(/\./g, '');
            }
            const n = Number(s);
            return Number.isFinite(n) ? n : null;
        }

        /**
         * XP Gain acumulado da sessÃ£o (#an-raw).
         * @returns {number|null}
         */
        static getXpGain() {
            const el = this.findElement(this.ANALYTICS.XP_GAIN, 'AN_RAW');
            if (!el) return null;
            return this.parseBrNumber(el.textContent);
        }

        /**
         * Balance (loot â supplies) da sessÃ£o (#an-balance).
         * @returns {number|null}
         */
        static getBalance() {
            const el = this.findElement(this.ANALYTICS.BALANCE, 'AN_BALANCE');
            if (!el) return null;
            return this.parseBrNumber(el.textContent);
        }

        /**
         * Loot acumulado da sessÃ£o (#an-loot).
         * @returns {number|null}
         */
        static getLoot() {
            const el = this.findElement(this.ANALYTICS.LOOT, 'AN_LOOT');
            if (!el) return null;
            return this.parseBrNumber(el.textContent);
        }

        /**
         * True se o wave-title indicar Treino online.
         * @returns {boolean}
         */
        static isInExercise() {
            const t = this.getWaveTitleText().toLowerCase();
            return t === 'treino online' || t.indexOf('treino') !== -1 || t.indexOf('exercise') !== -1;
        }

        /**
         * True se o wave-title indicar que o jogador estÃ¡ na cidade.
         * @returns {boolean}
         */
        static isInCity() {
            return this.getWaveTitleText().toLowerCase() === 'cidade';
        }

        /**
         * Container do menu de teleportes (#teleport-menu), se aberto.
         * @returns {Element|null}
         */
        static findTeleportMenu() {
            return this.findElement(this.HUNTS.TP_MENU, 'TP_MENU');
        }

        /**
         * BotÃ£o do menu de teleporte pelo data-tp
         * (city | exercise | offline-exercise | hunts | offline-hunt | boss).
         * Prefere escopo dentro de #teleport-menu.
         * @param {string} dataTp
         * @returns {Element|null}
         */
        static findTpOpt(dataTp) {
            const key = String(dataTp || '').trim().toLowerCase();
            if (!key) return null;

            const map = {
                city: this.HUNTS.TP_CITY,
                exercise: this.HUNTS.TP_EXERCISE,
                'offline-exercise': this.HUNTS.TP_OFFLINE_EXERCISE,
                hunts: this.HUNTS.TP_HUNTS,
                'offline-hunt': this.HUNTS.TP_OFFLINE_HUNT,
                boss: this.HUNTS.TP_BOSS
            };
            if (map[key]) {
                return this.findElement(map[key], 'TP_' + key.toUpperCase().replace(/-/g, '_'));
            }

            const menu = this.findTeleportMenu();
            const scoped = menu
                ? menu.querySelector('button.tp-opt[data-tp="' + key + '"]')
                : null;
            if (scoped) return scoped;
            return document.querySelector('button.tp-opt[data-tp="' + key + '"]');
        }

        /**
         * Encontra botÃ£o de rank (.sp-cat) pelo texto (ex.: "Todas").
         * @param {string} label
         * @returns {Element|null}
         */
        static findSpCatByLabel(label) {
            const want = String(label || '').trim().toLowerCase();
            if (!want) return null;
            const cats = document.querySelectorAll('.sp-cats button.sp-cat');
            for (const btn of cats) {
                const text = String(btn.textContent || '').trim().toLowerCase();
                if (text.indexOf(want) === 0 || text.indexOf(want + '(') === 0 || text.indexOf(want + ' ') === 0) {
                    return btn;
                }
            }
            return null;
        }

        /**
         * MantÃ©m o submenu de ProgressÃ£o aberto (Codex / Prey / â¦).
         * O dropdown some no hover-out; sem pin o #tab-codex fica no DOM mas nÃ£o clicÃ¡vel.
         * @returns {Element|null} trigger #tab-progressao
         */
        static pinProgressaoMenu() {
            const PIN = 'baiakidle-pin-progressao';
            try {
                if (!document.getElementById('baiakidle-pin-progressao-css')) {
                    const st = document.createElement('style');
                    st.id = 'baiakidle-pin-progressao-css';
                    st.textContent =
                        '.tab-group.' +
                        PIN +
                        ' [role="menu"],' +
                        '.tab-group.' +
                        PIN +
                        ' .tab-menu,' +
                        '.tab-group.' +
                        PIN +
                        ' .menu,' +
                        '.tab-group.' +
                        PIN +
                        ' .dropdown,' +
                        '.tab-group.' +
                        PIN +
                        ' .submenu{display:flex!important;opacity:1!important;visibility:visible!important;' +
                        'pointer-events:auto!important;max-height:none!important;}' +
                        '.tab-group.' +
                        PIN +
                        ' #tab-codex{display:flex!important;visibility:visible!important;opacity:1!important;' +
                        'pointer-events:auto!important;}';
                    (document.head || document.documentElement).appendChild(st);
                }
            } catch (_) {}

            const tab = this.findElement(this.CODEX.TAB_PROGRESSAO, 'CODEX.TAB_PROGRESSAO');
            if (!tab) return null;
            const group =
                tab.closest('.tab-group') ||
                tab.closest('[class*="tab-group"]') ||
                tab.parentElement;
            try {
                if (group) group.classList.add(PIN, 'open', 'hover', 'is-open');
            } catch (_) {}
            try {
                tab.setAttribute('aria-expanded', 'true');
            } catch (_) {}
            try {
                tab.focus?.();
            } catch (_) {}
            ['pointerenter', 'mouseenter', 'mouseover'].forEach((type) => {
                try {
                    const ev = new MouseEvent(type, {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    });
                    tab.dispatchEvent(ev);
                    group?.dispatchEvent(ev);
                } catch (_) {}
            });
            return tab;
        }

        /** Remove o pin do submenu ProgressÃ£o. */
        static unpinProgressaoMenu() {
            const PIN = 'baiakidle-pin-progressao';
            try {
                document.querySelectorAll('.' + PIN).forEach((el) => {
                    el.classList.remove(PIN, 'open', 'hover', 'is-open');
                });
                const t = document.getElementById('tab-progressao');
                if (t) t.setAttribute('aria-expanded', 'false');
            } catch (_) {}
        }

        /**
         * Aba lateral do Codex pelo rÃ³tulo (Favoritos, Todas, Hunts, Bosses, Equipamento, Efeitos Totais).
         * @param {string} label
         * @returns {Element|null}
         */
        static findCodexSideTab(label) {
            const want = String(label || '')
                .trim()
                .toLowerCase();
            if (!want) return null;
            const tabs = document.querySelectorAll(
                '.codex-side button.store-sidebtn.codex-tab, button.store-sidebtn.codex-tab, button.codex-tab'
            );
            for (const btn of tabs) {
                const labelEl = btn.querySelector('.codex-tab-label');
                const text = String(labelEl?.textContent || btn.textContent || '')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toLowerCase();
                if (text === want || text.indexOf(want) === 0) return btn;
            }
            return null;
        }

        /**
         * Layout do Codex estÃ¡ aberto/visÃ­vel.
         * @returns {boolean}
         */
        static isCodexOpen() {
            const layout = this.findElement(this.CODEX.LAYOUT, 'CODEX_LAYOUT');
            if (!layout) return false;
            try {
                return this.isClickable(layout);
            } catch (_) {
                return true;
            }
        }

        /**
         * Texto normalizado do nÃºmero da entrada (#1 â 1).
         * @param {Element|null} entry
         * @returns {number}
         */
        static getCodexEntryId(entry) {
            if (!entry?.querySelector) return 0;
            const numEl = entry.querySelector('.cx-entry-num');
            const raw = String(numEl?.textContent || '')
                .replace(/[^\d]/g, '')
                .trim();
            const id = Number(raw);
            return Number.isFinite(id) && id > 0 ? id : 0;
        }

        /**
         * Slug da entrada (title de .cx-entry-num, ex.: hunt-troll-cave).
         * @param {Element|null} entry
         * @returns {string}
         */
        static getCodexEntrySlug(entry) {
            if (!entry?.querySelector) return '';
            const numEl = entry.querySelector('.cx-entry-num');
            return String(numEl?.getAttribute?.('title') || '')
                .trim()
                .toLowerCase();
        }

        /**
         * Nome da entrada (title ou texto de .cx-entry-name).
         * @param {Element|null} entry
         * @returns {string}
         */
        static getCodexEntryName(entry) {
            if (!entry?.querySelector) return '';
            const nameEl = entry.querySelector('.cx-entry-name');
            const fromTitle = String(nameEl?.getAttribute?.('title') || '').trim();
            if (fromTitle) return fromTitle;
            return String(nameEl?.textContent || '')
                .replace(/\s+/g, ' ')
                .trim();
        }

        /**
         * Encontra .cx-entry por id (#), slug ou nome.
         * @param {string|number} idOrSlugOrName
         * @returns {Element|null}
         */
        static findCodexEntry(idOrSlugOrName) {
            const all = this.findAllCodexEntries(idOrSlugOrName);
            return all[0] || null;
        }

        /**
         * Todas as .cx-entry visÃ­veis na lista (apÃ³s filtro/busca do jogo).
         * @returns {Element[]}
         */
        static listVisibleCodexEntries() {
            const entries = document.querySelectorAll(
                '#codex-list .cx-entry, .cx-list .cx-entry, div.cx-entry'
            );
            const out = [];
            for (const entry of entries) {
                try {
                    if (entry.offsetParent === null) continue;
                } catch (_) {}
                out.push(entry);
            }
            return out;
        }

        /**
         * Todas as .cx-entry que batem com id (#), slug ou nome (parcial).
         * Ãtil quando a busca retorna vÃ¡rias variaÃ§Ãµes (I / II / III).
         * @param {string|number} idOrSlugOrName
         * @returns {Element[]}
         */
        static findAllCodexEntries(idOrSlugOrName) {
            const want = String(idOrSlugOrName || '')
                .trim()
                .toLowerCase();
            if (!want) return [];
            const wantId = want.replace(/^#/, '');
            const entries = this.listVisibleCodexEntries();
            const out = [];
            for (const entry of entries) {
                const id = String(this.getCodexEntryId(entry) || '');
                if (id && id === wantId) {
                    out.push(entry);
                    continue;
                }
                const slug = this.getCodexEntrySlug(entry);
                if (slug && slug === want) {
                    out.push(entry);
                    continue;
                }
                const name = this.getCodexEntryName(entry).toLowerCase();
                if (name && (name === want || name.indexOf(want) >= 0)) {
                    out.push(entry);
                }
            }
            return out;
        }

        /**
         * Todos os botÃµes "Entregar" habilitados na lista visÃ­vel do Codex.
         * (Ignora "Desbloquear Â· â¦" e botÃµes disabled.)
         * @returns {HTMLButtonElement[]}
         */
        static findAllCodexGiveEntregarButtons() {
            const entries = this.listVisibleCodexEntries();
            const out = [];
            for (const entry of entries) {
                const give = this.findCodexGiveButton(entry);
                if (!give) continue;
                if (!this.isCodexGiveEntregar(give)) continue;
                if (give.disabled || give.getAttribute('disabled') != null) continue;
                out.push(give);
            }
            return out;
        }

        /**
         * Progresso das tiles de uma entrada do Codex (.cx-tile / .cx-tile-n).
         * @param {Element|null} entry
         * @returns {Array<{objectId:number,name:string,cur:number,need:number,done:boolean}>}
         */
        static readCodexEntryTileProgress(entry) {
            if (!entry?.querySelectorAll) return [];
            const tiles = entry.querySelectorAll('.cx-tile');
            const out = [];
            for (const tile of tiles) {
                const nEl = tile.querySelector('.cx-tile-n');
                const raw = String(nEl?.textContent || '').replace(/\s+/g, ' ').trim();
                const m = raw.match(/(\d+)\s*\/\s*(\d+)/);
                if (!m) continue;
                const cur = Number(m[1]);
                const need = Number(m[2]);
                if (!Number.isFinite(cur) || !Number.isFinite(need) || need <= 0) continue;
                const img = tile.querySelector('img.cx-ico, img[src*="/object/"]');
                const src = String(img?.getAttribute?.('src') || img?.src || '');
                const oidMatch = src.match(/\/object\/(\d+)/i);
                const objectId = oidMatch ? Number(oidMatch[1]) : 0;
                const title = String(
                    tile.getAttribute('title') ||
                        tile.getAttribute('aria-label') ||
                        ''
                )
                    .replace(/\s+\d+\s*\/\s*\d+\s*$/i, '')
                    .replace(/\s+/g, ' ')
                    .trim();
                out.push({
                    objectId: Number.isFinite(objectId) && objectId > 0 ? objectId : 0,
                    name: title,
                    cur,
                    need,
                    done: cur >= need
                });
            }
            return out;
        }

        /**
         * BotÃ£o "Entregar" de uma entrada do Codex.
         * @param {Element|null} entry
         * @returns {HTMLButtonElement|null}
         */
        static findCodexGiveButton(entry) {
            if (!entry?.querySelector) return null;
            return (
                entry.querySelector('button.cx-give') ||
                entry.querySelector('.cx-give') ||
                null
            );
        }

        /**
         * RÃ³tulo do botÃ£o .cx-give (ignora imagens).
         * @param {Element|null} btn
         * @returns {string}
         */
        static getCodexGiveLabel(btn) {
            if (!btn) return '';
            try {
                const clone = btn.cloneNode(true);
                clone.querySelectorAll?.('img, svg')?.forEach((n) => n.remove());
                return String(clone.textContent || '')
                    .replace(/\s+/g, ' ')
                    .trim();
            } catch (_) {
                return String(btn.textContent || '')
                    .replace(/\s+/g, ' ')
                    .trim();
            }
        }

        /**
         * true sÃ³ se o botÃ£o for "Entregar" (nÃ£o "Desbloquear Â· â¦").
         * @param {Element|null} btn
         * @returns {boolean}
         */
        static isCodexGiveEntregar(btn) {
            const label = this.getCodexGiveLabel(btn).toLowerCase();
            if (!label) return false;
            if (label.includes('desbloquear')) return false;
            return label.includes('entregar');
        }

        /**
         * Checkbox de filtro do Codex pelo texto do label (EntregÃ¡veis / Esconder concluÃ­dos).
         * @param {string} label
         * @returns {HTMLInputElement|null}
         */
        static findCodexFilterCheck(label) {
            const want = String(label || '')
                .trim()
                .toLowerCase();
            if (!want) return null;
            const labels = document.querySelectorAll(
                '#codex-pane-list label.cx-check, label.cx-check'
            );
            for (const lab of labels) {
                const text = String(lab.textContent || '')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toLowerCase();
                if (text.includes(want)) {
                    return lab.querySelector('input[type="checkbox"]') || null;
                }
            }
            return null;
        }

        /**
         * BotÃ£o de personagem do Helper pela vocaÃ§Ã£o curta (ex.: "EK").
         * @param {string} vocation
         * @returns {Element|null}
         */
        static findHelperCharByVocation(vocation) {
            const want = String(vocation || '')
                .trim()
                .toUpperCase();
            if (!want) return null;
            const btns = document.querySelectorAll(
                '.helper-head-left .bar-char, .helper-head-left button.bar-char'
            );
            for (const btn of btns) {
                const span = btn.querySelector('span');
                const tag = String(span?.textContent || btn.textContent || '')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toUpperCase();
                if (tag === want || tag.indexOf(want) === 0) return btn;
            }
            return null;
        }

        /**
         * Aba de perfil do Helper (Hunt / Boss / PVP).
         * @param {string} label
         * @returns {Element|null}
         */
        static findHelperProfile(label) {
            const want = String(label || '')
                .trim()
                .toLowerCase();
            if (!want) return null;
            const btns = document.querySelectorAll(
                '.helper-head-right .helper-profilebtn, button.helper-profilebtn'
            );
            for (const btn of btns) {
                const text = String(btn.textContent || '')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toLowerCase();
                if (text === want || text.indexOf(want) === 0) return btn;
            }
            return null;
        }

        /**
         * Subaba de equipamento (Amuleto / Anel).
         * @param {string} label
         * @returns {Element|null}
         */
        static findHelperEquipSubtab(label) {
            const want = String(label || '')
                .trim()
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');
            if (!want) return null;
            const btns = document.querySelectorAll(
                'button.helper-equipsubtab, .helper-equipsubtabs .helper-equipsubtab, .helper-equipsubtab'
            );
            for (const btn of btns) {
                const text = String(btn.textContent || '')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
                // Match pela palavra do slot (amuleto / anel), ignorando Ã­cones
                if (text === want || text.includes(want)) return btn;
            }
            return null;
        }

        /**
         * Toggle Ãºnico Ativo/Inativo em .helper-equiphead (NÃO o helper-equipguard).
         * O texto do label alterna entre "Ativo" e "Inativo" â sÃ³ um existe por vez.
         * @returns {HTMLLabelElement|Element|null}
         */
        static findHelperEquipToggle() {
            const isVisible = (el) => {
                if (!el) return false;
                try {
                    if (!this.isClickable(el)) return false;
                    return true;
                } catch (_) {
                    return true;
                }
            };

            const candidates = [
                document.querySelector('.helper-equiphead > label.helper-check'),
                document.querySelector('.helper-equiphead label.helper-check'),
                document.querySelector('.helper-equipcard .helper-equiphead .helper-check')
            ].filter(Boolean);

            for (const lab of candidates) {
                // ignora o guard "NÃ£o equipar com Energy Ringâ¦"
                if (lab.classList?.contains('helper-equipguard')) continue;
                const text = String(lab.textContent || '')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
                if (text === 'ativo' || text === 'inativo') {
                    if (isVisible(lab)) return lab;
                }
            }

            // Fallback: qualquer .helper-check no card cujo texto seja Ativo/Inativo
            const card = document.querySelector('.helper-equipcard');
            const root = card || document;
            const labels = root.querySelectorAll('label.helper-check, .helper-check');
            let fallback = null;
            for (const lab of labels) {
                if (lab.classList?.contains('helper-equipguard')) continue;
                const text = String(lab.textContent || '')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
                if (text !== 'ativo' && text !== 'inativo') continue;
                if (!fallback) fallback = lab;
                if (isVisible(lab)) return lab;
            }
            return fallback;
        }

        /**
         * Label .helper-check com texto Ativo ou Inativo (um por vez no DOM).
         * @param {string} label
         * @returns {HTMLLabelElement|Element|null}
         */
        static findHelperCheck(label) {
            const want = String(label || '')
                .trim()
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');
            if (!want) return null;

            const toggle = this.findHelperEquipToggle();
            if (toggle) {
                const text = String(toggle.textContent || '')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
                if (text === want) return toggle;
            }
            return null;
        }

        /**
         * @param {Element|null} lab
         * @returns {boolean}
         */
        static isHelperCheckOn(lab) {
            if (!lab) return false;
            const text = String(lab.textContent || '')
                .replace(/\s+/g, ' ')
                .trim()
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');
            // Fonte da verdade: texto do label (Ativo / Inativo)
            if (text === 'ativo') return true;
            if (text === 'inativo') return false;
            const input =
                lab.matches?.('input')
                    ? lab
                    : lab.querySelector?.('input[type="checkbox"], input[type="radio"], input');
            if (input && typeof input.checked === 'boolean') return !!input.checked;
            return false;
        }

        /**
         * true = Ativo, false = Inativo, null = toggle ausente.
         * @returns {boolean|null}
         */
        static readHelperActiveState() {
            const lab = this.findHelperEquipToggle();
            if (!lab) return null;
            return this.isHelperCheckOn(lab);
        }

        /**
         * BotÃ£o do menu Helper pelo texto (ex.: Equipamento).
         * @param {string} label
         * @returns {Element|null}
         */
        static findHelperMenuBtn(label) {
            const want = String(label || '')
                .trim()
                .toLowerCase();
            if (!want) return null;
            const btns = document.querySelectorAll('button.helper-menubtn, .helper-menubtn');
            for (const btn of btns) {
                const text = String(btn.textContent || '')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toLowerCase();
                if (text.includes(want)) return btn;
            }
            return this.findButtonByText(label, { includes: true });
        }

        /**
         * Encontra <button> pelo texto visÃ­vel.
         * @param {string} label
         * @param {{ root?: ParentNode|null, includes?: boolean }} [opts]
         * @returns {Element|null}
         */
        static findButtonByText(label, opts = {}) {
            const want = String(label || '').trim().toLowerCase();
            if (!want) return null;
            const root = opts.root && typeof opts.root.querySelectorAll === 'function' ? opts.root : document;
            const includes = !!opts.includes;
            const buttons = root.querySelectorAll('button');
            for (const btn of buttons) {
                const text = String(btn.textContent || '').trim().toLowerCase();
                if (!text) continue;
                if (includes ? text.includes(want) : text === want) {
                    return btn;
                }
            }
            return null;
        }

        /**
         * Encontra a linha da hunt pelo nome em <b> (ex.: "Cobras").
         * @param {string} huntName
         * @returns {Element|null}
         */
        static findStageRowByName(huntName) {
            const want = String(huntName || '').trim().toLowerCase();
            if (!want) return null;
            const rows = document.querySelectorAll('.sp-list.hunt-grid .im-row.stage-row, .hunt-grid .stage-row');
            for (const row of rows) {
                const nameEl = row.querySelector('.stage-name-line b');
                const name = String(nameEl?.textContent || '').trim().toLowerCase();
                if (name === want) return row;
            }
            return null;
        }

        /**
         * Extrai o nome do boss da .boss-cell.
         * Ordem: .boss-cell-name â data-tip â title â data-tip no cell.
         * (ex.: "Shadowpelt Â· 2 vitÃ³rias" â "Shadowpelt").
         * @param {Element|null} cell
         * @returns {string}
         */
        static getBossCellName(cell) {
            if (!cell) return '';
            try {
                const nameEl =
                    cell.querySelector?.('b.boss-cell-name, .boss-cell-name') || null;
                const fromEl = String(nameEl?.textContent || '')
                    .replace(/\s+/g, ' ')
                    .trim();
                if (fromEl) return fromEl;
            } catch (_) {}
            const tip = String(
                cell.getAttribute?.('data-tip') ||
                    cell.getAttribute?.('title') ||
                    cell.getAttribute?.('data-original-title') ||
                    ''
            ).trim();
            if (!tip) return '';
            return tip.split('Â·')[0].trim();
        }

        /**
         * BotÃ£o "Enfrentar" dentro de uma .boss-cell (apÃ³s expandida).
         * @param {Element|null} cell
         * @returns {HTMLButtonElement|null}
         */
        static findBossFightButton(cell) {
            if (!cell?.querySelector) return null;
            const btn =
                cell.querySelector('button.boss-fight.boss-cell-go') ||
                cell.querySelector('button.boss-cell-go') ||
                cell.querySelector('button.boss-fight') ||
                cell.querySelector('.boss-cell-detail button.boss-fight');
            return btn || null;
        }

        /**
         * CÃ©lula expandida (prÃ©-confirmaÃ§Ã£o "Enfrentar").
         * @param {Element|null} cell
         * @returns {boolean}
         */
        static isBossCellExpanded(cell) {
            if (!cell) return false;
            if (cell.classList?.contains('expanded')) return true;
            const btn = this.findBossFightButton(cell);
            if (!btn) return false;
            try {
                return this.isClickable(btn);
            } catch (_) {
                return false;
            }
        }

        /**
         * Aba "Bosses" do modal de chefes (nÃ£o a aba Auto Boss).
         * @returns {Element|null}
         */
        static findBossTabBosses() {
            const tabs = document.querySelectorAll(
                '#boss-modal-body button.boss-tab, .boss-tabs button.boss-tab'
            );
            for (const tab of tabs) {
                const text = String(tab.textContent || '')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toLowerCase();
                if (text === 'bosses' || text.indexOf('bosses') === 0) {
                    return tab;
                }
            }
            return null;
        }

        /**
         * CÃ©lula do boss no modal Chefes pelo nome (title antes do "Â·").
         * @param {string} bossName
         * @returns {Element|null}
         */
        static findBossCellByName(bossName) {
            const want = String(bossName || '').trim().toLowerCase();
            if (!want) return null;
            const cells = document.querySelectorAll(
                '#boss-modal-body .boss-pane-list .boss-cell, .boss-pane-list .boss-cell, .sp-list.boss-cardgrid .boss-cell'
            );
            let fuzzy = null;
            for (const cell of cells) {
                if (cell.closest?.('.boss-pane-auto')) continue;
                const name = this.getBossCellName(cell).toLowerCase();
                if (!name) continue;
                if (name === want) return cell;
                if (!fuzzy && (name.includes(want) || want.includes(name))) {
                    fuzzy = cell;
                }
            }
            return fuzzy;
        }

        /**
         * Campo de busca do modal de bosses.
         * @returns {HTMLInputElement|null}
         */
        static findBossSearchInput() {
            return this.findElement(this.BOSS.SEARCH, 'BOSS_SEARCH');
        }

        /**
         * Parseia data-cmpitem de uma .cell.
         * @param {Element|null} cell
         * @returns {{name?:string,tier?:number,uid?:number,hash?:string,attrs?:any[]}|null}
         */
        static parseCmpItem(cell) {
            if (!cell) return null;
            const raw = cell.getAttribute?.('data-cmpitem') || cell.dataset?.cmpitem;
            if (!raw) return null;
            try {
                const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
                if (!data || typeof data !== 'object') return null;
                return data;
            } catch (_) {
                return null;
            }
        }

        /**
         * Tier do item (0â5) ou null se nÃ£o for item classificado.
         * @param {Element|null} cell
         * @returns {number|null}
         */
        static getItemTier(cell) {
            const data = this.parseCmpItem(cell);
            if (!data || typeof data.tier !== 'number') return null;
            const tier = data.tier | 0;
            return tier >= 0 && tier <= 5 ? tier : null;
        }

        /**
         * Meta de raridade pelo tier.
         * @param {number} tier
         * @returns {{id:number,key:string,label:string,color:string}|null}
         */
        static getTierInfo(tier) {
            const t = this.ITEMS.TIER[tier];
            return t || null;
        }

        /**
         * CÃ©lulas com item (data-cmpitem) em um grid.
         * @param {Element|null} grid
         * @returns {Element[]}
         */
        static listItemCells(grid) {
            if (!grid?.querySelectorAll) return [];
            return Array.from(grid.querySelectorAll('.cell[data-cmpitem]'));
        }

        /**
         * CÃ©lulas de material empilhÃ¡vel (.cell.mat) â loot sem data-cmpitem.
         * @param {Element|null} grid
         * @returns {Element[]}
         */
        static listMatCells(grid) {
            if (!grid?.querySelectorAll) return [];
            return Array.from(grid.querySelectorAll('.cell.mat'));
        }

        /**
         * Todas as cÃ©lulas com conteÃºdo Ãºtil (equip + materiais) em um grid.
         * @param {Element|null} grid
         * @returns {Element[]}
         */
        static listBagCells(grid) {
            if (!grid?.querySelectorAll) return [];
            return Array.from(
                grid.querySelectorAll('.cell[data-cmpitem], .cell.mat')
            );
        }

        /**
         * Itens no #inv-grid cujo tier estÃ¡ na lista (ex.: [1,2,3,4,5]).
         * @param {number[]} tiers
         * @returns {Element[]}
         */
        static findInvItemsByTiers(tiers) {
            const want = new Set((Array.isArray(tiers) ? tiers : []).map((n) => n | 0));
            if (!want.size) return [];
            const grid = this.findElement(this.ITEMS.INV_GRID, 'INV_GRID');
            if (!grid) return [];
            return this.listItemCells(grid).filter((cell) => {
                const tier = this.getItemTier(cell);
                return tier != null && want.has(tier);
            });
        }

        /**
         * Primeira cÃ©lula vazia no backpack (sem item / sem material).
         * @returns {Element|null}
         */
        static findEmptyBackpackSlot() {
            const grid = this.findElement(this.ITEMS.BACKPACK_GRID, 'BACKPACK_GRID');
            if (!grid) return null;
            const cells = grid.querySelectorAll('.cell');
            for (const cell of cells) {
                if (cell.hasAttribute('data-cmpitem')) continue;
                if (cell.classList.contains('mat')) continue;
                if (cell.querySelector('img')) continue;
                return cell;
            }
            return null;
        }

        /**
         * Simula Shift+clique (jogo move pilha inv â backpack / backpack â loot).
         * @param {Element|null} el
         * @returns {boolean}
         */
        static shiftClick(el) {
            if (!el) return false;
            try {
                const opts = {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    shiftKey: true,
                    button: 0,
                    buttons: 1
                };
                el.dispatchEvent(new MouseEvent('pointerdown', opts));
                el.dispatchEvent(new MouseEvent('mousedown', opts));
                el.dispatchEvent(new MouseEvent('pointerup', opts));
                el.dispatchEvent(new MouseEvent('mouseup', opts));
                el.dispatchEvent(new MouseEvent('click', opts));
                return true;
            } catch (_) {
                return false;
            }
        }

        /**
         * Verifica se o elemento estÃ¡ visÃ­vel e clicÃ¡vel.
         * @param {Element|null} el
         * @returns {boolean}
         */
        static isClickable(el) {
            if (!el) return false;
            try {
                if (el.disabled || el.getAttribute('disabled') != null) return false;
                const style = window.getComputedStyle(el);
                if (!style) return true;
                if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
                    return false;
                }
                const rect = el.getBoundingClientRect?.();
                if (rect && rect.width <= 0 && rect.height <= 0) return false;
                return true;
            } catch (_) {
                return true;
            }
        }
    }

    window.BaiakIdleSeletores = BaiakIdleSeletores;
})();


// MÃ³dulo Baiak Idle (MAIN): Kills/h (teste)
//
// Conta monstro morto via Server Log: linhas "â¦ â derrotado!"
// HistÃ³rico por sessÃ£o (#an-session): sprite, kills, exp total por monstro.
//
// EstratÃ©gia de captura (tab do chat):
// 1) MutationObserver em #chat-msgs â se o jogo injetar .chat-line.sys mesmo
//    com outra aba ativa, contamos sem precisar da aba Server Log.
// 2) Soft-focus: a cada N s, se Server Log nÃ£o estiver ativa e o input
//    do chat NÃO estÃ¡ focado, reabre Server Log (receptivo ao Auto AnÃºncio
//    que troca de aba ~3s; depois do envio a aba volta sozinha).
// 3) Ao ligar, registra linhas atuais como "jÃ¡ vistas" (nÃ£o zera com histÃ³rico).
//
// Status no overlay: "128 Â· 420/h" (total Â· taxa na janela)

(function () {
  if (typeof window.BaiakIdleKillsHoraModule !== 'undefined') return;

  const POLL_MS = 1500;
  const KEEP_SERVERLOG_MS = 6000;
  const RATE_WINDOW_MS = 5 * 60 * 1000;
  const SEEN_MAX = 4000;
  const KILL_TS_MAX = 2000;
  const HISTORY_MAX = 80;

  /** "â¦ em Rage Squid â derrotado!" / "â¦ em Rage Squid [crÃ­tico] â derrotado!" */
  const RE_KILL = /(?:â\s*)?derrotado!?\s*$/i;
  const RE_MOB =
    /\bem\s+(.+?)(?:\s*\[[^\]]+\])?\s*(?:â|-)?\s*derrotado!?\s*$/i;

  function normName(s) {
    return String(s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /** SÃ³ a palavra "Boss" (sem monstro base). */
  function isOnlyBossLabel(name) {
    const k = normName(name);
    return !k || k === '?' || k === 'boss';
  }

  /** "Burning Book Boss" â "Burning Book" (sprite/exp do monstro base). */
  function stripBossSuffix(name) {
    return String(name || '')
      .replace(/\s+boss\s*$/i, '')
      .trim();
  }

  function formatNum(n) {
    const v = Math.max(0, Math.round(Number(n) || 0));
    try {
      return v.toLocaleString('pt-BR');
    } catch (_) {
      return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  }

  class BaiakIdleKillsHoraModule {
    constructor() {
      this._running = false;
      this._timer = null;
      this._keepTimer = null;
      this._observer = null;
      this._obsRoot = null;
      /** @type {Set<string>} */
      this._seen = new Set();
      /** ordem para podar o Set */
      this._seenOrder = [];
      /** @type {number[]} timestamps de kills */
      this._killTs = [];
      /** @type {Record<string, number>} kills por nome (como veio no log) */
      this._byMob = Object.create(null);
      this._total = 0;
      this._startedAt = 0;
      this._lastStatusKey = '';
      this._lastKeepAt = 0;
      this._sessionKills = 0;
      this._tabMode = 'observe'; // observe | soft_keep
      this._lastTab = '';
      this._missedTicks = 0;
      /** @type {number|null} */
      this._lastSessionSec = null;
      /** @type {Map<string, { name: string, exp: number, sprite: string }>|null} */
      this._creatureIndex = null;
      this._creatureIndexAt = 0;
    }

    _log() {}

    _sel() {
      return window.BaiakIdleSeletores || null;
    }

    _sleep(ms) {
      return new Promise((r) => setTimeout(r, Math.max(0, ms | 0)));
    }

    _emitStatus(status, remainingText, extra) {
      const text = String(remainingText || '');
      const histKey = extra?.history
        ? extra.history
            .map((h) => h.name + ':' + h.kills + ':' + h.expTotal)
            .join(';')
        : '';
      const key = status + '|' + text + '|' + histKey;
      if (key === this._lastStatusKey) return;
      this._lastStatusKey = key;
      try {
        window.postMessage(
          {
            source: 'TIBIA_BOT_MAIN',
            type: 'MODULE_STATUS',
            payload: {
              botId: 'baiak_idle',
              botLabel: 'Baiak-Idle',
              moduleId: 'kills_hora',
              moduleLabel: 'Kills/h',
              status,
              remainingMs: 0,
              remainingText: text,
              running: !!this._running,
              extra: extra || null
            }
          },
          '*'
        );
      } catch (_) {}
    }

    _msgsRoot() {
      return (
        document.getElementById('chat-msgs') ||
        document.querySelector('#chat-msgs') ||
        document.querySelector('.chat-msgs') ||
        null
      );
    }

    _chatPanel() {
      return (
        document.getElementById('chat-panel') ||
        document.querySelector('#chat-panel') ||
        null
      );
    }

    _serverlogTab() {
      return (
        document.querySelector('.chat-tab[data-tab="serverlog"]') ||
        document.querySelector('button.chat-tab[data-tab="serverlog"]') ||
        null
      );
    }

    _activeChatTab() {
      const on = document.querySelector('.chat-tab.on[data-tab]');
      return on ? String(on.getAttribute('data-tab') || '') : '';
    }

    _isServerLogActive() {
      return this._activeChatTab() === 'serverlog';
    }

    _chatInputFocused() {
      try {
        const el = document.activeElement;
        if (!el) return false;
        if (el.id === 'chat-input') return true;
        if (el.matches && el.matches('#chat-input, .chat-inputrow input')) return true;
        return false;
      } catch (_) {
        return false;
      }
    }

    _readSessionEl() {
      try {
        return (
          document.querySelector('#an-session') ||
          document.querySelector('b#an-session') ||
          null
        );
      } catch (_) {
        return null;
      }
    }

    _readSessionSec() {
      try {
        const text = String(this._readSessionEl()?.textContent || '').trim();
        const m = text.match(/^(\d+):(\d{2}):(\d{2})$/);
        if (!m) return null;
        const h = parseInt(m[1], 10);
        const min = parseInt(m[2], 10);
        const sec = parseInt(m[3], 10);
        if (![h, min, sec].every((n) => Number.isFinite(n))) return null;
        return h * 3600 + min * 60 + sec;
      } catch (_) {
        return null;
      }
    }

    _click(el) {
      const S = this._sel();
      if (S?.clickElement) return !!S.clickElement(el);
      if (!el) return false;
      try {
        el.click();
        return true;
      } catch (_) {
        return false;
      }
    }

    /**
     * Soft keep: reabre Server Log sem brigar com digitaÃ§Ã£o / janela curta de anÃºncio.
     * Auto AnÃºncio fica ~0,5â3s em outra aba; nosso keep roda a cada KEEP_SERVERLOG_MS.
     */
    _softKeepServerLog() {
      if (!this._running) return;
      if (this._chatInputFocused()) return;
      if (this._isServerLogActive()) {
        this._lastTab = 'serverlog';
        return;
      }
      const now = Date.now();
      if (now - this._lastKeepAt < KEEP_SERVERLOG_MS - 200) return;
      this._lastKeepAt = now;
      const tab = this._serverlogTab();
      if (!tab) return;
      this._tabMode = 'soft_keep';
      this._click(tab);
    }

    _lineKey(timeText, bodyText) {
      return String(timeText || '') + '|' + String(bodyText || '').slice(0, 220);
    }

    _remember(key) {
      if (this._seen.has(key)) return false;
      this._seen.add(key);
      this._seenOrder.push(key);
      if (this._seenOrder.length > SEEN_MAX) {
        const drop = this._seenOrder.splice(0, this._seenOrder.length - SEEN_MAX);
        for (const k of drop) this._seen.delete(k);
      }
      return true;
    }

    /** Ãndice nomeâexp/sprite a partir do catÃ¡logo de hunts (MAIN). */
    _ensureCreatureIndex(force) {
      const now = Date.now();
      if (
        !force &&
        this._creatureIndex &&
        now - this._creatureIndexAt < 30000
      ) {
        return this._creatureIndex;
      }
      /** @type {Map<string, { name: string, exp: number, sprite: string }>} */
      const map = new Map();
      const catalog = Array.isArray(window.BAIAK_IDLE_HUNT_DETAILS)
        ? window.BAIAK_IDLE_HUNT_DETAILS
        : [];
      for (const hunt of catalog) {
        const creatures = Array.isArray(hunt?.creatures) ? hunt.creatures : [];
        for (const c of creatures) {
          if (!c || !c.name) continue;
          const key = normName(c.name);
          if (!key || map.has(key)) continue;
          map.set(key, {
            name: String(c.name),
            exp: Math.max(0, Number(c.exp) || 0),
            sprite: String(c.sprite || '')
          });
        }
      }
      // GET_HUNT_CREATURE helpers e nomes alternativos jÃ¡ cobertos pelo loop
      this._creatureIndex = map;
      this._creatureIndexAt = now;
      return map;
    }

    _lookupCreature(mobName) {
      if (isOnlyBossLabel(mobName)) return null;
      const key = normName(mobName);
      if (!key) return null;
      const map = this._ensureCreatureIndex(false);
      if (map.has(key)) return map.get(key);

      // Boss da hunt: mesma aparÃªncia/exp do monstro base (ex.: Burning Book Boss â Burning Book)
      const baseRaw = stripBossSuffix(mobName);
      const baseKey = normName(baseRaw);
      if (baseKey && baseKey !== key && map.has(baseKey)) {
        return map.get(baseKey);
      }

      // match parcial (log Ã s vezes encurta ou com sufixo)
      for (const [k, v] of map) {
        if (k === key || k === baseKey) return v;
        if (k.includes(key) || key.includes(k)) {
          if (Math.abs(k.length - key.length) <= 4) return v;
        }
        if (baseKey && (k.includes(baseKey) || baseKey.includes(k))) {
          if (Math.abs(k.length - baseKey.length) <= 4) return v;
        }
      }
      return null;
    }

    _parseKill(text) {
      const t = String(text || '')
        .replace(/\s+/g, ' ')
        .trim();
      if (!t || !RE_KILL.test(t)) return null;
      // ignora frases de wave/sistema sem monstro
      if (/^wave\b/i.test(t)) return null;
      if (/conclu[iÃ­]da/i.test(t) && !/em\s+/i.test(t)) return null;
      let mob = '';
      const m = t.match(RE_MOB);
      if (m) mob = String(m[1] || '').trim();
      if (!mob) {
        // fallback: "X derrotado" no final sem "em "
        const m2 = t.match(
          /([A-Za-zÃ-Ã¿][\wÃ-Ã¿' .\-]{1,60}?)\s*(?:â|-)?\s*derrotado!?\s*$/i
        );
        if (m2) mob = m2[1].trim();
      }
      if (!mob || mob.length > 80) mob = '?';
      // sÃ³ "Boss" nÃ£o entra no contador/histÃ³rico
      if (isOnlyBossLabel(mob)) return null;
      return { mob, text: t };
    }

    _resetSession(reason) {
      this._total = 0;
      this._sessionKills = 0;
      this._byMob = Object.create(null);
      this._killTs = [];
      this._startedAt = Date.now();
      this._lastStatusKey = '';
      this._log('sessÃ£o resets', reason || '');
      this._publish();
    }

    _registerKill(mob) {
      if (isOnlyBossLabel(mob)) return;
      const now = Date.now();
      this._total += 1;
      this._sessionKills += 1;
      this._killTs.push(now);
      if (this._killTs.length > KILL_TS_MAX) {
        this._killTs.splice(0, this._killTs.length - KILL_TS_MAX);
      }
      const name = String(mob || '?').trim();
      this._byMob[name] = (this._byMob[name] || 0) + 1;
      this._publish();
    }

    _killsPerHour() {
      const now = Date.now();
      const cutoff = now - RATE_WINDOW_MS;
      while (this._killTs.length && this._killTs[0] < cutoff) {
        this._killTs.shift();
      }
      const n = this._killTs.length;
      if (!n) return 0;
      const windowMs = Math.min(RATE_WINDOW_MS, Math.max(1000, now - this._startedAt));
      const elapsed = Math.max(60 * 1000, now - (this._killTs[0] || this._startedAt));
      const use = Math.min(windowMs, elapsed);
      return Math.round((n / use) * 3600 * 1000);
    }

    /** HistÃ³rico completo da Session do jogo, ordenado por exp total (topo = trofÃ©u). */
    _buildHistory() {
      const rows = [];
      let expGrand = 0;
      for (const name of Object.keys(this._byMob)) {
        if (isOnlyBossLabel(name)) continue;
        const kills = this._byMob[name] || 0;
        if (kills <= 0) continue;
        const info = this._lookupCreature(name);
        const expUnit = info ? info.exp : 0;
        const expTotal = expUnit * kills;
        expGrand += expTotal;
        rows.push({
          // mantÃ©m nome do log (ex.: "Burning Book Boss"); sprite vem do monstro base
          name: name,
          kills,
          exp: expUnit,
          expTotal,
          sprite: info?.sprite || ''
        });
      }
      rows.sort(
        (a, b) =>
          b.expTotal - a.expTotal ||
          b.kills - a.kills ||
          a.name.localeCompare(b.name)
      );
      const topExp = rows.length ? rows[0].expTotal : 0;
      for (const row of rows) {
        row.topExp = topExp > 0 && row.expTotal === topExp;
      }
      return {
        history: rows.slice(0, HISTORY_MAX),
        expTotal: expGrand
      };
    }

    _formatK(n) {
      const v = Math.max(0, Number(n) || 0);
      if (v >= 1000) {
        const k = v / 1000;
        return (k >= 10 ? Math.round(k) : Math.round(k * 10) / 10) + 'k';
      }
      return String(v);
    }

    _publish() {
      const kh = this._killsPerHour();
      const tab = this._activeChatTab() || '?';
      const { history, expTotal } = this._buildHistory();
      // Overlay: sÃ³ total de mortos + kills/h (sem off-tab/geral/log â polui).
      const text =
        this._formatK(this._total) + ' Â· ' + this._formatK(kh) + '/h';
      this._emitStatus('kills', text, {
        total: this._total,
        killsH: kh,
        expTotal,
        history,
        tab,
        serverLog: this._isServerLogActive(),
        startedAt: this._startedAt,
        sessionSec: this._lastSessionSec
      });
    }

    _processLineEl(lineEl, { bootstrap } = {}) {
      if (!lineEl || lineEl.nodeType !== 1) return;
      if (!lineEl.classList?.contains('chat-line') && !lineEl.querySelector?.('.chat-text')) {
        if (lineEl.classList?.contains('chat-text')) {
          const body = lineEl.textContent || '';
          const parent = lineEl.closest?.('.chat-line');
          const time = parent?.querySelector?.('.chat-time')?.textContent || '';
          this._processText(time, body, { bootstrap });
        }
        return;
      }
      const time = lineEl.querySelector?.('.chat-time')?.textContent || '';
      const body =
        lineEl.querySelector?.('.chat-text')?.textContent ||
        lineEl.textContent ||
        '';
      this._processText(time, body, { bootstrap });
    }

    _processText(time, body, { bootstrap } = {}) {
      const key = this._lineKey(time, body);
      if (!this._remember(key)) return;
      if (bootstrap) return; // sÃ³ marca como visto
      const kill = this._parseKill(body);
      if (!kill) return;
      this._registerKill(kill.mob);
    }

    _scanAllLines({ bootstrap } = {}) {
      const root = this._msgsRoot();
      if (!root) return 0;
      const lines = root.querySelectorAll('.chat-line');
      let n = 0;
      for (const el of lines) {
        this._processLineEl(el, { bootstrap: !!bootstrap });
        n += 1;
      }
      return n;
    }

    _onMutations(mutations) {
      for (const mut of mutations) {
        if (mut.type === 'childList') {
          for (const node of mut.addedNodes) {
            if (node.nodeType === 1) {
              if (node.classList?.contains('chat-line') || node.querySelector?.('.chat-text')) {
                this._processLineEl(node, { bootstrap: false });
              }
              const lines = node.querySelectorAll?.('.chat-line');
              if (lines) {
                for (const line of lines) this._processLineEl(line, { bootstrap: false });
              }
            } else if (node.nodeType === 3) {
              this._processText('', node.textContent || '', { bootstrap: false });
            }
          }
        } else if (mut.type === 'characterData') {
          const el = mut.target?.parentElement;
          if (el) this._processLineEl(el, { bootstrap: false });
        }
      }
    }

    _ensureObserver() {
      const root = this._msgsRoot() || this._chatPanel() || document.body;
      if (!root) return;
      if (this._observer && this._obsRoot === root) return;
      if (this._observer) {
        try {
          this._observer.disconnect();
        } catch (_) {}
        this._observer = null;
      }
      this._obsRoot = root;
      this._observer = new MutationObserver((muts) => this._onMutations(muts));
      this._observer.observe(root, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    _checkSessionReset() {
      const sessionSec = this._readSessionSec();
      if (
        this._lastSessionSec != null &&
        sessionSec != null &&
        sessionSec + 5 < this._lastSessionSec
      ) {
        // SessÃ£o do jogo reiniciou â nova anÃ¡lise
        this._resetSession('session_reset');
      }
      this._lastSessionSec = sessionSec;
    }

    _tick() {
      if (!this._running) return;
      try {
        this._checkSessionReset();
        this._ensureCreatureIndex(false);
        this._ensureObserver();
        this._scanAllLines({ bootstrap: false });

        if (!this._isServerLogActive()) {
          this._missedTicks += 1;
          if (this._missedTicks >= 2) this._softKeepServerLog();
        } else {
          this._missedTicks = 0;
          this._tabMode = 'observe';
        }
        this._publish();
      } catch (err) {
        this._log('tick', err);
      }
    }

    start() {
      if (this._running) {
        this._tick();
        return { success: true, alreadyRunning: true };
      }
      this._running = true;
      this._startedAt = Date.now();
      this._total = 0;
      this._sessionKills = 0;
      this._byMob = Object.create(null);
      this._killTs = [];
      this._seen = new Set();
      this._seenOrder = [];
      this._lastStatusKey = '';
      this._missedTicks = 0;
      this._lastSessionSec = this._readSessionSec();
      this._creatureIndex = null;
      this._ensureCreatureIndex(true);

      try {
        const tab = this._serverlogTab();
        if (tab && !tab.classList.contains('on') && !this._chatInputFocused()) {
          this._click(tab);
        }
      } catch (_) {}

      setTimeout(() => {
        if (!this._running) return;
        this._scanAllLines({ bootstrap: true });
        this._ensureObserver();
        this._publish();
      }, 350);

      this._timer = setInterval(() => this._tick(), POLL_MS);
      this._keepTimer = setInterval(() => this._softKeepServerLog(), KEEP_SERVERLOG_MS);
      return { success: true };
    }

    stop() {
      if (this._timer) {
        clearInterval(this._timer);
        this._timer = null;
      }
      if (this._keepTimer) {
        clearInterval(this._keepTimer);
        this._keepTimer = null;
      }
      if (this._observer) {
        try {
          this._observer.disconnect();
        } catch (_) {}
        this._observer = null;
      }
      this._obsRoot = null;
      this._running = false;
      this._emitStatus('stopped', '', null);
      this._lastStatusKey = '';
      return { success: true };
    }

    isRunning() {
      return !!this._running;
    }

    getStats() {
      const { history, expTotal } = this._buildHistory();
      return {
        total: this._total,
        killsH: this._killsPerHour(),
        expTotal,
        history,
        since: this._startedAt
      };
    }

    /** API: zera anÃ¡lise (mantÃ©m mÃ³dulo ligado) â mesma lÃ³gica de nova #an-session. */
    resetSession() {
      if (!this._running) return { success: false, error: 'not_running' };
      this._resetSession('api');
      return { success: true };
    }
  }

  window.BaiakIdleKillsHoraModule = BaiakIdleKillsHoraModule;

  try {
    const prev = window.__baiakIdleKillsHora;
    const wasRunning = !!prev?.isRunning?.();
    try {
      prev?.stop?.();
    } catch (_) {}
    // remove listener antigo se existir
    try {
      if (prev?._boundMsg) window.removeEventListener('message', prev._boundMsg);
    } catch (_) {}
    window.__baiakIdleKillsHora = new BaiakIdleKillsHoraModule();
    if (wasRunning || window.__BAIAKIDLE_AUTO_START_KILLS_HORA__) {
      window.__baiakIdleKillsHora.start();
    }
  } catch (err) {
    console.error('[BaiakIdle Kills/h] Falha no bootstrap', err);
  }
})();
