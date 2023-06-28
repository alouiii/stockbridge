import { ChangeEvent, FC, useState } from 'react';
import { Title } from '../Text/Title';
import { palette } from '../../utils/colors';
import { Button, Dropdown, Form, Image } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import { BodyText } from '../Text/BodyText';
import useMediaQuery from '../../hooks/useMediaQuery';
import { ProductCategory } from '../../api/collections/advert';
import { ColoredLine } from '../ColoredLine';
import { DatePicker } from '../DatePicker';
import filtersIcon from '../../assets/filters.svg';
import { FilterAdvertsModal } from './FilterAdvertsModal';
import { ChildAdvertsPagination } from './AdvertsPagination';
import { useLocation } from 'react-router-dom';

/**
 * This components represents the filters section in the home page.
 */
export const Filters: FC<ChildAdvertsPagination> = (props) => {
  const [category, setCategory] = useState<string>('');
  const [rangePrice, setRangePrice] = useState<number[]>([0, 1000]);
  const [rangeQuantity, setRangeQuantity] = useState<number[]>([0, 1000]);
  const [date, setDate] = useState<Date>();
  const [postalCode, setPostalCode] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const matches = useMediaQuery('(min-width: 768px)');

  const handleReset = () => {
    setCategory('');
    setRangePrice([0, 1000]);
    setRangeQuantity([0, 1000]);
    setDate(undefined);
    setPostalCode('');
  };

  const location = useLocation();

  const handleConfirm = () => {
    const params = new URLSearchParams(location.search);

    if (category) {
      params.set('category', category);
    }

    if (rangePrice) {
      //params.set('price', rangePrice); TODO
    }

    if (rangeQuantity) {
      //params.set('quantity', rangeQuantity); TODO
    }

    if (date) {
      params.set('date', date.toString());
    }

    if (postalCode) {
      params.set('postalCode', postalCode);
    }

    props.onUrlParamsChange(params);
  };

  const handleCategoryClick = (category: string) => {
    setCategory(category);
  };

  const handleButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (!matches) {
    // if the screen is small
    return (
      <div style={{ marginTop: -10, marginLeft: 10 }}>
        <Button
          style={{ border: 'none', backgroundColor: 'white' }}
          onClick={handleButtonClick}
        >
          <Image src={filtersIcon} alt="filters" width={50} height={50} />
        </Button>
        <FilterAdvertsModal
          isOpen={isModalOpen}
          setIsOpen={(status) => setIsModalOpen(status)}
          filters={{
            category: {
              value: category,
              setValue: setCategory,
            },
            rangePrice: {
              value: rangePrice,
              setValue: setRangePrice,
            },
            rangeQuantity: {
              value: rangeQuantity,
              setValue: setRangeQuantity,
            },
            date: {
              value: date,
              setValue: setDate,
            },
            postalCode: {
              value: postalCode,
              setValue: setPostalCode,
            },
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        left: 0,
        padding: '50px',
        borderRadius: 15,
        backgroundColor: palette.subSectionsBgLighter,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Title style={{ textAlign: 'center', fontSize: 30, marginTop: 30 }}>
        Filters
      </Title>
      <ColoredLine height={2} width={100} color="black" />
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
              <Dropdown.Item key={index} onClick={() => handleCategoryClick(c)}>
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
      <div
        style={{
          marginTop: 20,
          textAlign: 'center',
        }}
      >
        <DatePicker value={date} onDateChange={setDate} />
      </div>
      <div style={{ width: 100, margin: '0 auto', marginTop: 10 }}>
        <div className="row">
          <div>
            <Form.Group>
              <BodyText style={{ textAlign: 'center', marginBottom: 10 }}>
                Postal Code:
              </BodyText>
              <Form.Control
                style={{ border: 'none', textAlign: 'center' }}
                type="text"
                placeholder="XXXXX"
                value={postalCode ?? ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPostalCode(e.target.value)
                }
              />
            </Form.Group>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center' }}>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
        <Button
          onClick={handleConfirm}
          style={{
            marginLeft: 10,
            backgroundColor: palette.subSectionsBgAccent,
            border: 'none',
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};