import {Faction} from '../models/enums/faction';
import {IMoney} from '../models/interfaces/IResources';

export interface Ihero {
  name: string;
  lvlCap: number;
  lvlCurrent: number;
  faction: Faction;
  atk: number;
  def: number;
  avatarURL: string;
  price: IMoney;
  description?: string;
  favorite?: boolean;
}
