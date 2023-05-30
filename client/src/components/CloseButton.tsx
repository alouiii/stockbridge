import { Img } from "components";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CloseButton = React.forwardRef<HTMLInputElement>(() => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate("/")}>
      <Img
        src="images/img_close.svg"
        className="absolute h-12 right-[0] top-[0] w-12"
        alt="close"
      />
    </Button>
  );
});

export { CloseButton };
