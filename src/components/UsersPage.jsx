import { useContext, useEffect, useState } from 'react';
import { AllUsers } from '../services/User';
import AuthContext from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { FaUsers } from 'react-icons/fa';
import Placeholder from 'react-bootstrap/Placeholder';

const UsersPage = () => {
    const { currentUser } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        async function fetchUsers() {
            let response = await AllUsers(currentUser.token);
            setUsers(response);
        }
        fetchUsers();

        //Cleanup
        return () => {
            setUsers([])
        }
    }, [currentUser])

    return (
        <>
            <Container className="bg-dark rounded-3 text-white">
                <Row className="justify-content-md-center my-5 p-3">
                    <h1 className="display-4 fw-bold p-2 text-center">
                        <FaUsers /> Users..</h1>
                </Row>
            </Container>
            <Container className="bg-light rounded-3 text-white">
                {users.length === 0 &&
                <Placeholder as="p" animation="glow">
                    <Placeholder xs={12} bg="dark" />
                    <Placeholder xs={10} bg="dark" />
                    <Placeholder xs={8} bg="dark" />
                </Placeholder>
                }
                {users.length > 0 &&
                <Table striped bordered hover responsive size="sm" className="my-3 p-3">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                        return (
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                        </tr>
                        )
                        })}
                    </tbody>
                </Table>
                }
            </Container>
        </>
    )
}

export default UsersPage;