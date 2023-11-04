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
  title?: string;
  images: Images;
  episodes?: number;
  type?: string;
  duration?: string;
}

export interface Images {
  jpg: IJpg;
}

export interface IJpg {
  image_url: string;
  large_image_url: string;
}

export interface IDetailsData {
  data: ICardData;
}
