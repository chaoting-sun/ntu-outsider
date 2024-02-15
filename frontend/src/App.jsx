import './css/App.css';

import { React } from 'react'
import { OutsiderProvider } from './containers/hooks/useOusider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './containers/mainPage';
import SignInPage from './containers/signInPage';
import Navbar from './components/navigationBar';
import EditPostPage from './containers/editPostPage';
import MailPage from './containers/mailPage';
import MyProfilePage from './containers/myProfilePage';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

function App() {
  return (
    <OutsiderProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/logIn" element={<SignInPage />} />
            <Route path='/' element={<Navbar />}>
              <Route index element={<MainPage />} />
              <Route path="/editPostPage" element={<EditPostPage />} />
              <Route path="/mailPage" element={<MailPage />} />
              <Route path="/myProfilePage" element={<MyProfilePage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </OutsiderProvider>
  )
}

export default App;
