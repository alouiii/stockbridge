import React, { FC, useState } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { palette } from '../../utils/colors';
import { BodyText } from '../Text/BodyText';
import Slider from '@mui/material/Slider';
import { ProductCategory } from '../../api/collections/advert';
//import { DatePicker } from '../DatePicker';
import { useSearchParams } from 'react-router-dom';

interface FilterAdvertsModalProps {
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
  filters: {
    category: {
      value: string;
      setValue: (newValue: string) => void;
    };
    rangePrice: {
      value: number[];
      setValue: (newValue: number[]) => void;
    };
    rangeQuantity: {
      value: number[];
      setValue: (newValue: number[]) => void;
    };
    date: {
      value: Date | undefined;
      setValue: (newValue: Date | undefined) => void;
    };
    rangePosition: {
      value: number[];
      setValue: (newValue: number[]) => void;
    };
  };
}

export const FilterAdvertsModal: FC<FilterAdvertsModalProps> = (props) => {
  const { filters } = props;

  const [category, setCategory] = useState<string>(filters.category.value);
  const [rangePrice, setRangePrice] = useState<number[]>(
    filters.rangePrice.value,
  );
  const [rangeQuantity, setRangeQuantity] = useState<number[]>(
    filters.rangeQuantity.value,
  );
  const [date, setDate] = useState<Date | undefined>(filters.date.value);
  const [rangePosition, setRangePosition] = useState<number[]>(
    filters.rangePosition.value,
  );

  const [search,setSearch] = useSearchParams()

  const handleClose = () => {
    //set previous state
    setCategory(filters.category.value);
    setRangePrice(filters.rangePrice.value);
    setRangeQuantity(filters.rangeQuantity.value);
    setDate(filters.date.value);
    setRangePosition(filters.rangePosition.value);
    props.setIsOpen(false);
  };

  const saveResults = () => {
    filters.category.setValue(category);
    filters.rangePrice.setValue(rangePrice);
    filters.rangeQuantity.setValue(rangeQuantity);
    filters.date.setValue(date);
    filters.rangePosition.setValue(rangePosition);
    props.setIsOpen(false);
  };

  const handleConfirm = () => {
    saveResults()
    if (category) {
      console.log(category)
      search.set('category[in]', category);
      setSearch(search);
    }

    if (rangePrice) {
      const minPrice = rangePrice[0];
      const maxPrice = rangePrice[1];
      search.set('price[gte]', minPrice.toString());
      search.set('price[lte]', maxPrice.toString());
      setSearch(search);
    }

    if (rangeQuantity) {
      const minQuantity = rangeQuantity[0];
      const maxQuantity = rangeQuantity[1];
      search.set('quantity[gte]', minQuantity.toString());
      search.set('quantity[lte]', maxQuantity.toString());
      setSearch(search);
    }

    if (date) {
      search.set('date', category);
      setSearch(search);
    }

    if (rangePosition) {
      search.set('range', (rangePosition[1] - rangePosition[0]).toString()); //to check
      setSearch(search);
    }
  };

  const handleReset = () => {
    //reset internal state
    setCategory('');
    setRangePrice([0, 1000]);
    setRangeQuantity([0, 1000]);
    setDate(undefined);
    setRangePosition([0, 1000]);
    //reset external state
    filters.category.setValue('');
    filters.rangePrice.setValue([0, 1000]);
    filters.rangeQuantity.setValue([0, 1000]);
    filters.date.setValue(undefined);
    filters.rangePosition.setValue([0, 1000]);
  };

  return (
    <Modal show={props.isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filters</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Dropdown style={{ marginTop: 30 }}>
          <Dropdown.Toggle
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'black',
              width: 200,
              fontFamily: 'Poppins',
            }}
            id="dropdown-basic"
            defaultValue={'Categories'}
          >
            {category || 'Categories'}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ maxHeight: 200, overflowY: 'scroll' }}>
            {Object.values(ProductCategory)
              .filter((key) => isNaN(Number(key)))
              .map((c, index) => (
                <Dropdown.Item key={index} onClick={() => setCategory(c)}>
                  {c}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
        <div style={{ width: 200, marginTop: 20 }}>
          <BodyText style={{ textAlign: 'center' }}>Price:</BodyText>
          <Slider
            style={{ color: 'black', marginTop: -20 }}
            size="small"
            value={rangePrice}
            onChange={(_, newRange) => setRangePrice(newRange as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
          />
        </div>
        <div style={{ width: 200 }}>
          <BodyText style={{ textAlign: 'center' }}>Quantity:</BodyText>
          <Slider
            style={{ color: 'black', marginTop: -20 }}
            size="small"
            value={rangeQuantity}
            onChange={(_, newRange) => setRangeQuantity(newRange as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
          />
        </div>
        {/*<div
          style={{
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          <DatePicker value={date} onDateChange={setDate} />
        </div>*/}
        <div style={{ width: 200 }}>
          <BodyText style={{ textAlign: 'center' }}>Range(km):</BodyText>
          <Slider
            style={{ color: 'black', marginTop: -20 }}
            size="small"
            value={rangePosition}
            onChange={(_, newRange) => setRangePosition(newRange as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            step={20}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
        <Button
          style={{
            backgroundColor: palette.subSectionsBgAccent,
            border: 'none',
          }}
          onClick={handleConfirm}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
