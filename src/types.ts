export interface Pokemon {
  abilities: Abilities[];
  base_experience: number;
  forms: any[]; // ignore
  game_indices: any[]; // ignore
  height: number; // ignore
  held_items: any[]; // ignore
  id: number; // ?
  is_default: boolean; // ?
  location_area_encounters: string; // ignore
  moves: Moves[];
  name: string;
  order: number; // ?
  past_types: any[]; // future maybe
  species: any; // ignore
  sprites: any; // ignore probably
  stats: Stats[];
  types: Types[];
  weight: number;
}

export interface Abilities {
  ability: {
    name: string;
    url: string;
  }
  is_hidden: false;
  slot: number;

}

export interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  }
}

export interface Types {
  slot: number;
  type: {
    name: string;
    url: string;
  }
}

export interface Moves {
  move: {
    name: string;
    url: string;
  }
  version_group_details: {
    level_learned_at: number
    move_learn_method: {
      name: string;
      url: string;
    }
    version_group: {
      name: string;
      url: string;
    }
  }[];
}

export interface EffortValues {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spdef: number;
  spd: number;
}