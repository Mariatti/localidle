/* TB-WM u=179 e=a07d5b4cfa x=f2e5047b9289 t=1786720278 s=19e792b4f3aab7d7 */
(function(){try{window.__TIBIABOT_WM__={u:179,t:1786720278,x:"f2e5047b9289",s:"19e792b4f3aab7d7"};}catch(e){}})();

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


// MÃ³dulo Baiak Idle (MAIN): Mapa de entidades
// - Fundo: captura PIXEL (minimap)
// - Party/mobs: NAMEPLATE WebGL (fillText â texSubImage â quad)
// - Pin no corpo = centro do nome + offset Y

(function () {
  /** EspaÃ§o lÃ³gico interno tÃ­pico do Baiak (mesmo aspect do canvas 1109Ã813). */
  const WORLD_W = 480;
  const WORLD_H = 352;
  /** Fallback se canvas ainda nÃ£o reportar size (HTML atual: 1109Ã813). */
  const ARENA_FALLBACK_W = 1109;
  const ARENA_FALLBACK_H = 813;
  const SCAN_MS = 80;
  /** Intervalo da captura do fundo (pixel). */
  const PIXEL_MS = 200;
  const PIXEL_SCALE = 0.4;
  /** false = posiÃ§Ã£o via nameplate GL (teste atual). */
  const USE_PIXEL_POSITIONS = false;
  /** Nome fica acima do char; pin desce para o corpo (fraÃ§Ã£o da altura do canvas). */
  const BODY_OFFSET_FRAC = 0.045;
  /** Uploadâquad: janela curta (ms). */
  const UPLOAD_BIND_MS = 160;
  /** SÃ³ visual: no mini-mapa bloqueia cena estÃ¡tica (captura intacta). Default off. */
  const HIDE_SCENE_PREVIEW = false;
  const SHOW_ARENA_OVERLAY = true;
  const STICKY_MOB_MS = 700;
  const STICKY_PARTY_MS = 8000;
  const META_MOB_MS = 4000;
  const MATCH_MAX_ERR = 4.5;
  const MAX_JUMP = 55;
  const DEADZONE = 7;
  const SMOOTH = 0.3;
  const MIN_SEP = 10;
  const MOB_NEAR_PARTY = 140;
  const WRAP_ID = 'tb-mapa-entidades-wrap';
  const MARK_ID = 'tb-mapa-pixel-marks';
  /** 1 seleÃ§Ã£o = 1 template travado. */
  const CALIB_MAX = 1;
  const CALIB_LAYER_ID = 'tb-mapa-calib-click';
  const LOCK_ACQUIRE_R = 95;
  const LOCK_FOLLOW_R = 78;
  /** Template no sample: lado mÃ¡ximo (px). */
  const TMPL_MAX = 56;
  const TMPL_MIN_WORLD = 10;
  const VOCATIONS = [
    { id: 'ek', label: 'EK', re: /knight/i },
    { id: 'ed', label: 'ED', re: /druid/i },
    { id: 'ms', label: 'MS', re: /sorcerer/i },
    { id: 'rp', label: 'RP', re: /paladin/i },
    { id: 'monk', label: 'MONK', re: /monk/i }
  ];
  const SPELL_RE =
    /^(exori|exura|adori|utevo|exevo|exeta|exana|expel|utamo|utana|utito|utura|utamo|aaaa)/i;
  const SPELL_ANY_RE =
    /\b(exori|exura|adori|utevo|exevo|exeta|exana|expel|utamo|utana|utito|utura|gran mas|mas flam|mas frigo|mas vis|mas san|mas tera|sio|pox|hur|lux|mort|flam|frigo|vis|san|tera|sudden|death|avalanche|thunderstorm|energy\s*strike|flame\s*strike|ice\s*strike|death\s*strike|holy\s*strike|terra\s*strike)\b/i;

  function isSpellText(t) {
    const s = String(t || '').trim();
    if (!s) return false;
    if (SPELL_RE.test(s)) return true;
    if (SPELL_ANY_RE.test(s)) return true;
    // "exura sio", "exevo gran mas vis", etc.
    if (/^(ex|ut|ad)[a-z]{2,}/i.test(s) && (s.includes(' ') || s.length >= 5)) return true;
    if (/^[a-z]{2,}\s+(sio|gran|mas|hur|lux|pox)/i.test(s)) return true;
    return false;
  }

  function normKey(name) {
    return String(name || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function isNameplateText(t) {
    const s = String(t || '').trim();
    if (s.length < 3 || s.length > 40) return false;
    if (!/^[A-Za-zÃ-Ã¿]/.test(s)) return false;
    if (/^\d/.test(s)) return false;
    if (isSpellText(s)) return false;
    if (/^(ex|ut|ad)/i.test(s) && s.includes(' ')) return false;
    if (/gold/i.test(s)) return false;
    if (s === 'TibiaBot.Online') return false;
    if (/^-?\d+/.test(s)) return false;
    if (/^[+\-]?[\d.,\s]+$/.test(s)) return false;
    if (/^(ms|spr|lum|px|mob|pt|ent|n|h|o|m|drawimage|readpixels)$/i.test(s)) return false;
    if (/^(captura|preta)$/i.test(s)) return false;
    return true;
  }

  class BaiakIdleMapaEntidadesModule {
    constructor() {
      this._running = false;
      this._arena = null;
      this._gl = null;
      /** @type {Map<string,{w:number,party:boolean,seenAt:number,display:string,label:string}>} */
      this._meta = new Map();
      /** @type {Map<string,{x:number,y:number,party:boolean,updatedAt:number,display:string}>} */
      this._pins = new Map();
      this._wrap = null;
      this._mini = null;
      this._mctx = null;
      this._countEl = null;
      this._drawIv = null;
      this._partyIv = null;
      this._lastScan = 0;
      this._lastStatusKey = '';
      this._oFill = null;
      this._oStroke = null;
      this._oSub = null;
      this._oDrawEl = null;
      this._hookedFill = null;
      this._hookedStroke = null;
      this._partyAliases = new Map();
      /** @type {Map<string,{display:string,className:string}>} */
      this._partyMembers = new Map();
      this._lastFont = '10px sans-serif';
      this._textScale = 2.266;
      this._measureCtx = null;
      this._huntKey = '';
      /** @type {{ x:number, y:number, kind:string, w:number }[]} coords em pixel da arena (full-res) */
      this._pixelBlobs = [];
      this._pixelIv = null;
      this._sampleCanvas = null;
      this._sampleCtx = null;
      this._markLayer = null;
      this._lastPixelMs = 0;
      this._lastPixelCount = 0;
      /** @type {Uint8ClampedArray|null} */
      this._prevSample = null;
      this._prevSw = 0;
      this._prevSh = 0;
      this._glDrawSeq = 0;
      this._heldBlobs = [];
      this._heldAt = 0;
      this._stableMap = new Map();
      /** @type {{n:number,h:number,m:number,spr:number}} */
      this._scanDbg = { n: 0, h: 0, m: 0, spr: 0 };
      /** Preview: bloqueia cena estÃ¡tica (chÃ£o/muro) via snapshot de camada. */
      this._hideScene = HIDE_SCENE_PREVIEW;
      this._maskCanvas = null;
      this._maskCtx = null;
      this._floorCanvas = null;
      this._floorCtx = null;
      /** @type {Uint8ClampedArray|null} cena estÃ¡tica (chÃ£o+muros+props) */
      this._floorData = null;
      this._floorSw = 0;
      this._floorSh = 0;
      this._floorShotThisFrame = false;
      this._lastFloorAt = 0;
      /** MÃ¡scara do frame anterior (anti-efeito piscando). */
      this._diffKeepPrev = null;
      this._calibrating = false;
      this._calibVoc = '';
      this._calibHintEl = null;
      /** VocaÃ§Ã£o selecionada na UI (Limpar afeta sÃ³ ela). */
      this._selectedVoc = '';
      /** @type {Map<string,{ samples:Array, key:string, display:string, className:string, voc:string, locked:boolean }>} */
      this._vocTracks = new Map();
      /** @type {{x:number,y:number,score:number}[]} blobs de movimento (mundo 480Ã352) */
      this._motionBlobs = [];
      /** Blobs do frame anterior (estabilidade â magia some rÃ¡pido). */
      this._motionBlobsPrev = [];
      /** Enquanto > now, ignora flashes de magia no motion. */
      this._spellMuteUntil = 0;
      /** Ãltimo frame vÃ¡lido (WebGL no mouseup costuma vir preto). */
      this._lastGoodSample = null;
      /** @type {{key:string,display:string,party:boolean,w:number,at:number}[]} */
      this._uploadQueue = [];
      /** EspaÃ§o dos quads GL: 'buf' (arena px) | 'world' (480Ã352) */
      this._quadSpace = 'buf';
      /** @type {{cx:number,cy:number,qw:number,qh:number}[]} Ãºltimos quads (debug) */
      this._lastQuads = [];
    }

    _log() {}

    _sel() {
      return window.BaiakIdleSeletores || null;
    }

    isRunning() {
      return !!this._running;
    }

    _stripVocation(raw) {
      const text = String(raw || '')
        .trim()
        .replace(/\s+/g, ' ');
      if (!text) return '';
      const S = this._sel();
      if (typeof S?.parseClassAndName === 'function') {
        const p = S.parseClassAndName(text);
        if (p?.name) return p.name;
      }
      return text;
    }

    _measureCtx2d() {
      if (!this._measureCtx) {
        const c = document.createElement('canvas');
        this._measureCtx = c.getContext('2d');
      }
      return this._measureCtx;
    }

    /** Estima largura do canvas de texto (nameplate), alinhada ao que o jogo usa. */
    _estimateWidth(label) {
      const text = String(label || '').trim();
      if (!text) return 0;
      try {
        const ctx = this._measureCtx2d();
        ctx.font = this._lastFont || '10px sans-serif';
        const tw = ctx.measureText(text).width;
        const scaled = tw * (this._textScale || 2.266) + 10;
        return Math.max(32, Math.ceil(scaled / 32) * 32);
      } catch (_) {
        return Math.max(32, Math.ceil((text.length * 14) / 32) * 32);
      }
    }

    _refreshParty() {
      const aliases = new Map();
      const members = new Map();
      const S = this._sel();

      const addMember = (raw, classNameHint) => {
        let full = String(raw || '')
          .replace(/\s+/g, ' ')
          .trim();
        if (!full || full === 'TibiaBot.Online') return;

        let className = String(classNameHint || '').trim();
        let display = full;
        if (typeof S?.parseClassAndName === 'function') {
          const p = S.parseClassAndName(full);
          if (p?.name) display = p.name;
          if (p?.className) className = className || p.className;
        } else {
          display = this._stripVocation(full) || full;
        }

        const canon = normKey(display);
        if (!canon) return;

        const prev = members.get(canon);
        members.set(canon, {
          display,
          className: className || prev?.className || ''
        });

        aliases.set(canon, display);
        aliases.set(normKey(full), display);
        if (className) {
          aliases.set(normKey(className + ' ' + display), display);
        }
      };

      try {
        if (typeof S?.getCharactersSnapshot === 'function') {
          for (const c of S.getCharactersSnapshot() || []) {
            addMember(c?.name, c?.className);
            if (c?.className && c?.name) {
              addMember(c.className + ' ' + c.name, c.className);
            }
          }
        }
      } catch (_) {}

      try {
        document.querySelectorAll('#party-list .member, .party .member').forEach((mem) => {
          const nameEl = mem.querySelector('.m-name');
          if (!nameEl) return;
          const raw = String(
            nameEl.getAttribute('data-tb-original-name') || nameEl.textContent || ''
          )
            .replace(/\s+/g, ' ')
            .trim();
          let classHint = '';
          const metaEl = mem.querySelector('.m-meta');
          const metaRaw = String(
            metaEl?.getAttribute?.('data-tb-original-meta') || metaEl?.textContent || ''
          );
          // meta costuma ser "Druid Â· 345" / "M 345"
          const m = metaRaw.match(/^([A-Za-zÃ-Ã¿][A-Za-zÃ-Ã¿\s]+?)(?:\s*[Â·â¢|]|\s+M?\s*\d)/);
          if (m) classHint = m[1].trim();
          addMember(raw, classHint);
        });
      } catch (_) {}

      try {
        document.querySelectorAll('#hud-nick, .hud-nick').forEach((el) => {
          const raw = String(
            el.getAttribute('data-tb-original-name') || el.textContent || ''
          )
            .replace(/\s+/g, ' ')
            .trim();
          addMember(raw, '');
        });
      } catch (_) {}

      this._partyAliases = aliases;
      this._partyMembers = members;
    }

    _resolve(raw) {
      const full = String(raw || '')
        .trim()
        .replace(/\s+/g, ' ');
      if (!full) return null;
      const parsed = this._stripVocation(full) || full;
      const alias = this._partyAliases;
      const hit =
        alias.get(normKey(full)) ||
        alias.get(normKey(parsed)) ||
        alias.get(normKey(full.replace(/\s+/g, '')));
      if (hit) {
        return { key: normKey(hit), display: hit, party: true, label: full };
      }
      const key = normKey(parsed);
      if (!key) return null;
      return { key, display: parsed, party: false, label: full };
    }

    _remember(text, w, font, scaleA) {
      if (!isNameplateText(text)) return;
      if (font) this._lastFont = font;
      if (scaleA && scaleA > 1.2 && scaleA < 4) this._textScale = scaleA;

      const resolved = this._resolve(text);
      if (!resolved) return;
      const prev = this._meta.get(resolved.key);
      const measured = w > 0 ? w : 0;
      this._meta.set(resolved.key, {
        w: measured || prev?.w || 0,
        party: resolved.party || prev?.party || false,
        seenAt: performance.now(),
        display: resolved.display,
        label: resolved.label || prev?.label || resolved.display,
        // veio de fillText/upload real
        fromText: true
      });
    }

    /** Garante meta.w para todo membro da party (estima se preciso). */
    _ensurePartyWidths() {
      for (const [canon, info] of this._partyMembers) {
        const prev = this._meta.get(canon);
        let w = prev?.w || 0;
        let label = prev?.label || '';
        if (!label) {
          if (info.className) label = info.className + ' ' + info.display;
          else label = info.display;
        }
        const fromText = !!prev?.fromText;
        if (!w) w = this._estimateWidth(label);
        const w2 = this._estimateWidth(info.display);
        this._meta.set(canon, {
          w,
          wAlt: w2,
          party: true,
          seenAt: prev?.seenAt || 0,
          display: info.display,
          label,
          fromText
        });
      }
    }

    _findArena() {
      return (
        document.querySelector('#arena canvas') ||
        document.querySelector('.arena-wrap canvas') ||
        null
      );
    }

    /**
     * Tamanho real do canvas do jogo (ex.: 1109Ã813 via --game-w/--game-h).
     */
    _arenaSize() {
      const arena = this._arena || this._findArena();
      let w = arena?.width || 0;
      let h = arena?.height || 0;
      if (w < 32 || h < 32) {
        try {
          const wrap = document.querySelector('.arena-wrap');
          const cs = wrap ? getComputedStyle(wrap) : null;
          const gw = parseFloat(cs?.getPropertyValue('--game-w') || '');
          const gh = parseFloat(cs?.getPropertyValue('--game-h') || '');
          if (gw > 32) w = gw;
          if (gh > 32) h = gh;
        } catch (_) {}
      }
      if (w < 32) w = ARENA_FALLBACK_W;
      if (h < 32) h = ARENA_FALLBACK_H;
      return { w, h, arena };
    }

    _ensureUi() {
      let wrap = document.getElementById(WRAP_ID);
      if (wrap) wrap.remove();
      try {
        document.getElementById('tb-minimap-wrap')?.remove?.();
        window.__tbMarks?.stop?.();
        document.getElementById(CALIB_LAYER_ID)?.remove?.();
      } catch (_) {}

      wrap = document.createElement('div');
      wrap.id = WRAP_ID;
      wrap.innerHTML =
        '<div style="font:700 11px Segoe UI,sans-serif;margin-bottom:6px;display:flex;align-items:center;gap:8px">' +
        '<span>Mapa <span data-role="count" style="font-weight:500;opacity:.7"></span></span>' +
        '<span style="margin-left:auto;font:600 10px Segoe UI,sans-serif;color:#86efac">nameplate</span>' +
        '</div>' +
        '<canvas data-role="mini" width="400" height="294" style="display:block;width:400px;height:294px;' +
        'image-rendering:pixelated;image-rendering:crisp-edges"></canvas>' +
        '<div data-role="calib-hint" style="font:10px Segoe UI,sans-serif;margin-top:6px;opacity:.9;color:#86efac;line-height:1.35">' +
        'Modo nameplate: segue o NOME da party/mobs (pin no corpo, abaixo do nome).' +
        '</div>';
      wrap.style.cssText =
        'position:fixed;right:12px;bottom:12px;z-index:2147483645;pointer-events:none;' +
        'background:rgba(8,12,20,.92);border:1px solid rgba(148,163,184,.35);' +
        'border-radius:10px;padding:8px 10px;color:#e2e8f0;' +
        'box-shadow:0 8px 28px rgba(0,0,0,.45);max-width:420px';
      document.body.appendChild(wrap);
      this._wrap = wrap;
      this._mini = wrap.querySelector('[data-role="mini"]');
      this._mctx = this._mini.getContext('2d');
      this._countEl = wrap.querySelector('[data-role="count"]');
      this._calibHintEl = wrap.querySelector('[data-role="calib-hint"]');
      this._ensureMarkLayer();
    }

    _ensureMarkLayer() {
      try {
        document.getElementById(MARK_ID)?.remove?.();
      } catch (_) {}
      const layer = document.createElement('div');
      layer.id = MARK_ID;
      layer.style.cssText =
        'position:fixed;inset:0;z-index:2147483640;pointer-events:none;overflow:hidden';
      document.body.appendChild(layer);
      this._markLayer = layer;
    }

    _setCalibHint(msg) {
      if (this._calibHintEl) this._calibHintEl.textContent = msg || '';
    }

    _refreshVocBtnCounts() {
      if (!this._wrap) return;
      const sel = this._calibVoc || this._selectedVoc;
      for (const v of VOCATIONS) {
        const t = this._vocTracks.get(v.id);
        const n = t?.locked ? 1 : t?.samples?.length || 0;
        const el = this._wrap.querySelector('[data-voc-n="' + v.id + '"]');
        if (el) el.textContent = String(n);
        const btn = this._wrap.querySelector('[data-voc="' + v.id + '"]');
        if (btn) {
          btn.style.borderColor =
            sel === v.id
              ? 'rgba(74,222,128,.9)'
              : t?.locked
                ? 'rgba(74,222,128,.45)'
                : 'rgba(148,163,184,.4)';
          btn.style.background =
            sel === v.id ? 'rgba(74,222,128,.25)' : 'rgba(30,41,59,.9)';
        }
      }
    }

    _vocationFromClass(className) {
      const c = String(className || '');
      for (const v of VOCATIONS) {
        if (v.re.test(c)) return v;
      }
      return null;
    }

    _resolvePartyForVoc(vocId) {
      this._refreshParty();
      const voc = VOCATIONS.find((v) => v.id === vocId);
      if (!voc) return null;
      for (const [key, info] of this._partyMembers) {
        if (voc.re.test(info.className || '')) {
          return { key, display: info.display, className: info.className || voc.label };
        }
      }
      // fallback: sÃ³ o label da vocaÃ§Ã£o
      return { key: 'voc:' + vocId, display: voc.label, className: voc.label };
    }

    _clearCalibration() {
      const vocId = this._calibVoc || this._selectedVoc;
      if (!vocId) {
        this._setCalibHint('Selecione EK / ED / MS / RP / MONK e clique Limpar.');
        return;
      }
      const track = this._vocTracks.get(vocId);
      if (track?.key) {
        try {
          this._pins.delete(track.key);
        } catch (_) {}
      }
      this._vocTracks.delete(vocId);
      this._removeClickLayer();
      this._calibrating = false;
      this._calibVoc = '';
      const label = VOCATIONS.find((v) => v.id === vocId)?.label || vocId;
      this._refreshVocBtnCounts();
      this._setCalibHint(label + ' liberado. Selecione de novo (arraste em volta do char).');
      this._refreshTmplPreviews();
      this._drawMini();
    }

    _beginVocCalibration(vocId) {
      const linked = this._resolvePartyForVoc(vocId);
      if (!linked) {
        this._setCalibHint('VocaÃ§Ã£o invÃ¡lida.');
        return;
      }
      this._selectedVoc = vocId;
      if (!this._vocTracks.has(vocId)) {
        this._vocTracks.set(vocId, {
          samples: [],
          key: linked.key,
          display: linked.display,
          className: linked.className,
          voc: vocId,
          locked: false,
          tmpl: null
        });
      } else {
        const t = this._vocTracks.get(vocId);
        t.key = linked.key;
        t.display = linked.display;
        t.className = linked.className;
      }
      const track = this._vocTracks.get(vocId);
      if (track.locked && track.tmpl) {
        this._setCalibHint(
          linked.display + ' jÃ¡ tem seleÃ§Ã£o. Limpar solta; ou escolha outra vocaÃ§Ã£o.'
        );
        this._calibVoc = '';
        this._calibrating = false;
        this._removeClickLayer();
        this._refreshVocBtnCounts();
        return;
      }
      this._calibVoc = vocId;
      this._calibrating = true;
      this._ensureClickLayer();
      this._refreshVocBtnCounts();
      this._setCalibHint(
        'Arraste um retÃ¢ngulo em volta do ' +
          (VOCATIONS.find((v) => v.id === vocId)?.label || vocId) +
          ' (' +
          linked.display +
          '). Esc cancela.'
      );
    }

    _ensureClickLayer() {
      this._removeClickLayer();
      const arena = this._arena || this._findArena();
      const r = arena?.getBoundingClientRect?.();
      const layer = document.createElement('div');
      layer.id = CALIB_LAYER_ID;
      if (r && r.width > 8) {
        layer.style.cssText =
          'position:fixed;left:' +
          r.left +
          'px;top:' +
          r.top +
          'px;width:' +
          r.width +
          'px;height:' +
          r.height +
          'px;z-index:2147483646;cursor:crosshair;' +
          'background:rgba(34,197,94,.06);pointer-events:auto;box-shadow:inset 0 0 0 2px rgba(74,222,128,.55)';
      } else {
        layer.style.cssText =
          'position:fixed;inset:0;z-index:2147483646;cursor:crosshair;' +
          'background:rgba(0,0,0,.12);pointer-events:auto';
      }

      const box = document.createElement('div');
      box.style.cssText =
        'position:fixed;display:none;pointer-events:none;z-index:2147483647;' +
        'border:2px dashed #4ade80;background:rgba(74,222,128,.12)';
      layer.appendChild(box);

      let dragging = false;
      let sx = 0;
      let sy = 0;

      const onDown = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        dragging = true;
        sx = ev.clientX;
        sy = ev.clientY;
        box.style.display = 'block';
        box.style.left = sx + 'px';
        box.style.top = sy + 'px';
        box.style.width = '0px';
        box.style.height = '0px';
      };
      const onMove = (ev) => {
        if (!dragging) return;
        const x1 = ev.clientX;
        const y1 = ev.clientY;
        const left = Math.min(sx, x1);
        const top = Math.min(sy, y1);
        box.style.left = left + 'px';
        box.style.top = top + 'px';
        box.style.width = Math.abs(x1 - sx) + 'px';
        box.style.height = Math.abs(y1 - sy) + 'px';
      };
      const onUp = (ev) => {
        if (!dragging) return;
        dragging = false;
        box.style.display = 'none';
        const x1 = ev.clientX;
        const y1 = ev.clientY;
        this._onSelectionDone(sx, sy, x1, y1);
      };

      layer.addEventListener('mousedown', onDown);
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
      layer.__tbDrag = { onMove, onUp };

      const onKey = (ev) => {
        if (ev.key === 'Escape') {
          this._calibrating = false;
          this._calibVoc = '';
          this._removeClickLayer();
          this._refreshVocBtnCounts();
          this._setCalibHint('SeleÃ§Ã£o cancelada.');
        }
      };
      layer.__tbKey = onKey;
      window.addEventListener('keydown', onKey);
      document.body.appendChild(layer);
    }

    _removeClickLayer() {
      const layer = document.getElementById(CALIB_LAYER_ID);
      if (layer?.__tbKey) {
        try {
          window.removeEventListener('keydown', layer.__tbKey);
        } catch (_) {}
      }
      if (layer?.__tbDrag) {
        try {
          window.removeEventListener('mousemove', layer.__tbDrag.onMove);
          window.removeEventListener('mouseup', layer.__tbDrag.onUp);
        } catch (_) {}
      }
      try {
        layer?.remove?.();
      } catch (_) {}
    }

    _clientToNorm(clientX, clientY) {
      const arena = this._arena || this._findArena();
      if (!arena) return null;
      const r = arena.getBoundingClientRect();
      if (r.width < 8 || r.height < 8) return null;
      return {
        nx: (clientX - r.left) / r.width,
        ny: (clientY - r.top) / r.height
      };
    }

    _clientToWorld(clientX, clientY) {
      const n = this._clientToNorm(clientX, clientY);
      if (!n) return null;
      return {
        x: n.nx * WORLD_W,
        y: n.ny * WORLD_H,
        nx: n.nx,
        ny: n.ny,
        inside: n.nx >= 0 && n.nx <= 1 && n.ny >= 0 && n.ny <= 1
      };
    }

    _refreshTmplPreviews() {
      const row = this._tmplRow;
      if (!row) return;
      let html = '';
      for (const v of VOCATIONS) {
        const t = this._vocTracks.get(v.id);
        if (!t?.tmpl?.thumb) continue;
        html +=
          '<div style="text-align:center">' +
          '<div style="font:700 9px Segoe UI,sans-serif;opacity:.8;margin-bottom:2px">' +
          v.label +
          '</div>' +
          '<img alt="" src="' +
          t.tmpl.thumb +
          '" style="width:40px;height:40px;object-fit:contain;image-rendering:pixelated;' +
          'border:1px solid rgba(74,222,128,.5);border-radius:4px;background:#0b1220"/>' +
          '</div>';
      }
      row.innerHTML = html || '';
    }

    /**
     * Recorta do ÃLTIMO frame bom (nÃ£o recaptura no mouseup â WebGL vem preto).
     */
    _captureTemplateFromNorm(nx0, ny0, nx1, ny1) {
      const g = this._lastGoodSample;
      if (!g?.data || g.mean < 12 || g.sw < 8) return null;
      const sw = g.sw;
      const sh = g.sh;
      const data = g.data;

      let x0 = Math.round(Math.min(nx0, nx1) * sw);
      let y0 = Math.round(Math.min(ny0, ny1) * sh);
      let x1 = Math.round(Math.max(nx0, nx1) * sw);
      let y1 = Math.round(Math.max(ny0, ny1) * sh);
      x0 = Math.max(0, Math.min(sw - 2, x0));
      y0 = Math.max(0, Math.min(sh - 2, y0));
      x1 = Math.max(x0 + 2, Math.min(sw - 1, x1));
      y1 = Math.max(y0 + 2, Math.min(sh - 1, y1));
      const tw0 = x1 - x0 + 1;
      const th0 = y1 - y0 + 1;
      if (tw0 < 4 || th0 < 4) return null;

      const raw = new Uint8ClampedArray(tw0 * th0 * 3);
      let p = 0;
      let lumaSum = 0;
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const i = (y * sw + x) * 4;
          raw[p++] = data[i];
          raw[p++] = data[i + 1];
          raw[p++] = data[i + 2];
          lumaSum += (data[i] + data[i + 1] + data[i + 2]) / 3;
        }
      }
      if (lumaSum / (tw0 * th0) < 14) return null;

      let outW = tw0;
      let outH = th0;
      let patch = raw;
      if (tw0 > TMPL_MAX || th0 > TMPL_MAX) {
        const scale = Math.min(TMPL_MAX / tw0, TMPL_MAX / th0);
        outW = Math.max(4, Math.round(tw0 * scale));
        outH = Math.max(4, Math.round(th0 * scale));
        patch = new Uint8ClampedArray(outW * outH * 3);
        for (let y = 0; y < outH; y++) {
          for (let x = 0; x < outW; x++) {
            const sx = Math.min(tw0 - 1, Math.floor((x / outW) * tw0));
            const sy = Math.min(th0 - 1, Math.floor((y / outH) * th0));
            const si = (sy * tw0 + sx) * 3;
            const di = (y * outW + x) * 3;
            patch[di] = raw[si];
            patch[di + 1] = raw[si + 1];
            patch[di + 2] = raw[si + 2];
          }
        }
      }

      let thumb = '';
      try {
        const pv = document.createElement('canvas');
        pv.width = outW;
        pv.height = outH;
        pv.__tbMapaUi = true;
        const pctx = pv.getContext('2d');
        const id = pctx.createImageData(outW, outH);
        for (let i = 0, q = 0; q < patch.length; i += 4) {
          id.data[i] = patch[q++];
          id.data[i + 1] = patch[q++];
          id.data[i + 2] = patch[q++];
          id.data[i + 3] = 255;
        }
        pctx.putImageData(id, 0, 0);
        thumb = pv.toDataURL('image/png');
      } catch (_) {}

      const nx = (Math.min(nx0, nx1) + Math.max(nx0, nx1)) / 2;
      const ny = (Math.min(ny0, ny1) + Math.max(ny0, ny1)) / 2;
      const nw = Math.abs(nx1 - nx0);
      const nh = Math.abs(ny1 - ny0);
      let mean = 0;
      for (let i = 0; i < patch.length; i += 3) {
        mean += (patch[i] + patch[i + 1] + patch[i + 2]) / 3;
      }
      mean /= patch.length / 3;

      return {
        patch,
        tw: outW,
        th: outH,
        nx,
        ny,
        nw,
        nh,
        cx: nx * WORLD_W,
        cy: ny * WORLD_H,
        ww: nw * WORLD_W,
        wh: nh * WORLD_H,
        thumb,
        swRef: sw,
        shRef: sh,
        mean
      };
    }

    _onSelectionDone(cx0, cy0, cx1, cy1) {
      if (!this._calibrating || !this._calibVoc) return;
      const a = this._clientToNorm(cx0, cy0);
      const b = this._clientToNorm(cx1, cy1);
      if (!a || !b) {
        this._setCalibHint('SeleÃ§Ã£o fora da arena.');
        return;
      }
      const nx0 = Math.max(0, Math.min(1, a.nx));
      const ny0 = Math.max(0, Math.min(1, a.ny));
      const nx1 = Math.max(0, Math.min(1, b.nx));
      const ny1 = Math.max(0, Math.min(1, b.ny));
      if (Math.abs(nx1 - nx0) < 0.02 || Math.abs(ny1 - ny0) < 0.02) {
        this._setCalibHint('SeleÃ§Ã£o muito pequena â envolva o personagem inteiro.');
        return;
      }

      if (!this._lastGoodSample || this._lastGoodSample.mean < 12) {
        this._setCalibHint('Aguardando frame do jogoâ¦ selecione de novo em 1s.');
        return;
      }

      const tmpl = this._captureTemplateFromNorm(nx0, ny0, nx1, ny1);
      if (!tmpl) {
        this._setCalibHint(
          'Print veio preto/vazio. Espere o minimapa mostrar a cena e selecione de novo.'
        );
        return;
      }
      const track = this._vocTracks.get(this._calibVoc);
      if (!track) return;
      track.tmpl = tmpl;
      track.samples = [{ x: tmpl.cx, y: tmpl.cy }];
      track.locked = true;
      track.waiting = false;

      this._pins.set(track.key, {
        x: tmpl.cx,
        y: tmpl.cy,
        nx: tmpl.nx,
        ny: tmpl.ny,
        nw: tmpl.nw,
        nh: tmpl.nh,
        party: true,
        display: track.display,
        updatedAt: performance.now(),
        calibrated: true,
        locked: true,
        voc: this._calibVoc,
        ww: tmpl.ww,
        wh: tmpl.wh
      });

      this._calibrating = false;
      this._calibVoc = '';
      this._removeClickLayer();
      this._refreshVocBtnCounts();
      this._refreshTmplPreviews();
      this._setCalibHint(
        'Print OK (' +
          Math.round(tmpl.mean) +
          ' lum). O quadro deve cobrir o char e seguir o recorte.'
      );
      this._drawMini();
      this._drawPinsOnArena();
    }

    /**
     * Busca o template no frame atual (sample bom).
     */
    _matchTemplate(track, prevX, prevY) {
      const tmpl = track.tmpl;
      if (!tmpl?.patch || (tmpl.mean != null && tmpl.mean < 14)) return null;
      const c = this._sampleCanvas;
      const ctx = this._sampleCtx;
      if (!c || !ctx || c.width < 8) return null;
      if ((this._captureMean ?? 0) < 12) return null;
      let img;
      try {
        img = ctx.getImageData(0, 0, c.width, c.height).data;
      } catch (_) {
        return null;
      }
      const sw = c.width;
      const sh = c.height;
      const tw = tmpl.tw;
      const th = tmpl.th;
      const patch = tmpl.patch;
      const nPix = tw * th;
      if (nPix < 8) return null;

      const prevNx = prevX != null ? prevX / WORLD_W : tmpl.nx;
      const prevNy = prevY != null ? prevY / WORLD_H : tmpl.ny;
      const cx = Math.round(prevNx * sw - tw / 2);
      const cy = Math.round(prevNy * sh - th / 2);

      let pMeanR = 0;
      let pMeanG = 0;
      let pMeanB = 0;
      for (let i = 0; i < patch.length; i += 3) {
        pMeanR += patch[i];
        pMeanG += patch[i + 1];
        pMeanB += patch[i + 2];
      }
      pMeanR /= nPix;
      pMeanG /= nPix;
      pMeanB /= nPix;

      const radius = Math.max(24, Math.round(Math.max(tw, th) * 1.6));
      const coarse = Math.max(2, Math.round(Math.min(tw, th) / 8));

      const scoreAt = (ox, oy) => {
        if (ox < 0 || oy < 0 || ox + tw > sw || oy + th > sh) return 1e12;
        let err = 0;
        let pi = 0;
        let mr = 0;
        let mg = 0;
        let mb = 0;
        for (let y = 0; y < th; y++) {
          for (let x = 0; x < tw; x++) {
            const i = ((oy + y) * sw + (ox + x)) * 4;
            mr += img[i];
            mg += img[i + 1];
            mb += img[i + 2];
          }
        }
        mr /= nPix;
        mg /= nPix;
        mb /= nPix;
        for (let y = 0; y < th; y++) {
          for (let x = 0; x < tw; x++) {
            const i = ((oy + y) * sw + (ox + x)) * 4;
            err +=
              Math.abs(img[i] - mr - (patch[pi] - pMeanR)) +
              Math.abs(img[i + 1] - mg - (patch[pi + 1] - pMeanG)) +
              Math.abs(img[i + 2] - mb - (patch[pi + 2] - pMeanB));
            pi += 3;
          }
        }
        return err;
      };

      let best = Infinity;
      let bx = Math.max(0, Math.min(sw - tw, cx));
      let by = Math.max(0, Math.min(sh - th, cy));
      for (let y = cy - radius; y <= cy + radius; y += coarse) {
        for (let x = cx - radius; x <= cx + radius; x += coarse) {
          const sc = scoreAt(x, y);
          if (sc < best) {
            best = sc;
            bx = x;
            by = y;
          }
        }
      }
      const rx0 = bx;
      const ry0 = by;
      for (let y = ry0 - coarse; y <= ry0 + coarse; y++) {
        for (let x = rx0 - coarse; x <= rx0 + coarse; x++) {
          const sc = scoreAt(x, y);
          if (sc < best) {
            best = sc;
            bx = x;
            by = y;
          }
        }
      }

      const refX = Math.max(0, Math.min(sw - tw, cx));
      const refY = Math.max(0, Math.min(sh - th, cy));
      const ref = scoreAt(refX, refY);
      const absMax = nPix * 3 * 90;
      const spellMute = performance.now() < (this._spellMuteUntil || 0);
      if (best > absMax) return null;
      if (spellMute && best > ref * 1.12 + nPix * 8) return null;
      if (best > ref * 1.55 + nPix * 35 && best > nPix * 3 * 45) return null;

      const nx = (bx + tw / 2) / sw;
      const ny = (by + th / 2) / sh;
      return {
        x: nx * WORLD_W,
        y: ny * WORLD_H,
        nx,
        ny,
        err: best,
        ref
      };
    }

    _nearestMotion(wx, wy, maxDist, used) {
      const blobs = this._motionBlobs || [];
      let best = null;
      let bestD = maxDist;
      for (let i = 0; i < blobs.length; i++) {
        if (used && used.has(i)) continue;
        const d = Math.hypot(blobs[i].x - wx, blobs[i].y - wy);
        if (d < bestD) {
          bestD = d;
          best = { blob: blobs[i], i, d };
        }
      }
      return best;
    }

    _noteSpellActivity(text) {
      if (!isSpellText(text)) return;
      // janela curta: efeitos de magia dominam o frame-diff
      this._spellMuteUntil = Math.max(this._spellMuteUntil || 0, performance.now() + 550);
    }

    /**
     * Detecta movimento de CHAR (ignora flash/AoE de magia).
     */
    _refreshMotionBlobs() {
      const r = this._captureSample();
      if (!r || !r.data) {
        return this._motionBlobs || [];
      }
      const data = r.data;
      const sw = r.sw;
      const sh = r.sh;
      const prev = this._prevSample;
      if (!prev || prev.length !== data.length || this._prevSw !== sw || this._prevSh !== sh) {
        this._prevSample = new Uint8ClampedArray(data);
        this._prevSw = sw;
        this._prevSh = sh;
        return this._motionBlobs || [];
      }

      const now = performance.now();
      const spellMute = now < (this._spellMuteUntil || 0);
      const gw = 30;
      const gh = 22;
      const cells = [];
      let hot = 0;

      for (let cy = 0; cy < gh; cy++) {
        for (let cx = 0; cx < gw; cx++) {
          const x0 = Math.floor((cx / gw) * sw);
          const x1 = Math.floor(((cx + 1) / gw) * sw);
          const y0 = Math.floor((cy / gh) * sh);
          const y1 = Math.floor(((cy + 1) / gh) * sh);
          let diff = 0;
          let n = 0;
          let sx = 0;
          let sy = 0;
          let wn = 0;
          let flash = 0;
          let body = 0;
          let lumaSum = 0;
          for (let y = y0; y < y1; y += 2) {
            for (let x = x0; x < x1; x += 2) {
              const i = (y * sw + x) * 4;
              const r0 = data[i];
              const g0 = data[i + 1];
              const b0 = data[i + 2];
              const d =
                Math.abs(r0 - prev[i]) +
                Math.abs(g0 - prev[i + 1]) +
                Math.abs(b0 - prev[i + 2]);
              diff += d;
              n++;
              if (d < 38) continue;
              sx += x;
              sy += y;
              wn++;
              const luma = (r0 + g0 + b0) / 3;
              lumaSum += luma;
              // flash de magia: branco/amarelo/azul saturado muito claro
              const maxc = Math.max(r0, g0, b0);
              const minc = Math.min(r0, g0, b0);
              const chroma = maxc - minc;
              if (luma > 205 || (luma > 170 && chroma > 90 && maxc > 210)) {
                flash++;
              } else if (luma > 45 && luma < 195) {
                body++;
              }
            }
          }
          if (!n || !wn) continue;
          const avg = diff / n;
          if (avg < 22) continue;

          const flashRatio = flash / wn;
          const meanLuma = lumaSum / wn;
          // magia: muito flash / muito claro / mudanÃ§a explosiva
          const spellish =
            flashRatio > 0.42 ||
            meanLuma > 200 ||
            (avg > 70 && flashRatio > 0.22) ||
            (spellMute && (flashRatio > 0.15 || avg > 55));

          if (spellish) continue;

          // precisa ter âcorpoâ (outfit), nÃ£o sÃ³ partÃ­cula
          if (body < Math.max(2, wn * 0.25)) continue;

          hot++;
          cells.push({
            x: ((sx / wn) / sw) * WORLD_W,
            y: ((sy / wn) / sh) * WORLD_H,
            score: avg * (0.55 + 0.45 * (body / wn)),
            cx,
            cy,
            flashRatio,
            body
          });
        }
      }

      this._prevSample = new Uint8ClampedArray(data);
      this._prevSw = sw;
      this._prevSh = sh;

      let list = cells;
      if (hot > gw * gh * 0.28) {
        // pan / spam de efeito: sÃ³ cÃ©lulas mais âcorpoâ
        list = cells.filter((c) => c.body >= 4 && c.score > 30);
      }
      if (spellMute) {
        list = list.filter((c) => c.flashRatio < 0.2 && c.score < 65);
      }

      list.sort((a, b) => b.score - a.score);
      const blobs = [];
      const used = new Set();
      for (let i = 0; i < list.length; i++) {
        if (used.has(i)) continue;
        const seed = list[i];
        let sx = seed.x * seed.score;
        let sy = seed.y * seed.score;
        let swt = seed.score;
        let nCells = 1;
        used.add(i);
        for (let j = i + 1; j < list.length; j++) {
          if (used.has(j)) continue;
          const o = list[j];
          if (Math.hypot(o.x - seed.x, o.y - seed.y) > 34) continue;
          if (Math.abs(o.cx - seed.cx) > 2 || Math.abs(o.cy - seed.cy) > 2) {
            if (Math.hypot(o.x - seed.x, o.y - seed.y) > 24) continue;
          }
          used.add(j);
          sx += o.x * o.score;
          sy += o.y * o.score;
          swt += o.score;
          nCells++;
        }
        // AoE de magia = muitas cÃ©lulas juntas
        if (nCells >= 7) continue;
        blobs.push({
          x: sx / swt,
          y: sy / swt,
          score: swt,
          nCells
        });
        if (blobs.length >= 14) break;
      }

      // estabilidade: magia pisca 1 frame; char anda em vÃ¡rios
      const prevB = this._motionBlobsPrev || [];
      const stable = [];
      for (const b of blobs) {
        const was = prevB.some((p) => Math.hypot(p.x - b.x, p.y - b.y) < 42);
        if (was || (b.nCells <= 3 && b.score < 90)) {
          stable.push(b);
        }
      }
      // se tudo novo (primeiro passos), aceita blobs compactos
      const keep = stable.length ? stable : blobs.filter((b) => b.nCells <= 4);

      this._motionBlobsPrev = keep.slice(0, 10);
      this._motionBlobs = this._nms(keep, 24, 8);
      return this._motionBlobs;
    }

    _teardownUi() {
      this._removeClickLayer();
      try {
        this._wrap?.remove?.();
      } catch (_) {}
      try {
        this._markLayer?.remove?.();
      } catch (_) {}
      this._wrap = null;
      this._mini = null;
      this._mctx = null;
      this._countEl = null;
      this._markLayer = null;
      this._maskCanvas = null;
      this._maskCtx = null;
      this._floorCanvas = null;
      this._floorCtx = null;
      this._floorData = null;
      this._diffKeepPrev = null;
      this._tmplRow = null;
      this._calibHintEl = null;
      this._calibrating = false;
      this._calibVoc = '';
      this._selectedVoc = '';
      this._spellMuteUntil = 0;
      try {
        this._vocTracks?.clear?.();
      } catch (_) {}
      this._motionBlobs = [];
      this._motionBlobsPrev = [];
    }

    _ensureSample() {
      if (this._sampleCanvas && this._sampleCtx) return;
      this._sampleCanvas = document.createElement('canvas');
      this._sampleCanvas.__tbMapaUi = true;
      this._sampleCtx = this._sampleCanvas.getContext('2d', {
        willReadFrequently: true
      });
    }

    _ensureFloor() {
      if (this._floorCanvas && this._floorCtx) return;
      this._floorCanvas = document.createElement('canvas');
      this._floorCanvas.__tbMapaUi = true;
      this._floorCtx = this._floorCanvas.getContext('2d', {
        willReadFrequently: true
      });
    }

    _isHpGreen(r, g, b) {
      // barra HP: verde vivo (nÃ£o mato / efeito)
      return g > 150 && g >= r + 45 && g >= b + 40 && r < 150 && b < 140;
    }

    _isHpRed(r, g, b) {
      // barra vermelha viva (nÃ£o sangue escuro no chÃ£o)
      return r > 190 && g < 90 && b < 90 && r >= g + 90;
    }

    /** Texto de nameplate â meio-termo (detecta nome, evita flash forte de magia). */
    _isNameplateInk(r, g, b) {
      const sum = r + g + b;
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const chroma = max - min;
      // branco / cinza-claro
      if (sum > 430 && min > 125 && chroma < 70) return true;
      // amarelo de nome
      if (r > 175 && g > 155 && b < 110 && g > b + 40 && r - g < 55) return true;
      return false;
    }

    /** Barras de HP: faixa FINA (sangue/magia sÃ£o manchas mais grossas). */
    _scanHpBars(data, sw, sh, arena) {
      const segs = [];
      for (let y = 0; y < sh; y++) {
        let run = 0;
        let start = -1;
        let gN = 0;
        let rN = 0;
        for (let x = 0; x <= sw; x++) {
          let ok = false;
          if (x < sw) {
            const i = (y * sw + x) * 4;
            const gOk = this._isHpGreen(data[i], data[i + 1], data[i + 2]);
            const rOk = this._isHpRed(data[i], data[i + 1], data[i + 2]);
            ok = gOk || rOk;
            if (gOk) gN++;
            if (rOk) rN++;
          }
          if (ok) {
            if (run === 0) start = x;
            run++;
          } else if (run > 0) {
            if (run >= 5 && run <= 42) {
              let thick = 0;
              for (let x2 = start; x2 < start + run; x2++) {
                for (const dy of [-1, 1]) {
                  const yy = y + dy;
                  if (yy < 0 || yy >= sh) continue;
                  const j = (yy * sw + x2) * 4;
                  if (
                    this._isHpGreen(data[j], data[j + 1], data[j + 2]) ||
                    this._isHpRed(data[j], data[j + 1], data[j + 2])
                  ) {
                    thick++;
                  }
                }
              }
              // mancha (sangue/efeito): vizinhos tambÃ©m vermelhos
              if (thick < run * 0.85) {
                segs.push({
                  x0: start,
                  x1: start + run - 1,
                  y,
                  run,
                  green: gN >= rN
                });
              }
            }
            run = 0;
            gN = 0;
            rN = 0;
          }
        }
      }
      const clusters = [];
      for (const s of segs) {
        const cx = (s.x0 + s.x1) / 2;
        let hit = null;
        for (const c of clusters) {
          if (Math.abs(c.sy / c.n - s.y) > 1.5) continue;
          if (Math.abs(c.sx / c.n - cx) > 6) continue;
          hit = c;
          break;
        }
        if (!hit) {
          clusters.push({
            sx: cx,
            sy: s.y,
            n: 1,
            minX: s.x0,
            maxX: s.x1,
            minY: s.y,
            maxY: s.y,
            run: s.run,
            green: s.green ? 1 : 0
          });
        } else {
          hit.sx += cx;
          hit.sy += s.y;
          hit.n++;
          hit.minX = Math.min(hit.minX, s.x0);
          hit.maxX = Math.max(hit.maxX, s.x1);
          hit.minY = Math.min(hit.minY, s.y);
          hit.maxY = Math.max(hit.maxY, s.y);
          hit.run = Math.max(hit.run, s.run);
          if (s.green) hit.green++;
        }
      }
      const out = [];
      for (const c of clusters) {
        if (c.maxY - c.minY > 2) continue;
        const bw = (c.maxX - c.minX + 1) * (arena.width / sw);
        if (bw < 18 || bw > 120) continue;
        if (c.green < 1 && c.n > 1) continue;
        out.push({
          x: (c.sx / c.n / sw) * arena.width,
          y: (c.sy / c.n / sh) * arena.height,
          kind: 'hp',
          w: bw,
          score: bw * c.n + (c.green > 0 ? 30 : 0)
        });
      }
      return this._nms(out, 22, 10);
    }

    _isOutfitPixel(r, g, b) {
      // madeira
      if (r > 55 && r < 170 && g > 35 && g < 130 && b < 90 && r >= g && g >= b - 10) {
        return false;
      }
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      return max > 120 && max - min > 45;
    }

    _meanLuma(data) {
      let s = 0;
      let n = 0;
      for (let i = 0; i < data.length; i += 32) {
        s += (data[i] * 3 + data[i + 1] * 4 + data[i + 2]) / 8;
        n++;
      }
      return n ? s / n : 0;
    }

    /**
     * Preview: bloqueia cena estÃ¡tica (chÃ£o/muros/props) + efeitos que piscam.
     * 1) Snapshot das camadas estÃ¡ticas (vÃ¡rios batches mÃ©dios/grandes)
     * 2) Frame completo â cena = o que entrou depois (chars/mobs/efeitos)
     * 3) Efeito flash: sÃ³ mantÃ©m se tambÃ©m diferiu no frame anterior (ou HP/nome)
     */
    _blitSampleToMini(mctx, w, h) {
      const src = this._sampleCanvas;
      mctx.imageSmoothingEnabled = false;
      if (!src || src.width < 2) {
        mctx.fillStyle = '#000';
        mctx.fillRect(0, 0, w, h);
        return;
      }

      if (!this._hideScene) {
        try {
          mctx.drawImage(src, 0, 0, w, h);
        } catch (_) {
          mctx.fillStyle = '#000';
          mctx.fillRect(0, 0, w, h);
        }
        return;
      }

      const scene = this._floorData;
      if (!scene || scene.length !== src.width * src.height * 4) {
        try {
          mctx.drawImage(src, 0, 0, w, h);
        } catch (_) {
          mctx.fillStyle = '#000';
          mctx.fillRect(0, 0, w, h);
        }
        return;
      }

      if (!this._maskCanvas) {
        this._maskCanvas = document.createElement('canvas');
        this._maskCanvas.__tbMapaUi = true;
        this._maskCtx = this._maskCanvas.getContext('2d', {
          willReadFrequently: true
        });
      }
      const mw = src.width;
      const mh = src.height;
      const mc = this._maskCanvas;
      const mxc = this._maskCtx;
      if (mc.width !== mw) mc.width = mw;
      if (mc.height !== mh) mc.height = mh;

      try {
        mxc.drawImage(src, 0, 0);
        const img = mxc.getImageData(0, 0, mw, mh);
        const full = img.data;
        const nPix = (full.length / 4) | 0;
        const keep = new Uint8Array(nPix);
        const prev = this._diffKeepPrev;
        const prevOk = prev && prev.length === nPix;
        const DIFF = 38;

        for (let i = 0, p = 0; i < full.length; i += 4, p++) {
          const d =
            Math.abs(full[i] - scene[i]) +
            Math.abs(full[i + 1] - scene[i + 1]) +
            Math.abs(full[i + 2] - scene[i + 2]);
          if (d < DIFF) {
            keep[p] = 0;
            continue;
          }
          // diferente da cena estÃ¡tica
          const r = full[i];
          const g = full[i + 1];
          const b = full[i + 2];
          const important =
            this._isHpGreen(r, g, b) ||
            this._isHpRed(r, g, b) ||
            this._isNameplateInk(r, g, b);
          // efeito/magia: aparece 1 frame e some â descarta
          if (!important && prevOk && !prev[p]) {
            keep[p] = 0;
            continue;
          }
          keep[p] = 1;
        }

        this._diffKeepPrev = keep;

        for (let i = 0, p = 0; i < full.length; i += 4, p++) {
          if (keep[p]) continue;
          full[i] = 0;
          full[i + 1] = 0;
          full[i + 2] = 0;
          full[i + 3] = 255;
        }

        mxc.putImageData(img, 0, 0);
        mctx.fillStyle = '#000';
        mctx.fillRect(0, 0, w, h);
        mctx.imageSmoothingEnabled = false;
        mctx.drawImage(mc, 0, 0, w, h);
      } catch (_) {
        try {
          mctx.drawImage(src, 0, 0, w, h);
        } catch (__) {
          mctx.fillStyle = '#000';
          mctx.fillRect(0, 0, w, h);
        }
      }
    }

    /**
     * Captura arena â canvas alvo (sample ou cena estÃ¡tica).
     * @returns {{ data:Uint8ClampedArray, sw:number, sh:number, mean:number }|null}
     */
    _captureInto(c, ctx) {
      const arena = this._arena;
      const gl = this._gl;
      if (!arena || !c || !ctx || arena.width < 32) return null;
      const sw = Math.max(96, Math.round(arena.width * PIXEL_SCALE));
      const sh = Math.max(72, Math.round(arena.height * PIXEL_SCALE));
      if (c.width !== sw) c.width = sw;
      if (c.height !== sh) c.height = sh;

      const finish = (img, via) => {
        if (!img) return null;
        const mean = this._meanLuma(img.data);
        try {
          ctx.putImageData(img, 0, 0);
        } catch (_) {}
        return { data: img.data, sw, sh, mean, via };
      };

      try {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, sw, sh);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(arena, 0, 0, sw, sh);
        const img = ctx.getImageData(0, 0, sw, sh);
        if (this._meanLuma(img.data) >= 12) return finish(img, 'drawImage');
      } catch (_) {}

      if (gl && typeof gl.readPixels === 'function') {
        try {
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          if (typeof gl.readBuffer === 'function') {
            try {
              gl.readBuffer(gl.BACK);
            } catch (_) {
              try {
                gl.readBuffer(gl.COLOR_ATTACHMENT0);
              } catch (_) {}
            }
          }
          const aw = arena.width;
          const ah = arena.height;
          const buf = new Uint8Array(aw * ah * 4);
          gl.readPixels(0, 0, aw, ah, gl.RGBA, gl.UNSIGNED_BYTE, buf);
          const out = ctx.createImageData(sw, sh);
          const od = out.data;
          for (let y = 0; y < sh; y++) {
            const srcY = Math.min(
              ah - 1,
              Math.floor(((sh - 1 - y) / Math.max(1, sh - 1)) * (ah - 1))
            );
            for (let x = 0; x < sw; x++) {
              const srcX = Math.min(aw - 1, Math.floor((x / Math.max(1, sw - 1)) * (aw - 1)));
              const si = (srcY * aw + srcX) * 4;
              const di = (y * sw + x) * 4;
              od[di] = buf[si];
              od[di + 1] = buf[si + 1];
              od[di + 2] = buf[si + 2];
              od[di + 3] = 255;
            }
          }
          return finish(out, 'readPixels');
        } catch (_) {}
      }

      try {
        return finish(ctx.getImageData(0, 0, sw, sh), 'drawImage-dark');
      } catch (_) {
        return null;
      }
    }

    /** Snapshot da cena estÃ¡tica (chÃ£o â muros/props). Atualiza em batches mÃ©dios. */
    _captureFloorSnapshot() {
      this._ensureFloor();
      const r = this._captureInto(this._floorCanvas, this._floorCtx);
      if (!r || r.mean < 12) return;
      this._floorData = new Uint8ClampedArray(r.data);
      this._floorSw = r.sw;
      this._floorSh = r.sh;
      this._lastFloorAt = performance.now();
    }

    /**
     * Copia a arena â sample (frame completo, fim do frame).
     * @returns {{ data:Uint8ClampedArray, sw:number, sh:number }|null}
     */
    _captureSample() {
      this._ensureSample();
      const r = this._captureInto(this._sampleCanvas, this._sampleCtx);
      if (!r) {
        this._captureVia = 'none';
        this._captureMean = 0;
        return null;
      }
      this._captureVia = r.via || 'drawImage';
      // guarda frame vÃ¡lido â seleÃ§Ã£o no mouseup NÃO deve recapturar (vem preto)
      if (r.mean >= 12) {
        this._captureMean = Math.round(r.mean);
        this._lastGoodSample = {
          data: new Uint8ClampedArray(r.data),
          sw: r.sw,
          sh: r.sh,
          mean: r.mean,
          at: performance.now()
        };
        return { data: r.data, sw: r.sw, sh: r.sh, mean: r.mean };
      }
      // captura preta: restaura Ãºltimo frame bom (senÃ£o print/match quebram)
      const g = this._lastGoodSample;
      if (g?.data && g.mean >= 12) {
        try {
          if (this._sampleCanvas.width !== g.sw) this._sampleCanvas.width = g.sw;
          if (this._sampleCanvas.height !== g.sh) this._sampleCanvas.height = g.sh;
          const img = this._sampleCtx.createImageData(g.sw, g.sh);
          img.data.set(g.data);
          this._sampleCtx.putImageData(img, 0, 0);
        } catch (_) {}
        this._captureMean = Math.round(g.mean);
        return { data: g.data, sw: g.sw, sh: g.sh, mean: g.mean };
      }
      this._captureMean = Math.round(r.mean);
      return { data: r.data, sw: r.sw, sh: r.sh, mean: r.mean };
    }

    /** CÃ©lulas com mudanÃ§a forte entre frames (chars / combate). */
    _scanMotion(data, prev, sw, sh, arena) {
      if (!prev || prev.length !== data.length) return [];
      const gw = 24;
      const gh = 18;
      const scored = [];
      for (let cy = 0; cy < gh; cy++) {
        for (let cx = 0; cx < gw; cx++) {
          const x0 = Math.floor((cx / gw) * sw);
          const x1 = Math.floor(((cx + 1) / gw) * sw);
          const y0 = Math.floor((cy / gh) * sh);
          const y1 = Math.floor(((cy + 1) / gh) * sh);
          let diff = 0;
          let n = 0;
          for (let y = y0; y < y1; y += 2) {
            for (let x = x0; x < x1; x += 2) {
              const i = (y * sw + x) * 4;
              diff +=
                Math.abs(data[i] - prev[i]) +
                Math.abs(data[i + 1] - prev[i + 1]) +
                Math.abs(data[i + 2] - prev[i + 2]);
              n++;
            }
          }
          if (!n) continue;
          const avg = diff / n;
          // limiar: ignora chÃ£o estÃ¡tico / ruÃ­do leve
          if (avg < 28) continue;
          scored.push({
            x: ((x0 + x1) / 2 / sw) * arena.width,
            y: ((y0 + y1) / 2 / sh) * arena.height,
            kind: 'move',
            w: avg,
            score: avg
          });
        }
      }
      scored.sort((a, b) => b.score - a.score);
      // pan de cÃ¢mera: quase tudo muda â sÃ³ picos fortes
      if (scored.length > 20) {
        return this._nms(
          scored.filter((s) => s.score > 55),
          36,
          8
        );
      }
      return this._nms(scored, 32, 14);
    }

    /**
     * Conta âletrasâ: quantos blocos de tinta separados por gap na faixa.
     * Escada/efeito = 1 bloco contÃ­nuo; nome = vÃ¡rios (R a v i â¦).
     */
    _textGlyphScore(data, sw, sh, minX, maxX, minY, maxY) {
      const x0 = Math.max(0, minX | 0);
      const x1 = Math.min(sw - 1, maxX | 0);
      const y0 = Math.max(0, minY | 0);
      const y1 = Math.min(sh - 1, maxY | 0);
      if (x1 - x0 < 4 || y1 - y0 < 0) return { runs: 0, gaps: 0, fill: 1 };

      let bestRuns = 0;
      let bestGaps = 0;
      let ink = 0;
      let tot = 0;
      for (let y = y0; y <= y1; y++) {
        let runs = 0;
        let inInk = false;
        let gaps = 0;
        let sawInk = false;
        for (let x = x0; x <= x1; x++) {
          const i = (y * sw + x) * 4;
          const ok = this._isNameplateInk(data[i], data[i + 1], data[i + 2]);
          tot++;
          if (ok) ink++;
          if (ok) {
            if (!inInk) {
              runs++;
              if (sawInk) gaps++;
              inInk = true;
              sawInk = true;
            }
          } else {
            inInk = false;
          }
        }
        if (runs > bestRuns) {
          bestRuns = runs;
          bestGaps = gaps;
        }
      }
      const fill = tot ? ink / tot : 1;
      return { runs: bestRuns, gaps: bestGaps, fill };
    }

    /** Faixas claras que PARECEM texto (letras com gaps), nÃ£o escada/tile. */
    _scanNameplates(data, sw, sh, arena) {
      const segs = [];
      for (let y = 0; y < sh; y++) {
        let run = 0;
        let start = -1;
        for (let x = 0; x <= sw; x++) {
          let ok = false;
          if (x < sw) {
            const i = (y * sw + x) * 4;
            ok = this._isNameplateInk(data[i], data[i + 1], data[i + 2]);
          }
          if (ok) {
            if (run === 0) start = x;
            run++;
          } else if (run > 0) {
            if (run >= 3 && run <= 50) {
              segs.push({ x0: start, x1: start + run - 1, y, run });
            }
            run = 0;
          }
        }
      }
      const clusters = [];
      for (const s of segs) {
        const cx = (s.x0 + s.x1) / 2;
        let hit = null;
        for (const c of clusters) {
          if (Math.abs(c.sy / c.n - s.y) > 2.5) continue;
          if (Math.abs(c.sx / c.n - cx) > 8) continue;
          hit = c;
          break;
        }
        if (!hit) {
          clusters.push({
            sx: cx,
            sy: s.y,
            n: 1,
            minX: s.x0,
            maxX: s.x1,
            minY: s.y,
            maxY: s.y,
            run: s.run
          });
        } else {
          hit.sx += cx;
          hit.sy += s.y;
          hit.n++;
          hit.minX = Math.min(hit.minX, s.x0);
          hit.maxX = Math.max(hit.maxX, s.x1);
          hit.minY = Math.min(hit.minY, s.y);
          hit.maxY = Math.max(hit.maxY, s.y);
          hit.run = Math.max(hit.run, s.run);
        }
      }
      const out = [];
      for (const c of clusters) {
        if (c.n < 2) continue;
        if (c.maxY - c.minY > 6) continue;
        const bw = (c.maxX - c.minX + 1) * (arena.width / sw);
        const bh = (c.maxY - c.minY + 1) * (arena.height / sh);
        if (bw < 18 || bw > 170) continue;
        if (bh > 36) continue;
        if (bw / Math.max(bh, 1) < 1.4) continue;

        const g = this._textGlyphScore(data, sw, sh, c.minX, c.maxX, c.minY, c.maxY);
        // escada = 1 run contÃ­nuo / fill alto; texto â¥2â3 blocos com gaps
        if (g.runs < 3) continue;
        if (g.gaps < 2) continue;
        // texto nÃ£o preenche a caixa inteira como um degrau
        if (g.fill > 0.72) continue;

        out.push({
          x: (c.sx / c.n / sw) * arena.width,
          y: (c.sy / c.n / sh) * arena.height,
          kind: 'name',
          w: bw,
          score: bw * c.n + g.runs * 8,
          glyphs: g.runs
        });
      }
      return this._nms(out, 18, 14);
    }

    _nms(list, minDist, maxKeep) {
      const sorted = list.slice().sort((a, b) => (b.score || b.w || 0) - (a.score || a.w || 0));
      const kept = [];
      for (const b of sorted) {
        let ok = true;
        for (const k of kept) {
          if (Math.hypot(b.x - k.x, b.y - k.y) < minDist) {
            ok = false;
            break;
          }
        }
        if (ok) kept.push(b);
        if (kept.length >= maxKeep) break;
      }
      return kept;
    }

    /** Nomes ativos (party + fillText recente). */
    _activeNames() {
      this._refreshParty();
      const now = performance.now();
      /** @type {{ key:string, display:string, party:boolean, w:number }[]} */
      const list = [];
      const seen = new Set();

      for (const [key, info] of this._partyMembers) {
        seen.add(key);
        const m = this._meta.get(key);
        list.push({
          key,
          display: info.display,
          party: true,
          w: m?.w || this._estimateWidth(
            info.className ? info.className + ' ' + info.display : info.display
          ),
          wAlt: m?.wAlt || this._estimateWidth(info.display)
        });
      }
      for (const [key, m] of this._meta) {
        if (seen.has(key)) continue;
        if (m.party) continue;
        if (now - m.seenAt > 3500) continue;
        list.push({
          key,
          display: m.display,
          party: false,
          w: m.w || this._estimateWidth(m.label || m.display),
          wAlt: m.wAlt || 0
        });
      }
      // party primeiro, depois nomes mais largos
      list.sort((a, b) => Number(b.party) - Number(a.party) || b.w - a.w);
      return list;
    }

    /** Aglomerados de pixel colorido (outfit) â  chÃ£o de madeira. */
    _scanOutfits(data, sw, sh, arena) {
      const gw = 20;
      const gh = 15;
      const scored = [];
      const cellMin = Math.max(4, Math.floor((sw / gw) * (sh / gh) * 0.04));
      for (let cy = 0; cy < gh; cy++) {
        for (let cx = 0; cx < gw; cx++) {
          const x0 = Math.floor((cx / gw) * sw);
          const x1 = Math.floor(((cx + 1) / gw) * sw);
          const y0 = Math.floor((cy / gh) * sh);
          const y1 = Math.floor(((cy + 1) / gh) * sh);
          let hit = 0;
          let sx = 0;
          let sy = 0;
          for (let y = y0; y < y1; y += 1) {
            for (let x = x0; x < x1; x += 1) {
              const i = (y * sw + x) * 4;
              if (!this._isOutfitPixel(data[i], data[i + 1], data[i + 2])) continue;
              hit++;
              sx += x;
              sy += y;
            }
          }
          if (hit < cellMin) continue;
          scored.push({
            x: (sx / hit / sw) * arena.width,
            y: (sy / hit / sh) * arena.height,
            kind: 'outfit',
            w: ((x1 - x0) / sw) * arena.width,
            score: hit
          });
        }
      }
      return this._nms(scored, 28, 12);
    }

    _countSpriteish(data) {
      let n = 0;
      for (let i = 0; i < data.length; i += 40) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (
          this._isOutfitPixel(r, g, b) ||
          this._isNameplateInk(r, g, b) ||
          this._isHpGreen(r, g, b) ||
          this._isHpRed(r, g, b)
        ) {
          n++;
        }
      }
      return n;
    }

    /**
     * Casa nomes â nameplates.
     * Largura: canvas do texto â px na arena (textScale â arena/world).
     */
    _labelBlobs(blobs) {
      this._ensurePartyWidths();
      const names = this._activeNames();
      const arena = this._arena;
      if (!blobs.length) return [];

      const plates = blobs.filter((b) => b.kind === 'name');
      const hps = blobs.filter((b) => b.kind === 'hp');
      if (!plates.length) return [];

      const anchors = plates.map((p) => {
        let y = p.y + 14;
        let x = p.x;
        let bestHp = null;
        let bestD = 40;
        for (const h of hps) {
          if (h.y < p.y - 2 || h.y > p.y + 44) continue;
          const d = Math.hypot(h.x - p.x, h.y - p.y);
          if (d < bestD) {
            bestD = d;
            bestHp = h;
          }
        }
        if (bestHp) {
          x = (p.x * 0.6 + bestHp.x * 0.4);
          y = bestHp.y + 8;
        }
        return { x, y, w: p.w, kind: 'name', score: p.score, glyphs: p.glyphs || 0 };
      });

      const scale = this._textScale || 2.266;
      const awArena = arena?.width || WORLD_W;
      const widthErr = (plateW, raw) => {
        // tenta: canvasâarena | mundo | canvasâarena
        const cands = [
          raw,
          raw / scale,
          (raw / scale) * (awArena / WORLD_W),
          raw * (awArena / WORLD_W)
        ];
        let best = Infinity;
        for (const c of cands) best = Math.min(best, Math.abs(plateW - c));
        return best;
      };

      const pushNamed = (nm, a) => ({
        x: a.x,
        y: a.y,
        kind: nm.party ? 'party' : 'mob',
        w: a.w,
        display: nm.display,
        key: nm.key,
        party: nm.party
      });

      const pairs = [];
      for (let i = 0; i < anchors.length; i++) {
        const a = anchors[i];
        if ((a.glyphs || 0) < 3) continue;
        for (const nm of names) {
          const cands = [nm.w, nm.wAlt].filter((x) => x > 0);
          if (!cands.length) cands.push(64);
          let wErr = Infinity;
          for (const raw of cands) wErr = Math.min(wErr, widthErr(a.w, raw));
          if (wErr > 36) continue;

          let distPen = 0;
          const prev = this._pins.get(nm.key);
          if (prev && prev._px != null) {
            const d = Math.hypot(a.x - prev._px, a.y - prev._py);
            if (d > 200) continue;
            distPen = d * 0.03;
          }
          pairs.push({
            i,
            nm,
            score: wErr * 2 + distPen + (nm.party ? -2 : 0)
          });
        }
      }
      pairs.sort((a, b) => a.score - b.score);

      const usedA = new Set();
      const usedN = new Set();
      const out = [];
      for (const p of pairs) {
        if (usedA.has(p.i) || usedN.has(p.nm.key)) continue;
        usedA.add(p.i);
        usedN.add(p.nm.key);
        out.push(pushNamed(p.nm, anchors[p.i]));
      }

      // fallback party: SÃ com pin anterior perto (nÃ£o inventa PT em escada)
      const leftoverParty = names.filter((nm) => nm.party && !usedN.has(nm.key));
      for (const nm of leftoverParty) {
        const prev = this._pins.get(nm.key);
        if (!prev || prev._px == null) continue;
        let best = -1;
        let bestD = 70;
        for (let i = 0; i < anchors.length; i++) {
          if (usedA.has(i)) continue;
          const a = anchors[i];
          if ((a.glyphs || 0) < 3) continue;
          const d = Math.hypot(a.x - prev._px, a.y - prev._py);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }
        if (best < 0) continue;
        usedA.add(best);
        usedN.add(nm.key);
        out.push(pushNamed(nm, anchors[best]));
      }

      // fallback mob: sÃ³ sticky perto do Ãºltimo pin
      const leftoverMob = names.filter((nm) => !nm.party && !usedN.has(nm.key));
      for (const nm of leftoverMob) {
        const prev = this._pins.get(nm.key);
        if (!prev || prev._px == null) continue;
        let best = -1;
        let bestD = 70;
        for (let i = 0; i < anchors.length; i++) {
          if (usedA.has(i)) continue;
          if ((anchors[i].glyphs || 0) < 3) continue;
          const d = Math.hypot(anchors[i].x - prev._px, anchors[i].y - prev._py);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }
        if (best < 0) continue;
        usedA.add(best);
        usedN.add(nm.key);
        out.push(pushNamed(nm, anchors[best]));
      }

      // sem anÃ´nimo: faixa sem nome (escada) nÃ£o vira bolinha
      return out;
    }

    /**
     * Nome com key: mostra na hora.
     * AnÃ´nimo: precisa 2 frames (corta magia).
     */
    _stabilizeBlobs(blobs) {
      const now = performance.now();
      const next = new Map();
      for (const b of blobs) {
        const named = b.key && !String(b.key).startsWith('anon:');
        const id = named
          ? b.key
          : `a:${Math.round(b.x / 22)}_${Math.round(b.y / 22)}`;
        const prev = this._stableMap?.get(id);
        const fresh = !prev || now - prev.t > 1000;
        const hits = fresh ? 1 : prev.hits + 1;
        next.set(id, { hits, t: now, blob: b, named });
      }
      // mantÃ©m entradas recentes que sumiram 1 frame (anti-flicker)
      if (this._stableMap) {
        for (const [id, prev] of this._stableMap) {
          if (next.has(id)) continue;
          if (now - prev.t < 350 && prev.hits >= 2) {
            next.set(id, { ...prev, t: prev.t });
          }
        }
      }
      this._stableMap = next;
      const out = [];
      for (const v of next.values()) {
        if (v.named || v.hits >= 2) out.push(v.blob);
      }
      return out;
    }

    /**
     * @returns {{ x:number, y:number, kind:string, w:number, display?:string, party?:boolean, key?:string }[]}
     */
    _scanPixelBars() {
      const arena = this._arena;
      if (!arena) return [];
      const cap = this._captureSample();
      if (!cap) return [];
      const { data, sw, sh, mean } = cap;
      if (mean < 12) {
        this._prevSample = null;
        this._scanDbg = { n: 0, h: 0, m: 0, spr: 0, o: 0 };
        return [];
      }

      const spr = this._countSpriteish(data);
      const plates = this._scanNameplates(data, sw, sh, arena);
      const hps = this._scanHpBars(data, sw, sh, arena);
      this._prevSample = new Uint8ClampedArray(data);
      this._prevSw = sw;
      this._prevSh = sh;

      this._scanDbg = {
        n: plates.length,
        h: hps.length,
        m: 0,
        spr,
        o: 0
      };

      return this._stabilizeBlobs(this._labelBlobs(plates.concat(hps)));
    }

    _schedulePixelCapture() {
      this._glDrawSeq = (this._glDrawSeq || 0) + 1;
      const seq = this._glDrawSeq;
      queueMicrotask(() => {
        if (!this._running) return;
        if (seq !== this._glDrawSeq) return;
        const now = performance.now();
        if (now - (this._lastPixelAt || 0) < PIXEL_MS) {
          this._floorShotThisFrame = false;
          return;
        }
        this._lastPixelAt = now;
        this._pixelTick();
        this._floorShotThisFrame = false;
      });
    }

    _drawArenaMarkers(blobs) {
      const layer = this._markLayer;
      const arena = this._arena;
      if (!layer || !arena) return;
      const r = arena.getBoundingClientRect();
      if (r.width < 8 || r.height < 8) return;
      const scaleX = r.width / (arena.width || 1);
      const scaleY = r.height / (arena.height || 1);
      let html = '';
      for (const b of blobs) {
        const left = r.left + b.x * scaleX;
        const top = r.top + b.y * scaleY;
        const color = b.party
          ? '#4ade80'
          : b.kind === 'mob'
            ? '#f87171'
            : b.kind === 'move'
              ? '#94a3b8'
              : '#fbbf24';
        if (b.display) {
          html +=
            '<div style="position:fixed;left:' +
            left +
            'px;top:' +
            (top - 12) +
            'px;transform:translate(-50%,-100%);font:700 10px Segoe UI,sans-serif;' +
            'color:#fff;text-shadow:0 1px 2px #000;white-space:nowrap;pointer-events:none">' +
            String(b.display).slice(0, 14) +
            '</div>';
        }
        html +=
          '<div style="position:fixed;left:' +
          left +
          'px;top:' +
          top +
          'px;transform:translate(-50%,-50%);width:10px;height:10px;' +
          'border:2px solid ' +
          color +
          ';border-radius:50%;box-shadow:0 0 4px #000;pointer-events:none"></div>';
      }
      layer.innerHTML = html;
    }

    /**
     * Blobs de entidade = pixels que mudaram vs cena estÃ¡tica (chÃ£o/muro).
     * Coords em espaÃ§o mundo 480Ã352 (mesmo do mini-mapa).
     */
    _scanEntityBlobs() {
      const src = this._sampleCanvas;
      const scene = this._floorData;
      if (!src || !scene || src.width < 8) return [];
      const sw = src.width;
      const sh = src.height;
      if (scene.length !== sw * sh * 4) return [];

      let full;
      try {
        full = this._sampleCtx.getImageData(0, 0, sw, sh).data;
      } catch (_) {
        return [];
      }

      const DIFF = 42;
      const gw = 20;
      const gh = 15;
      const cells = [];
      const cellMin = Math.max(6, Math.floor(((sw / gw) * (sh / gh)) * 0.045));

      for (let cy = 0; cy < gh; cy++) {
        for (let cx = 0; cx < gw; cx++) {
          const x0 = Math.floor((cx / gw) * sw);
          const x1 = Math.floor(((cx + 1) / gw) * sw);
          const y0 = Math.floor((cy / gh) * sh);
          const y1 = Math.floor(((cy + 1) / gh) * sh);
          let hit = 0;
          let sx = 0;
          let sy = 0;
          let hp = 0;
          for (let y = y0; y < y1; y++) {
            for (let x = x0; x < x1; x++) {
              const i = (y * sw + x) * 4;
              const d =
                Math.abs(full[i] - scene[i]) +
                Math.abs(full[i + 1] - scene[i + 1]) +
                Math.abs(full[i + 2] - scene[i + 2]);
              if (d < DIFF) continue;
              hit++;
              sx += x;
              sy += y;
              if (
                this._isHpGreen(full[i], full[i + 1], full[i + 2]) ||
                this._isHpRed(full[i], full[i + 1], full[i + 2])
              ) {
                hp++;
              }
            }
          }
          if (hit < cellMin) continue;
          cells.push({
            x: (sx / hit / sw) * WORLD_W,
            y: (sy / hit / sh) * WORLD_H,
            score: hit + hp * 25,
            hp,
            w: ((x1 - x0) / sw) * WORLD_W
          });
        }
      }

      // merge cÃ©lulas vizinhas (mesmo boneco em 2 cells)
      cells.sort((a, b) => b.score - a.score);
      const merged = [];
      for (const c of cells) {
        let hit = null;
        for (const m of merged) {
          if (Math.hypot(c.x - m.x, c.y - m.y) < 28) {
            hit = m;
            break;
          }
        }
        if (!hit) {
          merged.push({ ...c, n: 1 });
        } else {
          const t = hit.score + c.score;
          hit.x = (hit.x * hit.score + c.x * c.score) / t;
          hit.y = (hit.y * hit.score + c.y * c.score) / t;
          hit.score = t;
          hit.hp += c.hp;
          hit.n++;
        }
      }

      return this._nms(
        merged.map((m) => ({
          x: m.x,
          y: m.y,
          score: m.score,
          hp: m.hp,
          w: m.w
        })),
        22,
        16
      );
    }

    /**
     * Nome/party sÃ³ rotulam; posiÃ§Ã£o vem do blob de sprite.
     */
    _labelEntityBlobs(blobs) {
      if (!blobs.length) return [];
      this._refreshParty();
      const now = performance.now();
      const used = new Set();
      const out = [];

      const take = (i, key, display, party) => {
        used.add(i);
        const b = blobs[i];
        out.push({
          key,
          display,
          party,
          x: b.x,
          y: b.y,
          score: b.score
        });
      };

      const nearest = (preferX, preferY, maxDist, requireHp) => {
        let best = -1;
        let bestD = maxDist;
        for (let i = 0; i < blobs.length; i++) {
          if (used.has(i)) continue;
          if (requireHp && !(blobs[i].hp > 0)) continue;
          const d = Math.hypot(blobs[i].x - preferX, blobs[i].y - preferY);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }
        return best;
      };

      // 1) PARTY: sÃ³ acompanha quem o usuÃ¡rio marcou (nunca âchutaâ magia/blob brilhante)
      for (const [key, info] of this._partyMembers) {
        const prev = this._pins.get(key);
        if (!prev || !prev.calibrated) continue;

        const idx = nearest(prev.x, prev.y, 55, false);
        if (idx >= 0) {
          take(idx, key, info.display, true);
        } else {
          // sem blob perto: mantÃ©m o clique (nÃ£o pula pra magia longe)
          out.push({
            key,
            display: info.display,
            party: true,
            x: prev.x,
            y: prev.y,
            score: 0,
            calibrated: true
          });
        }
      }

      // 2) MOBS: sÃ³ com nome recente + sticky (sem pegar o blob mais brilhante = magia)
      const mobs = [];
      for (const [key, m] of this._meta) {
        if (this._partyMembers.has(key) || m.party) continue;
        if (!m.fromText || now - m.seenAt > 3500) continue;
        mobs.push({ key, display: m.display, seenAt: m.seenAt });
      }
      mobs.sort((a, b) => b.seenAt - a.seenAt);

      for (const mob of mobs) {
        const prev = this._pins.get(mob.key);
        if (!prev || now - prev.updatedAt > 2500) continue; // mob precisa de trilha; sem chute inicial em magia
        const idx = nearest(prev.x, prev.y, 70, false);
        if (idx < 0) continue;
        // evita blob âsÃ³ flashâ sem HP se o salto for grande
        if (blobs[idx].hp < 1 && Math.hypot(blobs[idx].x - prev.x, blobs[idx].y - prev.y) > 40) {
          continue;
        }
        take(idx, mob.key, mob.display, false);
      }

      // sem anÃ´nimos: eram magia/efeito virando bolinha vermelha
      return out;
    }

    /**
     * Party = template da seleÃ§Ã£o (print) + motion auxiliar.
     * Mob = sticky fillText.
     */
    _updatePinsFromPixels() {
      const now = performance.now();
      // 1 captura: motion + template usam o mesmo frame
      const blobs = this._refreshMotionBlobs();
      const seen = new Set();
      const usedBlob = new Set();

      for (const [, track] of this._vocTracks) {
        if (!track.locked || !track.tmpl) continue;
        const prev = this._pins.get(track.key);
        if (!prev) continue;

        const hit = this._matchTemplate(track, prev.x, prev.y);
        let x = prev.x;
        let y = prev.y;
        let ok = false;

        if (hit) {
          x = hit.x;
          y = hit.y;
          ok = true;
          const mot = this._nearestMotion(
            x,
            y,
            Math.max(36, (track.tmpl.ww || 20) * 0.7),
            usedBlob
          );
          if (mot && mot.d < 40) {
            usedBlob.add(mot.i);
            x = x * 0.65 + mot.blob.x * 0.35;
            y = y * 0.65 + mot.blob.y * 0.35;
          }
        } else {
          const mot = this._nearestMotion(prev.x, prev.y, LOCK_FOLLOW_R, usedBlob);
          if (mot) {
            usedBlob.add(mot.i);
            x = mot.blob.x;
            y = mot.blob.y;
            ok = true;
          }
        }

        if (ok) {
          const d = Math.hypot(x - prev.x, y - prev.y);
          if (d < 2.5) {
            x = prev.x;
            y = prev.y;
          } else if (d < 100) {
            x = prev.x + (x - prev.x) * 0.75;
            y = prev.y + (y - prev.y) * 0.75;
          } else {
            x = prev.x;
            y = prev.y;
          }
        }

        const nx = x / WORLD_W;
        const ny = y / WORLD_H;
        this._pins.set(track.key, {
          x,
          y,
          nx,
          ny,
          nw: track.tmpl.nw,
          nh: track.tmpl.nh,
          party: true,
          display: track.display,
          updatedAt: now,
          calibrated: true,
          locked: true,
          voc: track.voc || '',
          ww: track.tmpl.ww,
          wh: track.tmpl.wh
        });
        seen.add(track.key);
      }

      void blobs;

      // mobs: sÃ³ sticky perto do pin anterior
      const entBlobs = this._scanEntityBlobs();
      const usedEnt = new Set();
      for (const [key, m] of this._meta) {
        if (this._partyMembers.has(key) || m.party) continue;
        if (!m.fromText || now - m.seenAt > 3500) continue;
        const prev = this._pins.get(key);
        if (!prev || now - prev.updatedAt > 2500) continue;
        let best = -1;
        let bestD = 55;
        for (let i = 0; i < entBlobs.length; i++) {
          if (usedEnt.has(i)) continue;
          const d = Math.hypot(entBlobs[i].x - prev.x, entBlobs[i].y - prev.y);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }
        if (best < 0) continue;
        usedEnt.add(best);
        const b = entBlobs[best];
        this._pins.set(key, {
          x: prev.x + (b.x - prev.x) * 0.4,
          y: prev.y + (b.y - prev.y) * 0.4,
          party: false,
          display: m.display,
          updatedAt: now
        });
        seen.add(key);
      }

      for (const [key, pin] of this._pins) {
        if (seen.has(key)) continue;
        if (pin.party && pin.calibrated) continue;
        if (now - pin.updatedAt > 1200) this._pins.delete(key);
      }

      this._lastPixelCount = seen.size;
      return seen.size;
    }

    _pixelTick() {
      if (!this._running) return;
      const t0 = performance.now();
      if (USE_PIXEL_POSITIONS) {
        this._updatePinsFromPixels();
      } else {
        // sÃ³ fundo do minimap â posiÃ§Ã£o vem do nameplate
        this._captureSample();
        this._pixelBlobs = [];
        this._lastPixelCount = this._pins.size;
      }
      this._lastPixelMs = Math.round(performance.now() - t0);
    }

    _drawPinsOnArena() {
      if (!SHOW_ARENA_OVERLAY) {
        if (this._markLayer) this._markLayer.innerHTML = '';
        return;
      }
      if (!this._markLayer) this._ensureMarkLayer();
      const layer = this._markLayer;
      const arena = this._arena || this._findArena();
      if (!layer || !arena) return;
      const r = arena.getBoundingClientRect();
      if (r.width < 8 || r.height < 8) return;
      const now = performance.now();
      let html = '';

      const toScreen = (nx, ny) => ({
        left: r.left + nx * r.width,
        top: r.top + ny * r.height
      });

      // debug: todos os nameplates detectados (amarelo) â se estes caÃ­rem nos NOMES, o mapa estÃ¡ certo
      const { w: aw, h: ah } = this._arenaSize();
      const buf = this._quadSpace !== 'world';
      for (const q of this._lastQuads || []) {
        const nx = buf ? q.cx / aw : q.cx / WORLD_W;
        const ny = buf ? q.cy / ah : q.cy / WORLD_H;
        const { left, top } = toScreen(nx, ny);
        html +=
          '<div style="position:fixed;left:' +
          left +
          'px;top:' +
          top +
          'px;transform:translate(-50%,-50%);width:8px;height:8px;' +
          'border:1px solid #facc15;border-radius:2px;opacity:.9;pointer-events:none"></div>';
      }

      for (const pin of this._pins.values()) {
        if (now - pin.updatedAt > (pin.party ? STICKY_PARTY_MS : STICKY_MOB_MS)) continue;
        const nx = pin.nx != null ? pin.nx : pin.x / (buf ? aw : WORLD_W);
        const ny = pin.ny != null ? pin.ny : pin.y / (buf ? ah : WORLD_H);
        const { left, top } = toScreen(nx, ny);
        const color = pin.party ? '#4ade80' : '#f87171';
        if (pin.display) {
          html +=
            '<div style="position:fixed;left:' +
            left +
            'px;top:' +
            (top - 16) +
            'px;transform:translate(-50%,-100%);font:700 11px Segoe UI,sans-serif;' +
            'color:#fff;text-shadow:0 0 3px #000,0 1px 2px #000;white-space:nowrap;pointer-events:none">' +
            String(pin.display).slice(0, 16) +
            '</div>';
        }
        html +=
          '<div style="position:fixed;left:' +
          left +
          'px;top:' +
          top +
          'px;transform:translate(-50%,-50%);width:12px;height:12px;' +
          'border:2px solid ' +
          color +
          ';border-radius:50%;background:rgba(0,0,0,.3);' +
          'box-shadow:0 0 4px #000;pointer-events:none"></div>';
      }

      layer.innerHTML = html;

      if (this._calibHintEl) {
        const d = this._quadDbg || {};
        this._calibHintEl.textContent =
          'arena ' +
          (d.aw || aw) +
          'Ã' +
          (d.ah || ah) +
          ' Â· ' +
          (this._quadSpace || '?') +
          ' Â· maxQuad ' +
          (d.maxX || 0) +
          ',' +
          (d.maxY || 0) +
          ' Â· q' +
          (d.n || 0) +
          '/' +
          (d.scored || 0) +
          '/' +
          (d.raw || 0) +
          ' Â· pin' +
          this._pins.size +
          ' Â· amarelo=nome';
      }
    }

    _readQuads(gl) {
      const { w: aw, h: ah } = this._arenaSize();
      const dbw = gl.drawingBufferWidth || aw;
      const dbh = gl.drawingBufferHeight || ah;
      const buf =
        gl.getVertexAttrib(1, gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING) ||
        gl.getVertexAttrib(0, gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING);
      if (!buf) return [];
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      const bytes = gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_SIZE);
      if (!bytes || bytes > 2_000_000) return [];
      const f = new Float32Array(bytes / 4);
      gl.getBufferSubData(gl.ARRAY_BUFFER, 0, f);
      const raw = [];
      for (let q = 0; q + 24 <= f.length; q += 24) {
        const xs = [f[q], f[q + 6], f[q + 12], f[q + 18]];
        const ys = [f[q + 1], f[q + 7], f[q + 13], f[q + 19]];
        if (!xs.every(Number.isFinite) || !ys.every(Number.isFinite)) continue;
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        const qw = maxX - minX;
        const qh = maxY - minY;
        if (qw < 10 || qh < 6) continue;
        raw.push({
          cx: (minX + maxX) / 2,
          cy: (minY + maxY) / 2,
          qw,
          qh
        });
      }
      if (!raw.length) {
        this._lastQuads = [];
        this._quadDbg = { aw, ah, dbw, dbh, maxX: 0, maxY: 0, n: 0, raw: 0, scored: 0 };
        return [];
      }

      let maxCX = 0;
      let maxCY = 0;
      for (const q of raw) {
        if (q.cx > maxCX) maxCX = q.cx;
        if (q.cy > maxCY) maxCY = q.cy;
      }
      // 1109Ã813 buffer vs 480Ã352 lÃ³gico (mesmo aspect ~1.364)
      const looksBuf = maxCX > WORLD_W * 1.15 || maxCY > WORLD_H * 1.15;
      this._quadSpace = looksBuf ? 'buf' : 'world';
      const maxW = looksBuf ? Math.max(aw, dbw) : WORLD_W;
      const maxH = looksBuf ? Math.max(ah, dbh) : WORLD_H;
      // nameplate fino (~10px world); no buffer â 10*(1109/480)â23 â nÃ£o aceitar tile 32Ã32
      const sc = looksBuf ? aw / WORLD_W : 1;
      const qhMin = 9.0 * sc;
      const qhMax = 12.2 * sc;
      const qwMin = 16 * sc;
      const qwMax = 100 * sc;
      const targetH = 10.4 * sc;

      const scored = [];
      for (const q of raw) {
        if (q.qh < qhMin || q.qh > qhMax || q.qw < qwMin || q.qw > qwMax) continue;
        if (q.cx < 4 || q.cy < 4 || q.cx > maxW - 4 || q.cy > maxH - 4) continue;
        const aspect = q.qw / q.qh;
        // nameplate = faixa larga e baixa (nÃ£o quadrado de tile/sprite)
        if (aspect < 1.7 || aspect > 11) continue;
        const hErr = Math.abs(q.qh - targetH);
        scored.push({
          cx: q.cx,
          cy: q.cy,
          qw: q.qw,
          qh: q.qh,
          x: q.cx,
          y: q.cy,
          score: 100 - hErr * 8 - Math.abs(aspect - 4) * 2
        });
      }

      // no mÃ¡ximo ~18 nameplates na tela
      const kept = this._nms(scored, Math.max(14, 12 * sc), 18);
      const out = kept.map((k) => ({ cx: k.cx, cy: k.cy, qw: k.qw, qh: k.qh }));
      this._lastQuads = out;
      this._quadDbg = {
        aw,
        ah,
        dbw,
        dbh,
        maxX: Math.round(maxCX),
        maxY: Math.round(maxCY),
        n: out.length,
        raw: raw.length,
        scored: scored.length
      };
      return out;
    }

    /** Converte centro do nameplate â posiÃ§Ã£o do corpo + fraÃ§Ã£o de tela. */
    _pinFromQuad(cx, cy) {
      const { w: aw, h: ah } = this._arenaSize();
      const buf = this._quadSpace !== 'world';
      const maxW = buf ? aw : WORLD_W;
      const maxH = buf ? ah : WORLD_H;
      const bodyY = Math.min(maxH - 4, cy + maxH * BODY_OFFSET_FRAC);
      return {
        x: cx,
        y: bodyY,
        nx: cx / maxW,
        ny: bodyY / maxH,
        space: buf ? 'buf' : 'world'
      };
    }

    _readHuntKey() {
      const S = this._sel();
      try {
        if (typeof S?.getWaveTitleText === 'function') {
          return String(S.getWaveTitleText() || '').trim();
        }
      } catch (_) {}
      try {
        return String(document.querySelector('#wave-title')?.textContent || '').trim();
      } catch (_) {
        return '';
      }
    }

    _localPlayerKey() {
      try {
        const el = document.querySelector('#hud-nick, .hud-nick');
        const raw = String(
          el?.getAttribute?.('data-tb-original-name') || el?.textContent || ''
        )
          .replace(/\s+/g, ' ')
          .trim();
        if (!raw || raw === 'TibiaBot.Online') return '';
        const resolved = this._resolve(raw);
        return resolved?.key || '';
      } catch (_) {
        return '';
      }
    }

    _partyCentroid() {
      let sx = 0;
      let sy = 0;
      let n = 0;
      for (const pin of this._pins.values()) {
        if (!pin.party) continue;
        sx += pin.x;
        sy += pin.y;
        n++;
      }
      if (!n) return null;
      return { x: sx / n, y: sy / n };
    }

    /**
     * AtribuiÃ§Ã£o em 2 passes: party primeiro, depois mobs perto da party.
     * Custo = largura + continuidade espacial.
     */
    _assignGroup(candidates, quads, usedQ, opts) {
      const near = opts?.near || null;
      const nearR = opts?.nearR || MOB_NEAR_PARTY;
      const maxJump = opts?.maxJump || MAX_JUMP;
      const minSep = opts?.minSep || MIN_SEP;
      const pairs = [];

      for (let ci = 0; ci < candidates.length; ci++) {
        const c = candidates[ci];
        const prev = this._pins.get(c.key);
        const maxW = this._quadSpace === 'buf' ? MATCH_MAX_ERR * 2.5 + 4 : MATCH_MAX_ERR;
        for (let qi = 0; qi < quads.length; qi++) {
          if (usedQ.has(qi)) continue;
          const q = quads[qi];
          const body = this._pinFromQuad(q.cx, q.cy);
          if (near && !c.party) {
            if (Math.hypot(body.x - near.x, body.y - near.y) > nearR) continue;
          }
          const wErr = Math.min(
            Math.abs(q.qw - c.expectW),
            c.expectW2 > 0 ? Math.abs(q.qw - c.expectW2) : Infinity
          );
          if (wErr > maxW) continue;

          let dist = 0;
          if (prev) {
            dist = Math.hypot(body.x - prev.x, body.y - prev.y);
            if (dist > maxJump) continue;
          }

          const cost =
            wErr * (prev ? 2.5 : 8) + dist * (prev ? 0.9 : 0) + (c.fromText ? 0 : 20);
          pairs.push({ ci, qi, cost, wErr, body });
        }
      }

      pairs.sort((a, b) => a.cost - b.cost || a.wErr - b.wErr);

      const usedC = new Set();
      /** @type {{ key:string, display:string, party:boolean, x:number, y:number, nx:number, ny:number }[]} */
      const out = [];

      for (const p of pairs) {
        if (usedC.has(p.ci) || usedQ.has(p.qi)) continue;
        const c = candidates[p.ci];
        const body = p.body;

        let crowded = false;
        for (const a of out) {
          if (Math.hypot(body.x - a.x, body.y - a.y) < minSep) {
            crowded = true;
            break;
          }
        }
        if (crowded) continue;

        usedC.add(p.ci);
        usedQ.add(p.qi);
        out.push({
          key: c.key,
          display: c.display,
          party: c.party,
          x: body.x,
          y: body.y,
          nx: body.nx,
          ny: body.ny
        });
      }
      return out;
    }

    _matchAndUpdatePins(quads) {
      // pixel mode legado (print/cor) â desligado no teste nameplate
      if (USE_PIXEL_POSITIONS) return;

      const now = performance.now();
      this._refreshParty();
      this._ensurePartyWidths();

      // troca de hunt/sala â limpa fantasmas
      const hunt = this._readHuntKey();
      if (hunt && hunt !== this._huntKey) {
        this._huntKey = hunt;
        for (const [k, m] of this._meta) {
          if (!m.party) this._meta.delete(k);
        }
        for (const [k, p] of this._pins) {
          if (!p.party) this._pins.delete(k);
        }
      }

      // largura do nameplate no MESMO espaÃ§o dos quads
      const buf = this._quadSpace !== 'world';
      const { w: arenaW } = this._arenaSize();
      const scale = buf ? 1 : WORLD_W / arenaW;
      const maxJump = buf ? MAX_JUMP * (arenaW / WORLD_W) : MAX_JUMP;
      const minSep = buf ? MIN_SEP * (arenaW / WORLD_W) : MIN_SEP;

      const candidates = [...this._meta.entries()]
        .filter(([, m]) => {
          if (!m.w || m.w <= 0) return false;
          if (!m.fromText) return false;
          if (now - m.seenAt > (m.party ? 6000 : META_MOB_MS)) return false;
          return true;
        })
        .map(([key, m]) => {
          const w = m.w;
          const wAlt = m.wAlt || this._estimateWidth(m.display);
          return {
            key,
            party: !!(m.party || this._partyMembers.has(key)),
            display: this._partyMembers.get(key)?.display || m.display,
            expectW: w * scale,
            expectW2: wAlt * scale,
            seenAt: m.seenAt,
            fromText: !!m.fromText
          };
        });

      const usedQ = new Set();
      const partyC = candidates.filter((c) => c.party);
      const mobC = candidates.filter((c) => !c.party);

      // passa maxJump/minSep via opts no assign â patch _assignGroup para aceitar
      const partyAssigned = this._assignGroup(partyC, quads, usedQ, {
        maxJump,
        minSep
      });
      let sx = 0;
      let sy = 0;
      let n = 0;
      for (const a of partyAssigned) {
        sx += a.x;
        sy += a.y;
        n++;
      }
      if (!n) {
        const c = this._partyCentroid();
        if (c) {
          sx = c.x;
          sy = c.y;
          n = 1;
        }
      }
      const near = n ? { x: sx / n, y: sy / n } : null;

      const mobAssigned = this._assignGroup(mobC, quads, usedQ, {
        near,
        nearR: buf ? MOB_NEAR_PARTY * (arenaW / WORLD_W) : MOB_NEAR_PARTY,
        maxJump,
        minSep
      });

      const assigned = partyAssigned.concat(mobAssigned);
      const assignedKeys = new Set();

      for (const a of assigned) {
        assignedKeys.add(a.key);
        this._commitPin(a.key, a.x, a.y, a.party, a.display, now, a.nx, a.ny);
      }

      for (const [key, pin] of this._pins) {
        if (this._partyMembers.has(key)) {
          pin.party = true;
          pin.display = this._partyMembers.get(key)?.display || pin.display;
        }
        if (assignedKeys.has(key)) continue;

        if (!pin.party) {
          this._pins.delete(key);
          continue;
        }
        const m = this._meta.get(key);
        if (!m?.fromText || now - m.seenAt > 6000) {
          this._pins.delete(key);
          continue;
        }
        if (now - pin.updatedAt > STICKY_PARTY_MS) this._pins.delete(key);
      }

      if (near) {
        const nearR = buf ? MOB_NEAR_PARTY * (arenaW / WORLD_W) + 40 : MOB_NEAR_PARTY + 20;
        for (const [key, pin] of this._pins) {
          if (pin.party) continue;
          if (Math.hypot(pin.x - near.x, pin.y - near.y) > nearR) {
            this._pins.delete(key);
          }
        }
      }

      for (const [key, m] of this._meta) {
        if (!m.party && !this._partyMembers.has(key) && now - m.seenAt > META_MOB_MS) {
          this._meta.delete(key);
        }
      }
    }

    /**
     * Aplica posiÃ§Ã£o com zona morta + lerp â evita tremor e âteleporteâ de nome.
     */
    _commitPin(key, x, y, party, display, now, nx, ny) {
      const pinPos = nx != null && ny != null ? { nx, ny } : this._normFromXY(x, y);
      const prev = this._pins.get(key);
      const aw = this._arena?.width || WORLD_W;
      const jump = this._quadSpace === 'buf' ? MAX_JUMP * (aw / WORLD_W) : MAX_JUMP;
      const dead = this._quadSpace === 'buf' ? DEADZONE * (aw / WORLD_W) : DEADZONE;
      if (prev) {
        const d = Math.hypot(x - prev.x, y - prev.y);
        if (d < dead) {
          prev.updatedAt = now;
          prev.party = party;
          prev.display = display;
          return;
        }
        if (d > jump) {
          this._pins.set(key, {
            x,
            y,
            nx: pinPos.nx,
            ny: pinPos.ny,
            party,
            display,
            updatedAt: now,
            via: 'nameplate'
          });
          return;
        }
        x = prev.x + (x - prev.x) * SMOOTH;
        y = prev.y + (y - prev.y) * SMOOTH;
      }
      const mid = this._normFromXY(x, y);
      this._pins.set(key, {
        x,
        y,
        nx: mid.nx,
        ny: mid.ny,
        party,
        display,
        updatedAt: now,
        via: 'nameplate'
      });
    }

    _normFromXY(x, y) {
      const { w: aw, h: ah } = this._arenaSize();
      if (this._quadSpace === 'buf') {
        return { nx: x / aw, ny: y / ah };
      }
      return { nx: x / WORLD_W, ny: y / WORLD_H };
    }

    _bodyFromNameplate(cx, cy) {
      return this._pinFromQuad(cx, cy);
    }

    /**
     * Amarra upload recente (texSubImage com label) ao quad nameplate do mesmo frame.
     */
    _bindUploadsToQuads(quads) {
      if (!quads?.length || !this._uploadQueue?.length) return;
      const now = performance.now();
      this._uploadQueue = this._uploadQueue.filter((u) => now - u.at < UPLOAD_BIND_MS);
      if (!this._uploadQueue.length) return;

      const buf = this._quadSpace !== 'world';
      const { w: arenaW } = this._arenaSize();
      const scale = buf ? 1 : WORLD_W / arenaW;
      const maxJump = buf ? MAX_JUMP * (arenaW / WORLD_W) * 1.6 : MAX_JUMP * 1.6;
      const wTol = buf ? MATCH_MAX_ERR * (arenaW / WORLD_W) + 4 : MATCH_MAX_ERR + 2;
      const usedQ = new Set();

      const queue = this._uploadQueue.slice().sort((a, b) => b.at - a.at);
      const kept = [];

      for (const u of queue) {
        let best = -1;
        let bestCost = Infinity;
        const expectW = (u.w || 0) * scale;
        for (let i = 0; i < quads.length; i++) {
          if (usedQ.has(i)) continue;
          const q = quads[i];
          const wErr = Math.abs(q.qw - expectW);
          if (wErr > wTol) continue;
          let dist = 0;
          const prev = this._pins.get(u.key);
          if (prev) {
            const body = this._pinFromQuad(q.cx, q.cy);
            dist = Math.hypot(body.x - prev.x, body.y - prev.y);
            if (dist > maxJump) continue;
          }
          const cost = wErr * 3 + dist * 0.5;
          if (cost < bestCost) {
            bestCost = cost;
            best = i;
          }
        }
        if (best < 0) {
          kept.push(u);
          continue;
        }
        usedQ.add(best);
        const q = quads[best];
        const body = this._pinFromQuad(q.cx, q.cy);
        const party = !!(u.party || this._partyMembers.has(u.key));
        this._commitPin(u.key, body.x, body.y, party, u.display, now, body.nx, body.ny);
      }
      this._uploadQueue = kept;
    }

    _installHooks() {
      const self = this;
      this._oFill = CanvasRenderingContext2D.prototype.fillText;
      this._oStroke = CanvasRenderingContext2D.prototype.strokeText;

      const capture = (ctx, text) => {
        // ignora nossos canvases (senÃ£o o mini-mapa polui o meta)
        if (
          ctx?.canvas === self._mini ||
          ctx?.canvas === self._sampleCanvas ||
          ctx?.canvas?.__tbMapaUi
        ) {
          return;
        }
        const t = String(text ?? '').trim();
        if (isSpellText(t)) {
          self._noteSpellActivity(t);
          return;
        }
        if (!isNameplateText(t)) return;
        let scaleA = 0;
        try {
          const tr = ctx.getTransform?.();
          if (tr) scaleA = tr.a;
        } catch (_) {}
        self._remember(t, ctx.canvas?.width || 0, ctx.font, scaleA);
        if (ctx.canvas) {
          ctx.canvas.__tbMapaLabel = {
            text: t,
            w: ctx.canvas.width,
            h: ctx.canvas.height
          };
        }
      };

      this._hookedFill = function (text, ...rest) {
        try {
          capture(this, text);
        } catch (_) {}
        return self._oFill.call(this, text, ...rest);
      };
      this._hookedStroke = function (text, ...rest) {
        try {
          capture(this, text);
        } catch (_) {}
        return self._oStroke.call(this, text, ...rest);
      };
      CanvasRenderingContext2D.prototype.fillText = this._hookedFill;
      CanvasRenderingContext2D.prototype.strokeText = this._hookedStroke;

      const gl = this._gl;
      this._oSub = gl.texSubImage2D.bind(gl);
      this._oDrawEl = gl.drawElements.bind(gl);

      gl.texSubImage2D = function (...args) {
        try {
          const src = args.find((a) => a && a.__tbMapaLabel);
          if (src?.__tbMapaLabel) {
            const t = src.__tbMapaLabel.text;
            if (isSpellText(t)) {
              self._noteSpellActivity(t);
            } else if (isNameplateText(t)) {
              self._remember(t, src.width || src.__tbMapaLabel.w || 0);
              const resolved = self._resolve(t);
              if (resolved?.key) {
                self._uploadQueue.push({
                  key: resolved.key,
                  display: resolved.display,
                  party: !!(resolved.party || self._partyMembers.has(resolved.key)),
                  w: src.width || src.__tbMapaLabel.w || 0,
                  at: performance.now()
                });
                if (self._uploadQueue.length > 24) {
                  self._uploadQueue.splice(0, self._uploadQueue.length - 24);
                }
              }
            }
          }
        } catch (_) {}
        return self._oSub(...args);
      };

      gl.drawElements = function (mode, count, type, offset) {
        const ret = self._oDrawEl(mode, count, type, offset);
        try {
          const now = performance.now();
          // bind imediato: sÃ³ em draws pequenos (nameplate), nÃ£o no batch do mapa
          if (self._uploadQueue.length && count >= 6 && count <= 120) {
            const quadsFast = self._readQuads(gl);
            if (quadsFast.length) {
              self._bindUploadsToQuads(quadsFast);
              if (SHOW_ARENA_OVERLAY) self._drawPinsOnArena();
            }
          }
          if (now - self._lastScan >= SCAN_MS) {
            self._lastScan = now;
            // evita ler buffer gigante do chÃ£o/tiles
            if (count > 6 && count <= 200) {
              const quads = self._readQuads(gl);
              if (quads.length) {
                self._matchAndUpdatePins(quads);
                if (SHOW_ARENA_OVERLAY) self._drawPinsOnArena();
              }
            }
          }
          if (count >= 150 && count < 900) {
            self._floorShotThisFrame = true;
            try {
              self._captureFloorSnapshot();
            } catch (_) {}
          }
          if (count > 20) self._schedulePixelCapture();
        } catch (_) {}
        return ret;
      };
    }

    _uninstallHooks() {
      try {
        if (
          this._hookedFill &&
          CanvasRenderingContext2D.prototype.fillText === this._hookedFill &&
          this._oFill
        ) {
          CanvasRenderingContext2D.prototype.fillText = this._oFill;
        }
        if (
          this._hookedStroke &&
          CanvasRenderingContext2D.prototype.strokeText === this._hookedStroke &&
          this._oStroke
        ) {
          CanvasRenderingContext2D.prototype.strokeText = this._oStroke;
        }
      } catch (_) {}

      try {
        if (this._gl) {
          if (this._oSub) this._gl.texSubImage2D = this._oSub;
          if (this._oDrawEl) this._gl.drawElements = this._oDrawEl;
        }
      } catch (_) {}

      this._oFill = null;
      this._oStroke = null;
      this._oSub = null;
      this._oDrawEl = null;
      this._hookedFill = null;
      this._hookedStroke = null;
    }

    _drawMini() {
      const mini = this._mini;
      const mctx = this._mctx;
      const arena = this._arena;
      if (!mini || !mctx || !arena) return;
      const w = mini.width;
      const h = mini.height;
      mini.__tbMapaUi = true;

      // usa fillText original â o hook poluia nomes/debug
      const fill = this._oFill
        ? (t, x, y) => this._oFill.call(mctx, t, x, y)
        : (t, x, y) => mctx.fillText(t, x, y);
      const stroke = this._oStroke
        ? (t, x, y) => this._oStroke.call(mctx, t, x, y)
        : (t, x, y) => mctx.strokeText(t, x, y);

      mctx.setTransform(1, 0, 0, 1, 0, 0);
      mctx.globalAlpha = 1;

      this._blitSampleToMini(mctx, w, h);

      if ((this._captureMean ?? 0) < 12) {
        mctx.fillStyle = 'rgba(0,0,0,.55)';
        mctx.fillRect(0, 0, w, h);
        mctx.fillStyle = '#f87171';
        mctx.font = 'bold 11px Segoe UI,sans-serif';
        mctx.textAlign = 'center';
        fill('CAPTURA PRETA', w / 2, h / 2 - 6);
      }

      const now = performance.now();
      let nP = 0;
      let nM = 0;
      for (const pin of this._pins.values()) {
        const ttl = pin.party ? STICKY_PARTY_MS : STICKY_MOB_MS;
        if (now - pin.updatedAt > ttl) continue;
        if (pin.party) nP++;
        else nM++;
      }

      this._drawPinsOnArena();

      if (this._countEl) {
        this._countEl.textContent = nP + nM ? `Â· ${nP} pt Â· ${nM} mob` : '';
      }
      this._emitStatus(nP + nM, nP, nM);
    }

    _emitStatus(nPix, nP, nM) {
      const key = `${nPix}|${nP}|${nM}|${this._lastPixelMs}`;
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
              moduleId: 'mapa_entidades',
              moduleLabel: 'Mapa',
              status: 'watching',
              remainingMs: 0,
              remainingText: `pt${nP} mob${nM}`,
              running: !!this._running
            }
          },
          '*'
        );
      } catch (_) {}
    }

    start() {
      if (this._running) return;
      this._arena = this._findArena();
      if (!this._arena) {
        console.warn('[BaiakIdle Mapa] canvas da arena nÃ£o encontrado');
        return;
      }
      const gl =
        this._arena.getContext('webgl2') || this._arena.getContext('webgl');
      if (!gl) {
        console.warn('[BaiakIdle Mapa] WebGL indisponÃ­vel na arena');
        return;
      }
      this._gl = gl;
      this._running = true;
      this._meta.clear();
      this._pins.clear();
      try {
        this._vocTracks?.clear?.();
      } catch (_) {}
      this._pixelBlobs = [];
      this._lastStatusKey = '';
      this._huntKey = this._readHuntKey();
      this._refreshParty();
      this._ensurePartyWidths();
      this._ensureUi();
      this._installHooks();

      this._partyIv = setInterval(() => {
        this._refreshParty();
        this._ensurePartyWidths();
        // canvas pode redimensionar (--game-w/--game-h)
        this._arena = this._findArena() || this._arena;
      }, 1500);

      this._pixelIv = null; // captura via rAF no drawElements
      this._drawIv = setInterval(() => this._drawMini(), 100);
      this._pixelTick();
      this._emitStatus(0, 0, 0);
      this._uploadQueue = [];
      const sz = this._arenaSize();
      console.log(
        '[BaiakIdle Mapa] ON (nameplate) arena',
        sz.w + 'Ã' + sz.h,
        'canvas',
        this._arena?.width,
        this._arena?.height
      );
    }

    stop() {
      if (!this._running) return;
      this._running = false;
      try {
        clearInterval(this._drawIv);
      } catch (_) {}
      try {
        clearInterval(this._partyIv);
      } catch (_) {}
      try {
        if (this._pixelRaf) cancelAnimationFrame(this._pixelRaf);
      } catch (_) {}
      this._drawIv = null;
      this._partyIv = null;
      this._pixelIv = null;
      this._pixelRaf = 0;
      this._uninstallHooks();
      this._teardownUi();
      this._meta.clear();
      this._pins.clear();
      this._pixelBlobs = [];
      this._gl = null;
      this._arena = null;
      try {
        window.postMessage(
          {
            source: 'TIBIA_BOT_MAIN',
            type: 'MODULE_STATUS',
            payload: {
              botId: 'baiak_idle',
              botLabel: 'Baiak-Idle',
              moduleId: 'mapa_entidades',
              moduleLabel: 'Mapa',
              status: 'stopped',
              remainingMs: 0,
              remainingText: '',
              running: false
            }
          },
          '*'
        );
      } catch (_) {}
      console.log('[BaiakIdle Mapa] mÃ³dulo parado');
    }
  }

  window.BaiakIdleMapaEntidadesModule = BaiakIdleMapaEntidadesModule;

  try {
    const prev = window.__baiakIdleMapaEntidades;
    const wasRunning = !!prev?.isRunning?.();
    try {
      prev?.stop?.();
    } catch (_) {}
    window.__baiakIdleMapaEntidades = new BaiakIdleMapaEntidadesModule();
    if (wasRunning || window.__BAIAKIDLE_AUTO_START_MAPA_ENTIDADES__) {
      window.__baiakIdleMapaEntidades.start();
    }
  } catch (err) {
    console.error('[BaiakIdle Mapa] Falha no bootstrap', err);
  }
})();
