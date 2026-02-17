export const analyzeAttendanceTrend = (attendanceHistory = []) => {
  if (!attendanceHistory.length) {
    return { insight: 'Insufficient attendance history for trend analysis.' };
  }

  const sorted = [...attendanceHistory].sort((a, b) => new Date(a.date) - new Date(b.date));

  let maxAbsenceStreak = 0;
  let currentAbsenceStreak = 0;

  sorted.forEach((entry) => {
    if (entry.status === 'absent') {
      currentAbsenceStreak += 1;
      maxAbsenceStreak = Math.max(maxAbsenceStreak, currentAbsenceStreak);
    } else {
      currentAbsenceStreak = 0;
    }
  });

  const recentWindow = sorted.slice(-5);
  const previousWindow = sorted.slice(-10, -5);

  const presentRate = (window) => {
    if (!window.length) return 0;
    const presentCount = window.filter((d) => d.status === 'present').length;
    return (presentCount / window.length) * 100;
  };

  const recentRate = presentRate(recentWindow);
  const previousRate = presentRate(previousWindow);

  if (maxAbsenceStreak >= 3) {
    return { insight: `Continuous absence streak detected (${maxAbsenceStreak} days).` };
  }

  if (previousWindow.length && previousRate - recentRate > 25) {
    return {
      insight: `Sudden drop in attendance noticed: ${previousRate.toFixed(0)}% to ${recentRate.toFixed(0)}%.`
    };
  }

  return { insight: 'Attendance pattern appears stable with no major anomaly.' };
};
