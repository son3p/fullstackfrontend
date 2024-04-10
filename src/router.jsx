import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Signup from './components/Signup.jsx'
import Signin from './components/Signin.jsx'
import Profile from './components/Profile.jsx'

// Note related
import Todos from './components/todo/Todos.jsx'
import TodoCreate from './components/todo/TodoCreate.jsx'
import TodoUpdate from './components/todo/TodoUpdate.jsx'
import TodoDelete from './components/todo/TodoDelete.jsx'

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
      path: "/todos",
      element: <Todos />,
    },
    {
      path: "/todos/create",
      element: <TodoCreate />,
    },
    {
      path: "/todos/:todoId/update",
      element: <TodoUpdate />,
    },
    {
      path: "/register",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Signin />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/todos/:todoId/delete",
      element: <TodoDelete />,
    },
  ]);

  export default router;