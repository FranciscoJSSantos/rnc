import { UserData } from './user-data.model'

export interface Session {
    user: UserData;
    token: string;
    permission: 'Employee'|'Supervisor'|'QualityBiomedical';
}
