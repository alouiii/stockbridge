import React, { FC, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { palette } from '../../utils/colors';
import { useLocation } from 'react-router-dom';
import { ChildAdvertsPagination } from './AdvertsPagination';

enum SortTypes {
  NONE = 'none',
  PRICE_ASC = 'price',
  PRICE_DESC = '-price',
  QUANTITY_ASC = 'quantity',
  QUANTITY_DESC = '-quantity',
  DATE_ASC = 'creation_date', //check
  DATE_DESC = '-creation_date', //check
}

export const Sort: FC<ChildAdvertsPagination> = (props) => {
  const [sortingType, setSortingType] = useState<string>('none');

  const location = useLocation();

  const handleClick = (type: SortTypes) => {
    setSortingType(type);

    if (type !== SortTypes.NONE) {
      const param = new URLSearchParams(location.search);
      param.set('sort', type);
      props.onUrlParamsChange(param)
    }
  };

  const beautifyType = (type: string) => {
    if(type.includes("-")){
      return type.replace("-", "descending ")
    }
    else{
      if(type !== "none"){
        return "ascending " + type
      }
      else{
        return type
      }
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        style={{ backgroundColor: palette.subSectionsBgAccent, border: 'none' }}
        id="dropdown-basic"
      >
        Sort By: {beautifyType(sortingType)}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.values(SortTypes)
          .map((value) => value)
          .map((type, index) => {
            return (
              <Dropdown.Item key={index} onClick={() => handleClick(type)}>
                {beautifyType(type)}
              </Dropdown.Item>
            );
          })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
