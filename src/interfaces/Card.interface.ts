export interface ICard {
  pagination?: Pagination;
  data: ICardData[];
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
}

export interface ICardData {
  mal_id: number;
  title: string;
  images: Images;
}

export interface Images {
  jpg: Jpg;
}

export interface Jpg {
  image_url: string;
}

export interface IAppProps {}

export interface IAppState {
  data: ICard;
  value: string;
  hasError: boolean;
  loading: boolean;
}
