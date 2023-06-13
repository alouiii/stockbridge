import React, { FC, useState } from 'react';
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import { updateAdvert } from '../../api/collections/advert';
import { Review, createReview } from '../../api/collections/review';
import { palette } from '../../utils/colors';
import { Ratings } from '../Ratings';

type EditReviewContentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    isShowing: boolean;
    onClose: () => void;
    advertID: string;
  }>;

const EditReviewModal: FC<EditReviewContentProps> = (props) => {
  const [formData, setFormData] = useState({
    description: '',
    rating: 0,
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
    description: false,
    rating: false,
  });
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    formData.rating = newRating;
  };
  // todo: check file format (only picture formats allowed)
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];
      if (file != undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {};
      }
    }
  };

  const validationErrors = {
    description: false,
    rating: false,
  };
  let currentUser: { [x: string]: any } | null = null;
  const localUser = localStorage.getItem('currentUser');
  if (localUser !== null) {
    currentUser = JSON.parse(localUser);
  }
  const handleSubmit = async () => {
    if (!formData.description) {
      validationErrors.description = true;
    }
    if (!formData.rating) {
      validationErrors.rating = true;
    }
    if (Object.values(validationErrors).some((e) => e)) {
      console.log('Errors are happening');
      setErrors(validationErrors);
    } else {
      try {
        if (props.advertID) {
          const createdReview = await createReview({
            description: formData.description,
            rating: formData.rating,
            reviewer: currentUser?._id,
            reviewedAdvert: props.advertID,
            createdAt: new Date(),
          } as Review);
          await updateAdvert(props.advertID, {
            reviews: [createdReview._id],
          });
        }
        setErrors({
          description: false,
          rating: false,
        });
        if (props.onClose) props?.onClose();
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <Modal show={props.isShowing} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'auto',
              gap: '70%',
            }}
          >
            <Form.Label
              style={{
                color: palette.gray,
              }}
            >
              Review
            </Form.Label>
            {Ratings(rating, handleRatingChange)}
          </Form.Group>
          <Form.Group>
            <Form.Control
              style={{
                padding: '10px',
                color: palette.gray,
                margin: '5px',
              }}
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="text-white"
          onClick={handleSubmit}
          style={{
            background: palette.green,
            borderColor: palette.green,
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { EditReviewModal };
