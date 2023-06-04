import React from 'react';
import { Form, FloatingLabel} from 'react-bootstrap';
import {Title} from "../../Text/Title";
import {AccountInformationFormProps} from "./StoreDetailsForm";

const AccountInformationForm = (props: AccountInformationFormProps) => {
    // const [category, setCategory] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [phone, setPhone] = useState('');
    //
    // const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setCategory(event.target.value);
    // };
    //
    // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setEmail(e.target.value);
    // };
    //
    // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setPassword(e.target.value);
    // };
    //
    // const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setPhone(e.target.value);
    // };
    //
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     // Handle form submission here
    // };

    return (
        <>
            <Title style={{}}>
                <h2>Account Information</h2>
            </Title>
            {/*<Form onSubmit={handleSubmit} className={'p-2'}>*/}
            {/*    <FloatingLabel className="mb-3" controlId="category" label='Category'>*/}
            {/*        <Form.Control as="select" value={props.category.value} onChange={props.category.onChange}>*/}
            {/*            {categories.map((category) => (*/}
            {/*                <option key={category} value={category}>*/}
            {/*                    {category}*/}
            {/*                </option>*/}
            {/*            ))}*/}
            {/*        </Form.Control>*/}
            {/*    </FloatingLabel>*/}

                <FloatingLabel className="mb-3" controlId="email" label='Email Address'>
                    <Form.Control type="email" value={props.email.value} onChange={props.email.onChange} autoComplete='username'/>
                </FloatingLabel>

                <FloatingLabel className="mb-3" controlId="password" label='Password'>
                    <Form.Control type="password" value={props.password.value} onChange={props.password.onChange} autoComplete='current-password' />
                </FloatingLabel>

                <FloatingLabel className="mb-3" controlId="phone" label='Phone Number'>
                    <Form.Control type="tel" value={props.phone.value} onChange={props.phone.onChange} />
                </FloatingLabel>

                {/*<Row className={'mb-2 justify-content-end '}>*/}
                {/*    <Col xs={1} >*/}
                {/*        <Button type="submit" className={'mb-2'}*/}
                {/*                style={{*/}
                {/*                    width: "100%",*/}
                {/*                    border: "none",*/}
                {/*                    backgroundColor: palette.subSectionsBgAccent,*/}
                {/*                    borderRadius: 30,*/}
                {/*                }}*/}
                {/*        >*/}
                {/*            Save*/}
                {/*        </Button>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
            {/*</Form>*/}
        </>
    );
};

export default AccountInformationForm;