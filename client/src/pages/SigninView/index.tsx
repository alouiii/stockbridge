import React from "react";
import { CloseButton } from "components/CloseButton";
import { useNavigate } from "react-router-dom";
import { Img, Input, Line, Text } from "components";
import Fieldname from "components/Fieldname";
import SignupViewTwoSignupsection from "components/SignupViewTwoSignupsection";

const SigninViewPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white_A700 flex flex-col font-poppins items-center justify-start mx-auto w-full">
        <div className="bg-gray_50 flex md:flex-col flex-row gap-5 items-center justify-between pl-3 w-full">
          <div className="md:h-[707px] sm:h-[753px] h-[919px] md:px-5 relative w-[52%] md:w-full">
            <div className="absolute flex flex-col h-max inset-[0] items-center justify-center m-auto p-0 w-full">
              <div className="h-[180px] md:h-[88px] relative w-[77%] sm:w-full">
                <div className="absolute bottom-[5%] flex flex-col inset-x-[0] items-center justify-end mx-auto pt-[15px] w-full">
                  <div className="flex flex-col items-start justify-end pr-[18px] pt-[18px] w-full">
                    <Text
                      className="font-bold text-deep_purple_600"
                      as="h3"
                      variant="h3"
                    >
                      Sign in
                    </Text>
                  </div>
                </div>
                <div className="absolute flex flex-col items-center justify-start right-[10%] top-[0] sm:w-full">
                  <Img
                    src="images/logo.png"
                    className="h-[88px] sm:h-auto object-cover w-full"
                    alt="EightyOne"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[23px] items-start justify-center md:m-0 m-[23px] relative w-3/4 sm:w-full">
                <div className="flex flex-col gap-[15px] items-start justify-start w-auto sm:w-full">
                  <Fieldname
                    className="flex flex-row items-start justify-start w-[500px] sm:w-full"
                    fieldname="E-mail address"
                    one="*"
                  />
                  <Input
                    wrapClassName="w-full"
                    className="font-normal leading-[normal] p-0 placeholder:text-gray_600 text-base text-gray_600 text-left w-full"
                    name="inputfieldname"
                    placeholder="field filling"
                    shape="RoundedBorder6"
                    size="sm"
                    variant="OutlineBluegray100"
                  ></Input>
                </div>
                <div className="flex flex-col gap-[15px] items-start justify-start w-auto sm:w-full">
                  <Fieldname
                    className="flex flex-row items-start justify-start w-[500px] sm:w-full"
                    fieldname="Password"
                    one="*"
                  />
                  <Input
                    wrapClassName="w-full"
                    className="font-normal leading-[normal] p-0 placeholder:text-gray_600 text-base text-gray_600 text-left w-full"
                    name="inputfieldname_One"
                    placeholder="field filling"
                    shape="RoundedBorder6"
                    size="sm"
                    variant="OutlineBluegray100"
                  ></Input>
                </div>
                <Line className="bg-gray_900_63 h-px w-full" />
              </div>
              <SignupViewTwoSignupsection
                className="flex flex-col items-start justify-start sm:w-full"
                signUp="Sign In"
                confirmation="Sign up"
                secondStep={false}
              />
            </div>
            <CloseButton></CloseButton>
          </div>
          <Img
            src="images/img_image.png"
            className="md:flex-1 h-[982px] sm:h-auto object-cover w-auto md:w-full"
            alt="image_One"
          />
        </div>
      </div>
    </>
  );
};

export default SigninViewPage;
