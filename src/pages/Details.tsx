import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCard } from '../utils/api';
import { ICardData } from '../interfaces/search-result.interface';
import useNavigateToPage from '../hooks/useNavigate';
import styles from './Details.module.css';

export default function Details() {
  const { id } = useParams();
  const [data, setData] = useState<{ data: ICardData[] }>({ data: [] });
  const { navigateToCard } = useNavigateToPage();

  async function fetchCardById() {
    const responce = await fetchCard(Number(id));
    setData(responce);
  }

  useEffect(() => {
    fetchCardById();
  }, [id]);

  console.log(data);

  function handleCloseButton() {
    console.log(window.location.search);
    navigateToCard('/')
  }

  return (
    <div className={styles.detailsContainer}>
      <button onClick={handleCloseButton}>Close</button>
    </div>
  );
}
