import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './App.css';
import { Routes } from './routes/Routes';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
        <ToastContainer position="bottom-center" />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
    </Provider>
  );
};

export default App;
