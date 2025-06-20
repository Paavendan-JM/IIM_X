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
  const cat = (n.varc * 0.0875 + n.dilr * 0.10 + n.qa * 0.0625); // total 25%
  const acad = (n.class10 + n.class12) * 0.05;
  const grad = n.graduation * 0.05;
  const certs = data.hasCertification ? 10 : 0;
  const workexMonths = getWorkExMonths(data.workex);
  const workexBonus = calculateWorkExBonus(workexMonths) * 2;
  const extra = max(workexBonus,certs);
  return cat + acad + grad + extra;
}

function FinalScoreForC(data, n) {
  const cat = n.overall * 0.30;
  const backgroundBonus = data.background !== "engineering" ? 6 : 0;
  const workexMonths = getWorkExMonths(data.workex);
  const workexBonus = calculateWorkExBonus(workexMonths);
  const workexMark = workexBonus * (1.6);
  const final = cat + backgroundBonus + workexMark;
  return final;
}

function FinalScoreForL(data, n) { // done (only Pi + WAT remaining)
  const cat = n.overall * 0.30;
  const academics = (n.class12 + n.graduation) * 0.50;
  const diversity = data.gender !== "male" ? 2.5 : 0;
  const backgroundBonus = data.background !== "engineering" ? 2.5 : 0;
  const workexMonths = getWorkExMonths(data.workex);
  const workexBonus = calculateWorkExBonus(workexMonths);
  const final = cat + academics + diversity + certs + backgroundBonus + workexBonus;
  return final;
}

function FinalScoreForK(data, n) {
  const indexScore = n.overall * weightage.K.OverallScore_PI;
  const resumeRaw = data.hasCertification ? 4 : 0;
  const final = indexScore + resumeRaw;
  return final;
}

function calculateScoreForI(data, n) {
  const cat = ((n.varc * 0.1875)/3 + (n.dilr * 0.09375)/3  + (n.qa * 0.09375)/3 );
  const class10 = n.class10 * 0.125;
  const diversity = data.gender !== "male" ? 3 : 0;
  const backgroundBonus = data.background !== "engineering" ? 2 : 0;
  return cat + class10 + diversity + backgroundBonus;
}

//Weightage - CS Before and after PI

const weightage = {
  "A": { //yet to update
    //CS (Composite Score) before PI = (0.35 * (A + B + C + D + E))+ (0.65 * Normalised CAT overall score)
    //CS (Composite Score) = ARF_CS * Normalised AR score + CATF_CS * Normalised overall score in CAT-2024
    dilrScore : 0,
    varcScore : 0,
    qaScore : 0,
    OverallScore : 0.65,
    class10Score : 0.10, // A
    class12Score : 0.10, // B
    graduationScore : 0.10, // C
    workExScore : 0.05, // D 
    genderScore : 2, // E
    acadDivScore :  30,
    //FCS = PIF * Normalised PI Score + AWTF * Normalised AWT Score + CATF_FCS * Normalised CAT Score + ARF_FCS * Normalised AR Score
    piScore : 0.50, //after PI use this
    watScore : 0.10,
    OverallScore_PI : 0.25,
    nirf: 2,
  },
  "B": {
    dilrScore : 0.21,
    varcScore :0.19,
    qaScore : 0.15,
    OverallScore : 0,
    class10Score : 0.10, 
    class12Score : 0.10, 
    graduationScore : 0.1, 
    workExScore : 0.1, 
    certificationScore : 10, //not percent (cerftifiaction or work ex)
    genderScore : 5, // not percent
    acadDivScore :  0,
    dilrScore_PI : 0.1,//after PI use this
    varcScore_PI :0.0875,
    qaScore_PI : 0.0625,
    workExScore_PI : 0.1,
    piScore : 0.40,
    watScore : 0.10,    
    class10Score_PI : 0.05, 
    class12Score_PI : 0.05,
    certificationScore_PI : 10, //not percent (cerftifiaction or work ex)
  },
  "C": {
    dilrScore :0,
    varcScore :0,
    qaScore : 0,
    OverallScore : 0.56, // (mark / total * 56)
    class10Score : 0.10, 
    class12Score : 0.15, 
    graduationScore : 0, 
    workExScore : 0, 
    certificationScore : 0,
    genderScore : 4, // not percent
    acadDivScore :  0,
    OverallScore_PI : 0.30, //after PI use this
    workExScore_PI : 0.08,
    piScore : 0.48,
    watScore : 0.08,
    acadDivScore_PI :  6, // not percent
  },
  "L": {
    dilrScore :0,
    varcScore :0,
    qaScore : 0,
    OverallScore : 0.60, // (mark / total * 60)
    class10Score : 0, 
    class12Score : 0.10, 
    graduationScore : 0.10, 
    workExScore : 0.1, 
    certificationScore : 0,
    genderScore : 0.05,
    acadDivScore :  0.05,
    OverallScore_PI : 0.30, //after PI use this
    genderScore_PI : 0.025,
    acadDivScore_PI:  0.025,
    workExScore_PI : 0.05,
    piScore : 0.4,
    watScore : 0.1,
    class12Score : 0.05, 
    graduationScore : 0.05,
  },
  "K": {
    dilrScore :0,
    varcScore :0,
    qaScore : 0,
    OverallScore : 0.50,
    class10Score : 0.15, 
    class12Score : 0.20, 
    graduationScore : 0, 
    workExScore : 0.05, 
    certificationScore : 4, //not percent
    genderScore : 0.1,
    acadDivScore :  0.05,
    OverallScore_PI : 0.50, //aafter PI use this
    piScore : 0.1,
    watScore : 0.2,
    nirf: 4, //not percent
    certificationScore_PI : 4, //not percent
  },
  "I": {//yet to update
    dilrScore :0,
    varcScore :0,
    qaScore : 0,
    OverallScore : 0.50,
    class10Score : 0.15, 
    class12Score : 0.20, 
    graduationScore : 0, 
    workExScore : 0.05, 
    certificationScore : 4, //not percent
    genderScore : 0.1,
    acadDivScore :  0.05,
    OverallScore_PI : 0.50, //aafter PI use this
    piScore : 0.1,
    watScore : 0.2,
    nirf: 4, //not percent
  }
};




