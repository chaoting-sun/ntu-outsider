import './css/App.css';

import { React } from 'react'
import { OutsiderProvider } from './containers/hooks/useOusider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './containers/mainPage';
import SignInPage from './containers/signInPage';
import Navbar from './components/navigationBar';
import EditPostPage from './containers/editPostPage';
import ViewPostPage from './containers/viewPostPage';
import MailPage from './containers/mailPage';
import MyProfilePage from './containers/myProfilePage';

import { ThemeProvider, createTheme, responsiveFontSizes } from "@material-ui/core/styles";
let theme = createTheme();
theme = responsiveFontSizes(theme);

// SignIn & Home implementation
// ref: https://blog.shahednasser.com/react-context-tutorial-for-beginners/

// separate router
// ref: https://stackoverflow.com/questions/34607841/react-router-nav-bar-example
// ref: https://blog.webdevsimplified.com/2022-07/react-router/

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
              <Route path="/viewPostPage" element={<ViewPostPage />} /> {/*包含看自己貼文與別人貼文*/}
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
