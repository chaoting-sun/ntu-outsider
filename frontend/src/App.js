import './css/App.css';

import { React } from 'react'
import { OutsiderProvider } from './containers/hooks/useOusider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './containers/mainPage';
import SignInPage from './containers/signInPage';
import ApplyPostPage from './containers/applyPostPage';
import FollowedPostPage from './containers/followedPostPage';
import SavedPostPage from './containers/savedPostPage';
import MyPostPage  from './containers/myPostPage';
import Navbar from './components/navigationBar'
// import 'antd/dist/antd.variable.min.css';

// SignIn & Home implementation
// ref: https://blog.shahednasser.com/react-context-tutorial-for-beginners/

// separate router
// ref: https://stackoverflow.com/questions/34607841/react-router-nav-bar-example
// ref: https://blog.webdevsimplified.com/2022-07/react-router/

function App() {
  return (
    <OutsiderProvider>
      <Router>
        <Routes>
          <Route path="/logIn" element={<SignInPage />}/>
          <Route path='/' element={<Navbar />}>
            <Route index element={<MainPage />} />
            <Route path="/savedPostPage" element={<SavedPostPage />} />
            <Route path="/followedPostPage" element={<FollowedPostPage />} />
            <Route path="/applyPostPage" element={<ApplyPostPage />} />
            <Route path="/myPostPage" element={<MyPostPage />} />
          </Route>
        </Routes>
      </Router>
    </OutsiderProvider>
  )
}

export default App;
