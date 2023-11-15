// import { useState } from 'react';
// import { fetchCard, fetchCards } from '../utils/api';
// import { useAppContext } from '../context';

// export const useFetching = () => {
//   const [loading, setLoading] = useState(false);
//   const [pageInfo, setPageInfo] = useState({ currPage: 1, totalPages: 1 });
//   const { setItems, setDetailsData } = useAppContext();

//   const fetchAllCards = async (
//     value?: string,
//     page?: number,
//     limit?: number
//   ) => {
//     setLoading(true);

//     try {
//       // value && setSearchValue(value);

//       const cardsData = await fetchCards(page, value, limit);

//       setPageInfo({
//         currPage: cardsData.pagination.current_page,
//         totalPages: cardsData.pagination.last_visible_page,
//       });

//       setItems(cardsData.data);
//     } catch (error) {
//       console.error('Error fetching cards:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCardById = async (id: number) => {
//     setLoading(true);

//     try {
//       const cardsData = await fetchCard(id);
//       setDetailsData(cardsData.data);
//     } catch (error) {
//       console.error('Error fetching card by ID:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     loading,
//     pageInfo,
//     fetchAllCards,
//     setPageInfo,
//     fetchCardById,
//   };
// };
