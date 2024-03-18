import "./App.css";
import "../node_modules/video-react/dist/video-react.css";
import { Route, Routes } from "react-router-dom";
import AdminRoute from "./components/core/Auth/AdminRoute";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Error from "./pages/Error";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/Email";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Profile from "./components/core/DashboardPage/Profile";
import DashBoardLayout from "./pages/DashBoardLayout";
import EnrolledCourses from "./components/core/DashboardPage/EnrolledCourses";
import Settings from "./components/core/DashboardPage/Settings";
import Index from "./components/core/DashboardPage/AddCourse/Index";
import MyCourses from "./components/core/DashboardPage/MyCourses";
import EditCourse from "./components/core/DashboardPage/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import Cart from "./components/core/DashboardPage/Cart/Cart";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import CheckoutCompleted from "./pages/CheckoutCompleted";
import StudentRoute from "./components/core/Auth/StudentRoute";
import InstructorRoute from "./components/core/Auth/InstructorRoute";
import AiCourse from "./pages/AiCourse";
import AddCategory from "./components/core/DashboardPage/AddCategory/AddCategory";
import Instructor from "./components/core/DashboardPage/InstructorDashboard/Instructor";
function App() {
  return (
    <div className="min-h-screen bg-richblack-900 font-inter">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="catalog/:catalogName" element={<Catalog />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route element={<OpenRoute />}>
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="update-password/:token" element={<UpdatePassword />} />
            <Route path="verify-email" element={<VerifyEmail />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<DashBoardLayout />}>
              <Route path="my-profile" element={<Profile />} />
              <Route element={<StudentRoute />}>
                <Route path="cart" element={<Cart />} />
                <Route path="enrolled-courses" element={<EnrolledCourses />} />
              </Route>
              <Route path="settings" element={<Settings />} />
              <Route element={<InstructorRoute />}>
                <Route path="instructor" element={<Instructor/>}/>
                <Route path="add-course" element={<Index />} />
                <Route path="my-courses" element={<MyCourses />} />
                
                <Route path="edit-course/:id" element={<EditCourse />} />
              </Route>
              <Route element={<AdminRoute />}>
                <Route path="admin-panel" element={<AddCategory />} />
              </Route>
            </Route>
          </Route>
          <Route element={<StudentRoute />}>
            <Route path="checkout-completed" element={<CheckoutCompleted />} />
          </Route>
          <Route path="courses/:courseId" element={<CourseDetails />} />
         
          <Route element={<StudentRoute />}>
            <Route path="view-course/:courseId" element={<ViewCourse />} />
          </Route>
          <Route element={<InstructorRoute />}>
          <Route path="ai-course" element={<AiCourse />} />
          </Route>
          
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
