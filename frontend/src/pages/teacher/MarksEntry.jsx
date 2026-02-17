import { useState } from 'react';
import api from '../../api/client';

const MarksEntry = () => {
  const [form, setForm] = useState({
    student: '',
    subject: '',
    testName: '',
    score: 0,
    assignmentSubmitted: true,
    assignmentScore: 0
  });

  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/marks', { ...form, score: Number(form.score), assignmentScore: Number(form.assignmentScore) });
    setMessage('Marks added');
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-xl shadow p-4 space-y-3 max-w-xl">
      <h2 className="text-xl font-semibold">Add Internal Marks & Assignment</h2>
      <input className="border rounded p-2 w-full" placeholder="Student ID" onChange={(e) => setForm({ ...form, student: e.target.value })} />
      <input className="border rounded p-2 w-full" placeholder="Subject" onChange={(e) => setForm({ ...form, subject: e.target.value })} />
      <input className="border rounded p-2 w-full" placeholder="Test Name" onChange={(e) => setForm({ ...form, testName: e.target.value })} />
      <input type="number" className="border rounded p-2 w-full" placeholder="Score" onChange={(e) => setForm({ ...form, score: e.target.value })} />
      <label className="flex gap-2 items-center"><input type="checkbox" defaultChecked onChange={(e) => setForm({ ...form, assignmentSubmitted: e.target.checked })} />Assignment submitted</label>
      <input type="number" className="border rounded p-2 w-full" placeholder="Assignment score" onChange={(e) => setForm({ ...form, assignmentScore: e.target.value })} />
      <button className="bg-slate-900 text-white rounded p-2">Save Marks</button>
      {message && <p className="text-green-600 text-sm">{message}</p>}
    </form>
  );
};

export default MarksEntry;
