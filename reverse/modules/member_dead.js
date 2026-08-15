/* TB-WM u=179 e=a07d5b4cfa x=f2e5047b9289 t=1786720266 s=39af87f492a1af08 */
(function(){try{window.__TIBIABOT_WM__={u:179,t:1786720266,x:"f2e5047b9289",s:"39af87f492a1af08"};}catch(e){}})();

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


// Baiak Idle: teleporte Cidade â (confirma no DOM) â Hunt ativa
// Depende de BaiakIdleSeletores e de window.__baiakIdleSelectedHunt (sync da extensÃ£o)
// Sempre sobrescreve para aplicar updates sem precisar F5 da pÃ¡gina.

(function () {
    const VERSION = 12;
    const AFTER_CITY_MS = 1000;
    const STEP_MS = 450;
    const FIND_TIMEOUT_MS = 10000;
    const CITY_ARRIVE_TIMEOUT_MS = 30000;
    const FIND_POLL_MS = 200;

    class BaiakIdleTeleporte {
        static get VERSION() {
            return VERSION;
        }

        static _log(msg, extra) {}

        static _pulsePresence() {
            try {
                window.BaiakIdleSeletores?.pulseHumanPresence?.();
            } catch (_) {}
        }

        static get busy() {
            return !!window.__baiakIdleTeleporteBusy;
        }

        static _sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        /**
         * Se o modal de Chefes estiver aberto (#boss-modal-close), fecha antes de qualquer fluxo.
         * @returns {Promise<boolean>} true se clicou/fechou
         */
        static async closeBossModalIfOpen() {
            const S = window.BaiakIdleSeletores;
            const findClose = () => {
                try {
                    if (S?.findElement && S.BOSS?.CLOSE) {
                        const el = S.findElement(S.BOSS.CLOSE, 'BOSS_CLOSE');
                        if (el) return el;
                    }
                } catch (_) {}
                try {
                    return (
                        document.getElementById('boss-modal-close') ||
                        document.querySelector('button#boss-modal-close.im-closebtn') ||
                        document.querySelector('#boss-modal-close')
                    );
                } catch (_) {
                    return null;
                }
            };

            let clicked = false;
            const deadline = Date.now() + 2500;

            // Limpa pick-search residual antes de fechar (evita âgrudarâ boss anterior)
            try {
                const search =
                    (typeof S?.findBossSearchInput === 'function'
                        ? S.findBossSearchInput()
                        : null) || document.querySelector('input.pick-search');
                if (search && String(search.value || '').trim()) {
                    this._setSearchInputValue(search, '');
                }
            } catch (_) {}

            while (Date.now() < deadline) {
                const btn = findClose();
                if (!btn) break;
                let visible = true;
                try {
                    if (typeof S?.isClickable === 'function') {
                        visible = S.isClickable(btn);
                    } else {
                        const r = btn.getBoundingClientRect?.();
                        visible = !!(r && r.width > 0 && r.height > 0);
                    }
                } catch (_) {
                    visible = true;
                }
                if (!visible) break;

                this._pulsePresence();
                try {
                    if (typeof S?.safeClick === 'function') S.safeClick(btn);
                    else btn.click();
                } catch (_) {
                    try {
                        btn.click();
                    } catch (__) {}
                }
                clicked = true;
                this._log('Fechou modal Chefes (#boss-modal-close) antes do fluxo');
                await this._sleep(STEP_MS);

                // se sumiu, ok; se ainda lÃ¡, tenta de novo no loop
                if (!findClose() || (S?.isClickable && !S.isClickable(findClose()))) {
                    break;
                }
            }

            if (clicked) {
                // aguarda modal sumir / lista sumir para nÃ£o reusar estado sujo
                const waitUntil = Date.now() + 3000;
                while (Date.now() < waitUntil) {
                    if (!this._isBossModalReady() && !findClose()) break;
                    await this._sleep(FIND_POLL_MS);
                }
            }
            return clicked;
        }

        static getSelectedHuntName() {
            const h = window.__baiakIdleSelectedHunt;
            if (h && typeof h === 'object' && h.name) {
                return String(h.name).trim();
            }
            if (typeof h === 'string') return h.trim();
            return '';
        }

        static async _waitClick(selectorArray, name, root = null) {
            const S = window.BaiakIdleSeletores;
            if (!S) throw new Error('BaiakIdleSeletores indisponÃ­vel');

            const started = Date.now();
            while (Date.now() - started < FIND_TIMEOUT_MS) {
                const el = S.findElement(selectorArray, name, root);
                if (el && S.isClickable(el)) {
                    el.click();
                    return el;
                }
                await this._sleep(FIND_POLL_MS);
            }
            throw new Error(`Timeout ao clicar: ${name}`);
        }

        static async _waitSpCat(label) {
            const S = window.BaiakIdleSeletores;
            if (!S) throw new Error('BaiakIdleSeletores indisponÃ­vel');

            const started = Date.now();
            while (Date.now() - started < FIND_TIMEOUT_MS) {
                const el = S.findSpCatByLabel(label);
                if (el && S.isClickable(el)) {
                    el.click();
                    return el;
                }
                await this._sleep(FIND_POLL_MS);
            }
            throw new Error(`Timeout: rank "${label}"`);
        }

        /** Espera o #wave-title mostrar "Cidade" (chegou na cidade). */
        static async _waitUntilInCity() {
            const S = window.BaiakIdleSeletores;
            if (!S) throw new Error('BaiakIdleSeletores indisponÃ­vel');

            const started = Date.now();
            while (Date.now() - started < CITY_ARRIVE_TIMEOUT_MS) {
                if (typeof S.isInCity === 'function' ? S.isInCity() : String(S.getWaveTitleText?.() || '').toLowerCase() === 'cidade') {
                    this._log('Confirmado no DOM: wave-title = Cidade');
                    return true;
                }
                await this._sleep(FIND_POLL_MS);
            }
            throw new Error('Timeout aguardando wave-title = Cidade');
        }

        /**
         * Encontra o monstro na lista, clica nele e depois em CaÃ§ar.
         * @param {string} huntName
         */
        static async _selectHuntAndGo(huntName) {
            const S = window.BaiakIdleSeletores;
            if (!S) throw new Error('BaiakIdleSeletores indisponÃ­vel');

            const started = Date.now();
            let row = null;
            while (Date.now() - started < FIND_TIMEOUT_MS) {
                row = S.findStageRowByName(huntName);
                if (row) break;
                await this._sleep(FIND_POLL_MS);
            }
            if (!row) throw new Error(`Hunt nÃ£o encontrada: ${huntName}`);

            const nameEl = row.querySelector('.stage-name-line b') || row.querySelector('.stage-name-line') || row;
            if (!S.isClickable(nameEl) && !S.isClickable(row)) {
                throw new Error(`Monstro nÃ£o clicÃ¡vel: ${huntName}`);
            }
            (S.isClickable(nameEl) ? nameEl : row).click();
            this._log(`Monstro selecionado: ${huntName}`);
            await this._sleep(STEP_MS);

            const goStarted = Date.now();
            while (Date.now() - goStarted < FIND_TIMEOUT_MS) {
                const go =
                    S.findElement(S.HUNTS.STAGE_GO, 'STAGE_GO', row) ||
                    S.findElement(S.HUNTS.STAGE_GO, 'STAGE_GO');
                if (go && S.isClickable(go)) {
                    go.click();
                    return go;
                }
                await this._sleep(FIND_POLL_MS);
            }
            throw new Error(`Timeout: botÃ£o CaÃ§ar para "${huntName}"`);
        }

        /**
         * Abre teleportes â Hunts â Todas â monstro â CaÃ§ar.
         * @param {string} huntName
         */
        static async _openHuntsAndGo(huntName) {
            const S = window.BaiakIdleSeletores;
            await this._waitClick(S.HUNTS.WAVE_TITLE, 'WAVE_TITLE');
            await this._sleep(STEP_MS);
            await this._waitClick(S.HUNTS.TP_HUNTS, 'TP_HUNTS');
            await this._sleep(STEP_MS);
            await this._waitSpCat('Todas');
            await this._sleep(STEP_MS);
            await this._selectHuntAndGo(huntName);
        }

        /**
         * True se o menu de teleporte (#teleport-menu) estÃ¡ aberto com opÃ§Ãµes.
         */
        static _isTeleportMenuOpen() {
            const S = window.BaiakIdleSeletores;
            if (!S) return false;
            const menu = typeof S.findTeleportMenu === 'function'
                ? S.findTeleportMenu()
                : S.findElement(S.HUNTS.TP_MENU, 'TP_MENU');
            if (!menu || !S.isClickable(menu)) return false;
            const opts = menu.querySelectorAll('button.tp-opt');
            if (!opts.length) return false;
            for (const opt of opts) {
                if (S.isClickable(opt)) return true;
            }
            return false;
        }

        /**
         * True se o modal de Chefes estÃ¡ visÃ­vel com lista de bosses.
         */
        static _isBossModalReady() {
            const S = window.BaiakIdleSeletores;
            if (!S?.BOSS) return false;
            const body = S.findElement(S.BOSS.MODAL_BODY, 'BOSS_MODAL_BODY');
            if (!body || !S.isClickable(body)) return false;
            const card = body.closest?.('.im-card') || body.parentElement;
            if (card && !S.isClickable(card)) return false;
            const list = body.querySelector('.boss-pane-list');
            if (!list || list.classList.contains('hidden')) return false;
            if (!S.isClickable(list)) return false;
            const cell = body.querySelector('.boss-pane-list .boss-cell, .sp-list.boss-cardgrid .boss-cell');
            return !!(cell && S.isClickable(cell));
        }

        /**
         * Clica no #wave-title e espera o menu com opÃ§Ãµes aparecer.
         * Se jÃ¡ estiver aberto, nÃ£o fecha (nÃ£o reclica).
         */
        static async _openTeleportMenu() {
            const S = window.BaiakIdleSeletores;
            if (this._isTeleportMenuOpen()) {
                this._log('Menu de teleporte jÃ¡ aberto');
                return true;
            }

            const started = Date.now();
            let attempts = 0;
            while (Date.now() - started < FIND_TIMEOUT_MS) {
                attempts += 1;
                await this._waitClick(S.HUNTS.WAVE_TITLE, 'WAVE_TITLE');
                this._log(`Clicou WAVE_TITLE (tentativa ${attempts}), aguardando menuâ¦`);
                await this._sleep(STEP_MS);

                const waitMenu = Date.now();
                while (Date.now() - waitMenu < 2500) {
                    if (this._isTeleportMenuOpen()) {
                        this._log('Menu de teleporte aberto com opÃ§Ãµes');
                        return true;
                    }
                    await this._sleep(FIND_POLL_MS);
                }

                // Clique pode ter fechado um menu residual â tenta de novo.
                this._log('Menu nÃ£o abriu apÃ³s WAVE_TITLE; tentando novamente');
            }
            throw new Error('Timeout: menu de teleporte nÃ£o abriu com opÃ§Ãµes');
        }

        /**
         * Garante o modal Chefes aberto na aba Bosses.
         * Nunca reutiliza modal prÃ©-existente âsujoâ: se #boss-modal-close existir, fecha e reabre.
         */
        static async _ensureBossModalOpen() {
            const S = window.BaiakIdleSeletores;
            if (!S?.BOSS) throw new Error('Seletores de boss indisponÃ­veis');

            // Limpa modal residual antes de WAVE_TITLE / Chefes
            try {
                await this.closeBossModalIfOpen();
            } catch (_) {}

            if (this._isBossModalReady()) {
                this._log('Modal de bosses jÃ¡ visÃ­vel');
            } else {
                await this._openTeleportMenu();

                const bossBtn =
                    (typeof S.findTpOpt === 'function' ? S.findTpOpt('boss') : null) ||
                    S.findElement(S.HUNTS.TP_BOSS, 'TP_BOSS');
                if (!bossBtn || !S.isClickable(bossBtn)) {
                    throw new Error('OpÃ§Ã£o Chefes nÃ£o encontrada no menu aberto');
                }
                bossBtn.click();
                this._log('Clicou em Chefes (data-tp=boss)');
                await this._sleep(STEP_MS);

                const started = Date.now();
                while (Date.now() - started < FIND_TIMEOUT_MS) {
                    if (this._isBossModalReady()) break;
                    await this._sleep(FIND_POLL_MS);
                }
                if (!this._isBossModalReady()) {
                    throw new Error('Timeout aguardando lista de bosses visÃ­vel');
                }
                this._log('Lista de bosses visÃ­vel');
            }

            const tab = S.findBossTabBosses?.();
            if (tab && !tab.classList.contains('on') && S.isClickable(tab)) {
                tab.click();
                this._log('Aba Bosses ativada');
                await this._sleep(STEP_MS);
            }
        }

        /**
         * Define valor em input controlado (React/Vue).
         * AtribuiÃ§Ã£o direta em .value nÃ£o atualiza o filtro do jogo â o boss
         * anterior fica no pick-search e o prÃ³ximo nÃ£o Ã© encontrado.
         * @param {HTMLInputElement|HTMLTextAreaElement|null} input
         * @param {string} text
         * @returns {boolean}
         */
        static _setSearchInputValue(input, text) {
            if (!input) return false;
            const value = String(text ?? '');
            try {
                input.focus();
            } catch (_) {}
            try {
                input.click?.();
            } catch (_) {}

            // Seleciona tudo para o framework tratar como substituiÃ§Ã£o completa
            try {
                if (typeof input.select === 'function') input.select();
                else if (typeof input.setSelectionRange === 'function') {
                    const len = String(input.value || '').length;
                    input.setSelectionRange(0, len);
                }
            } catch (_) {}

            try {
                const proto =
                    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value') ||
                    Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value');
                if (proto && typeof proto.set === 'function') {
                    proto.set.call(input, value);
                } else {
                    input.value = value;
                }
            } catch (_) {
                try {
                    input.value = value;
                } catch (__) {}
            }

            try {
                if (typeof InputEvent === 'function') {
                    input.dispatchEvent(
                        new InputEvent('input', {
                            bubbles: true,
                            cancelable: true,
                            composed: true,
                            data: value === '' ? null : value,
                            inputType: value === '' ? 'deleteContentBackward' : 'insertFromPaste'
                        })
                    );
                } else {
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                }
            } catch (_) {
                try {
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                } catch (__) {}
            }
            try {
                input.dispatchEvent(new Event('keyup', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
            } catch (_) {}

            return String(input.value || '') === value;
        }

        /**
         * Limpa e aplica o filtro do pick-search do modal de bosses.
         * @param {string} bossName
         * @returns {Promise<HTMLInputElement|null>}
         */
        static async _filterBossSearch(bossName) {
            const S = window.BaiakIdleSeletores;
            const name = String(bossName || '').trim();
            const search =
                (typeof S?.findBossSearchInput === 'function' ? S.findBossSearchInput() : null) ||
                document.querySelector('#boss-modal-body input.pick-search, input.pick-search');
            if (!search) return null;

            // 1) Sempre limpar o boss anterior (texto residual)
            this._setSearchInputValue(search, '');
            await this._sleep(160);

            // Se o framework devolveu o valor antigo, tenta de novo com select all
            if (String(search.value || '').trim() !== '') {
                try {
                    search.focus();
                    search.select?.();
                } catch (_) {}
                this._setSearchInputValue(search, '');
                await this._sleep(120);
            }

            // 2) Escreve o nome do boss atual
            this._setSearchInputValue(search, name);
            await this._sleep(120);

            // Confirma no DOM; se falhou, sobrescreve mais uma vez
            if (String(search.value || '').trim() !== name) {
                this._setSearchInputValue(search, '');
                await this._sleep(80);
                this._setSearchInputValue(search, name);
                await this._sleep(120);
            }

            this._log(`Filtrou busca de boss: ${name}`, {
                inputValue: String(search.value || '')
            });
            return search;
        }

        /**
         * Filtra pelo pick-search e localiza a .boss-cell do boss.
         * @param {string} bossName
         * @returns {Promise<Element>}
         */
        static async _findBossCellInModal(bossName) {
            const S = window.BaiakIdleSeletores;
            const name = String(bossName || '').trim();
            if (!name) throw new Error('Nome do boss vazio');

            if (!this._isBossModalReady()) {
                throw new Error('Modal de bosses nÃ£o estÃ¡ visÃ­vel');
            }

            try {
                await this._filterBossSearch(name);
                await this._sleep(STEP_MS);
            } catch (err) {
                this._log('Falha ao filtrar busca de boss', err?.message || err);
            }

            const started = Date.now();
            let cell = null;
            let refilterAt = Date.now() + 2500;
            while (Date.now() - started < FIND_TIMEOUT_MS) {
                cell = S.findBossCellByName(name);
                if (cell && S.isClickable(cell)) break;
                cell = null;

                // Reaplica o filtro se o jogo manteve o nome anterior no input
                if (Date.now() >= refilterAt) {
                    refilterAt = Date.now() + 2500;
                    try {
                        const search =
                            (typeof S.findBossSearchInput === 'function'
                                ? S.findBossSearchInput()
                                : null) || document.querySelector('input.pick-search');
                        const cur = String(search?.value || '').trim().toLowerCase();
                        if (!search || cur !== name.toLowerCase()) {
                            await this._filterBossSearch(name);
                        }
                    } catch (_) {}
                }

                await this._sleep(FIND_POLL_MS);
            }
            if (!cell) throw new Error(`Boss nÃ£o encontrado na lista: ${name}`);
            return cell;
        }

        /**
         * Expande a cÃ©lula (se preciso) e clica em "Enfrentar".
         * Fluxo novo do jogo: click na cÃ©lula â .expanded â button.boss-cell-go.
         * @param {Element} cell
         * @param {string} bossName
         */
        static async _confirmBossFight(cell, bossName) {
            const S = window.BaiakIdleSeletores;
            const name = String(bossName || '').trim();
            if (!cell) throw new Error(`CÃ©lula do boss invÃ¡lida: ${name}`);

            const getCell = () => S.findBossCellByName(name) || cell;

            const clickFight = (c) => {
                const btn =
                    (typeof S.findBossFightButton === 'function'
                        ? S.findBossFightButton(c)
                        : null) ||
                    c.querySelector?.('button.boss-fight.boss-cell-go') ||
                    c.querySelector?.('button.boss-cell-go') ||
                    c.querySelector?.('button.boss-fight');
                if (btn && S.isClickable(btn)) {
                    this._pulsePresence();
                    if (typeof S.safeClick === 'function') S.safeClick(btn);
                    else btn.click();
                    return true;
                }
                return false;
            };

            // JÃ¡ expandida com botÃ£o visÃ­vel?
            let cur = getCell();
            if (
                typeof S.isBossCellExpanded === 'function'
                    ? S.isBossCellExpanded(cur)
                    : cur?.classList?.contains('expanded')
            ) {
                if (clickFight(cur)) {
                    this._log(`Enfrentar (jÃ¡ expandido): ${name}`);
                    await this._sleep(STEP_MS);
                    return;
                }
            }

            // 1) Expandir â evitar clicar no "ï¼" (boss-cell-add) ou no prÃ³prio Enfrentar ainda oculto
            const expandTarget =
                cur.querySelector?.('.boss-cell-mon') ||
                cur.querySelector?.('canvas.boss-cell-mon') ||
                cur.querySelector?.('canvas') ||
                cur.querySelector?.('.boss-cell-name') ||
                cur;
            if (!S.isClickable(expandTarget) && !S.isClickable(cur)) {
                throw new Error(`Boss nÃ£o clicÃ¡vel: ${name}`);
            }
            this._pulsePresence();
            const expandEl = S.isClickable(expandTarget) ? expandTarget : cur;
            if (typeof S.safeClick === 'function') S.safeClick(expandEl);
            else expandEl.click();
            this._log(`Boss expandido: ${name}`);
            await this._sleep(STEP_MS);

            // 2) Aguardar .expanded + botÃ£o Enfrentar
            const started = Date.now();
            while (Date.now() - started < FIND_TIMEOUT_MS) {
                this._pulsePresence();
                cur = getCell();
                if (cur && clickFight(cur)) {
                    this._log(`Enfrentar clicado: ${name}`);
                    await this._sleep(STEP_MS);
                    return;
                }
                // Se ainda nÃ£o expandiu, tenta expandir de novo
                if (cur && !cur.classList?.contains('expanded')) {
                    try {
                        const t =
                            cur.querySelector?.('.boss-cell-mon') ||
                            cur.querySelector?.('canvas') ||
                            cur;
                        if (S.isClickable(t) || S.isClickable(cur)) {
                            this._pulsePresence();
                            const el = S.isClickable(t) ? t : cur;
                            if (typeof S.safeClick === 'function') S.safeClick(el);
                            else el.click();
                        }
                    } catch (_) {}
                }
                await this._sleep(FIND_POLL_MS);
            }
            throw new Error(`BotÃ£o Enfrentar nÃ£o apareceu para: ${name}`);
        }

        /**
         * Filtra pelo pick-search, expande a cÃ©lula e confirma Enfrentar.
         * @param {string} bossName
         */
        static async _selectBossInModal(bossName) {
            const cell = await this._findBossCellInModal(bossName);
            await this._confirmBossFight(cell, bossName);
            return cell;
        }

        /**
         * Abre menu â Chefes â localiza o boss â Enfrentar.
         * @param {string} bossName
         * @returns {Promise<{success:boolean, boss?:string, reason?:string, error?:string}>}
         */
        static async goToBoss(bossName) {
            if (this.busy) {
                return { success: false, reason: 'busy' };
            }

            const name = String(bossName || '').trim();
            if (!name) {
                this._log('Nenhum boss informado');
                return { success: false, reason: 'no_boss' };
            }

            const S = window.BaiakIdleSeletores;
            if (!S?.HUNTS?.WAVE_TITLE || !S?.HUNTS?.TP_BOSS || !S?.BOSS) {
                this._log('Seletores incompletos (precisa TP_BOSS/BOSS). VersÃ£o:', S?.VERSION);
                return { success: false, reason: 'no_selectors' };
            }

            window.__baiakIdleTeleporteBusy = true;
            this._log(`Indo enfrentar boss: ${name}`);
            this._pulsePresence();

            try {
                // Antes de WAVE_TITLE / Helper: fecha modal residual se #boss-modal-close existir
                try {
                    await this.closeBossModalIfOpen();
                } catch (_) {}

                await this._ensureBossModalOpen();
                this._pulsePresence();
                await this._selectBossInModal(name);
                this._log(`Boss aberto (Enfrentar): ${name}`);
                return { success: true, boss: name };
            } catch (err) {
                const message = err?.message || String(err);
                this._log('Falha ao abrir boss', message);
                return { success: false, reason: 'error', error: message };
            } finally {
                window.__baiakIdleTeleporteBusy = false;
            }
        }

        /**
         * Vai direto para a hunt (sem passar pela cidade).
         * @param {string} [huntName]
         * @returns {Promise<{success:boolean, hunt?:string, reason?:string, error?:string}>}
         */
        static async goToHunt(huntName) {
            if (this.busy) {
                return { success: false, reason: 'busy' };
            }

            const name = String(huntName || this.getSelectedHuntName() || '').trim();
            if (!name) {
                this._log('Nenhuma hunt ativa selecionada na extensÃ£o');
                return { success: false, reason: 'no_hunt' };
            }

            const S = window.BaiakIdleSeletores;
            if (!S?.HUNTS?.WAVE_TITLE || !S?.HUNTS?.TP_HUNTS) {
                this._log('Seletores incompletos (precisa HUNTS). VersÃ£o:', S?.VERSION);
                return { success: false, reason: 'no_selectors' };
            }

            window.__baiakIdleTeleporteBusy = true;
            this._log(`Indo para a hunt: ${name}`);

            try {
                await this._openHuntsAndGo(name);
                this._log(`Hunt ativada: ${name}`);
                return { success: true, hunt: name };
            } catch (err) {
                const message = err?.message || String(err);
                this._log('Falha ao ir para a hunt', message);
                return { success: false, reason: 'error', error: message };
            } finally {
                window.__baiakIdleTeleporteBusy = false;
            }
        }

        /**
         * Abre teleportes â Treino online e confirma no #wave-title.
         * @returns {Promise<{success:boolean, reason?:string, error?:string}>}
         */
        static async goToExercise() {
            if (this.busy) {
                return { success: false, reason: 'busy' };
            }

            const S = window.BaiakIdleSeletores;
            if (!S?.HUNTS?.WAVE_TITLE || !S?.HUNTS?.TP_EXERCISE) {
                this._log('Seletores incompletos (precisa TP_EXERCISE). VersÃ£o:', S?.VERSION);
                return { success: false, reason: 'no_selectors' };
            }

            if (typeof S.isInExercise === 'function' ? S.isInExercise() : false) {
                this._log('JÃ¡ estÃ¡ no Treino online');
                return { success: true, reason: 'already_there' };
            }

            window.__baiakIdleTeleporteBusy = true;
            this._log('Indo para Treino online');

            try {
                await this._waitClick(S.HUNTS.WAVE_TITLE, 'WAVE_TITLE');
                await this._sleep(STEP_MS);
                await this._waitClick(S.HUNTS.TP_EXERCISE, 'TP_EXERCISE');
                this._log('Treino online selecionado. Aguardando wave-titleâ¦');
                await this._waitUntilInExercise();
                this._log('Confirmado no DOM: Treino online');
                return { success: true };
            } catch (err) {
                const message = err?.message || String(err);
                this._log('Falha ao ir para o treino', message);
                return { success: false, reason: 'error', error: message };
            } finally {
                window.__baiakIdleTeleporteBusy = false;
            }
        }

        /** Espera o #wave-title indicar Treino online. */
        static async _waitUntilInExercise() {
            const S = window.BaiakIdleSeletores;
            const started = Date.now();
            while (Date.now() - started < CITY_ARRIVE_TIMEOUT_MS) {
                if (typeof S?.isInExercise === 'function' ? S.isInExercise() : false) {
                    return;
                }
                await this._sleep(FIND_POLL_MS);
            }
            throw new Error('Timeout aguardando wave-title = Treino online');
        }

        /**
         * Viaja sÃ³ para a cidade e confirma no DOM (sem abrir hunt).
         * Usado pelo AutoBoss / Solo no Boss antes do prÃ³ximo boss.
         * @returns {Promise<{success:boolean, reason?:string, error?:string}>}
         */
        static async goToCity() {
            if (this.busy) {
                return { success: false, reason: 'busy' };
            }

            const S = window.BaiakIdleSeletores;
            if (!S?.HUNTS?.WAVE_TITLE || !S?.HUNTS?.TP_CITY) {
                this._log('Seletores incompletos (precisa HUNTS/TP_CITY). VersÃ£o:', S?.VERSION);
                return { success: false, reason: 'no_selectors' };
            }

            if (typeof S.isInCity === 'function' ? S.isInCity() : false) {
                this._log('JÃ¡ estÃ¡ na cidade');
                return { success: true, reason: 'already_city' };
            }

            window.__baiakIdleTeleporteBusy = true;
            this._log('Iniciando: sÃ³ Cidade');

            try {
                await this._waitClick(S.HUNTS.WAVE_TITLE, 'WAVE_TITLE');
                await this._sleep(STEP_MS);
                await this._waitClick(S.HUNTS.TP_CITY, 'TP_CITY');
                this._log('Clicou em Cidade. Aguardando wave-title = Cidade...');
                await this._waitUntilInCity();
                await this._sleep(AFTER_CITY_MS);
                this._log('Chegou na cidade');
                return { success: true };
            } catch (err) {
                const message = err?.message || String(err);
                this._log('Falha ao ir para a cidade', message);
                return { success: false, reason: 'error', error: message };
            } finally {
                window.__baiakIdleTeleporteBusy = false;
            }
        }

        /**
         * Viaja para a cidade, confirma no DOM, espera 1s e navega atÃ© a hunt ativa.
         * @param {string} [huntName]
         * @returns {Promise<{success:boolean, hunt?:string, reason?:string, error?:string}>}
         */
        static async goCityThenHunt(huntName) {
            if (this.busy) {
                return { success: false, reason: 'busy' };
            }

            const name = String(huntName || this.getSelectedHuntName() || '').trim();
            if (!name) {
                this._log('Nenhuma hunt ativa selecionada na extensÃ£o');
                return { success: false, reason: 'no_hunt' };
            }

            const S = window.BaiakIdleSeletores;
            if (!S?.HUNTS?.WAVE_TITLE || !S?.HUNTS?.TP_CITY) {
                this._log('Seletores incompletos (precisa HUNTS/TP_CITY). VersÃ£o:', S?.VERSION);
                return { success: false, reason: 'no_selectors' };
            }

            window.__baiakIdleTeleporteBusy = true;
            this._log(`Iniciando: Cidade â (DOM) â ${name}`);

            try {
                await this._waitClick(S.HUNTS.WAVE_TITLE, 'WAVE_TITLE');
                await this._sleep(STEP_MS);
                await this._waitClick(S.HUNTS.TP_CITY, 'TP_CITY');
                this._log('Clicou em Cidade. Aguardando wave-title = Cidade...');
                await this._waitUntilInCity();
                await this._sleep(AFTER_CITY_MS);

                await this._openHuntsAndGo(name);

                this._log(`Hunt ativada: ${name}`);
                return { success: true, hunt: name };
            } catch (err) {
                const message = err?.message || String(err);
                this._log('Falha no teleporte', message);
                return { success: false, reason: 'error', error: message };
            } finally {
                window.__baiakIdleTeleporteBusy = false;
            }
        }
    }

    window.BaiakIdleTeleporte = BaiakIdleTeleporte;
})();


// MÃ³dulo Baiak Idle (MAIN): Member Dead
// - Detecta .member.dead â Cidade (confirma DOM) â hunt ativa
// - start()/stop() controlados pela extensÃ£o
// - Espelho do Pular Boss (mesma lÃ³gica de escape)

(function () {
    const ACTION_COOLDOWN_MS = 20000;
    const STORAGE_KEY_LAST_ACTION = '__baiakIdleMemberDeadLastActionAt';

    class BaiakIdleMemberDeadModule {
        constructor() {
            this._observer = null;
            this._running = false;
            this._busy = false;
        }

        _log(msg, extra) {}

        _sel() {
            return window.BaiakIdleSeletores || null;
        }

        _canActNow() {
            try {
                const raw = sessionStorage.getItem(STORAGE_KEY_LAST_ACTION);
                const last = raw ? parseInt(raw, 10) : 0;
                if (!last) return true;
                return (Date.now() - last) >= ACTION_COOLDOWN_MS;
            } catch (_) {
                return true;
            }
        }

        _markAction() {
            try {
                sessionStorage.setItem(STORAGE_KEY_LAST_ACTION, String(Date.now()));
            } catch (_) {}
        }

        async _runEscape() {
            this._busy = true;
            this._markAction();
            try {
                // AutoBoss em andamento: nÃ£o manda para hunt â o Solo no Boss cuida.
                if (window.__baiakIdleAutoBoss?.isRunning?.()) {
                    this._log('AutoBoss ativo â Member Dead ignora (use Solo no Boss)');
                    return;
                }
                const Teleporte = window.BaiakIdleTeleporte;
                if (!Teleporte?.goCityThenHunt) {
                    this._log('BaiakIdleTeleporte indisponÃ­vel');
                    return;
                }
                const result = await Teleporte.goCityThenHunt();
                if (!result?.success) {
                    this._log('Teleporte nÃ£o concluÃ­do', result);
                }
            } catch (err) {
                this._log('Erro no escape por morte', err);
            } finally {
                this._busy = false;
            }
        }

        _verificarMemberDead() {
            if (!this._running || this._busy) return false;
            if (window.BaiakIdleTeleporte?.busy) return false;
            if (window.__baiakIdleAutoBoss?.isRunning?.()) return false;

            try {
                const S = this._sel();
                if (!S?.MEMBER_DEAD) {
                    this._log('BaiakIdleSeletores.MEMBER_DEAD indisponÃ­vel');
                    return false;
                }

                const memberDead = S.findElement(S.MEMBER_DEAD.MEMBER, 'MEMBER_DEAD');
                if (!memberDead) return false;

                if (!this._canActNow()) {
                    this._log('Member dead detectado, aguardando cooldown...');
                    return true;
                }

                this._log('Member dead detectado! Cidade â hunt ativa...');
                void this._runEscape();
                return true;
            } catch (err) {
                this._log('Erro ao verificar Member Dead', err);
                return false;
            }
        }

        start() {
            if (this._running) {
                this._verificarMemberDead();
                return { success: true, alreadyRunning: true };
            }

            this._running = true;
            this._busy = false;
            this._log('MÃ³dulo iniciado');

            this._verificarMemberDead();

            this._observer = new MutationObserver(() => {
                this._verificarMemberDead();
            });

            const root = document.body || document.documentElement;
            if (root) {
                this._observer.observe(root, {
                    childList: true,
                    subtree: true
                });
            }

            return { success: true };
        }

        stop() {
            try {
                this._observer?.disconnect();
            } catch (_) {}
            this._observer = null;
            this._running = false;
            this._busy = false;
            this._log('MÃ³dulo parado');
            return { success: true };
        }

        isRunning() {
            return !!this._running;
        }
    }

    window.BaiakIdleMemberDeadModule = BaiakIdleMemberDeadModule;

    try {
        const prev = window.__baiakIdleMemberDead;
        const wasRunning = !!prev?.isRunning?.();
        try {
            prev?.stop?.();
        } catch (_) {}
        window.__baiakIdleMemberDead = new BaiakIdleMemberDeadModule();
        if (wasRunning || window.__BAIAKIDLE_AUTO_START_MEMBER_DEAD__) {
            window.__baiakIdleMemberDead.start();
        }
    } catch (err) {
        console.error('[BaiakIdle Member Dead] Falha no bootstrap', err);
    }
})();
