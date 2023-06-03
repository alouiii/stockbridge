import React from "react";

import { Img } from "components";
import { Button, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

type HomepageTopbarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    user: boolean;
  }>;

const Topbar: React.FC<HomepageTopbarProps> = (props) => {
  const main_page = props.user ? "/Homepage" : "/";
  const account = props.user ? "/" : "/signinview";
  const navigate = useNavigate();
  return (
    <Nav className={props.className}>
      <Button>
        <div className="flex flex-col items-center justify-start">
          <Img
            src="images/logo.png"
            className="h-[88px] md:h-auto object-cover w-full"
            alt="EightyOne"
            onClick={() => navigate(main_page)}
          />
        </div>
      </Button>
      <Button>
        <Img
          src="images/img_location.svg"
          className="h-[85px] mr-[11px]"
          alt="location"
          onClick={() => navigate(account)}
        />
      </Button>
    </Nav>
  );
};

Topbar.defaultProps = {};

export { Topbar };
