/* TB-WM u=179 e=a07d5b4cfa x=f2e5047b9289 t=1786720283 s=57f7c2abf5831bd3 */
(function(){try{window.__TIBIABOT_WM__={u:179,t:1786720283,x:"f2e5047b9289",s:"57f7c2abf5831bd3"};}catch(e){}})();

/**
 * CatÃ¡logo de hunts Baiak-Idle (criaturas por hunt).
 * MÃ³dulo interno servido por /api/hunts.php (nÃ£o empacotar na extensÃ£o).
 * Fonte: HTML do modal hunt-details do jogo.
 *
 * Imagens de itens: sempre https://baiakidle.com/api/things/object/{id}.png
 * sprite: URL TibiaWiki Special:FilePath
 */
(function (root) {
  const ORIGIN = 'https://baiakidle.com';

  function objectImg(id) {
    return ORIGIN + '/api/things/object/' + Number(id) + '.png';
  }

  function elementImg(name) {
    return ORIGIN + '/jogar/img/elements/' + String(name || '').toLowerCase() + '.png';
  }

  /**
   * @typedef {{ name: string, objectId?: number, image?: string }} HuntDrop
   * @typedef {{ element: string, value: number, kind: 'resistente'|'neutro'|'fraco', icon?: string }} HuntResist
   * @typedef {{
   *   id: string,
   *   name: string,
   *   hp: number,
   *   exp: number,
   *   sprite: string,
   *   resistances: HuntResist[],
   *   damageElements?: Array<string|{ element: string, weight?: number, icon?: string }>,
   *   drops: {
   *     common: HuntDrop[],
   *     uncommon?: HuntDrop[],
   *     semiRare?: HuntDrop[],
   *     rare?: HuntDrop[],
   *     veryRare?: HuntDrop[]
   *   }
   * }} CreatureEntry
   * @typedef {{
   *   id: string,
   *   name: string,
   *   creatures: CreatureEntry[],
   *   damageElements?: Array<string|{ element: string, weight?: number, icon?: string }>
   * }} HuntEntry
   */

  /** @type {HuntEntry[]} */
  const HUNTS = [
    {
      id: "troll_cave",
      name: "Troll Cave",
      creatures: [
        {
          id: "troll",
          name: "Troll",
          hp: 100,
          exp: 20,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Troll.gif",
          damageElements: [{ element: 'physical', weight: 15 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 20, kind: "resistente" },
            { element: "earth", value: -10, kind: "fraco" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: 10, kind: "resistente" },
            { element: "death", value: -10, kind: "fraco" },
          ],
          drops: {
            uncommon: [{ name: "rope", objectId: 3003 }, { name: "hand axe", objectId: 3268 }, { name: "spear", objectId: 3277 }, { name: "studded club", objectId: 3336 }, { name: "leather helmet", objectId: 3355 }, { name: "leather boots", objectId: 3552 }, { name: "meat", objectId: 3577 }],
            semiRare: [{ name: "wooden shield", objectId: 3412 }, { name: "bunch of troll hair", objectId: 9689 }, { name: "heavy old tome", objectId: 23986 }],
            rare: [{ name: "silver amulet", objectId: 3054 }],
          }
        },
        {
          id: "swamp_troll",
          name: "Swamp Troll",
          hp: 110,
          exp: 25,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Swamp_Troll.gif",
          damageElements: [{ element: 'physical', weight: 13 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 15, kind: "resistente" },
            { element: "fire", value: -5, kind: "fraco" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "fish", objectId: 3578 }],
            uncommon: [{ name: "torch", objectId: 2920 }, { name: "mouldy cheese", objectId: 3120 }, { name: "spear", objectId: 3277 }, { name: "leather boots", objectId: 3552 }],
            semiRare: [{ name: "troll green", objectId: 3741 }, { name: "wood", objectId: 5901 }, { name: "swamp grass", objectId: 9686 }, { name: "medicine pouch", objectId: 12517 }],
            rare: [{ name: "fishing rod", objectId: 3483 }],
          }
        },
      ]
    },
    {
      id: "elf",
      name: "Elf",
      creatures: [
        {
          id: "elf",
          name: "Elf",
          hp: 200,
          exp: 42,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Elf.gif",
          damageElements: [{ element: 'physical', weight: 40 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: 20, kind: "resistente" },
            { element: "death", value: -10, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "plum", objectId: 8011 }],
            uncommon: [{ name: "longsword", objectId: 3285 }, { name: "studded helmet", objectId: 3376 }, { name: "studded armor", objectId: 3378 }, { name: "plate shield", objectId: 3410 }, { name: "arrow", objectId: 3447 }, { name: "leather boots", objectId: 3552 }],
            semiRare: [{ name: "elvish talisman", objectId: 9635 }],
            rare: [{ name: "heaven blossom", objectId: 3657 }],
          }
        },
        {
          id: "elf_scout",
          name: "Elf Scout",
          hp: 320,
          exp: 75,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Elf_Scout.gif",
          damageElements: [{ element: 'physical', weight: 110 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: 20, kind: "resistente" },
            { element: "death", value: -10, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "arrow", objectId: 3447 }],
            uncommon: [{ name: "poison arrow", objectId: 3448 }, { name: "grapes", objectId: 3592 }, { name: "elvish talisman", objectId: 9635 }, { name: "elven scouting glass", objectId: 11464 }],
            semiRare: [{ name: "waterskin", objectId: 2901 }, { name: "bow", objectId: 3350 }, { name: "sandals", objectId: 3551 }, { name: "heaven blossom", objectId: 3657 }],
            rare: [{ name: "elvish bow", objectId: 7438 }],
          }
        },
        {
          id: "elf_arcanist",
          name: "Elf Arcanist",
          hp: 440,
          exp: 175,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Elf_Arcanist.gif",
          damageElements: [{ element: 'physical', weight: 160 }, { element: 'energy', weight: 50 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 20, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 50, kind: "resistente" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: -10, kind: "fraco" },
            { element: "death", value: 20, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "scroll", objectId: 347 }, { name: "melon", objectId: 3593 }],
            uncommon: [{ name: "blank rune", objectId: 3147 }, { name: "arrow", objectId: 3447 }, { name: "green tunic", objectId: 3563 }, { name: "bread", objectId: 3600 }, { name: "sling herb", objectId: 3738 }, { name: "elvish talisman", objectId: 9635 }, { name: "elven astral observer", objectId: 11465 }],
            semiRare: [{ name: "candlestick", objectId: 2917 }, { name: "wand of cosmic energy", objectId: 3073 }, { name: "elven amulet", objectId: 3082 }, { name: "inkwell", objectId: 3509 }, { name: "holy orchid", objectId: 5922 }, { name: "strong mana potion", objectId: 237 }, { name: "health potion", objectId: 266 }],
            rare: [{ name: "yellow gem", objectId: 3037 }, { name: "life crystal", objectId: 3061 }, { name: "sandals", objectId: 3551 }, { name: "grave flower", objectId: 3661 }],
          }
        },
      ]
    },
    {
      id: "amazon",
      name: "Amazon",
      creatures: [
        {
          id: "amazon",
          name: "Amazon",
          hp: 220,
          exp: 60,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Amazon.gif",
          damageElements: [{ element: 'physical', weight: 85 }],
          resistances: [
            { element: "physical", value: -5, kind: "fraco" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: -5, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "dagger", objectId: 3267 }, { name: "skull", objectId: 3114 }, { name: "brown bread", objectId: 3602 }, { name: "sabre", objectId: 3273 }],
            uncommon: [{ name: "girlish hair decoration", objectId: 11443 }, { name: "protective charm", objectId: 11444 }],
            semiRare: [{ name: "torch", objectId: 2920 }],
            rare: [{ name: "crystal necklace", objectId: 3008 }, { name: "small ruby", objectId: 3030 }],
          }
        },
        {
          id: "valkyrie",
          name: "Valkyrie",
          hp: 380,
          exp: 85,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Valkyrie.gif",
          damageElements: [{ element: 'physical', weight: 120 }],
          resistances: [
            { element: "physical", value: -10, kind: "fraco" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 10, kind: "resistente" },
            { element: "ice", value: 10, kind: "resistente" },
            { element: "holy", value: 5, kind: "resistente" },
            { element: "death", value: -5, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "spear", objectId: 3277 }, { name: "meat", objectId: 3577 }],
            uncommon: [{ name: "chain armor", objectId: 3358 }, { name: "red apple", objectId: 3585 }, { name: "girlish hair decoration", objectId: 11443 }, { name: "hunting spear", objectId: 3347 }],
            semiRare: [{ name: "protective charm", objectId: 11444 }, { name: "protection amulet", objectId: 3084 }],
            rare: [{ name: "plate armor", objectId: 3357 }, { name: "skull", objectId: 3114 }, { name: "health potion", objectId: 266 }, { name: "double axe", objectId: 3275 }, { name: "small diamond", objectId: 3028 }],
          }
        },
      ]
    },
    {
      id: "minotaur",
      name: "Minotaur",
      creatures: [
        {
          id: "minotaur_archer",
          name: "Minotaur Archer",
          hp: 200,
          exp: 65,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Minotaur_Archer.gif",
          damageElements: [{ element: 'physical', weight: 45 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 20, kind: "resistente" },
            { element: "ice", value: -10, kind: "fraco" },
            { element: "holy", value: 10, kind: "resistente" },
            { element: "death", value: -5, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "bolt", objectId: 3446 }],
            uncommon: [{ name: "meat", objectId: 3577 }, { name: "piercing bolt", objectId: 7363 }, { name: "broken crossbow", objectId: 11451 }, { name: "piece of archer armor", objectId: 11483 }],
            semiRare: [{ name: "minotaur leather", objectId: 5878 }, { name: "minotaur horn", objectId: 11472 }],
            rare: [{ name: "crossbow", objectId: 3349 }, { name: "brass armor", objectId: 3359 }, { name: "scale armor", objectId: 3377 }],
          }
        },
        {
          id: "minotaur",
          name: "Minotaur",
          hp: 200,
          exp: 50,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Minotaur.gif",
          damageElements: [{ element: 'physical', weight: 45 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 20, kind: "resistente" },
            { element: "ice", value: -10, kind: "fraco" },
            { element: "holy", value: 10, kind: "resistente" },
            { element: "death", value: -10, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "plate shield", objectId: 3410 }],
            uncommon: [{ name: "sword", objectId: 3264 }, { name: "mace", objectId: 3286 }, { name: "brass helmet", objectId: 3354 }, { name: "chain armor", objectId: 3358 }, { name: "meat", objectId: 3577 }],
            semiRare: [{ name: "axe", objectId: 3274 }, { name: "minotaur horn", objectId: 11472 }],
            rare: [{ name: "bronze amulet", objectId: 3056 }, { name: "shovel", objectId: 3457 }, { name: "minotaur leather", objectId: 5878 }],
          }
        },
        {
          id: "minotaur_guard",
          name: "Minotaur Guard",
          hp: 370,
          exp: 160,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Minotaur_Guard.gif",
          damageElements: [{ element: 'physical', weight: 100 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 20, kind: "resistente" },
            { element: "ice", value: -10, kind: "fraco" },
            { element: "holy", value: 10, kind: "resistente" },
            { element: "death", value: -10, kind: "fraco" },
          ],
          drops: {
            uncommon: [{ name: "minotaur horn", objectId: 11472 }, { name: "piece of warrior armor", objectId: 11482 }],
            semiRare: [{ name: "chain armor", objectId: 3358 }, { name: "brass armor", objectId: 3359 }, { name: "battle shield", objectId: 3413 }, { name: "minotaur leather", objectId: 5878 }],
            rare: [{ name: "double axe", objectId: 3275 }, { name: "fishing rod", objectId: 3483 }, { name: "minotaur trophy", objectId: 7401 }, { name: "health potion", objectId: 266 }],
          }
        },
        {
          id: "minotaur_mage",
          name: "Minotaur Mage",
          hp: 310,
          exp: 150,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Minotaur_Mage.gif",
          damageElements: [{ element: 'fire', weight: 95 }, { element: 'energy', weight: 45 }, { element: 'physical', weight: 21 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 20, kind: "resistente" },
            { element: "earth", value: 20, kind: "resistente" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: -10, kind: "fraco" },
            { element: "holy", value: 10, kind: "resistente" },
            { element: "death", value: -5, kind: "fraco" },
          ],
          drops: {
            uncommon: [{ name: "leather legs", objectId: 3559 }, { name: "carrot", objectId: 3595 }, { name: "purple robe", objectId: 11473 }],
            semiRare: [{ name: "torch", objectId: 2920 }, { name: "leather helmet", objectId: 3355 }, { name: "minotaur leather", objectId: 5878 }, { name: "taurus mace", objectId: 7425 }, { name: "minotaur horn", objectId: 11472 }],
            rare: [{ name: "wand of cosmic energy", objectId: 3073 }, { name: "mana potion", objectId: 268 }],
          }
        },
      ]
    },
    {
      id: "kongra",
      name: "Kongra",
      creatures: [
        {
          id: "kongra",
          name: "Kongra",
          hp: 680,
          exp: 115,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Kongra.gif",
          damageElements: [{ element: 'physical', weight: 60 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 5, kind: "resistente" },
            { element: "earth", value: 10, kind: "resistente" },
            { element: "fire", value: 20, kind: "resistente" },
            { element: "ice", value: -15, kind: "fraco" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: -5, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "banana", objectId: 3587 }],
            semiRare: [{ name: "kongra's shoulderpad", objectId: 11471 }],
            rare: [{ name: "power ring", objectId: 3050 }, { name: "protection amulet", objectId: 3084 }, { name: "club ring", objectId: 3093 }, { name: "plate armor", objectId: 3357 }, { name: "ape fur", objectId: 5883 }, { name: "health potion", objectId: 266 }],
          }
        },
        {
          id: "merlkin",
          name: "Merlkin",
          hp: 470,
          exp: 145,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Merlkin.gif",
          damageElements: [{ element: 'fire', weight: 90 }, { element: 'energy', weight: 45 }, { element: 'physical', weight: 30 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 10, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 20, kind: "resistente" },
            { element: "ice", value: -15, kind: "fraco" },
            { element: "holy", value: 10, kind: "resistente" },
            { element: "death", value: -5, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "banana", objectId: 3587 }],
            semiRare: [{ name: "magic light wand", objectId: 3046 }, { name: "wand of decay", objectId: 3072 }, { name: "orange", objectId: 3586 }, { name: "ape fur", objectId: 5883 }, { name: "banana sash", objectId: 11511 }],
            rare: [{ name: "small amethyst", objectId: 3033 }, { name: "banana staff", objectId: 3348 }, { name: "mana potion", objectId: 268 }],
          }
        },
        {
          id: "sibang",
          name: "Sibang",
          hp: 450,
          exp: 105,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Sibang.gif",
          damageElements: [{ element: 'physical', weight: 98 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 25, kind: "resistente" },
            { element: "ice", value: -15, kind: "fraco" },
            { element: "holy", value: 10, kind: "resistente" },
            { element: "death", value: -5, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "small stone", objectId: 1781 }, { name: "banana", objectId: 3587 }],
            uncommon: [{ name: "orange", objectId: 3586 }, { name: "banana sash", objectId: 11511 }],
            semiRare: [{ name: "coconut", objectId: 3589 }, { name: "melon", objectId: 3593 }, { name: "ape fur", objectId: 5883 }],
          }
        },
      ]
    },
    {
      id: "cyclopolis",
      name: "Cyclopolis",
      creatures: [
        {
          id: "cyclops",
          name: "Cyclops",
          hp: 520,
          exp: 150,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Cyclops.gif",
          damageElements: [{ element: 'physical', weight: 105 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 25, kind: "resistente" },
            { element: "earth", value: -10, kind: "fraco" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: 20, kind: "resistente" },
            { element: "death", value: -10, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "meat", objectId: 3577 }],
            uncommon: [{ name: "short sword", objectId: 3294 }],
            semiRare: [{ name: "halberd", objectId: 3269 }, { name: "plate shield", objectId: 3410 }, { name: "battle shield", objectId: 3413 }, { name: "cyclops toe", objectId: 9657 }, { name: "heavy old tome", objectId: 23986 }],
            rare: [{ name: "wolf tooth chain", objectId: 3012 }, { name: "club ring", objectId: 3093 }, { name: "dark helmet", objectId: 3384 }, { name: "cyclops trophy", objectId: 7398 }, { name: "health potion", objectId: 266 }],
          }
        },
      ]
    },
    {
      id: "corym_skirmisher",
      name: "Corym Skirmisher",
      creatures: [
        {
          id: "corym_vanguard",
          name: "Corym Vanguard",
          hp: 1400,
          exp: 490,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Corym_Vanguard.gif",
          damageElements: [{ element: 'physical', weight: 240 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 20, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 10, kind: "resistente" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "cheese", objectId: 3607 }],
            uncommon: [{ name: "bola", objectId: 17809 }, { name: "ratana", objectId: 17812 }, { name: "life preserver", objectId: 17813 }, { name: "cheese cutter", objectId: 17817 }, { name: "earflap", objectId: 17819 }, { name: "soft cheese", objectId: 17820 }, { name: "rat cheese", objectId: 17821 }],
            semiRare: [{ name: "spike shield", objectId: 17810 }, { name: "cheesy figurine", objectId: 17818 }, { name: "leather harness", objectId: 17846 }, { name: "spiky club", objectId: 17859 }],
            rare: [{ name: "rat god doll", objectId: 17825 }],
          }
        },
        {
          id: "corym_charlatan",
          name: "Corym Charlatan",
          hp: 500,
          exp: 150,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Corym_Charlatan.gif",
          damageElements: [{ element: 'physical', weight: 100 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 25, kind: "resistente" },
            { element: "earth", value: 25, kind: "resistente" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: -5, kind: "fraco" },
            { element: "death", value: 15, kind: "resistente" },
          ],
          drops: {
            uncommon: [{ name: "cheese", objectId: 3607 }, { name: "bola", objectId: 17809 }, { name: "cheese cutter", objectId: 17817 }, { name: "earflap", objectId: 17819 }, { name: "soft cheese", objectId: 17820 }, { name: "rat cheese", objectId: 17821 }],
            rare: [{ name: "spike shield", objectId: 17810 }, { name: "ratana", objectId: 17812 }, { name: "life preserver", objectId: 17813 }, { name: "cheesy figurine", objectId: 17818 }, { name: "leather harness", objectId: 17846 }],
          }
        },
        {
          id: "corym_skirmisher",
          name: "Corym Skirmisher",
          hp: 900,
          exp: 260,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Corym_Skirmisher.gif",
          damageElements: [{ element: 'physical', weight: 240 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 15, kind: "resistente" },
            { element: "earth", value: 25, kind: "resistente" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: -5, kind: "fraco" },
            { element: "death", value: 20, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "cheese", objectId: 3607 }],
            uncommon: [{ name: "bola", objectId: 17809 }, { name: "cheese cutter", objectId: 17817 }, { name: "earflap", objectId: 17819 }, { name: "soft cheese", objectId: 17820 }, { name: "rat cheese", objectId: 17821 }],
            semiRare: [{ name: "ratana", objectId: 17812 }, { name: "life preserver", objectId: 17813 }],
            rare: [{ name: "spike shield", objectId: 17810 }, { name: "cheesy figurine", objectId: 17818 }, { name: "rat god doll", objectId: 17825 }, { name: "leather harness", objectId: 17846 }],
          }
        },
      ]
    },
    {
      id: "stone_refiner",
      name: "Stone Refiner",
      creatures: [
        {
          id: "stonerefiner",
          name: "Stonerefiner",
          hp: 1600,
          exp: 500,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Stonerefiner.gif",
          damageElements: [{ element: 'physical', weight: 295 }, { element: 'earth', weight: 70 }],
          resistances: [
            { element: "physical", value: -20, kind: "fraco" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 20, kind: "resistente" },
            { element: "fire", value: -10, kind: "fraco" },
            { element: "ice", value: -20, kind: "fraco" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "rare earth", objectId: 27301 }, { name: "coal", objectId: 12600 }, { name: "glob of acid slime", objectId: 9054 }, { name: "stonerefiner's skull", objectId: 27606 }, { name: "poisonous slime", objectId: 9640 }],
            uncommon: [{ name: "half-digested stones", objectId: 27369 }],
          }
        },
      ]
    },
    {
      id: "giant_spider",
      name: "Giant Spider",
      creatures: [
        {
          id: "giant_spider",
          name: "Giant Spider",
          hp: 2600,
          exp: 900,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Giant_Spider.gif",
          damageElements: [{ element: 'physical', weight: 300 }, { element: 'earth', weight: 70 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 20, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: -10, kind: "fraco" },
            { element: "ice", value: 20, kind: "resistente" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            uncommon: [{ name: "two handed sword", objectId: 3265 }, { name: "plate armor", objectId: 3357 }, { name: "poison arrow", objectId: 3448 }, { name: "plate legs", objectId: 3557 }],
            semiRare: [{ name: "steel helmet", objectId: 3351 }, { name: "spider silk", objectId: 5879 }, { name: "strong health potion", objectId: 236 }],
            rare: [{ name: "time ring", objectId: 3053 }, { name: "platinum amulet", objectId: 3055 }, { name: "knight armor", objectId: 3370 }, { name: "knight legs", objectId: 3371 }, { name: "lightning headband", objectId: 828 }],
          }
        },
        {
          id: "tarantula",
          name: "Tarantula",
          hp: 450,
          exp: 120,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Tarantula.gif",
          damageElements: [{ element: 'physical', weight: 90 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 10, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: -15, kind: "fraco" },
            { element: "ice", value: -10, kind: "fraco" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            uncommon: [{ name: "tarantula egg", objectId: 10281 }, { name: "monk robe", objectId: 50258 }],
            semiRare: [{ name: "brass legs", objectId: 3372 }, { name: "plate shield", objectId: 3410 }, { name: "spider fangs", objectId: 8031 }],
            rare: [{ name: "time ring", objectId: 3053 }, { name: "steel helmet", objectId: 3351 }],
          }
        },
        {
          id: "spider",
          name: "Spider",
          hp: 40,
          exp: 12,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Spider.gif",
          damageElements: [{ element: 'physical', weight: 9 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: -20, kind: "fraco" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            rare: [{ name: "spider fangs", objectId: 8031 }],
          }
        },
      ]
    },
    {
      id: "crawler",
      name: "Crawler",
      creatures: [
        {
          id: "insectoid_worker",
          name: "Insectoid Worker",
          hp: 1900,
          exp: 650,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Insectoid_Worker.gif",
          damageElements: [{ element: 'earth', weight: 180 }, { element: 'physical', weight: 120 }],
          resistances: [
            { element: "physical", value: 5, kind: "resistente" },
            { element: "energy", value: -5, kind: "fraco" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: -10, kind: "fraco" },
            { element: "ice", value: -10, kind: "fraco" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            uncommon: [{ name: "health potion", objectId: 266 }, { name: "compound eye", objectId: 14083 }, { name: "dung ball", objectId: 14225 }],
            semiRare: [{ name: "small emerald", objectId: 3032 }],
            rare: [{ name: "epee", objectId: 3326 }],
          }
        },
        {
          id: "crawler",
          name: "Crawler",
          hp: 2900,
          exp: 1000,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Crawler.gif",
          damageElements: [{ element: 'earth', weight: 180 }, { element: 'physical', weight: 120 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: -8, kind: "fraco" },
            { element: "ice", value: -7, kind: "fraco" },
            { element: "holy", value: -5, kind: "fraco" },
            { element: "death", value: 5, kind: "resistente" },
          ],
          drops: {
            uncommon: [{ name: "great mana potion", objectId: 238 }, { name: "great health potion", objectId: 239 }, { name: "small topaz", objectId: 9057 }, { name: "crawler head plating", objectId: 14079 }, { name: "compound eye", objectId: 14083 }],
            semiRare: [{ name: "war hammer", objectId: 3279 }],
            rare: [{ name: "yellow gem", objectId: 3037 }, { name: "springsprout rod", objectId: 8084 }, { name: "grasshopper legs", objectId: 14087 }],
          }
        },
        {
          id: "swarmer",
          name: "Swarmer",
          hp: 920,
          exp: 350,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Swarmer.gif",
          damageElements: [{ element: 'physical', weight: 100 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 75, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: -8, kind: "fraco" },
            { element: "ice", value: -3, kind: "fraco" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            uncommon: [{ name: "swarmer antenna", objectId: 14076 }, { name: "compound eye", objectId: 14083 }],
            rare: [{ name: "small emerald", objectId: 3032 }, { name: "epee", objectId: 3326 }],
          }
        },
      ]
    },
    {
      id: "glooth_bandit",
      name: "Glooth Bandit",
      creatures: [
        {
          id: "glooth_brigand",
          name: "Glooth Brigand",
          hp: 4800,
          exp: 1900,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Glooth_Brigand.gif",
          damageElements: [{ element: 'physical', weight: 505 }],
          resistances: [
            { element: "physical", value: 10, kind: "resistente" },
            { element: "energy", value: 25, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 10, kind: "resistente" },
            { element: "holy", value: -5, kind: "fraco" },
            { element: "death", value: 15, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "glooth bag", objectId: 21203 }, { name: "tainted glooth capsule", objectId: 21816 }, { name: "great mana potion", objectId: 238 }],
            semiRare: [{ name: "glooth sandwich", objectId: 21143 }, { name: "glooth capsule", objectId: 21814 }, { name: "great spirit potion", objectId: 7642 }, { name: "glooth steak", objectId: 21146 }, { name: "ultimate health potion", objectId: 7643 }, { name: "glooth club", objectId: 21178 }, { name: "glooth amulet", objectId: 21183 }, { name: "mercenary sword", objectId: 7386 }, { name: "terra mantle", objectId: 811 }, { name: "giant shimmering pearl", objectId: 282 }, { name: "terra amulet", objectId: 814 }, { name: "butcher's axe", objectId: 7412 }, { name: "green gem", objectId: 3038 }],
            rare: [{ name: "terra boots", objectId: 813 }, { name: "dreaded cleaver", objectId: 7419 }, { name: "heat core", objectId: 21167 }, { name: "glooth spear", objectId: 21158 }, { name: "rubber cap", objectId: 21165 }, { name: "terra hood", objectId: 830 }],
          }
        },
        {
          id: "glooth_bandit",
          name: "Glooth Bandit",
          hp: 5200,
          exp: 2000,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Glooth_Bandit.gif",
          damageElements: [{ element: 'physical', weight: 505 }],
          resistances: [
            { element: "physical", value: 15, kind: "resistente" },
            { element: "energy", value: 20, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: -5, kind: "fraco" },
            { element: "ice", value: 10, kind: "resistente" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 20, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "tainted glooth capsule", objectId: 21816 }, { name: "great mana potion", objectId: 238 }, { name: "glooth bag", objectId: 21203 }, { name: "small topaz", objectId: 9057 }, { name: "great spirit potion", objectId: 7642 }],
            semiRare: [{ name: "great health potion", objectId: 239 }, { name: "glooth sandwich", objectId: 21143 }, { name: "glooth capsule", objectId: 21814 }, { name: "glooth blade", objectId: 21179 }, { name: "glooth club", objectId: 21178 }, { name: "rubber cap", objectId: 21165 }, { name: "small emerald", objectId: 3032 }, { name: "glooth spear", objectId: 21158 }, { name: "ultimate health potion", objectId: 7643 }, { name: "glooth steak", objectId: 21146 }, { name: "skull staff", objectId: 3324 }, { name: "glooth cape", objectId: 21164 }, { name: "green gem", objectId: 3038 }, { name: "glooth axe", objectId: 21180 }, { name: "war axe", objectId: 3342 }, { name: "terra mantle", objectId: 811 }, { name: "beastslayer axe", objectId: 3344 }],
            rare: [{ name: "glooth amulet", objectId: 21183 }, { name: "terra boots", objectId: 813 }, { name: "terra legs", objectId: 812 }],
          }
        },
      ]
    },
    {
      id: "hero",
      name: "Hero",
      creatures: [
        {
          id: "hero",
          name: "Hero",
          hp: 2800,
          exp: 1200,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Hero.gif",
          damageElements: [{ element: 'physical', weight: 240 }],
          resistances: [
            { element: "physical", value: 10, kind: "resistente" },
            { element: "energy", value: 40, kind: "resistente" },
            { element: "earth", value: 50, kind: "resistente" },
            { element: "fire", value: 30, kind: "resistente" },
            { element: "ice", value: 10, kind: "resistente" },
            { element: "holy", value: 50, kind: "resistente" },
            { element: "death", value: -20, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "scroll", objectId: 347 }, { name: "arrow", objectId: 3447 }, { name: "red rose", objectId: 3658 }],
            uncommon: [{ name: "bow", objectId: 3350 }, { name: "green tunic", objectId: 3563 }, { name: "meat", objectId: 3577 }, { name: "grapes", objectId: 3592 }, { name: "sniper arrow", objectId: 7364 }, { name: "scroll of heroic deeds", objectId: 11510 }],
            semiRare: [{ name: "lyre", objectId: 2949 }, { name: "rope", objectId: 3003 }, { name: "wedding ring", objectId: 3004 }, { name: "two handed sword", objectId: 3265 }, { name: "scarf", objectId: 3572 }, { name: "red piece of cloth", objectId: 5911 }],
            rare: [{ name: "piggy bank", objectId: 2995 }, { name: "might ring", objectId: 3048 }, { name: "war hammer", objectId: 3279 }, { name: "fire sword", objectId: 3280 }, { name: "crown armor", objectId: 3381 }, { name: "crown legs", objectId: 3382 }, { name: "crown helmet", objectId: 3385 }, { name: "crown shield", objectId: 3419 }, { name: "great health potion", objectId: 239 }, { name: "small notebook", objectId: 11450 }],
          }
        },
        {
          id: "renegade_knight",
          name: "Renegade Knight",
          hp: 2900,
          exp: 1200,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Renegade_Knight.gif",
          damageElements: [{ element: 'physical', weight: 370 }],
          resistances: [
            { element: "physical", value: 15, kind: "resistente" },
            { element: "energy", value: 35, kind: "resistente" },
            { element: "earth", value: 20, kind: "resistente" },
            { element: "fire", value: 20, kind: "resistente" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: 50, kind: "resistente" },
            { element: "death", value: -10, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "arrow", objectId: 3447 }],
            semiRare: [{ name: "grapes", objectId: 3592 }, { name: "great health potion", objectId: 239 }, { name: "meat", objectId: 3577 }, { name: "sniper arrow", objectId: 7364 }, { name: "halberd", objectId: 3269 }, { name: "rope", objectId: 3003 }],
            rare: [{ name: "crown armor", objectId: 3381 }, { name: "crown helmet", objectId: 3385 }, { name: "crown shield", objectId: 3419 }, { name: "crown legs", objectId: 3382 }, { name: "fire sword", objectId: 3280 }, { name: "red rose", objectId: 3658 }, { name: "scroll", objectId: 347 }, { name: "scroll of heroic deeds", objectId: 11510 }, { name: "small notebook", objectId: 11450 }, { name: "wedding ring", objectId: 3004 }],
          }
        },
        {
          id: "vicious_squire",
          name: "Vicious Squire",
          hp: 2000,
          exp: 900,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Vicious_Squire.gif",
          damageElements: [{ element: 'physical', weight: 340 }],
          resistances: [
            { element: "physical", value: 10, kind: "resistente" },
            { element: "energy", value: 40, kind: "resistente" },
            { element: "earth", value: 50, kind: "resistente" },
            { element: "fire", value: 30, kind: "resistente" },
            { element: "ice", value: 10, kind: "resistente" },
            { element: "holy", value: 50, kind: "resistente" },
            { element: "death", value: -20, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "bolt", objectId: 3446 }],
            uncommon: [{ name: "grapes", objectId: 3592 }, { name: "great health potion", objectId: 239 }, { name: "meat", objectId: 3577 }],
            semiRare: [{ name: "rope", objectId: 3003 }, { name: "scarf", objectId: 3572 }],
            rare: [{ name: "crossbow", objectId: 3349 }, { name: "green tunic", objectId: 3563 }, { name: "might ring", objectId: 3048 }, { name: "scroll", objectId: 347 }, { name: "small diamond", objectId: 3028 }, { name: "war hammer", objectId: 3279 }, { name: "halberd", objectId: 3269 }, { name: "guardian shield", objectId: 3415 }, { name: "knight legs", objectId: 3371 }, { name: "warrior helmet", objectId: 3369 }],
          }
        },
      ]
    },
    {
      id: "cult",
      name: "Cult",
      creatures: [
        {
          id: "cult_believer",
          name: "Cult Believer",
          hp: 1950,
          exp: 850,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Cult_Believer.gif",
          damageElements: [{ element: 'physical', weight: 200 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 10, kind: "resistente" },
            { element: "earth", value: 10, kind: "resistente" },
            { element: "fire", value: 10, kind: "resistente" },
            { element: "ice", value: 10, kind: "resistente" },
            { element: "holy", value: 10, kind: "resistente" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "bolt", objectId: 3446 }],
            uncommon: [{ name: "grapes", objectId: 3592 }, { name: "great health potion", objectId: 239 }, { name: "meat", objectId: 3577 }],
            semiRare: [{ name: "rope", objectId: 3003 }, { name: "scarf", objectId: 3572 }],
            rare: [{ name: "crossbow", objectId: 3349 }, { name: "green tunic", objectId: 3563 }, { name: "might ring", objectId: 3048 }, { name: "scroll", objectId: 347 }, { name: "small diamond", objectId: 3028 }, { name: "war hammer", objectId: 3279 }, { name: "halberd", objectId: 3269 }, { name: "guardian shield", objectId: 3415 }, { name: "knight legs", objectId: 3371 }, { name: "warrior helmet", objectId: 3369 }],
          }
        },
        {
          id: "cult_enforcer",
          name: "Cult Enforcer",
          hp: 2300,
          exp: 1000,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Cult_Enforcer.gif",
          damageElements: [{ element: 'physical', weight: 350 }],
          resistances: [
            { element: "physical", value: 10, kind: "resistente" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "bolt", objectId: 3446 }],
            uncommon: [{ name: "grapes", objectId: 3592 }, { name: "great health potion", objectId: 239 }, { name: "meat", objectId: 3577 }],
            semiRare: [{ name: "rope", objectId: 3003 }, { name: "scarf", objectId: 3572 }],
            rare: [{ name: "crossbow", objectId: 3349 }, { name: "green tunic", objectId: 3563 }, { name: "might ring", objectId: 3048 }, { name: "scroll", objectId: 347 }, { name: "small diamond", objectId: 3028 }, { name: "war hammer", objectId: 3279 }, { name: "halberd", objectId: 3269 }, { name: "guardian shield", objectId: 3415 }, { name: "knight legs", objectId: 3371 }, { name: "warrior helmet", objectId: 3369 }],
          }
        },
        {
          id: "vile_grandmaster",
          name: "Vile Grandmaster",
          hp: 3400,
          exp: 1500,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Vile_Grandmaster.gif",
          damageElements: [{ element: 'physical', weight: 610 }],
          resistances: [
            { element: "physical", value: 20, kind: "resistente" },
            { element: "energy", value: 25, kind: "resistente" },
            { element: "earth", value: 25, kind: "resistente" },
            { element: "fire", value: 25, kind: "resistente" },
            { element: "ice", value: 10, kind: "resistente" },
            { element: "holy", value: 50, kind: "resistente" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            semiRare: [{ name: "sniper arrow", objectId: 7364 }, { name: "grapes", objectId: 3592 }, { name: "meat", objectId: 3577 }, { name: "great health potion", objectId: 239 }, { name: "halberd", objectId: 3269 }, { name: "rope", objectId: 3003 }],
            rare: [{ name: "red rose", objectId: 3658 }, { name: "scroll of heroic deeds", objectId: 11510 }, { name: "small notebook", objectId: 11450 }, { name: "small ruby", objectId: 3030 }, { name: "small sapphire", objectId: 3029 }, { name: "wedding ring", objectId: 3004 }, { name: "red piece of cloth", objectId: 5911 }, { name: "war hammer", objectId: 3279 }, { name: "crown armor", objectId: 3381 }, { name: "fire sword", objectId: 3280 }, { name: "crown helmet", objectId: 3385 }, { name: "crown shield", objectId: 3419 }, { name: "crown legs", objectId: 3382 }, { name: "platinum amulet", objectId: 3055 }],
          }
        },
      ]
    },
    {
      id: "dragon_lair",
      name: "Dragon Lair",
      creatures: [
        {
          id: "dragon",
          name: "Dragon",
          hp: 2000,
          exp: 700,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Dragon.gif",
          damageElements: [{ element: 'fire', weight: 310 }, { element: 'physical', weight: 120 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 20, kind: "resistente" },
            { element: "earth", value: 80, kind: "resistente" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: -10, kind: "fraco" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "dragon ham", objectId: 3583 }],
            uncommon: [{ name: "steel shield", objectId: 3409 }, { name: "dragon's tail", objectId: 11457 }, { name: "crossbow", objectId: 3349 }, { name: "burst arrow", objectId: 3449 }],
            semiRare: [{ name: "longsword", objectId: 3285 }, { name: "steel helmet", objectId: 3351 }, { name: "broadsword", objectId: 3301 }, { name: "plate legs", objectId: 3557 }, { name: "double axe", objectId: 3275 }, { name: "strong health potion", objectId: 236 }, { name: "green dragon leather", objectId: 5877 }, { name: "green dragon scale", objectId: 5920 }],
            rare: [{ name: "wand of inferno", objectId: 3071 }, { name: "small diamond", objectId: 3028 }, { name: "serpent sword", objectId: 3297 }, { name: "dragon hammer", objectId: 3322 }, { name: "dragonbone staff", objectId: 7436 }, { name: "life crystal", objectId: 3061 }, { name: "dragon shield", objectId: 3416 }],
          }
        },
        {
          id: "dragon_lord",
          name: "Dragon Lord",
          hp: 3800,
          exp: 2100,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Dragon_Lord.gif",
          damageElements: [{ element: 'fire', weight: 430 }, { element: 'physical', weight: 230 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 20, kind: "resistente" },
            { element: "earth", value: 80, kind: "resistente" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: -10, kind: "fraco" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "dragon ham", objectId: 3583 }],
            uncommon: [{ name: "green mushroom", objectId: 3732 }, { name: "book", objectId: 401 }, { name: "royal spear", objectId: 7378 }, { name: "power bolt", objectId: 3450 }, { name: "small sapphire", objectId: 3029 }],
            semiRare: [{ name: "energy ring", objectId: 3051 }, { name: "golden mug", objectId: 2903 }, { name: "red dragon scale", objectId: 5882 }, { name: "red dragon leather", objectId: 5948 }],
            rare: [{ name: "strong health potion", objectId: 236 }, { name: "life crystal", objectId: 3061 }, { name: "strange helmet", objectId: 3373 }, { name: "tower shield", objectId: 3428 }, { name: "fire sword", objectId: 3280 }, { name: "royal helmet", objectId: 3392 }, { name: "dragon slayer", objectId: 7402 }, { name: "dragon lord trophy", objectId: 7399 }, { name: "dragon scale mail", objectId: 3386 }],
          }
        },
      ]
    },
    {
      id: "werebadge",
      name: "Werebadge",
      creatures: [
        {
          id: "werewolf",
          name: "Werewolf",
          hp: 3910,
          exp: 1900,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Werewolf.gif",
          damageElements: [{ element: 'physical', weight: 350 }, { element: 'death', weight: 165 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 15, kind: "resistente" },
            { element: "earth", value: 75, kind: "resistente" },
            { element: "fire", value: -5, kind: "fraco" },
            { element: "ice", value: -5, kind: "fraco" },
            { element: "holy", value: -5, kind: "fraco" },
            { element: "death", value: 55, kind: "resistente" },
          ],
          drops: {
            uncommon: [{ name: "plate shield", objectId: 3410 }, { name: "brown mushroom", objectId: 3725 }, { name: "wolf paw", objectId: 5897 }, { name: "strong health potion", objectId: 236 }, { name: "werewolf fur", objectId: 10317 }],
            semiRare: [{ name: "stone skin amulet", objectId: 3081 }, { name: "halberd", objectId: 3269 }, { name: "troll green", objectId: 3741 }, { name: "berserk potion", objectId: 7439 }, { name: "ultimate health potion", objectId: 7643 }],
            rare: [{ name: "platinum amulet", objectId: 3055 }, { name: "epee", objectId: 3326 }, { name: "relic sword", objectId: 7383 }, { name: "dreaded cleaver", objectId: 7419 }, { name: "bonebreaker", objectId: 7428 }],
          }
        },
        {
          id: "werefox",
          name: "Werefox",
          hp: 3000,
          exp: 1600,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Werefox.gif",
          damageElements: [{ element: "physical", weight: 1 }, { element: "death", weight: 1 }],
          resistances: [
            { element: "physical", value: 5, kind: "resistente" },
            { element: "energy", value: 10, kind: "resistente" },
            { element: "earth", value: 40, kind: "resistente" },
            { element: "fire", value: -10, kind: "fraco" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: -10, kind: "fraco" },
            { element: "death", value: 40, kind: "resistente" },
          ],
          drops: {
            semiRare: [{ name: "platinum coin", objectId: 3035 }, { name: "fox paw", objectId: 27462 }, { name: "werefox tail", objectId: 27463 }, { name: "strong mana potion", objectId: 237 }, { name: "great mana potion", objectId: 238 }, { name: "mana potion", objectId: 268 }, { name: "small enchanted emerald", objectId: 677 }, { name: "emerald bangle", objectId: 3010 }],
            rare: [{ name: "moonlight rod", objectId: 3070 }, { name: "troll green", objectId: 3741 }, { name: "assassin star", objectId: 7368 }, { name: "platinum amulet", objectId: 3055 }, { name: "werewolf amulet", objectId: 22060 }],
          }
        },
        {
          id: "wereboar",
          name: "Wereboar",
          hp: 4400,
          exp: 2000,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Wereboar.gif",
          damageElements: [{ element: 'physical', weight: 300 }, { element: 'death', weight: 250 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 15, kind: "resistente" },
            { element: "earth", value: 50, kind: "resistente" },
            { element: "fire", value: -5, kind: "fraco" },
            { element: "ice", value: 5, kind: "resistente" },
            { element: "holy", value: -5, kind: "fraco" },
            { element: "death", value: 50, kind: "resistente" },
          ],
          drops: {
          }
        },
        {
          id: "werebear",
          name: "Werebear",
          hp: 4800,
          exp: 2100,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Werebear.gif",
          damageElements: [{ element: 'physical', weight: 400 }, { element: 'death', weight: 250 }],
          resistances: [
            { element: "physical", value: 5, kind: "resistente" },
            { element: "energy", value: 15, kind: "resistente" },
            { element: "earth", value: 50, kind: "resistente" },
            { element: "fire", value: -5, kind: "fraco" },
            { element: "ice", value: 10, kind: "resistente" },
            { element: "holy", value: -5, kind: "fraco" },
            { element: "death", value: 45, kind: "resistente" },
          ],
          drops: {
          }
        },
        {
          id: "werebadger",
          name: "Werebadger",
          hp: 3400,
          exp: 1600,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Werebadger.gif",
          damageElements: [{ element: 'death', weight: 330 }, { element: 'physical', weight: 170 }],
          resistances: [
            { element: "physical", value: 5, kind: "resistente" },
            { element: "energy", value: 10, kind: "resistente" },
            { element: "earth", value: 50, kind: "resistente" },
            { element: "fire", value: -5, kind: "fraco" },
            { element: "ice", value: -5, kind: "fraco" },
            { element: "holy", value: -5, kind: "fraco" },
            { element: "death", value: 40, kind: "resistente" },
          ],
          drops: {
          }
        },
      ]
    },
    {
      id: "hydra",
      name: "Hydra",
      creatures: [
        {
          id: "bog_raider",
          name: "Bog Raider",
          hp: 2600,
          exp: 800,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Bog_Raider.gif",
          damageElements: [{ element: 'ice', weight: 405 }, { element: 'earth', weight: 320 }, { element: 'physical', weight: 270 }],
          resistances: [
            { element: "physical", value: -5, kind: "fraco" },
            { element: "energy", value: -10, kind: "fraco" },
            { element: "earth", value: 30, kind: "resistente" },
            { element: "fire", value: 85, kind: "resistente" },
            { element: "ice", value: -5, kind: "fraco" },
            { element: "holy", value: -5, kind: "fraco" },
            { element: "death", value: 5, kind: "resistente" },
          ],
          drops: {
            uncommon: [{ name: "boggy dreads", objectId: 9667 }],
            semiRare: [{ name: "great health potion", objectId: 239 }, { name: "great spirit potion", objectId: 7642 }, { name: "springsprout rod", objectId: 8084 }],
            rare: [{ name: "plate legs", objectId: 3557 }, { name: "ultimate health potion", objectId: 7643 }, { name: "belted cape", objectId: 8044 }, { name: "paladin armor", objectId: 8063 }],
          }
        },
        {
          id: "hydra",
          name: "Hydra",
          hp: 4700,
          exp: 2100,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Hydra.gif",
          damageElements: [{ element: 'ice', weight: 405 }, { element: 'earth', weight: 320 }, { element: 'physical', weight: 270 }],
          resistances: [
            { element: "physical", value: -5, kind: "fraco" },
            { element: "energy", value: -10, kind: "fraco" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 50, kind: "resistente" },
            { element: "holy", value: 30, kind: "resistente" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "ham", objectId: 3582 }, { name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "hydra head", objectId: 10282 }, { name: "cucumber", objectId: 8014 }],
            semiRare: [{ name: "small sapphire", objectId: 3029 }, { name: "warrior helmet", objectId: 3369 }, { name: "knight armor", objectId: 3370 }],
            rare: [{ name: "life crystal", objectId: 3061 }, { name: "ring of healing", objectId: 3098 }, { name: "hydra egg", objectId: 4839 }, { name: "strong mana potion", objectId: 237 }, { name: "stone skin amulet", objectId: 3081 }, { name: "boots of haste", objectId: 3079 }, { name: "medusa shield", objectId: 3436 }, { name: "royal helmet", objectId: 3392 }],
          }
        },
      ]
    },
    {
      id: "behemoth",
      name: "Behemoth",
      creatures: [
        {
          id: "glooth_anemone",
          name: "Glooth Anemone",
          hp: 4800,
          exp: 1755,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Glooth_Anemone.gif",
          damageElements: [{ element: 'physical', weight: 655 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 10, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: -5, kind: "fraco" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 35, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "strong health potion", objectId: 236 }, { name: "strong mana potion", objectId: 237 }],
            semiRare: [{ name: "bowl of glooth soup", objectId: 21144 }, { name: "slimy leaf tentacle", objectId: 21197 }, { name: "green mushroom", objectId: 3732 }, { name: "small topaz", objectId: 9057 }, { name: "small emerald", objectId: 3032 }, { name: "small ruby", objectId: 3030 }],
            rare: [{ name: "glooth amulet", objectId: 21183 }, { name: "ultimate health potion", objectId: 7643 }, { name: "glooth cape", objectId: 21164 }, { name: "glooth whip", objectId: 21172 }, { name: "glooth blade", objectId: 21179 }, { name: "glooth club", objectId: 21178 }, { name: "glooth axe", objectId: 21180 }, { name: "glooth spear", objectId: 21158 }],
          }
        },
        {
          id: "behemoth",
          name: "Behemoth",
          hp: 8000,
          exp: 2500,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Behemoth.gif",
          damageElements: [{ element: 'physical', weight: 655 }],
          resistances: [
            { element: "physical", value: 10, kind: "resistente" },
            { element: "energy", value: 10, kind: "resistente" },
            { element: "earth", value: 80, kind: "resistente" },
            { element: "fire", value: 30, kind: "resistente" },
            { element: "ice", value: -10, kind: "fraco" },
            { element: "holy", value: 30, kind: "resistente" },
            { element: "death", value: -5, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "meat", objectId: 3577 }],
            uncommon: [{ name: "small amethyst", objectId: 3033 }, { name: "two handed sword", objectId: 3265 }, { name: "double axe", objectId: 3275 }, { name: "assassin star", objectId: 7368 }, { name: "great health potion", objectId: 239 }, { name: "battle stone", objectId: 11447 }],
            semiRare: [{ name: "crystal necklace", objectId: 3008 }, { name: "giant sword", objectId: 3281 }, { name: "plate armor", objectId: 3357 }, { name: "dark armor", objectId: 3383 }, { name: "perfect behemoth fang", objectId: 5893 }],
            rare: [{ name: "amphora", objectId: 2893 }, { name: "strange symbol", objectId: 3058 }, { name: "big bone", objectId: 3116 }, { name: "crowbar", objectId: 3304 }, { name: "war axe", objectId: 3342 }, { name: "pick", objectId: 3456 }, { name: "steel boots", objectId: 3554 }, { name: "behemoth claw", objectId: 5930 }, { name: "behemoth trophy", objectId: 2675 }, { name: "titan axe", objectId: 7413 }],
          }
        },
        {
          id: "drillworm",
          name: "Drillworm",
          hp: 3000,
          exp: 1200,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Drillworm.gif",
          damageElements: [{ element: 'earth', weight: 450 }, { element: 'physical', weight: 300 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 15, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: -5, kind: "fraco" },
            { element: "ice", value: 16, kind: "resistente" },
            { element: "holy", value: 15, kind: "resistente" },
            { element: "death", value: 15, kind: "resistente" },
          ],
          drops: {
            uncommon: [{ name: "pick", objectId: 3456 }, { name: "lump of earth", objectId: 10305 }, { name: "coal", objectId: 12600 }, { name: "green crystal splinter", objectId: 16122 }, { name: "brown crystal splinter", objectId: 16123 }, { name: "blue crystal splinter", objectId: 16124 }, { name: "pulverized ore", objectId: 16133 }, { name: "vein of ore", objectId: 16135 }],
            semiRare: [{ name: "worm", objectId: 3492 }, { name: "iron ore", objectId: 5880 }, { name: "terra amulet", objectId: 814 }, { name: "drill bolt", objectId: 16142 }],
            rare: [{ name: "spiked squelcher", objectId: 7452 }, { name: "clay lump", objectId: 10422 }],
          }
        },
        {
          id: "devourer",
          name: "Devourer",
          hp: 3800,
          exp: 1755,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Devourer.gif",
          damageElements: [{ element: 'earth', weight: 500 }, { element: 'physical', weight: 260 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: -5, kind: "fraco" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 15, kind: "resistente" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 10, kind: "resistente" },
          ],
          drops: {
            uncommon: [{ name: "platinum coin", objectId: 3035 }],
            semiRare: [{ name: "glob of glooth", objectId: 21182 }, { name: "small sapphire", objectId: 3029 }, { name: "small amethyst", objectId: 3033 }, { name: "small topaz", objectId: 9057 }, { name: "small emerald", objectId: 3032 }, { name: "small ruby", objectId: 3030 }, { name: "small diamond", objectId: 3028 }, { name: "yellow gem", objectId: 3037 }],
            rare: [{ name: "talon", objectId: 3034 }, { name: "green gem", objectId: 3038 }, { name: "glooth cape", objectId: 21164 }, { name: "glooth amulet", objectId: 21183 }, { name: "glooth blade", objectId: 21179 }, { name: "glooth club", objectId: 21178 }, { name: "glooth axe", objectId: 21180 }, { name: "glooth spear", objectId: 21158 }, { name: "springsprout rod", objectId: 8084 }, { name: "terra rod", objectId: 3065 }],
          }
        },
      ]
    },
    {
      id: "orclops",
      name: "Orclops",
      creatures: [
        {
          id: "orclops_doomhauler",
          name: "Orclops Doomhauler",
          hp: 3400,
          exp: 1450,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Orclops_Doomhauler.gif",
          damageElements: [{ element: 'physical', weight: 222 }],
          resistances: [
            { element: "physical", value: 10, kind: "resistente" },
            { element: "energy", value: -10, kind: "fraco" },
            { element: "earth", value: 30, kind: "resistente" },
            { element: "fire", value: 15, kind: "resistente" },
            { element: "ice", value: -10, kind: "fraco" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 10, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "red mushroom", objectId: 3724 }, { name: "strong health potion", objectId: 236 }, { name: "orcish axe", objectId: 3316 }, { name: "mysterious fetish", objectId: 3078 }, { name: "bone toothpick", objectId: 24380 }],
            uncommon: [{ name: "pair of iron fists", objectId: 17828 }, { name: "black pearl", objectId: 3027 }, { name: "brown crystal splinter", objectId: 16123 }, { name: "small topaz", objectId: 9057 }],
            semiRare: [{ name: "beetle carapace", objectId: 24381 }, { name: "small ruby", objectId: 3030 }, { name: "bug meat", objectId: 24382 }, { name: "onion", objectId: 8015 }],
            rare: [{ name: "spiked squelcher", objectId: 7452 }, { name: "war drum", objectId: 2966 }, { name: "berserk potion", objectId: 7439 }, { name: "beetle necklace", objectId: 10457 }, { name: "reinvigorating seeds", objectId: 23811 }],
          }
        },
        {
          id: "orclops_ravager",
          name: "Orclops Ravager",
          hp: 2400,
          exp: 1100,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Orclops_Ravager.gif",
          damageElements: [{ element: 'physical', weight: 132 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: -10, kind: "fraco" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 20, kind: "resistente" },
            { element: "ice", value: 20, kind: "resistente" },
            { element: "holy", value: 50, kind: "resistente" },
            { element: "death", value: 10, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "strong health potion", objectId: 236 }, { name: "mysterious fetish", objectId: 3078 }, { name: "red mushroom", objectId: 3724 }, { name: "orcish axe", objectId: 3316 }],
            uncommon: [{ name: "brown crystal splinter", objectId: 16123 }, { name: "bug meat", objectId: 24382 }, { name: "small topaz", objectId: 9057 }, { name: "onion", objectId: 8015 }, { name: "reinvigorating seeds", objectId: 23811 }],
            semiRare: [{ name: "bone toothpick", objectId: 24380 }, { name: "black pearl", objectId: 3027 }, { name: "small ruby", objectId: 3030 }, { name: "beetle carapace", objectId: 24381 }],
            rare: [{ name: "spiked squelcher", objectId: 7452 }, { name: "pair of iron fists", objectId: 17828 }, { name: "war drum", objectId: 2966 }, { name: "berserk potion", objectId: 7439 }, { name: "dreaded cleaver", objectId: 7419 }],
          }
        },
      ]
    },
    {
      id: "grim_reaper",
      name: "Grim Reaper",
      creatures: [
        {
          id: "banshee",
          name: "Banshee",
          hp: 2000,
          exp: 900,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Banshee.gif",
          damageElements: [{ element: 'death', weight: 995 }, { element: 'physical', weight: 785 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: -25, kind: "fraco" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "candlestick", objectId: 2917 }],
            uncommon: [{ name: "silver amulet", objectId: 3054 }, { name: "simple dress", objectId: 3568 }],
            semiRare: [{ name: "silver brooch", objectId: 3017 }, { name: "white pearl", objectId: 3026 }, { name: "black pearl", objectId: 3027 }, { name: "poison dagger", objectId: 3299 }, { name: "petrified scream", objectId: 10420 }, { name: "hair of a banshee", objectId: 11446 }],
            rare: [{ name: "wedding ring", objectId: 3004 }, { name: "crystal ring", objectId: 3007 }, { name: "spellbook", objectId: 3059 }, { name: "life crystal", objectId: 3061 }, { name: "stone skin amulet", objectId: 3081 }, { name: "ring of healing", objectId: 3098 }, { name: "lyre", objectId: 2949 }, { name: "red robe", objectId: 3566 }, { name: "blue robe", objectId: 3567 }, { name: "strong mana potion", objectId: 237 }, { name: "terra mantle", objectId: 811 }, { name: "sweet smelling bait", objectId: 23274 }],
          }
        },
        {
          id: "grim_reaper",
          name: "Grim Reaper",
          hp: 7800,
          exp: 5500,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Grim_Reaper.gif",
          damageElements: [{ element: 'death', weight: 995 }, { element: 'physical', weight: 785 }],
          resistances: [
            { element: "physical", value: 25, kind: "resistente" },
            { element: "energy", value: -10, kind: "fraco" },
            { element: "earth", value: 40, kind: "resistente" },
            { element: "fire", value: -10, kind: "fraco" },
            { element: "ice", value: 65, kind: "resistente" },
            { element: "holy", value: -10, kind: "fraco" },
            { element: "death", value: 80, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "flask of demonic blood", objectId: 6558 }],
            uncommon: [{ name: "platinum coin", objectId: 3035 }, { name: "scythe", objectId: 3453 }, { name: "demonic essence", objectId: 6500 }, { name: "great mana potion", objectId: 238 }, { name: "ultimate health potion", objectId: 7643 }, { name: "mystical hourglass", objectId: 9660 }],
            semiRare: [{ name: "magic light wand", objectId: 3046 }, { name: "dark shield", objectId: 3421 }, { name: "orichalcum pearl", objectId: 5021 }, { name: "slightly rusted armor", objectId: 8896 }],
            rare: [{ name: "death ring", objectId: 6299 }, { name: "nightmare blade", objectId: 7418 }, { name: "glacier kilt", objectId: 823 }, { name: "skullcracker armor", objectId: 8061 }, { name: "underworld rod", objectId: 8082 }],
          }
        },
        {
          id: "spectre",
          name: "Spectre",
          hp: 2700,
          exp: 2100,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Spectre.gif",
          damageElements: [{ element: 'physical', weight: 305 }, { element: 'death', weight: 260 }],
          resistances: [
            { element: "physical", value: 90, kind: "resistente" },
            { element: "energy", value: -8, kind: "fraco" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: -8, kind: "fraco" },
            { element: "ice", value: 1, kind: "resistente" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "blank rune", objectId: 3147 }],
            uncommon: [{ name: "lyre", objectId: 2949 }, { name: "wand of cosmic energy", objectId: 3073 }, { name: "soul orb", objectId: 5944 }, { name: "demonic essence", objectId: 6500 }],
            semiRare: [{ name: "platinum coin", objectId: 3035 }, { name: "white piece of cloth", objectId: 5909 }, { name: "shiny stone", objectId: 10310 }],
            rare: [{ name: "silver brooch", objectId: 3017 }, { name: "demonbone amulet", objectId: 3019 }, { name: "stealth ring", objectId: 3049 }, { name: "death ring", objectId: 6299 }, { name: "relic sword", objectId: 7383 }, { name: "great mana potion", objectId: 238 }],
          }
        },
      ]
    },
    {
      id: "wyrm",
      name: "Wyrm",
      creatures: [
        {
          id: "elder_wyrm",
          name: "Elder Wyrm",
          hp: 5400,
          exp: 2500,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Elder_Wyrm.gif",
          damageElements: [{ element: 'energy', weight: 545 }, { element: 'physical', weight: 235 }, { element: 'death', weight: 145 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 75, kind: "resistente" },
            { element: "fire", value: 30, kind: "resistente" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "wyrm scale", objectId: 9665 }, { name: "dragon ham", objectId: 3583 }, { name: "strong health potion", objectId: 236 }],
            uncommon: [{ name: "strong mana potion", objectId: 237 }, { name: "crossbow", objectId: 3349 }],
            semiRare: [{ name: "small diamond", objectId: 3028 }, { name: "soul orb", objectId: 5944 }, { name: "wand of draconia", objectId: 8093 }, { name: "power bolt", objectId: 3450 }, { name: "legs of wisdom", objectId: 50187 }],
            rare: [{ name: "wand of starstorm", objectId: 8072 }, { name: "lightning pendant", objectId: 816 }, { name: "lightning legs", objectId: 822 }, { name: "lightning robe", objectId: 825 }, { name: "dragonbone staff", objectId: 7436 }, { name: "composite hornbow", objectId: 8027 }, { name: "shadow sceptre", objectId: 7451 }, { name: "lightning boots", objectId: 820 }, { name: "shockwave amulet", objectId: 9304 }],
          }
        },
        {
          id: "wyrm",
          name: "Wyrm",
          hp: 3650,
          exp: 1550,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Wyrm.gif",
          damageElements: [{ element: 'energy', weight: 545 }, { element: 'physical', weight: 235 }, { element: 'death', weight: 145 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 75, kind: "resistente" },
            { element: "fire", value: 20, kind: "resistente" },
            { element: "ice", value: -5, kind: "fraco" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: -5, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "dragon ham", objectId: 3583 }],
            uncommon: [{ name: "strong health potion", objectId: 236 }, { name: "wyrm scale", objectId: 9665 }, { name: "strong mana potion", objectId: 237 }, { name: "burst arrow", objectId: 3449 }, { name: "crossbow", objectId: 3349 }],
            semiRare: [{ name: "focus cape", objectId: 8043 }, { name: "small diamond", objectId: 3028 }, { name: "wand of starstorm", objectId: 8072 }, { name: "wand of draconia", objectId: 8093 }],
            rare: [{ name: "composite hornbow", objectId: 8027 }, { name: "dragonbone staff", objectId: 7436 }, { name: "lightning pendant", objectId: 816 }, { name: "shockwave amulet", objectId: 9304 }, { name: "hibiscus dress", objectId: 8045 }],
          }
        },
      ]
    },
    {
      id: "werehyaena",
      name: "Werehyaena",
      creatures: [
        {
          id: "werehyaena",
          name: "Werehyaena",
          hp: 5400,
          exp: 2200,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Werehyaena.gif",
          damageElements: [{ element: 'physical', weight: 300 }, { element: 'death', weight: 275 }, { element: 'earth', weight: 250 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 40, kind: "resistente" },
            { element: "fire", value: 50, kind: "resistente" },
            { element: "ice", value: -20, kind: "fraco" },
            { element: "holy", value: -25, kind: "fraco" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "great health potion", objectId: 239 }],
            uncommon: [{ name: "meat", objectId: 3577 }, { name: "axe", objectId: 3274 }, { name: "knife", objectId: 3291 }, { name: "werehyaena nose", objectId: 33943 }, { name: "halberd", objectId: 3269 }, { name: "red crystal fragment", objectId: 16126 }, { name: "small enchanted amethyst", objectId: 678 }, { name: "life preserver", objectId: 17813 }, { name: "red gem", objectId: 3039 }, { name: "yellow gem", objectId: 3037 }],
            semiRare: [{ name: "combat knife", objectId: 3292 }, { name: "green crystal fragment", objectId: 16127 }, { name: "ratana", objectId: 17812 }],
            rare: [{ name: "werehyaena talisman", objectId: 33944 }, { name: "werehyaena trophy", objectId: 34219 }],
          }
        },
        {
          id: "werehyaena_shaman",
          name: "Werehyaena Shaman",
          hp: 5000,
          exp: 2200,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Werehyaena_Shaman.gif",
          damageElements: [{ element: 'death', weight: 1080 }, { element: 'earth', weight: 315 }, { element: 'physical', weight: 260 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 40, kind: "resistente" },
            { element: "fire", value: 25, kind: "resistente" },
            { element: "ice", value: -20, kind: "fraco" },
            { element: "holy", value: 5, kind: "resistente" },
            { element: "death", value: -5, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "great mana potion", objectId: 238 }],
            uncommon: [{ name: "werehyaena nose", objectId: 33943 }, { name: "small amethyst", objectId: 3033 }, { name: "green crystal splinter", objectId: 16122 }, { name: "hailstorm rod", objectId: 3067 }, { name: "doublet", objectId: 3379 }, { name: "brown crystal splinter", objectId: 16123 }],
            semiRare: [{ name: "wand of starstorm", objectId: 8072 }, { name: "small enchanted emerald", objectId: 677 }, { name: "sword ring", objectId: 3091 }, { name: "wand of voodoo", objectId: 8094 }, { name: "protection amulet", objectId: 3084 }],
            rare: [{ name: "werehyaena talisman", objectId: 33944 }, { name: "moonlight crystals", objectId: 22083 }, { name: "werehyaena trophy", objectId: 34219 }],
          }
        },
      ]
    },
    {
      id: "asuras",
      name: "Asuras",
      creatures: [
        {
          id: "hellspawn",
          name: "Hellspawn",
          hp: 7000,
          exp: 2550,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Hellspawn.gif",
          damageElements: [{ element: 'physical', weight: 350 }, { element: 'fire', weight: 175 }],
          resistances: [
            { element: "physical", value: 10, kind: "resistente" },
            { element: "energy", value: 10, kind: "resistente" },
            { element: "earth", value: 80, kind: "resistente" },
            { element: "fire", value: 40, kind: "resistente" },
            { element: "ice", value: -10, kind: "fraco" },
            { element: "holy", value: 30, kind: "resistente" },
            { element: "death", value: -5, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "great health potion", objectId: 239 }, { name: "hellspawn tail", objectId: 10304 }],
            uncommon: [{ name: "morning star", objectId: 3282 }, { name: "red mushroom", objectId: 3724 }, { name: "demonic essence", objectId: 6500 }, { name: "battle shield", objectId: 3413 }, { name: "assassin star", objectId: 7368 }, { name: "ultimate health potion", objectId: 7643 }, { name: "small topaz", objectId: 9057 }],
            semiRare: [{ name: "warrior helmet", objectId: 3369 }, { name: "knight legs", objectId: 3371 }, { name: "rusted armor", objectId: 8895 }, { name: "slightly rusted armor", objectId: 8896 }],
            rare: [{ name: "onyx flail", objectId: 7421 }, { name: "berserk potion", objectId: 7439 }, { name: "spiked squelcher", objectId: 7452 }, { name: "dracoyle statue", objectId: 9034 }, { name: "black skull", objectId: 9056 }],
          }
        },
        {
          id: "dawnfire_asura",
          name: "Dawnfire Asura",
          hp: 5800,
          exp: 4100,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Dawnfire_Asura.gif",
          damageElements: [{ element: 'death', weight: 512 }, { element: 'physical', weight: 252 }, { element: 'fire', weight: 175 }],
          resistances: [
            { element: "physical", value: -10, kind: "fraco" },
            { element: "energy", value: -5, kind: "fraco" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: -10, kind: "fraco" },
            { element: "holy", value: -10, kind: "fraco" },
            { element: "death", value: 20, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "flask of demonic blood", objectId: 6558 }],
            uncommon: [{ name: "great mana potion", objectId: 238 }, { name: "small ruby", objectId: 3030 }, { name: "demonic essence", objectId: 6500 }, { name: "peacock feather fan", objectId: 21975 }, { name: "soul orb", objectId: 5944 }],
            semiRare: [{ name: "small amethyst", objectId: 3033 }, { name: "small diamond", objectId: 3028 }, { name: "small emerald", objectId: 3032 }, { name: "small topaz", objectId: 9057 }, { name: "golden lotus brooch", objectId: 21974 }, { name: "mysterious fetish", objectId: 3078 }, { name: "mystic turban", objectId: 3574 }, { name: "red piece of cloth", objectId: 5911 }],
            rare: [{ name: "blue gem", objectId: 3041 }, { name: "death ring", objectId: 6299 }, { name: "focus cape", objectId: 8043 }, { name: "magma coat", objectId: 826 }, { name: "oriental shoes", objectId: 21981 }, { name: "ruby necklace", objectId: 3016 }, { name: "spellbook of mind control", objectId: 8074 }, { name: "wand of inferno", objectId: 3071 }],
          }
        },
        {
          id: "midnight_asura",
          name: "Midnight Asura",
          hp: 6200,
          exp: 4100,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Midnight_Asura.gif",
          damageElements: [{ element: 'death', weight: 418 }, { element: 'physical', weight: 387 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: -10, kind: "fraco" },
            { element: "earth", value: -10, kind: "fraco" },
            { element: "fire", value: 10, kind: "resistente" },
            { element: "ice", value: 10, kind: "resistente" },
            { element: "holy", value: 30, kind: "resistente" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "assassin star", objectId: 7368 }, { name: "flask of demonic blood", objectId: 6558 }, { name: "demonic essence", objectId: 6500 }, { name: "small diamond", objectId: 3028 }, { name: "small sapphire", objectId: 3029 }, { name: "great health potion", objectId: 239 }, { name: "white pearl", objectId: 3026 }, { name: "golden lotus brooch", objectId: 21974 }, { name: "peacock feather fan", objectId: 21975 }, { name: "soul orb", objectId: 5944 }],
            semiRare: [{ name: "black pearl", objectId: 3027 }, { name: "small emerald", objectId: 3032 }, { name: "small ruby", objectId: 3030 }, { name: "small topaz", objectId: 9057 }, { name: "necrotic rod", objectId: 3066 }, { name: "silver brooch", objectId: 3017 }, { name: "silver amulet", objectId: 3054 }, { name: "tribal mask", objectId: 3403 }],
            rare: [{ name: "crystal ring", objectId: 3007 }, { name: "assassin dagger", objectId: 7404 }, { name: "blue gem", objectId: 3041 }, { name: "blue robe", objectId: 3567 }, { name: "gold ingot", objectId: 9058 }, { name: "oriental shoes", objectId: 21981 }, { name: "skullcracker armor", objectId: 8061 }, { name: "spellbook of mind control", objectId: 8074 }, { name: "underworld rod", objectId: 8082 }, { name: "yellow gem", objectId: 3037 }],
          }
        },
      ]
    },
    {
      id: "dark_torturer_hunt",
      name: "Dark Torturer",
      creatures: [
        {
          id: "dark_torturer",
          name: "Dark Torturer",
          hp: 14700,
          exp: 4650,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Dark_Torturer.gif",
          damageElements: [{ element: 'physical', weight: 1213 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 30, kind: "resistente" },
            { element: "earth", value: 90, kind: "resistente" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: -10, kind: "fraco" },
            { element: "holy", value: -10, kind: "fraco" },
            { element: "death", value: 10, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "ham", objectId: 3582 }, { name: "soul orb", objectId: 5944 }, { name: "flask of demonic blood", objectId: 6558 }],
            uncommon: [{ name: "saw", objectId: 3461 }, { name: "steel boots", objectId: 3554 }, { name: "demonic essence", objectId: 6500 }, { name: "great mana potion", objectId: 238 }, { name: "great health potion", objectId: 239 }],
            semiRare: [{ name: "orichalcum pearl", objectId: 5021 }, { name: "cat's paw", objectId: 5479 }, { name: "jewelled backpack", objectId: 5801 }, { name: "death ring", objectId: 6299 }, { name: "assassin star", objectId: 7368 }, { name: "gold ingot", objectId: 9058 }],
            rare: [{ name: "golden legs", objectId: 3364 }, { name: "vile axe", objectId: 7388 }, { name: "butcher's axe", objectId: 7412 }],
          }
        },
        {
          id: "lost_soul",
          name: "Lost Soul",
          hp: 11600,
          exp: 4000,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Lost_Soul.gif",
          damageElements: [{ element: 'physical', weight: 429 }, { element: 'death', weight: 210 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 10, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 50, kind: "resistente" },
            { element: "holy", value: -25, kind: "fraco" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "blank rune", objectId: 3147 }, { name: "unholy bone", objectId: 10316 }],
            uncommon: [{ name: "white pearl", objectId: 3026 }, { name: "black pearl", objectId: 3027 }, { name: "soul orb", objectId: 5944 }, { name: "demonic essence", objectId: 6500 }, { name: "great mana potion", objectId: 238 }, { name: "great health potion", objectId: 239 }],
            semiRare: [{ name: "ruby necklace", objectId: 3016 }, { name: "stone skin amulet", objectId: 3081 }, { name: "skeleton decoration", objectId: 6525 }, { name: "titan axe", objectId: 7413 }],
            rare: [{ name: "skull staff", objectId: 3324 }, { name: "tower shield", objectId: 3428 }, { name: "skull helmet", objectId: 5741 }, { name: "haunted blade", objectId: 7407 }],
          }
        },
        {
          id: "betrayed_wraith",
          name: "Betrayed Wraith",
          hp: 8400,
          exp: 3500,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Betrayed_Wraith.gif",
          damageElements: [{ element: 'physical', weight: 455 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 10, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 50, kind: "resistente" },
            { element: "holy", value: -20, kind: "fraco" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "power bolt", objectId: 3450 }, { name: "flask of demonic blood", objectId: 6558 }],
            uncommon: [{ name: "small diamond", objectId: 3028 }, { name: "orichalcum pearl", objectId: 5021 }, { name: "soul orb", objectId: 5944 }, { name: "demonic essence", objectId: 6500 }, { name: "assassin star", objectId: 7368 }, { name: "great mana potion", objectId: 238 }, { name: "ultimate health potion", objectId: 7643 }, { name: "unholy bone", objectId: 10316 }],
            semiRare: [{ name: "mercenary sword", objectId: 7386 }],
            rare: [{ name: "skull helmet", objectId: 5741 }, { name: "golden figurine", objectId: 5799 }, { name: "bloody edge", objectId: 7416 }],
          }
        },
      ]
    },
    {
      id: "wereliones",
      name: "Wereliones",
      creatures: [
        {
          id: "werelion",
          name: "Werelion",
          hp: 5600,
          exp: 2200,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Werelion.gif",
          damageElements: [{ element: 'holy', weight: 675 }, { element: 'fire', weight: 350 }, { element: 'physical', weight: 325 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 50, kind: "resistente" },
            { element: "fire", value: 25, kind: "resistente" },
            { element: "ice", value: -25, kind: "fraco" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 45, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "great spirit potion", objectId: 7642 }],
            uncommon: [{ name: "small enchanted ruby", objectId: 675 }, { name: "meat", objectId: 3577 }, { name: "crystal sword", objectId: 7449 }, { name: "lion's mane", objectId: 9691 }],
            semiRare: [{ name: "silver brooch", objectId: 3017 }, { name: "small diamond", objectId: 3028 }, { name: "war hammer", objectId: 3279 }, { name: "doublet", objectId: 3379 }, { name: "dark shield", objectId: 3421 }, { name: "titan axe", objectId: 7413 }, { name: "spiked squelcher", objectId: 7452 }, { name: "glorious axe", objectId: 7454 }, { name: "spirit cloak", objectId: 8042 }, { name: "onyx chip", objectId: 22193 }, { name: "coral brooch", objectId: 24391 }, { name: "ivory carving", objectId: 33945 }, { name: "rainbow quartz", objectId: 25737 }],
            rare: [{ name: "noble axe", objectId: 7456 }, { name: "white silk flower", objectId: 34008 }, { name: "lion figurine", objectId: 33781 }],
          }
        },
        {
          id: "werelioness",
          name: "Werelioness",
          hp: 6000,
          exp: 2300,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Werelioness.gif",
          damageElements: [{ element: 'fire', weight: 375 }, { element: 'holy', weight: 350 }, { element: 'physical', weight: 350 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 40, kind: "resistente" },
            { element: "fire", value: 35, kind: "resistente" },
            { element: "ice", value: -25, kind: "fraco" },
            { element: "holy", value: -5, kind: "fraco" },
            { element: "death", value: 50, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "small enchanted sapphire", objectId: 676 }, { name: "black pearl", objectId: 3027 }, { name: "ham", objectId: 3582 }, { name: "meat", objectId: 3577 }, { name: "soul orb", objectId: 5944 }, { name: "ankh", objectId: 3077 }, { name: "crystal sword", objectId: 7449 }, { name: "serpent sword", objectId: 3297 }, { name: "rapier", objectId: 3272 }, { name: "lion's mane", objectId: 9691 }],
            semiRare: [{ name: "white pearl", objectId: 3026 }, { name: "lightning headband", objectId: 828 }, { name: "steel helmet", objectId: 3351 }, { name: "doublet", objectId: 3379 }, { name: "ivory carving", objectId: 33945 }],
            rare: [{ name: "magma legs", objectId: 821 }, { name: "crown helmet", objectId: 3385 }, { name: "white silk flower", objectId: 34008 }, { name: "lion figurine", objectId: 33781 }],
          }
        },
        {
          id: "white_lion",
          name: "White Lion",
          hp: 5400,
          exp: 2300,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/White_Lion.gif",
          damageElements: [{ element: 'holy', weight: 380 }, { element: 'fire', weight: 350 }, { element: 'physical', weight: 350 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 30, kind: "resistente" },
            { element: "fire", value: 25, kind: "resistente" },
            { element: "ice", value: -20, kind: "fraco" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 40, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "great spirit potion", objectId: 7642 }, { name: "lion's mane", objectId: 9691 }, { name: "green crystal shard", objectId: 16121 }, { name: "terra boots", objectId: 813 }, { name: "axe", objectId: 3274 }, { name: "leather boots", objectId: 3552 }, { name: "twin hooks", objectId: 10392 }],
            semiRare: [{ name: "cyan crystal fragment", objectId: 16125 }, { name: "green crystal fragment", objectId: 16127 }, { name: "war hammer", objectId: 3279 }, { name: "combat knife", objectId: 3292 }],
          }
        },
      ]
    },
    {
      id: "draken",
      name: "Draken",
      creatures: [
        {
          id: "draken_spellweaver",
          name: "Draken Spellweaver",
          hp: 10000,
          exp: 3100,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Draken_Spellweaver.gif",
          damageElements: [{ element: 'fire', weight: 605 }, { element: 'physical', weight: 350 }],
          resistances: [
            { element: "physical", value: -10, kind: "fraco" },
            { element: "energy", value: -10, kind: "fraco" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: -10, kind: "fraco" },
            { element: "holy", value: -5, kind: "fraco" },
            { element: "death", value: 80, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "meat", objectId: 3577 }, { name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "weaver's wandtip", objectId: 10397 }, { name: "small ruby", objectId: 3030 }, { name: "great mana potion", objectId: 238 }],
            semiRare: [{ name: "draken sulphur", objectId: 11658 }, { name: "luminous orb", objectId: 11454 }, { name: "green gem", objectId: 3038 }, { name: "zaoan shoes", objectId: 10386 }, { name: "wand of inferno", objectId: 3071 }],
            rare: [{ name: "focus cape", objectId: 8043 }, { name: "spellweaver's robe", objectId: 10438 }, { name: "zaoan legs", objectId: 10387 }, { name: "zaoan robe", objectId: 10439 }, { name: "ring of the sky", objectId: 3006 }, { name: "bamboo leaves", objectId: 12549 }, { name: "harness", objectId: 12307 }, { name: "draken trophy", objectId: 10398 }],
          }
        },
        {
          id: "draken_warmaster",
          name: "Draken Warmaster",
          hp: 8300,
          exp: 2400,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Draken_Warmaster.gif",
          damageElements: [{ element: 'fire', weight: 520 }, { element: 'physical', weight: 350 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 5, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: -5, kind: "fraco" },
            { element: "holy", value: 5, kind: "resistente" },
            { element: "death", value: 50, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "meat", objectId: 3577 }],
            uncommon: [{ name: "bone shoulderplate", objectId: 10404 }, { name: "zaoan halberd", objectId: 10406 }, { name: "warmaster's wristguards", objectId: 10405 }],
            semiRare: [{ name: "great health potion", objectId: 239 }, { name: "ultimate health potion", objectId: 7643 }, { name: "zaoan shoes", objectId: 10386 }, { name: "tower shield", objectId: 3428 }, { name: "small ruby", objectId: 3030 }, { name: "zaoan legs", objectId: 10387 }],
            rare: [{ name: "zaoan armor", objectId: 10384 }, { name: "drakinata", objectId: 10388 }, { name: "ring of the sky", objectId: 3006 }],
          }
        },
      ]
    },
    {
      id: "undead_dragon",
      name: "Undead Dragon",
      creatures: [
        {
          id: "undead_dragon",
          name: "Undead Dragon",
          hp: 16700,
          exp: 7500,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Undead_Dragon.gif",
          damageElements: [{ element: 'death', weight: 1500 }, { element: 'earth', weight: 990 }, { element: 'physical', weight: 880 }],
          resistances: [
            { element: "physical", value: 5, kind: "resistente" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 90, kind: "resistente" },
            { element: "holy", value: -25, kind: "fraco" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "black pearl", objectId: 3027 }, { name: "small sapphire", objectId: 3029 }, { name: "platinum coin", objectId: 3035 }, { name: "assassin star", objectId: 7368 }, { name: "great mana potion", objectId: 238 }, { name: "great health potion", objectId: 239 }, { name: "unholy bone", objectId: 10316 }],
            uncommon: [{ name: "golden mug", objectId: 2903 }, { name: "knight armor", objectId: 3370 }, { name: "power bolt", objectId: 3450 }, { name: "hardened bone", objectId: 5925 }, { name: "demonic essence", objectId: 6500 }],
            semiRare: [{ name: "life crystal", objectId: 3061 }, { name: "war axe", objectId: 3342 }, { name: "royal helmet", objectId: 3392 }, { name: "dragonbone staff", objectId: 7436 }],
            rare: [{ name: "golden armor", objectId: 3360 }, { name: "dragon slayer", objectId: 7402 }, { name: "divine plate", objectId: 8057 }, { name: "skullcracker armor", objectId: 8061 }, { name: "gold ingot", objectId: 9058 }, { name: "spellweaver's robe", objectId: 10438 }],
          }
        },
      ]
    },
    {
      id: "cliff_strider",
      name: "Cliff Strider",
      creatures: [
        {
          id: "orewalker",
          name: "Orewalker",
          hp: 14400,
          exp: 5900,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Orewalker.gif",
          damageElements: [{ element: 'physical', weight: 500 }],
          resistances: [
            { element: "physical", value: 25, kind: "resistente" },
            { element: "energy", value: -5, kind: "fraco" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 65, kind: "resistente" },
            { element: "ice", value: 5, kind: "resistente" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 25, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "sulphurous stone", objectId: 10315 }, { name: "pulverized ore", objectId: 16133 }],
            uncommon: [{ name: "iron ore", objectId: 5880 }, { name: "strong health potion", objectId: 236 }, { name: "strong mana potion", objectId: 237 }, { name: "great mana potion", objectId: 238 }, { name: "mana potion", objectId: 268 }, { name: "ultimate health potion", objectId: 7643 }, { name: "small topaz", objectId: 9057 }, { name: "shiny stone", objectId: 10310 }, { name: "green crystal shard", objectId: 16121 }, { name: "blue crystal splinter", objectId: 16124 }, { name: "cyan crystal fragment", objectId: 16125 }, { name: "vein of ore", objectId: 16135 }, { name: "prismatic bolt", objectId: 16141 }],
            semiRare: [{ name: "yellow gem", objectId: 3037 }, { name: "knight legs", objectId: 3371 }, { name: "magic sulphur", objectId: 5904 }, { name: "titan axe", objectId: 7413 }, { name: "glorious axe", objectId: 7454 }, { name: "wand of defiance", objectId: 8090 }],
            rare: [{ name: "crown armor", objectId: 3381 }, { name: "crown helmet", objectId: 3385 }, { name: "crystalline armor", objectId: 8050 }, { name: "crystal crossbow", objectId: 16163 }],
          }
        },
        {
          id: "minion_of_versperoth",
          name: "Minion of Versperoth",
          hp: 18000,
          exp: 0,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Minion_of_Versperoth.gif",
          damageElements: [{ element: 'fire', weight: 1400 }],
          resistances: [
            { element: "physical", value: 30, kind: "resistente" },
            { element: "energy", value: 30, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: -5, kind: "fraco" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 35, kind: "resistente" },
          ],
          drops: {
          }
        },
        {
          id: "lost_berserker",
          name: "Lost Berserker",
          hp: 11800,
          exp: 4800,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Lost_Berserker.gif",
          damageElements: [{ element: "physical", weight: 1 }],
          resistances: [
            { element: "physical", value: 20, kind: "resistente" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 10, kind: "resistente" },
            { element: "ice", value: 10, kind: "resistente" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 15, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "brown mushroom", objectId: 3725 }, { name: "iron ore", objectId: 5880 }, { name: "great mana potion", objectId: 238 }, { name: "great health potion", objectId: 239 }, { name: "small topaz", objectId: 9057 }, { name: "brown crystal splinter", objectId: 16123 }, { name: "green crystal fragment", objectId: 16127 }, { name: "drill bolt", objectId: 16142 }],
            semiRare: [{ name: "piggy bank", objectId: 2995 }, { name: "knight axe", objectId: 3318 }, { name: "guardian shield", objectId: 3415 }, { name: "tower shield", objectId: 3428 }, { name: "violet crystal shard", objectId: 16120 }, { name: "blue crystal splinter", objectId: 16124 }],
            rare: [{ name: "fire axe", objectId: 3320 }, { name: "royal helmet", objectId: 3392 }, { name: "black shield", objectId: 3429 }, { name: "magic sulphur", objectId: 5904 }, { name: "chaos mace", objectId: 7427 }, { name: "spiked squelcher", objectId: 7452 }, { name: "terra boots", objectId: 813 }, { name: "clay lump", objectId: 10422 }],
          }
        },
        {
          id: "ironblight",
          name: "Ironblight",
          hp: 13200,
          exp: 5400,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Ironblight.gif",
          damageElements: [{ element: 'earth', weight: 500 }, { element: 'ice', weight: 500 }, { element: 'physical', weight: 500 }],
          resistances: [
            { element: "physical", value: 15, kind: "resistente" },
            { element: "energy", value: 25, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 60, kind: "resistente" },
            { element: "ice", value: 20, kind: "resistente" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 40, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "war crystal", objectId: 9654 }],
            uncommon: [{ name: "small emerald", objectId: 3032 }, { name: "small amethyst", objectId: 3033 }, { name: "great mana potion", objectId: 238 }, { name: "ultimate health potion", objectId: 7643 }, { name: "shiny stone", objectId: 10310 }, { name: "green crystal shard", objectId: 16121 }, { name: "brown crystal splinter", objectId: 16123 }, { name: "red crystal fragment", objectId: 16126 }, { name: "crystalline spikes", objectId: 16138 }],
            semiRare: [{ name: "terra legs", objectId: 812 }, { name: "springsprout rod", objectId: 8084 }, { name: "crystal of balance", objectId: 9068 }, { name: "crystal of power", objectId: 9067 }],
            rare: [{ name: "blue gem", objectId: 3041 }, { name: "epee", objectId: 3326 }, { name: "magic sulphur", objectId: 5904 }, { name: "sapphire hammer", objectId: 7437 }, { name: "composite hornbow", objectId: 8027 }, { name: "jade hat", objectId: 10451 }, { name: "glacial rod", objectId: 16118 }],
          }
        },
        {
          id: "cliff_strider",
          name: "Cliff Strider",
          hp: 18800,
          exp: 7100,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Cliff_Strider.gif",
          damageElements: [{ element: 'physical', weight: 500 }],
          resistances: [
            { element: "physical", value: 10, kind: "resistente" },
            { element: "energy", value: 5, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 20, kind: "resistente" },
            { element: "ice", value: 20, kind: "resistente" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 35, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "great mana potion", objectId: 238 }, { name: "ultimate health potion", objectId: 7643 }],
            uncommon: [{ name: "white pearl", objectId: 3026 }, { name: "black pearl", objectId: 3027 }, { name: "iron ore", objectId: 5880 }, { name: "soul orb", objectId: 5944 }, { name: "shiny stone", objectId: 10310 }, { name: "blue crystal shard", objectId: 16119 }, { name: "blue crystal splinter", objectId: 16124 }, { name: "cyan crystal fragment", objectId: 16125 }, { name: "pulverized ore", objectId: 16133 }, { name: "cliff strider claw", objectId: 16134 }, { name: "vein of ore", objectId: 16135 }, { name: "prismatic bolt", objectId: 16141 }],
            semiRare: [{ name: "magic sulphur", objectId: 5904 }, { name: "sapphire hammer", objectId: 7437 }, { name: "spiked squelcher", objectId: 7452 }, { name: "crystal of balance", objectId: 9068 }, { name: "wand of defiance", objectId: 8090 }, { name: "glacial rod", objectId: 16118 }],
            rare: [{ name: "blue gem", objectId: 3041 }, { name: "giant sword", objectId: 3281 }, { name: "hammer of wrath", objectId: 3332 }, { name: "knight legs", objectId: 3371 }, { name: "crown armor", objectId: 3381 }, { name: "crusader helmet", objectId: 3391 }, { name: "steel boots", objectId: 3554 }, { name: "crystal of power", objectId: 9067 }, { name: "crystalline sword", objectId: 16160 }, { name: "crystal crossbow", objectId: 16163 }],
          }
        },
      ]
    },
    {
      id: "hideous_fungus",
      name: "Hideous Fungus",
      creatures: [
        {
          id: "armadile",
          name: "Armadile",
          hp: 7600,
          exp: 3200,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Armadile.gif",
          damageElements: [{ element: 'ice', weight: 550 }, { element: 'earth', weight: 427 }],
          resistances: [
            { element: "physical", value: 5, kind: "resistente" },
            { element: "energy", value: 15, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 15, kind: "resistente" },
            { element: "holy", value: 15, kind: "resistente" },
            { element: "death", value: 45, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "strong health potion", objectId: 236 }, { name: "strong mana potion", objectId: 237 }, { name: "great mana potion", objectId: 238 }, { name: "great health potion", objectId: 239 }, { name: "mana potion", objectId: 268 }, { name: "battle stone", objectId: 11447 }, { name: "green crystal fragment", objectId: 16127 }, { name: "crystalline spikes", objectId: 16138 }, { name: "drill bolt", objectId: 16142 }, { name: "envenomed arrow", objectId: 16143 }],
            semiRare: [{ name: "titan axe", objectId: 7413 }, { name: "bonebreaker", objectId: 7428 }, { name: "terra boots", objectId: 813 }, { name: "green crystal splinter", objectId: 16122 }, { name: "jade conical hat", objectId: 50193 }],
            rare: [{ name: "tower shield", objectId: 3428 }, { name: "crystalline armor", objectId: 8050 }],
          }
        },
        {
          id: "hideous_fungus",
          name: "Hideous Fungus",
          hp: 9200,
          exp: 3700,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Hideous_Fungus.gif",
          damageElements: [{ element: 'ice', weight: 550 }, { element: 'earth', weight: 427 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 15, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: -5, kind: "fraco" },
            { element: "ice", value: 15, kind: "resistente" },
            { element: "holy", value: 5, kind: "resistente" },
            { element: "death", value: 35, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "great mana potion", objectId: 238 }, { name: "great health potion", objectId: 239 }, { name: "mana potion", objectId: 268 }, { name: "mushroom pie", objectId: 16103 }, { name: "hideous chunk", objectId: 16140 }, { name: "envenomed arrow", objectId: 16143 }],
            semiRare: [{ name: "war hammer", objectId: 3279 }, { name: "green piece of cloth", objectId: 5910 }, { name: "red piece of cloth", objectId: 5911 }, { name: "blue piece of cloth", objectId: 5912 }, { name: "terra boots", objectId: 813 }, { name: "terra amulet", objectId: 814 }],
            rare: [{ name: "terra mantle", objectId: 811 }, { name: "terra legs", objectId: 812 }, { name: "mushroom backpack", objectId: 16099 }, { name: "muck rod", objectId: 16117 }, { name: "mycological bow", objectId: 16164 }],
          }
        },
        {
          id: "humongous_fungus",
          name: "Humongous Fungus",
          hp: 6800,
          exp: 2900,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Humongous_Fungus.gif",
          damageElements: [{ element: 'earth', weight: 350 }, { element: 'physical', weight: 330 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 15, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: -10, kind: "fraco" },
            { element: "ice", value: 15, kind: "resistente" },
            { element: "holy", value: 5, kind: "resistente" },
            { element: "death", value: 35, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "mushroom pie", objectId: 16103 }, { name: "brown piece of cloth", objectId: 5913 }, { name: "drill bolt", objectId: 16142 }, { name: "humongous chunk", objectId: 16139 }, { name: "strong health potion", objectId: 236 }],
            semiRare: [{ name: "great mana potion", objectId: 238 }, { name: "great health potion", objectId: 239 }, { name: "strong mana potion", objectId: 237 }, { name: "mana potion", objectId: 268 }, { name: "blue piece of cloth", objectId: 5912 }, { name: "red piece of cloth", objectId: 5911 }, { name: "terra amulet", objectId: 814 }, { name: "terra boots", objectId: 813 }, { name: "angelic axe", objectId: 7436 }, { name: "terra legs", objectId: 812 }],
            rare: [{ name: "terra mantle", objectId: 811 }, { name: "muck rod", objectId: 16117 }, { name: "mushroom backpack", objectId: 16099 }, { name: "mycological bow", objectId: 16164 }],
          }
        },
        {
          id: "stone_devourer",
          name: "Stone Devourer",
          hp: 8400,
          exp: 2900,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Stone_Devourer.gif",
          damageElements: [{ element: 'physical', weight: 1641 }, { element: 'death', weight: 1000 }],
          resistances: [
            { element: "physical", value: 10, kind: "resistente" },
            { element: "energy", value: 30, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: -5, kind: "fraco" },
            { element: "ice", value: 30, kind: "resistente" },
            { element: "holy", value: 30, kind: "resistente" },
            { element: "death", value: 30, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "strong health potion", objectId: 236 }, { name: "strong mana potion", objectId: 237 }, { name: "great mana potion", objectId: 238 }, { name: "mana potion", objectId: 268 }, { name: "ultimate health potion", objectId: 7643 }, { name: "ancient stone", objectId: 9632 }, { name: "crystalline arrow", objectId: 15793 }, { name: "green crystal splinter", objectId: 16122 }, { name: "cyan crystal fragment", objectId: 16125 }, { name: "stone nose", objectId: 16137 }, { name: "crystalline spikes", objectId: 16138 }],
            semiRare: [{ name: "stone skin amulet", objectId: 3081 }, { name: "sapphire hammer", objectId: 7437 }, { name: "spiked squelcher", objectId: 7452 }, { name: "glorious axe", objectId: 7454 }],
            rare: [{ name: "giant sword", objectId: 3281 }, { name: "crystal mace", objectId: 3333 }, { name: "war axe", objectId: 3342 }],
          }
        },
      ]
    },
    {
      id: "magma_crawler",
      name: "Magma Crawler",
      creatures: [
        {
          id: "weeper",
          name: "Weeper",
          hp: 13600,
          exp: 5800,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Weeper.gif",
          damageElements: [{ element: 'fire', weight: 1550 }, { element: 'death', weight: 700 }, { element: 'physical', weight: 500 }],
          resistances: [
            { element: "physical", value: -5, kind: "fraco" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: -5, kind: "fraco" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 30, kind: "resistente" },
          ],
          drops: {
            uncommon: [{ name: "small ruby", objectId: 3030 }, { name: "great mana potion", objectId: 238 }, { name: "ultimate health potion", objectId: 7643 }, { name: "fiery heart", objectId: 9636 }, { name: "violet crystal shard", objectId: 16120 }, { name: "brown crystal splinter", objectId: 16123 }, { name: "red crystal fragment", objectId: 16126 }, { name: "magma clump", objectId: 16130 }, { name: "blazing bone", objectId: 16131 }, { name: "eye of a weeper", objectId: 16132 }, { name: "prismatic bolt", objectId: 16141 }],
            semiRare: [{ name: "fire sword", objectId: 3280 }, { name: "fire axe", objectId: 3320 }, { name: "wand of everblazing", objectId: 16115 }],
            rare: [{ name: "magma legs", objectId: 821 }, { name: "magma coat", objectId: 826 }],
          }
        },
        {
          id: "magma_crawler",
          name: "Magma Crawler",
          hp: 9600,
          exp: 3900,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Magma_Crawler.gif",
          damageElements: [{ element: 'fire', weight: 1550 }, { element: 'death', weight: 700 }, { element: 'physical', weight: 500 }],
          resistances: [
            { element: "physical", value: 5, kind: "resistente" },
            { element: "energy", value: 10, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 25, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "small diamond", objectId: 3028 }, { name: "fire bug", objectId: 5468 }, { name: "fire mushroom", objectId: 3731 }, { name: "great mana potion", objectId: 238 }, { name: "great health potion", objectId: 239 }, { name: "fiery heart", objectId: 9636 }, { name: "crystalline arrow", objectId: 15793 }, { name: "brown crystal splinter", objectId: 16123 }, { name: "green crystal fragment", objectId: 16127 }, { name: "magma clump", objectId: 16130 }, { name: "blazing bone", objectId: 16131 }],
            semiRare: [{ name: "yellow gem", objectId: 3037 }, { name: "black shield", objectId: 3429 }, { name: "iron ore", objectId: 5880 }, { name: "fire axe", objectId: 3320 }, { name: "fire sword", objectId: 3280 }, { name: "crown shield", objectId: 3419 }, { name: "yellow piece of cloth", objectId: 5914 }, { name: "magma amulet", objectId: 817 }, { name: "magma boots", objectId: 818 }, { name: "wand of draconia", objectId: 8093 }, { name: "blue crystal shard", objectId: 16119 }],
            rare: [{ name: "red piece of cloth", objectId: 5911 }, { name: "wand of everblazing", objectId: 16115 }],
          }
        },
        {
          id: "lava_golem",
          name: "Lava Golem",
          hp: 18000,
          exp: 7900,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Lava_Golem.gif",
          damageElements: [{ element: 'fire', weight: 1400 }],
          resistances: [
            { element: "physical", value: 30, kind: "resistente" },
            { element: "energy", value: 30, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: -5, kind: "fraco" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 35, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "mana potion", objectId: 268 }],
            uncommon: [{ name: "yellow gem", objectId: 3037 }, { name: "iron ore", objectId: 5880 }, { name: "yellow piece of cloth", objectId: 5914 }, { name: "strong health potion", objectId: 236 }, { name: "strong mana potion", objectId: 237 }, { name: "great mana potion", objectId: 238 }, { name: "ultimate health potion", objectId: 7643 }, { name: "fiery heart", objectId: 9636 }, { name: "violet crystal shard", objectId: 16120 }, { name: "green crystal splinter", objectId: 16122 }, { name: "red crystal fragment", objectId: 16126 }, { name: "magma clump", objectId: 16130 }, { name: "blazing bone", objectId: 16131 }, { name: "prismatic bolt", objectId: 16141 }],
            semiRare: [{ name: "wand of inferno", objectId: 3071 }, { name: "fire sword", objectId: 3280 }, { name: "fire axe", objectId: 3320 }, { name: "crown shield", objectId: 3419 }, { name: "red piece of cloth", objectId: 5911 }, { name: "magma amulet", objectId: 817 }, { name: "magma boots", objectId: 818 }, { name: "wand of everblazing", objectId: 16115 }],
            rare: [{ name: "magma coat", objectId: 826 }, { name: "spellbook of mind control", objectId: 8074 }],
          }
        },
        {
          id: "lost_berserker",
          name: "Lost Berserker",
          hp: 11800,
          exp: 4800,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Lost_Berserker.gif",
          damageElements: [{ element: "physical", weight: 1 }],
          resistances: [
            { element: "physical", value: 20, kind: "resistente" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 10, kind: "resistente" },
            { element: "ice", value: 10, kind: "resistente" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 15, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "brown mushroom", objectId: 3725 }, { name: "iron ore", objectId: 5880 }, { name: "great mana potion", objectId: 238 }, { name: "great health potion", objectId: 239 }, { name: "small topaz", objectId: 9057 }, { name: "brown crystal splinter", objectId: 16123 }, { name: "green crystal fragment", objectId: 16127 }, { name: "drill bolt", objectId: 16142 }],
            semiRare: [{ name: "piggy bank", objectId: 2995 }, { name: "knight axe", objectId: 3318 }, { name: "guardian shield", objectId: 3415 }, { name: "tower shield", objectId: 3428 }, { name: "violet crystal shard", objectId: 16120 }, { name: "blue crystal splinter", objectId: 16124 }],
            rare: [{ name: "fire axe", objectId: 3320 }, { name: "royal helmet", objectId: 3392 }, { name: "black shield", objectId: 3429 }, { name: "magic sulphur", objectId: 5904 }, { name: "chaos mace", objectId: 7427 }, { name: "spiked squelcher", objectId: 7452 }, { name: "terra boots", objectId: 813 }, { name: "clay lump", objectId: 10422 }],
          }
        },
      ]
    },
    {
      id: "dread_intruder",
      name: "Dread Intruder",
      creatures: [
        {
          id: "sparkion",
          name: "Sparkion",
          hp: 5400,
          exp: 1520,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Sparkion.gif",
          damageElements: [{ element: 'energy', weight: 400 }, { element: 'death', weight: 350 }, { element: 'physical', weight: 300 }],
          resistances: [
            { element: "physical", value: 5, kind: "resistente" },
            { element: "energy", value: 90, kind: "resistente" },
            { element: "earth", value: -15, kind: "fraco" },
            { element: "fire", value: 15, kind: "resistente" },
            { element: "ice", value: 70, kind: "resistente" },
            { element: "holy", value: 5, kind: "resistente" },
            { element: "death", value: 5, kind: "resistente" },
          ],
          drops: {
            uncommon: [{ name: "small sapphire", objectId: 3029 }, { name: "energy bar", objectId: 23535 }, { name: "blue crystal shard", objectId: 16119 }, { name: "spark sphere", objectId: 23518 }],
            semiRare: [{ name: "wand of draconia", objectId: 8093 }, { name: "ring of blue plasma", objectId: 23529 }, { name: "ring of green plasma", objectId: 23531 }, { name: "ring of red plasma", objectId: 23533 }, { name: "dangerous proto matter", objectId: 23515 }],
          }
        },
        {
          id: "dread_intruder",
          name: "Dread Intruder",
          hp: 9000,
          exp: 2400,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Dread_Intruder.gif",
          damageElements: [{ element: 'energy', weight: 400 }, { element: 'death', weight: 350 }, { element: 'physical', weight: 300 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 90, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 10, kind: "resistente" },
            { element: "ice", value: 5, kind: "resistente" },
            { element: "holy", value: -10, kind: "fraco" },
            { element: "death", value: 80, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "small amethyst", objectId: 3033 }, { name: "energy bar", objectId: 23535 }, { name: "spark sphere", objectId: 23518 }, { name: "cyan crystal fragment", objectId: 16125 }, { name: "violet crystal shard", objectId: 16120 }],
            semiRare: [{ name: "protective charm", objectId: 11444 }, { name: "ring of blue plasma", objectId: 23529 }, { name: "ring of green plasma", objectId: 23531 }, { name: "ring of red plasma", objectId: 23533 }, { name: "dangerous proto matter", objectId: 23515 }],
          }
        },
        {
          id: "breach_brood",
          name: "Breach Brood",
          hp: 7000,
          exp: 1760,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Breach_Brood.gif",
          damageElements: [{ element: 'energy', weight: 500 }, { element: 'physical', weight: 500 }, { element: 'death', weight: 300 }],
          resistances: [
            { element: "physical", value: -5, kind: "fraco" },
            { element: "energy", value: 80, kind: "resistente" },
            { element: "earth", value: -5, kind: "fraco" },
            { element: "fire", value: 10, kind: "resistente" },
            { element: "ice", value: 25, kind: "resistente" },
            { element: "holy", value: -5, kind: "fraco" },
            { element: "death", value: -5, kind: "fraco" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "small amethyst", objectId: 3033 }, { name: "energy bar", objectId: 23535 }, { name: "spark sphere", objectId: 23518 }, { name: "blue crystal splinter", objectId: 16124 }],
            semiRare: [{ name: "protective charm", objectId: 11444 }, { name: "ring of blue plasma", objectId: 23529 }, { name: "ring of green plasma", objectId: 23531 }, { name: "ring of red plasma", objectId: 23533 }, { name: "dangerous proto matter", objectId: 23515 }],
          }
        },
      ]
    },
    {
      id: "falcon",
      name: "Falcon",
      creatures: [
        {
          id: "falcon_paladin",
          name: "Falcon Paladin",
          hp: 17000,
          exp: 6900,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Falcon_Paladin.gif",
          damageElements: [{ element: 'physical', weight: 1300 }, { element: 'energy', weight: 880 }],
          resistances: [
            { element: "physical", value: 10, kind: "resistente" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: -10, kind: "fraco" },
            { element: "death", value: 50, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "small diamond", objectId: 3028 }, { name: "great spirit potion", objectId: 7642 }, { name: "small emerald", objectId: 3032 }, { name: "small amethyst", objectId: 3033 }, { name: "assassin star", objectId: 7368 }, { name: "small ruby", objectId: 3030 }, { name: "small topaz", objectId: 9057 }],
            uncommon: [{ name: "onyx arrow", objectId: 7365 }, { name: "red gem", objectId: 3039 }],
            semiRare: [{ name: "green gem", objectId: 3038 }, { name: "violet gem", objectId: 3036 }, { name: "giant shimmering pearl", objectId: 282 }, { name: "damaged armor plates", objectId: 28822 }],
            rare: [{ name: "falcon crest", objectId: 28823 }, { name: "golden armor", objectId: 3360 }, { name: "mastermind shield", objectId: 3414 }],
          }
        },
        {
          id: "falcon_knight",
          name: "Falcon Knight",
          hp: 18000,
          exp: 6300,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Falcon_Knight.gif",
          damageElements: [{ element: 'earth', weight: 500 }, { element: 'physical', weight: 400 }, { element: 'holy', weight: 360 }],
          resistances: [
            { element: "physical", value: 30, kind: "resistente" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: -10, kind: "fraco" },
            { element: "death", value: 50, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "ham", objectId: 3582 }, { name: "soul orb", objectId: 5944 }, { name: "great mana potion", objectId: 238 }, { name: "great health potion", objectId: 239 }, { name: "flask of demonic blood", objectId: 6558 }, { name: "small amethyst", objectId: 3033 }, { name: "assassin star", objectId: 7368 }],
            uncommon: [{ name: "small diamond", objectId: 3028 }, { name: "small ruby", objectId: 3030 }, { name: "small emerald", objectId: 3032 }, { name: "onyx arrow", objectId: 7365 }],
            semiRare: [{ name: "small topaz", objectId: 9057 }, { name: "titan axe", objectId: 7413 }, { name: "giant shimmering pearl", objectId: 282 }, { name: "spiked squelcher", objectId: 7452 }, { name: "knight armor", objectId: 3370 }, { name: "falcon crest", objectId: 28823 }, { name: "war axe", objectId: 3342 }, { name: "violet gem", objectId: 3036 }],
            rare: [{ name: "damaged armor plates", objectId: 28822 }, { name: "green gem", objectId: 3038 }, { name: "golden armor", objectId: 3360 }, { name: "mastermind shield", objectId: 3414 }, { name: "heavy mace", objectId: 3340 }, { name: "closed trap", objectId: 3481 }, { name: "demonbone amulet", objectId: 3019 }],
          }
        },
      ]
    },
    {
      id: "vexclaw",
      name: "Vexclaw",
      creatures: [
        {
          id: "vexclaw",
          name: "Vexclaw",
          hp: 17000,
          exp: 6248,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Vexclaw.gif",
          damageElements: [{ element: 'physical', weight: 550 }, { element: 'death', weight: 500 }, { element: 'energy', weight: 500 }, { element: 'fire', weight: 450 }],
          resistances: [
            { element: "physical", value: 5, kind: "resistente" },
            { element: "energy", value: 10, kind: "resistente" },
            { element: "earth", value: 40, kind: "resistente" },
            { element: "fire", value: 75, kind: "resistente" },
            { element: "ice", value: -5, kind: "fraco" },
            { element: "holy", value: -10, kind: "fraco" },
            { element: "death", value: 20, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "great spirit potion", objectId: 7642 }, { name: "great mana potion", objectId: 238 }, { name: "vexclaw talon", objectId: 22728 }, { name: "demonic essence", objectId: 6500 }],
            uncommon: [{ name: "ultimate health potion", objectId: 7643 }, { name: "fire mushroom", objectId: 3731 }, { name: "golden sickle", objectId: 3306 }, { name: "purple tome", objectId: 2848 }, { name: "small amethyst", objectId: 3033 }, { name: "small topaz", objectId: 9057 }, { name: "small emerald", objectId: 3032 }, { name: "small ruby", objectId: 3030 }, { name: "talon", objectId: 3034 }, { name: "yellow gem", objectId: 3037 }],
            semiRare: [{ name: "wand of voodoo", objectId: 8094 }, { name: "red gem", objectId: 3039 }, { name: "ice rapier", objectId: 3284 }, { name: "fire axe", objectId: 3320 }, { name: "might ring", objectId: 3048 }, { name: "giant sword", objectId: 3281 }, { name: "stealth ring", objectId: 3049 }, { name: "energy ring", objectId: 3051 }, { name: "rift lance", objectId: 22727 }, { name: "ring of healing", objectId: 3098 }],
            rare: [{ name: "platinum amulet", objectId: 3055 }, { name: "devil helmet", objectId: 3356 }, { name: "rift crossbow", objectId: 22867 }, { name: "rift bow", objectId: 22866 }, { name: "rift shield", objectId: 22726 }, { name: "demon shield", objectId: 3420 }, { name: "magic plate armor", objectId: 3366 }, { name: "golden legs", objectId: 3364 }, { name: "demonrage sword", objectId: 7382 }],
          }
        },
        {
          id: "grimeleech",
          name: "Grimeleech",
          hp: 19000,
          exp: 7216,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Grimeleech.gif",
          damageElements: [{ element: 'death', weight: 1550 }, { element: 'physical', weight: 450 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: -5, kind: "fraco" },
            { element: "earth", value: 40, kind: "resistente" },
            { element: "fire", value: 20, kind: "resistente" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 60, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "great mana potion", objectId: 238 }, { name: "great health potion", objectId: 239 }, { name: "great spirit potion", objectId: 7642 }, { name: "flask of demonic blood", objectId: 6558 }],
            uncommon: [{ name: "demonic essence", objectId: 6500 }, { name: "some grimeleech wings", objectId: 22730 }, { name: "fire mushroom", objectId: 3731 }, { name: "green mushroom", objectId: 3732 }, { name: "small diamond", objectId: 3028 }, { name: "small ruby", objectId: 3030 }, { name: "small topaz", objectId: 9057 }, { name: "small amethyst", objectId: 3033 }, { name: "underworld rod", objectId: 8082 }],
            semiRare: [{ name: "wand of voodoo", objectId: 8094 }, { name: "red gem", objectId: 3039 }, { name: "yellow gem", objectId: 3037 }, { name: "devil helmet", objectId: 3356 }, { name: "magma legs", objectId: 821 }, { name: "demon shield", objectId: 3420 }],
            rare: [{ name: "nightmare blade", objectId: 7418 }, { name: "blue gem", objectId: 3041 }, { name: "rift crossbow", objectId: 22867 }, { name: "steel boots", objectId: 3554 }, { name: "rift shield", objectId: 22726 }, { name: "rift lance", objectId: 22727 }, { name: "rift bow", objectId: 22866 }, { name: "abyss hammer", objectId: 7414 }, { name: "vile axe", objectId: 7388 }, { name: "magic plate armor", objectId: 3366 }],
          }
        },
        {
          id: "dark_torturer",
          name: "Dark Torturer",
          hp: 14700,
          exp: 4650,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Dark_Torturer.gif",
          damageElements: [{ element: 'physical', weight: 1213 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 30, kind: "resistente" },
            { element: "earth", value: 90, kind: "resistente" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: -10, kind: "fraco" },
            { element: "holy", value: -10, kind: "fraco" },
            { element: "death", value: 10, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "ham", objectId: 3582 }, { name: "soul orb", objectId: 5944 }, { name: "flask of demonic blood", objectId: 6558 }],
            uncommon: [{ name: "saw", objectId: 3461 }, { name: "steel boots", objectId: 3554 }, { name: "demonic essence", objectId: 6500 }, { name: "great mana potion", objectId: 238 }, { name: "great health potion", objectId: 239 }],
            semiRare: [{ name: "orichalcum pearl", objectId: 5021 }, { name: "cat's paw", objectId: 5479 }, { name: "jewelled backpack", objectId: 5801 }, { name: "death ring", objectId: 6299 }, { name: "assassin star", objectId: 7368 }, { name: "gold ingot", objectId: 9058 }],
            rare: [{ name: "golden legs", objectId: 3364 }, { name: "vile axe", objectId: 7388 }, { name: "butcher's axe", objectId: 7412 }],
          }
        },
      ]
    },
    {
      id: "grimeleech",
      name: "Grimeleech",
      creatures: [
        {
          id: "plaguesmith",
          name: "Plaguesmith",
          hp: 16500,
          exp: 3800,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Plaguesmith.gif",
          damageElements: [{ element: 'physical', weight: 400 }, { element: 'death', weight: 350 }, { element: 'earth', weight: 114 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: -10, kind: "fraco" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 30, kind: "resistente" },
            { element: "ice", value: 20, kind: "resistente" },
            { element: "holy", value: -10, kind: "fraco" },
            { element: "death", value: 10, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "piece of iron", objectId: 3110 }, { name: "mouldy cheese", objectId: 3120 }, { name: "dirty cape", objectId: 3122 }, { name: "two handed sword", objectId: 3265 }, { name: "morning star", objectId: 3282 }, { name: "battle hammer", objectId: 3305 }, { name: "steel shield", objectId: 3409 }],
            uncommon: [{ name: "small amethyst", objectId: 3033 }, { name: "platinum coin", objectId: 3035 }, { name: "knight legs", objectId: 3371 }, { name: "soul orb", objectId: 5944 }, { name: "demonic essence", objectId: 6500 }, { name: "onyx arrow", objectId: 7365 }, { name: "great health potion", objectId: 239 }],
            semiRare: [{ name: "silver brooch", objectId: 3017 }, { name: "axe ring", objectId: 3092 }, { name: "club ring", objectId: 3093 }, { name: "war hammer", objectId: 3279 }, { name: "steel boots", objectId: 3554 }, { name: "piece of royal steel", objectId: 5887 }, { name: "piece of hell steel", objectId: 5888 }, { name: "piece of draconian steel", objectId: 5889 }],
            rare: [{ name: "emerald bangle", objectId: 3010 }, { name: "hammer of wrath", objectId: 3332 }, { name: "slightly rusted armor", objectId: 8896 }],
          }
        },
        {
          id: "grimeleech",
          name: "Grimeleech",
          hp: 19000,
          exp: 7216,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Grimeleech.gif",
          damageElements: [{ element: 'death', weight: 1550 }, { element: 'physical', weight: 450 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: -5, kind: "fraco" },
            { element: "earth", value: 40, kind: "resistente" },
            { element: "fire", value: 20, kind: "resistente" },
            { element: "ice", value: 0, kind: "neutro" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 60, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "great mana potion", objectId: 238 }, { name: "great health potion", objectId: 239 }, { name: "great spirit potion", objectId: 7642 }, { name: "flask of demonic blood", objectId: 6558 }],
            uncommon: [{ name: "demonic essence", objectId: 6500 }, { name: "some grimeleech wings", objectId: 22730 }, { name: "fire mushroom", objectId: 3731 }, { name: "green mushroom", objectId: 3732 }, { name: "small diamond", objectId: 3028 }, { name: "small ruby", objectId: 3030 }, { name: "small topaz", objectId: 9057 }, { name: "small amethyst", objectId: 3033 }, { name: "underworld rod", objectId: 8082 }],
            semiRare: [{ name: "wand of voodoo", objectId: 8094 }, { name: "red gem", objectId: 3039 }, { name: "yellow gem", objectId: 3037 }, { name: "devil helmet", objectId: 3356 }, { name: "magma legs", objectId: 821 }, { name: "demon shield", objectId: 3420 }],
            rare: [{ name: "nightmare blade", objectId: 7418 }, { name: "blue gem", objectId: 3041 }, { name: "rift crossbow", objectId: 22867 }, { name: "steel boots", objectId: 3554 }, { name: "rift shield", objectId: 22726 }, { name: "rift lance", objectId: 22727 }, { name: "rift bow", objectId: 22866 }, { name: "abyss hammer", objectId: 7414 }, { name: "vile axe", objectId: 7388 }, { name: "magic plate armor", objectId: 3366 }],
          }
        },
        {
          id: "defiler",
          name: "Defiler",
          hp: 7300,
          exp: 3700,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Defiler.gif",
          damageElements: [{ element: 'earth', weight: 440 }, { element: 'physical', weight: 240 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 10, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: -25, kind: "fraco" },
            { element: "ice", value: 20, kind: "resistente" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "soul orb", objectId: 5944 }, { name: "demonic essence", objectId: 6500 }],
            uncommon: [{ name: "small emerald", objectId: 3032 }, { name: "talon", objectId: 3034 }, { name: "glob of acid slime", objectId: 9054 }, { name: "glob of tar", objectId: 9055 }],
            semiRare: [{ name: "small diamond", objectId: 3028 }, { name: "small ruby", objectId: 3030 }, { name: "yellow gem", objectId: 3037 }, { name: "red gem", objectId: 3039 }, { name: "death ring", objectId: 6299 }],
            rare: [{ name: "green gem", objectId: 3038 }, { name: "blue gem", objectId: 3041 }],
          }
        },
      ]
    },
    {
      id: "choking_fear",
      name: "Choking Fear",
      creatures: [
        {
          id: "choking_fear",
          name: "Choking Fear",
          hp: 11600,
          exp: 4700,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Choking_Fear.gif",
          damageElements: [{ element: 'death', weight: 1000 }, { element: 'physical', weight: 500 }],
          resistances: [
            { element: "physical", value: 10, kind: "resistente" },
            { element: "energy", value: 2, kind: "resistente" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 0, kind: "neutro" },
            { element: "ice", value: 10, kind: "resistente" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 55, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "great mana potion", objectId: 238 }, { name: "great spirit potion", objectId: 7642 }, { name: "brown crystal splinter", objectId: 16123 }],
            uncommon: [{ name: "brown piece of cloth", objectId: 5913 }, { name: "ultimate health potion", objectId: 7643 }, { name: "blue crystal splinter", objectId: 16124 }, { name: "dead weight", objectId: 20202 }, { name: "hemp rope", objectId: 20206 }],
            semiRare: [{ name: "energy ring", objectId: 3051 }, { name: "life ring", objectId: 3052 }, { name: "ring of healing", objectId: 3098 }, { name: "guardian shield", objectId: 3415 }, { name: "beastslayer axe", objectId: 3344 }, { name: "yellow piece of cloth", objectId: 5914 }, { name: "green crystal shard", objectId: 16121 }, { name: "cluster of solace", objectId: 20062 }],
            rare: [{ name: "terra boots", objectId: 813 }, { name: "spellbook of mind control", objectId: 8074 }, { name: "underworld rod", objectId: 8082 }, { name: "springsprout rod", objectId: 8084 }],
          }
        },
        {
          id: "retching_horror",
          name: "Retching Horror",
          hp: 10600,
          exp: 4100,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Retching_Horror.gif",
          damageElements: [{ element: 'physical', weight: 500 }, { element: 'fire', weight: 450 }],
          resistances: [
            { element: "physical", value: 5, kind: "resistente" },
            { element: "energy", value: -3, kind: "fraco" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 85, kind: "resistente" },
            { element: "ice", value: 15, kind: "resistente" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 20, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "brown mushroom", objectId: 3725 }, { name: "great mana potion", objectId: 238 }, { name: "great health potion", objectId: 239 }, { name: "goosebump leather", objectId: 20205 }, { name: "pool of chitinous glue", objectId: 20207 }],
            semiRare: [{ name: "fire sword", objectId: 3280 }, { name: "crown shield", objectId: 3419 }, { name: "beastslayer axe", objectId: 3344 }, { name: "mercenary sword", objectId: 7386 }, { name: "underworld rod", objectId: 8082 }, { name: "broken dream", objectId: 20029 }],
            rare: [{ name: "tower shield", objectId: 3428 }, { name: "spiked squelcher", objectId: 7452 }, { name: "wand of starstorm", objectId: 8072 }],
          }
        },
      ]
    },
    {
      id: "crazed_elfs",
      name: "Crazed Elf's",
      creatures: [
        {
          id: "crazed_summer_rearguard",
          name: "Crazed Summer Rearguard",
          hp: 10600,
          exp: 4700,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Crazed_Summer_Rearguard.gif",
          damageElements: [{ element: 'fire', weight: 600 }, { element: 'physical', weight: 450 }],
          resistances: [
            { element: "physical", value: -10, kind: "fraco" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 40, kind: "resistente" },
            { element: "ice", value: -25, kind: "fraco" },
            { element: "holy", value: 20, kind: "resistente" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "power bolt", objectId: 3450 }, { name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "heaven blossom", objectId: 3657 }, { name: "dream essence egg", objectId: 30005 }, { name: "elvish talisman", objectId: 9635 }, { name: "small enchanted ruby", objectId: 675 }],
            semiRare: [{ name: "violet crystal shard", objectId: 16120 }, { name: "red crystal fragment", objectId: 16126 }, { name: "leaf star", objectId: 25735 }, { name: "ring of blue plasma", objectId: 23529 }, { name: "wood cape", objectId: 3575 }, { name: "yellow gem", objectId: 3037 }],
            rare: [{ name: "small enchanted sapphire", objectId: 676 }, { name: "sun fruit", objectId: 29995 }, { name: "collar of blue plasma", objectId: 23542 }, { name: "small diamond", objectId: 3028 }, { name: "crystal crossbow", objectId: 16163 }],
          }
        },
        {
          id: "crazed_summer_vanguard",
          name: "Crazed Summer Vanguard",
          hp: 11000,
          exp: 5000,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Crazed_Summer_Vanguard.gif",
          damageElements: [{ element: 'fire', weight: 600 }, { element: 'physical', weight: 450 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: 0, kind: "neutro" },
            { element: "earth", value: 0, kind: "neutro" },
            { element: "fire", value: 50, kind: "resistente" },
            { element: "ice", value: -30, kind: "fraco" },
            { element: "holy", value: 20, kind: "resistente" },
            { element: "death", value: 0, kind: "neutro" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }, { name: "elven astral observer", objectId: 11465 }],
            uncommon: [{ name: "dream essence egg", objectId: 30005 }, { name: "belted cape", objectId: 8044 }, { name: "two handed sword", objectId: 3265 }, { name: "seeds", objectId: 647 }, { name: "scimitar", objectId: 3307 }, { name: "knife", objectId: 3291 }, { name: "dragon necklace", objectId: 3085 }, { name: "magma amulet", objectId: 817 }],
            semiRare: [{ name: "wand of dragonbreath", objectId: 3075 }, { name: "wand of draconia", objectId: 8093 }, { name: "magma boots", objectId: 818 }],
            rare: [{ name: "sun fruit", objectId: 29995 }, { name: "bullseye potion", objectId: 7443 }],
          }
        },
        {
          id: "crazed_winter_rearguard",
          name: "Crazed Winter Rearguard",
          hp: 10400,
          exp: 4700,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Crazed_Winter_Rearguard.gif",
          damageElements: [{ element: 'ice', weight: 1300 }, { element: 'physical', weight: 400 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: -15, kind: "fraco" },
            { element: "earth", value: -20, kind: "fraco" },
            { element: "fire", value: -20, kind: "fraco" },
            { element: "ice", value: 40, kind: "resistente" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 20, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "ice rapier", objectId: 3284 }, { name: "ultimate health potion", objectId: 7643 }, { name: "great spirit potion", objectId: 7642 }, { name: "ice flower", objectId: 29973 }, { name: "life crystal", objectId: 3061 }, { name: "dream essence egg", objectId: 30005 }, { name: "elven astral observer", objectId: 11465 }, { name: "glacier mask", objectId: 829 }],
            semiRare: [{ name: "moonlight rod", objectId: 3070 }, { name: "red crystal fragment", objectId: 16126 }, { name: "small enchanted sapphire", objectId: 676 }, { name: "northwind rod", objectId: 8083 }, { name: "glacier amulet", objectId: 815 }, { name: "hailstorm rod", objectId: 3067 }, { name: "glacier robe", objectId: 824 }, { name: "cyan crystal fragment", objectId: 16125 }, { name: "elven amulet", objectId: 3082 }],
            rare: [{ name: "red gem", objectId: 3039 }, { name: "blue gem", objectId: 3041 }],
          }
        },
        {
          id: "crazed_winter_vanguard",
          name: "Crazed Winter Vanguard",
          hp: 11600,
          exp: 5400,
          sprite: "https://www.tibiawiki.com.br/wiki/Special:FilePath/Crazed_Winter_Vanguard.gif",
          damageElements: [{ element: 'ice', weight: 1300 }, { element: 'physical', weight: 400 }],
          resistances: [
            { element: "physical", value: 0, kind: "neutro" },
            { element: "energy", value: -20, kind: "fraco" },
            { element: "earth", value: -15, kind: "fraco" },
            { element: "fire", value: -30, kind: "fraco" },
            { element: "ice", value: 50, kind: "resistente" },
            { element: "holy", value: 0, kind: "neutro" },
            { element: "death", value: 15, kind: "resistente" },
          ],
          drops: {
            common: [{ name: "platinum coin", objectId: 3035 }],
            uncommon: [{ name: "ice flower", objectId: 29973 }, { name: "small enchanted ruby", objectId: 675 }, { name: "miraculum", objectId: 11474 }, { name: "ultimate health potion", objectId: 7643 }, { name: "dream essence egg", objectId: 30005 }, { name: "tiger eye", objectId: 24961 }, { name: "northwind rod", objectId: 8083 }, { name: "glacier amulet", objectId: 815 }, { name: "ice rapier", objectId: 3284 }],
            semiRare: [{ name: "glacier robe", objectId: 824 }],
            rare: [{ name: "elven amulet", objectId: 3082 }, { name: "blue gem", objectId: 3041 }],
          }
        },
      ]
    },
    {
      id: 'guzzlemaw',
      name: 'Guzzlemaw',
      creatures: [
        {
          id: 'guzzlemaw',
          name: 'Guzzlemaw',
          hp: 12800,
          exp: 6050,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Guzzlemaw.gif',
          damageElements: [{ element: 'physical', weight: 1050 }, { element: 'death', weight: 800 }],
          resistances: [
            { element: 'physical', value: 5, kind: 'resistente' },
            { element: 'energy', value: 15, kind: 'resistente' },
            { element: 'earth', value: 20, kind: 'resistente' },
            { element: 'fire', value: 10, kind: 'resistente' },
            { element: 'ice', value: 5, kind: 'resistente' },
            { element: 'holy', value: -5, kind: 'fraco' },
            { element: 'death', value: 10, kind: 'resistente' }
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'banana skin', objectId: 3104 }, { name: 'piece of iron', objectId: 3110 }, { name: 'fishbone', objectId: 3111 }, { name: 'skull', objectId: 3114 }, { name: 'bone', objectId: 1047 }, { name: 'fish', objectId: 3578 }, { name: 'ham', objectId: 3582 }, { name: 'fish fin', objectId: 5895 }, { name: 'hardened bone', objectId: 5925 }, { name: 'fish tail', objectId: 5951 }, { name: 'great mana potion', objectId: 238 }, { name: 'great health potion', objectId: 239 }, { name: 'brown crystal splinter', objectId: 16123 }, { name: 'red crystal fragment', objectId: 16126 }, { name: 'crystal rubbish', objectId: 16279 }, { name: 'cluster of solace', objectId: 20062 }, { name: 'frazzle tongue', objectId: 20198 }, { name: 'frazzle skin', objectId: 20199 }],
            semiRare: [{ name: 'big bone', objectId: 3116 }, { name: 'two handed sword', objectId: 3265 }, { name: 'iron ore', objectId: 5880 }, { name: 'assassin dagger', objectId: 7404 }, { name: 'haunted blade', objectId: 7407 }, { name: 'sai', objectId: 50183 }, { name: 'violet crystal shard', objectId: 16120 }],
            rare: [{ name: 'nightmare blade', objectId: 7418 }],
          }
        },
        {
          id: 'frazzlemaw',
          name: 'Frazzlemaw',
          hp: 8200,
          exp: 3740,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Frazzlemaw.gif',
          damageElements: [{ element: 'physical', weight: 950 }, { element: 'death', weight: 600 }],
          resistances: [
            { element: 'physical', value: 5, kind: 'resistente' },
            { element: 'energy', value: 15, kind: 'resistente' },
            { element: 'earth', value: 20, kind: 'resistente' },
            { element: 'fire', value: 10, kind: 'resistente' },
            { element: 'ice', value: 5, kind: 'resistente' },
            { element: 'holy', value: -5, kind: 'fraco' },
            { element: 'death', value: 10, kind: 'resistente' }
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'banana skin', objectId: 3104 }, { name: 'piece of iron', objectId: 3110 }, { name: 'fishbone', objectId: 3111 }, { name: 'skull', objectId: 3114 }, { name: 'bone', objectId: 1047 }, { name: 'big bone', objectId: 3116 }, { name: 'fish', objectId: 3578 }, { name: 'ham', objectId: 3582 }, { name: 'hardened bone', objectId: 5925 }, { name: 'fish tail', objectId: 5951 }, { name: 'great mana potion', objectId: 238 }, { name: 'great health potion', objectId: 239 }, { name: 'brown crystal splinter', objectId: 16123 }, { name: 'red crystal fragment', objectId: 16126 }, { name: 'crystal rubbish', objectId: 16279 }, { name: 'frazzle tongue', objectId: 20198 }, { name: 'frazzle skin', objectId: 20199 }],
            semiRare: [{ name: 'two handed sword', objectId: 3265 }, { name: 'iron ore', objectId: 5880 }, { name: 'fish fin', objectId: 5895 }, { name: 'assassin dagger', objectId: 7404 }, { name: 'haunted blade', objectId: 7407 }, { name: 'nightmare blade', objectId: 7418 }, { name: 'gold ingot', objectId: 9058 }, { name: 'sai', objectId: 50183 }, { name: 'violet crystal shard', objectId: 16120 }, { name: 'cluster of solace', objectId: 20062 }],
          }
        },
        {
          id: 'silencer',
          name: 'Silencer',
          hp: 10800,
          exp: 5100,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Silencer.gif',
          damageElements: [{ element: 'physical', weight: 350 }],
          resistances: [
            { element: 'physical', value: 5, kind: 'resistente' },
            { element: 'energy', value: 15, kind: 'resistente' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 30, kind: 'resistente' },
            { element: 'ice', value: 15, kind: 'resistente' },
            { element: 'holy', value: -25, kind: 'fraco' },
            { element: 'death', value: 65, kind: 'resistente' }
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'assassin star', objectId: 7368 }, { name: 'silencer claws', objectId: 20200 }, { name: 'silencer resonating chamber', objectId: 20201 }],
            semiRare: [{ name: 'stealth ring', objectId: 3049 }, { name: 'dark shield', objectId: 3421 }, { name: 'haunted blade', objectId: 7407 }, { name: 'titan axe', objectId: 7413 }, { name: 'glorious axe', objectId: 7454 }, { name: 'cluster of solace', objectId: 20062 }],
            rare: [{ name: 'boots of haste', objectId: 3079 }, { name: 'diamond sceptre', objectId: 7387 }, { name: 'shadow sceptre', objectId: 7451 }, { name: 'terra legs', objectId: 812 }, { name: 'terra boots', objectId: 813 }],
          }
        }
      ]
    },
    {
      id: 'raubritter',
      name: 'Raubritter',
      creatures: [
        {
          id: 'raubritter_chastener',
          name: 'Raubritter Chastener',
          hp: 20000,
          exp: 9500,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Raubritter_Chastener.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: -20, kind: 'fraco' },
            { element: 'energy', value: 15, kind: 'resistente' },
            { element: 'earth', value: -12, kind: 'fraco' },
            { element: 'fire', value: -6, kind: 'fraco' },
            { element: 'ice', value: 25, kind: 'resistente' },
            { element: 'holy', value: 15, kind: 'resistente' },
            { element: 'death', value: 0, kind: 'neutro' }
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'small amethyst', objectId: 3033 }, { name: 'small ruby', objectId: 3030 }],
            semiRare: [{ name: 'magma monocle', objectId: 827 }, { name: 'wand of cosmic energy', objectId: 3073 }, { name: 'stag parchment', objectId: 52664 }, { name: 'silver poniard', objectId: 52662 }, { name: 'wand of starstorm', objectId: 8072 }, { name: 'violet gem', objectId: 3036 }, { name: 'wooden spellbook', objectId: 25699 }],
            rare: [{ name: 'lightning robe', objectId: 825 }, { name: 'shockwave amulet', objectId: 9304 }, { name: 'magma amulet', objectId: 817 }, { name: 'bottle of raubritter lager', objectId: 52745 }, { name: 'crystal coin', objectId: 3043 }],
          }
        },
        {
          id: 'raubritter_marksman',
          name: 'Raubritter Marksman',
          hp: 21000,
          exp: 9025,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Raubritter_Marksman.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: -16, kind: 'fraco' },
            { element: 'energy', value: 12, kind: 'resistente' },
            { element: 'earth', value: -12, kind: 'fraco' },
            { element: 'fire', value: -12, kind: 'fraco' },
            { element: 'ice', value: 15, kind: 'resistente' },
            { element: 'holy', value: 15, kind: 'resistente' },
            { element: 'death', value: 0, kind: 'neutro' }
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'cuirass plate', objectId: 52663 }],
            semiRare: [{ name: 'stag parchment', objectId: 52664 }, { name: 'blue crystal shard', objectId: 16119 }, { name: 'violet crystal shard', objectId: 16120 }, { name: 'green crystal shard', objectId: 16121 }],
            rare: [{ name: 'terra mantle', objectId: 811 }, { name: 'green gem', objectId: 3038 }, { name: 'blue gem', objectId: 3041 }, { name: 'crystalline arrow', objectId: 15793 }, { name: 'composite hornbow', objectId: 8027 }, { name: 'violet gem', objectId: 3036 }],
          }
        },
        {
          id: 'raubritter_skirmisher',
          name: 'Raubritter Skirmisher',
          hp: 22000,
          exp: 8550,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Raubritter_Skirmisher.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: -12, kind: 'fraco' },
            { element: 'energy', value: 9, kind: 'resistente' },
            { element: 'earth', value: -6, kind: 'fraco' },
            { element: 'fire', value: -15, kind: 'fraco' },
            { element: 'ice', value: 20, kind: 'resistente' },
            { element: 'holy', value: 15, kind: 'resistente' },
            { element: 'death', value: 0, kind: 'neutro' }
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            semiRare: [{ name: 'cuirass plate', objectId: 52663 }, { name: 'silver poniard', objectId: 52662 }, { name: 'gold ring', objectId: 3063 }, { name: 'fur armor', objectId: 22085 }, { name: 'mercenary sword', objectId: 7386 }, { name: 'crown shield', objectId: 3419 }],
            rare: [{ name: 'gold ingot', objectId: 9058 }, { name: 'crown armor', objectId: 3381 }, { name: 'marinated sturgeon', objectId: 52638 }],
          }
        }
      ]
    },
    {
      id: 'catacomb',
      name: 'Catacomb',
      creatures: [
        {
          id: 'demon',
          name: 'Demon',
          hp: 16400,
          exp: 6000,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Demon.gif',
          damageElements: [{ element: 'physical', weight: 500 }, { element: 'death', weight: 480 }, { element: 'energy', weight: 300 }, { element: 'fire', weight: 250 }],
          resistances: [
            { element: 'physical', value: 25, kind: 'resistente' },
            { element: 'energy', value: 50, kind: 'resistente' },
            { element: 'earth', value: 40, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: -12, kind: 'fraco' },
            { element: 'holy', value: -12, kind: 'fraco' },
            { element: 'death', value: 20, kind: 'resistente' }
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'great mana potion', objectId: 238 }],
            uncommon: [{ name: 'small emerald', objectId: 3032 }, { name: 'small amethyst', objectId: 3033 }, { name: 'small ruby', objectId: 3030 }, { name: 'small topaz', objectId: 9057 }, { name: 'demonic essence', objectId: 6500 }, { name: 'fire mushroom', objectId: 3731 }, { name: 'demon horn', objectId: 5954 }, { name: 'assassin star', objectId: 7368 }, { name: 'ultimate health potion', objectId: 7643 }, { name: 'great spirit potion', objectId: 7642 }],
            semiRare: [{ name: 'purple tome', objectId: 2848 }, { name: 'talon', objectId: 3034 }, { name: 'might ring', objectId: 3048 }, { name: 'orb', objectId: 3060 }, { name: 'gold ring', objectId: 3063 }, { name: 'giant sword', objectId: 3281 }, { name: 'ice rapier', objectId: 3284 }, { name: 'golden sickle', objectId: 3306 }, { name: 'fire axe', objectId: 3320 }, { name: 'devil helmet', objectId: 3356 }],
            rare: [{ name: 'platinum amulet', objectId: 3055 }, { name: 'golden legs', objectId: 3364 }, { name: 'magic plate armor', objectId: 3366 }, { name: 'mastermind shield', objectId: 3414 }, { name: 'demon shield', objectId: 3420 }, { name: 'demonrage sword', objectId: 7382 }],
          }
        },
        {
          id: 'grim_reaper',
          name: 'Grim Reaper',
          hp: 7800,
          exp: 5500,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Grim_Reaper.gif',
          damageElements: [{ element: 'death', weight: 995 }, { element: 'physical', weight: 785 }],
          resistances: [
            { element: 'physical', value: 25, kind: 'resistente' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: 40, kind: 'resistente' },
            { element: 'fire', value: -10, kind: 'fraco' },
            { element: 'ice', value: 65, kind: 'resistente' },
            { element: 'holy', value: -10, kind: 'fraco' },
            { element: 'death', value: 80, kind: 'resistente' }
          ],
          drops: {
            common: [{ name: 'flask of demonic blood', objectId: 6558 }],
            uncommon: [{ name: 'platinum coin', objectId: 3035 }, { name: 'scythe', objectId: 3453 }, { name: 'demonic essence', objectId: 6500 }, { name: 'great mana potion', objectId: 238 }, { name: 'ultimate health potion', objectId: 7643 }, { name: 'mystical hourglass', objectId: 9660 }],
            semiRare: [{ name: 'magic light wand', objectId: 3046 }, { name: 'dark shield', objectId: 3421 }, { name: 'orichalcum pearl', objectId: 5021 }, { name: 'slightly rusted armor', objectId: 8896 }],
            rare: [{ name: 'death ring', objectId: 6299 }, { name: 'nightmare blade', objectId: 7418 }, { name: 'glacier kilt', objectId: 823 }, { name: 'skullcracker armor', objectId: 8061 }, { name: 'underworld rod', objectId: 8082 }],
          }
        },
        {
          id: 'destroyer',
          name: 'Destroyer',
          hp: 7400,
          exp: 2500,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Destroyer.gif',
          damageElements: [{ element: 'physical', weight: 700 }],
          resistances: [
            { element: 'physical', value: 20, kind: 'resistente' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 20, kind: 'resistente' },
            { element: 'fire', value: 30, kind: 'resistente' },
            { element: 'ice', value: -15, kind: 'fraco' },
            { element: 'holy', value: -3, kind: 'fraco' },
            { element: 'death', value: 20, kind: 'resistente' }
          ],
          drops: {
            common: [{ name: 'meat', objectId: 3577 }],
            uncommon: [{ name: 'small amethyst', objectId: 3033 }, { name: 'crowbar', objectId: 3304 }, { name: 'dark armor', objectId: 3383 }, { name: 'soul orb', objectId: 5944 }, { name: 'demonic essence', objectId: 6500 }],
            semiRare: [{ name: 'platinum coin', objectId: 3035 }, { name: 'giant sword', objectId: 3281 }, { name: 'plate armor', objectId: 3357 }, { name: 'great health potion', objectId: 239 }, { name: 'metal spike', objectId: 10298 }],
            rare: [{ name: 'crystal necklace', objectId: 3008 }, { name: 'mind stone', objectId: 3062 }, { name: 'steel boots', objectId: 3554 }, { name: 'skull helmet', objectId: 5741 }, { name: 'dreaded cleaver', objectId: 7419 }, { name: 'chaos mace', objectId: 7427 }],
          }
        },
        {
          id: 'hellspawn',
          name: 'Hellspawn',
          hp: 7000,
          exp: 2550,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Hellspawn.gif',
          damageElements: [{ element: 'physical', weight: 350 }, { element: 'fire', weight: 175 }],
          resistances: [
            { element: 'physical', value: 10, kind: 'resistente' },
            { element: 'energy', value: 10, kind: 'resistente' },
            { element: 'earth', value: 80, kind: 'resistente' },
            { element: 'fire', value: 40, kind: 'resistente' },
            { element: 'ice', value: -10, kind: 'fraco' },
            { element: 'holy', value: 30, kind: 'resistente' },
            { element: 'death', value: -5, kind: 'fraco' }
          ],
          drops: {
            common: [{ name: 'great health potion', objectId: 239 }, { name: 'hellspawn tail', objectId: 10304 }],
            uncommon: [{ name: 'morning star', objectId: 3282 }, { name: 'red mushroom', objectId: 3724 }, { name: 'demonic essence', objectId: 6500 }, { name: 'battle shield', objectId: 3413 }, { name: 'assassin star', objectId: 7368 }, { name: 'ultimate health potion', objectId: 7643 }, { name: 'small topaz', objectId: 9057 }],
            semiRare: [{ name: 'warrior helmet', objectId: 3369 }, { name: 'knight legs', objectId: 3371 }, { name: 'rusted armor', objectId: 8895 }, { name: 'slightly rusted armor', objectId: 8896 }],
            rare: [{ name: 'onyx flail', objectId: 7421 }, { name: 'berserk potion', objectId: 7439 }, { name: 'spiked squelcher', objectId: 7452 }, { name: 'dracoyle statue', objectId: 9034 }, { name: 'black skull', objectId: 9056 }],
          }
        }
      ]
    },
    {
      id: 'prison',
      name: 'Prison',
      creatures: [
        {
          id: 'plaguesmith',
          name: 'Plaguesmith',
          hp: 16500,
          exp: 3800,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Plaguesmith.gif',
          damageElements: [{ element: 'physical', weight: 400 }, { element: 'death', weight: 350 }, { element: 'earth', weight: 114 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 30, kind: 'resistente' },
            { element: 'ice', value: 20, kind: 'resistente' },
            { element: 'holy', value: -10, kind: 'fraco' },
            { element: 'death', value: 10, kind: 'resistente' }
          ],
          drops: {
            common: [{ name: 'piece of iron', objectId: 3110 }, { name: 'mouldy cheese', objectId: 3120 }, { name: 'dirty cape', objectId: 3122 }, { name: 'two handed sword', objectId: 3265 }, { name: 'morning star', objectId: 3282 }, { name: 'battle hammer', objectId: 3305 }, { name: 'steel shield', objectId: 3409 }],
            uncommon: [{ name: 'small amethyst', objectId: 3033 }, { name: 'platinum coin', objectId: 3035 }, { name: 'knight legs', objectId: 3371 }, { name: 'soul orb', objectId: 5944 }, { name: 'demonic essence', objectId: 6500 }, { name: 'onyx arrow', objectId: 7365 }, { name: 'great health potion', objectId: 239 }],
            semiRare: [{ name: 'silver brooch', objectId: 3017 }, { name: 'axe ring', objectId: 3092 }, { name: 'club ring', objectId: 3093 }, { name: 'war hammer', objectId: 3279 }, { name: 'steel boots', objectId: 3554 }, { name: 'piece of royal steel', objectId: 5887 }, { name: 'piece of hell steel', objectId: 5888 }, { name: 'piece of draconian steel', objectId: 5889 }],
            rare: [{ name: 'emerald bangle', objectId: 3010 }, { name: 'hammer of wrath', objectId: 3332 }, { name: 'slightly rusted armor', objectId: 8896 }],
          }
        },
        {
          id: 'demon_outcast',
          name: 'Demon Outcast',
          hp: 13800,
          exp: 6200,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Demon_Outcast.gif',
          damageElements: [{ element: 'energy', weight: 450 }, { element: 'death', weight: 400 }, { element: 'physical', weight: 400 }],
          resistances: [
            { element: 'physical', value: 15, kind: 'resistente' },
            { element: 'energy', value: -8, kind: 'fraco' },
            { element: 'earth', value: 40, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 5, kind: 'resistente' },
            { element: 'holy', value: -6, kind: 'fraco' },
            { element: 'death', value: 30, kind: 'resistente' }
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'fire mushroom', objectId: 3731 }, { name: 'ultimate health potion', objectId: 7643 }],
            uncommon: [{ name: 'small diamond', objectId: 3028 }, { name: 'small sapphire', objectId: 3029 }, { name: 'small ruby', objectId: 3030 }, { name: 'small emerald', objectId: 3032 }, { name: 'assassin star', objectId: 7368 }, { name: 'great mana potion', objectId: 238 }, { name: 'small topaz', objectId: 9057 }],
            semiRare: [{ name: 'platinum amulet', objectId: 3055 }, { name: 'giant sword', objectId: 3281 }, { name: 'cluster of solace', objectId: 20062 }],
            rare: [{ name: 'might ring', objectId: 3048 }, { name: 'ice rapier', objectId: 3284 }, { name: 'devil helmet', objectId: 3356 }, { name: 'crusader helmet', objectId: 3391 }, { name: 'crown shield', objectId: 3419 }, { name: 'demon shield', objectId: 3420 }, { name: 'demonrage sword', objectId: 7382 }],
          }
        },
        {
          id: 'dark_torturer',
          name: 'Dark Torturer',
          hp: 14700,
          exp: 4650,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Dark_Torturer.gif',
          damageElements: [{ element: 'physical', weight: 1213 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 30, kind: 'resistente' },
            { element: 'earth', value: 90, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: -10, kind: 'fraco' },
            { element: 'holy', value: -10, kind: 'fraco' },
            { element: 'death', value: 10, kind: 'resistente' }
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'ham', objectId: 3582 }, { name: 'soul orb', objectId: 5944 }, { name: 'flask of demonic blood', objectId: 6558 }],
            uncommon: [{ name: 'saw', objectId: 3461 }, { name: 'steel boots', objectId: 3554 }, { name: 'demonic essence', objectId: 6500 }, { name: 'great mana potion', objectId: 238 }, { name: 'great health potion', objectId: 239 }],
            semiRare: [{ name: 'orichalcum pearl', objectId: 5021 }, { name: 'cat\'s paw', objectId: 5479 }, { name: 'jewelled backpack', objectId: 5801 }, { name: 'death ring', objectId: 6299 }, { name: 'assassin star', objectId: 7368 }, { name: 'gold ingot', objectId: 9058 }],
            rare: [{ name: 'golden legs', objectId: 3364 }, { name: 'vile axe', objectId: 7388 }, { name: 'butcher\'s axe', objectId: 7412 }],
          }
        },
        {
          id: 'blightwalker',
          name: 'Blightwalker',
          hp: 16200,
          exp: 6400,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Blightwalker.gif',
          damageElements: [{ element: 'physical', weight: 490 }, { element: 'earth', weight: 405 }, { element: 'death', weight: 135 }],
          resistances: [
            { element: 'physical', value: -10, kind: 'fraco' },
            { element: 'energy', value: 20, kind: 'resistente' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 50, kind: 'resistente' },
            { element: 'ice', value: 15, kind: 'resistente' },
            { element: 'holy', value: -30, kind: 'fraco' },
            { element: 'death', value: 0, kind: 'neutro' }
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'blank rune', objectId: 3147 }, { name: 'bunch of wheat', objectId: 3605 }, { name: 'soul orb', objectId: 5944 }, { name: 'demonic essence', objectId: 6500 }, { name: 'great mana potion', objectId: 238 }],
            uncommon: [{ name: 'hailstorm rod', objectId: 3067 }, { name: 'assassin star', objectId: 7368 }, { name: 'ultimate health potion', objectId: 7643 }, { name: 'gold ingot', objectId: 9058 }, { name: 'bundle of cursed straw', objectId: 9688 }],
            semiRare: [{ name: 'gold ring', objectId: 3063 }, { name: 'garlic necklace', objectId: 3083 }, { name: 'skull staff', objectId: 3324 }, { name: 'scythe', objectId: 3453 }, { name: 'seeds', objectId: 647 }, { name: 'terra mantle', objectId: 811 }, { name: 'terra legs', objectId: 812 }],
            rare: [{ name: 'amulet of loss', objectId: 3057 }, { name: 'golden sickle', objectId: 3306 }],
          }
        }
      ]
    },
    {
      id: 'lion_knight',
      name: 'Lion Knight',
      creatures: [
        {
          id: 'usurper_knight',
          name: 'Usurper Knight',
          hp: 16400,
          exp: 6900,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Usurper_Knight.gif',
          damageElements: [{ element: 'ice', weight: 850 }, { element: 'physical', weight: 500 }, { element: 'death', weight: 300 }],
          resistances: [
            { element: 'physical', value: 35, kind: 'resistente' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 10, kind: 'resistente' },
            { element: 'ice', value: 20, kind: 'resistente' },
            { element: 'holy', value: 15, kind: 'resistente' },
            { element: 'death', value: -15, kind: 'fraco' }
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'leather legs', objectId: 3559 }],
            uncommon: [{ name: 'meat', objectId: 3577 }, { name: 'lion cloak patch', objectId: 34162 }, { name: 'violet gem', objectId: 3036 }, { name: 'gold ingot', objectId: 9058 }, { name: 'lion crest', objectId: 34160 }, { name: 'knight legs', objectId: 3371 }],
            semiRare: [{ name: 'great mana potion', objectId: 238 }, { name: 'blue gem', objectId: 3041 }, { name: 'green gem', objectId: 3038 }],
            rare: [{ name: 'magma legs', objectId: 821 }],
          }
        },
        {
          id: 'usurper_warlock',
          name: 'Usurper Warlock',
          hp: 15000,
          exp: 7000,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Usurper_Warlock.gif',
          damageElements: [{ element: 'death', weight: 530 }, { element: 'physical', weight: 500 }, { element: 'ice', weight: 450 }],
          resistances: [
            { element: 'physical', value: 10, kind: 'resistente' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 5, kind: 'resistente' },
            { element: 'ice', value: 30, kind: 'resistente' },
            { element: 'holy', value: 32, kind: 'resistente' },
            { element: 'death', value: -10, kind: 'fraco' }
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'gold ingot', objectId: 9058 }, { name: 'lion cloak patch', objectId: 34162 }, { name: 'lion crest', objectId: 34160 }, { name: 'black pearl', objectId: 3027 }],
            semiRare: [{ name: 'terra hood', objectId: 830 }, { name: 'lightning headband', objectId: 828 }, { name: 'green gem', objectId: 3038 }, { name: 'springsprout rod', objectId: 8084 }, { name: 'ham', objectId: 3582 }, { name: 'magma monocle', objectId: 827 }, { name: 'wand of cosmic energy', objectId: 3073 }, { name: 'underworld rod', objectId: 8082 }, { name: 'knight legs', objectId: 3371 }],
            rare: [{ name: 'wand of starstorm', objectId: 8072 }],
          }
        },
        {
          id: 'usurper_archer',
          name: 'Usurper Archer',
          hp: 14600,
          exp: 6800,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Usurper_Archer.gif',
          damageElements: [{ element: 'death', weight: 1030 }, { element: 'physical', weight: 430 }, { element: 'ice', weight: 425 }],
          resistances: [
            { element: 'physical', value: 10, kind: 'resistente' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 10, kind: 'resistente' },
            { element: 'ice', value: 20, kind: 'resistente' },
            { element: 'holy', value: 10, kind: 'resistente' },
            { element: 'death', value: -20, kind: 'fraco' }
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'ultimate health potion', objectId: 7643 }, { name: 'meat', objectId: 3577 }],
            uncommon: [{ name: 'broken longbow', objectId: 34161 }, { name: 'lion cloak patch', objectId: 34162 }, { name: 'black pearl', objectId: 3027 }, { name: 'warrior helmet', objectId: 3369 }, { name: 'mino shield', objectId: 21175 }, { name: 'silver brooch', objectId: 3017 }, { name: 'knife', objectId: 3291 }, { name: 'lion crest', objectId: 34160 }],
            semiRare: [{ name: 'gemmed figurine', objectId: 24392 }, { name: 'white pearl', objectId: 3026 }, { name: 'glacier shoes', objectId: 819 }, { name: 'knight armor', objectId: 3370 }, { name: 'coral brooch', objectId: 24391 }, { name: 'assassin dagger', objectId: 7404 }],
            rare: [{ name: 'ornate crossbow', objectId: 14247 }, { name: 'emerald bangle', objectId: 3010 }, { name: 'wood cape', objectId: 3575 }, { name: 'elvish bow', objectId: 7438 }],
          }
        }
      ]
    },
    {
      id: 'mega_dragon',
      name: 'Mega Dragon',
      creatures: [
        {
          id: 'dragolisk',
          name: 'Dragolisk',
          hp: 12360,
          exp: 5050,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Dragolisk.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 15, kind: 'resistente' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: -10, kind: 'fraco' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: -5, kind: 'fraco' },
            { element: 'holy', value: -15, kind: 'fraco' },
            { element: 'death', value: -10, kind: 'fraco' }
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'dragolisk poison gland', objectId: 44747 }, { name: 'nimmersatt\'s seal', objectId: 44743 }, { name: 'dragolisk eye', objectId: 44746 }, { name: 'red gem', objectId: 3039 }, { name: 'giant shimmering pearl', objectId: 282 }, { name: 'green gem', objectId: 3038 }],
            semiRare: [{ name: 'dragon\'s tail', objectId: 11457 }, { name: 'ultimate health potion', objectId: 7643 }],
            rare: [{ name: 'dragon shield', objectId: 3416 }],
          }
        },
        {
          id: 'mega_dragon',
          name: 'Mega Dragon',
          hp: 15840,
          exp: 6790,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Mega_Dragon.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: -10, kind: 'fraco' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: -10, kind: 'fraco' },
            { element: 'death', value: 0, kind: 'neutro' }
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'nimmersatt\'s seal', objectId: 44743 }, { name: 'ultimate health potion', objectId: 7643 }, { name: 'red gem', objectId: 3039 }],
            semiRare: [{ name: 'molten dragon essence', objectId: 44744 }, { name: 'prismatic quartz', objectId: 24962 }, { name: 'ultimate mana potion', objectId: 23373 }, { name: 'rainbow quartz', objectId: 25737 }, { name: 'blue gem', objectId: 3041 }, { name: 'mega dragon heart', objectId: 44745 }, { name: 'violet gem', objectId: 3036 }],
            rare: [{ name: 'dragon slayer', objectId: 7402 }],
          }
        },
        {
          id: 'wardragon',
          name: 'Wardragon',
          hp: 13920,
          exp: 5810,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Wardragon.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: -5, kind: 'fraco' },
            { element: 'earth', value: -10, kind: 'fraco' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: -10, kind: 'fraco' },
            { element: 'holy', value: -5, kind: 'fraco' },
            { element: 'death', value: 0, kind: 'neutro' }
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'wardragon claw', objectId: 44748 }, { name: 'nimmersatt\'s seal', objectId: 44743 }, { name: 'dragon tongue', objectId: 24938 }, { name: 'wardragon tooth', objectId: 44749 }, { name: 'gold ingot', objectId: 9058 }],
            semiRare: [{ name: 'onyx chip', objectId: 22193 }, { name: 'black pearl', objectId: 3027 }, { name: 'white gem', objectId: 32769 }],
            rare: [{ name: 'dragonbone staff', objectId: 7436 }],
          }
        }
      ]
    },
    {
      id: 'naga_lair',
      name: 'Naga Lair',
      lean: 'exp',
      creatures: [
        {
          id: 'naga_archer',
          name: 'Naga Archer',
          hp: 9280,
          exp: 5150,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Naga_Archer.gif',
          damageElements: [{ element: 'death', weight: 767 }, { element: 'physical', weight: 171 }],
          resistances: [
            { element: 'physical', value: -10, kind: 'fraco' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: -15, kind: 'fraco' },
            { element: 'fire', value: 20, kind: 'resistente' },
            { element: 'ice', value: 20, kind: 'resistente' },
            { element: 'holy', value: -20, kind: 'fraco' },
            { element: 'death', value: 10, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'naga archer scales', objectId: 39413 }, { name: 'naga earring', objectId: 39412 }, { name: 'naga armring', objectId: 39411 }],
            semiRare: [{ name: 'hunting spear', objectId: 3347 }, { name: 'crossbow', objectId: 3349 }, { name: 'blue crystal shard', objectId: 16119 }, { name: 'bow', objectId: 3350 }],
            rare: [{ name: 'elvish bow', objectId: 7438 }, { name: 'ornate crossbow', objectId: 14247 }, { name: 'crystal crossbow', objectId: 16163 }, { name: 'emerald bangle', objectId: 3010 }, { name: 'silver brooch', objectId: 3017 }],
          }
        },
        {
          id: 'naga_warrior',
          name: 'Naga Warrior',
          hp: 11060,
          exp: 5890,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Naga_Warrior.gif',
          damageElements: [{ element: 'death', weight: 330 }, { element: 'physical', weight: 330 }],
          resistances: [
            { element: 'physical', value: 20, kind: 'resistente' },
            { element: 'energy', value: -5, kind: 'fraco' },
            { element: 'earth', value: -5, kind: 'fraco' },
            { element: 'fire', value: 10, kind: 'resistente' },
            { element: 'ice', value: 10, kind: 'resistente' },
            { element: 'holy', value: -20, kind: 'fraco' },
            { element: 'death', value: 10, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'dagger', objectId: 3267 }],
            uncommon: [{ name: 'strong health potion', objectId: 236 }, { name: 'naga warrior scales', objectId: 39414 }, { name: 'naga earring', objectId: 39412 }],
            semiRare: [{ name: 'naga armring', objectId: 39411 }, { name: 'plate armor', objectId: 3357 }, { name: 'spiky club', objectId: 17859 }, { name: 'serpent sword', objectId: 3297 }, { name: 'violet crystal shard', objectId: 16120 }, { name: 'katana', objectId: 3300 }, { name: 'knight armor', objectId: 3370 }],
            rare: [{ name: 'relic sword', objectId: 7383 }],
          }
        },
        {
          id: 'makara',
          name: 'Makara',
          hp: 10100,
          exp: 5720,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Makara.gif',
          damageElements: [{ element: 'ice', weight: 1078 }, { element: 'physical', weight: 676 }],
          resistances: [
            { element: 'physical', value: -10, kind: 'fraco' },
            { element: 'energy', value: -15, kind: 'fraco' },
            { element: 'earth', value: -15, kind: 'fraco' },
            { element: 'fire', value: 5, kind: 'resistente' },
            { element: 'ice', value: 25, kind: 'resistente' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: -5, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'makara tongue', objectId: 39402 }, { name: 'makara fin', objectId: 39401 }, { name: 'meat', objectId: 3577 }],
            semiRare: [{ name: 'cyan crystal fragment', objectId: 16125 }, { name: 'yellow gem', objectId: 3037 }, { name: 'rainbow quartz', objectId: 25737 }, { name: 'small diamond', objectId: 3028 }, { name: 'blue gem', objectId: 3041 }, { name: 'green crystal shard', objectId: 16121 }, { name: 'green crystal fragment', objectId: 16127 }],
            rare: [{ name: 'sea horse figurine', objectId: 31323 }],
          }
        }
      ]
    },
    {
      id: 'true_azura',
      name: 'True Azura',
      lean: 'exp',
      creatures: [
        {
          id: 'true_dawnfire_asura',
          name: 'True Dawnfire Asura',
          hp: 17000,
          exp: 7475,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/True_Dawnfire_Asura.gif',
          damageElements: [{ element: 'fire', weight: 830 }, { element: 'death', weight: 750 }, { element: 'physical', weight: 700 }],
          resistances: [
            { element: 'physical', value: -10, kind: 'fraco' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: -5, kind: 'fraco' },
            { element: 'holy', value: -10, kind: 'fraco' },
            { element: 'death', value: 20, kind: 'resistente' },
          ],
          drops: {
            uncommon: [{ name: 'small enchanted ruby', objectId: 675 }],
            semiRare: [{ name: 'crystal coin', objectId: 3043 }, { name: 'royal star', objectId: 25759 }],
          }
        },
        {
          id: 'true_frost_flower_asura',
          name: 'True Frost Flower Asura',
          hp: 8000,
          exp: 7069,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/True_Frost_Flower_Asura.gif',
          damageElements: [{ element: 'ice', weight: 275 }, { element: 'physical', weight: 250 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: -10, kind: 'fraco' },
            { element: 'fire', value: -10, kind: 'fraco' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 30, kind: 'resistente' },
            { element: 'death', value: 20, kind: 'resistente' },
          ],
          drops: {
            uncommon: [{ name: 'crystal coin', objectId: 3043 }, { name: 'small enchanted sapphire', objectId: 676 }],
            semiRare: [{ name: 'royal star', objectId: 25759 }, { name: 'northwind rod', objectId: 8083 }],
          }
        },
        {
          id: 'true_midnight_asura',
          name: 'True Midnight Asura',
          hp: 18000,
          exp: 7313,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/True_Midnight_Asura.gif',
          damageElements: [{ element: 'death', weight: 890 }, { element: 'physical', weight: 450 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: -10, kind: 'fraco' },
            { element: 'fire', value: 10, kind: 'resistente' },
            { element: 'ice', value: 10, kind: 'resistente' },
            { element: 'holy', value: 30, kind: 'resistente' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            uncommon: [{ name: 'crystal coin', objectId: 3043 }],
            semiRare: [{ name: 'violet gem', objectId: 3036 }, { name: 'royal star', objectId: 25759 }, { name: 'small enchanted amethyst', objectId: 678 }],
          }
        }
      ]
    },
    {
      id: 'freakish_lost_soul',
      name: 'Freakish Lost Soul',
      lean: 'exp',
      creatures: [
        {
          id: 'freakish_lost_soul',
          name: 'Freakish Lost Soul',
          hp: 14000,
          exp: 7020,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Freakish_Lost_Soul.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 60, kind: 'resistente' },
            { element: 'energy', value: 35, kind: 'resistente' },
            { element: 'earth', value: 70, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: -40, kind: 'fraco' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'lost soul', objectId: 5809 }],
            uncommon: [{ name: 'platinum coin', objectId: 3035 }, { name: 'death toll', objectId: 32703 }, { name: 'emerald bangle', objectId: 3010 }],
            semiRare: [{ name: 'gemmed figurine', objectId: 24392 }, { name: 'ensouled essence', objectId: 32698 }, { name: 'silver hand mirror', objectId: 32772 }, { name: 'ornate crossbow', objectId: 14247 }],
            rare: [{ name: 'crystal crossbow', objectId: 16163 }],
          }
        },
        {
          id: 'mean_lost_soul',
          name: 'Mean Lost Soul',
          hp: 10000,
          exp: 5580,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Mean_Lost_Soul.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 55, kind: 'resistente' },
            { element: 'energy', value: 30, kind: 'resistente' },
            { element: 'earth', value: 20, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: -30, kind: 'fraco' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'lost soul', objectId: 5809 }],
            semiRare: [{ name: 'death toll', objectId: 32703 }, { name: 'skull staff', objectId: 3324 }, { name: 'machete', objectId: 3308 }, { name: 'ensouled essence', objectId: 32698 }, { name: 'fire axe', objectId: 3320 }, { name: 'ivory comb', objectId: 32773 }, { name: 'mercenary sword', objectId: 7386 }],
            rare: [{ name: 'haunted blade', objectId: 7407 }, { name: 'warrior\'s axe', objectId: 14040 }, { name: 'twiceslicer', objectId: 11657 }],
          }
        },
        {
          id: 'flimsy_lost_soul',
          name: 'Flimsy Lost Soul',
          hp: 8000,
          exp: 4500,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Flimsy_Lost_Soul.gif',
          damageElements: [{ element: 'death', weight: 900 }, { element: 'energy', weight: 420 }, { element: 'physical', weight: 350 }],
          resistances: [
            { element: 'physical', value: 50, kind: 'resistente' },
            { element: 'energy', value: 20, kind: 'resistente' },
            { element: 'earth', value: 20, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: -20, kind: 'fraco' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'lost soul', objectId: 5809 }],
            uncommon: [{ name: 'wand of cosmic energy', objectId: 3073 }],
            semiRare: [{ name: 'springsprout rod', objectId: 8084 }, { name: 'death toll', objectId: 32703 }, { name: 'terra rod', objectId: 3065 }, { name: 'hailstorm rod', objectId: 3067 }, { name: 'ensouled essence', objectId: 32698 }, { name: 'necklace of the deep', objectId: 13990 }, { name: 'cursed bone', objectId: 32774 }, { name: 'wand of starstorm', objectId: 8072 }],
            rare: [{ name: 'glacial rod', objectId: 16118 }, { name: 'wand of voodoo', objectId: 8094 }],
          }
        }
      ]
    },
    {
      id: 'bulltaur',
      name: 'Bulltaur',
      lean: 'exp',
      creatures: [
        {
          id: 'bulltaur_alchemist',
          name: 'Bulltaur Alchemist',
          hp: 11380,
          exp: 4500,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Bulltaur_Alchemist.gif',
          damageElements: [{ element: 'energy', weight: 580 }, { element: 'ice', weight: 350 }, { element: 'physical', weight: 270 }],
          resistances: [
            { element: 'physical', value: 30, kind: 'resistente' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: -20, kind: 'fraco' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 15, kind: 'resistente' },
            { element: 'holy', value: -5, kind: 'fraco' },
            { element: 'death', value: -5, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'bulltaur horn', objectId: 44736 }, { name: 'encrypted notes', objectId: 44739 }, { name: 'strange substance', objectId: 44740 }, { name: 'great health potion', objectId: 239 }],
            semiRare: [{ name: 'gold ingot', objectId: 9058 }, { name: 'ultimate health potion', objectId: 7643 }, { name: 'great mana potion', objectId: 238 }, { name: 'violet gem', objectId: 3036 }, { name: 'ultimate mana potion', objectId: 23373 }, { name: 'blue gem', objectId: 3041 }, { name: 'gold ring', objectId: 3063 }, { name: 'alloy legs', objectId: 21168 }],
            rare: [{ name: 'white gem', objectId: 32769 }, { name: 'spellweaver\'s robe', objectId: 10438 }],
          }
        },
        {
          id: 'bulltaur_brute',
          name: 'Bulltaur Brute',
          hp: 13120,
          exp: 4700,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Bulltaur_Brute.gif',
          damageElements: [{ element: 'physical', weight: 620 }, { element: 'death', weight: 400 }],
          resistances: [
            { element: 'physical', value: 30, kind: 'resistente' },
            { element: 'energy', value: -5, kind: 'fraco' },
            { element: 'earth', value: -20, kind: 'fraco' },
            { element: 'fire', value: 10, kind: 'resistente' },
            { element: 'ice', value: 10, kind: 'resistente' },
            { element: 'holy', value: -10, kind: 'fraco' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'bulltaur horn', objectId: 44736 }, { name: 'bulltaur armor scrap', objectId: 44738 }, { name: 'small topaz', objectId: 9057 }, { name: 'bulltaur hoof', objectId: 44737 }],
            semiRare: [{ name: 'mino shield', objectId: 21175 }, { name: 'dwarven ring', objectId: 3097 }, { name: 'might ring', objectId: 3048 }, { name: 'violet gem', objectId: 3036 }],
            rare: [{ name: 'blue gem', objectId: 3041 }, { name: 'gold nugget', objectId: 3040 }, { name: 'dragon hammer', objectId: 3322 }, { name: 'white gem', objectId: 32769 }],
          }
        },
        {
          id: 'bulltaur_forgepriest',
          name: 'Bulltaur Forgepriest',
          hp: 13680,
          exp: 6400,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Bulltaur_Forgepriest.gif',
          damageElements: [{ element: 'energy', weight: 1480 }, { element: 'holy', weight: 550 }, { element: 'physical', weight: 270 }],
          resistances: [
            { element: 'physical', value: 20, kind: 'resistente' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 15, kind: 'resistente' },
            { element: 'ice', value: -10, kind: 'fraco' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: -10, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'bulltaur horn', objectId: 44736 }, { name: 'small topaz', objectId: 9057 }, { name: 'staff piece', objectId: 44741 }],
            semiRare: [{ name: 'idol of the forge', objectId: 44742 }, { name: 'gold ingot', objectId: 9058 }, { name: 'soul orb', objectId: 5944 }, { name: 'blue gem', objectId: 3041 }, { name: 'wand of defiance', objectId: 8090 }],
            rare: [{ name: 'lightning robe', objectId: 825 }, { name: 'gold nugget', objectId: 3040 }, { name: 'spellbook of mind control', objectId: 8074 }, { name: 'white gem', objectId: 32769 }, { name: 'stone skin amulet', objectId: 3081 }, { name: 'violet gem', objectId: 3036 }],
          }
        }
      ]
    },
    {
      id: 'gazer',
      name: 'Gazer',
      lean: 'loot',
      creatures: [
        {
          id: 'gazer_spectre',
          name: 'Gazer Spectre',
          hp: 9000,
          exp: 4200,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Gazer_Spectre.gif',
          damageElements: [{ element: 'death', weight: 400 }, { element: 'fire', weight: 350 }, { element: 'physical', weight: 350 }],
          resistances: [
            { element: 'physical', value: 85, kind: 'resistente' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 70, kind: 'resistente' },
            { element: 'ice', value: -30, kind: 'fraco' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'red crystal fragment', objectId: 16126 }, { name: 'small enchanted ruby', objectId: 675 }, { name: 'small diamond', objectId: 3028 }, { name: 'small sapphire', objectId: 3029 }],
            semiRare: [{ name: 'red gem', objectId: 3039 }, { name: 'yellow gem', objectId: 3037 }, { name: 'golden idol of tukh', objectId: 29299 }, { name: 'wand of draconia', objectId: 8093 }, { name: 'wand of inferno', objectId: 3071 }, { name: 'prismatic quartz', objectId: 24962 }],
            rare: [{ name: 'brown crystal splinter', objectId: 16123 }, { name: 'red ectoplasm', objectId: 30084 }, { name: 'magma coat', objectId: 826 }, { name: 'small enchanted emerald', objectId: 677 }, { name: 'onyx chip', objectId: 22193 }, { name: 'hexagonal ruby', objectId: 30180 }],
          }
        },
        {
          id: 'ripper_spectre',
          name: 'Ripper Spectre',
          hp: 7600,
          exp: 3500,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Ripper_Spectre.gif',
          damageElements: [{ element: 'earth', weight: 400 }, { element: 'physical', weight: 350 }],
          resistances: [
            { element: 'physical', value: 70, kind: 'resistente' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: 20, kind: 'resistente' },
            { element: 'fire', value: -20, kind: 'fraco' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'great spirit potion', objectId: 7642 }],
            uncommon: [{ name: 'two handed sword', objectId: 3265 }, { name: 'silver brooch', objectId: 3017 }, { name: 'emerald bangle', objectId: 3010 }],
            semiRare: [{ name: 'terra rod', objectId: 3065 }, { name: 'twin hooks', objectId: 10392 }, { name: 'springsprout rod', objectId: 8084 }, { name: 'green ectoplasm', objectId: 30083 }, { name: 'coral brooch', objectId: 24391 }, { name: 'serpent sword', objectId: 3297 }],
            rare: [{ name: 'hexagonal ruby', objectId: 30180 }, { name: 'assassin dagger', objectId: 7404 }, { name: 'spike sword', objectId: 3271 }, { name: 'wyvern fang', objectId: 7408 }],
          }
        },
        {
          id: 'burster_spectre',
          name: 'Burster Spectre',
          hp: 13000,
          exp: 6000,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Burster_Spectre.gif',
          damageElements: [{ element: 'ice', weight: 1170 }, { element: 'death', weight: 400 }, { element: 'physical', weight: 400 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: -20, kind: 'fraco' },
            { element: 'ice', value: 70, kind: 'resistente' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'great spirit potion', objectId: 7642 }],
            uncommon: [{ name: 'protection amulet', objectId: 3084 }, { name: 'life crystal', objectId: 3061 }, { name: 'silver amulet', objectId: 3054 }, { name: 'wand of voodoo', objectId: 8094 }, { name: 'wand of cosmic energy', objectId: 3073 }, { name: 'dragon necklace', objectId: 3085 }, { name: 'stone skin amulet', objectId: 3081 }, { name: 'blue ectoplasm', objectId: 30082 }, { name: 'glacier amulet', objectId: 815 }, { name: 'orb', objectId: 3060 }, { name: 'hailstorm rod', objectId: 3067 }],
            semiRare: [{ name: 'elven amulet', objectId: 3082 }, { name: 'garlic necklace', objectId: 3083 }, { name: 'platinum amulet', objectId: 3055 }, { name: 'mind stone', objectId: 3062 }],
            rare: [{ name: 'glacial rod', objectId: 16118 }, { name: 'shockwave amulet', objectId: 9304 }, { name: 'strange symbol', objectId: 3058 }, { name: 'hexagonal ruby', objectId: 30180 }],
          }
        }
      ]
    },
    {
      id: 'bashmu',
      name: 'Bashmu',
      lean: 'loot',
      creatures: [
        {
          id: 'bashmu',
          name: 'Bashmu',
          hp: 16400,
          exp: 5000,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Bashmu.gif',
          damageElements: [{ element: 'energy', weight: 1300 }, { element: 'earth', weight: 800 }, { element: 'physical', weight: 600 }],
          resistances: [
            { element: 'physical', value: 5, kind: 'resistente' },
            { element: 'energy', value: 5, kind: 'resistente' },
            { element: 'earth', value: 20, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: -5, kind: 'fraco' },
            { element: 'holy', value: -10, kind: 'fraco' },
            { element: 'death', value: -10, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'guardian halberd', objectId: 3315 }, { name: 'bashmu feather', objectId: 36823 }],
            semiRare: [{ name: 'bashmu tongue', objectId: 36821 }, { name: 'sacred tree amulet', objectId: 9302 }, { name: 'great spirit potion', objectId: 7642 }, { name: 'green crystal shard', objectId: 16121 }, { name: 'blue crystal shard', objectId: 16119 }, { name: 'small diamond', objectId: 3028 }, { name: 'violet gem', objectId: 3036 }, { name: 'bashmu fang', objectId: 36820 }, { name: 'rainbow quartz', objectId: 25737 }, { name: 'terra amulet', objectId: 814 }],
            rare: [{ name: 'glacier amulet', objectId: 815 }, { name: 'glorious axe', objectId: 7454 }, { name: 'haunted blade', objectId: 7407 }, { name: 'magma amulet', objectId: 817 }],
          }
        },
        {
          id: 'juvenile_bashmu',
          name: 'Juvenile Bashmu',
          hp: 15000,
          exp: 4500,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Juvenile_Bashmu.gif',
          damageElements: [{ element: 'energy', weight: 900 }, { element: 'earth', weight: 500 }, { element: 'physical', weight: 400 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 5, kind: 'resistente' },
            { element: 'earth', value: 5, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: -10, kind: 'fraco' },
            { element: 'holy', value: -20, kind: 'fraco' },
            { element: 'death', value: 5, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'great spirit potion', objectId: 7642 }, { name: 'blue crystal shard', objectId: 16119 }, { name: 'bashmu tongue', objectId: 36821 }],
            semiRare: [{ name: 'ultimate health potion', objectId: 7643 }, { name: 'bashmu feather', objectId: 36823 }, { name: 'green crystal shard', objectId: 16121 }, { name: 'cyan crystal fragment', objectId: 16125 }, { name: 'violet gem', objectId: 3036 }, { name: 'lightning legs', objectId: 822 }, { name: 'diamond sceptre', objectId: 7387 }, { name: 'lightning pendant', objectId: 816 }, { name: 'bashmu fang', objectId: 36820 }, { name: 'yellow gem', objectId: 3037 }, { name: 'war hammer', objectId: 3279 }, { name: 'violet crystal shard', objectId: 16120 }, { name: 'dragonbone staff', objectId: 7436 }, { name: 'amber staff', objectId: 7426 }, { name: 'lightning boots', objectId: 820 }, { name: 'green gem', objectId: 3038 }, { name: 'spellweaver\'s robe', objectId: 10438 }, { name: 'pair of iron fists', objectId: 17828 }],
            rare: [{ name: 'skull staff', objectId: 3324 }, { name: 'crystal mace', objectId: 3333 }, { name: 'chaos mace', objectId: 7427 }],
          }
        }
      ]
    },
    {
      id: 'inferniarch',
      name: 'Inferniarch',
      lean: 'exp',
      creatures: [
        {
          id: 'broodrider_inferniarch',
          name: 'Broodrider Inferniarch',
          hp: 19200,
          exp: 7850,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Broodrider_Inferniarch.gif',
          damageElements: [{ element: 'physical', weight: 250 }],
          resistances: [
            { element: 'physical', value: -5, kind: 'fraco' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: 10, kind: 'resistente' },
            { element: 'fire', value: 20, kind: 'resistente' },
            { element: 'ice', value: -15, kind: 'fraco' },
            { element: 'holy', value: -10, kind: 'fraco' },
            { element: 'death', value: 15, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'blue crystal splinter', objectId: 16124 }, { name: 'demonic core essence', objectId: 49909 }, { name: 'demonic matter', objectId: 49894 }, { name: 'broodrider saddle', objectId: 50058 }],
            semiRare: [{ name: 'magma legs', objectId: 821 }, { name: 'mummified demon finger', objectId: 49908 }],
            rare: [{ name: 'arbalest', objectId: 5803 }],
          }
        },
        {
          id: 'gorger_inferniarch',
          name: 'Gorger Inferniarch',
          hp: 18900,
          exp: 7680,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Gorger_Inferniarch.gif',
          damageElements: [{ element: 'death', weight: 870 }, { element: 'fire', weight: 360 }, { element: 'physical', weight: 250 }],
          resistances: [
            { element: 'physical', value: -5, kind: 'fraco' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: -5, kind: 'fraco' },
            { element: 'holy', value: -10, kind: 'fraco' },
            { element: 'death', value: 10, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'spiked squelcher', objectId: 7452 }, { name: 'small sapphire', objectId: 3029 }, { name: 'demonic core essence', objectId: 49909 }, { name: 'demonic matter', objectId: 49894 }, { name: 'gorger antlers', objectId: 50059 }],
            semiRare: [{ name: 'mummified demon finger', objectId: 49908 }],
            rare: [{ name: 'gold nugget', objectId: 3040 }],
          }
        },
        {
          id: 'sineater_inferniarch',
          name: 'Sineater Inferniarch',
          hp: 18300,
          exp: 7250,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Sineater_Inferniarch.gif',
          damageElements: [{ element: 'physical', weight: 250 }, { element: 'fire', weight: 20 }],
          resistances: [
            { element: 'physical', value: -5, kind: 'fraco' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: -5, kind: 'fraco' },
            { element: 'holy', value: -10, kind: 'fraco' },
            { element: 'death', value: 10, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'great mana potion', objectId: 238 }, { name: 'small ruby', objectId: 3030 }, { name: 'demonic core essence', objectId: 49909 }, { name: 'ruby necklace', objectId: 3016 }, { name: 'demonic matter', objectId: 49894 }],
            semiRare: [{ name: 'wooden spellbook', objectId: 25699 }, { name: 'wand of defiance', objectId: 8090 }, { name: 'sineater wing', objectId: 50057 }, { name: 'mummified demon finger', objectId: 49908 }],
          }
        }
      ]
    },
    {
      id: 'girtablilu_warrior',
      name: 'girtablilu warrior',
      lean: 'loot',
      creatures: [
        {
          id: 'girtablilu_warrior',
          name: 'Girtablilu Warrior',
          hp: 17000,
          exp: 5800,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Girtablilu_Warrior.gif',
          damageElements: [{ element: 'physical', weight: 400 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: -15, kind: 'fraco' },
            { element: 'earth', value: 10, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: -10, kind: 'fraco' },
            { element: 'death', value: 15, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'ultimate health potion', objectId: 7643 }, { name: 'gold ingot', objectId: 9058 }, { name: 'green crystal shard', objectId: 16121 }, { name: 'red crystal fragment', objectId: 16126 }],
            semiRare: [{ name: 'girtablilu warrior carapace', objectId: 36971 }, { name: 'cyan crystal fragment', objectId: 16125 }, { name: 'scorpion charm', objectId: 36822 }, { name: 'green gem', objectId: 3038 }, { name: 'violet gem', objectId: 3036 }, { name: 'blue crystal shard', objectId: 16119 }, { name: 'crowbar', objectId: 3304 }, { name: 'diamond sceptre', objectId: 7387 }, { name: 'violet crystal shard', objectId: 16120 }, { name: 'yellow gem', objectId: 3037 }, { name: 'ice rapier', objectId: 3284 }, { name: 'magma coat', objectId: 826 }, { name: 'epee', objectId: 3326 }, { name: 'dragonbone staff', objectId: 7436 }, { name: 'knight axe', objectId: 3318 }, { name: 'beastslayer axe', objectId: 3344 }, { name: 'green crystal fragment', objectId: 16127 }, { name: 'blue gem', objectId: 3041 }, { name: 'red gem', objectId: 3039 }, { name: 'blue robe', objectId: 3567 }, { name: 'focus cape', objectId: 8043 }],
            rare: [{ name: 'fur armor', objectId: 22085 }, { name: 'glacier robe', objectId: 824 }],
          }
        },
        {
          id: 'venerable_girtablilu',
          name: 'Venerable Girtablilu',
          hp: 17000,
          exp: 5300,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Venerable_Girtablilu.gif',
          damageElements: [{ element: 'earth', weight: 1 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: 20, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: -20, kind: 'fraco' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'gold ingot', objectId: 9058 }, { name: 'small diamond', objectId: 3028 }, { name: 'cyan crystal fragment', objectId: 16125 }, { name: 'scorpion charm', objectId: 36822 }],
            semiRare: [{ name: 'red gem', objectId: 3039 }, { name: 'old girtablilu carapace', objectId: 36972 }, { name: 'violet gem', objectId: 3036 }, { name: 'northwind rod', objectId: 8083 }, { name: 'wand of cosmic energy', objectId: 3073 }, { name: 'blue crystal shard', objectId: 16119 }, { name: 'red crystal fragment', objectId: 16126 }, { name: 'violet crystal shard', objectId: 16120 }, { name: 'yellow gem', objectId: 3037 }, { name: 'underworld rod', objectId: 8082 }, { name: 'wand of voodoo', objectId: 8094 }, { name: 'blue gem', objectId: 3041 }, { name: 'ring of blue plasma', objectId: 23529 }, { name: 'green crystal fragment', objectId: 16127 }, { name: 'green crystal shard', objectId: 16121 }, { name: 'wand of defiance', objectId: 8090 }, { name: 'wood cape', objectId: 3575 }, { name: 'necrotic rod', objectId: 3066 }, { name: 'springsprout rod', objectId: 8084 }, { name: 'wand of decay', objectId: 3072 }],
          }
        }
      ]
    },
    {
      id: 'livraria_ice',
      name: 'Livraria ICE',
      lean: 'loot',
      creatures: [
        {
          id: 'animated_feather',
          name: 'Animated Feather',
          hp: 26000,
          exp: 9860,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Animated_Feather.gif',
          damageElements: [{ element: 'ice', weight: 3700 }, { element: 'physical', weight: 400 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: -18, kind: 'fraco' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'small sapphire', objectId: 3029 }, { name: 'life crystal', objectId: 3061 }],
            rare: [{ name: 'shard', objectId: 7290 }, { name: 'glacier mask', objectId: 829 }, { name: 'hailstorm rod', objectId: 3067 }, { name: 'great mana potion', objectId: 238 }, { name: 'golden mug', objectId: 2903 }, { name: 'glowing rune', objectId: 28570 }, { name: 'quill', objectId: 28567 }, { name: 'small diamond', objectId: 3028 }],
          }
        },
        {
          id: 'squid_warden',
          name: 'Squid Warden',
          hp: 33000,
          exp: 15300,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Squid_Warden.gif',
          damageElements: [{ element: 'ice', weight: 3200 }, { element: 'physical', weight: 900 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: -15, kind: 'fraco' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            uncommon: [{ name: 'platinum coin', objectId: 3035 }, { name: 'frosty heart', objectId: 9661 }, { name: 'ultimate health potion', objectId: 7643 }, { name: 'ultimate mana potion', objectId: 23373 }, { name: 'piece of dead brain', objectId: 9663 }, { name: 'slime heart', objectId: 21194 }],
            rare: [{ name: 'glowing rune', objectId: 28570 }, { name: 'small sapphire', objectId: 3029 }, { name: 'ice rapier', objectId: 3284 }, { name: 'glacier mask', objectId: 829 }, { name: 'crystal sword', objectId: 7449 }, { name: 'glacier robe', objectId: 824 }, { name: 'glacier kilt', objectId: 823 }],
          }
        },
        {
          id: 'icecold_book',
          name: 'Icecold Book',
          hp: 42000,
          exp: 12750,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Icecold_Book.gif',
          damageElements: [{ element: 'ice', weight: 3050 }, { element: 'physical', weight: 850 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: -10, kind: 'fraco' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'book page', objectId: 28569 }, { name: 'small diamond', objectId: 3028 }, { name: 'small sapphire', objectId: 3029 }, { name: 'quill', objectId: 28567 }, { name: 'ultimate health potion', objectId: 7643 }, { name: 'ultimate mana potion', objectId: 23373 }, { name: 'diamond sceptre', objectId: 7387 }, { name: 'frosty heart', objectId: 9661 }, { name: 'silken bookmark', objectId: 28566 }],
            semiRare: [{ name: 'strange helmet', objectId: 3373 }],
            rare: [{ name: 'glacier mask', objectId: 829 }, { name: 'ice rapier', objectId: 3284 }, { name: 'crystal mace', objectId: 3333 }, { name: 'glacier kilt', objectId: 823 }, { name: 'glacier robe', objectId: 824 }, { name: 'glacier shoes', objectId: 819 }, { name: 'sapphire hammer', objectId: 7437 }, { name: 'glacial rod', objectId: 16118 }, { name: 'crystalline armor', objectId: 8050 }],
          }
        }
      ]
    },
    {
      id: 'livraria_earth',
      name: 'Livraria EARTH',
      lean: 'exp',
      creatures: [
        {
          id: 'biting_book',
          name: 'Biting Book',
          hp: 13000,
          exp: 9350,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Biting_Book.gif',
          damageElements: [{ element: 'physical', weight: 3475 }],
          resistances: [
            { element: 'physical', value: 50, kind: 'resistente' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            uncommon: [{ name: 'platinum coin', objectId: 3035 }],
            rare: [{ name: 'book page', objectId: 28569 }, { name: 'glowing rune', objectId: 28570 }, { name: 'silken bookmark', objectId: 28566 }],
          }
        },
        {
          id: 'cursed_book',
          name: 'Cursed Book',
          hp: 40000,
          exp: 13345,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Cursed_Book.gif',
          damageElements: [{ element: 'earth', weight: 2750 }, { element: 'physical', weight: 600 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            uncommon: [{ name: 'platinum coin', objectId: 3035 }, { name: 'small diamond', objectId: 3028 }, { name: 'small stone', objectId: 1781 }, { name: 'small topaz', objectId: 9057 }, { name: 'protection amulet', objectId: 3084 }],
            rare: [{ name: 'terra boots', objectId: 813 }, { name: 'terra hood', objectId: 830 }, { name: 'diamond sceptre', objectId: 7387 }, { name: 'terra mantle', objectId: 811 }, { name: 'terra legs', objectId: 812 }, { name: 'terra amulet', objectId: 814 }, { name: 'stone skin amulet', objectId: 3081 }, { name: 'springsprout rod', objectId: 8084 }, { name: 'sacred tree amulet', objectId: 9302 }, { name: 'swamplair armor', objectId: 8052 }],
          }
        },
        {
          id: 'ink_blob',
          name: 'Ink Blob',
          hp: 19000,
          exp: 14450,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Ink_Blob.gif',
          damageElements: [{ element: 'earth', weight: 4395 }, { element: 'physical', weight: 550 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: -8, kind: 'fraco' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            semiRare: [{ name: 'envenomed arrow', objectId: 16143 }, { name: 'poisonous slime', objectId: 9640 }, { name: 'small diamond', objectId: 3028 }, { name: 'small topaz', objectId: 9057 }, { name: 'protection amulet', objectId: 3084 }, { name: 'sacred tree amulet', objectId: 9302 }, { name: 'stone skin amulet', objectId: 3081 }, { name: 'clay lump', objectId: 10422 }, { name: 'terra amulet', objectId: 814 }],
            rare: [{ name: 'blue gem', objectId: 3041 }, { name: 'terra boots', objectId: 813 }, { name: 'terra hood', objectId: 830 }, { name: 'springsprout rod', objectId: 8084 }, { name: 'terra legs', objectId: 812 }, { name: 'terra mantle', objectId: 811 }],
          }
        }
      ]
    },
    {
      id: 'livraria_fire',
      name: 'Livraria FIRE',
      lean: 'exp',
      creatures: [
        {
          id: 'ink_blob',
          name: 'Ink Blob',
          hp: 19000,
          exp: 14450,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Ink_Blob.gif',
          damageElements: [{ element: 'earth', weight: 4395 }, { element: 'physical', weight: 550 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: -8, kind: 'fraco' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            semiRare: [{ name: 'envenomed arrow', objectId: 16143 }, { name: 'poisonous slime', objectId: 9640 }, { name: 'small diamond', objectId: 3028 }, { name: 'small topaz', objectId: 9057 }, { name: 'protection amulet', objectId: 3084 }, { name: 'sacred tree amulet', objectId: 9302 }, { name: 'stone skin amulet', objectId: 3081 }, { name: 'clay lump', objectId: 10422 }, { name: 'terra amulet', objectId: 814 }],
            rare: [{ name: 'blue gem', objectId: 3041 }, { name: 'terra boots', objectId: 813 }, { name: 'terra hood', objectId: 830 }, { name: 'springsprout rod', objectId: 8084 }, { name: 'terra legs', objectId: 812 }, { name: 'terra mantle', objectId: 811 }],
          }
        },
        {
          id: 'burning_book',
          name: 'Burning Book',
          hp: 36000,
          exp: 13200,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Burning_Book.gif',
          damageElements: [{ element: 'fire', weight: 2700 }, { element: 'physical', weight: 600 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: -10, kind: 'fraco' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'shadow sceptre', objectId: 7451 }],
            semiRare: [{ name: 'book page', objectId: 28569 }, { name: 'demonic essence', objectId: 6500 }, { name: 'flask of demonic blood', objectId: 6558 }, { name: 'small amethyst', objectId: 3033 }, { name: 'silken bookmark', objectId: 28566 }, { name: 'magma coat', objectId: 826 }, { name: 'guardian shield', objectId: 3415 }, { name: 'soul orb', objectId: 5944 }, { name: 'necrotic rod', objectId: 3066 }, { name: 'magma monocle', objectId: 827 }],
          }
        },
        {
          id: 'guardian_of_tales',
          name: 'Guardian of Tales',
          hp: 30000,
          exp: 10600,
          sprite: 'https://www.tibiawiki.com.br/images/c/c3/Guardian_Of_Tales.gif',
          damageElements: [{ element: 'fire', weight: 2200 }, { element: 'death', weight: 1600 }, { element: 'physical', weight: 600 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: -12, kind: 'fraco' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 50, kind: 'resistente' },
          ],
          drops: {
            uncommon: [{ name: 'platinum coin', objectId: 3035 }, { name: 'book page', objectId: 28569 }, { name: 'burnt scroll', objectId: 3124 }, { name: 'glowing rune', objectId: 28570 }, { name: 'small diamond', objectId: 3028 }],
            rare: [{ name: 'fire axe', objectId: 3320 }, { name: 'soul orb', objectId: 5944 }, { name: 'spellbook of warding', objectId: 8073 }, { name: 'wand of inferno', objectId: 3071 }, { name: 'fire sword', objectId: 3280 }, { name: 'magma coat', objectId: 826 }, { name: 'magma legs', objectId: 821 }, { name: 'piece of hellfire armor', objectId: 9664 }],
          }
        },
        {
          id: 'rage_squid',
          name: 'Rage Squid',
          hp: 34000,
          exp: 16300,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Rage_Squid.gif',
          damageElements: [{ element: 'fire', weight: 2200 }, { element: 'physical', weight: 600 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: -15, kind: 'fraco' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'small amethyst', objectId: 3033 }, { name: 'platinum coin', objectId: 3035 }, { name: 'small topaz', objectId: 9057 }, { name: 'small emerald', objectId: 3032 }, { name: 'orb', objectId: 3060 }, { name: 'small ruby', objectId: 3030 }],
            uncommon: [{ name: 'great spirit potion', objectId: 7642 }, { name: 'fire mushroom', objectId: 3731 }, { name: 'ultimate health potion', objectId: 7643 }, { name: 'purple tome', objectId: 2848 }, { name: 'great mana potion', objectId: 238 }, { name: 'talon', objectId: 3034 }, { name: 'devil helmet', objectId: 3356 }],
            semiRare: [{ name: 'slime heart', objectId: 21194 }, { name: 'piece of dead brain', objectId: 9663 }, { name: 'demonic essence', objectId: 6500 }, { name: 'might ring', objectId: 3048 }],
            rare: [{ name: 'demonrage sword', objectId: 7382 }, { name: 'giant sword', objectId: 3281 }, { name: 'demon shield', objectId: 3420 }, { name: 'magic plate armor', objectId: 3366 }, { name: 'platinum amulet', objectId: 3055 }, { name: 'wand of everblazing', objectId: 16115 }, { name: 'fire axe', objectId: 3320 }],
          }
        }
      ]
    },
    {
      id: 'livraria_energy',
      name: 'Livraria ENERGY',
      lean: 'exp',
      creatures: [
        {
          id: 'brain_squid',
          name: 'Brain Squid',
          hp: 36000,
          exp: 17672,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Brain_Squid.gif',
          damageElements: [{ element: 'energy', weight: 1700 }, { element: 'holy', weight: 1300 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: -15, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            semiRare: [{ name: 'instable proto matter', objectId: 23516 }, { name: 'energy ball', objectId: 23523 }, { name: 'energy bar', objectId: 23535 }, { name: 'energy drink', objectId: 23545 }, { name: 'odd organ', objectId: 23510 }, { name: 'frozen lightning', objectId: 23519 }, { name: 'small ruby', objectId: 3030 }, { name: 'violet gem', objectId: 3036 }, { name: 'blue crystal splinter', objectId: 16124 }, { name: 'cyan crystal fragment', objectId: 16125 }, { name: 'ultimate mana potion', objectId: 23373 }, { name: 'piece of dead brain', objectId: 9663 }, { name: 'might ring', objectId: 3048 }, { name: 'slime heart', objectId: 21194 }],
            rare: [{ name: 'violet crystal shard', objectId: 16120 }, { name: 'glowing rune', objectId: 28570 }, { name: 'wand of defiance', objectId: 8090 }, { name: 'lightning headband', objectId: 828 }, { name: 'lightning pendant', objectId: 816 }],
          }
        },
        {
          id: 'energetic_book',
          name: 'Energetic Book',
          hp: 37000,
          exp: 12034,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Energetic_Book.gif',
          damageElements: [{ element: 'energy', weight: 1750 }, { element: 'holy', weight: 1300 }, { element: 'physical', weight: 500 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: -10, kind: 'fraco' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'ultimate health potion', objectId: 7643 }, { name: 'ultimate mana potion', objectId: 23373 }],
            rare: [{ name: 'energy ball', objectId: 23523 }, { name: 'lightning pendant', objectId: 816 }, { name: 'lightning boots', objectId: 820 }, { name: 'lightning headband', objectId: 828 }, { name: 'might ring', objectId: 3048 }, { name: 'spellweaver\'s robe', objectId: 10438 }, { name: 'wand of defiance', objectId: 8090 }, { name: 'haunted blade', objectId: 7407 }, { name: 'lightning legs', objectId: 822 }],
          }
        },
        {
          id: 'knowledge_elemental',
          name: 'Knowledge Elemental',
          hp: 21000,
          exp: 10603,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Knowledge_Elemental.gif',
          damageElements: [{ element: 'holy', weight: 2250 }, { element: 'energy', weight: 1800 }, { element: 'physical', weight: 600 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 50, kind: 'resistente' },
            { element: 'death', value: -20, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'book page', objectId: 28569 }, { name: 'small amethyst', objectId: 3033 }, { name: 'glowing rune', objectId: 28570 }, { name: 'quill', objectId: 28567 }, { name: 'silken bookmark', objectId: 28566 }, { name: 'flash arrow', objectId: 761 }, { name: 'throwing star', objectId: 3287 }, { name: 'crystal sword', objectId: 7449 }, { name: 'guardian shield', objectId: 3415 }, { name: 'mana potion', objectId: 268 }, { name: 'ultimate mana potion', objectId: 23373 }, { name: 'ultimate health potion', objectId: 7643 }],
            rare: [{ name: 'wand of cosmic energy', objectId: 3073 }],
          }
        }
      ]
    },
    {
      id: 'quara_raider',
      name: 'Quara Raider',
      lean: 'exp',
      creatures: [
        {
          id: 'quara_looter',
          name: 'Quara Looter',
          hp: 23000,
          exp: 8650,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Quara_Looter.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 5, kind: 'resistente' },
            { element: 'energy', value: -15, kind: 'fraco' },
            { element: 'earth', value: -10, kind: 'fraco' },
            { element: 'fire', value: 20, kind: 'resistente' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 10, kind: 'resistente' },
            { element: 'death', value: 5, kind: 'resistente' },
          ],
          drops: {
            uncommon: [{ name: 'amber souvenir', objectId: 48508 }, { name: 'resinous fish fin', objectId: 48509 }, { name: 'platinum coin', objectId: 3035 }],
            semiRare: [{ name: 'glacier robe', objectId: 824 }],
            rare: [{ name: 'glacier kilt', objectId: 823 }, { name: 'necklace of the deep', objectId: 13990 }, { name: 'crystal crossbow', objectId: 16163 }, { name: 'rift lance', objectId: 22727 }, { name: 'mantassin tail', objectId: 11489 }, { name: 'preserved light blue seed', objectId: 45654 }, { name: 'preserved purple seed', objectId: 45656 }, { name: 'preserved violet seed', objectId: 45655 }],
          }
        },
        {
          id: 'quara_plunderer',
          name: 'Quara Plunderer',
          hp: 27000,
          exp: 10800,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Quara_Plunderer.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: -10, kind: 'fraco' },
            { element: 'fire', value: 20, kind: 'resistente' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 15, kind: 'resistente' },
            { element: 'death', value: 10, kind: 'resistente' },
          ],
          drops: {
            uncommon: [{ name: 'amber souvenir', objectId: 48508 }, { name: 'resinous fish fin', objectId: 48509 }, { name: 'platinum coin', objectId: 3035 }],
            rare: [{ name: 'haunted blade', objectId: 7407 }],
          }
        },
        {
          id: 'quara_raider',
          name: 'Quara Raider',
          hp: 25000,
          exp: 8150,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Quara_Raider.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 10, kind: 'resistente' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: -15, kind: 'fraco' },
            { element: 'fire', value: 20, kind: 'resistente' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 10, kind: 'resistente' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            uncommon: [{ name: 'amber souvenir', objectId: 48508 }, { name: 'platinum coin', objectId: 3035 }],
            semiRare: [{ name: 'resinous fish fin', objectId: 48509 }, { name: 'skull staff', objectId: 3324 }],
            rare: [{ name: 'glacier robe', objectId: 824 }, { name: 'crystalline armor', objectId: 8050 }, { name: 'quara pincers', objectId: 11490 }, { name: 'abyss hammer', objectId: 7414 }, { name: 'preserved light blue seed', objectId: 45654 }, { name: 'preserved purple seed', objectId: 45656 }],
          }
        }
      ]
    },
    {
      id: 'norcferatu_nightweaver',
      name: 'Norcferatu Nightweaver',
      lean: 'exp',
      creatures: [
        {
          id: 'gloom_maw',
          name: 'Gloom Maw',
          hp: 17400,
          exp: 6900,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Gloom_Maw.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: -10, kind: 'fraco' },
            { element: 'fire', value: -5, kind: 'fraco' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: -5, kind: 'fraco' },
            { element: 'death', value: 25, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'chain leash', objectId: 51472 }],
            semiRare: [{ name: 'black pearl', objectId: 3027 }, { name: 'piece of frozen night', objectId: 51474 }, { name: 'black shield', objectId: 3429 }, { name: 'bat wing', objectId: 5894 }, { name: 'stone skin amulet', objectId: 3081 }, { name: 'batwing hat', objectId: 9103 }],
          }
        },
        {
          id: 'norcferatu_heartless',
          name: 'Norcferatu Heartless',
          hp: 11400,
          exp: 4450,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Norcferatu_Heartless.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: -10, kind: 'fraco' },
            { element: 'energy', value: -5, kind: 'fraco' },
            { element: 'earth', value: 10, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 5, kind: 'resistente' },
            { element: 'death', value: -30, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            semiRare: [{ name: 'green crystal splinter', objectId: 16122 }, { name: 'heart amphora', objectId: 51484 }, { name: 'vampire teeth', objectId: 9685 }, { name: 'brown crystal splinter', objectId: 16123 }, { name: 'blue crystal splinter', objectId: 16124 }, { name: 'pot of orcish warpaint', objectId: 51476 }, { name: 'war axe', objectId: 3342 }, { name: 'chaos mace', objectId: 7427 }, { name: 'greater garlic necklace', objectId: 51275 }],
            rare: [{ name: 'vampire shield', objectId: 3434 }],
          }
        },
        {
          id: 'norcferatu_nightweaver',
          name: 'Norcferatu Nightweaver',
          hp: 12200,
          exp: 4900,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Norcferatu_Nightweaver.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 10, kind: 'resistente' },
            { element: 'earth', value: -5, kind: 'fraco' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: -10, kind: 'fraco' },
            { element: 'holy', value: 5, kind: 'resistente' },
            { element: 'death', value: -25, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            semiRare: [{ name: 'strong mana potion', objectId: 237 }, { name: 'piece of frozen night', objectId: 51474 }, { name: 'blood hood', objectId: 51480 }, { name: 'magma amulet', objectId: 817 }, { name: 'rainbow quartz', objectId: 25737 }, { name: 'wand of defiance', objectId: 8090 }, { name: 'greater garlic necklace', objectId: 51275 }],
          }
        },
        {
          id: 'orclops_bloodbreaker',
          name: 'Orclops Bloodbreaker',
          hp: 20600,
          exp: 7800,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Orclops_Bloodbreaker.gif',
          damageElements: [{ element: 'physical', weight: 700 }],
          resistances: [
            { element: 'physical', value: -5, kind: 'fraco' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 10, kind: 'resistente' },
            { element: 'ice', value: 5, kind: 'resistente' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: -30, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            semiRare: [{ name: 'orcish axe', objectId: 3316 }, { name: 'orcish toothbrush', objectId: 51477 }, { name: 'bone fibula', objectId: 51485 }, { name: 'green gem', objectId: 3038 }, { name: 'vampire teeth', objectId: 9685 }, { name: 'green crystal shard', objectId: 16121 }, { name: 'bone toothpick', objectId: 24380 }, { name: 'bloodshot giant eye', objectId: 51482 }, { name: 'war drum', objectId: 2966 }, { name: 'stone skin amulet', objectId: 3081 }],
            rare: [{ name: 'berserk potion', objectId: 7439 }],
          }
        }
      ]
    },
    {
      id: 'lavafungos',
      name: 'Lavafungos',
      lean: 'loot',
      creatures: [
        {
          id: 'lavafungus',
          name: 'Lavafungus',
          hp: 14400,
          exp: 6200,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Lavafungus.gif',
          damageElements: [{ element: 'fire', weight: 2060 }, { element: 'death', weight: 1460 }, { element: 'physical', weight: 810 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 10, kind: 'resistente' },
            { element: 'ice', value: -20, kind: 'fraco' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 20, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'terra rod', objectId: 3065 }],
            uncommon: [{ name: 'lavafungus ring', objectId: 36786 }, { name: 'red gem', objectId: 3039 }, { name: 'green gem', objectId: 3038 }, { name: 'rainbow quartz', objectId: 25737 }, { name: 'green crystal fragment', objectId: 16127 }, { name: 'metal spats', objectId: 21169 }],
            semiRare: [{ name: 'hailstorm rod', objectId: 3067 }, { name: 'blue crystal shard', objectId: 16119 }, { name: 'violet gem', objectId: 3036 }, { name: 'wand of inferno', objectId: 3071 }, { name: 'lavafungus head', objectId: 36785 }, { name: 'cyan crystal fragment', objectId: 16125 }, { name: 'violet crystal shard', objectId: 16120 }, { name: 'red crystal fragment', objectId: 16126 }, { name: 'onyx chip', objectId: 22193 }, { name: 'yellow gem', objectId: 3037 }, { name: 'spellbook of warding', objectId: 8073 }, { name: 'magma amulet', objectId: 817 }, { name: 'focus cape', objectId: 8043 }, { name: 'wand of starstorm', objectId: 8072 }, { name: 'crystal mace', objectId: 3333 }, { name: 'dwarven ring', objectId: 3097 }],
          }
        },
        {
          id: 'lavaworm',
          name: 'Lavaworm',
          hp: 15000,
          exp: 6500,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Lavaworm.gif',
          damageElements: [{ element: 'fire', weight: 1480 }, { element: 'death', weight: 760 }, { element: 'physical', weight: 600 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 15, kind: 'resistente' },
            { element: 'ice', value: -15, kind: 'fraco' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 10, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'lavaworm spike roots', objectId: 36769 }],
            uncommon: [{ name: 'gold ingot', objectId: 9058 }, { name: 'violet crystal shard', objectId: 16120 }, { name: 'violet gem', objectId: 3036 }],
            semiRare: [{ name: 'lavaworm spikes', objectId: 36770 }, { name: 'green gem', objectId: 3038 }, { name: 'butterfly ring', objectId: 25698 }, { name: 'underworld rod', objectId: 8082 }, { name: 'lavaworm jaws', objectId: 36771 }, { name: 'blue crystal shard', objectId: 16119 }, { name: 'warrior helmet', objectId: 3369 }, { name: 'wand of voodoo', objectId: 8094 }, { name: 'crusader helmet', objectId: 3391 }],
            rare: [{ name: 'strange helmet', objectId: 3373 }],
          }
        },
        {
          id: 'streaked_devourer',
          name: 'Streaked Devourer',
          hp: 14000,
          exp: 6300,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Streaked_Devourer.gif',
          damageElements: [{ element: 'fire', weight: 1520 }, { element: 'death', weight: 770 }, { element: 'physical', weight: 550 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 10, kind: 'resistente' },
            { element: 'ice', value: -15, kind: 'fraco' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'gold ingot', objectId: 9058 }, { name: 'streaked devourer maw', objectId: 36773 }, { name: 'streaked devourer eyes', objectId: 36772 }],
            semiRare: [{ name: 'red gem', objectId: 3039 }, { name: 'streaked devourer legs', objectId: 36774 }, { name: 'yellow gem', objectId: 3037 }, { name: 'crystal mace', objectId: 3333 }, { name: 'mercenary sword', objectId: 7386 }, { name: 'noble axe', objectId: 7456 }, { name: 'ornate crossbow', objectId: 14247 }, { name: 'relic sword', objectId: 7383 }, { name: 'guardian halberd', objectId: 3315 }, { name: 'warrior\'s axe', objectId: 14040 }, { name: 'war axe', objectId: 3342 }],
            rare: [{ name: 'giant sword', objectId: 3281 }],
          }
        }
      ]
    },
    {
      id: 'afflicted_strider',
      name: 'Afflicted Strider',
      lean: 'loot',
      creatures: [
        {
          id: 'afflicted_strider',
          name: 'Afflicted Strider',
          hp: 20000,
          exp: 5700,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Afflicted_Strider.gif',
          damageElements: [{ element: 'death', weight: 800 }, { element: 'earth', weight: 650 }, { element: 'physical', weight: 600 }],
          resistances: [
            { element: 'physical', value: 5, kind: 'resistente' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 10, kind: 'resistente' },
            { element: 'fire', value: -10, kind: 'fraco' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 15, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'afflicted strider worms', objectId: 36790 }, { name: 'guardian halberd', objectId: 3315 }, { name: 'crystal sword', objectId: 7449 }, { name: 'violet gem', objectId: 3036 }, { name: 'violet crystal shard', objectId: 16120 }, { name: 'doublet', objectId: 3379 }, { name: 'green crystal shard', objectId: 16121 }],
            semiRare: [{ name: 'belted cape', objectId: 8044 }, { name: 'afflicted strider head', objectId: 36789 }, { name: 'knight armor', objectId: 3370 }, { name: 'spirit cloak', objectId: 8042 }, { name: 'magma coat', objectId: 826 }, { name: 'serpent sword', objectId: 3297 }, { name: 'machete', objectId: 3308 }, { name: 'broadsword', objectId: 3301 }, { name: 'focus cape', objectId: 8043 }, { name: 'ice rapier', objectId: 3284 }, { name: 'titan axe', objectId: 7413 }, { name: 'haunted blade', objectId: 7407 }, { name: 'mercenary sword', objectId: 7386 }, { name: 'knight axe', objectId: 3318 }],
          }
        },
        {
          id: 'eyeless_devourer',
          name: 'Eyeless Devourer',
          hp: 20000,
          exp: 6000,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Eyeless_Devourer.gif',
          damageElements: [{ element: 'energy', weight: 1500 }, { element: 'earth', weight: 560 }, { element: 'physical', weight: 400 }],
          resistances: [
            { element: 'physical', value: -10, kind: 'fraco' },
            { element: 'energy', value: 5, kind: 'resistente' },
            { element: 'earth', value: 10, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'ultimate health potion', objectId: 7643 }],
            uncommon: [{ name: 'eyeless devourer maw', objectId: 36775 }, { name: 'blue crystal shard', objectId: 16119 }, { name: 'green crystal shard', objectId: 16121 }, { name: 'violet crystal shard', objectId: 16120 }, { name: 'eyeless devourer legs', objectId: 36776 }, { name: 'green gem', objectId: 3038 }],
            semiRare: [{ name: 'eyeless devourer tongue', objectId: 36777 }, { name: 'sacred tree amulet', objectId: 9302 }, { name: 'crystal mace', objectId: 3333 }, { name: 'glacier amulet', objectId: 815 }, { name: 'noble axe', objectId: 7456 }, { name: 'warrior\'s axe', objectId: 14040 }, { name: 'war axe', objectId: 3342 }, { name: 'ornate crossbow', objectId: 14247 }, { name: 'jade hammer', objectId: 7422 }],
            rare: [{ name: 'relic sword', objectId: 7383 }, { name: 'giant sword', objectId: 3281 }, { name: 'mercenary sword', objectId: 7386 }, { name: 'execowtioner axe', objectId: 21176 }, { name: 'shadow sceptre', objectId: 7451 }, { name: 'metal bat', objectId: 21171 }],
          }
        },
        {
          id: 'blemished_spawn',
          name: 'Blemished Spawn',
          hp: 18000,
          exp: 5300,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Blemished_Spawn.gif',
          damageElements: [{ element: 'earth', weight: 1360 }, { element: 'physical', weight: 300 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 10, kind: 'resistente' },
            { element: 'fire', value: -15, kind: 'fraco' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 10, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'terra rod', objectId: 3065 }],
            uncommon: [{ name: 'blemished spawn abdomen', objectId: 36779 }, { name: 'cyan crystal fragment', objectId: 16125 }, { name: 'violet crystal shard', objectId: 16120 }, { name: 'hailstorm rod', objectId: 3067 }, { name: 'blue crystal shard', objectId: 16119 }, { name: 'northwind rod', objectId: 8083 }],
            semiRare: [{ name: 'knight axe', objectId: 3318 }, { name: 'dragonbone staff', objectId: 7436 }, { name: 'violet gem', objectId: 3036 }, { name: 'yellow gem', objectId: 3037 }, { name: 'wand of starstorm', objectId: 8072 }, { name: 'blemished spawn head', objectId: 36778 }, { name: 'sacred tree amulet', objectId: 9302 }, { name: 'springsprout rod', objectId: 8084 }, { name: 'diamond sceptre', objectId: 7387 }, { name: 'ice rapier', objectId: 3284 }, { name: 'wand of cosmic energy', objectId: 3073 }, { name: 'blemished spawn tail', objectId: 36780 }, { name: 'fur armor', objectId: 22085 }],
          }
        }
      ]
    },
    {
      id: 'varnished_diremaw',
      name: 'Varnished Diremaw',
      lean: 'loot',
      creatures: [
        {
          id: 'cave_chimera',
          name: 'Cave Chimera',
          hp: 16000,
          exp: 6800,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Cave_Chimera.gif',
          damageElements: [{ element: 'ice', weight: 800 }, { element: 'holy', weight: 730 }, { element: 'physical', weight: 400 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 20, kind: 'resistente' },
            { element: 'earth', value: -10, kind: 'fraco' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 10, kind: 'resistente' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: -10, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'great spirit potion', objectId: 7642 }, { name: 'ultimate health potion', objectId: 7643 }],
            uncommon: [{ name: 'gold ingot', objectId: 9058 }, { name: 'violet crystal shard', objectId: 16120 }, { name: 'violet gem', objectId: 3036 }],
            semiRare: [{ name: 'cave chimera leg', objectId: 36788 }, { name: 'cave chimera head', objectId: 36787 }, { name: 'yellow gem', objectId: 3037 }, { name: 'glacier amulet', objectId: 815 }, { name: 'glacier kilt', objectId: 823 }, { name: 'gold ring', objectId: 3063 }],
            rare: [{ name: 'fur armor', objectId: 22085 }, { name: 'gemmed figurine', objectId: 24392 }, { name: 'ornate crossbow', objectId: 14247 }, { name: 'crystal crossbow', objectId: 16163 }, { name: 'composite hornbow', objectId: 8027 }, { name: 'elvish bow', objectId: 7438 }],
          }
        },
        {
          id: 'varnished_diremaw',
          name: 'Varnished Diremaw',
          hp: 18000,
          exp: 5900,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Varnished_Diremaw.gif',
          damageElements: [{ element: 'ice', weight: 800 }, { element: 'holy', weight: 730 }, { element: 'physical', weight: 400 }],
          resistances: [
            { element: 'physical', value: -5, kind: 'fraco' },
            { element: 'energy', value: 15, kind: 'resistente' },
            { element: 'earth', value: -5, kind: 'fraco' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 5, kind: 'resistente' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }, { name: 'terra rod', objectId: 3065 }],
            uncommon: [{ name: 'emerald bangle', objectId: 3010 }, { name: 'brown crystal splinter', objectId: 16123 }, { name: 'green crystal splinter', objectId: 16122 }, { name: 'small diamond', objectId: 3028 }, { name: 'varnished diremaw legs', objectId: 36782 }, { name: 'violet crystal shard', objectId: 16120 }, { name: 'cyan crystal fragment', objectId: 16125 }, { name: 'green gem', objectId: 3038 }, { name: 'small emerald', objectId: 3032 }, { name: 'green crystal shard', objectId: 16121 }, { name: 'hailstorm rod', objectId: 3067 }, { name: 'springsprout rod', objectId: 8084 }],
            semiRare: [{ name: 'varnished diremaw brainpan', objectId: 36781 }, { name: 'diamond sceptre', objectId: 7387 }, { name: 'wand of starstorm', objectId: 8072 }, { name: 'glacier shoes', objectId: 819 }, { name: 'spellbook of warding', objectId: 8073 }, { name: 'fur armor', objectId: 22085 }, { name: 'wood cape', objectId: 3575 }, { name: 'haunted blade', objectId: 7407 }],
            rare: [{ name: 'glacier kilt', objectId: 823 }, { name: 'crown shield', objectId: 3419 }],
          }
        },
        {
          id: 'tremendous_tyrant',
          name: 'Tremendous Tyrant',
          hp: 23000,
          exp: 6100,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Tremendous_Tyrant.gif',
          damageElements: [{ element: 'physical', weight: 500 }, { element: 'holy', weight: 1250 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 20, kind: 'resistente' },
            { element: 'earth', value: -20, kind: 'fraco' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 15, kind: 'resistente' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'platinum coin', objectId: 3035 }],
            uncommon: [{ name: 'gold ingot', objectId: 9058 }, { name: 'violet crystal shard', objectId: 16120 }, { name: 'green crystal shard', objectId: 16121 }, { name: 'blue crystal shard', objectId: 16119 }, { name: 'yellow gem', objectId: 3037 }, { name: 'spellbook of warding', objectId: 8073 }, { name: 'tremendous tyrant head', objectId: 36783 }],
            semiRare: [{ name: 'tremendous tyrant shell', objectId: 36784 }, { name: 'ice rapier', objectId: 3284 }, { name: 'hailstorm rod', objectId: 3067 }, { name: 'knight axe', objectId: 3318 }, { name: 'dragonbone staff', objectId: 7436 }, { name: 'wand of cosmic energy', objectId: 3073 }, { name: 'warrior\'s shield', objectId: 14042 }, { name: 'elven amulet', objectId: 3082 }, { name: 'focus cape', objectId: 8043 }, { name: 'glacier robe', objectId: 824 }],
            rare: [{ name: 'wand of starstorm', objectId: 8072 }],
          }
        }
      ]
    },
    {
      id: 'crypt_construct',
      name: 'Crypt Construct',
      lean: 'exp',
      creatures: [
        {
          id: 'crypt_fiend',
          name: 'Crypt Fiend',
          hp: 60000,
          exp: 22500,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Crypt_Fiend.gif',
          damageElements: [{ element: 'death', weight: 1 }, { element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: -6, kind: 'fraco' },
            { element: 'energy', value: 15, kind: 'resistente' },
            { element: 'earth', value: -12, kind: 'fraco' },
            { element: 'fire', value: -9, kind: 'fraco' },
            { element: 'ice', value: 9, kind: 'resistente' },
            { element: 'holy', value: -3, kind: 'fraco' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'cyan crystal fragment', objectId: 16125 }],
            semiRare: [{ name: 'small sapphire', objectId: 3029 }, { name: 'giant tusk', objectId: 52707 }, { name: 'crystallized death', objectId: 52719 }, { name: 'blue crystal shard', objectId: 16119 }, { name: 'necromantic core', objectId: 52705 }, { name: 'amber', objectId: 32626 }, { name: 'amber with a bug', objectId: 32624 }, { name: 'cluster of crystallized death', objectId: 52720 }],
            rare: [{ name: 'blue gem', objectId: 3041 }, { name: 'amber with a dragonfly', objectId: 32625 }],
          }
        },
        {
          id: 'crypt_construct',
          name: 'Crypt Construct',
          hp: 50000,
          exp: 20500,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Crypt_Construct.gif',
          damageElements: [{ element: 'energy', weight: 1 }, { element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: -6, kind: 'fraco' },
            { element: 'energy', value: 18, kind: 'resistente' },
            { element: 'earth', value: -9, kind: 'fraco' },
            { element: 'fire', value: -6, kind: 'fraco' },
            { element: 'ice', value: 12, kind: 'resistente' },
            { element: 'holy', value: 8, kind: 'resistente' },
            { element: 'death', value: 8, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'cyan crystal fragment', objectId: 16125 }, { name: 'blue crystal shard', objectId: 16119 }, { name: 'small sapphire', objectId: 3029 }],
            semiRare: [{ name: 'crystallized death', objectId: 52719 }, { name: 'toe nails', objectId: 52706 }, { name: 'cluster of crystallized death', objectId: 52720 }, { name: 'blue gem', objectId: 3041 }, { name: 'amber', objectId: 32626 }],
            rare: [{ name: 'amber staff', objectId: 7426 }, { name: 'amber with a bug', objectId: 32624 }, { name: 'amber with a dragonfly', objectId: 32625 }, { name: 'fetid heart', objectId: 52708 }],
          }
        },
        {
          id: 'creepy_crawler',
          name: 'Creepy Crawler',
          hp: 54000,
          exp: 23000,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Creepy_Crawler.gif',
          damageElements: [{ element: 'earth', weight: 1 }, { element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 6, kind: 'resistente' },
            { element: 'energy', value: 12, kind: 'resistente' },
            { element: 'earth', value: -12, kind: 'fraco' },
            { element: 'fire', value: -12, kind: 'fraco' },
            { element: 'ice', value: 6, kind: 'resistente' },
            { element: 'holy', value: -6, kind: 'fraco' },
            { element: 'death', value: 3, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'crystallized death', objectId: 52719 }, { name: 'giant tusk', objectId: 52707 }],
            semiRare: [{ name: 'cyan crystal fragment', objectId: 16125 }, { name: 'blue crystal shard', objectId: 16119 }, { name: 'necromantic core', objectId: 52705 }, { name: 'amber', objectId: 32626 }],
            rare: [{ name: 'cluster of crystallized death', objectId: 52720 }, { name: 'blue gem', objectId: 3041 }, { name: 'amber with a bug', objectId: 32624 }, { name: 'amber with a dragonfly', objectId: 32625 }],
          }
        }
      ]
    },
    {
      id: 'crystal_enigma',
      name: 'Crystal Enigma',
      lean: 'loot',
      creatures: [
        {
          id: 'headpecker',
          name: 'Headpecker',
          hp: 57050,
          exp: 20965,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Headpecker.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: -10, kind: 'fraco' },
            { element: 'energy', value: 10, kind: 'resistente' },
            { element: 'earth', value: 10, kind: 'resistente' },
            { element: 'fire', value: -10, kind: 'fraco' },
            { element: 'ice', value: -10, kind: 'fraco' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: -10, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'headpecker beak', objectId: 39387 }, { name: 'headpecker feather', objectId: 39388 }, { name: 'furry club', objectId: 7432 }, { name: 'knife', objectId: 3291 }, { name: 'spike sword', objectId: 3271 }, { name: 'carrot', objectId: 3595 }],
            semiRare: [{ name: 'war hammer', objectId: 3279 }, { name: 'titan axe', objectId: 7413 }, { name: 'blue gem', objectId: 3041 }, { name: 'wand of starstorm', objectId: 8072 }, { name: 'gold ingot', objectId: 9058 }],
          }
        },
        {
          id: 'mantosaurus',
          name: 'Mantosaurus',
          hp: 67900,
          exp: 20168,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Mantosaurus.gif',
          damageElements: [{ element: 'physical', weight: 1 }, { element: 'earth', weight: 1 }],
          resistances: [
            { element: 'physical', value: -10, kind: 'fraco' },
            { element: 'energy', value: 10, kind: 'resistente' },
            { element: 'earth', value: 5, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: -15, kind: 'fraco' },
            { element: 'holy', value: -15, kind: 'fraco' },
            { element: 'death', value: 5, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'mantosaurus jaw', objectId: 39386 }],
            uncommon: [{ name: 'ultimate mana potion', objectId: 23373 }, { name: 'silver brooch', objectId: 3017 }, { name: 'red crystal fragment', objectId: 16126 }],
            semiRare: [{ name: 'cyan crystal fragment', objectId: 16125 }, { name: 'green crystal shard', objectId: 16121 }, { name: 'coral brooch', objectId: 24391 }, { name: 'gold ring', objectId: 3063 }, { name: 'crystal ring', objectId: 3007 }],
            rare: [{ name: 'amulet of loss', objectId: 3057 }],
          }
        },
        {
          id: 'mercurial_menace',
          name: 'Mercurial Menace',
          hp: 64750,
          exp: 21086,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Mercurial_Menace.gif',
          damageElements: [{ element: 'fire', weight: 1 }, { element: 'energy', weight: 1 }],
          resistances: [
            { element: 'physical', value: 5, kind: 'resistente' },
            { element: 'energy', value: -20, kind: 'fraco' },
            { element: 'earth', value: -10, kind: 'fraco' },
            { element: 'fire', value: 20, kind: 'resistente' },
            { element: 'ice', value: 10, kind: 'resistente' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: -5, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'mercurial wing', objectId: 39395 }],
            uncommon: [{ name: 'terra boots', objectId: 813 }],
            semiRare: [{ name: 'silver brooch', objectId: 3017 }, { name: 'terra rod', objectId: 3065 }, { name: 'wand of defiance', objectId: 16096 }, { name: 'dream blossom staff', objectId: 25700 }, { name: 'coral brooch', objectId: 24391 }, { name: 'lightning boots', objectId: 820 }, { name: 'wand of cosmic energy', objectId: 3073 }, { name: 'gemmed figurine', objectId: 24392 }, { name: 'butterfly ring', objectId: 25698 }],
          }
        },
        {
          id: 'noxious_ripptor',
          name: 'Noxious Ripptor',
          hp: 79450,
          exp: 22994,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Noxious_Ripptor.gif',
          damageElements: [{ element: 'earth', weight: 1 }, { element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 20, kind: 'resistente' },
            { element: 'energy', value: 10, kind: 'resistente' },
            { element: 'earth', value: 10, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: -10, kind: 'fraco' },
            { element: 'holy', value: -10, kind: 'fraco' },
            { element: 'death', value: -10, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'ripptor scales', objectId: 39391 }, { name: 'ultimate health potion', objectId: 7643 }, { name: 'ripptor claw', objectId: 39389 }],
            semiRare: [{ name: 'serpent sword', objectId: 3297 }, { name: 'sacred tree amulet', objectId: 9302 }, { name: 'muck rod', objectId: 16117 }, { name: 'terra legs', objectId: 812 }],
            rare: [{ name: 'wooden spellbook', objectId: 25699 }],
          }
        },
        {
          id: 'shrieking_cry_stal',
          name: 'Shrieking Cry-Stal',
          hp: 72276,
          exp: 23639,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Shrieking_Cry-Stal.gif',
          damageElements: [{ element: 'energy', weight: 1 }, { element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 20, kind: 'resistente' },
            { element: 'energy', value: 10, kind: 'resistente' },
            { element: 'earth', value: -5, kind: 'fraco' },
            { element: 'fire', value: 5, kind: 'resistente' },
            { element: 'ice', value: 5, kind: 'resistente' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'great spirit potion', objectId: 7642 }],
            uncommon: [{ name: 'cry-stal', objectId: 39394 }, { name: 'small diamond', objectId: 3028 }, { name: 'rusted armor', objectId: 8895 }, { name: 'green crystal fragment', objectId: 16127 }, { name: 'terra boots', objectId: 813 }],
            semiRare: [{ name: 'protection amulet', objectId: 3084 }, { name: 'violet gem', objectId: 3036 }],
            rare: [{ name: 'gold ring', objectId: 3063 }, { name: 'green gem', objectId: 3038 }, { name: 'ring of the sky', objectId: 3006 }],
          }
        }
      ]
    },
    {
      id: 'rotten_golem',
      name: 'Rotten Golem',
      lean: 'loot',
      creatures: [
        {
          id: 'rotten_golem',
          name: 'Rotten Golem',
          hp: 56000,
          exp: 24361,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Rotten_Golem.gif',
          damageElements: [{ element: 'earth', weight: 1 }, { element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 20, kind: 'resistente' },
            { element: 'energy', value: -15, kind: 'fraco' },
            { element: 'earth', value: 40, kind: 'resistente' },
            { element: 'fire', value: -25, kind: 'fraco' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 50, kind: 'resistente' },
            { element: 'death', value: -20, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'great spirit potion', objectId: 7642 }],
            semiRare: [{ name: 'sacred tree amulet', objectId: 9302 }, { name: 'underworld rod', objectId: 8082 }, { name: 'titan axe', objectId: 7413 }, { name: 'terra amulet', objectId: 814 }, { name: 'mercenary sword', objectId: 7386 }, { name: 'war axe', objectId: 3342 }, { name: 'giant sword', objectId: 3281 }, { name: 'fur armor', objectId: 22085 }, { name: 'wood cape', objectId: 3575 }, { name: 'stone skin amulet', objectId: 3081 }, { name: 'giant shimmering pearl', objectId: 282 }],
            rare: [{ name: 'terra mantle', objectId: 811 }, { name: 'rubber cap', objectId: 21165 }, { name: 'bag you desire', objectId: 34109 }],
          }
        },
        {
          id: 'branchy_crawler',
          name: 'Branchy Crawler',
          hp: 54000,
          exp: 24361,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Branchy_Crawler.gif',
          damageElements: [{ element: 'earth', weight: 1 }, { element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: -5, kind: 'fraco' },
            { element: 'earth', value: 50, kind: 'resistente' },
            { element: 'fire', value: -9, kind: 'fraco' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 40, kind: 'resistente' },
            { element: 'death', value: -15, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'gold ingot', objectId: 9058 }, { name: 'ultimate health potion', objectId: 7643 }, { name: 'roots', objectId: 33938 }],
            semiRare: [{ name: 'blue gem', objectId: 3041 }, { name: 'crawler\'s essence', objectId: 33939 }, { name: 'terra legs', objectId: 812 }, { name: 'green gem', objectId: 3038 }, { name: 'hammer of wrath', objectId: 3332 }],
            rare: [{ name: 'violet gem', objectId: 3036 }, { name: 'crystal crossbow', objectId: 16163 }, { name: 'nightmare blade', objectId: 7418 }, { name: 'twiceslicer', objectId: 11657 }, { name: 'crystalline sword', objectId: 16160 }, { name: 'ruthless axe', objectId: 6553 }, { name: 'bag you desire', objectId: 34109 }],
          }
        },
        {
          id: 'mould_phantom',
          name: 'Mould Phantom',
          hp: 56000,
          exp: 25002,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Mould_Phantom.gif',
          damageElements: [{ element: 'earth', weight: 1 }, { element: 'death', weight: 1 }],
          resistances: [
            { element: 'physical', value: -10, kind: 'fraco' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 50, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'gold ingot', objectId: 9058 }, { name: 'wand of starstorm', objectId: 8072 }, { name: 'green gem', objectId: 3038 }],
            semiRare: [{ name: 'violet gem', objectId: 3036 }, { name: 'mould heart', objectId: 34141 }, { name: 'wand of defiance', objectId: 16096 }, { name: 'blue gem', objectId: 3041 }, { name: 'wand of voodoo', objectId: 8094 }, { name: 'mould robe', objectId: 34148 }, { name: 'ornate crossbow', objectId: 14247 }, { name: 'collar of blue plasma', objectId: 23542 }, { name: 'ring of blue plasma', objectId: 23529 }],
            rare: [{ name: 'crystal crossbow', objectId: 16163 }, { name: 'bag you desire', objectId: 34109 }],
          }
        }
      ]
    },
    {
      id: 'cloak_of_terror',
      name: 'Cloak Of Terror',
      lean: 'exp',
      creatures: [
        {
          id: 'vibrant_phantom',
          name: 'Vibrant Phantom',
          hp: 54000,
          exp: 36445,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Vibrant_Phantom.gif',
          damageElements: [{ element: 'energy', weight: 1 }, { element: 'holy', weight: 1 }],
          resistances: [
            { element: 'physical', value: -10, kind: 'fraco' },
            { element: 'energy', value: 20, kind: 'resistente' },
            { element: 'earth', value: -10, kind: 'fraco' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 10, kind: 'resistente' },
            { element: 'death', value: -10, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'ultimate health potion', objectId: 7643 }],
            uncommon: [{ name: 'terra rod', objectId: 3065 }, { name: 'violet gem', objectId: 3036 }, { name: 'vibrant heart', objectId: 34143 }, { name: 'gold ingot', objectId: 9058 }, { name: 'blue crystal shard', objectId: 16119 }, { name: 'giant shimmering pearl', objectId: 282 }],
            semiRare: [{ name: 'vibrant robe', objectId: 34144 }, { name: 'springsprout rod', objectId: 8084 }, { name: 'blue gem', objectId: 3041 }, { name: 'hailstorm rod', objectId: 3067 }, { name: 'underworld rod', objectId: 8082 }, { name: 'violet crystal shard', objectId: 16120 }, { name: 'green gem', objectId: 3038 }, { name: 'ring of blue plasma', objectId: 23529 }],
            rare: [{ name: 'bag you desire', objectId: 34109 }],
          }
        },
        {
          id: 'courage_leech',
          name: 'Courage Leech',
          hp: 54000,
          exp: 34965,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Courage_Leech.gif',
          damageElements: [{ element: 'energy', weight: 1 }, { element: 'holy', weight: 1 }],
          resistances: [
            { element: 'physical', value: 20, kind: 'resistente' },
            { element: 'energy', value: 50, kind: 'resistente' },
            { element: 'earth', value: -20, kind: 'fraco' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 30, kind: 'resistente' },
            { element: 'death', value: -25, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'ultimate health potion', objectId: 7643 }],
            semiRare: [{ name: 'lightning pendant', objectId: 816 }, { name: 'lightning legs', objectId: 822 }, { name: 'lightning headband', objectId: 828 }, { name: 'hammer of wrath', objectId: 3332 }, { name: 'jade hammer', objectId: 7422 }, { name: 'dreaded cleaver', objectId: 7419 }, { name: 'onyx flail', objectId: 7421 }, { name: 'gold ring', objectId: 3063 }, { name: 'butcher\'s axe', objectId: 7412 }, { name: 'stone skin amulet', objectId: 3081 }, { name: 'nightmare blade', objectId: 7418 }],
            rare: [{ name: 'demonrage sword', objectId: 7382 }, { name: 'bag you desire', objectId: 34109 }],
          }
        },
        {
          id: 'cloak_of_terror',
          name: 'Cloak of Terror',
          hp: 56000,
          exp: 36445,
          sprite: 'https://www.tibiawiki.com.br/images/c/c4/Cloak_Of_Terror.gif',
          damageElements: [{ element: 'energy', weight: 1 }, { element: 'holy', weight: 1 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 60, kind: 'resistente' },
            { element: 'earth', value: -5, kind: 'fraco' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 40, kind: 'resistente' },
            { element: 'death', value: -20, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'ultimate health potion', objectId: 7643 }, { name: 'gold ingot', objectId: 9058 }, { name: 'wand of starstorm', objectId: 8072 }, { name: 'telescope eye', objectId: 33934 }, { name: 'crown', objectId: 3011 }],
            semiRare: [{ name: 'violet gem', objectId: 3036 }, { name: 'wand of inferno', objectId: 3071 }, { name: 'lightning headband', objectId: 828 }, { name: 'green gem', objectId: 3038 }, { name: 'wand of voodoo', objectId: 8094 }, { name: 'blue gem', objectId: 3041 }, { name: 'brooch of embracement', objectId: 34023 }, { name: 'wand of defiance', objectId: 16096 }],
            rare: [{ name: 'bag you desire', objectId: 34109 }],
          }
        }
      ]
    },
    {
      id: 'monster_graveyard',
      name: 'Monster Graveyard',
      lean: 'loot',
      creatures: [
        {
          id: 'undertaker',
          name: 'Undertaker',
          hp: 70350,
          exp: 23652,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Undertaker.gif',
          damageElements: [{ element: 'death', weight: 1 }, { element: 'earth', weight: 1 }],
          resistances: [
            { element: 'physical', value: -15, kind: 'fraco' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: 10, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: -5, kind: 'fraco' },
            { element: 'death', value: 40, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'great spirit potion', objectId: 7642 }, { name: 'undertaker fangs', objectId: 39380 }, { name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'spider silk', objectId: 5879 }, { name: 'terra boots', objectId: 813 }],
            semiRare: [{ name: 'blue crystal shard', objectId: 16119 }, { name: 'relic sword', objectId: 7383 }, { name: 'terra legs', objectId: 812 }, { name: 'necrotic rod', objectId: 3069 }, { name: 'butterfly ring', objectId: 25698 }, { name: 'wand of voodoo', objectId: 8094 }, { name: 'violet gem', objectId: 3036 }],
          }
        },
        {
          id: 'sulphider',
          name: 'Sulphider',
          hp: 73500,
          exp: 23276,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Sulphider.gif',
          damageElements: [{ element: 'fire', weight: 1 }, { element: 'death', weight: 1 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 20, kind: 'resistente' },
            { element: 'ice', value: -20, kind: 'fraco' },
            { element: 'holy', value: -10, kind: 'fraco' },
            { element: 'death', value: 20, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'sulphur powder', objectId: 39376 }, { name: 'sulphider shell', objectId: 39375 }, { name: 'ultimate mana potion', objectId: 23373 }, { name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'white pearl', objectId: 3026 }],
            semiRare: [{ name: 'fire axe', objectId: 3320 }, { name: 'magma boots', objectId: 818 }, { name: 'crown shield', objectId: 3419 }, { name: 'amber staff', objectId: 7426 }, { name: 'amulet of loss', objectId: 3057 }],
          }
        },
        {
          id: 'sulphur_spouter',
          name: 'Sulphur Spouter',
          hp: 66500,
          exp: 20113,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Sulphur_Spouter.gif',
          damageElements: [{ element: 'fire', weight: 1 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 25, kind: 'resistente' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: -20, kind: 'fraco' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'sulphur powder', objectId: 39376 }, { name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'ultimate mana potion', objectId: 23373 }],
            semiRare: [{ name: 'yellow gem', objectId: 3037 }, { name: 'slightly rusted legs', objectId: 8899 }, { name: 'knight legs', objectId: 3371 }, { name: 'warrior\'s shield', objectId: 14042 }, { name: 'fire sword', objectId: 3280 }, { name: 'giant shimmering pearl', objectId: 282 }, { name: 'red gem', objectId: 3039 }, { name: 'ring of red plasma', objectId: 23533 }],
            rare: [{ name: 'crystal crossbow', objectId: 16163 }],
          }
        },
        {
          id: 'nighthunter',
          name: 'Nighthunter',
          hp: 67200,
          exp: 22087,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Nighthunter.gif',
          damageElements: [{ element: 'death', weight: 1 }, { element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: -10, kind: 'fraco' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 15, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: -25, kind: 'fraco' },
            { element: 'death', value: 20, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'nighthunter wing', objectId: 39381 }],
            uncommon: [{ name: 'ultimate health potion', objectId: 7643 }, { name: 'red crystal fragment', objectId: 16126 }, { name: 'green crystal shard', objectId: 16121 }],
            semiRare: [{ name: 'cyan crystal fragment', objectId: 16125 }, { name: 'yellow gem', objectId: 3037 }, { name: 'crystal sword', objectId: 7449 }, { name: 'warrior\'s axe', objectId: 14040 }, { name: 'spellbook of mind control', objectId: 8074 }, { name: 'stone skin amulet', objectId: 3081 }],
          }
        },
        {
          id: 'stalking_stalk',
          name: 'Stalking Stalk',
          hp: 59850,
          exp: 20204,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Stalking_Stalk.gif',
          damageElements: [{ element: 'earth', weight: 1 }, { element: 'fire', weight: 1 }],
          resistances: [
            { element: 'physical', value: -25, kind: 'fraco' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 25, kind: 'resistente' },
            { element: 'fire', value: 25, kind: 'resistente' },
            { element: 'ice', value: -10, kind: 'fraco' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 10, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'stalking seeds', objectId: 39384 }, { name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'small diamond', objectId: 3028 }, { name: 'green crystal fragment', objectId: 16127 }, { name: 'dragon necklace', objectId: 3085 }, { name: 'opal', objectId: 22194 }],
            semiRare: [{ name: 'magma coat', objectId: 826 }, { name: 'bow', objectId: 3350 }, { name: 'green gem', objectId: 3038 }, { name: 'warrior\'s axe', objectId: 14040 }, { name: 'muck rod', objectId: 16117 }],
          }
        }
      ]
    },

    {
      id: 'sparkling_pools',
      name: 'Sparkling Pools',
      lean: 'exp',
      creatures: [
        {
          id: 'emerald_tortoise',
          name: 'Emerald Tortoise',
          hp: 78050,
          exp: 21362,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Emerald_Tortoise.gif',
          damageElements: [{ element: 'earth', weight: 1 }, { element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 20, kind: 'resistente' },
            { element: 'energy', value: 10, kind: 'resistente' },
            { element: 'earth', value: -15, kind: 'fraco' },
            { element: 'fire', value: 10, kind: 'resistente' },
            { element: 'ice', value: 10, kind: 'resistente' },
            { element: 'holy', value: 10, kind: 'resistente' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'emerald tortoise shell', objectId: 39379 }, { name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'great spirit potion', objectId: 7642 }, { name: 'blue crystal shard', objectId: 16119 }, { name: 'green crystal fragment', objectId: 16127 }, { name: 'violet gem', objectId: 3036 }],
            semiRare: [{ name: 'red crystal fragment', objectId: 16126 }, { name: 'yellow gem', objectId: 3037 }, { name: 'white pearl', objectId: 3026 }, { name: 'green crystal shard', objectId: 16121 }, { name: 'green gem', objectId: 3038 }, { name: 'orichalcum pearl', objectId: 5021 }, { name: 'black pearl', objectId: 3027 }, { name: 'giant shimmering pearl', objectId: 282 }, { name: 'red gem', objectId: 3039 }],
          }
        },
        {
          id: 'gore_horn',
          name: 'Gore Horn',
          hp: 72170,
          exp: 22183,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Gore_Horn.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 50, kind: 'resistente' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: -10, kind: 'fraco' },
            { element: 'ice', value: 10, kind: 'resistente' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'gore horn', objectId: 39377 }, { name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'big bone', objectId: 3116 }, { name: 'dwarven ring', objectId: 3097 }],
            semiRare: [{ name: 'metal spats', objectId: 21169 }, { name: 'knight legs', objectId: 3371 }, { name: 'diamond sceptre', objectId: 7387 }, { name: 'doublet', objectId: 3379 }, { name: 'hammer of wrath', objectId: 3332 }],
          }
        },
        {
          id: 'gorerilla',
          name: 'Gorerilla',
          hp: 58976,
          exp: 23199,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Gorerilla.gif',
          damageElements: [{ element: 'physical', weight: 1 }, { element: 'fire', weight: 1 }],
          resistances: [
            { element: 'physical', value: 30, kind: 'resistente' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 20, kind: 'resistente' },
            { element: 'ice', value: -5, kind: 'fraco' },
            { element: 'holy', value: -5, kind: 'fraco' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'gorerilla mane', objectId: 39392 }, { name: 'gorerilla tail', objectId: 39393 }],
            uncommon: [{ name: 'ultimate mana potion', objectId: 23373 }, { name: 'doublet', objectId: 3379 }],
            semiRare: [{ name: 'magma coat', objectId: 826 }],
            rare: [{ name: 'black pearl', objectId: 3027 }, { name: 'crystal crossbow', objectId: 16163 }, { name: 'composite hornbow', objectId: 8027 }, { name: 'ornate crossbow', objectId: 14247 }],
          }
        },
        {
          id: 'hulking_prehemoth',
          name: 'Hulking Prehemoth',
          hp: 72450,
          exp: 22349,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Hulking_Prehemoth.gif',
          damageElements: [{ element: 'fire', weight: 1 }, { element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 5, kind: 'resistente' },
            { element: 'energy', value: 30, kind: 'resistente' },
            { element: 'earth', value: -20, kind: 'fraco' },
            { element: 'fire', value: 40, kind: 'resistente' },
            { element: 'ice', value: -15, kind: 'fraco' },
            { element: 'holy', value: -15, kind: 'fraco' },
            { element: 'death', value: -20, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'prehemoth horns', objectId: 39382 }, { name: 'prehemoth claw', objectId: 39383 }, { name: 'ultimate health potion', objectId: 7643 }],
            uncommon: [{ name: 'furry club', objectId: 7432 }, { name: 'war hammer', objectId: 3279 }],
            semiRare: [{ name: 'war axe', objectId: 3342 }, { name: 'doublet', objectId: 3379 }, { name: 'silver brooch', objectId: 3017 }, { name: 'emerald bangle', objectId: 3010 }],
          }
        },
        {
          id: 'sabretooth',
          name: 'Sabretooth',
          hp: 60550,
          exp: 21013,
          sprite: 'https://www.tibiawiki.com.br/images/9/98/Sabretooth_%28Criatura%29.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: -10, kind: 'fraco' },
            { element: 'energy', value: 10, kind: 'resistente' },
            { element: 'earth', value: -10, kind: 'fraco' },
            { element: 'fire', value: -10, kind: 'fraco' },
            { element: 'ice', value: -10, kind: 'fraco' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'sabretooth fur', objectId: 39378 }, { name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'elven amulet', objectId: 3082 }, { name: 'wand of inferno', objectId: 3071 }, { name: 'dragon necklace', objectId: 3085 }, { name: 'magma coat', objectId: 826 }],
            semiRare: [{ name: 'sacred tree amulet', objectId: 9302 }, { name: 'fire sword', objectId: 3280 }, { name: 'wand of dragonbreath', objectId: 3075 }, { name: 'metal spats', objectId: 21169 }],
          }
        }
      ]
    },
    {
      id: 'infernal_demon',
      name: 'Infernal Demon',
      lean: 'loot',
      creatures: [
        {
          id: 'infernal_phantom',
          name: 'Infernal Phantom',
          hp: 52000,
          exp: 29332,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Infernal_Phantom.gif',
          damageElements: [{ element: 'fire', weight: 1 }, { element: 'death', weight: 1 }],
          resistances: [
            { element: 'physical', value: -10, kind: 'fraco' },
            { element: 'energy', value: 1, kind: 'resistente' },
            { element: 'earth', value: -10, kind: 'fraco' },
            { element: 'fire', value: 80, kind: 'resistente' },
            { element: 'ice', value: -20, kind: 'fraco' },
            { element: 'holy', value: -20, kind: 'fraco' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'terra rod', objectId: 3065 }, { name: 'ultimate health potion', objectId: 7643 }],
            uncommon: [{ name: 'hailstorm rod', objectId: 3067 }, { name: 'springsprout rod', objectId: 8084 }, { name: 'infernal heart', objectId: 34139 }, { name: 'underworld rod', objectId: 8082 }, { name: 'fire axe', objectId: 3320 }, { name: 'wand of starstorm', objectId: 8072 }, { name: 'glorious axe', objectId: 7454 }],
            semiRare: [{ name: 'infernal robe', objectId: 34146 }, { name: 'chaos mace', objectId: 7427 }, { name: 'titan axe', objectId: 7413 }, { name: 'wand of voodoo', objectId: 8094 }, { name: 'crystal mace', objectId: 3333 }, { name: 'war axe', objectId: 3342 }, { name: 'warrior\'s axe', objectId: 14040 }],
            rare: [{ name: 'bag you desire', objectId: 34109 }],
          }
        },
        {
          id: 'infernal_demon',
          name: 'Infernal Demon',
          hp: 64000,
          exp: 32420,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Infernal_Demon.gif',
          damageElements: [{ element: 'fire', weight: 1 }, { element: 'death', weight: 1 }],
          resistances: [
            { element: 'physical', value: 30, kind: 'resistente' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 40, kind: 'resistente' },
            { element: 'ice', value: -20, kind: 'fraco' },
            { element: 'holy', value: -25, kind: 'fraco' },
            { element: 'death', value: 50, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'ultimate health potion', objectId: 7643 }, { name: 'gold ingot', objectId: 9058 }],
            uncommon: [{ name: 'cyan crystal fragment', objectId: 16125 }, { name: 'red crystal fragment', objectId: 16126 }, { name: 'blue crystal shard', objectId: 16119 }, { name: 'small diamond', objectId: 3028 }, { name: 'blue gem', objectId: 3041 }, { name: 'green crystal fragment', objectId: 16127 }, { name: 'magma amulet', objectId: 817 }],
            semiRare: [{ name: 'mercenary sword', objectId: 7386 }, { name: 'onyx chip', objectId: 22193 }, { name: 'war axe', objectId: 3342 }, { name: 'giant sword', objectId: 3281 }, { name: 'magma boots', objectId: 818 }],
            rare: [{ name: 'stone skin amulet', objectId: 3081 }, { name: 'bag you desire', objectId: 34109 }],
          }
        },
        {
          id: 'brachiodemon',
          name: 'Brachiodemon',
          hp: 50000,
          exp: 29332,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Brachiodemon.gif',
          damageElements: [{ element: 'fire', weight: 1 }, { element: 'death', weight: 1 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 30, kind: 'resistente' },
            { element: 'ice', value: -25, kind: 'fraco' },
            { element: 'holy', value: -35, kind: 'fraco' },
            { element: 'death', value: 50, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'ultimate health potion', objectId: 7643 }],
            uncommon: [{ name: 'epee', objectId: 3326 }, { name: 'hand', objectId: 33935 }, { name: 'head', objectId: 33932 }],
            semiRare: [{ name: 'crystal mace', objectId: 3333 }, { name: 'noble axe', objectId: 7456 }, { name: 'spellbook of mind control', objectId: 8074 }, { name: 'skull staff', objectId: 3324 }, { name: 'royal helmet', objectId: 3392 }, { name: 'jade hammer', objectId: 7422 }, { name: 'metal bat', objectId: 21171 }, { name: 'ring of green plasma', objectId: 23531 }],
            rare: [{ name: 'diabolic skull', objectId: 34025 }, { name: 'fire axe', objectId: 3320 }, { name: 'crystalline sword', objectId: 16160 }, { name: 'butcher\'s axe', objectId: 7412 }, { name: 'mastermind shield', objectId: 3414 }, { name: 'assassin dagger', objectId: 7404 }, { name: 'alloy legs', objectId: 21168 }, { name: 'bag you desire', objectId: 34109 }],
          }
        }
      ]
    },
    {
      id: 'bony_sea_devil',
      name: 'Bony Sea Devil',
      lean: 'loot',
      creatures: [
        {
          id: 'turbulent_elemental',
          name: 'Turbulent Elemental',
          hp: 56000,
          exp: 32138,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Turbulent_Elemental.gif',
          damageElements: [{ element: 'ice', weight: 1 }, { element: 'earth', weight: 1 }],
          resistances: [
            { element: 'physical', value: 10, kind: 'resistente' },
            { element: 'energy', value: -10, kind: 'fraco' },
            { element: 'earth', value: 40, kind: 'resistente' },
            { element: 'fire', value: -20, kind: 'fraco' },
            { element: 'ice', value: 30, kind: 'resistente' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'gold ingot', objectId: 9058 }, { name: 'ultimate health potion', objectId: 7643 }],
            uncommon: [{ name: 'sacred tree amulet', objectId: 9302 }, { name: 'blue gem', objectId: 3041 }, { name: 'springsprout rod', objectId: 8084 }],
            semiRare: [{ name: 'northwind rod', objectId: 8083 }, { name: 'violet gem', objectId: 3036 }, { name: 'glacier amulet', objectId: 815 }, { name: 'glacier robe', objectId: 824 }, { name: 'fur armor', objectId: 22085 }, { name: 'wood cape', objectId: 3575 }],
            rare: [{ name: 'crystalline armor', objectId: 8050 }, { name: 'rubber cap', objectId: 21165 }, { name: 'stone skin amulet', objectId: 3081 }, { name: 'bag you desire', objectId: 34109 }],
          }
        },
        {
          id: 'hazardous_phantom',
          name: 'Hazardous Phantom',
          hp: 140000,
          exp: 109560,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Hazardous_Phantom.gif',
          damageElements: [{ element: 'ice', weight: 1 }, { element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'ultimate health potion', objectId: 7643 }, { name: 'gold ingot', objectId: 9058 }],
            uncommon: [{ name: 'hailstorm rod', objectId: 3067 }, { name: 'green gem', objectId: 3038 }, { name: 'violet gem', objectId: 3036 }, { name: 'gemmed figurine', objectId: 24392 }, { name: 'hazardous robe', objectId: 34147 }],
            semiRare: [{ name: 'hazardous heart', objectId: 34140 }, { name: 'blue gem', objectId: 3041 }, { name: 'northwind rod', objectId: 8083 }, { name: 'glacier robe', objectId: 824 }, { name: 'giant shimmering pearl', objectId: 282 }],
            rare: [{ name: 'wand of everblazing', objectId: 16115 }, { name: 'bag you desire', objectId: 34109 }, { name: 'collar of blue plasma', objectId: 23542 }],
          }
        },
        {
          id: 'capricious_phantom',
          name: 'Capricious Phantom',
          hp: 60000,
          exp: 32138,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Capricious_Phantom.gif',
          damageElements: [{ element: 'earth', weight: 1 }, { element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: -10, kind: 'fraco' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 50, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'great spirit potion', objectId: 7642 }],
            uncommon: [{ name: 'blue gem', objectId: 3041 }, { name: 'gold ingot', objectId: 9058 }, { name: 'capricious heart', objectId: 34138 }, { name: 'violet gem', objectId: 3036 }],
            semiRare: [{ name: 'capricious robe', objectId: 34145 }, { name: 'fur armor', objectId: 22085 }, { name: 'wood cape', objectId: 3575 }, { name: 'glacial rod', objectId: 16118 }, { name: 'ornate crossbow', objectId: 14247 }, { name: 'ring of blue plasma', objectId: 23529 }, { name: 'collar of blue plasma', objectId: 23542 }],
            rare: [{ name: 'bag you desire', objectId: 34109 }],
          }
        },
        {
          id: 'bony_sea_devil',
          name: 'Bony Sea Devil',
          hp: 48000,
          exp: 32320,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Bony_Sea_Devil.gif',
          damageElements: [{ element: 'ice', weight: 1 }, { element: 'earth', weight: 1 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 40, kind: 'resistente' },
            { element: 'fire', value: -5, kind: 'fraco' },
            { element: 'ice', value: 60, kind: 'resistente' },
            { element: 'holy', value: -10, kind: 'fraco' },
            { element: 'death', value: 5, kind: 'resistente' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'ultimate health potion', objectId: 7643 }],
            uncommon: [{ name: 'gold ingot', objectId: 9058 }, { name: 'hailstorm rod', objectId: 3067 }, { name: 'onyx chip', objectId: 22193 }, { name: 'green crystal fragment', objectId: 16127 }, { name: 'giant shimmering pearl', objectId: 282 }],
            semiRare: [{ name: 'wand of voodoo', objectId: 8094 }, { name: 'violet gem', objectId: 3036 }, { name: 'jaws', objectId: 34014 }, { name: 'rainbow quartz', objectId: 25737 }, { name: 'northwind rod', objectId: 8083 }, { name: 'underworld rod', objectId: 8082 }, { name: 'skullcracker armor', objectId: 8061 }, { name: 'glacial rod', objectId: 16118 }, { name: 'rod', objectId: 11826 }],
            rare: [{ name: 'goblet of gloom', objectId: 34022 }, { name: 'glacier kilt', objectId: 823 }, { name: 'bag you desire', objectId: 34109 }],
          }
        }
      ]
    },
    {
      id: 'dark_thais',
      name: 'Dark Thais',
      lean: 'loot',
      creatures: [
        {
          id: 'sorcerers_apparition',
          name: 'Sorcerer\'s Apparition',
          hp: 50000,
          exp: 28600,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Sorcerer%27s_Apparition.gif',
          damageElements: [{ element: 'ice', weight: 1 }, { element: 'energy', weight: 1 }],
          resistances: [
            { element: 'physical', value: -20, kind: 'fraco' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: -20, kind: 'fraco' },
            { element: 'ice', value: 30, kind: 'resistente' },
            { element: 'holy', value: 40, kind: 'resistente' },
            { element: 'death', value: -20, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'great mana potion', objectId: 238 }],
            uncommon: [{ name: 'blue gem', objectId: 3041 }, { name: 'wand of voodoo', objectId: 8094 }, { name: 'ring of red plasma', objectId: 23533 }],
            semiRare: [{ name: 'violet gem', objectId: 3036 }, { name: 'glacier amulet', objectId: 815 }, { name: 'wand of everblazing', objectId: 16115 }, { name: 'wand of defiance', objectId: 16096 }, { name: 'wand of starstorm', objectId: 8072 }, { name: 'stone skin amulet', objectId: 3081 }, { name: 'ring of green plasma', objectId: 23531 }, { name: 'ring of blue plasma', objectId: 23529 }],
            rare: [{ name: 'alloy legs', objectId: 21168 }, { name: 'bag you desire', objectId: 34109 }],
          }
        },
        {
          id: 'paladins_apparition',
          name: 'Paladin\'s Apparition',
          hp: 50000,
          exp: 28600,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Paladin%27s_Apparition.gif',
          damageElements: [{ element: 'holy', weight: 1 }, { element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 20, kind: 'resistente' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: -11, kind: 'fraco' },
            { element: 'ice', value: 30, kind: 'resistente' },
            { element: 'holy', value: 40, kind: 'resistente' },
            { element: 'death', value: -20, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'warrior helmet', objectId: 3369 }, { name: 'blue gem', objectId: 3041 }, { name: 'great spirit potion', objectId: 7642 }, { name: 'violet gem', objectId: 3036 }, { name: 'glacier mask', objectId: 829 }, { name: 'glacier amulet', objectId: 815 }, { name: 'green gem', objectId: 3038 }],
            semiRare: [{ name: 'wood cape', objectId: 3575 }, { name: 'skull helmet', objectId: 5741 }, { name: 'stone skin amulet', objectId: 3081 }, { name: 'collar of blue plasma', objectId: 23542 }, { name: 'ring of blue plasma', objectId: 23529 }],
            rare: [{ name: 'bag you desire', objectId: 34109 }],
          }
        },
        {
          id: 'monks_apparition',
          name: 'Monk\'s Apparition',
          hp: 50000,
          exp: 18870,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Monk%27s_Apparition.gif',
          damageElements: [{ element: 'physical', weight: 1 }, { element: 'holy', weight: 1 }],
          resistances: [
            { element: 'physical', value: 50, kind: 'resistente' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: -20, kind: 'fraco' },
            { element: 'ice', value: 10, kind: 'resistente' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: -20, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'ultimate health potion', objectId: 7643 }, { name: 'epee', objectId: 3326 }, { name: 'green gem', objectId: 3038 }],
            semiRare: [{ name: 'violet gem', objectId: 3036 }, { name: 'glacier amulet', objectId: 815 }, { name: 'crystal mace', objectId: 3333 }, { name: 'giant sword', objectId: 3281 }, { name: 'stone skin amulet', objectId: 3081 }],
            rare: [{ name: 'crown shield', objectId: 3419 }, { name: 'bag you desire', objectId: 34109 }],
          }
        },
        {
          id: 'knights_apparition',
          name: 'Knight\'s Apparition',
          hp: 50000,
          exp: 28600,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Knight%27s_Apparition.gif',
          damageElements: [{ element: 'physical', weight: 1 }],
          resistances: [
            { element: 'physical', value: 50, kind: 'resistente' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: -20, kind: 'fraco' },
            { element: 'ice', value: 10, kind: 'resistente' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: -20, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'ultimate health potion', objectId: 7643 }, { name: 'epee', objectId: 3326 }, { name: 'green gem', objectId: 3038 }],
            semiRare: [{ name: 'violet gem', objectId: 3036 }, { name: 'glacier amulet', objectId: 815 }, { name: 'crystal mace', objectId: 3333 }, { name: 'giant sword', objectId: 3281 }, { name: 'stone skin amulet', objectId: 3081 }],
            rare: [{ name: 'crown shield', objectId: 3419 }, { name: 'bag you desire', objectId: 34109 }],
          }
        },
        {
          id: 'druids_apparition',
          name: 'Druid\'s Apparition',
          hp: 50000,
          exp: 28600,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Druid%27s_Apparition.gif',
          damageElements: [{ element: 'ice', weight: 1 }, { element: 'earth', weight: 1 }],
          resistances: [
            { element: 'physical', value: -20, kind: 'fraco' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: -20, kind: 'fraco' },
            { element: 'ice', value: 30, kind: 'resistente' },
            { element: 'holy', value: 40, kind: 'resistente' },
            { element: 'death', value: -20, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'terra rod', objectId: 3065 }, { name: 'great mana potion', objectId: 238 }],
            uncommon: [{ name: 'blue gem', objectId: 3041 }, { name: 'green gem', objectId: 3038 }, { name: 'stone skin amulet', objectId: 3081 }],
            semiRare: [{ name: 'glacier amulet', objectId: 815 }, { name: 'sacred tree amulet', objectId: 9302 }, { name: 'springsprout rod', objectId: 8084 }, { name: 'underworld rod', objectId: 8082 }, { name: 'platinum amulet', objectId: 3055 }, { name: 'glacier robe', objectId: 824 }],
            rare: [{ name: 'bag you desire', objectId: 34109 }, { name: 'collar of red plasma', objectId: 23544 }],
          }
        },
        {
          id: 'distorted_phantom',
          name: 'Distorted Phantom',
          hp: 52000,
          exp: 18870,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Distorted_Phantom.gif',
          damageElements: [{ element: 'earth', weight: 1 }, { element: 'death', weight: 1 }],
          resistances: [
            { element: 'physical', value: -10, kind: 'fraco' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 50, kind: 'resistente' },
            { element: 'fire', value: 0, kind: 'neutro' },
            { element: 'ice', value: 0, kind: 'neutro' },
            { element: 'holy', value: 0, kind: 'neutro' },
            { element: 'death', value: 0, kind: 'neutro' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }, { name: 'great spirit potion', objectId: 7642 }],
            uncommon: [{ name: 'distorted heart', objectId: 34142 }, { name: 'underworld rod', objectId: 8082 }, { name: 'distorted robe', objectId: 34149 }, { name: 'violet gem', objectId: 3036 }, { name: 'ring of blue plasma', objectId: 23529 }],
            semiRare: [{ name: 'springsprout rod', objectId: 8084 }, { name: 'gold ingot', objectId: 9058 }, { name: 'spellbook of warding', objectId: 8073 }, { name: 'glacial rod', objectId: 16118 }, { name: 'ring of red plasma', objectId: 23533 }, { name: 'ring of green plasma', objectId: 23531 }],
            rare: [{ name: 'bag you desire', objectId: 34109 }],
          }
        },
        {
          id: 'many_faces',
          name: 'Many Faces',
          hp: 60000,
          exp: 18870,
          sprite: 'https://www.tibiawiki.com.br/wiki/Special:FilePath/Many_Faces.gif',
          damageElements: [{ element: 'holy', weight: 1 }, { element: 'death', weight: 1 }],
          resistances: [
            { element: 'physical', value: 0, kind: 'neutro' },
            { element: 'energy', value: 0, kind: 'neutro' },
            { element: 'earth', value: 0, kind: 'neutro' },
            { element: 'fire', value: -5, kind: 'fraco' },
            { element: 'ice', value: 30, kind: 'resistente' },
            { element: 'holy', value: 50, kind: 'resistente' },
            { element: 'death', value: -30, kind: 'fraco' },
          ],
          drops: {
            common: [{ name: 'crystal coin', objectId: 3043 }],
            uncommon: [{ name: 'ultimate health potion', objectId: 7643 }, { name: 'apron', objectId: 33933 }, { name: 'hailstorm rod', objectId: 3067 }, { name: 'stone skin amulet', objectId: 3081 }, { name: 'green gem', objectId: 3038 }, { name: 'northwind rod', objectId: 8083 }, { name: 'sacred tree amulet', objectId: 9302 }, { name: 'violet gem', objectId: 3036 }, { name: 'blue gem', objectId: 3041 }, { name: 'ring of red plasma', objectId: 23533 }],
            semiRare: [{ name: 'glacier shoes', objectId: 819 }, { name: 'glacier robe', objectId: 824 }, { name: 'head', objectId: 33932 }],
            rare: [{ name: 'gruesome fan', objectId: 34024 }, { name: 'glacial rod', objectId: 16118 }, { name: 'bag you desire', objectId: 34109 }],
          }
        }
      ]
    }
  ];

  function normalizeDrop(drop) {
    if (!drop) return null;
    const objectId = Number(drop.objectId) || 0;
    const name = String(drop.name || '').trim();
    const image = String(drop.image || '').trim() || (objectId ? objectImg(objectId) : '');
    if (!name) return null;
    return {
      name,
      objectId: objectId || 0,
      image
    };
  }

  function normalizeDamageElements(raw) {
    if (!raw) return [];
    const list = Array.isArray(raw) ? raw : [raw];
    const out = [];
    for (const item of list) {
      if (!item) continue;
      if (typeof item === 'string') {
        const element = String(item).trim().toLowerCase();
        if (!element) continue;
        out.push({
          element,
          weight: 1,
          icon: elementImg(element)
        });
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
          weight: Number.isFinite(weight) && weight > 0 ? weight : 1,
          icon: item.icon ? String(item.icon) : elementImg(element)
        });
      }
    }
    return out;
  }

  function normalizeCreature(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const id = String(raw.id || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_');
    const name = String(raw.name || '').trim();
    if (!id || !name) return null;

    const dropsIn = raw.drops || {};
    const mapList = (list) =>
      (Array.isArray(list) ? list : []).map(normalizeDrop).filter(Boolean);

    const damageElements = normalizeDamageElements(raw.damageElements);

    return {
      id,
      name,
      hp: Math.max(0, Number(raw.hp) || 0),
      exp: Math.max(0, Number(raw.exp) || 0),
      sprite: String(raw.sprite || '').trim(),
      damageElements,
      resistances: (Array.isArray(raw.resistances) ? raw.resistances : []).map((r) => ({
        element: String(r.element || '').toLowerCase(),
        value: Number(r.value) || 0,
        kind: String(r.kind || 'neutro').toLowerCase(),
        icon: elementImg(r.element)
      })),
      drops: {
        common: mapList(dropsIn.common),
        uncommon: mapList(dropsIn.uncommon),
        semiRare: mapList(dropsIn.semiRare),
        rare: mapList(dropsIn.rare),
        veryRare: mapList(dropsIn.veryRare)
      }
    };
  }

  function normalizeHunt(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const id = String(raw.id || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_');
    const name = String(raw.name || '').trim();
    if (!id || !name) return null;

    const creatures = (Array.isArray(raw.creatures) ? raw.creatures : [])
      .map(normalizeCreature)
      .filter(Boolean);

    const damageElements = normalizeDamageElements(raw.damageElements);

    return {
      id,
      name,
      lean: (() => {
        const v = String(raw.lean || '')
          .trim()
          .toLowerCase();
        return v === 'loot' || v === 'exp' ? v : '';
      })(),
      damageElements,
      creatures
    };
  }

  const catalog = HUNTS.map(normalizeHunt).filter(Boolean);

  root.BAIAK_IDLE_HUNT_ORIGIN = ORIGIN;
  root.BAIAK_IDLE_HUNT_OBJECT_IMG = objectImg;
  root.BAIAK_IDLE_HUNT_ELEMENT_IMG = elementImg;
  root.BAIAK_IDLE_HUNT_DETAILS = catalog;

  root.BAIAK_IDLE_GET_HUNT = function (idOrName) {
    const key = String(idOrName || '')
      .trim()
      .toLowerCase();
    if (!key) return null;
    return (
      catalog.find((h) => h.id === key) ||
      catalog.find((h) => h.name.toLowerCase() === key) ||
      null
    );
  };

  root.BAIAK_IDLE_GET_HUNT_CREATURE = function (huntIdOrName, creatureIdOrName) {
    const hunt = root.BAIAK_IDLE_GET_HUNT(huntIdOrName);
    if (!hunt) return null;
    const key = String(creatureIdOrName || '')
      .trim()
      .toLowerCase();
    if (!key) return null;
    return (
      hunt.creatures.find((c) => c.id === key) ||
      hunt.creatures.find((c) => c.name.toLowerCase() === key) ||
      null
    );
  };
})(typeof window !== 'undefined' ? window : globalThis);
