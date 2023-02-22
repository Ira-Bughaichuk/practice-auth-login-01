import { AuthForm } from './components/AuthForm/AuthForm';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { refreshThunk } from 'redux/users-thunk';
import { selectToken } from 'redux/users-selector';
import { logoutThunk } from './redux/users-thunk';

export const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return token ? (
    <button
      type="button"
      onClick={() => {
        dispatch(logoutThunk());
      }}
    >
      Logout
    </button>
  ) : (
    <AuthForm />
  );
};
