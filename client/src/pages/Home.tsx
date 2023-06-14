import { PostOrSearch } from '../components/Home/PostOrSearch';

import { Page } from '../components/Page';

import { useContext, useEffect } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { ApiClient } from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import { AdvertsSection } from '../components/Home/AdvertsSection';
import { Instructions } from '../components/Home/Instructions';

export function Home() {
  const { setLoggedIn, setUser } = useContext(LoginContext);

  useEffect(() => {
    new ApiClient()
      .get('auth/verify', { withCredentials: true })
      .then(async () => {
        const currentLoginStatus = localStorage.getItem('loginStatus');
        const currentUser = localStorage.getItem('currentUser');
        if (currentLoginStatus && currentUser) {
          setLoggedIn(true);
          setUser(JSON.parse(currentUser));
        }
      })
      .catch((error) => {
        setLoggedIn(false);
        setUser(undefined);
      });

    /*
    const currentLoginStatus = localStorage.getItem("loginStatus");
    const currentUser = localStorage.getItem("currentUser");
    if (currentLoginStatus && currentUser) {
      setLoggedIn(true);
      setUser(JSON.parse(currentUser));
    }*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();
  return (
    <Page>
      <div
        style={{
          marginBottom: '100px',
        }}
      >
        <PostOrSearch />
        <Instructions />
        <AdvertsSection />
      </div>
    </Page>
  );
}
