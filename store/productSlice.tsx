import { IProduct, IProductState } from "@/interfaces/product";
import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState: IProductState = {
  productsState: [],
  cart:[],
  wishlist: [],
  loading: false,
  showModal: false
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setListProductsState: (state:any, action: PayloadAction<IProduct[]>) => {
      state.loading = true;
      state.productsState = [...action.payload];
      localStorage.setItem('products', JSON.stringify(action.payload));
      state.loading = false;
    },
    deleteProductstate: (state:any, action: PayloadAction<IProduct>) => {
      state.loading = true;
      let newproducts = current(state).productsState.filter((product: IProduct) => product.id !== action.payload.id);
      localStorage.setItem('products', JSON.stringify(newproducts));
      state.productsState = newproducts;
      state.loading = false;

    },
    addWishListProductsState: (state:any, action: PayloadAction<IProduct>) => {
      state.loading = true;
      state.wishlist = [...state.wishlist, action.payload];
      localStorage.setItem('wishList', JSON.stringify(action.payload));
      state.loading = false;
    },
    deleteWishListProductstate: (state:any, action: PayloadAction<IProduct>) => {
      state.loading = true;
      let newproducts = current(state).wishlist.filter((product: IProduct) => product.id !== action.payload.id);
      localStorage.setItem('wishList', JSON.stringify(newproducts));
      state.wishlist = newproducts;
      state.loading = false;

    },
    addToCartProductsState: (state:any, action: PayloadAction<IProduct>) => {
      state.loading = true;
      state.cart = [...state.cart, action.payload];
      localStorage.setItem('cart', JSON.stringify(action.payload));
      state.loading = false;
    },
    deleteFromCartProductstate: (state:any, action: PayloadAction<IProduct>) => {
      state.loading = true;
      let newproducts = current(state).cart.filter((product: IProduct) => product.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(newproducts));
      state.cart = newproducts;
      state.loading = false;

    },
  },
});

export const { setListProductsState, deleteProductstate, addWishListProductsState, deleteWishListProductstate, addToCartProductsState, deleteFromCartProductstate } = productSlice.actions;
export const productReducer = productSlice.reducer;
