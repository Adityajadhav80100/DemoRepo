export const generateRecommendations = (studentData, predictions) => {
  const recommendations = [];

  if (predictions.dropoutRisk?.risk === 'High') {
    recommendations.push('Needs counseling');
    recommendations.push('Assign mentor');
    recommendations.push('Recommend remedial classes');
  } else if (predictions.dropoutRisk?.risk === 'Medium') {
    recommendations.push('Schedule weekly progress review with faculty mentor');
  }

  if ((studentData.attendancePercentage || 0) < 75) {
    recommendations.push('Track attendance daily and involve guardians if needed');
  }

  if ((studentData.internalMarks || 0) < 50) {
    recommendations.push('Provide targeted practice tests and revision modules');
  }

  if (!recommendations.length) {
    recommendations.push('Continue current strategy and aim for advanced performance goals');
  }

  return recommendations;
};
