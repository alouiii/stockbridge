import { FC, useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { Advert, getAllAdverts } from '../../api/collections/advert';
import { Title } from '../Text/Title';
import { Filters } from './Filters';
import Tabs from '../ContentTabs/Tabs';
import ContentTab from '../ContentTabs/ContentTab';
import { AdvertsTabContent } from './AdvertsTabContent';
const AdvertsSection: FC = () => {
  const [adverts, setAdverts] = useState([] as Advert[]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedAdverts = await getAllAdverts();
      setAdverts(fetchedAdverts);
    };
    fetchData();
  }, []);
  const [activeTab, setActiveTab] = useState<string | null>('selling');

  const handleTabSelect = (selectedTab: string | null) => {
    setActiveTab(selectedTab);
  };

  return (
    <div
      style={{
        marginTop: '100px',
        marginBottom: '100px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Title style={{ fontSize: 36, textAlign: 'center', paddingTop: 20 }}>
        Active Adverts
      </Title>
      <Stack
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '15px',
          marginTop: '30px',
        }}
      >
        <Filters />
        <div
          style={{
            width: '100%',
          }}
        >
          {/* <Tab.Container
            activeKey={activeTab != null ? activeTab : 'selling'}
            onSelect={handleTabSelect}
          >
            <Nav
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 20,
                position: 'absolute',
                left: '60%',
                transform: 'translate(-60%)',
              }}
              variant="tabs"
            >
              <NavItem>
                <Nav.Link
                  style={{
                    color: palette.subSectionsBgAccent,
                    fontSize: 30,
                    fontWeight: 600,
                  }}
                  eventKey="selling"
                >
                  Selling
                </Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link
                  style={{
                    color: palette.subSectionsBgLighter,
                    fontSize: 30,
                  }}
                  eventKey="buying"
                >
                  Buying
                </Nav.Link>
              </NavItem>
            </Nav>
            <Button
              style={{
                position: 'absolute',
                right: '2%',
                backgroundColor: 'transparent',
                borderColor: 'transparent',
              }}
            >
              <Image
                style={{
                  position: 'absolute',
                  right: 15,
                }}
                src={sortIcon}
              />
            </Button>
            <Tab.Content
              style={{
                marginTop: '200px',
                marginLeft: '100px',
              }}
            >
              <Tab.Pane eventKey="selling">
                <AdvertsTabContent
                  adverts={adverts.filter((a) => a.type === 'Sell')}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="buying">
                <AdvertsTabContent
                  adverts={adverts.filter((a) => a.type === 'Ask')}
                />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container> */}
          <div
            style={{
              marginLeft: '5%',
            }}
          >
            <Tabs>
              <ContentTab title="Selling">
                <AdvertsTabContent
                  adverts={adverts.filter((a) => a.type === 'Sell')}
                />
              </ContentTab>
              <ContentTab title="Buying">
                <AdvertsTabContent
                  adverts={adverts.filter((a) => a.type === 'Ask')}
                />
              </ContentTab>
            </Tabs>
          </div>
        </div>
      </Stack>
    </div>
  );
};

export { AdvertsSection };
