import React, { useRef, useState } from "react";
import { Text, Img, Button } from "components";
import DatePicker from "react-datepicker";

type selectOptionType = { value: string; label: string };

type EditAdvertContentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    poster: boolean;
    create: boolean;
    onClose;
  }>;
const productCategories: selectOptionType[] = [
  {
    label: "Flowers",
    value: "Flowers",
  },
];
const colors: selectOptionType[] = [
  {
    label: "Blue",
    value: "Blue",
  },
];

const EditAdvertContent = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    productname: "",
    category: "",
    description: "",
    imageurl: "",
    reference: "",
    type: "Sell",
    price: 0,
    quantity: 0,
    color: "",
    purchaseDate: "",
    issuer: 1,
    prioritized: false,
  });
  const [purchaseDate, setPurchaseDate] = useState(new Date());

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

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
  };

  // todo: check file format (only picture formats allowed)
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      console.log("File uploaded: ", file);
      if (file != undefined) {
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmitPicture = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    const response = fetch("https://localhost:3001/api/v1/adverts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: '{\
        "productname": "orchids blue",\
        "description": "These are fresh orchids",\
        "reference": "X-4UHF676",\
        "price": 10,\
        "quantity": 10,\
        "date": "2023-04-02T00:00:00.000Z",\
        "prioritized": true,\
        "status": "Ongoing",\
        "type": "SELL",\
        "reviews": [],\
        "offers": [],\
        "store": {\
            "name": "Chaima",\
            "email": "chaima.ghaddab1@gmail.com",\
            "password": "$2a$10$x3WXUJDRbPM5iBXXMAU53eH.Cgoie3Y39rIcbNnTOz8PHLX9kmXVC",\
            "prioritisationTickets": 0,\
            "_id": "6474c7d7222db607692cb307",\
            "createdAt": "2023-05-29T15:42:15.366Z"\
        },\
    }',
    }).then((response) => response.json());
    console.log(response);
    /* .then((data) => {
        // Handle the response data here
        console.log(data);
      }).then(onClose) */
    /*  .catch((error) => {
        // Handle any errors here
        console.error(error);
      }); */
  };
  const fieldClassName =
    "w-full font-poppins leading-[normal] p-2 placeholder:text-gray_600 text-base text-gray_600 text-left rounded-md flex flex-row items-center";
  return (
    <>
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-10 w-full">
          <Text className="font-poppins font-bold" variant="h3" as="h3">
            Advert details:
          </Text>
          {
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-8 w-full"
            >
              <div className="flex flex-row gap-7 items-center justify-start">
                <span>Sell/ Ask:</span>
                <label
                  className="flex flex-row gap-3 items-center"
                  htmlFor="type-sell"
                >
                  <input
                    type="radio"
                    id="type-sell"
                    name="type"
                    value="Sell"
                    checked={formData.type === "Sell"}
                    onChange={handleChange}
                  />
                  Sell
                </label>
                <label
                  className="flex flex-row gap-3 items-center"
                  htmlFor="type-ask"
                >
                  <input
                    type="radio"
                    id="type-ask"
                    name="type"
                    value="Ask"
                    checked={formData.type === "Ask"}
                    onChange={handleChange}
                  />
                  Ask
                </label>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "16px",
                }}
              >
                <div className="grid-item flex flex-col gap-3">
                  <label htmlFor="productname">Product Name</label>
                  <input
                    className={fieldClassName}
                    type="text"
                    name="productname"
                    value={formData.productname}
                    onChange={handleChange}
                    placeholder="Product Name"
                    required
                  ></input>
                </div>
                <div className="grid-item flex flex-col gap-3">
                  <label htmlFor="category">Category</label>
                  <select
                    className={fieldClassName}
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {productCategories.map((c, index) => (
                      <option value={`category${index}`}>{c.value}</option>
                    ))}
                  </select>
                </div>
                <div className="grid-item flex flex-col gap-3">
                  <label htmlFor="Color">Color</label>
                  <select
                    className={fieldClassName}
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                  >
                    <option value="">Select a color</option>
                    {colors.map((c, index) => (
                      <option value={`category${index}`}>{c.value}</option>
                    ))}
                  </select>
                </div>
                <div className="grid-item flex flex-col gap-3">
                  <label htmlFor="date">Purchase Date</label>
                  <div
                    className={`${fieldClassName} outline outline-[1px] outline-balack`}
                  >
                    <DatePicker
                      selected={purchaseDate}
                      onChange={(date) => {
                        setPurchaseDate(date);
                        setFormData({
                          ...formData,
                          ["purchaseDate"]: date,
                        });
                      }}
                      dateFormat="dd/MM/yyyy"
                    />
                    <Img className="h-[20px]" src="images/calendar.png" />
                  </div>
                </div>
                <div className="grid-item flex flex-col gap-3">
                  <label htmlFor="Quantity">Quantity (pcs)</label>
                  <input
                    className={fieldClassName}
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid-item flex flex-col gap-3">
                  <label htmlFor="Quantity">Price (€)</label>
                  <input
                    className={fieldClassName}
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid-item flex flex-col gap-3">
                  <label htmlFor="Description">Description</label>
                  <textarea
                    className={`w-[207%] h-[100px] ${fieldClassName}`}
                    id="description"
                    name="description"
                    placeholder="You could enter a description for your product!"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          }
        </div>
        <div>
          <div
            className="upload_zone flex flex-col gap-5 items-center justify-center"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <form onSubmit={handleSubmitPicture}>
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
        </div>
      </div>
      <div className="mt-10 flex justify-end">
        <Button
          className="text-white"
          shape="RoundedBorder6"
          size="sm"
          variant="FillGreen"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export { EditAdvertContent };
