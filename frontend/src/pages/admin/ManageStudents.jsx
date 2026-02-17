import { useEffect, useState } from 'react';
import api from '../../api/client';

const initialState = {
  name: '',
  rollNo: '',
  email: '',
  department: '',
  semester: 1,
  attendancePercentage: 0,
  internalMarks: 0,
  assignmentCompletion: 0,
  previousCgpa: 0
};

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(initialState);

  const load = () => api.get('/students').then((res) => setStudents(res.data));
  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/students', { ...form, semester: Number(form.semester) });
    setForm(initialState);
    load();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Students</h2>
      <form onSubmit={submit} className="bg-white rounded-xl shadow p-4 grid md:grid-cols-3 gap-3">
        {Object.keys(initialState).map((field) => (
          <input
            key={field}
            className="border rounded p-2"
            placeholder={field}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}
        <button className="bg-slate-900 text-white rounded p-2">Add Student</button>
      </form>
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Name</th><th>Roll</th><th>Dept</th><th>Sem</th><th>Attend%</th><th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-b">
                <td>{student.name}</td><td>{student.rollNo}</td><td>{student.department}</td>
                <td>{student.semester}</td><td>{student.attendancePercentage}</td><td>{student.internalMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudents;
