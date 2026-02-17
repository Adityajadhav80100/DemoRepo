const tones = {
  blue: 'border-blue-500',
  green: 'border-green-500',
  amber: 'border-amber-500',
  red: 'border-red-500'
};

const StatCard = ({ title, value, tone = 'blue' }) => (
  <div className={`rounded-xl bg-white p-5 shadow border-l-4 ${tones[tone] || tones.blue}`}>
    <p className="text-sm text-slate-500">{title}</p>
    <p className="mt-1 text-2xl font-semibold text-slate-800">{value}</p>
  </div>
);

export default StatCard;
