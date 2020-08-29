import {Faction} from '../models/enums/faction';
import {IMoney} from '../models/interfaces/IResources';
import {Ascension} from '../models/enums/ascension';

export interface Ihero {
  name: string;
  lvlCap: number;
  lvlCurrent: number;
  faction: Faction;
  atk: number;
  def: number;
  avatarURL: string;
  price: IMoney;
  ascensionLvl: Ascension;
  description?: string;
  favorite?: boolean;
}
