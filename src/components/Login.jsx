import slideLogo from '../assets/logoipsum-245.svg';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    const server = 'http://localhost:3000';
    e.preventDefault();

    try {
      const response = await axios.post(`${server}/login`, { nickname });

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(response.data);
        // Go to dashboard
        navigate('/dashboard');
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('An error occurred while registering the user');
    }
  };
  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column justify-content-center align-items-center"
    >
      <div>
        <img src={slideLogo} className="logo" alt="Slides logo" />
      </div>
      <h1>Slides</h1>
      <Form as={Row} className="d-flex flex-column">
        <Col>
          <Form.Group className="mb-2">
            <Form.Label className="text-secondary">
              Enter a nickname to continue
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col className="text-center">
          <Button
            variant="primary"
            size="sm"
            type="submit"
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </Col>
      </Form>
    </Container>
  );
}

export default Login;

