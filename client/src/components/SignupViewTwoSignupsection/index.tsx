import React from "react";

import { Button, Text } from "components";
import { useNavigate } from "react-router-dom";

type SignupViewTwoSignupsectionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    termandcondition: JSX.Element | string;
    signUp: string;
    confirmation: string;
    secondStep: boolean;
  }>;

const SignupViewTwoSignupsection: React.FC<SignupViewTwoSignupsectionProps> = (
  props
) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={props.className}>
        <Text
          className="font-poppins md:ml-[0] ml-[5px] mt-[15px] text-gray_600"
          variant="body2"
        >
          By signing {props.signUp === "Sign Up" ? "up" : "in"} you agree to{" "}
          <a
            href=""
            style={{
              color: "blue",
              textDecorationLine: "underline",
            }}
          >
            Directory&#39;s Terms and Conditions
          </a>{" "}
          and{" "}
          <a
            href=""
            style={{
              color: "blue",
              textDecorationLine: "underline",
            }}
          >
            Privacy Policy
          </a>
          .
        </Text>
        <Button
          className="cursor-pointer font-bold font-poppins min-w-[556px] sm:min-w-full mt-[25px] text-4xl sm:text-[32px] md:text-[34px] text-center text-white_A700"
          shape="RoundedBorder6"
          size="sm"
          variant="OutlineRed300"
          onClick={() => {
            if (props.signUp === "Sign Up") {
              if (!props.secondStep) {
                navigate("/signupviewtwo");
              } else {
                navigate("/");
              }
            } else navigate("/");
          }}
        >
          {props?.signUp}
        </Button>
        <Text
          className="font-poppins md:ml-[0] ml-[5px] mt-[15px] text-gray_600"
          variant="body2"
        >
          {props?.confirmation === "Sign up" ? (
            <Text
              className="font-poppins md:ml-[0] ml-[3px] text-gray_600"
              variant="body2"
            >
              No account?{" "}
              <a
                style={{ color: "blue", textDecorationLine: "underline" }}
                href="/signupviewone"
              >
                Sign up
              </a>
            </Text>
          ) : (
            <Text
              className="font-poppins md:ml-[0] ml-[3px] text-gray_600"
              variant="body2"
            >
              Have an account?{" "}
              <a
                style={{ color: "blue", textDecorationLine: "underline" }}
                href="/signinview"
              >
                Sign in
              </a>
            </Text>
          )}
        </Text>
      </div>
    </>
  );
};

SignupViewTwoSignupsection.defaultProps = {
  termandcondition: (
    <>
      By signing up you agree to Directory&#39;s Terms and Conditions and
      Privacy Policy.
    </>
  ),
  signUp: "Sign Up",
  confirmation: "Sign in",
};

export default SignupViewTwoSignupsection;
