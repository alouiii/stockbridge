import React, { ReactElement, useState } from 'react';
import ContentTabTitle from './ContentTabTitle';
import { Button, Form } from 'react-bootstrap';
import { PopulatedAdvert } from '../../api/collections/advert';
import { PopulatedOffer } from '../../api/collections/offer';
//import styles from "./styles.css";

type Props = {
  children: ReactElement[];
  isOffer: boolean;
  searchText: string,
  setSearchText: (text: string) => void,
  sortCriteria: AdvertSortCriteria | OfferSortCriteria,
  setSortCriteria: (criteria : AdvertSortCriteria | OfferSortCriteria) => void,
  sortOrder: boolean,
  setSortOrder: (sortOrder:boolean ) => void,
};

export enum AdvertSortCriteria {
  NONE = "Default",
  NAME = "Name",
  Quantity = "Quantity",
  DATE = "Date",
  PRICE = "Price"
}

export enum ExtraCriteria  {
  STATUS = "Status",
  STORE = "Store"
}

export type OfferSortCriteria = AdvertSortCriteria | ExtraCriteria;

const Tabs: React.FC<Props> = ({ children, isOffer, searchText, setSearchText, sortCriteria, setSortCriteria, sortOrder, setSortOrder }) => {


  const advertValues = Object.values(AdvertSortCriteria);
  const offerValues = [ ...Object.values(AdvertSortCriteria), ...Object.values(ExtraCriteria)]

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value as AdvertSortCriteria | OfferSortCriteria);
  };

  const handleToggleSortOrder = () => {
    setSortOrder(!sortOrder);
  };

  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div>
      <ul
        style={{
          listStyleType: 'none',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
        }}
      >
        {children.map((item, index) => (
          <ContentTabTitle
            key={index}
            title={item.props.title}
            index={index}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </ul>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
      ></link>
      <div style={{ float: "right", marginTop: "-3em", marginRight: "4em" }}>
        <input type="search" value={searchText} onChange={handleSearchChange} placeholder="Search..." />

        <text> Sort by </text>
        <select onChange={handleSortChange}>
          {isOffer ? offerValues.map((item, _) => (<option value={item}>{item}</option>)) : advertValues.map((item, _) => (<option value={item}>{item}</option>))}
        </select>
        <Button
          style={{ alignSelf: 'center', marginTop: '-6px' }}
          onClick={handleToggleSortOrder}
        >
          <i className= { sortOrder ? "bi bi-sort-down-alt" : "bi bi-sort-up-alt"}></i>
        </Button>
      </div>
      {children[selectedTab]}
    </div>
  );
};

export default Tabs;
