import React, { FC, useContext, useEffect, useRef, useState } from 'react';
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
import { LoginContext } from '../../contexts/LoginContext';
import useMediaQuery from '../../hooks/useMediaQuery';
import {
  checkExpirationDateAvert,
  checkPurchaseDateAdvert,
} from '../../utils/functions';

type EditAdvertContentProps = {
  isShowing: boolean;
  onClose: () => void;
  advert?: Advert;
};

export const EditAdvertModal: FC<EditAdvertContentProps> = (props) => {
  const { user } = useContext(LoginContext);

  const matches = useMediaQuery('(min-width: 992px)');

  const fileInputRef = useRef<HTMLInputElement>(null); // to handle the upload of the image

  const [advertType, setAdvertType] = useState(props.advert?.type ?? 'Sell');

  const handleType = (event: any) => {
    setAdvertType(event.target.value);
  };
  /*const purchaseDate = props.advert?.purchaseDate
    ? props.advert.purchaseDate.toString().substring(0, 10)
    : '';
  const expirationDate = props.advert?.expirationDate
    ? props.advert.expirationDate.toString().substring(0, 10)
    : '';
  */
  const [encodedImage, setEncodedImage] = useState(
    props.advert?.imageurl ?? '',
  );

  const [formData, setFormData] = useState({
    productname: props.advert?.productname ?? '',
    description: props.advert?.description ?? '',
    prioritized: props.advert?.prioritized ?? false,
    color: props.advert?.color ?? '',
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

  const [errors, setErrors] = useState({
    productname: false,
    category: false,
    price: false,
    quantity: false,
    type: false,
  });

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

  const validationErrors = {
    productname: false,
    category: false,
    price: false,
    quantity: false,
    type: false,
  };
  const handleSubmit = async () => {
    if (!formData.productname) {
      validationErrors.productname = true;
    }
    if (!formData.category) {
      validationErrors.category = true;
    }
    if (!formData.quantity) {
      validationErrors.quantity = true;
    }
    if (!formData.price) {
      validationErrors.price = true;
    }
    if (!advertType) {
      validationErrors.type = true;
    }

    if (Object.values(validationErrors).some((e) => e)) {
      setErrors(validationErrors);
    } else {
      try {
        if (props.advert?.id) {
          await updateAdvert(props.advert.id, {
            productname: formData.productname,
            description: formData.description,
            //type: advertType,
            prioritized: false,
            color: formData.color,
            expirationDate: formData.expirationDate,
            purchaseDate: formData.purchaseDate,
            quantity: formData.quantity,
            price: formData.price,
            category: formData.category,
            imageurl: encodedImage,
          } as Advert);
        } else {
          await createAdvert({
            productname: formData.productname,
            description: formData.description,
            prioritized: false,
            color: formData.color,
            expirationDate: formData.expirationDate,
            purchaseDate: formData.purchaseDate,
            quantity: formData.quantity,
            price: formData.price,
            advertStatus: 'Ongoing',
            category: formData.category,
            date: new Date(),
            store: formData.store,
            imageurl: encodedImage,
            type: advertType,
          } as Advert);
        }
        setErrors({
          productname: false,
          category: false,
          price: false,
          quantity: false,
          type: false,
        });
        if (props.onClose) props?.onClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => console.log(formData.quantity), [formData.quantity]);

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
              </Form.Group>
            </Col>
            <Col>
              <div
                style={{
                  backgroundColor: encodedImage ? undefined : 'lightgray',
                  width: 160,
                  height: 160,
                  position: 'absolute',
                  right: matches ? 100 : 50,
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div>
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
                </div>
                <Image
                  src={encodedImage}
                  alt="Advert Image"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
                    (e.currentTarget.src = defaultPostAdvertImage)
                  }
                  style={{
                    width: encodedImage ? '100%' : '30%',
                    objectFit: 'cover',
                    aspectRatio: '1/1',
                    cursor: 'pointer',
                  }}
                  fluid
                  onClick={handleImageClick}
                />
              </div>
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
                  isInvalid={!!errors.productname}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.productname}
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
                  placeholder="Product Category"
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
              <Form.Group>
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
                  {' '}
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
                  step={10}
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
                  {' '}
                  Description
                </Form.Label>
                <Form.Control
                  style={{
                    padding: 10,
                    color: palette.gray,
                    margin: 5,
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
          onClick={handleSubmit}
          style={{
            background: palette.subSectionsBgAccent,
            borderColor: palette.subSectionsBgAccent,
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
