import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayouts.jsx';
import HomePage from './pages/HomePage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/loginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import UpdateProfile from './pages/UpdateProfile.jsx';
import New_appointmentPage from './pages/New_appointmentPage.jsx';
import NotFoundPage from './pages/notFoundPage.jsx';
import DepartmentsPage from './pages/DepartmentsPage.jsx';
import OneDepartmentPage from './pages/OneDepartmentPage.jsx';
import MyAppointmentsPage from './pages/Appointments.jsx';
import AdminControlPage from './pages/AdminControlPage.jsx';
import Edit_Department from './pages/Edit_Department.jsx';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/signUP" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/change_password" element={<ChangePassword />} />
        <Route path="/update_profile" element={<UpdateProfile />} />
        <Route path="/new_appointment" element={<New_appointmentPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/departments/:id" element={<OneDepartmentPage />} />
        <Route path="/appointment/my" element={<MyAppointmentsPage />} />
        <Route path="/admin" element={<AdminControlPage />} />
        <Route path="/edit_department/:id" element={<Edit_Department />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default App;
