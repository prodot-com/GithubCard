export function getGrindCopy(commitCount: number) {
  if (commitCount >= 50) {
    return {
      title: "You never clocked out.",
      insight: "A massive spike in activity stood out. Were you even sleeping that week?"
    };
  }

  if (commitCount >= 25) {
    return {
      title: "You went all in.",
      insight: "Strong focus showed through. That day carried serious momentum."
    };
  }

  if (commitCount >= 10) {
    return {
      title: "You showed up.",
      insight: "Consistent effort made the difference. Progress beats perfection."
    };
  }

  return {
    title: "A calm grind.",
    insight: "Not every day is a sprint. Sometimes steady wins the year."
  };
}
