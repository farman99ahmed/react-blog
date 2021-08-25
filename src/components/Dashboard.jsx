import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FaMobileAlt, FaPrayingHands } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';


const Blogs = (props) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Container className="bg-dark rounded-3 text-white">
            <Row className="justify-content-md-center my-5 p-5">
                <h1 className="display-4 fw-bold p-2 text-center"><FaPrayingHands /> Welcome, {currentUser.name}</h1>
                <h1 className="display-6 p-2 text-center"><MdEmail  /> {currentUser.email}</h1>
                <h1 className="display-6 p-2 text-center"><FaMobileAlt />{currentUser.mobile}</h1>
            </Row>
        </Container>
    )
}

export default Blogs;