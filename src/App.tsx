import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from './components/pages/Main';;
import { store } from "./store";

const App = () => (
  <Provider store={store}>
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  </Provider>
);

export default App;
