export const detailedMockData = {
  mal_id: 1,
  url: "https://myanimelist.net/manga/1/Monster",
  images: {
    jpg: {
      image_url: "sample-image.jpg",
      small_image_url: "sample-image.jpg",
      large_image_url: "sample-image.jpg",
    },
  },
  title: "Monster",
  type: "Manga",
  chapters: 162,
  volumes: 18,
  score: 9.15,
  scored: 9.15,
  rank: 5,
  synopsis: "Sample description",
};

export const cardProps = {
  id: 1,
  title: "Sample Card",
  images: "sample-image.jpg",
};

export const mockData = {
  pagination: { last_visible_page: 1, has_next_page: false, current_page: 1 },
  data: [detailedMockData],
};

export const detailedMockResponce = {
  data: detailedMockData,
};
