import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { FaMobileAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import image from '../assets/image.png';


const Blogs = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Container className="bg-dark rounded-3 text-white">
            <Row className="justify-content-md-center my-5 p-5">
                <Col xs={6} md={3} className="text-center">
                <Image src={currentUser.picture || image} height={180} width={180} roundedCircle />
                </Col>
                <h1 className="display-4 fw-bold p-2 text-center">{currentUser.name}</h1>
                <h1 className="display-6 p-2 text-center"><MdEmail  /> {currentUser.email}</h1>
                <h1 className="display-6 p-2 text-center"><FaMobileAlt />{currentUser.mobile}</h1>
            </Row>
        </Container>
    )
}

export default Blogs;