import DashNavbar from './DashNavbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import Presentation from './Presentation';
import Stack from 'react-bootstrap/Stack';
import OthersPresentations from './OthersPresentations';
import NewPresentation from './Modals/NewPresentation';

function Dashboard() {
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  return (
    <>
      <DashNavbar />
      <Container className="mt-5">
        {user ? <h1>{`Hi, ${user.nickname}`}</h1> : <h1>Welcome!</h1>}
        <Stack direction="horizontal" gap={1}>
          <div className="p-2">
            <h2>Your presentations</h2>
          </div>
          <div className="p-2">
            <Button variant="primary" onClick={() => setModalShow(true)}>
              New Presentation
            </Button>
            <NewPresentation
              show={modalShow}
              onHide={() => setModalShow(false)}
              userId={user?._id || null}
            />
          </div>
        </Stack>
        <hr />
        <Presentation userPresentations={user?.presentations || []} />
        <h2 className="mt-5">Others presentations</h2>
        <hr />
        <OthersPresentations userId={user?._id || null} />
      </Container>
    </>
  );
}

export default Dashboard;
