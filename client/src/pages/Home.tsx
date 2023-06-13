import { StepDescription } from '../components/Home/StepDescription';
import { Title } from '../components/Text/Title';
import { palette } from '../utils/colors';
import howWorks1 from '../assets/howWorks1.svg';
import howWorks2 from '../assets/howWorks2.svg';
import howWorks3 from '../assets/howWorks3.svg';
import { PostOrSearch } from '../components/Home/PostOrSearch';
import useMediaQuery from '../hooks/useMediaQuery';
import { Page } from '../components/Page';
import { Filters } from '../components/Home/Filters';
import { BodyText } from '../components/Text/BodyText';
import sortIcon from '../assets/sort-icon.svg';
import { ColoredLine } from '../components/ColoredLine';
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { ApiClient } from '../api/apiClient';
import { Button, Image } from 'react-bootstrap';
import { Advert, getAllAdverts } from '../api/collections/advert';
import { useNavigate } from 'react-router-dom';

const stepDescriptions: { message: string; icon: string }[] = [
  {
    message: 'Search for what you are looking for.',
    icon: howWorks1,
  },
  {
    message: 'Find the item you are looking for in the search results.',
    icon: howWorks2,
  },
  {
    message: 'Make an offer to the seller.',
    icon: howWorks3,
  },
];

export function Home() {
  const matches = useMediaQuery('(min-width: 768px)');

  const { setLoggedIn, setUser } = useContext(LoginContext);
  const [adverts, setAdverts] = useState([] as Advert[]);
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
        const fetchedAdverts = await getAllAdverts();
        setAdverts(fetchedAdverts);
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
  const navigate = useNavigate()
  return (
    <Page>
      <PostOrSearch />
      <div
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: palette.subSectionsBgLighter,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 70,
          paddingBottom: 50,
        }}
      >
        <Title
          style={{
            textAlign: 'center',
            fontSize: 28,
            color: 'black',
            fontWeight: 500,
            paddingTop: 50,
            marginBottom: -60,
          }}
        >
          HOW IT WORKS
        </Title>
        <ColoredLine
          color={palette.subSectionsBgAccent}
          height={5}
          width={60}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: matches ? 'row' : 'column',
            gap: matches ? 70 : 20,
          }}
        >
          {stepDescriptions.map((step, index) => {
            return (
              <StepDescription
                key={index}
                number={index + 1}
                message={step.message}
                icon={step.icon}
              />
            );
          })}
        </div>
      </div>
      <div style={{ height: 2000 }}>
        <Title style={{ fontSize: 36, textAlign: 'center', paddingTop: 20 }}>
          Active Adverts
        </Title>
        <div
          style={{ marginTop: 100, display: 'flex', flexDirection: 'column'}}
        >
          <div style={{
            display: "flex", 
            flexDirection: "column",
            gap: "50px",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: "center",
              marginBottom: "15px"
            }}
          >
            <div style={{
              display: "flex",
              flexDirection: "row"
            }}>
              
              <div style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
              position: 'absolute',
              left: '60%',
              transform: 'translate(-60%)',
              
            }}>
                <BodyText
                  style={{
                    color: palette.subSectionsBgAccent,
                    fontSize: 30,
                    fontWeight: 600,
                  }}
                >
                  Selling
                </BodyText>
                <BodyText
                  style={{ color: palette.subSectionsBgLighter, fontSize: 30 }}
                >
                  Buying
                </BodyText>
              </div>
              <Image
              style={{
                position: "absolute", right: 15
              }}
                src={sortIcon}
              />
            </div>
            <div>
          </div>
          </div>
          <div>
            {
              adverts.map((a, i) => <Button onClick={() => navigate(`/productoverview/${a._id}`)}>{a.productname}</Button> )
            }
          </div>
         
          </div>
         
          <Filters />
          
        </div>
      </div>
    </Page>
  );
}
