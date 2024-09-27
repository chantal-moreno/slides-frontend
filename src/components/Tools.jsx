import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

function Tools() {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        }}
      >
        <Stack direction="vertical" className="align-content-center">
          <div className="p-1">
            <Button variant="outline-primary">
              <i className="bi bi-square"></i>
            </Button>
          </div>
          <div className="p-1">
            <Button variant="outline-primary">
              <i className="bi bi-circle"></i>
            </Button>
          </div>
          <div className="p-1">
            <Button variant="outline-primary">
              <i className="bi bi-triangle"></i>
            </Button>
          </div>
          <div className="p-1">
            <Button variant="outline-primary">
              <i className="bi bi-fonts"></i>
            </Button>
          </div>
          <div className="p-1">
            <Button variant="outline-primary">
              <i className="bi bi-paint-bucket"></i>
            </Button>
          </div>
          <div className="p-1">
            <Button variant="outline-primary">
              <i className="bi bi-brush"></i>
            </Button>
          </div>
          <div className="p-1">
            <Form.Control
              type="color"
              id="exampleColorInput"
              defaultValue="#563d7c"
              title="Choose your color"
              style={{ width: '100%' }}
            />
          </div>
          <div className="p-1">
            <Button variant="outline-primary">
              <i className="bi bi-eraser"></i>
            </Button>
          </div>
        </Stack>
      </div>
    </>
  );
}

export default Tools;
