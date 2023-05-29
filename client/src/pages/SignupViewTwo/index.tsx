import React from "react";

import { Img, Input, Line, SelectBox, Text, Fieldname, Addpayment } from "components";
import SignupViewTwoLogo from "components/SignupViewTwoLogo";
import SignupViewTwoSignupsection from "components/SignupViewTwoSignupsection";

const inputfieldnameOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
const inputfieldnameThreeOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const SignupViewTwoPage: React.FC = () => {
  return (
    <>
      <div className="bg-gray_50 flex sm:flex-col md:flex-col flex-row font-poppins sm:gap-5 md:gap-5 items-center mx-auto pl-3 w-full">
        <div className="sm:h-[1049px] md:h-[877px] h-[952px] md:px-5 relative w-[54%] md:w-full">
          <div className="absolute flex flex-col h-max inset-[0] items-center justify-center m-auto pt-[5px] px-[5px] w-full">
            <div className="flex flex-col gap-1.5 items-center justify-start w-[74%] md:w-full">
              <div className="flex flex-col items-start justify-start w-full">
                <div className="md:h-[205px] h-[249px] relative w-full">
                  <div className="absolute bottom-[0] flex flex-col inset-x-[0] items-center justify-end mx-auto pt-[150px] w-full">
                    <div className="flex flex-col items-start justify-end pr-[18px] pt-[18px] w-full">
                      <Text
                        className="font-bold text-deep_purple_600"
                        as="h3"
                        variant="h3"
                      >
                        One more step ...
                      </Text>
                    </div>
                  </div>
                  <SignupViewTwoLogo className="absolute flex flex-col items-center justify-start right-[10%] top-[0] sm:w-full" />
                </div>
                <div className="flex flex-col gap-[15px] items-start justify-start mt-[29px] w-[545px] sm:w-full">
                  <Fieldname
                    className="flex flex-col gap-3 items-start justify-start w-[99px] sm:w-full"
                    fieldname="Store name"
                    one=""
                  />
                  <Input
                    wrapClassName="w-full"
                    className="font-normal leading-[normal] p-0 placeholder:text-gray_600 text-base text-gray_600 text-left w-full"
                    name="inputfieldname"
                    placeholder="Store Name"
                    shape="RoundedBorder6"
                    size="sm"
                    variant="OutlineBluegray100"
                  ></Input>
                </div>
                <div className="flex flex-col gap-[15px] items-start justify-start mt-[15px] w-auto sm:w-full">
                  <Fieldname
                    className="flex flex-row items-start justify-start w-[85px] sm:w-full"
                    fieldname="Category"
                    one="*"
                  />
                  <SelectBox
                    className="font-normal leading-[normal] text-base text-gray_600 text-left w-[545px]"
                    placeholderClassName="text-gray_600"
                    indicator={
                      <Img
                        src="images/img_vector_gray_600.svg"
                        className="h-[5px] w-2.5"
                        alt="Vector"
                      />
                    }
                    size="sm"
                    isSearchable={false}
                    placeholder="Please select your products' main category"
                    shape="RoundedBorder6"
                    isMulti={false}
                    options={inputfieldnameOptionsList}
                    name="inputfieldname_One"
                    variant="OutlineBluegray100"
                  />
                </div>
                <div className="flex flex-col gap-[15px] items-start justify-start mt-[11px] w-[545px] sm:w-full">
                  <Fieldname
                    className="flex flex-row items-start justify-start w-[103px] sm:w-full"
                    fieldname="Street name"
                    one="*"
                  />
                  <Input
                    wrapClassName="w-full"
                    className="font-normal leading-[normal] p-0 placeholder:text-gray_600 text-base text-gray_600 text-left w-full"
                    name="inputfieldname_Two"
                    placeholder="Musterstraße. 1"
                    shape="RoundedBorder6"
                    size="sm"
                    variant="OutlineBluegray100"
                  ></Input>
                </div>
                <div className="flex sm:flex-col flex-row gap-[9px] items-center justify-between mt-3 w-[99%] md:w-full">
                  <div className="flex flex-col gap-[15px] items-start justify-start w-48">
                    <Fieldname
                      className="flex flex-row items-start justify-start w-[85px] sm:w-full"
                      fieldname="City"
                      one="*"
                    />
                    <SelectBox
                      className="font-normal leading-[normal] text-base text-gray_600 text-left w-full"
                      placeholderClassName="text-gray_600"
                      indicator={
                        <Img
                          src="images/img_vector_gray_600.svg"
                          className="h-[5px] w-2.5"
                          alt="Vector"
                        />
                      }
                      size="sm"
                      isSearchable={false}
                      placeholder="Munich"
                      shape="RoundedBorder6"
                      isMulti={false}
                      options={inputfieldnameThreeOptionsList}
                      name="inputfieldname_Three"
                      variant="OutlineBluegray100"
                    />
                  </div>
                  <div className="flex flex-col gap-[15px] items-start justify-start w-[195px]">
                    <Fieldname
                      className="flex flex-row items-start justify-start w-[51px] sm:w-full"
                      fieldname="State"
                      one=""
                    />
                    <Input
                      wrapClassName="w-full"
                      className="font-normal leading-[normal] p-0 placeholder:text-gray_600 text-base text-gray_600 text-left w-full"
                      name="inputfieldname_Four"
                      placeholder="Bayern"
                      shape="RoundedBorder6"
                      size="sm"
                      variant="OutlineBluegray100"
                    ></Input>
                  </div>
                  <div className="flex flex-col gap-[15px] items-start justify-start w-[169px]">
                    <Fieldname
                      className="flex flex-row items-start justify-start w-[150px] sm:w-full"
                      fieldname="Postal Code"
                      one="*"
                    />
                    <Input
                      wrapClassName="w-full"
                      className="font-normal leading-[normal] p-0 placeholder:text-gray_600 text-base text-gray_600 text-left w-full"
                      name="inputfieldname_Four"
                      placeholder="X X X X X"
                      shape="RoundedBorder6"
                      size="sm"
                      variant="OutlineBluegray100"
                    ></Input>
                  </div>
                </div>
                <div className="flex flex-col gap-[15px] items-start justify-start mt-2.5 w-[545px] sm:w-full">
                  <Fieldname
                    className="flex flex-row items-start justify-start w-[103px] sm:w-full"
                    fieldname="Country"
                    one="*"
                  />
                  <SelectBox
                    className="font-normal leading-[normal] text-base text-gray_600 text-left w-full"
                    placeholderClassName="text-gray_600"
                    indicator={
                      <Img
                        src="images/img_vector_gray_600.svg"
                        className="h-[5px] w-2.5"
                        alt="Vector"
                      />
                    }
                    size="sm"
                    isSearchable={false}
                    placeholder="Germany"
                    shape="RoundedBorder6"
                    isMulti={false}
                    options={inputfieldnameThreeOptionsList}
                    name="inputfieldname_Three"
                    variant="OutlineBluegray100"
                  />
                </div>
                <Addpayment
                  className="flex flex-row items-end justify-start mt-[30px] md:pr-10 sm:pr-5 pr-[102px] w-[80%] md:w-full"
                  addapaymentmethOne="Add a payment method"
                />
                <Line className="bg-gray_900_63 h-px mt-3.5 w-full" />
              </div>
              <SignupViewTwoSignupsection
                className="flex flex-col items-start justify-start sm:w-full"
                termandcondition={
                  <>
                    By signing up you agree to Directory&#39;s Terms and
                    Conditions and Privacy Policy.
                  </>
                }
                signUp="Sign Up"
                secondStep={true}
                confirmation="Have an account? Sign in"
              />
            </div>
          </div>
          <Img
            src="images/img_close.svg"
            className="absolute h-12 right-[3%] top-[0] w-12"
            alt="close"
          />
        </div>
        <Img
          src="images/img_image.png"
          className="h-[982px] sm:h-auto object-cover w-[47%] md:w-full"
          alt="image_One"
        />
      </div>
    </>
  );
};

export default SignupViewTwoPage;
