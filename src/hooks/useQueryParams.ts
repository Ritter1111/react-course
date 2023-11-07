import { useSearchParams } from 'react-router-dom';
import { getSearchParam } from '../utils/localStorage';

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get('page') || '';
  let queryLimit = searchParams.get('limit') || '';
  const querySearch = searchParams.get('q') || '';
  const searchValue = getSearchParam('searchValue');

  if (queryLimit === '0') {
    queryLimit = '10';
  }

  function setDefaultQueryParametr(param: string, value: string) {
    return Number(param && param !== '0' ? param : value);
  }

  return {
    searchParams,
    queryPage,
    queryLimit,
    querySearch,
    searchValue,
    setDefaultQueryParametr,
    setSearchParams,
  };
};
