import React, { FC, useEffect, useMemo, useState } from 'react';
import { Title } from '../Text/Title';
import { Stack } from 'react-bootstrap';
import { Filters } from './Filters';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Sort } from './Sort';
import { useSearchParams } from 'react-router-dom';
import { useAdverts } from '../../hooks/useAdverts';
import { AdvertsGrid } from './AdvertsGrid';

export const AdvertsPagination: FC = () => {
  const [search, setSearch] = useSearchParams();

  const [category, setCategory] = useState<string>('');

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
    const cat = search.get('category');
    if (cat !== null && cat !== category) {
      setCategory(cat);
    } else {
      setCategory('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.get('category')]);

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [adverts]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    search.set('page', (selectedItem.selected + 1).toString());
    setSearch(search, { replace: true });
  };

  useEffect(() => {
    search.set("page","1")
    setSearch(search)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const matches = useMediaQuery('(min-width: 768px)');

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 25,
      }}
    >
      <Title style={{ fontWeight: 500, marginTop: 80 }}>
        {!category ? ' All Active Adverts' : category}
      </Title>
      <Stack
        style={{
          display: 'flex',
          flexDirection: matches ? 'row' : 'column',
          marginBottom: 15,
          marginTop: 100,
        }}
      >
        <Filters />
        <AdvertsGrid
          adverts={adverts}
          totalNumberOfPages={totalNumberOfPages}
          handlePageClick={handlePageClick}
        />
        <div style={{ position: 'absolute', right: 20 }}>
          <Sort />
        </div>
      </Stack>
    </div>
  );
};
