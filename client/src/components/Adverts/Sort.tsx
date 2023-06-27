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
        <Dropdown.Item href="#/action-1">Price increasing</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Price decreasing</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Date Creation increasing</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Date Cration decreasing</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
