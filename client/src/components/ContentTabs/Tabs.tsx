import React, { ReactElement, useState } from 'react';
import ContentTabTitle from './ContentTabTitle';
import { Button } from 'react-bootstrap';
//import styles from "./styles.css";
require('./tabStyles.scss');

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

      <div style={{ float: "right", marginTop: "-4em", marginRight: "4em", fontFamily: "poppins" }}>
        <input type="search" value={searchText} onChange={handleSearchChange} placeholder="Search..." 
        style={{padding: 6 , borderRadius: 8 , border: "solid #f86c6c", borderWidth: 0.05}}/>
        <text style={{color: "#f86c6c", fontWeight: "500", fontSize: "1.2em" }}> Sort by </text>
        <select onChange={handleSortChange} style={{padding: 6  , borderRadius: 8 , borderColor: "#f86c6c", color: "grey"}}>
          {isOffer ? offerValues.map((item, _) => (<option value={item}>{item}</option>)) : advertValues.map((item, _) => (<option value={item}>{item}</option>))}
        </select>
        <Button
          style={{ alignSelf: 'center',  background: 'none', border: "none", fontSize: "2em" }}
          onClick={handleToggleSortOrder}
        >
          <i className= { sortOrder ? "bi bi-sort-down-alt" : "bi bi-sort-up-alt"} 
          style={{
            color: "#f76c6c", 
           }}></i>
        </Button>
      </div>
      {children[selectedTab]}
    </div>
  );
};

export default Tabs;
