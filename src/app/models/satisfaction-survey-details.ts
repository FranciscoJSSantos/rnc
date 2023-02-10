
export interface SatisfactionSurveyDetails{
  id: string,
  reception: {
    waitingTime: number,
    attendanceAgility: number
  },
  tecnicalArea: {
    waitingTime: number,
    profissionalHability: number,
    examOrientation: number
  },
  sanitation: {
    localSanitation: number
  },
  deliveryResults: {
    deliveryPunctuality: number,
    deliveryResultTime: number
  },
  overallImpression: {
    friendsRecommendation: number
  },
  howSatisfied: {
    howSatisfiedUre: number
  },
  ourDifferential: OurDifferential[],
  whySearch: WhySearch[],
  personalInformations: {
    name: string,
    number: string,
    email: string,
    description: string
  }
}


export interface OurDifferential{
  description: number
}

export interface WhySearch{
  researchQuestions: number,
  description: string
}