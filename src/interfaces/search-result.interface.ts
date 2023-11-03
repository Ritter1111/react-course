export interface ICard {
  pagination?: IPagination;
  data: ICardData[];
}

export interface IPagination {
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
  jpg: IJpg;
}

export interface IJpg {
  image_url: string;
}
