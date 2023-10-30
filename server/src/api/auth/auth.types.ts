import { Role, Sex } from '../../@types/types';

export interface Payload {
    userId: string;
    role: Role;
}

export type UserLogin = {
    email: string;
    password: string;
    role: Role;
};

type BaseRegister = {
    address: string;
    contact: string;
    email: string;
    password: string;
    role: Role;
};

export type DrivingSchoolRegister = BaseRegister & { name: string };
export type InstructorRegister = BaseRegister & {
    firstName: string;
    middleName?: string;
    lastName: string;
    extensionName?: string;
    sex: Sex;
};
export type StudentRegister = InstructorRegister & { birthday: Date };

export type AllRegister = DrivingSchoolRegister | InstructorRegister | StudentRegister;
