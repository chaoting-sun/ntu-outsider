import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import SignInPage from './containers/signInPage';
import App from './App';
import HomePage from './containers/HomePage';
import SearchPage from './containers/searchPage';
import RestaurantPage from './containers/restaurantPage';
import PostPage from './containers/postPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </Router>
    </React.StrictMode>
);
