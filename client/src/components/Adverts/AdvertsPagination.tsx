import React, { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Title } from '../Text/Title';
import { Stack } from 'react-bootstrap';
import { Filters } from './Filters';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Sort } from './Sort';
import {
  PopulatedAdvert,
  ProductCategory,
  getAllAdverts,
} from '../../api/collections/advert';
import { AdvertCard } from './AdvertCard';
import { BodyText } from '../Text/BodyText';

export interface ChildAdvertsPagination {
  onUrlParamsChange: (newUrlParams: React.SetStateAction<{}>) => void;
}

export const AdvertsPagination: FC = () => {
  const [adverts, setAdverts] = useState<PopulatedAdvert[]>([]);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState<number>(1);
  const [urlParams, setUrlParams] = useState({});
  const [category, setCategory] = useState<ProductCategory>();

  const getAdverts = async (params: any) => {
    getAllAdverts(params)
      .then((res) => {
        if (res.results && res.totalNumberOfPages) {
          console.log(res.results);
          setAdverts(res.results);
          setTotalNumberOfPages(res.totalNumberOfPages);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAdverts({ page: 1 }); //page 1
  }, []);

  const handlePageClick = (selectedItem: { selected: number }) => {
    getAdverts({ page: selectedItem.selected + 1 });
    window.scrollTo({ top: 0 });
  };

  const matches = useMediaQuery('(min-width: 768px)');

  const handleUrlParamsChange = (newUrlParams: React.SetStateAction<{}>) => {
    setUrlParams(newUrlParams);
  };

  useEffect(() => {
    console.log(new URLSearchParams(urlParams).toString());
    getAdverts(urlParams);
  }, [urlParams]);

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
        <Filters onUrlParamsChange={handleUrlParamsChange} />
        <div
          className="row"
          style={{ marginLeft: 10, marginRight: 8, marginTop: 125 }}
        >
          {adverts.map((item, index) => (
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
          ))}
        </div>
        <div style={{ position: 'absolute', left: 400 }}>
          {category ? (
            <BodyText style={{ fontSize: 25, fontWeight: 500 }}>
              {category}
            </BodyText>
          ) : undefined}
        </div>
        <div style={{ position: 'absolute', right: 20 }}>
          <Sort onUrlParamsChange={handleUrlParamsChange} />
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
      />
    </div>
  );
};
