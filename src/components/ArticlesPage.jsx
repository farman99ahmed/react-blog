import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import AuthContext from '../context/AuthContext';
import { useContext, useState } from 'react';
import { FaComments, FaComment, FaUserEdit, FaRegNewspaper, FaTrashAlt, FaEdit } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import Card from 'react-bootstrap/Card';
import { GetAllArticles, DeleteArticle } from '../services/Article';

const ArticlesPage = () => {
    const { currentUser } = useContext(AuthContext);
    const [articles, setArticles]= useState(null);
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(false);
    const history = useHistory();

    const getAllArticles = async (e, value) => {
        e.preventDefault();
        setLoading(true);
        const response = await (value ? GetAllArticles(currentUser.token, true) : GetAllArticles(currentUser.token))
        if ("error" in response) {
            alert(response.error);
            setLoading(false);
        } else {
            setArticles(response)
            setLoading(false);
            if (response.length === 0) alert('No articles created by you');
        }
    }

    const updateArticle = async (e, id, title, content) => {
        e.preventDefault();
        history.push({
            pathname: '/createarticle',
            state: {
                id,
                title,
                content
            },
          });
    }
    
    const deleteArticle = async (e, id) => {
        e.preventDefault();
        setLoading(true);
        const response = await DeleteArticle(currentUser.token, id);
        if ("error" in response) {
            alert(response.error);
            setLoading(false);
        } else {
            setLoading(false);
            getAllArticles(e, flag);
        }
    }

    return (
    <>
        <Container className="bg-dark rounded-3 text-white">
            <Row className="justify-content-md-center my-5 p-5">
                <h1 className="display-4 fw-bold p-2 text-center">
                    <FaRegNewspaper /> Articles..</h1>
                <Row>
                    <Col md={6}>
                    <Button variant="outline-warning" className="w-100 my-5 p-1" size="lg" onClick={(e)=>
                         {getAllArticles(e, false); setFlag(false); } } disabled={loading}>
                        <FaComments /> {loading ? "Loading" : "Show all articles"}
                    </Button>
                    </Col>
                    <Col md={6}>
                    <Button variant="outline-warning" className="w-100 my-5 p-1" size="lg" onClick={(e)=>
                         {getAllArticles(e, true); setFlag(true); } } disabled={loading}>
                        <FaComment /> {loading ? "Loading" : "Show my articles"}
                    </Button>
                    </Col>
                </Row>
            </Row>
        </Container>
        <Container>
            <Row>
                {articles && articles.map(article => {
                return (
                <Col md={3} key={article._id}>
                <Card bg="dark" text="light" className="mb-2">
                    <Card.Header>
                        <FaUserEdit /> {article.author}</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <FaComment /> {article.title} </Card.Title>
                        <Card.Text>{article.body}</Card.Text>
                        {article.author === currentUser.email && 
                        <>
                        <Button variant="outline-warning" size="sm" className="mx-1"
                            onClick={(e)=> updateArticle(e, article._id, article.title, article.body)} disabled={loading}>
                            <FaEdit /> Update</Button> 
                        
                        <Button variant="outline-danger" size="sm"
                            onClick={(e)=> deleteArticle(e, article._id)} disabled={loading}>
                            <FaTrashAlt /> Delete</Button>
                        </>
                        }
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">
                            <MdDateRange /> {article.createdAt}</small>
                    </Card.Footer>
                </Card>
                </Col>
                )
                })}
            </Row>
        </Container>
    </>
    )
}

export default ArticlesPage;