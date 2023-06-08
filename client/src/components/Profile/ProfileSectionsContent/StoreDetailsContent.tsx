import React, { ReactElement } from "react";
import StoreDetailsForm from "../StoreDetails/StoreDetailsForm";

type Props = {
  children: ReactElement[];
};

/**
 * Component that displays the content of Store Details section.
 */
const StoreDetailsContent: React.FC<Props> = ({ children }) => {
  return <StoreDetailsForm />;
};

export default StoreDetailsContent;
