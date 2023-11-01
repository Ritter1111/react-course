export interface ICard {
  count?: number,
  next?: string, 
  previous?: string,
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

export interface IAppProps {}

export interface IAppState {
  data: ICard;
  value: string;
  hasError: boolean;
  loading: boolean;
}
