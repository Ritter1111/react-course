import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/router';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Router />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
