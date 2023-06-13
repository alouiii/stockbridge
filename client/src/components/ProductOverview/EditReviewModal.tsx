import React, { FC, useState } from 'react';
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import { json } from 'react-router-dom';
import {
  Review,
  updateReview,
  createReview,
} from '../../api/collections/review';
import { palette } from '../../utils/colors';

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
    rating: false
  });

  // todo: check file format (only picture formats allowed)
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];
      if (file != undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          
        };
      }
    }
  };
  const validationErrors = {
    description: false,
    rating: false
  };
  let currentUser: { [x: string]: any } | null = null;
  const localUser = localStorage.getItem('currentUser');
  if (localUser !== null) {
    currentUser = JSON.parse(localUser);
  }
  const handleSubmit = async () => {
    if (!formData.description) {
      validationErrors.description= true;
    }
    if (!formData.rating) {
      validationErrors.rating = true;
    }
    if (Object.values(validationErrors).some((e) => e)) {
      console.log('Errors are happening');
      setErrors(validationErrors);
    } else {
      try {
        
          await createReview({
            description: formData.description,
            rating: formData.rating,
            reviewer: currentUser?._id,
            reviewedAdvert: props.advertID
          } as Review);
        setErrors({
          description: false,
          rating: false
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
        <Modal.Title>Review details:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
