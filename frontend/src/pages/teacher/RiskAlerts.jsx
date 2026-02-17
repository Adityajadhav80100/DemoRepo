import { useEffect, useState } from 'react';
import api from '../../api/client';

const RiskAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    api.get('/analytics/class').then((res) => setAlerts(res.data.filter((d) => d.dropoutRisk.risk !== 'Low')));
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Risk Alerts</h2>
      {alerts.map((alert) => (
        <div key={alert.student._id} className="bg-white rounded shadow p-4 border-l-4 border-red-500">
          <p className="font-semibold">{alert.student.name} - {alert.dropoutRisk.risk} Risk</p>
          <p className="text-sm text-slate-600">{alert.dropoutRisk.reason}</p>
        </div>
      ))}
      {!alerts.length && <p>No alerts.</p>}
    </div>
  );
};

export default RiskAlerts;
