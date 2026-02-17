import { useAuth } from '../../context/AuthContext';

const StudentHome = () => {
  const { user } = useAuth();
  const profile = user.studentProfile;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Student Dashboard</h2>
      {profile ? (
        <div className="bg-white rounded-xl shadow p-4">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Department:</strong> {profile.department}</p>
          <p><strong>Semester:</strong> {profile.semester}</p>
          <p><strong>Attendance:</strong> {profile.attendancePercentage}%</p>
        </div>
      ) : (
        <p className="text-slate-500">No profile linked yet.</p>
      )}
    </div>
  );
};

export default StudentHome;
