import React, { FC } from 'react';
import { PopulatedAdvert } from '../../api/collections/advert';
import { BodyText } from '../Text/BodyText';
import { FadeLoader } from 'react-spinners';
import { palette } from '../../utils/colors';
import { AdvertCard } from './AdvertCard';
import ReactPaginate from 'react-paginate';
import { Title } from '../Text/Title';

interface AdvertGridProps {
  adverts: PopulatedAdvert[] | undefined;
  currentCategory: string;
  totalNumberOfPages: number;
  handlePageClick: (selectedItem: { selected: number }) => void;
}

export const AdvertsGrid: FC<AdvertGridProps> = (props) => {
  return (
    <div
      className="row"
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 100,
        flexWrap: 'wrap',
        gap: 50,
      }}
    >
      <Title style={{ fontWeight: 500, textAlign: 'center', marginTop: -250 }}>
        {!props.currentCategory ? 'All Active Adverts' : props.currentCategory}
      </Title>
      {props.adverts ? (
        props.adverts.length > 0 ? (
          props.adverts.map((item, index) => (
            <div
              className="col-md-4 mb-4"
              key={item._id}
              style={{
                flex: '1 0 300px',
                maxWidth: '300px',
                marginRight: '20px',
                marginBottom: '20px',
              }}
            >
              <AdvertCard
                key={index}
                id={item._id}
                name={item.productname}
                price={item.price}
                quantity={item.quantity}
                icon={item.imageurl}
                description={item.description}
                prioritized={item.prioritized}
                creationDate={item.createdAt}
              />
            </div>
          ))
        ) : (
          <BodyText style={{ color: 'red', fontSize: 30, textAlign: 'center' }}>
            No data found
          </BodyText>
        )
      ) : (
        <FadeLoader color={palette.subSectionsBgAccent} />
      )}
      <ReactPaginate
        previousLabel="<"
        breakLabel="..."
        nextLabel=">"
        onPageChange={props.handlePageClick}
        pageCount={props.totalNumberOfPages}
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
