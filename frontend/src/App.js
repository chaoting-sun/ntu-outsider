import './css/App.css';

import { React, useState, useEffect } from 'react'
import { useOusider } from './containers/hooks/useOusider';
import { useNavigate, useLocation } from 'react-router';
import { Navigate } from "react-router-dom";
import { OutsiderProvider } from './containers/hooks/useOusider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './containers/HomePage';
import SearchPage from './containers/searchPage';
import RestaurantPage from './containers/restaurantPage';
import PostPage from './containers/postPage';
import SignInPage from './containers/signInPage';

// SignIn & Home implementation
// ref: https://blog.shahednasser.com/react-context-tutorial-for-beginners/

function App() {
  return (
    <OutsiderProvider>
      <Router>
        <Routes>
          {/* <Route path="/signIn" element={<SignInPage />} /> */}
          <Route path="/logIn" element={<SignInPage />}/>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </Router>
    </OutsiderProvider>
  )

  // return (
  //       <Navigate to="/homePage" />
  //       <Navigate to="/signIn" />
  // );
}

export default App;
