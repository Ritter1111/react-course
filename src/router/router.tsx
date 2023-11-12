import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from '../components/NotFound/NotFound';
import Details from '../pages/Details/Details';
import Main from '../pages/Main/Main';

export function Router(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="detail/:id" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
