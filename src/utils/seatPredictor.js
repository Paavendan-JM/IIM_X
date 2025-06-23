// ✅ FINAL VERSION
// seatPredictor.js

export function predictSeats(formData) {
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

  return [
    createFutureResultRow("IIM Ahmedabad", calculateSeatScoreForA(formData, normalized), category),
    createFutureResultRow("IIM Bangalore", calculateSeatScoreForB(formData, normalized), category),
    createFutureResultRow("IIM Calcutta", calculateSeatScoreForC(formData, normalized), category),
    createFutureResultRow("IIM Lucknow", calculateSeatScoreForL(formData, normalized), category),
    createFutureResultRow("IIM Kozhikode", calculateSeatScoreForK(formData, normalized), category),
    createFutureResultRow("IIM Indore", calculateSeatScoreForI(formData, normalized), category),
  ];
}

function normalize(percentile) {
  return Math.min(100, Math.max(0, parseFloat(percentile) || 0));
}

function getProbability(diff) {
  if (diff < 0) return "-";
  if (diff <= 10) return "Low";
  if (diff <= 18) return "Moderate";
  return "High";
}

function createFutureResultRow(iim, score, category) {
  const cutoff = cutoffs[iim]?.[category] || 100;
  const diffBase = score - cutoff;

  return {
    iim,
    seat: {
      Average: getProbability(diffBase + 15),
      Good: getProbability(diffBase + 25),
      Excellent: getProbability(diffBase + 33),
    }
  };
}

const cutoffs = {
  "IIM Ahmedabad": { General: 61.0503, EWS: 55.7798, OBC: 52.4637, SC: 45.6321, ST: 39.8081, PWD: 27.8215 },
  "IIM Bangalore": { General: 48.8695, EWS: 39.2903, OBC: 40.4451, SC: 34.0663, ST: 27.8257, PWD: 35.1605 },
  "IIM Calcutta": { General: 52.743, EWS: 48.141, OBC: 45.4, SC: 39.003, ST: 33.302, PWD: 45.69608 },
  "IIM Lucknow": { General: 48.80616, EWS: 35.4395, OBC: 38.28033, SC: 27.14991, ST: 19.40983, PWD: 18.736601 },
  "IIM Kozhikode": { General: 62.42054, EWS: 55.09648, OBC: 54.34841, SC: 48.20149, ST: 42.65777, PWD: 45.69608 },
  "IIM Indore": { General: 60.0112, EWS: 53.663, OBC: 51.504, SC: 46.9869, ST: 40.9503, PWD: 11.7512 },
};

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
  else if (workexMonths < 12) return 1;
  else if (workexMonths < 18) return 2;
  else if (workexMonths < 24) return 3;
  else if (workexMonths < 30) return 5;
  else if (workexMonths < 36) return 2;
  else return 0;
}

function calculateSeatScoreForA(data, n) {
  return n.overall * 0.5 + n.class10 * 0.1 + n.class12 * 0.1 + n.graduation * 0.2 + (data.gender !== "male" ? 3 : 0);
}

function calculateSeatScoreForB(data, n) {
  const catScore = (n.varc * 0.34 + n.dilr * 0.33 + n.qa * 0.33) * 0.6;
  const diversity = (data.gender !== "male" || data.background !== "engineering") ? 5 : 0;
  return catScore + n.class10 * 0.1 + n.class12 * 0.1 + n.graduation * 0.1 + diversity;
}

function calculateSeatScoreForC(data, n) {
  return n.overall * 0.45 + ((n.class10 + n.class12 + n.graduation) / 3) * 0.25 + (data.gender !== "male" ? 4 : 0) + (data.hasCertification ? 2 : 0);
}

function calculateSeatScoreForL(data, n) {
  const cat = (n.varc * 0.19 + n.dilr * 0.21 + n.qa * 0.15);
  const certs = data.hasCertification ? 10 : 0;
  const workex = calculateWorkExBonus(getWorkExMonths(data.workex)) * 2;
  const extra = Math.max(workex, certs);
  return cat + (n.class10 + n.class12) * 0.1 + n.graduation * 0.1 + extra + (data.gender !== "male" ? 5 : 0);
}

function calculateSeatScoreForK(data, n) {
  const extra = Math.max(
    data.gender === 'female' ? 5 : 0,
    data.background !== 'engineering' ? 2.5 : 0
  );
  return n.overall * 0.35 + (data.hasCertification ? 4 : 0) + extra + calculateWorkExBonus(getWorkExMonths(data.workex));
}

function calculateSeatScoreForI(data, n) {
  const cat = ((n.varc * 0.1875) + (n.dilr * 0.09375) + (n.qa * 0.09375)) / 3;
  return cat + n.class10 * 0.125 + (data.gender !== "male" ? 3 : 0) + (data.background !== "engineering" ? 2 : 0);
}