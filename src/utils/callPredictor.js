export function predictCalls(formData) {
  const normalized = {
    varc: normalize(formData.varc),
    dilr: normalize(formData.dilr),
    qa: normalize(formData.qa),
    overall: normalize(formData.overall),
    class10: normalize(formData.class10),
    class12: normalize(formData.class12),
    graduation: normalize(formData.graduation),
  };

  const category = formData.category;

  const results = [
    createResultRow("IIM Ahmedabad", calculateScoreForA(formData, normalized), category),
    createResultRow("IIM Bangalore", calculateScoreForB(formData, normalized), category),
    createResultRow("IIM Calcutta", calculateScoreForC(formData, normalized), category),
    createResultRow("IIM Lucknow", calculateScoreForL(formData, normalized), category),
    createResultRow("IIM Kozhikode", calculateScoreForK(formData, normalized), category),
    createResultRow("IIM Indore", calculateScoreForI(formData, normalized), category),
  ];

  return results;
}

function createResultRow(iim, rawScore, category) {
  const score = Number(rawScore.toFixed(3));
  const cutoff = Number((cutoffs[iim][category] || 100).toFixed(3));
  const diff = score - cutoff;

  const result = {
    "Low": false,
    "Moderate": false,
    "High": false,
  };

  if (diff >= 0 && diff <= 7) result["Low"] = true;
  else if (diff > 7 && diff <= 15) result["Moderate"] = true;
  else if (diff > 15) result["High"] = true;

  return { iim, score, result };
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

const cutoffs = {
  "IIM Ahmedabad": {
    General: 61.0503, EWS: 55.7798, OBC: 52.4637, SC: 45.6321, ST: 39.8081, PWD: 27.8215,
  },
  "IIM Bangalore": {
    General: 48.8695, EWS: 39.2903, OBC: 40.4451, SC: 34.0663, ST: 27.8257, PWD: 35.1605,
  },
  "IIM Calcutta": {
    General: 52.743, EWS: 48.141, OBC: 45.4, SC: 39.003, ST: 33.302, PWD: 45.69608,
  },
  "IIM Lucknow": {
    General: 48.80616, EWS: 35.4395, OBC: 38.28033, SC: 27.14991, ST: 19.40983, PWD: 18.736601,
  },
  "IIM Kozhikode": {
    General: 62.42054, EWS: 55.09648, OBC: 54.34841, SC: 48.20149, ST: 42.65777, PWD: 45.69608,
  },
  "IIM Indore": {
    General: 60.0112, EWS: 53.663, OBC: 51.504, SC: 46.9869, ST: 40.9503, PWD: 11.7512,
  },
};

// --- Scoring Functions (unchanged except categoryBonus removed) ---

function calculateScoreForA(data, n) {
  const catScore = (n.varc * 0.34 + n.dilr * 0.33 + n.qa * 0.33) * 0.6;
  const class10 = n.class10 * 0.1;
  const class12 = n.class12 * 0.1;
  const grad = n.graduation * 0.1;
  const diversity = data.gender !== "male" || data.background !== "engineering" ? 5 : 0;

  return catScore + class10 + class12 + grad + diversity;
}

function calculateScoreForB(data, n) {
  const cat = n.overall * 0.45;
  const acad = (n.class10 + n.class12) * 0.1;
  const grad = n.graduation * 0.15;
  const diversity = data.gender !== "male" ? 5 : 0;
  const certs = data.hasCertification ? 2 : 0;

  return cat + acad + grad + diversity + certs;
}

function calculateScoreForC(data, n) {
  const cat = n.overall * 0.5;
  const class10 = n.class10 * 0.1;
  const class12 = n.class12 * 0.1;
  const grad = n.graduation * 0.2;
  const diversity = data.gender !== "male" ? 3 : 0;

  return cat + class10 + class12 + grad + diversity;
}

function calculateScoreForL(data, n) {
  const cat = n.overall * 0.45;
  const academics = (n.class10 + n.class12 + n.graduation) / 3 * 0.25;
  const diversity = data.gender !== "male" ? 4 : 0;
  const certs = data.hasCertification ? 2 : 0;

  return cat + academics + diversity + certs;
}

function calculateScoreForK(data, n) {
  const catScore = (n.overall / 100) * 50;
  const class10Score = (n.class10 / 100) * 15;
  const class12Score = (n.class12 / 100) * 20;

  const genderBonus = data.gender === 'female' ? 10 : 0;
  const academicDiversity = data.background !== 'engineering' ? 5 : 0;

  const workexMonths = getWorkExMonths(data.workex);
  const workexBonus = workexMonths >= 12 ? 5 : 0;

  return catScore + class10Score + class12Score + genderBonus + academicDiversity + workexBonus;
}

function calculateScoreForI(data, n) {
  const cat = n.overall * 0.45;
  const grad = n.graduation * 0.25;
  const diversity = data.gender !== "male" ? 3 : 0;
  const backgroundBonus = data.background !== "engineering" ? 2 : 0;

  return cat + grad + diversity + backgroundBonus;
}
