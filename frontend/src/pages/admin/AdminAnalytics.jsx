import { useEffect, useState } from 'react';
import api from '../../api/client';
import AnalyticsDashboard from '../shared/AnalyticsDashboard';

const AdminAnalytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/analytics/class').then((res) => setData(res.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      <AnalyticsDashboard classAnalytics={data} />
    </div>
  );
};

export default AdminAnalytics;
