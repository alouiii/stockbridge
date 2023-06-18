import React, { FC, useContext, useRef, useState } from 'react';
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import {
  Advert,
  updateAdvert,
  createAdvert,
  ProductCategory,
  Colors,
} from '../../api/collections/advert';
import { palette } from '../../utils/colors';
import defaultPostAdvertImage from '../../assets/advertPostAdvert.svg';
import trashIcon from '../../assets/trash-bin.svg';
import { LoginContext } from '../../contexts/LoginContext';
import useMediaQuery from '../../hooks/useMediaQuery';
import {
  checkExpirationDateAvert,
  checkPurchaseDateAdvert,
} from '../../utils/functions';
import { BodyText } from '../Text/BodyText';
import { useNavigate } from 'react-router-dom';

type EditAdvertContentProps = {
  isShowing: boolean;
  onClose: () => void;
  advert?: Advert;
};

export const EditAdvertModal: FC<EditAdvertContentProps> = (props) => {
  const { user, loggedIn } = useContext(LoginContext);

  const matches = useMediaQuery('(min-width: 992px)');

  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null); // to handle the upload of the image

  const [encodedImage, setEncodedImage] = useState(
    props.advert?.imageurl ?? '',
  );

  const [advertType, setAdvertType] = useState(
    props.advert?.type ? props.advert?.type : '',
  );

  const handleType = (event: any) => {
    setAdvertType(event.target.value);
  };

  const [formData, setFormData] = useState({
    productname: props.advert?.productname ?? '',
    description: props.advert?.description ?? '',
    prioritized: props.advert?.prioritized ?? false,
    color: props.advert?.color ?? undefined,
    purchaseDate: props.advert?.purchaseDate ?? undefined,
    expirationDate: props.advert?.expirationDate ?? undefined,
    quantity: props.advert?.quantity ?? 0,
    price: props.advert?.price ?? 0,
    category: props.advert?.category ?? '',
    store: props.advert?.store ?? user?._id,
  });

  const handleChange = (event: any) => {
    // we put type any because we are handling various events, such as HTML input, HTML select ecc
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

  const handleImageClick = () => {
    if (fileInputRef.current != null) {
      fileInputRef.current.click();
    }
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async () => {
    setErrors({
      name: formData.productname ? '' : 'Name is required.',
      category: formData.category ? '' : 'Category is required.',
      type: advertType ? '' : 'Type is required.',
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
    setValidated(
      !Object.values(errors)
        .map((e) => e !== '')
        .reduce((r, e) => r && e, true),
    );
    if (validated && loggedIn) {
      try {
        if (props.advert?._id) {
          await updateAdvert(props.advert._id, {
            productname: formData.productname,
            description: formData.description,
            prioritized: false,
            color: formData.color ? formData.color : undefined,
            expirationDate: new Date(formData.expirationDate ?? ''),
            purchaseDate: new Date(formData.purchaseDate ?? ''),
            quantity: formData.quantity,
            price: formData.price,
            category: formData.category,
            imageurl: encodedImage,
          } as Advert);
        } else {
          if (user) {
            await createAdvert({
              productname: formData.productname,
              description: formData.description,
              prioritized: false,
              color: formData.color ? formData.color : undefined,
              expirationDate: new Date(formData.expirationDate ?? ''),
              purchaseDate: new Date(formData.purchaseDate ?? ''),
              quantity: formData.quantity,
              price: formData.price,
              status: 'Ongoing',
              category: formData.category,
              createdAt: new Date(),
              store: user._id,
              imageurl: encodedImage,
              type: advertType,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
      if (props.onClose) props?.onClose();
    }
  };

  return (
    <Modal size="lg" show={props.isShowing} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Advert Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col style={{ marginTop: 30 }}>
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    paddingLeft: 10,
                    paddingRight: 20,
                    fontWeight: '600',
                  }}
                >
                  Type:
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
                  checked={advertType === 'Sell'}
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
                  checked={advertType === 'Ask'}
                />
                <Form.Control.Feedback
                  style={{ paddingLeft: 10 }}
                  type="invalid"
                >
                  {errors.type}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col
              style={{
                backgroundColor: encodedImage ? undefined : 'lightgray',
                width: matches ? 200 : 160,
                height: matches ? 200 : 160,
                position: 'absolute',
                right: matches ? 100 : 50,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 5,
              }}
            >
              <Form.Control
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleUploadImage}
                style={{
                  display: 'none',
                }}
                id="customFile"
              />

              <Image
                src={encodedImage}
                alt="Advert Image"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
                  (e.currentTarget.src = defaultPostAdvertImage)
                }
                style={{
                  width: encodedImage ? '100%' : '30%',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
                onClick={handleImageClick}
                fluid
              />
              {!encodedImage ? (
                <BodyText
                  style={{ fontSize: 15, cursor: 'pointer' }}
                  onClick={handleImageClick}
                >
                  Add photo
                </BodyText>
              ) : (
                <Image
                  src={trashIcon}
                  alt="delete icon"
                  style={{
                    width: 25,
                    objectFit: 'cover',
                    cursor: 'pointer',
                  }}
                  onClick={() => setEncodedImage('')}
                  fluid
                />
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: 50 }}>
            <Col md={6}>
              <Form.Group>
                <Form.Label
                  style={{
                    paddingLeft: 10,
                    fontWeight: '600',
                  }}
                >
                  Product Name
                </Form.Label>
                <Form.Control
                  style={{
                    padding: 10,
                    color: palette.gray,
                    margin: 5,
                  }}
                  required
                  type="text"
                  placeholder="Product Name"
                  name="productname"
                  value={formData.productname}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                ></Form.Control>
                <Form.Control.Feedback
                  style={{ paddingLeft: 10 }}
                  type="invalid"
                >
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
                    paddingLeft: 10,
                    fontWeight: '600',
                  }}
                >
                  Product Category
                </Form.Label>
                <Form.Select
                  style={{
                    padding: 10,
                    color: palette.gray,
                    margin: 5,
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
                    .map((c, index) => (
                      <option key={index}>{c}</option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback
                  style={{ paddingLeft: 10 }}
                  type="invalid"
                >
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label
                  style={{
                    paddingLeft: 10,
                    fontWeight: '600',
                  }}
                >
                  Product Color
                </Form.Label>
                <Form.Select
                  style={{
                    padding: 10,
                    color: palette.gray,
                    margin: 5,
                  }}
                  placeholder="Color"
                  value={formData.color}
                  name="color"
                  onChange={handleChange}
                >
                  {Object.values(Colors)
                    .filter((key) => isNaN(Number(key)))
                    .map((c, index) => (
                      <option key={index}>{c}</option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label
                style={{
                  paddingLeft: 10,
                  fontWeight: '600',
                }}
              >
                Purchase Date
              </Form.Label>
              <Form.Control
                style={{
                  padding: 10,
                  color: palette.gray,
                  margin: 5,
                }}
                type="date"
                max={new Date().toISOString().substring(0, 10)}
                value={formData.purchaseDate?.toString() ?? ''}
                name="purchaseDate"
                onChange={(e) => {
                  if (checkPurchaseDateAdvert(e.target.value)) {
                    handleChange(e);
                  }
                }}
              />
            </Col>
            <Col>
              <Form.Label
                style={{
                  paddingLeft: 10,
                  fontWeight: '600',
                }}
              >
                Expiration Date
              </Form.Label>
              <Form.Control
                style={{
                  padding: 10,
                  color: palette.gray,
                  margin: 5,
                }}
                type="date"
                min={new Date().toISOString().substring(0, 10)}
                value={formData.expirationDate?.toString() ?? ''}
                name="expirationDate"
                onChange={(e) => {
                  if (checkExpirationDateAvert(e.target.value)) {
                    handleChange(e);
                  }
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="quantity">
                <Form.Label
                  style={{
                    paddingLeft: 10,
                    fontWeight: '600',
                  }}
                >
                  Quantity (pcs)
                </Form.Label>
                <Form.Control
                  style={{
                    padding: 10,
                    color: palette.gray,
                    margin: 5,
                  }}
                  type="number"
                  name="quantity"
                  min={0}
                  step={1}
                  value={Number(formData.quantity).toString()}
                  onChange={(e) => {
                    if (parseInt(e.target.value) > 0) {
                      handleChange(e);
                    } else {
                      setFormData({
                        ...formData,
                        quantity: 0,
                      });
                    }
                  }}
                  required
                  isInvalid={!!errors.quantity}
                ></Form.Control>
                <Form.Control.Feedback
                  style={{ paddingLeft: 10 }}
                  type="invalid"
                >
                  {errors.quantity}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="price">
                <Form.Label
                  style={{
                    paddingLeft: 10,
                    fontWeight: '600',
                  }}
                >
                  Price (€)
                </Form.Label>
                <Form.Control
                  style={{
                    padding: 10,
                    color: palette.gray,
                    margin: 5,
                  }}
                  type="number"
                  name="price"
                  min={0}
                  value={Number(formData.price).toString()}
                  onChange={(e) => {
                    if (parseInt(e.target.value) > 0) {
                      handleChange(e);
                    } else {
                      setFormData({
                        ...formData,
                        price: 0,
                      });
                    }
                  }}
                  required
                  isInvalid={!!errors.price}
                ></Form.Control>
                <Form.Control.Feedback
                  style={{ paddingLeft: 10 }}
                  type="invalid"
                >
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
                    paddingLeft: 10,
                    fontWeight: '600',
                  }}
                >
                  Description
                </Form.Label>
                <Form.Control
                  style={{
                    padding: 10,
                    color: palette.gray,
                    margin: '5px',
                    overflow: 'hidden',
                  }}
                  as="textarea"
                  rows={2}
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
            background: palette.subSectionsBgAccent,
            borderColor: palette.subSectionsBgAccent,
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
