import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useState } from 'react';

function NewPresentation({ onHide, userId, show }) {
  const [title, setTitle] = useState('');
  const ownerId = userId;
  const handleSubmit = async (e) => {
    const server = 'http://localhost:3000';
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/presentation`, {
        title,
        ownerId,
      });

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        onHide();
        // Go canvas
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create new presentation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Enter title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

NewPresentation.propTypes = {
  onHide: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

export default NewPresentation;
