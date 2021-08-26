import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CreateNewArticle, UpdateArticle } from '../services/Article';
import AuthContext from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Alert from 'react-bootstrap/Alert';
import { BiCommentDetail } from 'react-icons/bi';
import { FaDatabase, FaUndoAlt } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { MdCheckCircle } from 'react-icons/md';
import { useEffect } from 'react';


const CreateArticle = () => {
    const location = useLocation();
    const [id, setId] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (location.state !== undefined) {
            setId(location.state.id);
            setTitle(location.state.title);
            setContent(location.state.content);
        }
    }, [location.state])

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (!(title && content)) {
            setError('All fields are required.');
            setLoading(false);
        } else {
            const response = !id ? await CreateNewArticle(title, content, currentUser.token) : await UpdateArticle(id, title, content, currentUser.token);
            if ("error" in response) {
                setError(response.error);
                setLoading(false);
            } else {
                !id ? setSuccess(`New Article created with ID: ${response.id}`) : setSuccess(response.message);
                setLoading(false);
                setTitle('');
                setContent('');
            }
        }
    }
    return (
        <Container className="bg-dark rounded-3 text-white">
            <Row className="justify-content-md-center my-5 p-5">
                <Row className="px-4">
                    { error && <Alert variant="danger">
                        <FiAlertTriangle /> <strong>{error} </strong></Alert> }
                    { success && <Alert variant="success">
                        <MdCheckCircle /> <strong>{success} </strong></Alert> }
                </Row>
                <h1 className="display-5 fw-bold p-2">
                    <BiCommentDetail /> {id ? "Update" : "Create"} an article..</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Article Author" className="text-dark">
                            <Form.Control type="text" placeholder="Article Author" value={currentUser.email} readOnly />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Article Title" className="text-dark">
                            <Form.Control type="text" placeholder="Article Title" id="title" name="title" value={title}
                                onChange={(e)=> {setTitle(e.target.value)}}/>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Article Content" className="text-dark">
                            <Form.Control as="textarea" style={{height: '200px'}} placeholder="Article Content"
                                id="content" name="content" value={content} onChange={(e)=>
                                {setContent(e.target.value)}} />
                        </FloatingLabel>
                    </Form.Group>
                    <Button variant="outline-warning" type="submit" size="lg" disabled={loading}>
                        <FaDatabase /> {loading ? "Submitting" : "Submit"}
                    </Button>
                    <Button variant="outline-light" type="reset" size="lg" disabled={loading} className="mx-2"
                        onClick={()=> {
                        setTitle('');
                        setContent('');
                        }}>
                        <FaUndoAlt /> Reset
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}

export default CreateArticle;