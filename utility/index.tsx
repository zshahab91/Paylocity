import { IEmployee } from "@/interfaces/employee";

const calcDiscount = (name: string, type: string): number => {
    let cost: number = type === 'employee' ? 1000 : 500;
    if (Array.from(name)[0].toLocaleUpperCase() === 'A') {
        cost = (90 / 100) * cost;
    }
    return cost;
}

export const calcTotalPaycheck = (user: IEmployee): number => {
    let totalDeduction: number = 0;
    totalDeduction += calcDiscount(user.full_name, 'employee');
    if (user.spouse) { totalDeduction += calcDiscount(user.spouse, 'other') };
    if (user.children.length) {
        user.children.forEach((child) => {
            totalDeduction += calcDiscount(child, 'other');
        })
    };
    return totalDeduction;
}

export const nextId = (list:IEmployee[]) => {
    const maxId = list.reduce((maxId, item) => Math.max(item.id, maxId), -1)
    return maxId + 1
}

export const calcTotalUser = (item:IEmployee) => {
    const payCheck = calcTotalPaycheck(item);
    item.total_deduction = payCheck;
    item.total_received = 52000 - payCheck;
    return item;
}