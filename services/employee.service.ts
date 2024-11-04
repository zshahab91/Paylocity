import { IProduct } from "@/interfaces/product";

const url = "http://localhost:5000";

export const getAllProduct = async (): Promise<IProduct[]> =>{
    const data = await fetch(`${url}/public`);
    return await data.json() ?? [];
}
