import { useEffect, useState } from 'react';
import api from '../../api/client';

const AdminHome = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.get('/students').then((res) => setStudents(res.data)).catch(() => {});
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <p className="text-slate-600">Total students managed: {students.length}</p>
    </div>
  );
};

export default AdminHome;
