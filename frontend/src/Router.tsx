import { useRoutes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Organization from './pages/Organization';
import ESGSetup from './pages/EsgSetup';
const AppRouter = () => {
  return useRoutes([
    { path: '/', element: <Dashboard /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/login', element: <Login /> },
    { path: '/data', element: <ESGSetup /> },
    { path: '/organization', element: <Organization /> },
    // { path: '/blockchain/:areaIdx?/:boardSerial?', element: <Blockchain /> },
  ]);
};

export default AppRouter;
