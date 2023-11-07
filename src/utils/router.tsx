import { createBrowserRouter } from 'react-router-dom';
import { NotFound } from '../components/NotFound/NotFound';
import Details from '../pages/Details/Details';
import Main from '../pages/Main/Main';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/:id',
        element: <Details />,
      },
    ],
    errorElement: <NotFound />,
  },
]);
