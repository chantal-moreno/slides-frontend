import DashNavbar from './DashNavbar';
import { useLocation } from 'react-router-dom';

function Canvas() {
  const location = useLocation();
  const { presentation } = location.state;
  console.log(presentation);
  return (
    <>
      <DashNavbar />
      <h1>{presentation.title}</h1>
    </>
  );
}

export default Canvas;
