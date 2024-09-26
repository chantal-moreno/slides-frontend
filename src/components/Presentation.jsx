import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

function Presentation({ userId }) {
  const [presentations, setPresentations] = useState([]);

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy - HH:mm');
  };

  useEffect(() => {
    const fetchPresentations = async () => {
      if (!userId) {
        console.error('UserID undefined');
        return;
      }

      const server = 'http://localhost:3000';

      try {
        const response = await axios.get(`${server}/users/${userId}`);
        console.log(response.data);
        setPresentations(response.data.presentations || []);
      } catch (error) {
        console.error('Error fetching presentations:', error);
      }
    };

    fetchPresentations();
  }, [userId]);

  return (
    <Row xs={1} md={2} lg={4} className="g-4">
      {presentations.map((presentation) => (
        <Col key={presentation._id}>
          <Card border="primary">
            <Card.Img variant="top" src={'holder.js/100px160'} />
            <Card.Body>
              <Card.Title>{presentation.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {`Created:  ${formatDate(presentation.createdAt)}`}
              </Card.Subtitle>
              <Button variant="primary">Open</Button>
            </Card.Body>
            <Card.Footer className="text-muted">
              {`Last modification:  ${formatDate(presentation.updatedAt)}`}
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

Presentation.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Presentation;
