import { useSearchParams } from 'react-router-dom';
import { getSearchParam } from '../utils/localStorage';

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get('page') || '';
  const queryLimit = searchParams.get('limit') || '';
  const querySearch = searchParams.get('q') || '';
  const searchValue = getSearchParam('searchValue');

  function setDefaultQueryParametr(param: string, value: string) {
    return param && param !== '0' ? param : value;
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
}
