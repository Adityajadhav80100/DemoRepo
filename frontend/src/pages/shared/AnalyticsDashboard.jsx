import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#22c55e', '#f59e0b', '#ef4444', '#3b82f6'];

const AnalyticsDashboard = ({ classAnalytics = [] }) => {
  const gradeDistribution = classAnalytics.reduce((acc, item) => {
    const grade = item.performance?.predictedGrade || 'Unknown';
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
  }, {});

  const gradeData = Object.entries(gradeDistribution).map(([name, value]) => ({ name, value }));
  const riskStudents = classAnalytics.filter((item) => item.dropoutRisk?.risk !== 'Low');

  const performanceData = classAnalytics.map((item) => ({
    name: item.student.name,
    score: item.performance?.passProbability || 0,
    attendance: item.student.attendancePercentage
  }));

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4 h-72">
          <h3 className="font-semibold mb-3">Class Performance Chart</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-4 h-72">
          <h3 className="font-semibold mb-3">Grade Distribution Pie Chart</h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie data={gradeData} dataKey="value" nameKey="name" outerRadius={90} label>
                {gradeData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3">Risk Students List</h3>
        <div className="space-y-2">
          {riskStudents.map((item) => (
            <div key={item.student._id} className="p-3 rounded border flex justify-between">
              <p>{item.student.name}</p>
              <span className="text-red-600 font-medium">{item.dropoutRisk.risk} Risk</span>
            </div>
          ))}
          {!riskStudents.length && <p className="text-slate-500">No immediate risk students.</p>}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3">Attendance Heatmap (Tabular)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {classAnalytics.map((item) => (
            <div
              key={item.student._id}
              className={`p-3 rounded text-white ${
                item.student.attendancePercentage > 75
                  ? 'bg-green-500'
                  : item.student.attendancePercentage > 60
                    ? 'bg-amber-500'
                    : 'bg-red-500'
              }`}
            >
              <p className="text-sm">{item.student.name}</p>
              <p className="font-bold">{item.student.attendancePercentage}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
