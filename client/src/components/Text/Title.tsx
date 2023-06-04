import React, { CSSProperties, FC } from "react";

export type TitleTextProps = {
  style: CSSProperties;
  children: React.ReactNode;
};

/**
 * Component to display a title.
 */
export const Title: FC<TitleTextProps> = (props) => {
  //return
  //<h1 className="font-link" style={props.style}>{props.message}</h1>;
  return (
      <h1 className="font-link" style={props.style}>
        {props.children}
      </h1>
  );
}
