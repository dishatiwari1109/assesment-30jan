import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import WatchList from './pages/WatchList';
import Header from './components/Header';
import Home from './pages/Home';
import Favourites from './pages/Favourites'
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* TODO: Add other routes */}
            {/* <Route path="/search" element={<SearchResults />} /> */}
            {/* <Route path="/movie/:imdbID" element={<MovieDetails />} /> */}
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;