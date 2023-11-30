import { IMember } from '../houses/houses.interface';

export interface IPerson {
  name: string;
  slug: string;
  house: IMember | null;
  quotes: string[];
}
