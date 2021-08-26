import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { SiReact } from 'react-icons/si';
import { GoSignOut } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { ImHome } from 'react-icons/im';
import { FaComment, FaUsers, FaRegNewspaper, FaUserAlt } from 'react-icons/fa';


const NavigationBar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleSignOut = async (e) => {
      e.preventDefault();
      setCurrentUser({ name: null, email: null, mobile: null, id: null, token: null })
  }

 return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <SiReact /> MERN Blogger</Navbar.Brand>
        <Nav className="me-auto">
        </Nav>
        {currentUser.id && 
                <>
                <Nav className="p-2">
                  <Link to="/">
                  <Button variant="outline-warning">
                    <ImHome /> Home</Button>
                  </Link>
                </Nav>
                <Nav className="p-2">
                  <Link to="/users">
                  <Button variant="outline-warning">
                    <FaUsers /> Show Users</Button>
                  </Link>
                </Nav>                 
                <Nav className="p-2">
                  <Link to="/articles">
                  <Button variant="outline-warning">
                    <FaRegNewspaper /> Show Articles</Button>
                  </Link>
                </Nav>          
                <Nav className="p-2">
                  <Link to="/createarticle">
                  <Button variant="outline-warning">
                    <FaComment /> Create Article</Button>
                  </Link>
                </Nav>                
                <Nav className="p-2">
                  <Link to="/account">
                  <Button variant="outline-warning">
                    <FaUserAlt /> My Account</Button>
                  </Link>
                </Nav>
                <Nav className="p-2">
                  <Button variant="outline-warning" onClick={handleSignOut}>
                    <GoSignOut /> Sign Out</Button>
                </Nav>
              </>
        }
      </Container>
    </Navbar>
 )   
}

export default NavigationBar;