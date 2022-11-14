import { Certificate } from "./certificate";
import { Department } from "./department";
import { Skill } from "./skill";

export class Employee {
    id: number;
    firstName: string;
    lastName: string;
    emailId: string;
    department: Department;
    certificate: Certificate;
    skill: Skill[];
    skills: string;
}