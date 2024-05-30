export interface IEmployee {
    id: number;
    full_name: string;
    spouse: string;
    children: string[];
    total_deduction?: number;
    total_received?: number;
}

export interface IModal {
    show: boolean;
    editUser?: IEmployee;
}

export interface IEmployeeState {
    employeesState: IEmployee[];
    loading:boolean;
}