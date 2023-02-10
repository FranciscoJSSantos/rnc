export interface MeuPerfil {
  id: number;
  completeName: string;
  email: string;
  enrollment: string;
  setor: string;
  permission: 'Employee' | 'Supervisor' | 'QualityBiomedical';
}