import axios from 'axios';
import { knuthShuffle } from 'knuth-shuffle';
import { Pokemon } from './types';

const cache = new Map<string, Pokemon>();

const url = 'https://pokeapi.co/api/v2/pokemon/';

const pickItem = (): string => {
  const items = ['Absorb Bulb',
    'Adamant Orb',
    'Air Balloon',
    'Amulet Coin',
    'Assault Vest',
    'Berry Sweet',
    'Big Root',
    'Binding Band',
    'Black Belt',
    'Black Glasses',
    'Black Sludge',
    'Blue Orb',
    'Blue Scarf',
    'Blunder Policy',
    'Bright Powder',
    'Bug Gem',
    'Bug Memory',
    'Burn Drive',
    'Cell Battery',
    'Charcoal',
    'Chill Drive',
    'Choice Band',
    'Choice Scarf',
    'Choice Specs',
    'Cleanse Tag',
    'Clover Sweet',
    'Damp Rock',
    'Dark Gem',
    'Dark Memory',
    'Deep Sea Scale',
    'Deep Sea Tooth',
    'Destiny Knot',
    'Douse Drive',
    'Dragon Fang',
    'Dragon Gem',
    'Dragon Memory',
    'Dubious Disc',
    'Eject Button',
    'Eject Pack',
    'Electirizer',
    'Electric Gem',
    'Electric Memory',
    'Electric Seed',
    'Eviolite',
    'Expert Belt',
    'Fairy Gem',
    'Fairy Memory',
    'Fighting Gem',
    'Fighting Memory',
    'Fire Gem',
    'Fire Memory',
    'Flame Orb',
    'Float Stone',
    'Flower Sweet',
    'Flying Gem',
    'Flying Memory',
    'Focus Band',
    'Focus Sash',
    'Full Incense',
    'Ghost Gem',
    'Ghost Memory',
    'Grass Gem',
    'Grass Memory',
    'Grassy Seed',
    'Green Scarf',
    'Grip Claw',
    'Griseous Orb',
    'Ground Gem',
    'Ground Memory',
    'Hard Stone',
    'Heat Rock',
    'Heavy-Duty Boots',
    'Ice Gem',
    'Ice Memory',
    'Icy Rock',
    'Iron Ball',
    'King\'s Rock',
    'Lagging Tail',
    'Lax Incense',
    'Leek',
    'Leftovers',
    'Life Orb',
    'Light Ball',
    'Light Clay',
    'Love Sweet',
    'Luck Incense',
    'Lucky Egg',
    'Lucky Punch',
    'Luminous Moss',
    'Lustrous Orb',
    'Macho Brace',
    'Magmarizer',
    'Magnet',
    'Mental Herb',
    'Metal Coat',
    'Metal Powder',
    'Metronome',
    'Miracle Seed',
    'Misty Seed',
    'Muscle Band',
    'Mystic Water',
    'Never-Melt Ice',
    'Normal Gem',
    'Odd Incense',
    'Pink Scarf',
    'Poison Barb',
    'Poison Gem',
    'Poison Memory',
    'Power Anklet',
    'Power Band',
    'Power Belt',
    'Power Bracer',
    'Power Herb',
    'Power Lens',
    'Power Weight',
    'Protective Pads',
    'Protector',
    'Psychic Gem',
    'Psychic Memory',
    'Psychic Seed',
    'Pure Incense',
    'Quick Claw',
    'Quick Powder',
    'Razor Claw',
    'Razor Fang',
    'Reaper Cloth',
    'Red Card',
    'Red Orb',
    'Red Scarf',
    'Ribbon Sweet',
    'Ring Target',
    'Rock Gem',
    'Rock Incense',
    'Rock Memory',
    'Rocky Helmet',
    'Room Service',
    'Rose Incense',
    'Rusted Shield',
    'Rusted Sword',
    'Safety Goggles',
    'Scope Lens',
    'Sea Incense',
    'Sharp Beak',
    'Shed Shell',
    'Shell Bell',
    'Shock Drive',
    'Silk Scarf',
    'Silver Powder',
    'Smoke Ball',
    'Smooth Rock',
    'Snowball',
    'Soft Sand',
    'Soothe Bell',
    'Soul Dew',
    'Spell Tag',
    'Star Sweet',
    'Steel Gem',
    'Steel Memory',
    'Sticky Barb',
    'Strawberry Sweet',
    'Terrain Extender',
    'Thick Club',
    'Throat Spray',
    'Toxic Orb',
    'Twisted Spoon',
    'Utility Umbrella',
    'Water Gem',
    'Wave Incense',
    'Weakness Policy',
    'White Herb',
    'Wide Lens',
    'Wise Glasses',
    'Zap Plate',
    'Zoom Lens',
  ];

  return items[Math.floor(Math.random() * items.length)];
};

const genEVS = (): string => {
  const stats = ['HP', 'Atk', 'Spe', 'Def', 'SpD', 'SpA'];
  const shuffled = knuthShuffle(stats);
  return `252 ${shuffled[0]} / 252 ${shuffled[1]} / 4 ${shuffled[2]}`;
};

const genNature = (): string => {
  const natures = [ 'Hardy', 'Lonely', 'Brave', 'Adamant', 'Naughty', 'Bold', 'Docile',
    'Relaxed', 'Impish', 'Lax', 'Timid', 'Hasty', 'Serious', 'Jolly',
    'Naive', 'Modest', 'Mild', 'Quiet', 'Bashful', 'Rash','Calm',
    'Gentle', 'Sassy', 'Careful', 'Quirky'
  ];
  return natures[Math.floor(Math.random() * natures.length)];
};

const genMoves = (pokemon: Pokemon): string => {
  const duplicates = new Map<string, boolean>();
  const moves = knuthShuffle(pokemon.moves.filter(move => {
    if (duplicates.has(move.move.name)) {
      return false;
    } else {
      duplicates.set(move.move.name, true);
      return true;
    }
  }));

  let moveList = '';
  for (let i = 0; (i < moves.length && i < 4); i++) {
    moveList = `${moveList}\n- ${moves[i].move.name.replace('-', ' ').replace(/(^| )(\w)/g, s => s.toUpperCase())}`;
  }
  return moveList;
};

const buildShowdownString = (pokemon: Pokemon): string => {
  const name = pokemon.name;
  const item = pickItem();
  const ability = pokemon.abilities[Math.floor(Math.random() * pokemon.abilities.length)].ability.name;
  const evs = genEVS();
  const nature = genNature();
  const moves = genMoves(pokemon);

  return `${name} @ ${item}
  Ability: ${ability}
  EVs: ${evs}
  ${nature} Nature
  ${moves}`;
};

const getTeam = (): string[] => {
  // TODO:
  return ['111'];
};


const promises = new Array<Promise<Pokemon | void>>();
const results = new Array<string>();
getTeam().forEach((pokemon) => {
  if (cache.has(pokemon)) {
    results.push(buildShowdownString(cache.get(pokemon)));
  }

  promises.push(
    axios.get(`${url}/${pokemon}`)
      .then(response => {
        const pokemonData = response.data as Pokemon;
        cache.set(pokemon, pokemonData); // TODO: Not thread safe
        results.push(buildShowdownString(pokemonData));
        return pokemonData;
      })
      .catch(error => {
        console.log(error);
      })
  );
});


Promise.all(promises).then(() => console.log(results));