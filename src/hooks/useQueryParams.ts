import { useSearchParams } from 'react-router-dom';

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get('page') || '';
  const queryLimit = searchParams.get('limit') || '';
  const querySearch = searchParams.get('q') || '';

  function setDefaultQueryParametr(param: string, value: string) {
    return Number(param && param !== '0' ? param : value);
  }

  return {
    searchParams,
    queryPage,
    queryLimit,
    querySearch,
    setDefaultQueryParametr,
    setSearchParams,
  };
};
