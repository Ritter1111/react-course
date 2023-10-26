export const getSearchParam = (key: string) => {
  const searchParam = localStorage.getItem(key) || '';
  return searchParam;
};

export const setSearchParam = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
