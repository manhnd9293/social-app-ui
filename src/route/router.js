import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../view/rootLayout/RootLayout";
import EmployeeList from "../view/employee/EmployeeList";
import Register from "../view/register/Register";
import Test from "../view/test/Test";
import Login from "../view/login/Login";
import Home from "../view/home/Home";
import NewEmployee from "../view/employee/newEmployee/NewEmployee";
import NewCompany from "../view/company/newCompany/NewCompany";
import ListCompany from "../view/company/companyList/ListCompany";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/employee',
        element: <EmployeeList/>
      },
      {
        path: '/employee/new',
        element: <NewEmployee/>
      },
      {
        path: '/company',
        element: <ListCompany/>
      },
      {
        path: '/company/new',
        element: <NewCompany/>
      },
      {
        path: '/sign-up',
        element: <Register/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/test',
        element: <Test/>
      },
    ]
  },

])

export default router
