import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { BiLogIn } from 'react-icons/bi';
import { FaSave } from 'react-icons/fa';
import { useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Register } from '../services/Auth';
import { MdCheckCircle } from 'react-icons/md';

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        if (!(name && email && mobile && password && confirmPassword)) {
            setError('All inputs are required')
            setLoading(false);
        } else if(password !== confirmPassword) {
            setError('Passwords do not match.')
            setLoading(false);
        } else {
            const response = await Register(name, email, mobile, password);
            if ("error" in response) {
                setError(response.error)
                setLoading(false);
            } else {
                setSuccess('User created successfully');
                setName('');
                setEmail('');
                setMobile('');
                setPassword('');
                setConfirmPassword('');
                setLoading(false);
        }
    }
}

    return (
        <Container>
            <Row className="justify-content-md-center my-5">
                <Card style={{ width: '50%' }} className="bg-light">
                    <Card.Body>
                        <Card.Title className="text-center display-6">Create an account</Card.Title>
                        { error && <Alert variant="danger"><FiAlertTriangle /> {error} </Alert> }
                        { success && <Alert variant="success"><MdCheckCircle /> <strong>{success} </strong></Alert> }
                        <Form onSubmit = {handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" controlid="name" value={name} onChange={(e) => {setName(e.target.value)}} required/>
                            </Form.Group>                            
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
                            </Form.Group>                            
                            <Form.Group className="mb-3">
                                <Form.Label>Mobile number</Form.Label>
                                <Form.Control type="text" placeholder="Enter mobile" value={mobile} onChange={(e) => {setMobile(e.target.value)}} pattern="[6-9][0-9]{9}" title="Enter Indian mobile number only" required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} required/>
                            </Form.Group>                            
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} required/>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 m-1" disabled={loading}>
                                <FaSave/> {loading ? "Loading" : "Submit"}
                            </Button>
                        </Form>
                        <hr />
                        <Row>
                            <small className="text-center">Already have an account?</small>
                            <Col>
                                <Link to="/login">
                                <Button variant="outline-success" type="submit" className="w-100 m-1 p-1">
                                <BiLogIn /> Login
                            </Button>
                                </Link>
                            </Col>
                        </Row>
                        </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}

export default RegisterPage;