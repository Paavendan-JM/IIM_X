export function predictCalls(formData) {
  const results = [
    createResultRow("IIM Ahmedabad", calculateScoreForA(formData)),
    createResultRow("IIM Bangalore", calculateScoreForB(formData)),
    createResultRow("IIM Calcutta", calculateScoreForC(formData)),
    createResultRow("IIM Lucknow", calculateScoreForL(formData)),
    createResultRow("IIM Kozhikode", calculateScoreForK(formData)),
    createResultRow("IIM Indore", calculateScoreForI(formData)),
  ];

  return results;
}

function createResultRow(iim, score) {
  return {
    iim,
    result: {
      "Good": score >= 60,
      "Average": score >= 70,
      "Below Average": score >= 80,
    },
  };
}

function normalize(percentile) {
  return Math.min(100, Math.max(0, percentile));
}

function getWorkExMonths(label) {
  switch (label) {
    case "<6": return 0;
    case "6-12": return 1;
    case "12-18": return 2.5;
    case "18-24": return 4;
    case "24-30": return 5;
    case "30-36": return 3;
    case "36+": return 0;
    default: return 0;
  }
}

// ------- IIM-wise Scoring Logic (out of 100) -------

function calculateScoreForA(data) {
  const catScore =
    (normalize(data.varc) * 0.34 +
      normalize(data.dilr) * 0.33 +
      normalize(data.qa) * 0.33) *
    0.6;
  const class10 = normalize(data.class10) * 0.1;
  const class12 = normalize(data.class12) * 0.1;
  const grad = normalize(data.graduation) * 0.1;

  const diversity =
    data.gender !== "male" || data.background !== "engineering" ? 5 : 0;
  const categoryBonus = data.category !== "General" ? 3 : 0;

  return catScore + class10 + class12 + grad + diversity + categoryBonus;
}

function calculateScoreForB(data) {
  const cat = normalize(data.overall) * 0.45;
  const acad = (normalize(data.class10) + normalize(data.class12)) * 0.1;
  const grad = normalize(data.graduation) * 0.15;
  const diversity = data.gender !== "male" ? 5 : 0;
  const certs = data.hasCertification ? 2 : 0;

  return cat + acad + grad + diversity + certs;
}

function calculateScoreForC(data) {
  const cat = normalize(data.overall) * 0.5;
  const class10 = normalize(data.class10) * 0.1;
  const class12 = normalize(data.class12) * 0.1;
  const grad = normalize(data.graduation) * 0.2;
  const diversity = data.gender !== "male" ? 3 : 0;

  return cat + class10 + class12 + grad + diversity;
}

function calculateScoreForL(data) {
  const cat = normalize(data.overall) * 0.45;
  const academics =
    (normalize(data.class10) + normalize(data.class12) + normalize(data.graduation)) / 3 * 0.25;
  const diversity = data.gender !== "male" ? 4 : 0;
  const certs = data.hasCertification ? 2 : 0;

  return cat + academics + diversity + certs;
}

function calculateScoreForK(data) {
  const catScore = (parseFloat(data.overall) / 100) * 50;
  const class10Score = (parseFloat(data.class10) / 100) * 15;
  const class12Score = (parseFloat(data.class12) / 100) * 20;

  const genderBonus = data.gender === 'female' ? 10 : 0;
  const academicDiversity = data.background !== 'engineering' ? 5 : 0;

  const workexMonths = getWorkExMonths(data.workex);
  const workexBonus = workexMonths >= 12 ? 5 : 0;

  const total = catScore + class10Score + class12Score + genderBonus + academicDiversity + workexBonus;
  return total; // out of 100
}

function calculateScoreForI(data) {
  const cat = normalize(data.overall) * 0.45;
  const grad = normalize(data.graduation) * 0.25;
  const diversity = data.gender !== "male" ? 3 : 0;
  const backgroundBonus = data.background !== "engineering" ? 2 : 0;

  return cat + grad + diversity + backgroundBonus;
}
