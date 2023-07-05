import React, { FC, useEffect, useMemo, useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import { Filters } from './Filters';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Sort } from './Sort';
import { useSearchParams } from 'react-router-dom';
import { useAdverts } from '../../hooks/useAdverts';
import { AdvertsGrid } from './AdvertsGrid';
import { CustomMap } from '../Map/CustomMap';
import { palette } from '../../utils/colors';
import { Page } from '../Page';

export const AdvertsPagination: FC = () => {
  const [search, setSearch] = useSearchParams();

  const [category, setCategory] = useState<string>('');

  const [mapMode, setMapMode] = useState<boolean>(false);

  const getAdverts = useAdverts();

  const adverts = useMemo(() => {
    //UseMemo used to memorize the result of a function (similar to useState)
    return getAdverts.data?.results;
  }, [getAdverts.data]);

  const totalNumberOfPages = useMemo(() => {
    //UseMemo used to memorize the result of a function (similar to useState)
    return getAdverts.data?.totalNumberOfPages ?? 1;
  }, [getAdverts.data]);

  useEffect(() => {
    const cat = search.get('category[in]');
    if (cat !== null && cat !== category) {
      setCategory(cat);
    } else {
      setCategory('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.get('category[in]')]);

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [adverts]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    search.set('page', (selectedItem.selected + 1).toString());
    setSearch(search, { replace: true });
  };

  const handleMapClick = () => {
    setMapMode(true);
  };

  useEffect(() => {
    search.set('page', '1');
    setSearch(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const matches = useMediaQuery('(min-width: 768px)');

  if (mapMode) {
    return (
      <CustomMap adverts={adverts} onChangeModality={() => setMapMode(false)} />
    );
  }

  //I am using component <Page> here because I want to display the map full screen.
  return (
    <Page>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          marginBottom: 25,
        }}
      >
        <Stack
          style={{
            display: 'flex',
            flexDirection: matches ? 'row' : 'column',
            marginBottom: 15,
            marginTop: 200,
          }}
        >
          <Filters />
          <AdvertsGrid
            adverts={adverts}
            currentCategory={category}
            totalNumberOfPages={totalNumberOfPages}
            handlePageClick={handlePageClick}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              position: 'absolute',
              gap: 30,
              right: 20,
            }}
          >
            <Button
              style={{
                backgroundColor: palette.subSectionsBgAccent,
                border: 'none',
                zIndex: 1000
              }}
              onClick={handleMapClick}
            >
              View on Map
            </Button>
            <Sort />
          </div>
        </Stack>
      </div>
    </Page>
  );
};
