import { useNavigate } from 'react-router-dom';

export const useNavigateToPage = () => {
  const navigate = useNavigate();

  function navigateToCard(path: string) {
    navigate({ pathname: path, search: window.location.search });
  }
  return { navigateToCard };
};
