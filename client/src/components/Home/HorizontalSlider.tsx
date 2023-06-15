import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Advert } from '../../api/collections/advert';
import {
  Button,
  Card,
  Carousel,
  Container,
  Image,
  Row,
  Stack,
} from 'react-bootstrap';
import { ProductAttribute } from '../ProductOverview/ProductAttribute';
import { BodyText } from '../Text/BodyText';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type HorizontalSliderProps = {
  adverts: Advert[];
};
const HorizontalSlider: FC<HorizontalSliderProps> = (props) => {
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

  const grouped: Advert[][] = [];
  const x = Math.floor(screenWidth / 400);
  for (let i = 0; i < props.adverts.length / x; i += x) {
    grouped.push(props.adverts.slice(i, i + x));
  }

  useEffect(() => {
    const handleResize = () => {
      window.location.reload();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <Carousel
        style={{
          height: '350px',
        }}
      >
        <Carousel.Item
          style={{
            overflowX: 'auto',
          }}
        >
          <Stack
            direction="horizontal"
            className="justify-content-start align-items-start"
            gap={3}
          >
            {props.adverts.map((a) => (
              <Card
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '330px',
                  width: '280px',
                  background: 'transparent',
                  border: 'solid 1px black',
                  borderRadius: '15px',
                  padding: '20px',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/productoverview/${a._id}`)}
              >
                {a.imageurl && (
                  <div
                    style={{
                      width: '80%',
                      height: '40%',
                      marginTop: '5px',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        left: 20,
                        right: 20,
                      }}
                      src={a.imageurl}
                    />
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    flexDirection: a.imageurl ? 'row' : 'column',
                    justifyContent: 'start',
                    alignItems: 'start',
                    marginTop: '30px',
                    gap: '10%',
                    width: '100%',
                  }}
                >
                  <BodyText
                    style={{
                      fontFamily: 'Poppins',
                      fontSize: '18px',
                      color: 'black',
                      width: '40%',
                    }}
                  >
                    {a.productname}
                  </BodyText>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '80%',
                    }}
                  >
                    <ProductAttribute
                      name="Quantity"
                      value={a.quantity}
                      unit="pcs"
                      fontSize="16px"
                    />
                    <ProductAttribute
                      name="Price"
                      value={a.price}
                      unit="$"
                      fontSize="16px"
                    />
                  </div>
                </div>

                <BodyText
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: '16px',
                    color: 'GrayText',
                  }}
                >
                  {a.description}
                </BodyText>
                <BodyText
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: '12px',
                    color: 'GrayText',
                    position: 'relative',
                    left: '75%',
                  }}
                >
                  {a.createdAt?.toString().substring(0, 10)}
                </BodyText>
              </Card>
            ))}
          </Stack>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export { HorizontalSlider };
