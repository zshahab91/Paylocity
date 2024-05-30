import { IEmployee } from '@/interfaces/employee';

const url = "http://localhost:5000";

export const getAllEmployees = async (): Promise<IEmployee[]> =>{
    const data = await fetch(`${url}/employees`);
    return await data.json() ?? [];
}

// async saveAllMachinesData(data: IMachine[]): Promise<IMachine[]> {
//     let result: IMachine[] = [];
//     try {
//         const response = await fetch(`${this.url}/save`, {
//             method: "POST",
//             body: JSON.stringify(data)
//         });
//         result = await response.json();
//     } catch (error) {}
//     return result;
// }


