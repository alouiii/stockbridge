import React, { FC, useContext } from 'react';
import { Button, Image } from 'react-bootstrap';
import { BodyText } from '../Text/BodyText';
import { ColoredLine } from '../ColoredLine';
import prioritizedIcon from '../../assets/prioritized.svg';
import emptyIcon from '../../assets/product-placeholder.png';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';

export interface AdvertCardProps {
  id: string | undefined;
  name: string | undefined;
  description?: string;
  price: number | undefined;
  quantity: number | undefined;
  icon?: string;
  prioritized: boolean | undefined;
  creationDate: Date | undefined;
  fancyEffect: boolean;
}

export const AdvertCard: FC<AdvertCardProps> = (props) => {
  const navigate = useNavigate();

  const { loggedIn } = useContext(LoginContext);

  const creationDateFormatted = props.creationDate
    ? new Date(props.creationDate.toString()).toLocaleDateString('it', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      })
    : null;

  const handleAdvertClick = () => {
    if (loggedIn) {
      navigate(`/productoverview/${props.id}`);
    } else {
      navigate('/signIn');
    }
  };

  return (
    <div
      style={{
        width: 300,
        height: 425,
        borderRadius: 8,
        position: 'relative',
        border: props.fancyEffect ? '1px solid black' : undefined,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: props.fancyEffect
          ? 'transform 0.3s, box-shadow 0.3s'
          : undefined,
        cursor: 'pointer',
      }}
      onMouseEnter={
        props.fancyEffect
          ? (e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
            }
          : undefined
      }
      onMouseLeave={
        props.fancyEffect
          ? (e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }
          : undefined
      }
      onClick={handleAdvertClick}
    >
      <Image
        src={props.icon || emptyIcon}
        alt="image"
        width={props.icon ? 200 : 180}
        height={props.icon ? 200 : 150}
        style={{ marginTop: 30 }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: props.name && props.name?.length <= 25 ? 50 : 10,
          paddingLeft: 5,
          paddingRight: 5,
          marginTop: 10,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <BodyText style={{ fontSize: 20, fontWeight: 600 }}>
            {props.name}
          </BodyText>
          <ColoredLine width={30} height={3} color="#4ECBA9" marginTop={-10} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <BodyText style={{ fontSize: 18, fontWeight: 500 }}>
            Quantity: {props.quantity}
          </BodyText>
          <BodyText style={{ fontSize: 18, fontWeight: 500, marginTop: -10 }}>
            Price: {props.price}$
          </BodyText>
        </div>
      </div>
      <div
        style={{
          width: 300,
          overflow: 'hidden',
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <BodyText
          style={{ fontSize: 15, fontWeight: 400, textAlign: 'center' }}
        >
          {props.description}
        </BodyText>
      </div>
      <Button
        style={{ position: 'absolute', left: 10, bottom: 10 }}
        onClick={handleAdvertClick}
      >
        View Advert
      </Button>
      <BodyText
        style={{
          fontSize: 15,
          fontWeight: 300,
          textAlign: 'center',
          position: 'absolute',
          right: 10,
          bottom: 0,
        }}
      >
        {creationDateFormatted}
      </BodyText>
      {props.prioritized ? (
        <Image
          src={prioritizedIcon}
          alt="prioritizedIcon"
          width={40}
          height={40}
          style={{ position: 'absolute', right: 5, top: 5 }}
        />
      ) : undefined}
    </div>
  );
};
