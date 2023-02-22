import { React } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Account from './Account';
import Playlists from './Playlists';

import UserProvider from './provider';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/account' element={<Account />} />
          <Route path='/playlists' element={<Playlists />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App;