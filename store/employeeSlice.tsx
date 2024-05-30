import { IEmployee, IEmployeeState } from "@/interfaces/employee";
import { calcTotalPaycheck, nextId } from "@/utility";
import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState: IEmployeeState = {
  employeesState: [],
  loading: false
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setListEmployeesState: (state = initialState, action: PayloadAction<IEmployee[]>) => {
      state.loading = true;
      state.employeesState = [...action.payload];
      localStorage.setItem('employees', JSON.stringify(action.payload));
      state.loading = false;
    },
    addListEmployeesState: (state, action: PayloadAction<IEmployee>) => {
      state.loading = true;
      action.payload.id = nextId(current(state).employeesState);
      const payCheck = calcTotalPaycheck(action.payload);
      action.payload.total_deduction = payCheck;
      action.payload.total_received = 56000 - payCheck;
      state.employeesState = [...state.employeesState, action.payload];
      localStorage.setItem('employees', JSON.stringify(action.payload));
      state.loading = false;
    },
    editListEmployeesState: (state, action: PayloadAction<IEmployee>) => {
      state.loading = true;
      let foundIndex = current(state).employeesState.findIndex((employee: IEmployee) => employee.id === action.payload.id);
      state.employeesState[foundIndex] = action.payload;
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
  },
});

export const { setListEmployeesState, addListEmployeesState, editListEmployeesState, delteEmployeeState } = employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;