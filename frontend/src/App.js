import './css/App.css';

import { React, useState, useEffect } from 'react'
import NavBar from './components/navigationBar';
import { useOusider } from './containers/hooks/useOusider';
import { useNavigate, useLocation } from 'react-router';
import { Navigate } from "react-router-dom";
import { OutsiderProvider } from './containers/hooks/useOusider';


function App() {
  const { } = useOusider();  
  
  console.log('Sign in:', signedIn);
  
  return (
    <OutsiderProvider>
        
        <Navigate to="/homePage" />
      ) : (
        <Navigate to="/signIn" />
      )
    </OutsiderProvider>
  );
}

export default App;
