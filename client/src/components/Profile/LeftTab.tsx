import useMediaQuery from '../../hooks/useMediaQuery';
import { BodyText } from '../Text/BodyText';

type LeftTabProps = {
  key: string;
  message: string;
  icon: string;
  isSelected: boolean;
};

/**
 * Component that displays the step number, the icon and the relative message.
 */
export function LeftTab(props: LeftTabProps) {
  const matches = useMediaQuery('(min-width: 1527px)');
  return (
    <div
      style={{
        //width: 200,
        height: 70,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
      }}
    >
      <img
        style={{ alignSelf: 'center', marginTop: '-6px' }}
        src={props.icon}
        alt="icon"
      />

      <BodyText
        style={{
          color: props.isSelected ? '#6464c5' : 'white',
          textAlign: 'center',
          marginRight: 10,
          fontWeight: 350,
        }}
      >
        {props.message}
      </BodyText>
    </div>
  );
}
