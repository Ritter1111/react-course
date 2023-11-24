export type CardData = {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url?: string;
    };
  };
  chapters?: number;
  type?: string;
  duration?: string;
  synopsis?: string;
  score?: number;
};

export type CardDataProps = {
  cards: CardData[];
};

export interface ICard {
  pagination: IPagination;
  data: CardData[];
}

export interface IPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
}

export type DataInfo = {
  data: CardData;
};
