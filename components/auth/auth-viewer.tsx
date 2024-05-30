import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { IAuthState } from "@/interfaces/auth";
import Login from "@/components/login";
import EmployeesList from "@/components/employees";

const AuthViewer = () => {
  const authState = useAppSelector((state: { auth: IAuthState }) => state.auth.authState);
  return (
    <>
      {authState ? <EmployeesList /> : <Login /> }
    </>
  );
};
export default AuthViewer;