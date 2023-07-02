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

export const AdvertsPagination: FC = () => {
  const [search, setSearch] = useSearchParams();

  const [category, setCategory] = useState<string>('');

  const getAdverts = useAdverts();

  const adverts = useMemo(() => {
    return getAdverts.data?.results;
  }, [getAdverts.data]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const cat = search.get('category');
    if (cat !== null && cat !== category) {
      setCategory(cat);
    } else {
      setCategory('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.get('category')]);

  const totalNumberOfPages = useMemo(() => {
    return getAdverts.data?.totalNumberOfPages ?? 1;
  }, [getAdverts.data]);

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
        <div
          className="row"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 125,
            paddingLeft: 55,
          }}
        >
          {adverts ? (
            adverts.length > 0 ? (
              adverts.map((item, index) => (
                <div className="col-md-4 mb-4" key={item._id}>
                  <AdvertCard
                    key={index}
                    id={item._id}
                    name={item.productname}
                    price={item.price}
                    quantity={item.quantity}
                    icon={item.imageurl}
                    description={item.description}
                    prioritized={item.prioritized}
                  />
                </div>
              ))
            ) : (
              <BodyText style={{ color: 'red', fontSize: 25 }}>
                No data found
              </BodyText>
            )
          ) : (
            <FadeLoader color={palette.subSectionsBgAccent} />
          )}
        </div>

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
