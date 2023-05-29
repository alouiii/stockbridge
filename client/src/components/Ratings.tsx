import React, { FormEvent } from "react";
import { List, Img } from "components";

type RatingsProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    rating: number;
  }>;

const Ratings: React.FC<RatingsProps> = (props) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <List className="grid grid-cols-5 w-[60%]" orientation="horizontal">
      {stars.map((star) => (
        <div style={{ color: star <= props?.rating ? "red" : "gray" }}>
          &#9733;
        </div>
      ))}
    </List>
  );
};

export { Ratings };
