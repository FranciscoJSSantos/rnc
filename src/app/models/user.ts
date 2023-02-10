export interface User {
    id: number;
    completeName: string;
    email: string;
    enrollment: string;
    setor: string;
    ativo: boolean;
    password: string,
    confirmPassword: string,
    userPermission: string // colocar Employee
}
