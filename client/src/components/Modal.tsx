import { Button, EditAdvertContent } from "components";
import React from "react";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-8 z-10 w-[50%]">
        <EditAdvertContent
          isOpen={isOpen}
          onClose={onClose}
        ></EditAdvertContent>
      </div>
    </div>
  );
};

export { Modal };
