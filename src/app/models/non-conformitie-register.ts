export interface NonConformitieRegister {
    occurrences: Occurrence[],
    setor: number,
    peopleInvolved: string,
    moreInformation: string,
    immediateAction: string,
    registerHour: string,
    registerDate: Date,
    occurrenceTypeId: number
    occurrenceClassification: number
}

export interface Occurrence {
    description: string
}
