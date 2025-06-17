import { useRoutes } from 'react-router-dom';
import Login from './pages/Login';
import Board from './pages/Board';
import Blank from './pages/Blank';
const AppRouter = () => {
  return useRoutes([
    { path: '/', element: <Blank /> },
    { path: '/board', element: <Board /> },
    { path: '/login', element: <Login /> },
    // { path: '/blockchain/:areaIdx?/:boardSerial?', element: <Blockchain /> },
  ]);
};

export default AppRouter;
