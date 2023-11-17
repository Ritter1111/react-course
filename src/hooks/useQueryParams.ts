import { useSearchParams } from 'react-router-dom';

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get('page') ?? '';
  const queryLimit = searchParams.get('limit') ?? '';

  return {
    searchParams,
    queryPage,
    queryLimit,
    setSearchParams,
  };
};
