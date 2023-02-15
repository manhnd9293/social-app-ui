import {createBrowserRouter} from "react-router-dom";
import Home from "../view/home/Home";
import EmployeeList from "../view/employee/EmployeeList";
import Register from "../view/register/Register";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/employee',
    element: <EmployeeList/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])

export default router
