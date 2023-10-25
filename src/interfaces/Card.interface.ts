export interface ICard {
  results: ICardData[];
}

export interface ICardData {
  id?: number;
  name: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  origin?: IOrigin;
  location?: ILocation;
  image?: string;
  episode?: string[];
  url?: string;
  created?: string;
}

export interface IOrigin {
  name: string;
  url: string;
}

export interface ILocation {
  name: string;
  url: string;
}

export interface AppProps {}

export interface AppState {
  data: ICard;
  param: string;
}
