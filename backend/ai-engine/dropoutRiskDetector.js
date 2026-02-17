export const detectDropoutRisk = (studentData) => {
  const attendance = studentData.attendancePercentage || 0;
  const marks = studentData.internalMarks || 0;
  const assignments = studentData.assignmentCompletion || 0;

  if (attendance < 60 && marks < 40 && assignments < 50) {
    return {
      risk: 'High',
      reason:
        'Critical indicators detected: low attendance, weak marks, and poor assignment completion.'
    };
  }

  if (attendance < 70 || marks < 50 || assignments < 60) {
    return {
      risk: 'Medium',
      reason: 'One or more performance indicators are below recommended academic thresholds.'
    };
  }

  return {
    risk: 'Low',
    reason: 'Student is maintaining healthy academic and participation metrics.'
  };
};
