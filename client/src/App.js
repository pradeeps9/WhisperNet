import './App.css';
import Blogs from './Blogs';
import {Route, Routes} from 'react-router-dom';
import Layout from './Layout';
import Login from './Login';
import Register from './Register';
import { UserContextProvider } from './UserContext';
import CreatePost from './CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import { useEffect } from 'react';

function App() {

  useEffect(()=>{
    document.title = 'WhisperNet | Bloging';
  }, []);
  
  return (

    <UserContextProvider>
      <Routes>
        <Route path={'/'} element={<Layout/>}>
          <Route index element={<Blogs />} />
          <Route path={'/login'} element={<Login/>} />
          <Route path={'/register'} element={<Register/>} />
          <Route path={'/create'} element={<CreatePost/>} />
          <Route path={'/post/:id'} element={<PostPage/>} />
          <Route path={'/edit/:id'} element={<EditPost/>} />
        </Route>

      </Routes>
    </UserContextProvider>

    
  );
}

export default App;
