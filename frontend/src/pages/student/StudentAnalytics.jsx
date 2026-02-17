import { useEffect, useState } from 'react';
import api from '../../api/client';
import { useAuth } from '../../context/AuthContext';

const StudentAnalytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    if (user?.studentProfile?._id) {
      api.get(`/analytics/student/${user.studentProfile._id}`).then((res) => setAnalytics(res.data));
    }
  }, [user]);

  if (!analytics) return <p>Loading analytics...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Performance Intelligence</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-2">Prediction</h3>
          <p>Predicted Grade: <strong>{analytics.performance.predictedGrade}</strong></p>
          <p>Pass Probability: <strong>{analytics.performance.passProbability}%</strong></p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-2">Dropout Risk</h3>
          <p className="text-red-600 font-medium">{analytics.dropoutRisk.risk}</p>
          <p className="text-sm text-slate-600">{analytics.dropoutRisk.reason}</p>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Attendance Insight</h3>
        <p>{analytics.attendanceTrend.insight}</p>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">AI Recommendations</h3>
        <ul className="list-disc pl-5 space-y-1">
          {analytics.recommendations.map((rec) => <li key={rec}>{rec}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default StudentAnalytics;
