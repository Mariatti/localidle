/* TB-WM u=179 e=a07d5b4cfa x=f2e5047b9289 t=1786720284 s=f16447ae4422ab5a */
(function(){try{window.__TIBIABOT_WM__={u:179,t:1786720284,x:"f2e5047b9289",s:"f16447ae4422ab5a"};}catch(e){}})();

/**
 * CatÃ¡logo do Codex Baiak-Idle (DomÃ­nio I das hunts).
 * MÃ³dulo interno servido por /api/codex.php (nÃ£o empacotar na extensÃ£o).
 */
(function () {
  function it(name, objectId, qty) {
    return { name: name, objectId: objectId, qty: qty };
  }

  function cx(id, slug, name, huntName, bonus, items, category) {
    return {
      id: id,
      slug: slug,
      name: name,
      huntName: huntName,
      category: category || 'Hunts',
      bonus: bonus,
      items: items
    };
  }

  window.BAIAK_IDLE_CODEX = [
    cx(1, 'hunt-troll-cave', 'DomÃ­nio: Troll Cave I', 'Troll Cave', 'Velocidade de movimento +0.4', [
      it('fish', 3578, 125),
      it('mouldy cheese', 3120, 50),
      it('medicine pouch', 12517, 25),
      it('wood', 5901, 25),
      it('troll green', 3741, 25),
      it('heavy old tome', 23986, 10)
    ]),
    cx(4, 'hunt-elf-lair', 'DomÃ­nio: Elf I', 'Elf', 'Roubo de vida +0.1%', [
      it('melon', 3593, 300),
      it('grapes', 3592, 225),
      it('bread', 3600, 150),
      it('elvish talisman', 9635, 150),
      it('elven scouting glass', 11464, 150),
      it('sling herb', 3738, 75),
      it('holy orchid', 5922, 25),
      it('candlestick', 2917, 25),
      it('life crystal', 3061, 15),
      it('grave flower', 3661, 15)
    ]),
    cx(7, 'hunt-amazon-camp', 'DomÃ­nio: Amazon I', 'Amazon', 'Mana +0.5%', [
      it('skull', 3114, 150),
      it('brown bread', 3602, 100),
      it('girlish hair decoration', 11443, 75),
      it('protective charm', 11444, 50),
      it('torch', 2920, 25)
    ]),
    cx(10, 'hunt-minotaur', 'DomÃ­nio: Minotaur I', 'Minotaur', 'Roubo de mana +0.1%', [
      it('broken crossbow', 11451, 125),
      it('piercing bolt', 7363, 75),
      it('minotaur horn', 11472, 75),
      it('piece of archer armor', 11483, 75),
      it('piece of warrior armor', 11482, 75),
      it('minotaur leather', 5878, 50),
      it('fishing rod', 3483, 5),
      it('minotaur trophy', 7401, 1)
    ]),
    cx(13, 'hunt-kongra', 'DomÃ­nio: Kongra I', 'Kongra', 'Roubo de vida +0.1%', [
      it('orange', 3586, 75),
      it('banana sash', 11511, 50),
      it("kongra's shoulderpad", 11471, 25),
      it('coconut', 3589, 15),
      it('melon', 3593, 15),
      it('ape fur', 5883, 25)
    ]),
    cx(16, 'hunt-cyclopolis', 'DomÃ­nio: Cyclopolis I', 'Cyclopolis', 'Velocidade de movimento +0.4', [
      it('cyclops toe', 9657, 150),
      it('heavy old tome', 23986, 75),
      it('cyclops trophy', 7398, 8)
    ]),
    cx(19, 'hunt-corym-cave', 'DomÃ­nio: Corym Skirmisher I', 'Corym Skirmisher', 'Roubo de vida +0.1%', [
      it('rat cheese', 17821, 75),
      it('cheese cutter', 17817, 50),
      it('soft cheese', 17820, 50),
      it('earflap', 17819, 25),
      it('bola', 17809, 25),
      it('cheesy figurine', 17818, 25),
      it('rat god doll', 17825, 1)
    ]),
    cx(22, 'hunt-refiner-cave', 'DomÃ­nio: Stone Refiner I', 'Stone Refiner', 'Roubo de mana +0.2%', [
      it('rare earth', 27301, 1500),
      it('coal', 12600, 1500),
      it('glob of acid slime', 9054, 1500),
      it("stonerefiner's skull", 27606, 1500),
      it('poisonous slime', 9640, 1500),
      it('half-digested stones', 27369, 1500)
    ]),
    cx(25, 'hunt-giant-spider', 'DomÃ­nio: Giant Spider I', 'Giant Spider', 'Roubo de mana +0.2%', [
      it('poison arrow', 3448, 475),
      it('tarantula egg', 10281, 350),
      it('spider fangs', 8031, 250),
      it('spider silk', 5879, 125)
    ]),
    cx(28, 'hunt-crawler-cave', 'DomÃ­nio: Crawler I', 'Crawler', 'Mana +0.8%', [
      it('crawler head plating', 14079, 700),
      it('compound eye', 14083, 700),
      it('swarmer antenna', 14076, 700),
      it('dung ball', 14225, 700)
    ]),
    cx(31, 'hunt-glooth-cave', 'DomÃ­nio: Glooth Bandit I', 'Glooth Bandit', 'Roubo de mana +0.2%', [
      it('tainted glooth capsule', 21816, 225),
      it('glooth sandwich', 21143, 225),
      it('glooth capsule', 21814, 225),
      it('glooth steak', 21146, 225)
    ]),
    cx(34, 'hunt-hero-cave', 'DomÃ­nio: Hero I', 'Hero', 'Mana +0.8%', [
      it('red rose', 3658, 325),
      it('grapes', 3592, 325),
      it('scroll of heroic deeds', 11510, 250),
      it('red piece of cloth', 5911, 75),
      it('lyre', 2949, 75),
      it('piggy bank', 2995, 3)
    ]),
    cx(37, 'hunt-cult-cave', 'DomÃ­nio: Cult I', 'Cult', 'Mana +0.9%', [
      it('small notebook', 11450, 50),
      it('scroll of heroic deeds', 11510, 50),
      it('scroll', 347, 50),
      it('red rose', 3658, 50),
      it('red piece of cloth', 5911, 15)
    ]),
    cx(40, 'hunt-dragon-lair', 'DomÃ­nio: Dragon Lair I', 'Dragon Lair', 'Mana +0.9%', [
      it('green mushroom', 3732, 350),
      it("dragon's tail", 11457, 225),
      it('golden mug', 2903, 125),
      it('red dragon scale', 5882, 125),
      it('red dragon leather', 5948, 125),
      it('life crystal', 3061, 25),
      it('dragon lord trophy', 7399, 10)
    ]),
    cx(43, 'hunt-hydra-cave', 'DomÃ­nio: Hydra I', 'Hydra', 'Mana +1%', [
      it('hydra head', 10282, 700),
      it('boggy dreads', 9667, 700),
      it('cucumber', 8014, 700),
      it('life crystal', 3061, 100),
      it('hydra egg', 4839, 100)
    ]),
    cx(46, 'hunt-behemoth-cave', 'DomÃ­nio: Behemoth I', 'Behemoth', 'Roubo de vida +0.2%', [
      it('lump of earth', 10305, 50),
      it('battle stone', 11447, 50),
      it('coal', 12600, 50),
      it('vein of ore', 16135, 50),
      it('pulverized ore', 16133, 50),
      it('bowl of glooth soup', 21144, 15),
      it('slimy leaf tentacle', 21197, 15),
      it('glob of glooth', 21182, 15),
      it('perfect behemoth fang', 5893, 15),
      it('talon', 3034, 5),
      it('strange symbol', 3058, 5),
      it('clay lump', 10422, 5),
      it('big bone', 3116, 5),
      it('behemoth trophy', 2675, 5),
      it('amphora', 2893, 5)
    ]),
    cx(49, 'hunt-crumbling-cave', 'DomÃ­nio: Crumbling Caverns I', 'Crumbling Caverns', 'Velocidade de movimento +0.8', [
      it('sealing wax', 51426, 100),
      it('paper plane', 51419, 100),
      it('silver brooch', 3017, 100),
      it('hydra head', 10282, 100),
      it('cave turnip', 24383, 100),
      it('book with an hourglass', 51425, 100),
      it('blank imbuement scroll', 51442, 100),
      it('etcher', 51443, 25)
    ]),
    cx(52, 'hunt-grimreaper-cave', 'DomÃ­nio: Grim Reaper I', 'Grim Reaper', 'Mana +1.2%', [
      it('lyre', 2949, 25),
      it('soul orb', 5944, 25),
      it('mystical hourglass', 9660, 25),
      it('magic light wand', 3046, 25),
      it('hair of a banshee', 11446, 25),
      it('petrified scream', 10420, 25),
      it('slightly rusted armor', 8896, 25),
      it('silver brooch', 3017, 10),
      it('life crystal', 3061, 5),
      it('sweet smelling bait', 12320, 5)
    ]),
    cx(55, 'hunt-wyrm-cave', 'DomÃ­nio: Wyrm I', 'Wyrm', 'Roubo de mana +0.3%', [
      it('wyrm scale', 9665, 3800),
      it('soul orb', 5944, 800)
    ]),
    cx(58, 'hunt-candia-cave', 'DomÃ­nio: Candia I', 'Candia', 'Mana +1.2%', [
      it('frazzle tongue', 20198, 175),
      it('frazzle skin', 20199, 175),
      it('fairy wings', 25694, 175),
      it('energy bar', 23535, 175),
      it('gummy rotworm', 48116, 75),
      it('honeycomb', 5902, 75),
      it('wafer paper flower', 48251, 75),
      it('churro heart', 48254, 75),
      it('strawberry', 3591, 75),
      it('brigadeiro', 48252, 75),
      it('beijinho', 48253, 75),
      it('flour', 3603, 25),
      it('cookie', 3598, 25),
      it('dark chocolate coin', 48250, 25)
    ]),
    cx(61, 'hunt-werehyaena-cave', 'DomÃ­nio: Werehyaena I', 'Werehyaena', 'Roubo de mana +0.3%', [
      it('werehyaena nose', 33943, 375),
      it('werehyaena talisman', 33944, 50),
      it('moonlight crystals', 22083, 50),
      it('werehyaena trophy', 34219, 50)
    ]),
    cx(64, 'hunt-asura-lair', 'DomÃ­nio: Asuras I', 'Asuras', 'Dano de magia +0.3%', [
      it('flask of demonic blood', 6558, 250),
      it('hellspawn tail', 10304, 250),
      it('soul orb', 5944, 125),
      it('golden lotus brooch', 21974, 125),
      it('peacock feather fan', 21975, 125),
      it('demonic essence', 6499, 125),
      it('red mushroom', 3724, 125),
      it('silver brooch', 3017, 50),
      it('red piece of cloth', 5911, 50),
      it('mysterious fetish', 3078, 50),
      it('black skull', 9056, 20),
      it('dracoyle statue', 9034, 20)
    ]),
    cx(67, 'hunt-wereliones-cave', 'DomÃ­nio: Wereliones I', 'Wereliones', 'Dano crÃ­tico +0.4%', [
      it('soul orb', 5944, 200),
      it("lion's mane", 9691, 200),
      it('ankh', 3077, 200),
      it('silver brooch', 3017, 75),
      it('rainbow quartz', 25737, 75),
      it('onyx chip', 22193, 75),
      it('ivory carving', 33945, 75),
      it('coral brooch', 24391, 75),
      it('white silk flower', 34008, 25),
      it('lion figurine', 33781, 25)
    ]),
    cx(70, 'hunt-draken-lair', 'DomÃ­nio: Draken I', 'Draken', 'Ataque +0.1%', [
      it("weaver's wandtip", 10397, 25),
      it('bone shoulderplate', 10404, 25),
      it("warmaster's wristguards", 10405, 25),
      it('draken sulphur', 11658, 25),
      it('luminous orb', 11454, 25),
      it('ring of the sky', 3006, 2),
      it('bamboo leaves', 12549, 2),
      it('harness', 12307, 2),
      it('draken trophy', 10398, 2)
    ]),
    cx(73, 'hunt-cobra-cave', 'DomÃ­nio: Cobras I', 'Cobras', 'Dano crÃ­tico +0.4%', [
      it('cobra crest', 31678, 900),
      it('cheesy figurine', 17818, 900),
      it('emerald bangle', 3010, 900)
    ]),
    cx(76, 'hunt-falcon', 'DomÃ­nio: Falcon I', 'Falcon', 'Dano crÃ­tico +0.4%', [
      it('soul orb', 5944, 1300),
      it('flask of demonic blood', 6558, 1300),
      it('falcon crest', 28823, 250),
      it('damaged armor plates', 28822, 250),
      it('closed trap', 3481, 100)
    ]),
    cx(79, 'hunt-vexclaw-lair', 'DomÃ­nio: Vexclaw I', 'Vexclaw', 'Dano crÃ­tico +0.4%', [
      it('flask of demonic blood', 6558, 1800),
      it('soul orb', 5944, 1800),
      it('vexclaw talon', 22728, 1800),
      it('demonic essence', 6499, 1800),
      it('some grimeleech wings', 22730, 900),
      it('talon', 3034, 900),
      it('saw', 3461, 900),
      it("cat's paw", 5479, 375)
    ]),
    cx(82, 'hunt-grimeleech-cave', 'DomÃ­nio: Grimeleech I', 'Grimeleech', 'Dano de magia +0.4%', [
      it('dirty cape', 3122, 900),
      it('mouldy cheese', 3120, 900),
      it('flask of demonic blood', 6558, 900),
      it('demonic essence', 6499, 900),
      it('soul orb', 5944, 900),
      it('piece of iron', 3110, 900),
      it('some grimeleech wings', 22730, 475),
      it('glob of acid slime', 9054, 475),
      it('glob of tar', 9055, 475),
      it('talon', 3034, 475),
      it('silver brooch', 3017, 175),
      it('piece of royal steel', 5887, 175),
      it('piece of draconian steel', 5889, 175),
      it('piece of hell steel', 5888, 175)
    ]),
    cx(85, 'hunt-choking-cave', 'DomÃ­nio: Choking Fear I', 'Choking Fear', 'Dano crÃ­tico +0.5%', [
      it('goosebump leather', 20205, 2500),
      it('hemp rope', 20206, 2500),
      it('dead weight', 20202, 2500),
      it('pool of chitinous glue', 20207, 2500),
      it('cluster of solace', 20062, 1000),
      it('broken dream', 20029, 1000),
      it('yellow piece of cloth', 5914, 1000)
    ]),
    cx(88, 'hunt-crazed-cave', "DomÃ­nio: Crazed Elf's I", "Crazed Elf's", 'Chance de crÃ­tico +0.09%', [
      it('elven astral observer', 11465, 2000),
      it('ice flower', 29973, 1000),
      it('heaven blossom', 3657, 1000),
      it('miraculum', 11474, 1000),
      it('dream essence egg', 30005, 1000),
      it('seeds', 647, 1000),
      it('elvish talisman', 9635, 1000),
      it('tiger eye', 24961, 1000),
      it('sun fruit', 29995, 150)
    ]),
    cx(91, 'hunt-guzzlemaw-cave', 'DomÃ­nio: Guzzlemaw I', 'Guzzlemaw', 'Ataque +0.1%', [
      it('frazzle tongue', 20198, 1700),
      it('silencer claws', 20200, 1700),
      it('frazzle skin', 20199, 1700),
      it('crystal rubbish', 16279, 1700),
      it('fish tail', 5951, 1700),
      it('banana skin', 3104, 1700),
      it('piece of iron', 3110, 1700),
      it('fishbone', 3111, 1700),
      it('cluster of solace', 20062, 1700),
      it('silencer resonating chamber', 20201, 1700),
      it('hardened bone', 5925, 1700),
      it('big bone', 3116, 1700),
      it('fish fin', 5895, 1700),
      it('iron ore', 5880, 700)
    ]),
    cx(94, 'hunt-lionknight-cave', 'DomÃ­nio: Lion Knight I', 'Lion Knight', 'Dano crÃ­tico +0.5%', [
      it('broken longbow', 34161, 900),
      it('gold ingot', 9058, 900),
      it('lion cloak patch', 34162, 900),
      it('lion crest', 34160, 900),
      it('silver brooch', 3017, 900),
      it('gemmed figurine', 24392, 375),
      it('coral brooch', 24391, 375)
    ]),
    cx(97, 'hunt-megadragon-cave', 'DomÃ­nio: Mega Dragon I', 'Mega Dragon', 'Dano crÃ­tico +0.6%', [
      it("nimmersatt's seal", 44743, 1400),
      it('dragolisk poison gland', 44747, 1400),
      it('dragolisk eye', 44746, 1400),
      it('wardragon claw', 44748, 1400),
      it('dragon tongue', 24938, 1400),
      it('wardragon tooth', 44749, 1400),
      it('molten dragon essence', 44744, 500),
      it('mega dragon heart', 44745, 500),
      it("dragon's tail", 11457, 500)
    ]),
    cx(100, 'hunt-weretiger-cave', 'DomÃ­nio: Weretiger I', 'Weretiger', 'Ataque +0.2%', [
      it('werepanther claw', 43731, 1000),
      it('weretiger tooth', 43730, 1000),
      it('moonlight crystals', 22083, 1000),
      it('silver moon coin', 43732, 400),
      it('gemmed figurine', 24392, 400),
      it('werepanther trophy', 43917, 150),
      it('weretiger trophy', 43915, 150)
    ]),
    cx(103, 'hunt-werecrocodile-cave', 'DomÃ­nio: Feral Werecrocodile I', 'Feral Werecrocodile', 'Chance de crÃ­tico +0.1%', [
      it('werepanther claw', 43731, 600),
      it('werecrocodile tongue', 43729, 600),
      it('moonlight crystals', 22083, 250),
      it('golden sun coin', 43734, 250),
      it('gemmed figurine', 24392, 250),
      it('werepanther trophy', 43917, 100),
      it('werecrocodile trophy', 43916, 100)
    ]),
    cx(106, 'hunt-bulltaur-cave', 'DomÃ­nio: Bulltaur I', 'Bulltaur', 'Chance de crÃ­tico +0.1%', [
      it('bulltaur horn', 44736, 1000),
      it('bulltaur armor scrap', 44738, 1000),
      it('bulltaur hoof', 44737, 1000),
      it('encrypted notes', 44739, 1000),
      it('staff piece', 44741, 1000),
      it('strange substance', 44740, 1000),
      it('idol of the forge', 44742, 425),
      it('soul orb', 5944, 425)
    ]),
    cx(109, 'hunt-gazer-lair', 'DomÃ­nio: Gazer I', 'Gazer', 'Ataque +0.2%', [
      it('blue ectoplasm', 30082, 700),
      it('silver brooch', 3017, 700),
      it('emerald bangle', 3010, 700),
      it('life crystal', 3061, 700),
      it('mind stone', 3062, 275),
      it('coral brooch', 24391, 275),
      it('golden idol of tukh', 29299, 275),
      it('strange symbol', 3058, 100),
      it('red ectoplasm', 30084, 100)
    ]),
    cx(112, 'hunt-skeletin-cave', 'DomÃ­nio: Skeleton Elite Warrior I', 'Skeleton Elite Warrior', 'Chance de crÃ­tico +0.1%', [
      it('unholy bone', 10316, 250),
      it('pelvis bone', 11481, 250),
      it("flask of warrior's sweat", 5885, 100),
      it('broken gladiator shield', 9656, 100)
    ]),
    cx(115, 'hunt-darkcarnisylvan-cave', 'DomÃ­nio: Dark Carnisylvan I', 'Dark Carnisylvan', 'Dano de magia +0.6%', [
      it('carnisylvan finger', 36805, 1500),
      it('carnisylvan bark', 36806, 1500),
      it('human teeth', 36807, 600),
      it('gemmed figurine', 24392, 225)
    ]),
    cx(118, 'hunt-inferniarch-lair', 'DomÃ­nio: Inferniarch I', 'Inferniarch', 'Dano de magia +0.6%', [
      it('gorger antlers', 50059, 1300),
      it('broodrider saddle', 50058, 1300),
      it('demonic core essence', 49909, 1300),
      it('demonic matter', 49894, 1300),
      it('sineater wing', 50057, 500),
      it('mummified demon finger', 49908, 500)
    ]),
    cx(121, 'hunt-girtablilu-cave', 'DomÃ­nio: girtablilu warrior I', 'girtablilu warrior', 'Dano crÃ­tico +0.8%', [
      it('scorpion charm', 36822, 4300),
      it('old girtablilu carapace', 36972, 1700),
      it('girtablilu warrior carapace', 36971, 1700)
    ]),
    cx(124, 'hunt-lavafungos-cave', 'DomÃ­nio: Lavafungos I', 'Lavafungos', 'Ataque +0.3%', [
      it('lavaworm spike roots', 36769, 2700),
      it('streaked devourer maw', 36773, 1300),
      it('lavafungus ring', 36786, 1300),
      it('streaked devourer eyes', 36772, 1300),
      it('lavafungus head', 36785, 500),
      it('lavaworm spikes', 36770, 500),
      it('lavaworm jaws', 36771, 500),
      it('streaked devourer legs', 36774, 500)
    ]),
    cx(127, 'hunt-livrariaice-cave', 'DomÃ­nio: Livraria ICE I', 'Livraria ICE', 'Chance de crÃ­tico +0.2%', [
      it('silken bookmark', 28566, 1100),
      it('quill', 28567, 1100),
      it('frosty heart', 9661, 1100),
      it('slime heart', 21194, 500),
      it('piece of dead brain', 9663, 500),
      it('glowing rune', 28570, 75),
      it('golden mug', 2903, 75),
      it('shard', 7290, 75)
    ]),
    cx(130, 'hunt-livrariafire-cave', 'DomÃ­nio: Livraria FIRE I', 'Livraria FIRE', 'Dano de magia +0.7%', [
      it('orb', 3060, 1400),
      it('glowing rune', 28570, 700),
      it('burnt scroll', 3124, 700),
      it('book page', 28569, 700),
      it('talon', 3034, 700),
      it('purple tome', 2848, 700),
      it('piece of dead brain', 9663, 275),
      it('demonic essence', 6499, 275),
      it('soul orb', 5944, 275),
      it('slime heart', 21194, 275),
      it('flask of demonic blood', 6558, 275),
      it('silken bookmark', 28566, 275),
      it('poisonous slime', 9640, 275),
      it('clay lump', 10422, 275),
      it('piece of hellfire armor', 9664, 100)
    ]),
    cx(133, 'hunt-livrariaearth-cave', 'DomÃ­nio: Livraria EARTH I', 'Livraria EARTH', 'Dano de magia +0.7%', [
      it('poisonous slime', 9640, 375),
      it('clay lump', 10422, 375),
      it('silken bookmark', 28566, 150),
      it('glowing rune', 28570, 150),
      it('book page', 28569, 150)
    ]),
    cx(136, 'hunt-livraria-cave', 'DomÃ­nio: Livraria ENERGY I', 'Livraria ENERGY', 'Ataque +0.2%', [
      it('silken bookmark', 28566, 1000),
      it('quill', 28567, 1000),
      it('glowing rune', 28570, 1000),
      it('book page', 28569, 1000),
      it('slime heart', 21194, 375),
      it('piece of dead brain', 9663, 375),
      it('odd organ', 23510, 375),
      it('instable proto matter', 23516, 375),
      it('frozen lightning', 23519, 375),
      it('energy ball', 23523, 375)
    ]),
    cx(139, 'hunt-bashmu-cave', 'DomÃ­nio: Bashmu I', 'Bashmu', 'Dano de magia +0.5%', [
      it('bashmu tongue', 36821, 1700),
      it('bashmu feather', 36823, 1700),
      it('bashmu fang', 36820, 700),
      it('rainbow quartz', 25737, 700)
    ]),
    cx(142, 'hunt-raubritter-lair', 'DomÃ­nio: Raubritter I', 'Raubritter', 'Dano de magia +0.4%', [
      it('cuirass plate', 52663, 50),
      it('stag parchment', 52664, 25),
      it('silver poniard', 52662, 25),
      it('bottle of raubritter lager', 52745, 5),
      it('marinated sturgeon', 52638, 5)
    ]),
    cx(145, 'hunt-orclops-cave', 'DomÃ­nio: Orclops I', 'Orclops', 'Roubo de vida +0.2%', [
      it('mysterious fetish', 3078, 1600),
      it('bone toothpick', 24380, 1600),
      it('reinvigorating seeds', 23811, 800),
      it('beetle carapace', 24381, 325),
      it('war drum', 2966, 125)
    ]),
    cx(148, 'hunt-naga-lair', 'DomÃ­nio: Naga Lair I', 'Naga Lair', 'Ataque +0.2%', [
      it('naga archer scales', 39413, 300),
      it('naga earring', 39412, 300),
      it('naga warrior scales', 39414, 300),
      it('makara tongue', 39402, 300),
      it('makara fin', 39401, 300),
      it('naga armring', 39411, 300),
      it('silver brooch', 3017, 50),
      it('sea horse figurine', 31323, 50)
    ]),
    cx(151, 'hunt-darktorturer-cave', 'DomÃ­nio: Dark Torturer I', 'Dark Torturer', 'Dano crÃ­tico +0.4%', [
      it('flask of demonic blood', 6558, 275),
      it('unholy bone', 10316, 275),
      it('soul orb', 5944, 275),
      it('saw', 3461, 150),
      it("cat's paw", 5479, 50),
      it('skeleton decoration', 6525, 50),
      it('golden figurine', 5799, 20)
    ]),
    cx(154, 'hunt-trueazura-cave', 'DomÃ­nio: True Azura I', 'True Azura', 'Chance de crÃ­tico +0.1%', [
      it('flask of demonic blood', 6558, 3500),
      it('soul orb', 5944, 1800),
      it('golden lotus brooch', 21974, 1800),
      it('peacock feather fan', 21975, 1800),
      it('demonic essence', 6499, 1800),
      it('silver brooch', 3017, 700),
      it('red piece of cloth', 5911, 700),
      it('blue piece of cloth', 5912, 700)
    ]),
    cx(157, 'hunt-catacomb-cave', 'DomÃ­nio: Catacomb I', 'Catacomb', 'Ataque +0.1%', [
      it('flask of demonic blood', 6558, 150),
      it('hellspawn tail', 10304, 150),
      it('demon horn', 5954, 75),
      it('demonic essence', 6499, 75),
      it('soul orb', 5944, 75),
      it('mystical hourglass', 9660, 75),
      it('metal spike', 10298, 25),
      it('talon', 3034, 25),
      it('orb', 3060, 25),
      it('dracoyle statue', 9034, 10),
      it('mind stone', 3062, 10)
    ]),
    cx(160, 'hunt-undeadragon-lair', 'DomÃ­nio: Undead Dragon I', 'Undead Dragon', 'Dano de magia +0.3%', [
      it('unholy bone', 10316, 6300),
      it('hardened bone', 5925, 3100),
      it('demonic essence', 6499, 3100),
      it('life crystal', 3061, 1300)
    ]),
    cx(163, 'hunt-freakishlostsoul-cave', 'DomÃ­nio: Freakish Lost Soul I', 'Freakish Lost Soul', 'Ataque +0.2%', [
      it('lost soul', 32227, 1300),
      it('death toll', 32703, 600),
      it('emerald bangle', 3010, 600),
      it('gemmed figurine', 24392, 250),
      it('ensouled essence', 32698, 250),
      it('cursed bone', 32774, 250),
      it('ivory comb', 32773, 250),
      it('silver hand mirror', 32772, 250)
    ]),
    cx(166, 'hunt-prison-cave', 'DomÃ­nio: Prison I', 'Prison', 'Dano crÃ­tico +0.5%', [
      it('dirty cape', 3122, 250),
      it('flask of demonic blood', 6558, 250),
      it('demonic essence', 6499, 250),
      it('soul orb', 5944, 250),
      it('piece of iron', 3110, 250),
      it('bundle of cursed straw', 9688, 125),
      it('saw', 3461, 125),
      it('cluster of solace', 20062, 50),
      it('seeds', 647, 50),
      it("cat's paw", 5479, 50),
      it('silver brooch', 3017, 50),
      it('piece of royal steel', 5887, 50),
      it('piece of draconian steel', 5889, 50),
      it('piece of hell steel', 5888, 50),
      it('emerald bangle', 3010, 20),
      it('amulet of loss', 3057, 20)
    ]),
    cx(169, 'hunt-afflictedstrider-cave', 'DomÃ­nio: Afflicted Strider I', 'Afflicted Strider', 'Dano de magia +0.8%', [
      it('eyeless devourer maw', 36775, 2600),
      it('afflicted strider worms', 36790, 2600),
      it('blemished spawn abdomen', 36779, 2600),
      it('eyeless devourer legs', 36776, 2600),
      it('blemished spawn head', 36778, 1100),
      it('afflicted strider head', 36789, 1100),
      it('eyeless devourer tongue', 36777, 1100),
      it('blemished spawn tail', 36780, 1100)
    ]),
    cx(172, 'hunt-varnisheddiremaw-cave', 'DomÃ­nio: Varnished Diremaw I', 'Varnished Diremaw', 'Chance de crÃ­tico +0.2%', [
      it('emerald bangle', 3010, 2300),
      it('varnished diremaw legs', 36782, 2300),
      it('tremendous tyrant head', 36783, 2300),
      it('tremendous tyrant shell', 36784, 900),
      it('cave chimera leg', 36788, 900),
      it('cave chimera head', 36787, 900),
      it('varnished diremaw brainpan', 36781, 900)
    ]),
    cx(175, 'hunt-cliffstrider-cave', 'DomÃ­nio: Cliff Strider I', 'Cliff Strider', 'Chance de crÃ­tico +0.08%', [
      it('war crystal', 9654, 1200),
      it('sulphurous stone', 10315, 1200),
      it('pulverized ore', 16133, 1200),
      it('crystalline spikes', 16138, 600),
      it('vein of ore', 16135, 600),
      it('soul orb', 5944, 600),
      it('cliff strider claw', 16134, 600),
      it('shiny stone', 10310, 600),
      it('iron ore', 5880, 600),
      it('piggy bank', 2995, 250),
      it('magic sulphur', 5904, 250),
      it('crystal of power', 9067, 250),
      it('clay lump', 10422, 100)
    ]),
    cx(178, 'hunt-hideous-fungus', 'DomÃ­nio: Hideous Fungus I', 'Hideous Fungus', 'Ataque +0.1%', [
      it('stone nose', 16137, 900),
      it('mushroom pie', 16103, 900),
      it('brown piece of cloth', 5913, 900),
      it('hideous chunk', 16140, 900),
      it('battle stone', 11447, 900),
      it('humongous chunk', 16139, 900),
      it('blue piece of cloth', 5912, 375),
      it('green piece of cloth', 5910, 375),
      it('red piece of cloth', 5911, 375)
    ]),
    cx(181, 'hunt-magmacrawler-cave', 'DomÃ­nio: Magma Crawler I', 'Magma Crawler', 'Chance de crÃ­tico +0.08%', [
      it('eye of a weeper', 16132, 600),
      it('magma clump', 16130, 600),
      it('blazing bone', 16131, 600),
      it('fiery heart', 9636, 600),
      it('iron ore', 5880, 600),
      it('fire bug', 5467, 600),
      it('yellow piece of cloth', 5914, 600),
      it('green crystal fragment', 16127, 600),
      it('red piece of cloth', 5911, 250),
      it('clay lump', 10422, 100),
      it('magic sulphur', 5904, 100)
    ]),
    cx(184, 'hunt-dreadintruder-cave', 'DomÃ­nio: Dread Intruder I', 'Dread Intruder', 'Chance de crÃ­tico +0.08%', [
      it('spark sphere', 23518, 2000),
      it('energy bar', 23535, 2000),
      it('protective charm', 11444, 800),
      it('dangerous proto matter', 23515, 800)
    ]),
    cx(187, 'hunt-werebadge-cave', 'DomÃ­nio: Werebadge I', 'Werebadge', 'Mana +1%', [
      it('werewolf fur', 10317, 225),
      it('wolf paw', 5897, 225),
      it('werefox tail', 27463, 100),
      it('fox paw', 27462, 100),
      it('emerald bangle', 3010, 100),
      it('troll green', 3741, 100)
    ]),
    cx(190, 'hunt-quararaider-lair', 'DomÃ­nio: Quara Raider I', 'Quara Raider', 'Ataque +0.3%', [
      it('amber souvenir', 48508, 250),
      it('resinous fish fin', 48509, 250),
      it('quara pincers', 11490, 25),
      it('mantassin tail', 11489, 25),
      it('preserved violet seed', 45655, 25),
      it('preserved purple seed', 45656, 25),
      it('preserved light blue seed', 45654, 25)
    ]),
    cx(193, 'hunt-norcferatu-cave', 'DomÃ­nio: Norcferatu Nightweaver I', 'Norcferatu Nightweaver', 'Dano crÃ­tico +1%', [
      it('chain leash', 51472, 900),
      it('orcish toothbrush', 51477, 375),
      it('piece of frozen night', 51474, 375),
      it('heart amphora', 51484, 375),
      it('bone fibula', 51485, 375),
      it('blood hood', 51480, 375),
      it('vampire teeth', 9685, 375),
      it('bone toothpick', 24380, 375),
      it('bloodshot giant eye', 51482, 375),
      it('bat wing', 5894, 375),
      it('pot of orcish warpaint', 51476, 375)
    ]),
    cx(196, 'hunt-mitmah-cave', 'DomÃ­nio: Mitmah Seer I', 'Mitmah Seer', 'Ataque +0.1%', [
      it('broken mitmah necklace', 44438, 900),
      it('ritual tooth', 40528, 350),
      it('gold-brocaded cloth', 40529, 350)
    ]),
    cx(199, 'hunt-gnomprona2-cave', 'DomÃ­nio: Crystal Enigma I', 'Crystal Enigma', 'Chance de crÃ­tico +0.2%', [
      it('mercurial wing', 39395, 700),
      it('mantosaurus jaw', 39386, 375),
      it('ripptor scales', 39391, 375),
      it('cry-stal', 39394, 375),
      it('headpecker beak', 39387, 375),
      it('ripptor claw', 39389, 375),
      it('headpecker feather', 39388, 375),
      it('coral brooch', 24391, 150),
      it('gemmed figurine', 24392, 50),
      it('ring of the sky', 3006, 50)
    ]),
    cx(202, 'hunt-crypt-cave', 'DomÃ­nio: Crypt Construct I', 'Crypt Construct', 'Dano de magia +0.9%', [
      it('crystallized death', 52719, 475),
      it('giant tusk', 52707, 475),
      it('toe nails', 52706, 200),
      it('necromantic core', 52705, 200),
      it('cluster of crystallized death', 52720, 200),
      it('amber with a bug', 32624, 200),
      it('amber with a dragonfly', 32625, 75),
      it('fetid heart', 52708, 75)
    ]),
    cx(205, 'hunt-rottengolem-cave', 'DomÃ­nio: Rotten Golem I', 'Rotten Golem', 'Ataque +0.4%', [
      it('roots', 33938, 1600),
      it('mould heart', 34141, 600),
      it('mould robe', 34148, 600),
      it('crawler\'s essence', 33982, 600)
    ]),
    cx(208, 'hunt-cloakofterror-lair', 'DomÃ­nio: Cloak Of Terror I', 'Cloak Of Terror', 'Ataque +0.4%', [
      it('vibrant heart', 34143, 1700),
      it('telescope eye', 33934, 1700),
      it('vibrant robe', 34144, 700),
      it('brooch of embracement', 34023, 700)
    ]),
    cx(211, 'hunt-gnomprona1-cave', 'DomÃ­nio: Monster Graveyard I', 'Monster Graveyard', 'Ataque +0.4%', [
      it('sulphur powder', 39376, 3200),
      it('undertaker fangs', 39380, 3200),
      it('sulphider shell', 39375, 3200),
      it('nighthunter wing', 39381, 3200),
      it('stalking seeds', 39384, 3200),
      it('spider silk', 5879, 600),
      it('amulet of loss', 3057, 250)
    ]),
    cx(214, 'hunt-gnomprona3-cave', 'DomÃ­nio: Sparkling Pools I', 'Sparkling Pools', 'Ataque +0.4%', [
      it('gore horn', 39377, 3000),
      it('emerald tortoise shell', 39379, 3000),
      it('sabretooth fur', 39378, 3000),
      it('gorerilla mane', 39392, 1500),
      it('prehemoth horns', 39382, 1500),
      it('gorerilla tail', 39393, 1500),
      it('prehemoth claw', 39383, 1500),
      it('big bone', 3116, 1500)
    ]),
    cx(217, 'hunt-infernalmdemon-cave', 'DomÃ­nio: Infernal Demon I', 'Infernal Demon', 'Chance de crÃ­tico +0.2%', [
      it('hand', 33278, 1900),
      it('infernal heart', 34139, 800),
      it('head', 33932, 800),
      it('infernal robe', 34146, 800),
      it('diabolic skull', 34025, 275)
    ]),
    cx(220, 'hunt-bonyseadevil-cave', 'DomÃ­nio: Bony Sea Devil I', 'Bony Sea Devil', 'Dano de magia +1%', [
      it('capricious heart', 34138, 1200),
      it('hazardous robe', 34147, 475),
      it('gemmed figurine', 24392, 475),
      it('hazardous heart', 34140, 475),
      it('jaws', 34014, 475),
      it('capricious robe', 34145, 475),
      it('rod', 11826, 175),
      it('goblet of gloom', 34022, 175)
    ]),
    cx(223, 'hunt-darkthais-cave', 'DomÃ­nio: Dark Thais I', 'Dark Thais', 'Chance de crÃ­tico +0.2%', [
      it('apron', 33933, 1000),
      it('distorted heart', 34142, 1000),
      it('distorted robe', 34149, 400),
      it('head', 33932, 400),
      it('gruesome fan', 34024, 150)
    ]),
    cx(226, 'hunt-bloatedmanmaggot-cave', 'DomÃ­nio: bloated man-maggot I', 'bloated man-maggot', 'Ataque +0.5%', [
      it('rotten roots', 43849, 6200),
      it('scarab coin', 3042, 6200),
      it('organic acid', 43778, 3100),
      it('emerald bangle', 3010, 3100),
      it('bloated maggot', 43856, 3100)
    ]),
    cx(229, 'hunt-maggot-cave', 'DomÃ­nio: Rotten man-maggot I', 'Rotten man-maggot', 'Chance de crÃ­tico +0.4%', [
      it('rotten roots', 43849, 2700),
      it('lichen gobbler', 43782, 2700),
      it('organic acid', 43778, 2700),
      it('decayed finger bone', 43846, 2700),
      it('blooded worm', 43857, 2700)
    ]),
    cx(232, 'hunt-draklightsource-cave', 'DomÃ­nio: Darklight Source I', 'Darklight Source', 'Dano crÃ­tico +1.9%', [
      it('unstable darklight matter', 43779, 2500),
      it('dark obsidian splinter', 43850, 2500),
      it('darklight core', 43853, 2500),
      it('darklight basalt chunk', 43852, 2500),
      it('onyx chip', 22193, 2500),
      it('magma clump', 16130, 2500),
      it('darklight obsidian axe', 43781, 2500),
      it('yellow darklight matter', 43780, 2500),
      it('coal', 12600, 2500),
      it('basalt crumbs', 43858, 2500)
    ]),
    cx(235, 'hunt-wanderingpillar-cave', 'DomÃ­nio: Wandering Pillar I', 'Wandering Pillar', 'Chance de crÃ­tico +0.4%', [
      it('darklight obsidian axe', 43781, 3400),
      it('darklight core', 43853, 3400),
      it('dark obsidian splinter', 43850, 3400),
      it('coal', 12600, 3400),
      it('onyx chip', 22193, 3400),
      it('basalt core', 43859, 3400),
      it('basalt crumbs', 43858, 3400),
      it('magma clump', 16130, 3400),
      it('sulphurous stone', 10315, 3400)
    ]),
    cx(238, 'boss-ahau-1', 'TrofÃ©u de Ahau I', '', 'ResistÃªncia elemental energy +0.4%', [
      it('amber', 32626, 100),
      it('amber with a bug', 32624, 100),
      it('ritual tooth', 40528, 50),
      it('collar of green plasma', 23527, 20),
      it('broken iks headpiece (somente comum)', 40532, 10),
      it('broken iks cuirass (somente comum)', 40533, 1),
      it('broken iks faulds (somente comum)', 40531, 1),
      it('broken macuahuitl (somente comum)', 40530, 1),
      it('rotten feather', 40527, 1),
      it('the living idol of tukh', 40578, 1)
    ], 'Bosses'),
    cx(241, 'boss-alptramun-1', 'TrofÃ©u de Alptramun I', '', 'ResistÃªncia elemental ice +1.1%', [
      it('huge chunk of crude iron', 5892, 100),
      it('piggy bank', 2995, 100),
      it('silver token', 22516, 50),
      it('gold token', 22721, 20),
      it('abyss hammer (somente comum)', 7414, 10),
      it('purple tendril lantern', 30171, 5),
      it('soul stone', 5809, 5),
      it('alptramun\'s toothbrush', 29943, 1),
      it('crunor idol', 30055, 1),
      it('dream shroud (somente comum)', 29423, 1),
      it('pair of dreamwalkers (somente comum)', 29424, 1),
      it('pomegranate', 30169, 1)
    ], 'Bosses'),
    cx(244, 'boss-amenef_the_burning-1', 'TrofÃ©u de Amenef the Burning I', '', 'ResistÃªncia elemental fire +1.1%', [
      it('slightly rusted armor', 8896, 100),
      it('slightly rusted legs', 8899, 50),
      it('amber staff (somente comum)', 7426, 20),
      it('doublet (somente comum)', 3379, 20),
      it('dwarven ring', 3097, 20),
      it('noble axe (somente comum)', 7456, 20),
      it('guardian halberd (somente comum)', 3315, 10),
      it('eye-embroidered veil', 37003, 5),
      it('golden mask', 31324, 5),
      it('tagralt-inlaid scabbard', 37002, 5)
    ], 'Bosses'),
    cx(247, 'boss-anomaly-1', 'TrofÃ©u de Anomaly I', '', 'ResistÃªncia elemental earth +0.6%', [
      it('energy drink', 23545, 100),
      it('frozen lightning', 23519, 100),
      it('odd organ', 23510, 100),
      it('curious matter', 23511, 50),
      it('gold token', 22721, 20),
      it('lightning robe (somente comum)', 825, 10),
      it('ruthless axe (somente comum)', 6553, 10),
      it('mysterious remains', 23509, 5),
      it('tiara of power (somente comum)', 23474, 5),
      it('void boots (somente comum)', 23476, 5)
    ], 'Bosses'),
    cx(250, 'boss-arbaziloth-1', 'TrofÃ©u de Arbaziloth I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('arbaziloth shoulder piece', 50067, 1),
      it('demon in a golden box', 50063, 1),
      it('demon in a green box', 50064, 1),
      it('demon in a red box', 50062, 1),
      it('demon mengu (somente comum)', 50189, 1),
      it('demonfang mask (somente comum)', 49534, 1),
      it('dreadfire headpiece (somente comum)', 49533, 1),
      it('hellstalker visor (somente comum)', 49532, 1),
      it('inferniarch arbalest (somente comum)', 49522, 1),
      it('inferniarch battleaxe (somente comum)', 49523, 1)
    ], 'Bosses'),
    cx(253, 'boss-bakragore-1', 'TrofÃ©u de Bakragore I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('mastermind potion', 7440, 2000),
      it('ultimate mana potion', 23373, 2000),
      it('ultimate spirit potion', 23374, 2000),
      it('giant amethyst', 32622, 5),
      it('giant ruby', 30059, 5),
      it('giant sapphire', 30061, 5),
      it('giant topaz', 32623, 5),
      it('spiritual horseshoe', 44048, 1)
    ], 'Bosses'),
    cx(256, 'boss-black_vixen-1', 'TrofÃ©u de Black Vixen I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('troll green', 3741, 100),
      it('fox paw', 27462, 50),
      it('silver token', 22516, 50),
      it('werefox tail', 27463, 50),
      it('composite hornbow (somente comum)', 8027, 20),
      it('moonlight rod (somente comum)', 3070, 20),
      it('stealth ring', 3049, 20),
      it('werewolf amulet (somente comum)', 22060, 20),
      it('sai (somente comum)', 50183, 10),
      it('foxtail', 14142, 1)
    ], 'Bosses'),
    cx(259, 'boss-bloodback-1', 'TrofÃ©u de Bloodback I', '', 'ResistÃªncia elemental death +0.6%', [
      it('great health potion', 239, 100),
      it('silver token', 22516, 50),
      it('wereboar hooves', 22053, 50),
      it('wereboar tusks', 22054, 50),
      it('dreaded cleaver (somente comum)', 7419, 20),
      it('fur armor (somente comum)', 22085, 20),
      it('furry club (somente comum)', 7432, 20),
      it('spiked squelcher (somente comum)', 7452, 20),
      it('stone skin amulet', 3081, 20),
      it('wereboar loincloth (somente comum)', 22087, 10)
    ], 'Bosses'),
    cx(262, 'boss-bonelords_phylactery-1', 'TrofÃ©u de Bonelord\'s Phylactery I', '', 'Vida +0.6%', [
      it('supreme health potion', 23375, 2000),
      it('unholy bone', 10316, 100),
      it('death ring', 6299, 20),
      it('haunted blade (somente comum)', 7407, 20),
      it('skull staff (somente comum)', 3324, 20),
      it('bonelord eye', 5898, 5),
      it('giant ruby', 30059, 5),
      it('giant sapphire', 30061, 5),
      it('small flask of eyedrops', 11512, 5),
      it('necromantic crypt rune', 52661, 1),
      it('skull tendril', 52715, 1),
      it('soul trap', 52714, 1)
    ], 'Bosses'),
    cx(265, 'boss-brain_head-1', 'TrofÃ©u de Brain Head I', '', 'Armadura +0.3', [
      it('death toll', 32703, 2000),
      it('amber with a dragonfly', 32625, 100),
      it('cursed bone', 32774, 5),
      it('enchanted ring of souls (somente comum)', 32621, 5),
      it('ghost claw', 32631, 5),
      it('ivory comb', 32773, 5),
      it('moonstone', 32771, 5),
      it('phantasmal axe (somente comum)', 32616, 5),
      it('silver hand mirror', 32772, 5),
      it('spooky hood (somente comum)', 32630, 5)
    ], 'Bosses'),
    cx(268, 'boss-brokul-1', 'TrofÃ©u de Brokul I', '', 'Armadura +0.3', [
      it('small diamond', 3028, 1000),
      it('small sapphire', 3029, 1000),
      it('broccoli', 11461, 1),
      it('deepling ceremonial dagger (somente comum)', 28825, 1),
      it('deepling fork (somente comum)', 28826, 1),
      it('true book of death', 28702, 1)
    ], 'Bosses'),
    cx(271, 'boss-chagorz-1', 'TrofÃ©u de Chagorz I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('bullseye potion', 7443, 2000),
      it('mastermind potion', 7440, 2000),
      it('supreme health potion', 23375, 2000),
      it('ultimate mana potion', 23373, 2000),
      it('ultimate spirit potion', 23374, 2000),
      it('darklight geode', 43900, 5),
      it('giant amethyst', 32622, 5),
      it('giant sapphire', 30061, 5),
      it('giant topaz', 32623, 5)
    ], 'Bosses'),
    cx(274, 'boss-count_vlarkorth-1', 'TrofÃ©u de Count Vlarkorth I', '', 'ResistÃªncia elemental energy +0.4%', [
      it('magic sulphur', 5904, 250),
      it('silver token', 22516, 50),
      it('collar of red plasma', 23528, 20),
      it('bear skin (somente comum)', 31578, 5),
      it('embrace of nature (somente comum)', 31579, 5),
      it('final judgement', 31738, 5),
      it('giant ruby', 30059, 5),
      it('terra helmet (somente comum)', 31577, 5),
      it('young lich worm', 31590, 5),
      it('medal of valiance', 31591, 1)
    ], 'Bosses'),
    cx(277, 'boss-court_warlock-1', 'TrofÃ©u de Court Warlock I', '', 'ResistÃªncia elemental holy +0.6%', [
      it('broken staff of mind control', 52747, 1),
      it('refined stag shield (somente comum)', 52649, 1),
      it('stag boots (somente comum)', 52353, 1),
      it('stag footwraps (somente comum)', 52354, 1),
      it('stag helmet (somente comum)', 52348, 1),
      it('stag legs (somente comum)', 52351, 1),
      it('stag plate (somente comum)', 52350, 1),
      it('stag robe (somente comum)', 52349, 1),
      it('stag scrolls (somente comum)', 52356, 1),
      it('stag shield (somente comum)', 52357, 1)
    ], 'Bosses'),
    cx(280, 'boss-darkfang-1', 'TrofÃ©u de Darkfang I', '', 'ResistÃªncia elemental earth +0.6%', [
      it('troll green', 3741, 100),
      it('silver token', 22516, 50),
      it('werewolf fur', 10317, 50),
      it('wolf paw', 5897, 50),
      it('platinum amulet (somente comum)', 3055, 20),
      it('time ring', 3053, 20),
      it('werewolf amulet (somente comum)', 22060, 20),
      it('bonebreaker (somente comum)', 7428, 10),
      it('sai (somente comum)', 50183, 10),
      it('wolf trophy', 2671, 1)
    ], 'Bosses'),
    cx(283, 'boss-dragon_pack-1', 'TrofÃ©u de Dragon Pack I', '', 'ResistÃªncia elemental holy +0.6%', [
      it('arcane dragon robe (somente comum)', 44623, 1),
      it('crystallized blood', 44752, 1),
      it('dauntless dragon scale armor (somente comum)', 44621, 1),
      it('exalted seal', 44750, 1),
      it('gold-scaled sentinel', 44751, 1),
      it('herald\'s insignia', 44753, 1),
      it('herald\'s wings', 44754, 1),
      it('merudri battle mail (somente comum)', 50264, 1),
      it('mystical dragon robe (somente comum)', 44624, 1),
      it('unerring dragon scale armor (somente comum)', 44622, 1)
    ], 'Bosses'),
    cx(286, 'boss-dragonking_zyrtarch-1', 'TrofÃ©u de Dragonking Zyrtarch I', '', 'ResistÃªncia elemental fire +1.1%', [
      it('magic sulphur', 5904, 250),
      it('great spirit potion', 7642, 100),
      it('piece of royal steel', 5887, 100),
      it('crystal of power', 9067, 50),
      it('red dragon leather', 5948, 50),
      it('red dragon scale', 5882, 50),
      it('silver token', 22516, 50),
      it('gold token', 22721, 20),
      it('spellbook of mind control (somente comum)', 8074, 20),
      it('piece of draconian steel', 5889, 5),
      it('modified crossbow (somente comum)', 8021, 1),
      it('zaoan monk robe (somente comum)', 50259, 1)
    ], 'Bosses'),
    cx(289, 'boss-drume-1', 'TrofÃ©u de Drume I', '', 'ResistÃªncia elemental death +0.6%', [
      it('silver token', 22516, 50),
      it('lion amulet (somente comum)', 34158, 1),
      it('lion axe (somente comum)', 34253, 1),
      it('lion claws (somente comum)', 50162, 1),
      it('lion hammer (somente comum)', 34254, 1),
      it('lion longbow (somente comum)', 34150, 1),
      it('lion longsword (somente comum)', 34155, 1),
      it('lion plate (somente comum)', 34157, 1),
      it('lion rod (somente comum)', 34151, 1),
      it('lion shield (somente comum)', 34154, 1)
    ], 'Bosses'),
    cx(292, 'boss-duke_krule-1', 'TrofÃ©u de Duke Krule I', '', 'ResistÃªncia elemental death +0.6%', [
      it('silver token', 22516, 50),
      it('terra hood (somente comum)', 830, 20),
      it('crusader helmet (somente comum)', 3391, 10),
      it('bear skin (somente comum)', 31578, 5),
      it('final judgement', 31738, 5),
      it('piece of draconian steel', 5889, 5),
      it('rotten heart', 31589, 5),
      it('terra helmet (somente comum)', 31577, 5),
      it('young lich worm', 31590, 5),
      it('noble amulet', 31595, 1)
    ], 'Bosses'),
    cx(295, 'boss-earl_osam-1', 'TrofÃ©u de Earl Osam I', '', 'ResistÃªncia elemental earth +0.6%', [
      it('silver token', 22516, 50),
      it('warrior helmet (somente comum)', 3369, 20),
      it('guardian axe (somente comum)', 14043, 10),
      it('embrace of nature (somente comum)', 31579, 5),
      it('final judgement', 31738, 5),
      it('piece of draconian steel', 5889, 5),
      it('rotten heart', 31589, 5),
      it('terra helmet (somente comum)', 31577, 5),
      it('young lich worm', 31590, 5),
      it('token of love', 31594, 1)
    ], 'Bosses'),
    cx(298, 'boss-eldritch_dragon_lord-1', 'TrofÃ©u de Eldritch Dragon Lord I', '', 'ResistÃªncia elemental holy +0.6%', [
      it('strong mana potion', 237, 2000),
      it('dragon tongue', 24938, 50),
      it('dragonbone staff (somente comum)', 7430, 20),
      it('fire sword (somente comum)', 3280, 20),
      it('wand of inferno (somente comum)', 3071, 20),
      it('dragon shield (somente comum)', 3416, 10),
      it('dragon slayer (somente comum)', 7402, 10),
      it('giant amethyst', 32622, 5),
      it('fiery crypt rune', 52657, 1),
      it('golden claw', 52711, 1)
    ], 'Bosses'),
    cx(301, 'boss-eradicator-1', 'TrofÃ©u de Eradicator I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('energy bar', 23535, 250),
      it('instable proto matter', 23516, 100),
      it('odd organ', 23510, 100),
      it('spark sphere', 23518, 100),
      it('gold token', 22721, 20),
      it('spellbook of warding (somente comum)', 8073, 20),
      it('steel boots (somente comum)', 3554, 20),
      it('mysterious remains', 23509, 5),
      it('plasmatic lightning', 23520, 5),
      it('spellbook of lost souls (somente comum)', 8075, 5)
    ], 'Bosses'),
    cx(304, 'boss-faceless_bane-1', 'TrofÃ©u de Faceless Bane I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('hexagonal ruby', 30180, 100),
      it('crowbar (somente comum)', 3304, 10),
      it('dream blossom staff (somente comum)', 25700, 10),
      it('snakebite rod (somente comum)', 3066, 10),
      it('twin hooks (somente comum)', 10392, 10),
      it('book backpack', 28571, 1),
      it('ectoplasmic shield (somente comum)', 29430, 1),
      it('enchanted pendulet (somente comum)', 30344, 1),
      it('spirit guide (somente comum)', 29431, 1),
      it('strange talisman', 3045, 1)
    ], 'Bosses'),
    cx(307, 'boss-fatal_bug-1', 'TrofÃ©u de Fatal Bug I', '', 'Armadura +0.3', [
      it('strong mana potion', 237, 2000),
      it('composite hornbow (somente comum)', 8027, 20),
      it('mercenary sword (somente comum)', 7386, 20),
      it('muck rod (somente comum)', 16117, 20),
      it('ring of red plasma', 23533, 20),
      it('wand of everblazing (somente comum)', 16115, 20),
      it('giant emerald', 30060, 5),
      it('giant ruby', 30059, 5),
      it('traditional sai (somente comum)', 10389, 5),
      it('ancient crypt rune', 52660, 1),
      it('transcendence potion', 49271, 1),
      it('worn guide book', 52710, 1)
    ], 'Bosses'),
    cx(310, 'boss-ferumbras_mortal_shell-1', 'TrofÃ©u de Ferumbras Mortal Shell I', '', 'ResistÃªncia elemental energy +0.4%', [
      it('silver token', 22516, 50),
      it('abyss hammer (somente comum)', 7414, 10),
      it('bloody edge (somente comum)', 7416, 10),
      it('divine plate (somente comum)', 8057, 10),
      it('death gaze (somente comum)', 22758, 5),
      it('great shield (somente comum)', 3422, 5),
      it('phoenix shield (somente comum)', 3439, 5),
      it('boots of homecoming (somente comum)', 22773, 1),
      it('ferumbras\' amulet (somente comum)', 22767, 1),
      it('ferumbras\' mana keg', 22769, 1),
      it('ferumbras\' staff (somente comum)', 22764, 1),
      it('scroll of ascension', 22771, 1)
    ], 'Bosses'),
    cx(313, 'boss-foreshock-1', 'TrofÃ©u de Foreshock I', '', 'Vida +0.6%', [
      it('great mana potion', 238, 100),
      it('ultimate health potion', 7643, 100),
      it('crystalline sword (somente comum)', 16160, 20),
      it('gold token', 22721, 20),
      it('ring of red plasma', 23533, 20),
      it('plasmatic lightning', 23520, 5),
      it('tiara of power (somente comum)', 23474, 5),
      it('void boots (somente comum)', 23476, 5)
    ], 'Bosses'),
    cx(316, 'boss-ghulosh-1', 'TrofÃ©u de Ghulosh I', '', 'ResistÃªncia elemental ice +1.1%', [
      it('slightly rusted helmet', 8908, 100),
      it('silver token', 22516, 50),
      it('butcher\'s axe (somente comum)', 7412, 20),
      it('gold token', 22721, 20),
      it('mercenary sword (somente comum)', 7386, 20),
      it('slightly rusted shield (somente comum)', 8902, 20),
      it('demon horn', 5954, 5),
      it('epaulette', 28793, 1),
      it('solid rage', 23517, 1),
      it('unliving demonbone (somente comum)', 28831, 1)
    ], 'Bosses'),
    cx(319, 'boss-gorzindel-1', 'TrofÃ©u de Gorzindel I', '', 'ResistÃªncia elemental energy +0.4%', [
      it('curious matter', 23511, 50),
      it('silver token', 22516, 50),
      it('crown armor (somente comum)', 3381, 20),
      it('gold token', 22721, 20),
      it('slightly rusted shield (somente comum)', 8902, 20),
      it('steel boots (somente comum)', 3554, 20),
      it('demon horn', 5954, 5),
      it('sinister book', 27932, 5),
      it('knowledgeable book', 27934, 1),
      it('ominous book', 27933, 1)
    ], 'Bosses'),
    cx(322, 'boss-goshnars_cruelty-1', 'TrofÃ©u de Goshnar\'s Cruelty I', '', 'Vida +0.6%', [
      it('bullseye potion', 7443, 2000),
      it('supreme health potion', 23375, 2000),
      it('dragon figurine', 30053, 5),
      it('figurine of cruelty', 34019, 5),
      it('giant sapphire', 30061, 5),
      it('giant topaz', 32623, 5),
      it('spectral horse tack', 34074, 5),
      it('bag you desire â qualquer peÃ§a de dentro', 34109, 1),
      it('cruelty\'s chest', 33923, 1),
      it('cruelty\'s claw', 33922, 1)
    ], 'Bosses'),
    cx(325, 'boss-goshnars_greed-1', 'TrofÃ©u de Goshnar\'s Greed I', '', 'ResistÃªncia elemental holy +0.6%', [
      it('berserk potion', 7439, 2000),
      it('bullseye potion', 7443, 2000),
      it('supreme health potion', 23375, 2000),
      it('dragon figurine', 30053, 5),
      it('figurine of greed', 34021, 5),
      it('giant sapphire', 30061, 5),
      it('giant topaz', 32623, 5),
      it('the skull of a beast', 34075, 5),
      it('bag you desire â qualquer peÃ§a de dentro', 34109, 1),
      it('greed\'s arm', 33924, 1)
    ], 'Bosses'),
    cx(328, 'boss-goshnars_hatred-1', 'TrofÃ©u de Goshnar\'s Hatred I', '', 'Vida +0.6%', [
      it('bullseye potion', 7443, 2000),
      it('bracelet of strengthening', 34076, 5),
      it('dragon figurine', 30053, 5),
      it('figurine of hatred', 34020, 5),
      it('giant sapphire', 30061, 5),
      it('giant topaz', 32623, 5),
      it('spectral horse tack', 34074, 5),
      it('spectral horseshoe', 34072, 5),
      it('bag you desire â qualquer peÃ§a de dentro', 34109, 1),
      it('vial of hatred', 33927, 1)
    ], 'Bosses'),
    cx(331, 'boss-goshnars_malice-1', 'TrofÃ©u de Goshnar\'s Malice I', '', 'ResistÃªncia elemental energy +0.4%', [
      it('bracelet of strengthening', 34076, 5),
      it('dragon figurine', 30053, 5),
      it('figurine of malice', 34018, 5),
      it('giant sapphire', 30061, 5),
      it('giant topaz', 32623, 5),
      it('spectral horseshoe', 34072, 5),
      it('the skull of a beast', 34075, 5),
      it('bag you desire â qualquer peÃ§a de dentro', 34109, 1),
      it('malice\'s horn', 33920, 1),
      it('malice\'s spine', 33921, 1)
    ], 'Bosses'),
    cx(334, 'boss-goshnars_megalomania-1', 'TrofÃ©u de Goshnar\'s Megalomania I', '', 'Armadura +0.3', [
      it('berserk potion', 7439, 2000),
      it('bullseye potion', 7443, 2000),
      it('supreme health potion', 23375, 2000),
      it('dragon figurine', 30053, 5),
      it('figurine of cruelty', 34019, 5),
      it('figurine of greed', 34021, 5),
      it('figurine of hatred', 34020, 5),
      it('figurine of malice', 34018, 5),
      it('figurine of spite', 33952, 5),
      it('giant sapphire', 30061, 5),
      it('giant topaz', 32623, 5),
      it('bag you desire â qualquer peÃ§a de dentro', 34109, 1)
    ], 'Bosses'),
    cx(337, 'boss-goshnars_spite-1', 'TrofÃ©u de Goshnar\'s Spite I', '', 'ResistÃªncia elemental holy +0.6%', [
      it('berserk potion', 7439, 2000),
      it('bullseye potion', 7443, 2000),
      it('supreme health potion', 23375, 2000),
      it('ultimate spirit potion', 23374, 2000),
      it('dragon figurine', 30053, 5),
      it('figurine of spite', 33952, 5),
      it('giant sapphire', 30061, 5),
      it('giant topaz', 32623, 5),
      it('the skull of a beast', 34075, 5),
      it('bag you desire â qualquer peÃ§a de dentro', 34109, 1)
    ], 'Bosses'),
    cx(340, 'boss-grand_master_oberon-1', 'TrofÃ©u de Grand Master Oberon I', '', 'ResistÃªncia elemental death +0.6%', [
      it('brass shield (somente comum)', 3411, 1),
      it('falcon battleaxe (somente comum)', 28724, 1),
      it('falcon bow (somente comum)', 28718, 1),
      it('falcon circlet (somente comum)', 28714, 1),
      it('falcon coif (somente comum)', 28715, 1),
      it('falcon longsword (somente comum)', 28723, 1),
      it('falcon mace (somente comum)', 28725, 1),
      it('falcon rod (somente comum)', 28716, 1),
      it('falcon sai (somente comum)', 50161, 1),
      it('falcon wand (somente comum)', 28717, 1)
    ], 'Bosses'),
    cx(343, 'boss-ice_horror-1', 'TrofÃ©u de Ice Horror I', '', 'Vida +0.6%', [
      it('frosty heart', 9661, 100),
      it('ice cube', 7441, 100),
      it('shard', 7290, 50),
      it('crystal ring (somente comum)', 3007, 20),
      it('glacier mask (somente comum)', 829, 20),
      it('pair of earmuffs (somente comum)', 7459, 5),
      it('frozen crapace', 52728, 1),
      it('icy crypt rune', 52658, 1),
      it('icy horns', 52727, 1),
      it('icy scales', 52726, 1)
    ], 'Bosses'),
    cx(346, 'boss-ichgahal-1', 'TrofÃ©u de Ichgahal I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('berserk potion', 7439, 2000),
      it('bullseye potion', 7443, 2000),
      it('supreme health potion', 23375, 2000),
      it('ultimate spirit potion', 23374, 2000),
      it('amber with a bug', 32624, 100),
      it('amber with a dragonfly', 32625, 100),
      it('cursed wood', 43899, 5),
      it('raw watermelon tourmaline', 33778, 5),
      it('ichgahal\'s fungal infestation', 43964, 1),
      it('putrefactive figurine', 43962, 1)
    ], 'Bosses'),
    cx(349, 'boss-irgix_the_flimsy-1', 'TrofÃ©u de Irgix The Flimsy I', '', 'ResistÃªncia elemental earth +0.6%', [
      it('death toll', 32703, 2000),
      it('terra rod (somente comum)', 3065, 20),
      it('wand of cosmic energy (somente comum)', 3073, 20),
      it('wand of starstorm (somente comum)', 8092, 20),
      it('necklace of the deep', 13990, 10),
      it('pair of nightmare boots (somente comum)', 32619, 5),
      it('silver hand mirror', 32772, 5),
      it('skull coin', 32583, 5)
    ], 'Bosses'),
    cx(352, 'boss-jaul-1', 'TrofÃ©u de Jaul I', '', 'ResistÃªncia elemental death +0.6%', [
      it('ornate mace (somente comum)', 14001, 10),
      it('ornate shield (somente comum)', 14000, 10),
      it('deepling axe (somente comum)', 13991, 5),
      it('ornate legs (somente comum)', 13999, 5),
      it('depth calcei (somente comum)', 13997, 1),
      it('depth galea (somente comum)', 13995, 1),
      it('depth lorica (somente comum)', 13994, 1),
      it('ornate chestplate (somente comum)', 13993, 1)
    ], 'Bosses'),
    cx(355, 'boss-king_zelos-1', 'TrofÃ©u de King Zelos I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('silver token', 22516, 50),
      it('gold token', 22721, 20),
      it('death oyoroi (somente comum)', 50260, 5),
      it('bow of cataclysm (somente comum)', 31581, 1),
      it('galea mortis (somente comum)', 31582, 1),
      it('golden hyaena pendant (somente comum)', 12543, 1),
      it('mortal mace (somente comum)', 31580, 1),
      it('red tome', 2852, 1),
      it('shadow cowl', 31737, 1),
      it('toga mortis (somente comum)', 31583, 1)
    ], 'Bosses'),
    cx(358, 'boss-kusuma-1', 'TrofÃ©u de Kusuma I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('golden lotus brooch', 21974, 1000),
      it('peacock feather fan', 21975, 1000),
      it('green piece of cloth', 5910, 300),
      it('muck rod (somente comum)', 16117, 20),
      it('necrotic rod (somente comum)', 3069, 20),
      it('oriental shoes (somente comum)', 21981, 20),
      it('terra hood (somente comum)', 830, 20),
      it('leaf star', 25735, 10),
      it('snakebite rod (somente comum)', 3066, 10),
      it('swamplair armor (somente comum)', 8052, 10)
    ], 'Bosses'),
    cx(361, 'boss-lady_tenebris-1', 'TrofÃ©u de Lady Tenebris I', '', 'ResistÃªncia elemental death +0.6%', [
      it('cluster of solace', 20062, 100),
      it('ring of the sky', 3006, 100),
      it('silver token', 22516, 50),
      it('gold token', 22721, 20),
      it('shadow sceptre (somente comum)', 7451, 20),
      it('wand of defiance (somente comum)', 16096, 20),
      it('arcane staff (somente comum)', 3341, 5),
      it('part of a rune', 24954, 5),
      it('spellbook of lost souls (somente comum)', 8075, 5),
      it('onyx pendant (somente comum)', 22195, 1)
    ], 'Bosses'),
    cx(364, 'boss-leiden-1', 'TrofÃ©u de Leiden I', '', 'ResistÃªncia elemental holy +0.6%', [
      it('silver token', 22516, 50),
      it('crystalline armor (somente comum)', 8050, 20),
      it('gold token', 22721, 20),
      it('oriental shoes (somente comum)', 21981, 20),
      it('wooden spellbook (somente comum)', 25699, 20),
      it('boots of haste (somente comum)', 3079, 10),
      it('jade hat (somente comum)', 10451, 10),
      it('blood of the mountain', 25361, 1),
      it('cobra crown (somente comum)', 11674, 1),
      it('elven legs (somente comum)', 3401, 1),
      it('elven mail (somente comum)', 3399, 1),
      it('mammoth fur cape (somente comum)', 7463, 1)
    ], 'Bosses'),
    cx(367, 'boss-lloyd-1', 'TrofÃ©u de Lloyd I', '', 'ResistÃªncia elemental death +0.6%', [
      it('luminous orb', 11454, 100),
      it('rusted armor', 8895, 100),
      it('white piece of cloth', 5909, 100),
      it('piece of hell steel', 5888, 50),
      it('silver token', 22516, 50),
      it('gold token', 22721, 20),
      it('spellweaver\'s robe (somente comum)', 10438, 20),
      it('boots of haste (somente comum)', 3079, 10),
      it('part of a rune', 24954, 5),
      it('demon helmet (somente comum)', 3387, 1)
    ], 'Bosses'),
    cx(370, 'boss-lokathmor-1', 'TrofÃ©u de Lokathmor I', '', 'ResistÃªncia elemental fire +1.1%', [
      it('demonic essence', 6499, 1000),
      it('magic sulphur', 5904, 250),
      it('silver token', 22516, 50),
      it('blue robe (somente comum)', 3567, 20),
      it('dreaded cleaver (somente comum)', 7419, 20),
      it('slightly rusted shield (somente comum)', 8902, 20),
      it('stone skin amulet', 3081, 20),
      it('wand of inferno (somente comum)', 3071, 20),
      it('demon horn', 5954, 5),
      it('sturdy book', 28792, 1)
    ], 'Bosses'),
    cx(373, 'boss-lord_azaram-1', 'TrofÃ©u de Lord Azaram I', '', 'ResistÃªncia elemental energy +0.4%', [
      it('huge chunk of crude iron', 5892, 100),
      it('piece of hell steel', 5888, 50),
      it('silver token', 22516, 50),
      it('collar of green plasma', 23527, 20),
      it('bear skin (somente comum)', 31578, 5),
      it('final judgement', 31738, 5),
      it('terra helmet (somente comum)', 31577, 5),
      it('young lich worm', 31590, 5),
      it('ancient liche bone', 31588, 1),
      it('noble cape', 31593, 1)
    ], 'Bosses'),
    cx(376, 'boss-lord_retro-1', 'TrofÃ©u de Lord Retro I', '', 'Vida +0.6%', [
      it('great spirit potion', 7642, 100),
      it('giant amethyst', 32622, 5),
      it('giant ruby', 30059, 5),
      it('giant sapphire', 30061, 5),
      it('25 years backpack', 39693, 1),
      it('brass button (somente comum)', 37604, 1),
      it('changing backpack', 37536, 1),
      it('decorative plume', 37605, 1),
      it('wind-up key', 37397, 1),
      it('wind-up loco', 37398, 1)
    ], 'Bosses'),
    cx(379, 'boss-magma_bubble-1', 'TrofÃ©u de Magma Bubble I', '', 'Vida +0.6%', [
      it('fiery tear', 39040, 1),
      it('firefighting axe', 39544, 1),
      it('portable flame', 39545, 1),
      it('primal bag â qualquer peÃ§a de dentro', 39546, 3)
    ], 'Bosses'),
    cx(382, 'boss-mazzinor-1', 'TrofÃ©u de Mazzinor I', '', 'ResistÃªncia elemental energy +0.4%', [
      it('frozen lightning', 23519, 100),
      it('assassin dagger (somente comum)', 7404, 20),
      it('crystalline armor (somente comum)', 8050, 20),
      it('dreaded cleaver (somente comum)', 7419, 20),
      it('gold token', 22721, 20),
      it('lightning boots (somente comum)', 820, 20),
      it('stone skin amulet', 3081, 20),
      it('wand of starstorm (somente comum)', 8092, 20),
      it('demon horn', 5954, 5),
      it('sinister book', 27932, 5)
    ], 'Bosses'),
    cx(385, 'boss-megasylvan_yselda-1', 'TrofÃ©u de Megasylvan Yselda I', '', 'ResistÃªncia elemental earth +0.6%', [
      it('terra amulet', 814, 20),
      it('terra hood (somente comum)', 830, 20),
      it('terra legs (somente comum)', 812, 20),
      it('terra mantle (somente comum)', 811, 20),
      it('giant topaz', 32623, 5),
      it('bar of gold', 14112, 1),
      it('curl of hair', 36809, 1),
      it('megasylvan sapling', 36811, 1),
      it('old royal diary', 36808, 1),
      it('potato', 8010, 1)
    ], 'Bosses'),
    cx(388, 'boss-mitmah_vanguard-1', 'TrofÃ©u de Mitmah Vanguard I', '', 'ResistÃªncia elemental energy +0.4%', [
      it('broken mitmah chestplate', 44727, 1),
      it('iks footwraps (somente comum)', 50291, 1),
      it('stoic iks boots (somente comum)', 44648, 1),
      it('stoic iks casque (somente comum)', 44636, 1),
      it('stoic iks chestplate (somente comum)', 44620, 1),
      it('stoic iks cuirass (somente comum)', 44619, 1),
      it('stoic iks culet (somente comum)', 44642, 1),
      it('stoic iks faulds (somente comum)', 44643, 1),
      it('stoic iks headpiece (somente comum)', 44637, 1),
      it('stoic iks robe (somente comum)', 50255, 1)
    ], 'Bosses'),
    cx(391, 'boss-mounted_thorn_knight-1', 'TrofÃ©u de Mounted Thorn Knight I', '', 'ResistÃªncia elemental energy +0.4%', [
      it('bullseye potion', 7443, 2000),
      it('demonic essence', 6499, 1000),
      it('piece of royal steel', 5887, 100),
      it('silver token', 22516, 50),
      it('gold token', 22721, 20),
      it('sacred tree amulet', 9302, 20),
      it('medusa shield (somente comum)', 3436, 10),
      it('swamplair armor (somente comum)', 8052, 10),
      it('bright sword (somente comum)', 3295, 1),
      it('mandrake', 5014, 1),
      it('sniper gloves', 5875, 1),
      it('spirit container', 5884, 1)
    ], 'Bosses'),
    cx(394, 'boss-murcion-1', 'TrofÃ©u de Murcion I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('bullseye potion', 7443, 2000),
      it('mastermind potion', 7440, 2000),
      it('supreme health potion', 23375, 2000),
      it('ultimate mana potion', 23373, 2000),
      it('ultimate spirit potion', 23374, 2000),
      it('amber with a bug', 32624, 100),
      it('amber with a dragonfly', 32625, 100),
      it('cursed wood', 43899, 5)
    ], 'Bosses'),
    cx(397, 'boss-neferi_the_spy-1', 'TrofÃ©u de Neferi the Spy I', '', 'ResistÃªncia elemental death +0.6%', [
      it('sea horse figurine', 31323, 50),
      it('glacier mask (somente comum)', 829, 20),
      it('glacier shoes (somente comum)', 819, 20),
      it('knight armor (somente comum)', 3370, 20),
      it('knight axe (somente comum)', 3318, 20),
      it('stealth ring', 3049, 20),
      it('dagger (somente comum)', 3267, 10),
      it('eye-embroidered veil', 37003, 5),
      it('golden mask', 31324, 5),
      it('tagralt-inlaid scabbard', 37002, 5)
    ], 'Bosses'),
    cx(400, 'boss-nightmare_beast-1', 'TrofÃ©u de The Nightmare Beast I', '', 'ResistÃªncia elemental fire +1.1%', [
      it('silver token', 22516, 50),
      it('gold token', 22721, 20),
      it('arcane staff (somente comum)', 3341, 5),
      it('purple tendril lantern', 30171, 5),
      it('beast\'s nightmare-cushion', 29946, 1),
      it('dark vision bandana (somente comum)', 50190, 1),
      it('dark whispers (somente comum)', 29427, 1),
      it('enchanted sleep shawl (somente comum)', 30342, 1),
      it('ice shield', 30168, 1),
      it('turquoise tendril lantern', 30170, 1)
    ], 'Bosses'),
    cx(403, 'boss-obujos-1', 'TrofÃ©u de Obujos I', '', 'ResistÃªncia elemental fire +1.1%', [
      it('deepling axe (somente comum)', 13991, 5),
      it('ornate legs (somente comum)', 13999, 5),
      it('depth claws (somente comum)', 50176, 1),
      it('depth scutum (somente comum)', 13998, 1)
    ], 'Bosses'),
    cx(406, 'boss-outburst-1', 'TrofÃ©u de Outburst I', '', 'ResistÃªncia elemental death +0.6%', [
      it('great mana potion', 238, 100),
      it('ultimate health potion', 7643, 100),
      it('chaos mace (somente comum)', 7427, 20),
      it('crystalline sword (somente comum)', 16160, 20),
      it('gold token', 22721, 20),
      it('ring of red plasma', 23533, 20),
      it('mysterious remains', 23509, 5),
      it('tiara of power (somente comum)', 23474, 5),
      it('void boots (somente comum)', 23476, 5)
    ], 'Bosses'),
    cx(409, 'boss-plagirath-1', 'TrofÃ©u de Plagirath I', '', 'ResistÃªncia elemental ice +1.1%', [
      it('silver token', 22516, 50),
      it('mercenary sword (somente comum)', 7386, 20),
      it('muck rod (somente comum)', 16117, 20),
      it('rift crossbow (somente comum)', 22867, 20),
      it('rift lance (somente comum)', 22727, 20),
      it('spellbook of warding (somente comum)', 8073, 20),
      it('terra amulet', 814, 20),
      it('rift bow (somente comum)', 22866, 10),
      it('traditional sai (somente comum)', 10389, 5),
      it('plague bite (somente comum)', 22759, 1)
    ], 'Bosses'),
    cx(412, 'boss-prince_drazzak-1', 'TrofÃ©u de Prince Drazzak I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('cluster of solace', 20062, 100),
      it('demon horn', 5954, 5),
      it('runed sword (somente comum)', 7417, 5),
      it('demonic tapestry', 20278, 1),
      it('dream matter', 20063, 1),
      it('dream warden mask', 20276, 1),
      it('eye pod', 20279, 1),
      it('nightmare horn', 20274, 1),
      it('psychedelic tapestry', 20277, 1),
      it('unrealized dream', 20264, 1)
    ], 'Bosses'),
    cx(415, 'boss-ragiaz-1', 'TrofÃ©u de Ragiaz I', '', 'ResistÃªncia elemental earth +0.6%', [
      it('demonic essence', 6499, 1000),
      it('flask of demonic blood', 6558, 250),
      it('great health potion', 239, 100),
      it('silver token', 22516, 50),
      it('amber staff (somente comum)', 7426, 20),
      it('rift crossbow (somente comum)', 22867, 20),
      it('skull staff (somente comum)', 3324, 20),
      it('rift bow (somente comum)', 22866, 10),
      it('death gaze (somente comum)', 22758, 5),
      it('reaper\'s axe (somente comum)', 7420, 1)
    ], 'Bosses'),
    cx(418, 'boss-ratmiral-1', 'TrofÃ©u de Ratmiral Blackwhiskers I', '', 'Vida +0.6%', [
      it('bast legs (somente comum)', 35517, 1),
      it('cheesy membership card', 35614, 1),
      it('exotic amulet (somente comum)', 35523, 1),
      it('exotic legs (somente comum)', 35516, 1),
      it('golden cheese wedge', 35581, 1),
      it('golden dustbin', 35579, 1),
      it('jungle bow (somente comum)', 35518, 1),
      it('jungle flail (somente comum)', 35514, 1),
      it('jungle quiver (somente comum)', 35524, 1),
      it('jungle rod (somente comum)', 35521, 1)
    ], 'Bosses'),
    cx(421, 'boss-razzagorn-1', 'TrofÃ©u de Razzagorn I', '', 'ResistÃªncia elemental fire +1.1%', [
      it('berserk potion', 7439, 2000),
      it('bullseye potion', 7443, 2000),
      it('demonic essence', 6499, 1000),
      it('flask of demonic blood', 6558, 250),
      it('silver token', 22516, 50),
      it('devil helmet (somente comum)', 3356, 20),
      it('terra rod (somente comum)', 3065, 20),
      it('great shield (somente comum)', 3422, 5),
      it('maimer (somente comum)', 22762, 1),
      it('visage of the end days (somente comum)', 22754, 1)
    ], 'Bosses'),
    cx(424, 'boss-rupture-1', 'TrofÃ©u de Rupture I', '', 'ResistÃªncia elemental holy +0.6%', [
      it('energy bar', 23535, 250),
      it('odd organ', 23510, 100),
      it('plasma pearls', 23506, 50),
      it('chaos mace (somente comum)', 7427, 20),
      it('gold token', 22721, 20),
      it('ring of green plasma', 23531, 20),
      it('ring of red plasma', 23533, 20),
      it('mysterious remains', 23509, 5),
      it('tiara of power (somente comum)', 23474, 5),
      it('void boots (somente comum)', 23476, 5)
    ], 'Bosses'),
    cx(427, 'boss-scarlett_etzel-1', 'TrofÃ©u de Scarlett Etzel I', '', 'ResistÃªncia elemental holy +0.6%', [
      it('silver token', 22516, 50),
      it('cobra amulet (somente comum)', 31631, 1),
      it('cobra axe (somente comum)', 30396, 1),
      it('cobra bo (somente comum)', 50167, 1),
      it('cobra boots (somente comum)', 30394, 1),
      it('cobra club (somente comum)', 30395, 1),
      it('cobra crossbow (somente comum)', 30393, 1),
      it('cobra hood (somente comum)', 30397, 1),
      it('cobra rod (somente comum)', 30400, 1),
      it('cobra sword (somente comum)', 30398, 1)
    ], 'Bosses'),
    cx(430, 'boss-shadowpelt-1', 'TrofÃ©u de Shadowpelt I', '', 'ResistÃªncia elemental earth +0.6%', [
      it('bear paw', 5896, 50),
      it('honeycomb', 5902, 50),
      it('silver token', 22516, 50),
      it('werebear fur', 22057, 50),
      it('werebear skull', 22056, 50),
      it('dreaded cleaver (somente comum)', 7419, 20),
      it('fur armor (somente comum)', 22085, 20),
      it('furry club (somente comum)', 7432, 20),
      it('relic sword (somente comum)', 7383, 20),
      it('spiked squelcher (somente comum)', 7452, 20)
    ], 'Bosses'),
    cx(433, 'boss-sharpclaw-1', 'TrofÃ©u de Sharpclaw I', '', 'ResistÃªncia elemental earth +0.6%', [
      it('brown mushroom', 3725, 100),
      it('troll green', 3741, 100),
      it('beetroot', 8017, 50),
      it('werebadger claws', 22051, 50),
      it('werebadger skull', 22055, 50),
      it('platinum amulet (somente comum)', 3055, 20),
      it('ring of healing', 3098, 20),
      it('underworld rod (somente comum)', 8082, 20),
      it('wand of voodoo (somente comum)', 8094, 20),
      it('badger boots (somente comum)', 22086, 10)
    ], 'Bosses'),
    cx(436, 'boss-shulgrax-1', 'TrofÃ©u de Shulgrax I', '', 'ResistÃªncia elemental ice +1.1%', [
      it('silver token', 22516, 50),
      it('lightning pendant', 816, 20),
      it('magic plate armor (somente comum)', 3366, 20),
      it('rift crossbow (somente comum)', 22867, 20),
      it('rift lance (somente comum)', 22727, 20),
      it('shadow sceptre (somente comum)', 7451, 20),
      it('bloody edge (somente comum)', 7416, 10),
      it('demonbone amulet (somente comum)', 3019, 10),
      it('rift shield (somente comum)', 22726, 10),
      it('treader of torment (somente comum)', 22756, 1)
    ], 'Bosses'),
    cx(439, 'boss-sir_nictros-1', 'TrofÃ©u de Sir Nictros I', '', 'ResistÃªncia elemental earth +0.6%', [
      it('silver token', 22516, 50),
      it('collar of red plasma', 23528, 20),
      it('knight legs (somente comum)', 3371, 20),
      it('death oyoroi (somente comum)', 50260, 5),
      it('embrace of nature (somente comum)', 31579, 5),
      it('final judgement', 31738, 5),
      it('piece of draconian steel', 5889, 5),
      it('terra helmet (somente comum)', 31577, 5),
      it('young lich worm', 31590, 5),
      it('signet ring', 31592, 1)
    ], 'Bosses'),
    cx(442, 'boss-sister_hetai-1', 'TrofÃ©u de Sister Hetai I', '', 'ResistÃªncia elemental energy +0.4%', [
      it('sea horse figurine', 31323, 50),
      it('dwarven ring', 3097, 20),
      it('lightning pendant', 816, 20),
      it('magma boots (somente comum)', 818, 20),
      it('dagger (somente comum)', 3267, 10),
      it('metal spats (somente comum)', 21169, 10),
      it('warrior\'s shield (somente comum)', 14042, 10),
      it('eye-embroidered veil', 37003, 5),
      it('golden mask', 31324, 5),
      it('tagralt-inlaid scabbard', 37002, 5)
    ], 'Bosses'),
    cx(445, 'boss-solid_frozen_horror-1', 'TrofÃ©u de Solid Frozen Horror I', '', 'ResistÃªncia elemental ice +1.1%', [
      it('frosty heart', 9661, 100),
      it('ice cube', 7441, 100),
      it('instable proto matter', 23516, 100),
      it('spark sphere', 23518, 100),
      it('silver token', 22516, 50),
      it('crystal sword (somente comum)', 7449, 20),
      it('crystalline sword (somente comum)', 16160, 20),
      it('gold token', 22721, 20),
      it('ornate crossbow (somente comum)', 14247, 20),
      it('shiny blade (somente comum)', 16175, 10),
      it('pair of earmuffs (somente comum)', 7459, 5),
      it('frozen plate (somente comum)', 8059, 1)
    ], 'Bosses'),
    cx(448, 'boss-tanjis-1', 'TrofÃ©u de Tanjis I', '', 'ResistÃªncia elemental death +0.6%', [
      it('ornate mace (somente comum)', 14001, 10),
      it('ornate shield (somente comum)', 14000, 10),
      it('depth ocrea (somente comum)', 13996, 1)
    ], 'Bosses'),
    cx(451, 'boss-tarbaz-1', 'TrofÃ©u de Tarbaz I', '', 'Vida +0.6%', [
      it('flask of demonic blood', 6558, 250),
      it('great spirit potion', 7642, 100),
      it('silver token', 22516, 50),
      it('glacier amulet', 815, 20),
      it('glacier kilt (somente comum)', 823, 20),
      it('glacier robe (somente comum)', 824, 20),
      it('rift crossbow (somente comum)', 22867, 20),
      it('rift lance (somente comum)', 22727, 20),
      it('underworld rod (somente comum)', 8082, 20),
      it('shroud of despair (somente comum)', 22757, 1)
    ], 'Bosses'),
    cx(454, 'boss-the_blazing_rose-1', 'TrofÃ©u de The Blazing Rose I', '', 'ResistÃªncia elemental energy +0.4%', [
      it('demonic essence', 6499, 1000),
      it('golden lotus brooch', 21974, 1000),
      it('peacock feather fan', 21975, 1000),
      it('soul orb', 5944, 1000),
      it('flask of demonic blood', 6558, 250),
      it('assassin star', 7368, 20),
      it('crystal ring (somente comum)', 3007, 20),
      it('moonlight rod (somente comum)', 3070, 20),
      it('oriental shoes (somente comum)', 21981, 20),
      it('perfume flacon', 28495, 1)
    ], 'Bosses'),
    cx(457, 'boss-the_brainstealer-1', 'TrofÃ©u de The Brainstealer I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('mastermind potion', 7440, 2000),
      it('ultimate spirit potion', 23374, 2000),
      it('moonstone', 32771, 5),
      it('brainstealer\'s brain', 36795, 1),
      it('brainstealer\'s brainwave', 36796, 1),
      it('brainstealer\'s tissue', 36794, 1),
      it('eldritch cowl (somente comum)', 36670, 1),
      it('eldritch quiver (somente comum)', 36666, 1),
      it('eldritch warmace (somente comum)', 36659, 1)
    ], 'Bosses'),
    cx(460, 'boss-the_diamond_blossom-1', 'TrofÃ©u de The Diamond Blossom I', '', 'ResistÃªncia elemental death +0.6%', [
      it('demonic essence', 6499, 1000),
      it('golden lotus brooch', 21974, 1000),
      it('peacock feather fan', 21975, 1000),
      it('soul orb', 5944, 1000),
      it('flask of demonic blood', 6558, 250),
      it('great spirit potion', 7642, 100),
      it('ultimate health potion', 7643, 100),
      it('assassin star', 7368, 20),
      it('crystal ring (somente comum)', 3007, 20),
      it('moonlight rod (somente comum)', 3070, 20)
    ], 'Bosses'),
    cx(463, 'boss-the_dread_maiden-1', 'TrofÃ©u de The Dread Maiden I', '', 'ResistÃªncia elemental holy +0.6%', [
      it('angel figurine', 32589, 5),
      it('cursed bone', 32774, 5),
      it('ghost claw', 32631, 5),
      it('ivory comb', 32773, 5),
      it('jade legs (somente comum)', 50185, 5),
      it('pair of nightmare boots (somente comum)', 32619, 5),
      it('soulforged lantern', 32591, 5),
      it('spooky hood (somente comum)', 32630, 5),
      it('dark bell', 30325, 1),
      it('jagged sickle', 32595, 1)
    ], 'Bosses'),
    cx(466, 'boss-the_fear_feaster-1', 'TrofÃ©u de The Fear Feaster I', '', 'ResistÃªncia elemental earth +0.6%', [
      it('angel figurine', 32589, 5),
      it('bloody tears', 32594, 5),
      it('cursed bone', 32774, 5),
      it('ghost chestplate (somente comum)', 32628, 5),
      it('ghost claw', 32631, 5),
      it('grimace', 32593, 5),
      it('ivory comb', 32773, 5),
      it('moonstone', 32771, 5),
      it('soulforged lantern', 32591, 5),
      it('spooky hood (somente comum)', 32630, 5)
    ], 'Bosses'),
    cx(469, 'boss-the_gravedigger-1', 'TrofÃ©u de The Gravedigger I', '', 'Armadura +0.3', [
      it('grave flower', 3661, 50),
      it('assassin dagger (somente comum)', 7404, 20),
      it('necrotic rod (somente comum)', 3069, 20),
      it('bonelord eye', 5898, 5),
      it('bonelord shield (somente comum)', 3418, 5),
      it('giant amethyst', 32622, 5),
      it('giant ruby', 30059, 5),
      it('small flask of eyedrops', 11512, 5),
      it('deathly crypt rune', 52659, 1),
      it('shrunken head', 52712, 1)
    ], 'Bosses'),
    cx(472, 'boss-the_last_lore_keeper-1', 'TrofÃ©u de The Last Lore Keeper I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('piece of royal steel', 5887, 100),
      it('ancient stone', 9632, 50),
      it('mystical hourglass', 9660, 50),
      it('silver token', 22516, 50),
      it('gold token', 22721, 20),
      it('bonelord shield (somente comum)', 3418, 5),
      it('part of a rune', 24954, 5),
      it('spellscroll of prophecies (somente comum)', 8076, 5),
      it('enchanted chicken wing', 5891, 1),
      it('forbidden tome', 24971, 1),
      it('key to knowledge', 24972, 1),
      it('silkweaver bow (somente comum)', 8029, 1)
    ], 'Bosses'),
    cx(475, 'boss-the_lily_of_night-1', 'TrofÃ©u de The Lily of Night I', '', 'ResistÃªncia elemental holy +0.6%', [
      it('demonic essence', 6499, 1000),
      it('golden lotus brooch', 21974, 1000),
      it('peacock feather fan', 21975, 1000),
      it('soul orb', 5944, 1000),
      it('flask of demonic blood', 6558, 250),
      it('great spirit potion', 7642, 100),
      it('assassin star', 7368, 20),
      it('moonlight rod (somente comum)', 3070, 20),
      it('necrotic rod (somente comum)', 3069, 20)
    ], 'Bosses'),
    cx(478, 'boss-the_monster-1', 'TrofÃ©u de The Monster I', '', 'Vida +0.6%', [
      it('raw watermelon tourmaline', 33778, 5),
      it('alchemist\'s boots (somente comum)', 40592, 1),
      it('alchemist\'s notepad (somente comum)', 40594, 1),
      it('antler-horn helmet (somente comum)', 40588, 1),
      it('mutant bone boots (somente comum)', 40593, 1),
      it('mutant bone kilt (somente comum)', 40595, 1),
      it('mutant hide trousers (somente comum)', 50184, 1),
      it('mutated skin armor (somente comum)', 40591, 1),
      it('mutated skin legs (somente comum)', 40590, 1),
      it('stitched mutant hide legs (somente comum)', 40589, 1)
    ], 'Bosses'),
    cx(481, 'boss-the_pale_worm-1', 'TrofÃ©u de The Pale Worm I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('bloody tears', 32594, 5),
      it('enchanted ring of souls (somente comum)', 32621, 5),
      it('fabulous legs (somente comum)', 32617, 5),
      it('ghost chestplate (somente comum)', 32628, 5),
      it('grimace', 32593, 5),
      it('jade legs (somente comum)', 50185, 5),
      it('phantasmal axe (somente comum)', 32616, 5),
      it('soulful legs (somente comum)', 32618, 5),
      it('ghost backpack', 32620, 1),
      it('pale worm\'s scalp', 32598, 1)
    ], 'Bosses'),
    cx(484, 'boss-the_primal_menace-1', 'TrofÃ©u de The Primal Menace I', '', 'ResistÃªncia elemental ice +1.1%', [
      it('royal almandine', 39038, 1),
      it('primal bag â qualquer peÃ§a de dentro', 39546, 5)
    ], 'Bosses'),
    cx(487, 'boss-the_rootkraken-1', 'TrofÃ©u de The Rootkraken I', '', 'ResistÃªncia elemental energy +0.4%', [
      it('amber axe (somente comum)', 47375, 1),
      it('amber bludgeon (somente comum)', 47370, 1),
      it('amber bow (somente comum)', 47371, 1),
      it('amber crossbow (somente comum)', 47377, 1),
      it('amber crusher', 46628, 1),
      it('amber cudgel (somente comum)', 47376, 1),
      it('amber greataxe (somente comum)', 47369, 1),
      it('amber kusarigama (somente comum)', 50239, 1),
      it('amber rod (somente comum)', 47373, 1),
      it('amber sabre (somente comum)', 47374, 1)
    ], 'Bosses'),
    cx(490, 'boss-the_scourge_of_oblivion-1', 'TrofÃ©u de The Scourge of Oblivion I', '', 'Armadura +0.3', [
      it('instable proto matter', 23516, 100),
      it('piggy bank', 2995, 100),
      it('cat\'s paw', 5479, 50),
      it('silver token', 22516, 50),
      it('gold token', 22721, 20),
      it('rift shield (somente comum)', 22726, 10),
      it('arcane staff (somente comum)', 3341, 5),
      it('plasmatic lightning', 23520, 5),
      it('calamity (somente comum)', 8104, 1),
      it('library ticket', 28791, 1)
    ], 'Bosses'),
    cx(493, 'boss-the_time_guardian-1', 'TrofÃ©u de The Time Guardian I', '', 'ResistÃªncia elemental energy +0.4%', [
      it('luminous orb', 11454, 100),
      it('silver token', 22516, 50),
      it('gold token', 22721, 20),
      it('guardian boots (somente comum)', 10323, 5),
      it('part of a rune', 24954, 5),
      it('phoenix shield (somente comum)', 3439, 5),
      it('runed sword (somente comum)', 7417, 5),
      it('soul stone', 5809, 5),
      it('spellscroll of prophecies (somente comum)', 8076, 5),
      it('leather whip', 12306, 1)
    ], 'Bosses'),
    cx(496, 'boss-the_unwelcome-1', 'TrofÃ©u de The Unwelcome I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('angel figurine', 32589, 5),
      it('bloody tears', 32594, 5),
      it('cursed bone', 32774, 5),
      it('fabulous legs (somente comum)', 32617, 5),
      it('ghost claw', 32631, 5),
      it('grimace', 32593, 5),
      it('ivory comb', 32773, 5),
      it('soulforged lantern', 32591, 5),
      it('soulful legs (somente comum)', 32618, 5),
      it('spooky hood (somente comum)', 32630, 5)
    ], 'Bosses'),
    cx(499, 'boss-timira_the_many_headed-1', 'TrofÃ©u de Timira the Many-Headed I', '', 'ResistÃªncia elemental energy +0.4%', [
      it('dawnfire sherwani (somente comum)', 39164, 1),
      it('enchanted turtle amulet (somente comum)', 39233, 1),
      it('feverbloom boots (somente comum)', 39161, 1),
      it('frostflower boots (somente comum)', 39158, 1),
      it('midnight sarong (somente comum)', 39167, 1),
      it('midnight tunic (somente comum)', 39165, 1),
      it('naga axe (somente comum)', 39156, 1),
      it('naga basin', 39755, 1),
      it('naga club (somente comum)', 39157, 1),
      it('naga crossbow (somente comum)', 39159, 1)
    ], 'Bosses'),
    cx(502, 'boss-unaz_the_mean-1', 'TrofÃ©u de Unaz the Mean I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('death toll', 32703, 2000),
      it('skull staff (somente comum)', 3324, 20),
      it('warrior\'s axe (somente comum)', 14040, 20),
      it('machete (somente comum)', 3308, 10),
      it('ivory comb', 32773, 5),
      it('moonstone', 32771, 5),
      it('pair of nightmare boots (somente comum)', 32619, 5),
      it('silver hand mirror', 32772, 5),
      it('skull coin', 32583, 5)
    ], 'Bosses'),
    cx(505, 'boss-urmahlullu_the_immaculate-1', 'TrofÃ©u de Urmahlullu the Immaculate I', '', 'ResistÃªncia elemental energy +0.4%', [
      it('silver token', 22516, 50),
      it('blue and golden cordon', 31572, 1),
      it('enchanted theurgic amulet (somente comum)', 30402, 1),
      it('golden bijou', 31575, 1),
      it('rainbow necklace (somente comum)', 30323, 1),
      it('ring of secret thoughts', 31263, 1),
      it('sun medal', 31573, 1),
      it('sunray emblem', 31574, 1),
      it('tagralt blade (somente comum)', 31614, 1),
      it('winged backpack', 31625, 1)
    ], 'Bosses'),
    cx(508, 'boss-utua_stone_sting-1', 'TrofÃ©u de Utua Stone Sting I', '', 'ResistÃªncia elemental earth +0.6%', [
      it('coral brooch', 24391, 100),
      it('demon shield (somente comum)', 3420, 20),
      it('noble axe (somente comum)', 7456, 20),
      it('skull helmet (somente comum)', 5741, 20),
      it('guardian axe (somente comum)', 14043, 10),
      it('raw watermelon tourmaline', 33778, 5),
      it('fist on a stick', 12546, 1),
      it('red silk flower', 34258, 1),
      it('scorpion tail', 9651, 1),
      it('utua\'s poison', 34101, 1)
    ], 'Bosses'),
    cx(511, 'boss-vemiath-1', 'TrofÃ©u de Vemiath I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('berserk potion', 7439, 2000),
      it('bullseye potion', 7443, 2000),
      it('supreme health potion', 23375, 2000),
      it('darklight geode', 43900, 5),
      it('dragon figurine', 30053, 5),
      it('giant amethyst', 32622, 5),
      it('giant emerald', 30060, 5),
      it('giant topaz', 32623, 5),
      it('raw watermelon tourmaline', 33778, 5),
      it('vemiath\'s infused basalt', 43967, 1)
    ], 'Bosses'),
    cx(514, 'boss-vladrukh-1', 'TrofÃ©u de Vladrukh I', '', 'ResistÃªncia elemental holy +0.6%', [
      it('blood crown', 51483, 1),
      it('blood preservation', 11449, 1),
      it('blood sceptre', 51481, 1),
      it('greater proficiency catalyst', 51589, 1),
      it('norcferatu bloodhide (somente comum)', 51263, 1),
      it('norcferatu bloodstrider (somente comum)', 51266, 1),
      it('norcferatu bonecloak (somente comum)', 51264, 1),
      it('norcferatu bonehood (somente comum)', 51261, 1),
      it('norcferatu goretrampers (somente comum)', 51268, 1),
      it('norcferatu skullguard (somente comum)', 51260, 1)
    ], 'Bosses'),
    cx(517, 'boss-vok_the_freakish-1', 'TrofÃ©u de Vok the Freakish I', '', 'ResistÃªncia elemental physical +0.4%', [
      it('death toll', 32703, 2000),
      it('gemmed figurine', 24392, 250),
      it('ornate crossbow (somente comum)', 14247, 20),
      it('cursed bone', 32774, 5),
      it('moonstone', 32771, 5),
      it('pair of nightmare boots (somente comum)', 32619, 5),
      it('silver hand mirror', 32772, 5),
      it('skull coin', 32583, 5)
    ], 'Bosses'),
    cx(520, 'boss-world_devourer-1', 'TrofÃ©u de World Devourer I', '', 'ResistÃªncia elemental holy +0.6%', [
      it('odd organ', 23510, 100),
      it('crystallized anger', 23507, 50),
      it('amber staff (somente comum)', 7426, 20),
      it('gold token', 22721, 20),
      it('lightning headband (somente comum)', 828, 20),
      it('ring of red plasma', 23533, 20),
      it('plasmatic lightning', 23520, 5),
      it('tiara of power (somente comum)', 23474, 5),
      it('void boots (somente comum)', 23476, 5),
      it('crackling egg', 23684, 1),
      it('devourer core', 23686, 1),
      it('energy vein', 23508, 1)
    ], 'Bosses'),
    cx(523, 'set-leather-0', 'Set Leather (Comum)', '', 'Armadura +0.04', [
      it('leather helmet (tier 0)', 3355, 1),
      it('leather armor (tier 0)', 3361, 1),
      it('leather legs (tier 0)', 3559, 1),
      it('leather boots (tier 0)', 3552, 1)
    ]),
    cx(527, 'set-studded-0', 'Set Studded (Comum)', '', 'Armadura +0.04', [
      it('studded helmet (tier 0)', 3376, 1),
      it('studded armor (tier 0)', 3378, 1),
      it('studded legs (tier 0)', 3362, 1),
      it('leather boots (tier 0)', 3552, 1)
    ]),
    cx(531, 'set-chain-0', 'Set Chain (Comum)', '', 'Armadura +0.05', [
      it('chain helmet (tier 0)', 3352, 1),
      it('chain armor (tier 0)', 3358, 1),
      it('chain legs (tier 0)', 3558, 1),
      it('leather boots (tier 0)', 3552, 1)
    ]),
    cx(535, 'set-brass-0', 'Set Brass (Comum)', '', 'Armadura +0.06', [
      it('brass helmet (tier 0)', 3354, 1),
      it('brass armor (tier 0)', 3359, 1),
      it('brass legs (tier 0)', 3372, 1),
      it('leather boots (tier 0)', 3552, 1)
    ]),
    cx(539, 'set-plate-0', 'Set Plate (Comum)', '', 'Armadura +0.09', [
      it('steel helmet (tier 0)', 3351, 1),
      it('plate armor (tier 0)', 3357, 1),
      it('plate legs (tier 0)', 3557, 1),
      it('leather boots (tier 0)', 3552, 1)
    ]),
    cx(543, 'set-knight-0', 'Set Knight (Comum)', '', 'Armadura +0.1 Â· Vida +0.04%', [
      it('steel helmet (tier 0)', 3351, 1),
      it('knight armor (tier 0)', 3370, 1),
      it('knight legs (tier 0)', 3371, 1),
      it('steel boots (tier 0)', 3554, 1)
    ]),
    cx(547, 'set-crown-0', 'Set Crown (Comum)', '', 'Armadura +0.2 Â· Vida +0.05%', [
      it('crown helmet (tier 0)', 3385, 1),
      it('crown armor (tier 0)', 3381, 1),
      it('crown legs (tier 0)', 3382, 1),
      it('steel boots (tier 0)', 3554, 1)
    ]),
    cx(551, 'set-steel-0', 'Set Steel (Comum)', '', 'Armadura +0.1', [
      it('steel helmet (tier 0)', 3351, 1),
      it('plate armor (tier 0)', 3357, 1),
      it('plate legs (tier 0)', 3557, 1),
      it('steel boots (tier 0)', 3554, 1)
    ]),
    cx(555, 'set-terra-0', 'Set Terra (Comum)', '', 'Armadura +0.2', [
      it('terra hood (tier 0)', 830, 1),
      it('terra mantle (tier 0)', 811, 1),
      it('terra legs (tier 0)', 812, 1),
      it('terra boots (tier 0)', 813, 1)
    ]),
    cx(559, 'set-magma-0', 'Set Magma (Comum)', '', 'Armadura +0.2', [
      it('magma monocle (tier 0)', 827, 1),
      it('magma coat (tier 0)', 826, 1),
      it('magma legs (tier 0)', 821, 1),
      it('magma boots (tier 0)', 818, 1)
    ]),
    cx(563, 'set-glacier-0', 'Set Glacier (Comum)', '', 'Armadura +0.2', [
      it('glacier mask (tier 0)', 829, 1),
      it('glacier robe (tier 0)', 824, 1),
      it('glacier kilt (tier 0)', 823, 1),
      it('glacier shoes (tier 0)', 819, 1)
    ]),
    cx(567, 'set-lightning-0', 'Set Lightning (Comum)', '', 'Armadura +0.2', [
      it('lightning headband (tier 0)', 828, 1),
      it('lightning robe (tier 0)', 825, 1),
      it('lightning legs (tier 0)', 822, 1),
      it('lightning boots (tier 0)', 820, 1)
    ]),
    cx(571, 'set-zaoan-0', 'Set Zaoan (Comum)', '', 'Armadura +0.2', [
      it('zaoan helmet (tier 0)', 10385, 1),
      it('zaoan armor (tier 0)', 10384, 1),
      it('zaoan legs (tier 0)', 10387, 1),
      it('zaoan shoes (tier 0)', 10386, 1)
    ]),
    cx(575, 'set-depth-0', 'Set Depth (Comum)', '', 'Armadura +0.3', [
      it('depth galea (tier 0)', 13995, 1),
      it('depth lorica (tier 0)', 13994, 1),
      it('depth ocrea (tier 0)', 13996, 1),
      it('depth calcei (tier 0)', 13997, 1)
    ]),
    cx(579, 'set-gnome-0', 'Set Gnome (Comum)', '', 'Armadura +0.3', [
      it('gnome helmet (tier 0)', 27647, 1),
      it('gnome armor (tier 0)', 27648, 1),
      it('gnome legs (tier 0)', 27649, 1),
      it('gnomish footwraps (tier 0)', 50290, 1)
    ]),
    cx(583, 'set-stoiciks-0', 'Set Stoic Iks (Comum)', '', 'Armadura +0.3', [
      it('stoic iks headpiece (tier 0)', 44637, 1),
      it('stoic iks chestplate (tier 0)', 44620, 1),
      it('stoic iks culet (tier 0)', 44642, 1),
      it('stoic iks boots (tier 0)', 44648, 1)
    ]),
    cx(587, 'set-bone-0', 'Set Bone (Comum)', '', 'Armadura +0.3', [
      it('skull helmet (tier 0)', 5741, 1),
      it('skullcracker armor (tier 0)', 8061, 1),
      it('mutant bone kilt (tier 0)', 40595, 1),
      it('mutant bone boots (tier 0)', 40593, 1)
    ]),
    cx(591, 'set-eldritch-0', 'Set Eldritch (Comum)', '', 'Armadura +0.3', [
      it('eldritch cowl (tier 0)', 36670, 1),
      it('eldritch cuirass (tier 0)', 36663, 1),
      it('eldritch breeches (tier 0)', 36667, 1),
      it('eldritch monk boots (tier 0)', 50266, 1)
    ]),
    cx(595, 'set-norcferatu-0', 'Set Norcferatu (Comum)', '', 'Armadura +0.4', [
      it('norcferatu skullguard (tier 0)', 51260, 1),
      it('norcferatu tuskplate (tier 0)', 51262, 1),
      it('norcferatu thornwraps (tier 0)', 51265, 1),
      it('norcferatu goretrampers (tier 0)', 51268, 1)
    ]),
    cx(599, 'set-stag-0', 'Set Stag (Comum)', '', 'Armadura +0.4', [
      it('stag helmet (tier 0)', 52348, 1),
      it('stag plate (tier 0)', 52350, 1),
      it('stag legs (tier 0)', 52351, 1),
      it('stag boots (tier 0)', 52353, 1)
    ]),
    cx(603, 'set-dark-0', 'Set Dark (Comum)', '', 'Armadura +0.09', [
      it('dark helmet (tier 0)', 3384, 1),
      it('dark armor (tier 0)', 3383, 1)
    ]),
    cx(607, 'set-cobra-0', 'Set Cobra (Comum)', '', 'Armadura +0.1', [
      it('cobra hood (tier 0)', 30397, 1),
      it('cobra boots (tier 0)', 30394, 1)
    ]),
    cx(611, 'set-ornate-0', 'Set Ornate (Comum)', '', 'Armadura +0.2', [
      it('ornate chestplate (tier 0)', 13993, 1),
      it('ornate legs (tier 0)', 13999, 1)
    ]),
    cx(615, 'set-lion-0', 'Set Lion (Comum)', '', 'Armadura +0.2', [
      it('lion spangenhelm (tier 0)', 34156, 1),
      it('lion plate (tier 0)', 34157, 1)
    ]),
    cx(619, 'set-falcon-0', 'Set Falcon (Comum)', '', 'Armadura +0.4', [
      it('falcon coif (tier 0)', 28715, 1),
      it('falcon plate (tier 0)', 28719, 1),
      it('falcon greaves (tier 0)', 28720, 1)
    ]),
    cx(623, 'set-spiritthorn-0', 'Set Spiritthorn (Comum)', '', 'Armadura +0.4', [
      it('spiritthorn helmet (tier 0)', 39148, 1),
      it('spiritthorn armor (tier 0)', 39147, 1)
    ]),
    cx(627, 'set-falcon-w-0', 'Set Falcon â Armas (Comum)', '', 'Ataque +0.6% Â· Dano de magia +0.3%', [
      it('falcon battleaxe (tier 0)', 28724, 1),
      it('falcon bow (tier 0)', 28718, 1),
      it('falcon longsword (tier 0)', 28723, 1),
      it('falcon mace (tier 0)', 28725, 1),
      it('falcon rod (tier 0)', 28716, 1),
      it('falcon sai (tier 0)', 50161, 1),
      it('falcon shield (tier 0)', 28721, 1),
      it('falcon wand (tier 0)', 28717, 1)
    ]),
    cx(631, 'set-cobra-w-0', 'Set Cobra â Armas (Comum)', '', 'Ataque +0.5% Â· Dano de magia +0.3%', [
      it('cobra axe (tier 0)', 30396, 1),
      it('cobra bo (tier 0)', 50167, 1),
      it('cobra club (tier 0)', 30395, 1),
      it('cobra crossbow (tier 0)', 30393, 1),
      it('cobra rod (tier 0)', 30400, 1),
      it('cobra sword (tier 0)', 30398, 1),
      it('cobra wand (tier 0)', 30399, 1)
    ]),
    cx(635, 'set-eldritch-w-0', 'Set Eldritch â Armas (Comum)', '', 'Ataque +0.8% Â· Dano de magia +0.4%', [
      it('eldritch bow (tier 0)', 36664, 1),
      it('eldritch claymore (tier 0)', 36657, 1),
      it('eldritch crescent moon spade (tier 0)', 50169, 1),
      it('eldritch folio (tier 0)', 36672, 1),
      it('eldritch greataxe (tier 0)', 36661, 1),
      it('eldritch quiver (tier 0)', 36666, 1),
      it('eldritch rod (tier 0)', 36674, 1),
      it('eldritch shield (tier 0)', 36656, 1),
      it('eldritch tome (tier 0)', 36673, 1),
      it('eldritch wand (tier 0)', 36668, 1),
      it('eldritch warmace (tier 0)', 36659, 1)
    ]),
    cx(639, 'set-gildedeldritch-w-0', 'Set Gilded Eldritch â Armas (Comum)', '', 'Ataque +0.5% Â· Dano de magia +0.3%', [
      it('gilded eldritch bow (tier 0)', 36665, 1),
      it('gilded eldritch claymore (tier 0)', 36658, 1),
      it('gilded eldritch crescent moon spade (tier 0)', 50170, 1),
      it('gilded eldritch greataxe (tier 0)', 36662, 1),
      it('gilded eldritch rod (tier 0)', 36675, 1),
      it('gilded eldritch wand (tier 0)', 36669, 1),
      it('gilded eldritch warmace (tier 0)', 36660, 1)
    ]),
    cx(643, 'set-lion-w-0', 'Set Lion â Armas (Comum)', '', 'Ataque +0.7% Â· Dano de magia +0.3%', [
      it('lion axe (tier 0)', 34253, 1),
      it('lion claws (tier 0)', 50162, 1),
      it('lion hammer (tier 0)', 34254, 1),
      it('lion longbow (tier 0)', 34150, 1),
      it('lion longsword (tier 0)', 34155, 1),
      it('lion rod (tier 0)', 34151, 1),
      it('lion shield (tier 0)', 34154, 1),
      it('lion spellbook (tier 0)', 34153, 1),
      it('lion wand (tier 0)', 34152, 1)
    ]),
    cx(647, 'set-naga-w-0', 'Set Naga â Armas (Comum)', '', 'Ataque +0.6% Â· Dano de magia +0.3%', [
      it('naga axe (tier 0)', 39156, 1),
      it('naga club (tier 0)', 39157, 1),
      it('naga crossbow (tier 0)', 39159, 1),
      it('naga katar (tier 0)', 50160, 1),
      it('naga quiver (tier 0)', 39160, 1),
      it('naga rod (tier 0)', 39163, 1),
      it('naga sword (tier 0)', 39155, 1),
      it('naga wand (tier 0)', 39162, 1)
    ]),
    cx(651, 'set-amber-w-0', 'Set Amber â Armas (Comum)', '', 'Ataque +0.8% Â· Dano de magia +0.4%', [
      it('amber axe (tier 0)', 47375, 1),
      it('amber bludgeon (tier 0)', 47370, 1),
      it('amber bow (tier 0)', 47371, 1),
      it('amber crossbow (tier 0)', 47377, 1),
      it('amber cudgel (tier 0)', 47376, 1),
      it('amber greataxe (tier 0)', 47369, 1),
      it('amber kusarigama (tier 0)', 50239, 1),
      it('amber rod (tier 0)', 47373, 1),
      it('amber sabre (tier 0)', 47374, 1),
      it('amber slayer (tier 0)', 47368, 1),
      it('amber wand (tier 0)', 47372, 1)
    ]),
    cx(655, 'set-soul-w-0', 'Set Soul â Armas (Comum)', '', 'Ataque +1.1% Â· Dano de magia +0.5%', [
      it('soulbastion (tier 0)', 34099, 1),
      it('soulbiter (tier 0)', 34084, 1),
      it('soulbleeder (tier 0)', 34088, 1),
      it('soulcrusher (tier 0)', 34086, 1),
      it('soulcutter (tier 0)', 34082, 1),
      it('souleater (tier 0)', 34085, 1),
      it('soulhexer (tier 0)', 34091, 1),
      it('soulkamas (tier 0)', 50159, 1),
      it('soulmaimer (tier 0)', 34087, 1),
      it('soulpiercer (tier 0)', 34089, 1),
      it('soulshredder (tier 0)', 34083, 1),
      it('soultainter (tier 0)', 34090, 1)
    ]),
    cx(659, 'set-sanguine-w-0', 'Set Sanguine â Armas (Comum)', '', 'Ataque +1% Â· Dano de magia +0.5%', [
      it('sanguine battleaxe (tier 0)', 43874, 1),
      it('sanguine blade (tier 0)', 43864, 1),
      it('sanguine bludgeon (tier 0)', 43872, 1),
      it('sanguine bow (tier 0)', 43877, 1),
      it('sanguine claws (tier 0)', 50157, 1),
      it('sanguine coil (tier 0)', 43882, 1),
      it('sanguine crossbow (tier 0)', 43879, 1),
      it('sanguine cudgel (tier 0)', 43866, 1),
      it('sanguine hatchet (tier 0)', 43868, 1),
      it('sanguine razor (tier 0)', 43870, 1),
      it('sanguine rod (tier 0)', 43885, 1)
    ]),
    cx(663, 'set-inferniarch-w-0', 'Set Inferniarch â Armas (Comum)', '', 'Ataque +0.8% Â· Dano de magia +0.4%', [
      it('inferniarch arbalest (tier 0)', 49522, 1),
      it('inferniarch battleaxe (tier 0)', 49523, 1),
      it('inferniarch blade (tier 0)', 49527, 1),
      it('inferniarch bow (tier 0)', 49520, 1),
      it('inferniarch claws (tier 0)', 50250, 1),
      it('inferniarch flail (tier 0)', 49525, 1),
      it('inferniarch greataxe (tier 0)', 49524, 1),
      it('inferniarch rod (tier 0)', 49529, 1),
      it('inferniarch slayer (tier 0)', 49530, 1),
      it('inferniarch wand (tier 0)', 49528, 1),
      it('inferniarch warhammer (tier 0)', 49526, 1)
    ]),
    cx(667, 'set-jungle-w-0', 'Set Jungle â Armas (Comum)', '', 'Ataque +0.3% Â· Dano de magia +0.2%', [
      it('jungle bow (tier 0)', 35518, 1),
      it('jungle flail (tier 0)', 35514, 1),
      it('jungle quiver (tier 0)', 35524, 1),
      it('jungle rod (tier 0)', 35521, 1),
      it('jungle wand (tier 0)', 35522, 1)
    ]),
    cx(671, 'set-stag-w-0', 'Set Stag â Armas (Comum)', '', 'Ataque +0.3% Â· Dano de magia +0.2%', [
      it('refined stag shield (tier 0)', 52649, 1),
      it('stag scrolls (tier 0)', 52356, 1),
      it('stag shield (tier 0)', 52357, 1),
      it('stag spellbook (tier 0)', 52355, 1)
    ]),
    cx(675, 'set-primal-w-0', 'Set Primal â Armas (Comum)', '', 'Ataque +0.3% Â· Dano de magia +0.1%', [
      it('alicorn quiver (tier 0)', 39150, 1),
      it('arboreal tome (tier 0)', 39154, 1),
      it('arcanomancer folio (tier 0)', 39152, 1)
    ]),
    cx(679, 'set-depthornate-w-0', 'Set Depth &amp; Ornate â Armas (Comum)', '', 'Ataque +0.3% Â· Dano de magia +0.1%', [
      it('depth claws (tier 0)', 50176, 1),
      it('depth scutum (tier 0)', 13998, 1),
      it('ornate crossbow (tier 0)', 14247, 1),
      it('ornate mace (tier 0)', 14001, 1),
      it('ornate shield (tier 0)', 14000, 1)
    ]),
    cx(683, 'set-glooth-w-0', 'Set Glooth â Armas (Comum)', '', 'Ataque +0.3% Â· Dano de magia +0.1%', [
      it('glooth axe (tier 0)', 21180, 1),
      it('glooth blade (tier 0)', 21179, 1),
      it('glooth club (tier 0)', 21178, 1),
      it('glooth spear (tier 0)', 21158, 1),
      it('glooth whip (tier 0)', 21172, 1)
    ]),
  ];
})();