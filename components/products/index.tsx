import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Image from 'next/image';
import { getAllProduct } from "@/services/employee.service";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { IProduct, IProductState } from "@/interfaces/product";
import { addToCartProductsState, addWishListProductsState, deleteFromCartProductstate, deleteProductstate, deleteWishListProductstate, setListProductsState } from "@/store/productSlice";
import PriceFormatter from "../Intl";
import SearchBox from "../search";


const ProducList = () => {
    const dispatch = useAppDispatch();
    const list = useAppSelector((state: { product: IProductState }) => state.product.productsState);
    const wishList = useAppSelector((state: { product: IProductState }) => state.product.wishlist);
    const cartList = useAppSelector((state: { product: IProductState }) => state.product.cart);
    const loading = useAppSelector((state: { product: IProductState }) => state.product.loading);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentList, setCurrentList] = useState<IProduct[]>([]);

    const getData = async () => {
        const data = await getAllProduct();
        try {
            dispatch(setListProductsState(data));
            setCurrentList(list);
            getCurrentPageData(1);
        } catch (exceptionVar) {
            toast.error('Error!', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    };
    useEffect(() => {
        getData();
    }, []);


    // Calculate the total number of pages
    const totalPages = Math.ceil(list.length / 10);

    // Function to get the items for the current page
    const getCurrentPageData = (currentPage: number) => {
        const start = (currentPage - 1) * 10;
        const end = start + 10;
        const newData = list.slice(start, end);
        setCurrentList(newData);
    };

    // Filter data based on the search term
    const filteredData = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        const newData = list.filter(item => {
            return item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.price.toString().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm.toLowerCase())
        }
        );
        setCurrentList(newData);
    }

    // Handlers for changing pages
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            getCurrentPageData(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            getCurrentPageData(currentPage - 1);
        }
    };
    const toggleWishList = (product: IProduct) => {
        if (wishList.includes(product)) {
            dispatch(deleteWishListProductstate(product));
        } else {
            dispatch(addWishListProductsState(product));
        }
    }
    const toggleCartList = (product: IProduct) => {
        if (cartList.includes(product)) {
            dispatch(deleteFromCartProductstate(product));
        } else {
            dispatch(addToCartProductsState(product));
        }
    }
    return (

        (list && !loading) ? <>
            <SearchBox searchTerm={searchTerm} onSearch={(val)=> filteredData(val)} />
            <div className="overflow-x-auto my-8 mx-2">
                <table className="table-auto border-collapse border  w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase text-center bg-gray-200  ">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 " />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3"> Image </th>
                            <th className="px-6 py-3"> Wish List </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentList.map((product, inx) => {
                            return (

                                <tr className="bg-white border-b  hover:bg-gray-50 " key={inx}>
                                    <td className="w-4 p-4 border">
                                        <div className="flex items-center">
                                            <input id={`checkbox-table-${product.id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 " />
                                            <label htmlFor={`checkbox-table-${product.id}`} className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 border text-center">
                                        {product.id}
                                    </td>
                                    <td className="px-6 py-4 border text-center">
                                        {product.title}
                                    </td>

                                    <td className="px-6 py-4 border text-center">
                                        <PriceFormatter price={product.price} currency={product.currency} />
                                    </td>
                                    <td className="px-6 py-4 border text-center">
                                        {product.description}
                                    </td>
                                    <td className="px-6 py-4 border text-center">
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            width={100}
                                            height={56}
                                            className="max-h-14"
                                        />
                                    </td>
                                    <td className="px-6 py-4 border text-center">
                                        <a onClick={() => toggleWishList(product)} type="button" className="font-medium text-red-600 m-2  hover:underline hover:cursor-pointer">
                                            {wishList.some(item => item.id === product.id) ?
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white m-auto"
                                                    stroke="red"
                                                    strokeWidth="2"
                                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" viewBox="0 0 24 24">
                                                    <path stroke="red"
                                                        fill="red"
                                                        d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                                                </svg>
                                                :
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white m-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                    stroke="black"
                                                    strokeWidth="2"
                                                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" stroke="black" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                                </svg>
                                            }
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 border text-center">
                                        <a onClick={() => toggleCartList(product)} type="button" className="font-medium  m-2  hover:underline hover:cursor-pointer">
                                            {cartList.some(item => item.id === product.id) ? 'Remove from Cart' : 'Add to Cart'}
                                        </a>
                                        <br />
                                        <a onClick={() => dispatch(deleteProductstate(product))} type="button" className="font-medium text-red-600 m-2  hover:underline hover:cursor-pointer">Delete </a>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 text-white bg-blue-500 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 text-white bg-blue-500 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Next
                    </button>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="dark"
            /></>
            : <h3>Loading...!</h3>

    );
};

export default ProducList;
