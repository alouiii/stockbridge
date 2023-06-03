import React, { useRef, useState } from "react";
import { Text, Button, Img } from "components";

const PictureUpload: React.FC<string> = (props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const iconRef = useRef<HTMLInputElement>(null!);
  const [preview, setPreview] = useState("");

  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    iconRef?.current.click();
  };
  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    setPreview(URL.createObjectURL(file));
    validateFile(file);
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      console.log("File uploaded: ", file);
      setPreview(URL.createObjectURL(file));
      validateFile(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const validateFile = (file: File | null) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
      } else {
        setSelectedFile(file);
        setError("");
      }
    }
  };
  return (
    <div
      className="upload_zone flex flex-col gap-5 items-center justify-center"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <form onSubmit={handleSubmit}>
        <input
          ref={iconRef}
          className="file-input"
          type="file"
          onChange={handleFileInput}
          name="file"
          hidden
        />
        <div>
          <Button
            className="flex flex-row gap-3 w-[160px] text-gray_600 items-center p-1"
            variant="transparentGrayBorder"
            shape="RoundedBorder6"
            onClick={onBtnClick}
          >
            <Text className="font-poppins font-light" as="h4">
              upload picture
            </Text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-upload"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
            </svg>
          </Button>
        </div>
      </form>

      {preview && (
        <div className="flex-col items-end justify-end">
          <Img
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "25px",
            }}
            src={preview}
          />
        </div>
      )}
    </div>
  );
};

export { PictureUpload };
