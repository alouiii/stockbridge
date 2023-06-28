import React, { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Title } from '../Text/Title';
import { Stack } from 'react-bootstrap';
import { Filters } from './Filters';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Sort } from './Sort';

interface ItemToStore {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface ChildAdvertsPagination {
  onUrlParamsChange : (newUrlParams : React.SetStateAction<{}>) => void 
}

export const AdvertsPagination: FC = () => {
  const [items, setItems] = useState<ItemToStore[]>([]);
  const [urlParams, setUrlParams] = useState({});

  const getComments = async (page: number) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${page}&limit=25`,
    );
    const data: ItemToStore[] = await res.json();
    setItems(data);
  };

  useEffect(() => {
    getComments(1);
  }, []);

  const handlePageClick = (selectedItem: { selected: number }) => {
    getComments(selectedItem.selected + 1);
    window.scrollTo({ top: 0 });
  };

  const matches = useMediaQuery('(min-width: 768px)');

  const handleUrlParamsChange = (newUrlParams: React.SetStateAction<{}>) => {
    setUrlParams(newUrlParams);
  };

  useEffect(() => {
    const url = `/adverts?${new URLSearchParams(urlParams).toString()}`;
    console.log('Complete URL:', url);
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
        <Filters onUrlParamsChange={handleUrlParamsChange}/>
        <div
          className="row"
          style={{ marginLeft: 10, marginRight: 8, marginTop: 125 }}
        >
          {items.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Post ID: {item.postId}
                  </h6>
                  <p className="card-text">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{position: "absolute",right: 20}}>
          <Sort onUrlParamsChange={handleUrlParamsChange}/>
        </div>
      </Stack>

      <ReactPaginate
        previousLabel="previous"
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageCount={500 / 25}
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