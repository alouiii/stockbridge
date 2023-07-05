import { FC, useEffect, useState } from 'react';
import { Title } from '../Text/Title';
import { palette } from '../../utils/colors';
import { Button, Dropdown, Image } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import { BodyText } from '../Text/BodyText';
import useMediaQuery from '../../hooks/useMediaQuery';
import { ProductCategory } from '../../api/collections/advert';
import { ColoredLine } from '../ColoredLine';
//import { DatePicker } from '../DatePicker';
import filtersIcon from '../../assets/filters.svg';
import { FilterAdvertsModal } from './FilterAdvertsModal';
import { useSearchParams } from 'react-router-dom';

/**
 * This components represents the filters section in the home page.
 */
export const Filters: FC = () => {
  const [search, setSearch] = useSearchParams();
  const [category, setCategory] = useState<string>('');
  const [rangePrice, setRangePrice] = useState<number[]>([0, 1000]);
  const [rangeQuantity, setRangeQuantity] = useState<number[]>([0, 1000]);
  const [date, setDate] = useState<Date>();
  const [rangePosition, setRangePosition] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const matches = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    const cat = search.get('category[in]');
    if (cat !== null) {
      setCategory(cat);
    } else {
      setCategory('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.get('category[in]')]);

  const handleReset = () => {
    setCategory('');
    setRangePrice([0, 1000]);
    setRangeQuantity([0, 1000]);
    setDate(undefined);
    setRangePosition(0);
    search.delete('category[in]');
    search.delete('price[gte]');
    search.delete('quantity[gte]');
    search.delete('price[lte]');
    search.delete('quantity[lte]');
    search.delete('radius');
    setSearch(search, { replace: true });
  };

  const handleConfirm = () => {
    if (category) {
      console.log(category);
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
      search.set('radius', rangePosition.toString());
      setSearch(search);
    }
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
      <div style={{ marginTop: -10, marginLeft: 10, zIndex: 1000 }}>
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
            rangePosition: {
              value: rangePosition,
              setValue: setRangePosition,
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
        paddingTop: '30px',
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
          style={{ color: 'gray', marginTop: -20 }}
          size="small"
          value={rangePrice}
          onChange={(_, newRange) => setRangePrice(newRange as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={20}
        />
      </div>
      <div style={{ width: 200 }}>
        <BodyText style={{ textAlign: 'center' }}>Quantity:</BodyText>
        <Slider
          style={{ color: 'gray', marginTop: -20 }}
          size="small"
          value={rangeQuantity}
          onChange={(_, newRange) => setRangeQuantity(newRange as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={20}
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
          style={{ color: 'gray' }}
          size="small"
          defaultValue={100}
          value={rangePosition}
          onChange={(_, newRange) => setRangePosition(newRange as number)}
          valueLabelDisplay="auto"
          step={10}
          marks
          min={0}
          max={100}
        />
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
