import { useNavigate } from 'react-router-dom';

const useNavigateToPage = () => {
  const navigate = useNavigate();

  function navigateToCard(path: string) {
    navigate({ pathname: path, search: window.location.search });
  }

  return { navigateToCard };
};

export default useNavigateToPage;
