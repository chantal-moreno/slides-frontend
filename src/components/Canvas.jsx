import DashNavbar from './DashNavbar';
import { useLocation } from 'react-router-dom';
import Tools from './Tools';
import Slide from './Slide';

function Canvas() {
  const location = useLocation();
  const { presentation } = location.state;
  console.log(presentation);
  return (
    <>
      <DashNavbar />
      <h1>{presentation.title}</h1>
      <Tools />
      <Slide />
    </>
  );
}

export default Canvas;
