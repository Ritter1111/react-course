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
