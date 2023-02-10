import { Archive } from "./non-conformitie-register";
export interface NonConformitieDetail {
    id: string,
    userName: string,
    date: string,
    hour: string,
    peopleInvolved: string,
    moreInformation: string,
    immediateAction: string,
    occurrenceClassification: string,
    occurrences: {
        id: number,
        occurrencyTypeId: string,
        description: string,
        dsOccurrenceType: string,
        archives: Archive[],
    }[],
    setor: string,
    hasRootCauseAnalysis: boolean,
    occurrencePendency: string,
    isDelayed: boolean,
}
