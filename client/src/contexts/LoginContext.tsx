import { createContext, useEffect, useState } from 'react';
import { User, verify } from '../api/collections/user';

export type LoginState = {
  loggedIn: boolean;
  user: User | undefined;
  setLoggedIn: (status: boolean) => void;
  setUser: (user: User | undefined) => void;
  isLoading: boolean;
};

export type LoginContextProviderType = {
  children: React.ReactNode;
};

//create the context with its "features"
export const LoginContext = createContext<LoginState>({
  loggedIn: false,
  user: undefined,
  setLoggedIn: () => null,
  setUser: () => null,
  isLoading: false,
});

//create the context provider
export const LoginContextProvider = ({
  children,
}: LoginContextProviderType) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      await verify()
        .then((response) => {
          setUser(response); //the response of is a user
          setIsLoading(false);
          if (response.registrationCompleted) {
            setLoggedIn(true);
          }
        })
        .catch(() => {
          setLoggedIn(false);
          setIsLoading(false);
          setUser(undefined);
        });
    };
    setIsLoading(true);
    checkAuthentication();
  }, []);

  return (
    <LoginContext.Provider
      value={{
        loggedIn,
        user,
        setLoggedIn: (status: boolean) => setLoggedIn(status),
        setUser: (user: User | undefined) => setUser(user),
        isLoading,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
