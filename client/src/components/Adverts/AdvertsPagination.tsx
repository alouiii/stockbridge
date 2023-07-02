import React, { FC, useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Title } from '../Text/Title';
import { Stack } from 'react-bootstrap';
import { Filters } from './Filters';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Sort } from './Sort';
import { AdvertCard } from './AdvertCard';
import { BodyText } from '../Text/BodyText';
import { useSearchParams } from 'react-router-dom';
import { useAdverts } from '../../hooks/useAdverts';
import { FadeLoader } from 'react-spinners';
import { palette } from '../../utils/colors';
import { AdvertGrid } from './AdvertsGrid';

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
      <Title style={{ fontWeight: 500, marginTop: 80 }}>Active Adverts</Title>
      <Stack
        style={{
          display: 'flex',
          flexDirection: matches ? 'row' : 'column',
          marginBottom: '15px',
          marginTop: 100,
        }}
      >
        <Filters />
        <AdvertGrid adverts={adverts}/>
        <div style={{ position: 'absolute', left: 400 }}>
          {category ? (
            <BodyText style={{ fontSize: 25, fontWeight: 500 }}>
              {category}
            </BodyText>
          ) : undefined}
        </div>
        <div style={{ position: 'absolute', right: 20 }}>
          <Sort />
        </div>
      </Stack>
      <ReactPaginate
        previousLabel="previous"
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageCount={totalNumberOfPages}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
