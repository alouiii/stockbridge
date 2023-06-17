import { FC } from 'react';
import { ProductCategory, Advert } from '../../api/collections/advert';
import { BodyText } from '../Text/BodyText';
import { HorizontalSlider } from './HorizontalSlider';

type AdvertsTabContentProps = {
  adverts: Advert[];
};
const AdvertsTabContent: FC<AdvertsTabContentProps> = (props) => {
  return (
    <div
      style={{
        width: 'auto',
      }}
    >
      {Object.values(ProductCategory).map((c, i) => {
        const adverts_in_category = props.adverts.filter(
          (advert) => advert.category === c,
        );
        return (
          adverts_in_category.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
              }}
            >
              <BodyText
                style={{
                  fontFamily: 'Poppins',
                  fontSize: 32,
                  fontWeight: 300,
                }}
              >
                {c}
              </BodyText>
              <HorizontalSlider adverts={adverts_in_category} />
            </div>
          )
        );
      })}
    </div>
  );
};

export { AdvertsTabContent };
