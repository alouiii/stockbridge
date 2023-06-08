//import styles from "./profile.scss"
require('./profile.scss');

type LeftTabProps = {
  icon: string;
  title: string;
  index: number;
  selectedTab: number;
  setSelectedTab: (index: number) => void
};

/**
 * Component that displays the tabs on the left sidebar.
 */
export function LeftTab(props: LeftTabProps) {

  return (
      <li className="left-tab" style={{ display: "inline", width: "100%", alignSelf: "left" }}>
        <button className="btn-lg left-tab-button"
          style={{color: props.selectedTab ===  props.index ? "#233FC8" : "white"}}
          onClick={() => props.setSelectedTab(props.index)}>
          <img className="left-tab-icon" src={props.icon} alt="icon" />
          {props.title}</button>
      </li>
  );
}
