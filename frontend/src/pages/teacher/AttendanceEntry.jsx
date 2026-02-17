import { useState } from 'react';
import api from '../../api/client';

const AttendanceEntry = () => {
  const [form, setForm] = useState({ student: '', date: '', status: 'present' });
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/attendance', form);
    setMessage('Attendance saved successfully');
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-xl shadow p-4 space-y-3 max-w-lg">
      <h2 className="text-xl font-semibold">Add Daily Attendance</h2>
      <input className="border rounded p-2 w-full" placeholder="Student ID" onChange={(e) => setForm({ ...form, student: e.target.value })} />
      <input type="date" className="border rounded p-2 w-full" onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <select className="border rounded p-2 w-full" onChange={(e) => setForm({ ...form, status: e.target.value })}>
        <option value="present">Present</option>
        <option value="absent">Absent</option>
      </select>
      <button className="bg-slate-900 text-white rounded p-2">Save Attendance</button>
      {message && <p className="text-green-600 text-sm">{message}</p>}
    </form>
  );
};

export default AttendanceEntry;
