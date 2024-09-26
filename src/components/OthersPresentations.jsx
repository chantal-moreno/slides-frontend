import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function OthersPresentations({ userId }) {
  const [presentations, setPresentations] = useState([]);
  const [ownerNicknames, setOwnerNicknames] = useState({});
  const navigate = useNavigate();
  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy - HH:mm');
  };
  useEffect(() => {
    if (!userId) {
      console.error('UserID undefined');
      return;
    }
    const fetchPresentations = async () => {
      const server = 'http://localhost:3000';
      try {
        const response = await axios.get(
          `${server}/presentations/exclude/${userId}`
        );
        const presentationsData = response.data;
        setPresentations(presentationsData);

        // owners nicknames
        const ownerIds = presentationsData.map(
          (presentation) => presentation.owner
        );
        const uniqueOwnerIds = [...new Set(ownerIds)]; // avoid duplicates

        const ownerNicknamesPromises = uniqueOwnerIds.map((ownerId) =>
          axios.get(`${server}/users/${ownerId}/nickname`)
        );

        const ownerNicknamesResponses = await Promise.all(
          ownerNicknamesPromises
        );
        const nicknamesMap = ownerNicknamesResponses.reduce(
          (acc, response, index) => {
            acc[uniqueOwnerIds[index]] = response.data.nickname;
            return acc;
          },
          {}
        );

        setOwnerNicknames(nicknamesMap);
      } catch (error) {
        console.error(
          'Error fetching presentations and owners nicknames:',
          error
        );
      }
    };
    fetchPresentations();
  }, [userId]);

  const handleOpen = (presentation) => {
    navigate('/canvas', { state: { presentation } });
  };

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
              <Card.Subtitle className="mb-2 text-muted">
                {`Owner:  ${ownerNicknames[presentation.owner] || 'Unknown'}`}
              </Card.Subtitle>
              <Button
                variant="primary"
                onClick={() => handleOpen(presentation)}
              >
                Open
              </Button>
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

OthersPresentations.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default OthersPresentations;
