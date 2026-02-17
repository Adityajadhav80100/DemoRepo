const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const predictPerformance = (studentData) => {
  const attendance = clamp(studentData.attendancePercentage || 0, 0, 100);
  const marks = clamp(studentData.internalMarks || 0, 0, 100);
  const assignments = clamp(studentData.assignmentCompletion || 0, 0, 100);
  const cgpaScaled = clamp((studentData.previousCgpa || 0) * 10, 0, 100);

  const weightedScore =
    attendance * 0.3 + marks * 0.4 + assignments * 0.2 + cgpaScaled * 0.1;

  let predictedGrade = 'Fail';
  if (weightedScore >= 85) predictedGrade = 'A';
  else if (weightedScore >= 70) predictedGrade = 'B';
  else if (weightedScore >= 50) predictedGrade = 'C';

  const passProbability = clamp(Math.round(weightedScore), 0, 100);

  return {
    weightedScore: Number(weightedScore.toFixed(2)),
    predictedGrade,
    passProbability
  };
};
