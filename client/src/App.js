import './App.css';
import {Route, Routes, Link} from "react-router-dom"
import Home from "./views/Home"
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import CreatePost from './views/CreatePost';
import ViewPost from './views/ViewPost';
import '../src/App.css'
import UserPosts from './views/UserPosts';

function App() {
  return (
    <div>
      <nav class="navbar">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">Accessible Cities</span>
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <Link to="/" class="nav-link active" aria-current="page" style={{color: 'white'}}>Home</Link>
            </li>
            <li class="nav-item">
              <Link to="/dashboard" class="nav-link active" aria-current="page" style={{color: 'white'}}>View All Posts</Link>
            </li>
            <li class="nav-item">
              <Link to="/post/new" class="nav-link active" aria-current="page" style={{color: 'white'}}>Create a Post</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/post/new" element={<CreatePost/>}/>
          <Route path="/post/view/:id" element={<ViewPost/>}/>
          <Route path="/post/user/posts" element={<UserPosts/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
