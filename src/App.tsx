import { Outlet } from 'react-router-dom';
import Main from './pages/Main';

export default function App() {
  return (
    <>
      <Main />
      <Outlet />
    </>
  );
}
