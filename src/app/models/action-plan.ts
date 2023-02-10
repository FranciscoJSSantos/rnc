export interface ActionPlan {
  id: string,
  name: string,
  questions: { id: string, value: string, actionPlainId: number, response: string }[]
}
