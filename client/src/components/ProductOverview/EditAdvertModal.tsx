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
import { LoginContext } from '../../contexts/LoginContext';
import useMediaQuery from '../../hooks/useMediaQuery';

type EditAdvertContentProps = {
  isShowing: boolean;
  onClose: () => void;
  advert?: Advert;
};

const EditAdvertModal: FC<EditAdvertContentProps> = (props) => {
  const { user } = useContext(LoginContext);

  const matches = useMediaQuery('(min-width: 992px)');

  const fileInputRef = useRef<HTMLInputElement>(null); // to handle the upload of the image

  const [advertType, setAdvertType] = useState(props.advert?.type ?? '');

  const handleType = (event: any) => {
    setAdvertType(event.target.value);
  };
  const purchaseDate = props.advert?.purchaseDate
    ? props.advert.purchaseDate.toString().substring(0, 10)
    : '';
  const expirationDate = props.advert?.expirationDate
    ? props.advert.expirationDate.toString().substring(0, 10)
    : '';
  const [encodedImage, setEncodedImage] = useState(
    props.advert?.imageurl ?? '',
  );

  const [formData, setFormData] = useState({
    productname: props.advert?.productname ?? '',
    description: props.advert?.description ?? '',
    prioritized: props.advert?.prioritized ?? false,
    color: props.advert?.color ?? '',
    purchaseDate: purchaseDate,
    expirationDate: expirationDate,
    quantity: props.advert?.quantity ?? 0,
    price: props.advert?.price ?? 0,
    category: props.advert?.category ?? '',
    store: props.advert?.store ?? user?._id,
  });

  const handleChange = (event: any) => {
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
      console.log('Errors are happening');
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
            expirationDate: new Date(formData.expirationDate),
            purchaseDate: new Date(formData.purchaseDate),
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
            expirationDate: new Date(formData.expirationDate),
            purchaseDate: new Date(formData.purchaseDate),
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
                  }}
                >
                  Type:
                </Form.Label>
                <Form.Check
                  inline
                  required
                  type="radio"
                  label="Sell"
                  onChange={props.advert ? undefined : handleType}
                  value={'Sell'}
                  checked={advertType === 'Sell'}
                />
                <Form.Check
                  inline
                  required
                  type="radio"
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
                  />
                </div>
                <Image
                  src={encodedImage}
                  alt="Advert Image"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
                    (e.currentTarget.src = defaultPostAdvertImage)
                  }
                  style={{
                    width: encodedImage ? '100%' : '40%',
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
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label
                  style={{
                    paddingLeft: 10,
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
                  paddingLeft: 10,
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
                value={formData.purchaseDate}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label
                style={{
                  paddingLeft: 10,
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
                value={formData.expirationDate}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label
                  style={{
                    paddingLeft: 10,
                  }}
                >
                  {' '}
                  Quantity (pcs)
                </Form.Label>
                <Form.Control
                  style={{
                    padding: 10,
                    color: palette.gray,
                    margin: 5,
                  }}
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
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
                  value={formData.price}
                  onChange={handleChange}
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

export { EditAdvertModal };
