import { Outlet } from 'react-router-dom';
import Nav from '../components/nav.jsx';
const MainLayouts = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default MainLayouts;
