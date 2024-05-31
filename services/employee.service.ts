import { IEmployee } from '@/interfaces/employee';

const url = "http://localhost:5000";

export const getAllEmployees = async (): Promise<IEmployee[]> =>{
    const data = await fetch(`${url}/employees`);
    return await data.json() ?? [];
}
