export interface Reception {
  waitingTime: string;
  attendanceAgility: string;
}

export interface TecnicalArea {
  waitingTime: string;
  profissionalHability: string;
  examOrientation: string;
}

export interface Sanitation {
  localSanitation: string;
}

export interface DeliveryResults {
  deliveryPunctuality: string;
  deliveryResultTime: string;
}

export interface OverallImpression {
  friendsRecommendation: string;
}

export interface HowSatisfied {
  howSatisfiedUre: string;
}

export interface OurDifferential {
  description: string;
}

export interface WhySearch {
  researchQuestions: string;
  description: string;
}

export interface PersonalInformations {
  name: string;
  number: string;
  email: string;
  description: string;
}

export interface RootObject {
  reception: Reception;
  tecnicalArea: TecnicalArea;
  sanitation: Sanitation;
  deliveryResults: DeliveryResults;
  overallImpression: OverallImpression;
  howSatisfied: HowSatisfied;
  ourDifferential: OurDifferential[];
  whySearch: WhySearch[];
  personalInformations: PersonalInformations
}
