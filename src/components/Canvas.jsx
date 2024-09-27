import DashNavbar from './DashNavbar';
import { useLocation } from 'react-router-dom';
import Tools from './Tools';

function Canvas() {
  const location = useLocation();
  const { presentation } = location.state;
  console.log(presentation);
  return (
    <>
      <DashNavbar />
      <h1>{presentation.title}</h1>
      <Tools />
    </>
  );
}

export default Canvas;
