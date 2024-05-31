import { IEmployee, IEmployeeState } from "@/interfaces/employee";
import { calcTotalUser, nextId } from "@/utility";
import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState: IEmployeeState = {
  employeesState: [],
  loading: false,
  showModal: false
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setListEmployeesState: (state = initialState, action: PayloadAction<IEmployee[]>) => {
      state.loading = true;
      action.payload.forEach((item) => {
        item = calcTotalUser(item);
      });
      state.employeesState = [...action.payload];
      localStorage.setItem('employees', JSON.stringify(action.payload));
      state.loading = false;
    },
    addListEmployeesState: (state, action: PayloadAction<IEmployee>) => {
      state.loading = true;
      action.payload.id = nextId(current(state).employeesState);
      const item = calcTotalUser(action.payload);
      state.employeesState = [...state.employeesState, item];
      localStorage.setItem('employees', JSON.stringify(item));
      state.loading = false;
    },
    editListEmployeesState: (state, action: PayloadAction<IEmployee>) => {
      state.loading = true;
      let foundIndex = current(state).employeesState.findIndex((employee: IEmployee) => employee.id === action.payload.id);
      const item = calcTotalUser(action.payload);
      state.employeesState[foundIndex] = item;
      localStorage.setItem('employees', JSON.stringify(current(state.employeesState)));
      state.loading = false;
    },
    delteEmployeeState: (state, action: PayloadAction<IEmployee>) => {
      state.loading = true;
      let newEmployees = current(state).employeesState.filter((employee: IEmployee) => employee.id !== action.payload.id);
      localStorage.setItem('employees', JSON.stringify(newEmployees));
      state.employeesState = newEmployees;
      state.loading = false;

    },
    setShowModalEmployeeState: (state) => {
      state.showModal= !state.showModal;
    },
  },
});

export const { setListEmployeesState, addListEmployeesState, editListEmployeesState, delteEmployeeState, setShowModalEmployeeState } = employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;
