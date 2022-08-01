import React, {
  useState, useContext, createContext, useMemo, useLayoutEffect,
} from 'react';
import Cookies from 'js-cookie';
import { apiLogin, apiGetUser, apiRegister } from '../utils/api';

const UserStateContext = createContext();
const UserActionsContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({});

  const login = async (payload) => {
    try {
      apiLogin(payload)
        .then((res) => {
          setUser(res.data.user);
          Cookies.set('jsb-session-id', res.data.user._id, { expires: 0.1 });
        }).finally(() => window.location.assign('/'));
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    setUser({});
    Cookies.remove('jsb-session-id');
  };

  const register = (payload) => {
    try {
      apiRegister(payload).then((res) => setUser(res));
    } catch (error) {
      console.log(error);
    }
  };

  const userActions = useMemo(() => ({ login, logout, register }), []);

  useLayoutEffect(() => {
    const sessionId = Cookies.get('jsb-session-id');
    if (sessionId && !user._id) {
      try {
        apiGetUser(sessionId)
          .then((res) => setUser(res.data));
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <UserStateContext.Provider value={user}>
      <UserActionsContext.Provider value={userActions}>
        {children}
      </UserActionsContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const user = useContext(UserStateContext);

  if (!user) {
    throw new Error('Cannot use User State unless the component is wrapped in the UserProvider');
  }

  return user;
}

function useUserActions() {
  const userActions = useContext(UserActionsContext);

  if (!userActions) {
    throw new Error('Cannot use User Actions unless the component is wrapped in the UserProvider');
  }

  return userActions;
}

const useUser = () => [useUserState(), useUserActions()];

export {
  UserProvider, useUserState, useUserActions, useUser,
};
