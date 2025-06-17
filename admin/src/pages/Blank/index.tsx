import { useNavigate } from 'react-router-dom';
import useAdminUserStore from '../../store/user/user.ts';
import { useEffect } from 'react';

const Blank = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAdminUserStore();

  useEffect(() => {
    if (isLoggedIn === false) {
      logout();
      navigate('/login');
    } else {
      navigate('/board');
    }
  }, [isLoggedIn]);
  return <></>;
};

export default Blank;
