import React, {useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {palette} from "../../../utils/colors";
import AccountInformationForm from "./AccountInformationForm";
import ShipmentDetailsForm from "./ShipmentDetailsForm";
import PaymentDetailsForm from "./PaymentDetailsForm";
import StoreDetailsHeader from "./StoreDetailsHeader";
import {Address, PaymentMethod, updateUser, User} from "../../../api/collections/user";


export interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AccountInformationFormProps {
    // category: InputProps;
    email: InputProps;
    password: InputProps;
    phone: InputProps;
}

export interface ShipmentDetailsFormProps {
    streetName: InputProps;
    houseNumber: InputProps;
    city: InputProps;
    postalCode: InputProps;
    country: InputProps;
}

export interface PaymentDetailsFormProps {
    cardHolder: InputProps;
    cardNumber: InputProps;
    ccv: InputProps;
    expiration: InputProps;
}

export interface StoreDetailsProps {
    name: InputProps;
    image: { value: string; setValue: React.Dispatch<React.SetStateAction<string>> };
    joined: Date;
}

const StoreDetailsForm: React.FC = () => {
    const [name, setName] = useState<string>('Petals & Blooms');
    const [image, setImage] = useState<string>('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setName(e.target.value);
    };

    // const [category, setCategory] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');


    // const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     // console.log(e.target.value);
    //     setCategory(e.target.value);
    // };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setPassword(e.target.value);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setPhone(e.target.value);
    };

    const [streetName, setStreetName] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const handleStreetNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setStreetName(e.target.value);
    };

    const handleHouseNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setHouseNumber(e.target.value);
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setCity(e.target.value);
    };

    const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setPostalCode(e.target.value);
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setCountry(e.target.value);
    };

    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiration, setExpiration] = useState('');

    const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setCardHolder(e.target.value);
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setCardNumber(e.target.value);
    };

    const handleCcvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setCvv(e.target.value);
    };

    const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setExpiration(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const address: Address = {
            street: streetName || undefined,
                houseNumber: houseNumber || undefined,
                city: city || undefined,
                postalCode: postalCode || undefined,
                country: country || undefined
        }
        const paymentMethod: PaymentMethod = {
            name: cardHolder || undefined,
            cardNumber: cardNumber || undefined,
            cvv: cvv || undefined,
            expirationDate: expiration ? new Date(expiration) : undefined
        }
        const user: User = {
            name: name || undefined,
            email: email || undefined,
            password: password || undefined,
            phoneNumber: phone || undefined,
            ...(Object.values(address).some(value => value !== undefined) && { address }),
            ...(Object.values(paymentMethod).some(value => value !== undefined) && { paymentMethod }),
        };
        updateUser('6470eb87fc895db57a6599c7', user); // TODO: get user id from auth
    };

    return (
        <>
            <Form onSubmit={handleSubmit} className={"m-2"}>
                <StoreDetailsHeader name={{value: name, onChange: handleNameChange}}
                                    image={{value: image, setValue: setImage}} joined={new Date()}/>
                <AccountInformationForm
                //     category={{
                //     value: category,
                //     onChange: handleCategoryChange,
                // }}
                email={{
                    value: email,
                    onChange: handleEmailChange,
                }} password={{
                    value: password,
                    onChange: handlePasswordChange,
                }} phone={{
                    value: phone,
                    onChange: handlePhoneChange,
                }}/>
                <ShipmentDetailsForm streetName={{
                    value: streetName,
                    onChange: handleStreetNameChange,
                }} houseNumber={{
                    value: houseNumber,
                    onChange: handleHouseNumberChange,
                }} city={{
                    value: city,
                    onChange: handleCityChange,
                }} postalCode={{
                    value: postalCode,
                    onChange: handlePostalCodeChange,
                }} country={{
                    value: country,
                    onChange: handleCountryChange,
                }}/>
                <PaymentDetailsForm cardHolder={{
                    value: cardHolder,
                    onChange: handleCardHolderChange,
                }} cardNumber={{
                    value: cardNumber,
                    onChange: handleCardNumberChange,
                }} ccv={{
                    value: cvv,
                    onChange: handleCcvChange,
                }} expiration={{
                    value: expiration,
                    onChange: handleExpirationChange,
                }}/>
                <Row className={'mb-2 justify-content-end '}>
                    <Col xs={1}>
                        <Button type="submit" className={'mb-2'}
                                style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: palette.subSectionsBgAccent,
                                    borderRadius: 30,
                                }}
                        >
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default StoreDetailsForm;
