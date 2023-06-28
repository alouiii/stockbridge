import React, { FC } from 'react';
import { Dropdown } from 'react-bootstrap';
import { palette } from '../../utils/colors';

export const Sort: FC = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle style={{backgroundColor: palette.subSectionsBgAccent, border: "none"}} id="dropdown-basic">
        Sort By: 
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Price Ascending</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Price Descending</Dropdown.Item>
        <Dropdown.Item href="#/action-1">Quantity Ascending</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Quantity Descending</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Date Ascending</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Date Descending</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
