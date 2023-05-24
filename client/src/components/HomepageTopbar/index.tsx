import React from "react";

import { Img } from "components";

type HomepageTopbarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{}>;

const HomepageTopbar: React.FC<HomepageTopbarProps> = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col items-center justify-start">
          <Img
            src="images/img_81.png"
            className="h-[88px] md:h-auto object-cover w-full"
            alt="EightyOne"
          />
        </div>
        <Img
          src="images/img_location.svg"
          className="h-[85px] mr-[11px]"
          alt="location"
        />
      </div>
    </>
  );
};

HomepageTopbar.defaultProps = {};

export default HomepageTopbar;
