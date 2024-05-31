import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { IEmployee, IEmployeeState } from "@/interfaces/employee";
import { getAllEmployees } from "@/services/employee.service";
import ModalEmployee from "./add";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { delteEmployeeState, setListEmployeesState, setShowModalEmployeeState } from "@/store/employeeSlice";


const EmployeesList = () => {
    const dispatch = useAppDispatch();
    const list = useAppSelector((state: { employee: IEmployeeState }) => state.employee.employeesState);
    const loading = useAppSelector((state: { employee: IEmployeeState }) => state.employee.loading);
    const showModal = useAppSelector((state: { employee: IEmployeeState }) => state.employee.showModal);
    const [editUser, setEditUser] = useState<IEmployee>();

    const getData = async () => {
        const data = await getAllEmployees();
        try {
            dispatch(setListEmployeesState(data));
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
    }
    useEffect(() => {
        getData();
    }, []);


    const openModalEmployee = (user?: IEmployee) => {
        if (user) setEditUser(user);
        dispatch(setShowModalEmployeeState());
    }
    return (
        (list && !loading) ? <>  <div className="overflow-x-auto my-8 mx-2">
            <button className="shadow my-8 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={() => openModalEmployee()}>
                Add User
            </button>
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
                            Full Name
                        </th>
                        <th className="px-6 py-3">Spouse</th>
                        <th className="px-6 py-3">Children</th>
                        <th className="px-6 py-3"> deduction in year </th>
                        <th className="px-6 py-3"> received in year </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((user, inx) => {
                        return (

                            <tr className="bg-white border-b  hover:bg-gray-50 " key={inx}>
                                <td className="w-4 p-4 border">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 " />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td className="px-6 py-4 border">
                                    {user.id}
                                </td>
                                <td className="px-6 py-4 border">
                                    {user.full_name}
                                </td>

                                <td className="px-6 py-4 border">
                                    {user.spouse ? user.spouse : 'Single'}
                                </td>
                                <td className="px-6 py-4 border">
                                    {user.children.length ?
                                        <ol className="list-decimal">
                                            {user.children.map((child, inx) => {
                                                return (<li key={inx}>{child}</li>)
                                            })}

                                        </ol>
                                        : '0'}
                                </td>
                                <td className="px-6 py-4 border">
                                    {`$${user.total_deduction}`}
                                </td>
                                <td className="px-6 py-4 border">
                                    {`$${user.total_received}`}
                                </td>
                                <td className="px-6 py-4 border">
                                    <a onClick={() => openModalEmployee(user)} type="button" className="font-medium text-blue-600 m-2  hover:underline hover:cursor-pointer">Edit </a>
                                    <a onClick={() => dispatch(delteEmployeeState(user))} type="button" className="font-medium text-red-600 m-2  hover:underline hover:cursor-pointer">Delete </a>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
            <ModalEmployee show={showModal} editUser={editUser} />
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

export default EmployeesList;