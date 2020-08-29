import {Faction} from '../models/enums/faction';
import {IResources} from '../models/interfaces/IResources';
import {Ascension} from '../models/enums/ascension';

export interface IHero {
  name: string;
  lvlCap: number;
  lvlCurrent: number;
  faction: Faction;
  atk: number;
  def: number;
  avatarURL: string;
  price: number;
  ascensionLvl: Ascension;
  description?: string;
  favorite?: boolean;
}
