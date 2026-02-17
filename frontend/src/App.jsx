import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminHome from './pages/admin/AdminHome';
import ManageStudents from './pages/admin/ManageStudents';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import TeacherHome from './pages/teacher/TeacherHome';
import AttendanceEntry from './pages/teacher/AttendanceEntry';
import MarksEntry from './pages/teacher/MarksEntry';
import RiskAlerts from './pages/teacher/RiskAlerts';
import StudentHome from './pages/student/StudentHome';
import StudentAnalytics from './pages/student/StudentAnalytics';

const HomeRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin') return <Navigate to="/admin" replace />;
  if (user.role === 'teacher') return <Navigate to="/teacher" replace />;
  return <Navigate to="/student" replace />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomeRedirect />} />

      <Route
        element={
          <ProtectedRoute roles={['admin', 'teacher', 'student']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminHome /></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute roles={['admin']}><ManageStudents /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute roles={['admin']}><AdminAnalytics /></ProtectedRoute>} />

        <Route path="/teacher" element={<ProtectedRoute roles={['teacher']}><TeacherHome /></ProtectedRoute>} />
        <Route path="/teacher/attendance" element={<ProtectedRoute roles={['teacher']}><AttendanceEntry /></ProtectedRoute>} />
        <Route path="/teacher/marks" element={<ProtectedRoute roles={['teacher']}><MarksEntry /></ProtectedRoute>} />
        <Route path="/teacher/alerts" element={<ProtectedRoute roles={['teacher']}><RiskAlerts /></ProtectedRoute>} />

        <Route path="/student" element={<ProtectedRoute roles={['student']}><StudentHome /></ProtectedRoute>} />
        <Route path="/student/analytics" element={<ProtectedRoute roles={['student']}><StudentAnalytics /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
};

export default App;
