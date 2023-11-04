import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import NotFound from '../components/NotFound/NotFound';
import Details from '../pages/Details/Details';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/:id',
        element: <Details />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
