import React, { FC, useState } from 'react';
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import {
  Advert,
  updateAdvert,
  createAdvert,
  ProductCategory,
  Colors,
} from '../../api/collections/advert';
import { palette } from '../../utils/colors';

type EditAdvertContentProps = {
  isShowing: boolean;
  onClose: () => void;
  advert?: Advert;
};

const EditAdvertModal: FC<EditAdvertContentProps> = (props) => {
  const [isChecked, setIsChecked] = useState(
    props.advert?.type ? props.advert?.type : '',
  );

  const handleType = (event: any) => {
    setIsChecked(event.target.value);
  };
  const purchaseDate = props.advert?.purchaseDate
    ? props.advert.purchaseDate.toString().substring(0, 10)
    : '';
  const expirationDate = props.advert?.expirationDate
    ? props.advert.expirationDate.toString().substring(0, 10)
    : '';
  const [encodedImage, setEncodedImage] = useState(
    props.advert?.imageurl ? props.advert?.imageurl : '',
  );
  console.log('Constructing Form for advert: ', props.advert);
  const [formData, setFormData] = useState({
    productname: props.advert?.productname ? props.advert?.productname : '',
    description: props.advert?.description ? props.advert?.description : '',
    prioritized: props.advert?.prioritized ? props.advert?.prioritized : false,
    color: props.advert?.color ? props.advert?.color : undefined,
    purchaseDate: purchaseDate,
    expirationDate: expirationDate,
    quantity: props.advert?.quantity ? props.advert?.quantity : 0,
    price: props.advert?.price ? props.advert?.price : 0,
    category: props.advert?.category ? props.advert?.category : '',
  });

  const handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState(
    {} as {
      name: string;
      category: string;
      type: string;
      price: string;
      quantity: string;
    },
  );

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];
      if (file !== undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (reader.result) {
            setEncodedImage(reader.result as string);
          }
        };
      }
    }
  };

  let currentUser: { [x: string]: any } | null = null;
  const localUser = localStorage.getItem('currentUser');
  if (localUser !== null) {
    currentUser = JSON.parse(localUser);
  }
  const handleSubmit = async () => {
    setErrors({
      name: formData.productname ? '' : 'Name is required.',
      category: formData.category ? '' : 'Category is required.',
      type: isChecked ? '' : 'Type is required.',
      price: formData.price
        ? formData.price > 0
          ? ''
          : 'Please set a product price higher than 0'
        : 'Price is required.',
      quantity: formData.quantity
        ? formData.quantity > 0
          ? ''
          : 'Please set a product quantity higher than 0'
        : 'Quantity is required.',
    });
    console.log(Object.values(errors));
    setValidated(
      !Object.values(errors)
        .map((e) => e !== '')
        .reduce((r, e) => r && e, true),
    );
    if (validated) {
      try {
        if (props.advert?._id) {
          await updateAdvert(props.advert._id, {
            productname: formData.productname,
            description: formData.description,
            prioritized: false,
            color: formData.color ? formData.color : undefined,
            expirationDate: new Date(formData.expirationDate),
            purchaseDate: new Date(formData.purchaseDate),
            quantity: formData.quantity,
            price: formData.price,
            category: formData.category,
            imageurl: encodedImage,
          } as Advert);
        } else {
          if (currentUser != null) {
            await createAdvert({
              productname: formData.productname,
              description: formData.description,
              prioritized: false,
              color: formData.color ? formData.color : undefined,
              expirationDate: new Date(formData.expirationDate),
              purchaseDate: new Date(formData.purchaseDate),
              quantity: formData.quantity,
              price: formData.price,
              status: 'Ongoing',
              category: formData.category,
              createdAt: new Date(),
              store: currentUser._id,
              imageurl: encodedImage,
              type: isChecked,
            });
          }
        }
        if (props.onClose) props?.onClose();
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <Modal show={props.isShowing} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Advert details:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    padding: '10px',
                    color: palette.gray,
                  }}
                >
                  Sell/ Ask:
                </Form.Label>

                <Form.Check
                  inline
                  required
                  type="radio"
                  name="type"
                  id="Sell"
                  label="Sell"
                  onChange={props.advert ? undefined : handleType}
                  value={'Sell'}
                  checked={isChecked === 'Sell'}
                />
                <Form.Check
                  inline
                  required
                  type="radio"
                  name="type"
                  id="Ask"
                  label="Ask"
                  onChange={props.advert ? undefined : handleType}
                  value={'Ask'}
                  checked={isChecked === 'Ask'}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.type}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                style={{
                  textAlign: 'center',
                }}
                controlId="FileUpload"
              >
                <div className="custom-file">
                  <Form.Control
                    type="file"
                    onChange={handleFileInput}
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: 'black',
                      borderRadius: 15,
                      alignContent: 'start',
                      justifyContent: 'start',
                      marginBottom: '10px',
                    }}
                    id="customFile"
                  />
                </div>
                {encodedImage && (
                  <div className="flex-col items-end justify-end">
                    <Image
                      style={{
                        width: '160px',
                        height: '160px',
                        borderRadius: '60px',
                      }}
                      src={encodedImage}
                    />
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="name">
                <Form.Label
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                >
                  Product Name
                </Form.Label>
                <Form.Control
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                  required
                  type="text"
                  placeholder="Product Name"
                  name="productname"
                  value={formData.productname}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="category">
                <Form.Label
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                >
                  Product Category
                </Form.Label>
                <Form.Select
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                  required
                  placeholder="Product Category"
                  value={formData.category}
                  name="category"
                  onChange={handleChange}
                  isInvalid={!!errors.category}
                >
                  <option> -- Select Category -- </option>
                  {Object.values(ProductCategory)
                    .filter((key) => isNaN(Number(key)))
                    .map((c) => (
                      <option>{c}</option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                >
                  Product Color
                </Form.Label>
                <Form.Select
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                  placeholder="Product Category"
                  value={formData.color}
                  name="color"
                  onChange={handleChange}
                >
                  {Object.values(Colors)
                    .filter((key) => isNaN(Number(key)))
                    .map((c) => (
                      <option>{c}</option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label
                style={{
                  padding: '10px',
                  color: palette.gray,
                  margin: '5px',
                }}
              >
                Purchase Date
              </Form.Label>
              <Form.Control
                style={{
                  padding: '10px',
                  color: palette.gray,
                  margin: '5px',
                }}
                type="date"
                value={formData.purchaseDate}
                name="purchaseDate"
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label
                style={{
                  padding: '10px',
                  color: palette.gray,
                  margin: '5px',
                }}
              >
                Expiration Date
              </Form.Label>
              <Form.Control
                style={{
                  padding: '10px',
                  color: palette.gray,
                  margin: '5px',
                }}
                type="date"
                value={formData.expirationDate}
                name="expirationDate"
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="quantity">
                <Form.Label
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                >
                  {' '}
                  Quantity (pcs)
                </Form.Label>
                <Form.Control
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  isInvalid={!!errors.quantity}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.quantity}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="price">
                <Form.Label
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                >
                  Price (€)
                </Form.Label>
                <Form.Control
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  isInvalid={!!errors.price}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                >
                  Description
                </Form.Label>
                <Form.Control
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                    overflow: 'hidden',
                  }}
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="text-white"
          type="submit"
          style={{
            background: palette.green,
            borderColor: palette.green,
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { EditAdvertModal };
