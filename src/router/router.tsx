import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../pages/Main/Main';
import UncontrolledForm from '../pages/UncontrolledForm/UncontrolledForm';
import { ReactHookForm } from '../pages/ReactHookForm/ReactHookForm';

export function Router(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
      <Route path="/react-hook-form" element={<ReactHookForm />} />
    </Routes>
  );
}
