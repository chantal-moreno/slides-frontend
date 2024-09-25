import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

function Presentation({ userPresentations }) {
  const [presentations, setPresentations] = useState([]);

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy - HH:mm');
  };

  useEffect(() => {
    const fetchPresentations = async () => {
      const server = 'http://localhost:3000';

      try {
        const fetchPromises = userPresentations.map(async (presentationId) => {
          const response = await axios.get(
            `${server}/presentations/${presentationId}`
          );
          return response.data;
        });

        const presentationsData = await Promise.all(fetchPromises);
        setPresentations(presentationsData);
      } catch (error) {
        console.error('Error fetching presentations:', error);
      }
    };

    if (userPresentations && userPresentations.length > 0) {
      fetchPresentations();
    }
  }, [userPresentations]);

  if (!userPresentations || userPresentations.length === 0) {
    return <p>You have not created any presentation :c</p>;
  }

  return (
    <Row xs={1} md={2} lg={4} className="g-4">
      {presentations.map((presentation, index) => (
        <Col key={index}>
          <Card border="primary">
            <Card.Img
              variant="top"
              src={presentation.image || 'holder.js/100px160'}
            />
            <Card.Body>
              <Card.Title>{presentation.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {`Created: ${formatDate(presentation.createdAt)}`}
              </Card.Subtitle>
              <Button variant="primary">Open</Button>
            </Card.Body>
            <Card.Footer className="text-muted">
              {`Last modification: ${formatDate(presentation.updatedAt)}`}
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

Presentation.propTypes = {
  userPresentations: PropTypes.array.isRequired,
};

export default Presentation;
