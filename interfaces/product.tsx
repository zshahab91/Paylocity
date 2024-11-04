export interface IProduct {
    id: number,
    image: string,
    title: string,
    description: string,
    price: string,
    currency: string
}

export interface IModal {
    editProduct?: IProduct;
}

export interface IProductState {
    productsState: IProduct[];
    cart: IProduct[];
    wishlist: IProduct[];
    loading:boolean;
    showModal: boolean;
}
