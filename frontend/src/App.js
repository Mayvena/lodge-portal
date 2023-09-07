import Register from './components/register_form';
import Login from './components/login_form';
import Home from './pages/home';
import Layout from './pages/layout';
import LibraryPage from './pages/library';
import Editor from './pages/editor';
import Admin from './pages/admin';
import Missing from './pages/missing';
import Unauthorized from './pages/unauthorized';
import Lounge from './pages/lounge';
import LinkPage from './pages/linkpage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/** Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/** Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="editor" element={<Editor />} />
          <Route path="admin" element={<Admin />} />
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/** Catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;