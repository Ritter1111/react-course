import { Outlet } from 'react-router-dom';
import Main from './pages/Main/Main';

export default function App() {
  return (
    <div style={{display: 'flex'}}>
      <Main />
      <Outlet />
    </div>
  );
}
