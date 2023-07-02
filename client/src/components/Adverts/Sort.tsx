import React, { FC, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { palette } from '../../utils/colors';
import { useSearchParams } from 'react-router-dom';

enum SortTypes {
  NONE = 'none',
  PRICE_ASC = 'price',
  PRICE_DESC = '-price',
  QUANTITY_ASC = 'quantity',
  QUANTITY_DESC = '-quantity',
  DATE_ASC = 'createdAt',
  DATE_DESC = '-createdAt',
}

export const Sort: FC = () => {
  const [sortingType, setSortingType] = useState<string>('none');
  const [search, setSearch] = useSearchParams();

  const handleClick = (type: SortTypes) => {
    setSortingType(type);

    if (type !== SortTypes.NONE) {
      search.set('sort', type);
      setSearch(search, { replace: true });
    } else {
      search.delete('sort');
      setSearch(search, { replace: true });
    }
  };

  const beautifyType = (type: string) => {
    if (type.includes('-')) {
      return type.replace('-', 'descending ');
    } else {
      if (type !== 'none') {
        return 'ascending ' + type;
      } else {
        return type;
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
