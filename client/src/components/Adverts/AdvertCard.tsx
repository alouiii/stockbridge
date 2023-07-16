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

  const truncatedName =
    props.name && props.name.length > 10
      ? `${props.name.slice(0, 10)}...`
      : props.name;

  const truncatedDesc =
    props.description && props.description.length > 50
      ? `${props.description.slice(0, 50)}...`
      : props.description;

  return (
    <div
      style={{
        width: props.fancyEffect ? 325 : 300,
        height: props.fancyEffect ? 380 : 425,
        borderRadius: 8,
        position: 'relative',
        border: props.fancyEffect ? '0.5px solid black' : undefined,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: props.fancyEffect
          ? 'transform 0.3s, box-shadow 0.3s'
          : undefined,
        cursor: 'pointer',
        backgroundColor: props.fancyEffect ? '#FFF5F8' : 'white',
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
      onClick={props.fancyEffect ? handleAdvertClick : undefined}
    >
      <Image
        src={props.icon || emptyIcon}
        alt="image"
        width={props.icon ? 200 : 160}
        height={props.icon ? 200 : 150}
        style={{ marginTop: 30 }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingRight: 10,
          marginTop: 20,
          width: '100%',
        }}
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', padding: '0 5px' }}
        >
          <BodyText style={{ fontSize: 21, fontWeight: 600 }}>
            {truncatedName}
          </BodyText>
          <ColoredLine width={30} height={3} color="#4ECBA9" marginTop={-10} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            paddingTop: 2,
          }}
        >
          <BodyText style={{ fontSize: 18, fontWeight: 500 }}>
            Quantity: {props.quantity} pcs
          </BodyText>
          <BodyText style={{ fontSize: 18, fontWeight: 500, marginTop: -10 }}>
            Price: {props.price} €
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
          {truncatedDesc}
        </BodyText>
      </div>
      <Button
        style={{
          position: 'absolute',
          left: 10,
          bottom: 10,
          backgroundColor: '#233EC9',
          border: 'none',
          borderRadius: 0,
        }}
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
