
// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import './App.css';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import { lazy, Suspense } from 'react';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import ProtectedRoute from './components/Auth/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const Favorites = lazy(() => import('./pages/Favorites'));

function App() {
  return (
    <>
      <Router>
        <CssBaseline />
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
