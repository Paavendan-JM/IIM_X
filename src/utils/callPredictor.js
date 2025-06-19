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
    createResultRowB("IIM Bangalore", calculateScoreForB(formData, normalized), category),
    createResultRow("IIM Calcutta", calculateScoreForC(formData, normalized), category),
    createResultRow("IIM Lucknow", calculateScoreForL(formData, normalized), category),
    createResultRow("IIM Kozhikode", calculateScoreForK(formData, normalized), category),
    createResultRowI("IIM Indore", calculateScoreForI(formData, normalized), category),
  ];

  return results;
}

// --- Result Structuring ---

function createResultRow(iim, rawScore, category) {
  const baseScore = Number(rawScore.toFixed(3));
  const cutoff = Number((cutoffs[iim][category] || 100).toFixed(3));

  const result = {
    Average: getProbability(baseScore + 0.35 * 10 + 0.20 * 15 - cutoff),     // avg PI & WAT
    Good: getProbability(baseScore + 0.35 * 20 + 0.20 * 25 - cutoff),        // good PI & WAT
    Excellent: getProbability(baseScore + 0.35 * 30 + 0.20 * 35 - cutoff),   // excellent PI & WAT
  };

  return { iim, result };
}

function getProbability(diff) {
  if (diff < 0) return "-";
  if (diff <= 10) return "Low";
  if (diff <= 18) return "Moderate";
  return "High";
}

// --- Normalization ---

function normalize(percentile) {
  return Math.min(100, Math.max(0, percentile));
}

// --- Work Ex Utilities ---

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

function calculateWorkExBonus(workexMonths) {
  if (workexMonths < 6) return 0;
  else if (workexMonths >= 6 && workexMonths < 12) return 1;
  else if (workexMonths >= 12 && workexMonths < 18) return 2;
  else if (workexMonths >= 18 && workexMonths < 24) return 3;
  else if (workexMonths >= 24 && workexMonths < 30) return 5;
  else if (workexMonths >= 30 && workexMonths < 36) return 2;
  else if (workexMonths >= 36) return 0;
  else return 0;
}

// --- Cutoff Data ---

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

// --- IIM Score Calculators before PI and WAT ---

function calculateScoreForA(data, n) {
  const catScore = (n.varc * 0.34 + n.dilr * 0.33 + n.qa * 0.33) * 0.6;
  const class10 = n.class10 * 0.1;
  const class12 = n.class12 * 0.1;
  const grad = n.graduation * 0.1;
  const diversity = data.gender !== "male" || data.background !== "engineering" ? 5 : 0;
  return catScore + class10 + class12 + grad + diversity;
}

function calculateScoreForB(data, n) {
  const cat = (n.varc * 0.0875 + n.dilr * 0.10 + n.qa * 0.0625);
  const acad = (n.class10 + n.class12) * 0.05;
  const grad = n.graduation * 0.05;
  const certs = data.hasCertification ? 2 : 0;
  const workexMonths = getWorkExMonths(data.workex);
  const workexBonus = calculateWorkExBonus(workexMonths) * 2;
  return cat + acad + grad + certs  + workexBonus;
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
  const indexScore = n.overall * 0.35;
  const resumeRaw = data.hasCertification ? 4 : 0;
  const resumeScore = resumeRaw * 0.1;
  const genderBonus = data.gender === 'female' ? 5 : 0;
  const academicDiversity = data.background !== 'engineering' ? 2.5 : 0;
  const workexMonths = getWorkExMonths(data.workex);
  const workexBonus = calculateWorkExBonus(workexMonths);
  const base = indexScore + resumeScore + genderBonus + academicDiversity + workexBonus;

  return base;
}

function calculateScoreForI(data, n) {
  const cat = ((n.varc * 0.1875)/3 + (n.dilr * 0.09375)/3  + (n.qa * 0.09375)/3 );
  const class10 = n.class10 * 0.125;
  const diversity = data.gender !== "male" ? 3 : 0;
  const backgroundBonus = data.background !== "engineering" ? 2 : 0;
  return cat + class10 + diversity + backgroundBonus;
}


// --- IIM Score Calculators after PI and WAT ---

function createResultRowB(iim, rawScore, category) {
  const baseScore = Number(rawScore.toFixed(3));
  const cutoff = Number((cutoffs[iim][category] || 100).toFixed(3));

  const result = {
    Average: getProbability(baseScore + 11 + 4 - cutoff),     // avg PI & WAT
    Good: getProbability(baseScore + 19 + 6 - cutoff),        // good PI & WAT
    Excellent: getProbability(baseScore + 25 + 8 - cutoff),   // excellent PI & WAT
  };

  return { iim, result };
}

function createResultRowI(iim, rawScore, category) {
  const baseScore = Number(rawScore.toFixed(3));
  const cutoff = Number((cutoffs[iim][category] || 100).toFixed(3));

  const result = {
    Average: getProbability(baseScore + 11 + 4 - cutoff),     // avg PI & WAT
    Good: getProbability(baseScore + 19 + 6 - cutoff),        // good PI & WAT
    Excellent: getProbability(baseScore + 25 + 8 - cutoff),   // excellent PI & WAT
  };

  return { iim, result };
}
