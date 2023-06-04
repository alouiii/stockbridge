import React, {CSSProperties} from "react";

/**
 * Component to display a body text.
 */

export type BodyTextProps = {
  style: CSSProperties;
  message: React.ReactNode;
};


export function BodyText(props: BodyTextProps) {
  return <p className="font-link" style={props.style}>{props.message}</p>;
}
