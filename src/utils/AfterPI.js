// ---AFTER PI CALCULATION---
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

function FinalScoreForK(data, n) {
  const indexScore = n.overall * 0.35;
  const resumeRaw = data.hasCertification ? 4 : 0;
  const base = indexScore + resumeRaw;

  return base;
}

function calculateScoreForI(data, n) {
  const cat = ((n.varc * 0.1875)/3 + (n.dilr * 0.09375)/3  + (n.qa * 0.09375)/3 );
  const class10 = n.class10 * 0.125;
  const diversity = data.gender !== "male" ? 3 : 0;
  const backgroundBonus = data.background !== "engineering" ? 2 : 0;
  return cat + class10 + diversity + backgroundBonus;
}

