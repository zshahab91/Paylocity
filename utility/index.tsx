import { IProduct } from "@/interfaces/product"


export const nextId = (list:IProduct[]) => {
    const maxId = list.reduce((maxId, item) => Math.max(item.id, maxId), -1)
    return maxId + 1
}
