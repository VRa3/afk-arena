import {Faction} from '../models/enums/faction';

export interface Ihero {
  name: string;
  lvlCap: number;
  lvlCurrent: number;
  faction: Faction;
  atk: number;
  def: number;
  avatarURL: string;
  description?: string;
  favorite?: boolean;
}
