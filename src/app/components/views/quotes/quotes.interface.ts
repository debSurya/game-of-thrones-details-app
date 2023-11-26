import { IMember } from '../houses/houses.interface';

export interface IQuote {
  sentence: string;
  character: {
    name: string;
    slug: string;
    house: IMember;
  };
}
