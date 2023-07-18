import React, { FC, useContext, useRef, useState } from 'react';
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import {
  Advert,
  updateAdvert,
  createAdvert,
  ProductCategory,
  PopulatedAdvert,
} from '../../api/collections/advert';
import { ChromePicker } from 'react-color';
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
import 'bootstrap/dist/css/bootstrap.min.css';
import colorPicker  from '../../assets/colour-picker.svg'
type EditAdvertContentProps = {
  isShowing: boolean;
  onClose: () => void;
  advert?: PopulatedAdvert;
};

function mapColorName(hex: string): string | undefined {
  switch(hex.toUpperCase()) {
    case '#0000FF': 
    return 'Blue';
    case '#FF0000':
      return 'Red';
    case '#008000':
      return 'Green';
    case '#000000':
      return 'Black';
    case '#FFFFFF':
      return 'White'  
    case '#FFC0CB':
      return 'Pink';
    case '#FFFF00':
      return 'Yellow';
    case '#FFA500':
      return 'Orange';
    case '#A020F0': 
    return 'Purple';
    default: 
    return undefined;
  }

}
export const EditAdvertModal: FC<EditAdvertContentProps> = (props) => {
  const { user, loggedIn } = useContext(LoginContext);

  const matches = useMediaQuery('(min-width: 992px)');

  const fileInputRef = useRef<HTMLInputElement>(null); // to handle the upload of the image

  const [encodedImage, setEncodedImage] = useState(
    props.advert?.imageurl ?? '',
  );
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const [advertType, setAdvertType] = useState(
    props.advert?.type ? props.advert?.type : 'Sell',
  );

  const handleType = (event: any) => {
    setAdvertType(event.target.value);
  };

  const [formData, setFormData] = useState({
    productname: props.advert?.productname ?? undefined,
    description: props.advert?.description ?? undefined,
    prioritized: props.advert?.prioritized ?? false,
    color: props.advert?.color ?? undefined,
    purchaseDate: props.advert?.purchaseDate
      ? props.advert?.purchaseDate.toString().substring(0, 10)
      : undefined,
    expirationDate: props.advert?.expirationDate
      ? props.advert.expirationDate.toString().substring(0, 10)
      : undefined,
    Quantity: props.advert?.quantity ?? undefined,
    Price: props.advert?.price ?? undefined,
    category: props.advert?.category ?? '',
    store: props.advert?.store ?? user?._id,
  });
  const [errors, setErrors] = useState({
    productname: '',
    category: '',
    Price: '',
    Quantity: '',
  });

  const handleChange = (event: any) => {
    // we put type any because we are handling various events, such as HTML input, HTML select ecc
    const { name, value, type } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) : value,
    });
    setErrors({
      ...errors,
      [name]: value
        ? type === 'number'
          ? parseInt(value) > 0
            ? ''
            : `${name} must be higher than 0`
          : ''
        : `${name} is missing`,
    });
  };

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

  const isValid = () => {
    return (
      formData.productname &&
      formData.category &&
      formData.Price &&
      formData.Quantity
    );
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!loggedIn) {
      navigate('/signIn');
    }
    if (isValid()) {
      try {
        if (props.advert?._id) {
          await updateAdvert(props.advert._id, {
            productname: formData.productname,
            description: formData.description,
            color: formData.color ?? undefined,
            expirationDate: new Date(formData.expirationDate ?? ''),
            purchaseDate: new Date(formData.purchaseDate ?? ''),
            quantity: formData.Quantity,
            price: formData.Price,
            category: formData.category,
            imageurl: encodedImage,
          } as Advert);
        } else {
          
          await createAdvert({
            productname: formData.productname,
            description: formData.description,
            prioritized: false,
            color: formData.color ?? undefined,
            expirationDate: new Date(formData.expirationDate ?? ''),
            purchaseDate: new Date(formData.purchaseDate ?? ''),
            quantity: formData.Quantity,
            price: formData.Price,
            status: 'Ongoing',
            category: formData.category,
            createdAt: new Date(),
            store: user?._id,
            imageurl: encodedImage,
            type: advertType,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (props.onClose) props?.onClose();
      }
    } else {
      setErrors({
        productname: formData.productname ? '' : 'Product Name is missing',
        category: formData.category ? '' : 'Category is missing',
        Price: formData.Price
          ? formData.Price > 0
            ? ''
            : 'Price must be greater than 0'
          : 'Price is missing',
        Quantity: formData.Quantity
          ? formData.Quantity > 0
            ? ''
            : 'Quantity must be greater than 0'
          : 'Quantity is missing',
      });
    }
  };

  const [showPicker, setShowPicker ] = useState(false);
  
  const handleColorChange = (selectedColor: any) => {
    setFormData({
      ...formData, 
      color: {
        name: selectedColor.name ?? mapColorName(selectedColor.hex),
        hex: selectedColor.hex
      }
    })
  };

  const handlePipetteClick = () => {
    setShowPicker(!showPicker)
  }

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
                  onChange={props.advert ? () => {} : handleType}
                  value={'Ask'}
                  checked={advertType === 'Ask'}
                />
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
                  isInvalid={!!errors.productname}
                ></Form.Control>
                <Form.Control.Feedback
                  style={{ paddingLeft: 10 }}
                  type="invalid"
                >
                  Product name is missing
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
                {
                  showPicker && 
                  <div ref={colorPickerRef} style={{ position: 'absolute', top: '1em', right: '3em' }}>
                <ChromePicker
                  color={formData.color?.hex}
                  onChange={ (color) => handleColorChange(color) }
                />
          </div>
                }
                <Form.Group style={{ position: 'relative' }}>
                <Form.Control style={{
                  padding: 10,
                  color: palette.gray,
                  margin: 5,
                }}  type="text" 
                name="color" 
                placeholder="Enter Color or Select" onChange={(e) => {
                    handleColorChange({'name': e.currentTarget.value });
                }} value={formData.color?.name ?? formData.color?.hex}></Form.Control>
                <div className="input-group-append">
                  <Button style={{ position: 'absolute', top: '0.33em', right: '-1em', background: 'transparent', borderColor: 'transparent', width: '15%'}} onClick={handlePipetteClick}>
                    <Image src={colorPicker}/>
                  </Button>
                </div>
                </Form.Group>
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
                  name="Quantity"
                  min={1}
                  step={1}
                  value={Number(formData.Quantity ?? '')}
                  onChange={handleChange}
                  required
                  isInvalid={!!errors.Quantity}
                ></Form.Control>
                <Form.Control.Feedback
                  style={{ paddingLeft: 10 }}
                  type="invalid"
                >
                  {errors.Quantity}
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
                  name="Price"
                  min={1}
                  value={Number(formData.Price ?? '')}
                  onChange={handleChange}
                  required
                  isInvalid={!!errors.Price}
                ></Form.Control>
                <Form.Control.Feedback
                  style={{ paddingLeft: 10 }}
                  type="invalid"
                >
                  {errors.Price}
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
