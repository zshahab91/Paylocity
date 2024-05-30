import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { IEmployee, IEmployeeState, IModal } from "@/interfaces/employee";
import { addListEmployeesState, editListEmployeesState } from "@/store/employeeSlice";

const initialUser = {
    id: 0,
    full_name: '',
    spouse: '',
    children: [],
    total_deduction: 0,
    total_received: 0
}
const ModalEmployee = (props: IModal) => {
    const dispatch = useAppDispatch();
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const loading = useAppSelector((state: { employee: IEmployeeState }) => state.employee.loading);

    const [showModal, setShowModal] = useState<boolean>(loading);
    const [currentUser, setCurrentUser] = useState<IEmployee>(initialUser);
    const [currentChildren, setCurrentChildren] = useState<string[]>([]);
    const [addChild, setAddChild] = useState<string>('');
    useEffect(() => {
        setShowModal(props.show);
    }, [props.show]);

    useEffect(() => {
        if (props.editUser) {
            setCurrentUser(props.editUser);
            setCurrentChildren(props.editUser.children);
        }
    }, [props.editUser]);
    useCallback(() => {
        setShowModal(false);
        setCurrentUser(initialUser);
        setCurrentChildren([]);
    }, [showModal])

    const removeChild = (child: string) => {
        let newArray = currentChildren.filter(item => item !== child);
        setCurrentChildren([...newArray]);
        setCurrentUser({ ...currentUser, children: [...newArray] });
    }
    const resetState = () => {
        forceUpdate();
        setShowModal(false);
        setCurrentUser(initialUser);
        setCurrentChildren([]);
    }
    const saveEmployee = () => {
        setShowModal(false);
        if (props.editUser) {
            dispatch(editListEmployeesState(currentUser));

        } else {
            dispatch(addListEmployeesState(currentUser));
        }
        resetState();
    };


    return (
        showModal &&
        <div className="overflow-x-auto my-8 mx-2 shadow-inner">
            <div className={`fixed top-0 left-0 right-0 z-50 items-center justify-center my-auto w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full `}>
                <div className="relative w-full max-w-2xl max-h-full border m-auto rounded  shadow-2xl">
                    <form className="relative bg-white rounded-lg shadow ">
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                {currentUser.id !== 0 ? `Edit ${currentUser.full_name}` : 'Add new employee'}
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " onClick={resetState}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 "> Full Name</label>
                                    <input
                                        value={currentUser?.full_name}
                                        onChange={(e) => setCurrentUser({ ...currentUser, full_name: e.target.value })}
                                        className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`}
                                        id="full_name" type="text" />

                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="spouse" className="block mb-2 text-sm font-medium text-gray-900 "> Spouse Name</label>
                                    <input
                                        value={currentUser?.spouse}
                                        onChange={(e) => setCurrentUser({ ...currentUser, spouse: e.target.value })}
                                        className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`}
                                        id="full_name" type="text" />

                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Children" className="block mb-2 text-sm font-medium text-gray-900 "> Children Names</label>
                                    <input
                                        value={addChild}
                                        type="text"
                                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                        onChange={e => setAddChild(e.target.value)}
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCurrentChildren([
                                                ...currentChildren,
                                                addChild
                                            ]);
                                            setCurrentUser({
                                                ...currentUser, children: [...currentChildren,
                                                    addChild]
                                            });
                                            setAddChild('');
                                        }}
                                        disabled={addChild === ''}
                                        className="bg-gray-300 hover:bg-blue-100 focus:ring-4 focus:outline-none mt-7 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >Add new child</button>
                                </div>
                                <div className="col-span-4 sm:col-span-3">
                                    <ol>
                                        {currentUser?.children.map(child => (
                                            <li className="my-3 flex items-center justify-between hover:text-red-800 hover:cursor-pointer bg-gray-200 p-3 rounded" key={child}>
                                                {child}
                                                <a className="" onClick={() => removeChild(child)}>
                                                    <svg className="w-4 h-4  border-2 border-red-700 text-red-700 rounded p-1 hover:text-gray-700 hover:cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 14 14">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                    </svg>
                                                </a>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center p-6 space-x-3  border-t border-gray-200 rounded-b">
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={saveEmployee}>Save all</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};
export default ModalEmployee;