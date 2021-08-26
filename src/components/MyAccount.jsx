import { useState, useContext } from 'react';
import { ChangePassword, UpdateProfilePicture } from '../services/Auth';
import AuthContext from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Alert from 'react-bootstrap/Alert';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import { FaDatabase, FaUndoAlt, FaUnlockAlt, FaRegImage } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { MdCheckCircle } from 'react-icons/md';

const MyAccount = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    const clearScreen = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!(oldPassword && newPassword && confirmNewPassword)) {
            setError('All fields are required.');
            setLoading(false);
        } else if (newPassword !== confirmNewPassword) {
            setError('New password and confirm new password does not match.');
            setLoading(false);
        } else {
            const response = await ChangePassword(currentUser.token, oldPassword, newPassword);
            if ("error" in response) {
                setError(response.error);
                setLoading(false);
            } else {
                setSuccess(response.success)
                setLoading(false);
                clearScreen();
            }
        }
    }

    const handleProfilePictureUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(image);
        if (image.size > 500000) {
            setError('Maximum allowed size is 500 KB')
        } else if (!(['image/jpeg', 'image/png', 'image/jpg'].includes(image.type))) {
            setError('Only JPG/JPEG/PNG images are allowed.')
        } else {
            const response = await UpdateProfilePicture(currentUser.token, image);
            if ("error" in response) {
                setError(response.error);
                setLoading(false);
            } else {
                setSuccess(response.success)
                setCurrentUser({
                    id: currentUser.id,
                    name: currentUser.name,
                    email: currentUser.email,
                    mobile: currentUser.mobile,
                    picture: response.picture,
                    token: currentUser.token
                });
                setLoading(false);
                clearScreen();
            }
        }
    }
    return (
        <>
            <Container>
                <Row className="justify-content-md-center my-1 px-5 pt-5">
                    { error && <Alert variant="danger">
                        <FiAlertTriangle /> <strong>{error} </strong></Alert> }
                    { success && <Alert variant="success">
                        <MdCheckCircle /> <strong>{success} </strong></Alert> }
                </Row>
            </Container>
            <Container className="bg-dark rounded-3 text-white">
                <Row className="justify-content-md-center my-5 p-5">
                    <Tab.Container defaultActiveKey="first">
                        <Row>
                            <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Change Password</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Update Profile Picture</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </Col>
                            <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Container className="bg-dark rounded-3 text-white">
                                        <Row className="justify-content-md-center ">
                                            <h1 className="display-5 fw-bold p-2">
                                                <FaUnlockAlt /> Change password..</h1>
                                            <Form onSubmit={handlePasswordChange}>
                                                <Form.Group className="mb-3">
                                                    <FloatingLabel label="Old password" className="text-dark">
                                                        <Form.Control type="password" placeholder="Old password"
                                                            id="oldPassword" name="oldPassword" value={oldPassword}
                                                            onChange={(e)=>
                                                            {setOldPassword(e.target.value)}}/>
                                                    </FloatingLabel>
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <FloatingLabel label="New password" className="text-dark">
                                                        <Form.Control type="password" placeholder="New password"
                                                            id="newPassword" name="newPassword" value={newPassword}
                                                            onChange={(e)=>
                                                            {setNewPassword(e.target.value)}}/>
                                                    </FloatingLabel>
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <FloatingLabel label="Confirm new password" className="text-dark">
                                                        <Form.Control type="password" placeholder="Confirm new password"
                                                            id="confirmNewPassword" name="confirmNewPassword"
                                                            value={confirmNewPassword} onChange={(e)=>
                                                            {setConfirmNewPassword(e.target.value)}}/>
                                                    </FloatingLabel>
                                                </Form.Group>
                                                <Button variant="outline-warning" type="submit" size="lg"
                                                    disabled={loading}>
                                                    <FaDatabase /> {loading ? "Submitting" : "Submit"}
                                                </Button>
                                                <Button variant="outline-light" type="reset" size="lg"
                                                    disabled={loading} className="mx-2" onClick={()=> {
                                                    setError(null);
                                                    setSuccess(null);
                                                    clearScreen();
                                                    }}>
                                                    <FaUndoAlt /> Reset
                                                </Button>
                                            </Form>
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <Container className="bg-dark rounded-3 text-white">
                                        <Row className="justify-content-md-center">
                                            <h1 className="display-5 fw-bold p-2">
                                                <FaRegImage /> Update profile picture..</h1>
                                            <Form onSubmit={handleProfilePictureUpdate}>
                                                <Form.Group className="mb-3">
                                                    <Form.Control type="file" size="lg" id="image" name="image"
                                                        onChange={(e)=>
                                                        {setImage(e.target.files[0])}} />
                                                </Form.Group>
                                                <Button variant="outline-warning" type="submit" size="lg"
                                                    disabled={loading}>
                                                    <FaDatabase /> {loading ? "Submitting" : "Submit"}
                                                </Button>
                                                <Button variant="outline-light" type="reset" size="lg"
                                                    disabled={loading} className="mx-2" onClick={()=> {
                                                    setError(null);
                                                    setSuccess(null);
                                                    clearScreen();
                                                    }}>
                                                    <FaUndoAlt /> Reset
                                                </Button>
                                            </Form>
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Row>
            </Container>
        </>
    )
}

export default MyAccount;