import React, { FC, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { palette } from '../../utils/colors';

enum SortTypes {
  NONE = 'None',
  PRICE_ASC = 'Price Ascending',
  PRICE_DESC = 'Price Descending',
  QUANTITY_ASC = 'Quantity Ascending',
  QUANTITY_DESC = 'Quantity Descending',
  DATE_ASC = 'Creation Date Ascending',
  DATE_DESC = 'Creation Date Descending',
}

export const Sort: FC = () => {
  const [sortingType, setSortingType] = useState<string>('None');

  const handleClick = (type: SortTypes) => {
    //set new state and make call to api
    setSortingType(type);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        style={{ backgroundColor: palette.subSectionsBgAccent, border: 'none' }}
        id="dropdown-basic"
      >
        Sort By: {sortingType}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.values(SortTypes)
          .map((value) => value)
          .map((type) => {
            return (
              <Dropdown.Item onClick={() => handleClick(type)}>
                {type}
              </Dropdown.Item>
            );
          })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
