import React from "react";

const shapes = {
  RoundedBorder6: "rounded-md",
  CircleBorder26: "rounded-[26px]",
  CircleBorder21: "rounded-[21px]",
} as const;
const variants = {
  OutlineRed300: "bg-red_300 border-[5px] border-red_300 border-solid",
  FillRed300: "bg-red_300",
  icbFillOrange200: "bg-orange_200",
} as const;
const sizes = { sm: "p-[7px]", md: "p-3.5", smIcn: "p-[13px]" } as const;

export type ButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "onClick"
> &
  Partial<{
    className: string;
    shape: keyof typeof shapes;
    variant: keyof typeof variants;
    size: keyof typeof sizes;
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    onClick: () => void;
  }>;

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "",
  variant = "",
  size = "",
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${(shape && shapes[shape]) || ""} ${
        (size && sizes[size]) || ""
      } ${(variant && variants[variant]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

export { Button };
