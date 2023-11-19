import { Route, Navigate, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import UserDashboard from "@/pages/user/home/UserDashboard";
import MoodTracker from "@/pages/user/mood-tracker/MoodTracker.jsx";
import Journal from "@/pages/user/journal/Journal.jsx";
import Counseling from "@/pages/user/counseling/Counseling.jsx";
import WellnessCenter from "@/pages/user/wellness-center/WellnessCenter.jsx";
import Booking from "../pages/user/booking/Booking";
import Chatbots from "@/pages/user/chatbot/Chatbots";

import PsychologistDashboard from "@/pages/psychologist/default";
import Schedule from "@/pages/psychologist/schedules";
import Appointment from "@/pages/psychologist/dataTables";
import Profile from "@/pages/psychologist/profile";

import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import AdminAppointmentDetail from "../pages/admin/AppointmentDetail.jsx";
// import Resource from "../pages/admin/Resource.jsx";

// user
import User from "../pages/admin/user/UserList.jsx";
import UserDetail from "../pages/admin/user/UserDetail.jsx";
import UserEdit from "../pages/admin/user/UserEdit.jsx";

//qna
import Qna from "../pages/admin/qna/QnaList.jsx";
import QnaCreate from "../pages/admin/qna/QnaCreate.jsx";
import QnaEdit from "../pages/admin/qna/QnaEdit.jsx";

// psychologyst
import List from "../pages/admin/psychologist/List.jsx";
import Detail from "../pages/admin/psychologist/Detail.jsx";
import Edit from "../pages/admin/psychologist/Edit.jsx";

import Resource from "../pages/admin/Resource.jsx";

import SidebarLayout from "@/layouts/SidebarLayout.jsx";
import Login from "@/pages/auth/Login.jsx";
import Register from "@/pages/auth/Register.jsx";

import { ADMIN_MENU, PSYCHOLOGIST_MENU, USER_MENU } from "@/constants/sidebar.js";
import PsychologistDetails from "@/pages/user/counseling/psyDetail.component";
import CounselingPayment from "@/pages/user/counseling/CounselingPayment";
import AppointmentDetail from "@/pages/psychologist/dataTables/AppointmentDetail";
import CounselingPaymentDone from "@/pages/user/counseling/CounselingPaymentDone";
import FormCounselingResult from "@/pages/psychologist/dataTables/components/FormCounselingResult";


const ProtectedRoute = ({ children, roles }) => {
  const userRole = localStorage.getItem("roles");
  const isAuthenticated = userRole === roles;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const routes = createRoutesFromElements(
  <>
    <Route roles='user' path="/u" element={<ProtectedRoute roles='user'><SidebarLayout menu={USER_MENU} /></ProtectedRoute>}>
      <Route index element={<UserDashboard />}></Route>
      <Route path="profile" element={<UserDetail />}></Route>
      <Route path="mood-tracker" element={<MoodTracker />}></Route>
      <Route path="journal" element={<Journal />}></Route>
      <Route path="counseling" element={<Counseling />}></Route>
      <Route path="counseling/:id" element={<Booking />}></Route>
      <Route path="counseling/:id/payment" element={<CounselingPayment />}></Route>
      <Route path="counseling/:id/payment/done" element={<CounselingPaymentDone />}></Route>
      <Route path="wellness-center" element={<WellnessCenter />}></Route>
      <Route path="chatbot" element={<Chatbots />}></Route>
    </Route>
    <Route path="/p" element={<ProtectedRoute roles='psychologist'><SidebarLayout menu={PSYCHOLOGIST_MENU} /></ProtectedRoute>}>
      <Route index element={<PsychologistDashboard />}></Route>
      <Route path="details/:id" element={<PsychologistDetails />} />
      <Route path="schedules" element={<Schedule />}></Route>
      <Route path="appointments" element={<Appointment />}></Route>
      <Route path="appointments/detail" element={<AppointmentDetail />}></Route>
      <Route path="appointments/detail/edit" element={<FormCounselingResult />}></Route>
      <Route path="profile" element={<Profile />}></Route>
    </Route>
    <Route path="/a" element={ <ProtectedRoute roles="admin"><SidebarLayout menu={ADMIN_MENU} /></ProtectedRoute>}>
      <Route index element={<AdminDashboard />} />
        <Route path="users">
          <Route index element={<User />} />
          <Route path=":id" element={<UserDetail />} />
          <Route path="edit/:id" element={<UserEdit />} />
        </Route>
        <Route path="qna">
          <Route index element={<Qna />} />
          <Route path="QnaCreate" element={<QnaCreate />} />
          <Route path=":id" element={<UserDetail />} />
          <Route path="QnaEdit/:id" element={<QnaEdit />} />
        </Route>
        <Route path="psychologist">
          <Route index element={<List />} />
          <Route path=":id" element={<Detail />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="book/:id" element={<AdminAppointmentDetail />} />
        </Route>
        <Route path="resources" element={<Resource />} />
    </Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route>
    <Route path="/" element={<Navigate to="/u" />}></Route>
  </>
);

const router = createBrowserRouter(routes);

export default router;
