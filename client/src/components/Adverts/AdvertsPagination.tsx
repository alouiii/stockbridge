import React, { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Title } from '../Text/Title';
import { Stack } from 'react-bootstrap';
import { Filters } from './Filters';
import useMediaQuery from '../../hooks/useMediaQuery';

interface ItemToStore {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const AdvertsPagination: FC = () => {
  const [items, setItems] = useState<ItemToStore[]>([]);

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

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 25,
      }}
    >
      <Title style={{ fontWeight: 500, marginTop: 100 }}>Active Adverts</Title>
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
          style={{ marginLeft: 10, marginRight: 8, marginTop: 50 }}
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
