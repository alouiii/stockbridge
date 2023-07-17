import React, { FC } from 'react';
import { Page } from '../components/Page';
import { Image } from 'react-bootstrap';
import image404 from '../../src/assets/404.jpg';

export const NotFound: FC = () => {
  return (
    <Page>
      <Image src={image404} fluid/>
    </Page>
  );
};
