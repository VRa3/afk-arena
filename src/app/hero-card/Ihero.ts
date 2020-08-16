import {Faction} from '../models/enums/faction';

export interface Ihero {
  name: string;
  lvlCap: number;
  faction: Faction;
  atk: number;
  def: number;
  avatarURL: string;
  description?: string;
}
