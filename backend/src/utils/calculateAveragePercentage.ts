// @ts-nocheck
export default (scores: any, UId: string) => {
  const data = scores.map((score) => ({
    ...score._doc,
    obtained: score.obtained.find((_: any) => _.student == UId)?.score,
  }));
  const subjectTotals = {};
  const subjectCounts = {};

  // Sum up totals and count occurrences for each subject
  data.forEach((item: any) => {
    const { subject, obtained, total } = item;
    if (!subjectTotals[subject]) {
      subjectTotals[subject] = 0;
      subjectCounts[subject] = 0;
    }
    subjectTotals[subject] += (obtained / total) * 100;
    subjectCounts[subject]++;
  });

  // Calculate averages and format result
  const result = Object.keys(subjectTotals).map((subject) => ({
    subject: parseInt(subject),
    average: parseFloat(
      (subjectTotals[subject] / subjectCounts[subject]).toFixed(2)
    ),
  }));

  return result;
};
