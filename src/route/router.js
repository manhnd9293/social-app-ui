import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../view/rootLayout/RootLayout";
import EmployeeList from "../view/employee/EmployeeList";
import Register from "../view/register/Register";
import Test from "../view/test/Test";
import Login from "../view/login/Login";
import Home from "../view/home/Home";
import NewEmployee from "../view/employee/newEmployee/NewEmployee";
import NewCompany from "../view/company/newCompany/NewCompany";
import ListCompany, {loadCompanies} from "../view/company/companyList/ListCompany";
import CompanyDetail, {loadCompanyDetail} from "../view/company/companyDetail/CompanyDetail";
import Profile, {loadProfileData} from "../view/profile/Profile";
import ProfileError from "../view/profile/ProfileError";
import FriendView from "../view/friend/FriendView";
import FriendInvitations, {loadInvitationList} from "../view/friend/FriendInvitaion";
import FriendRequest, {loadSentRequests} from "../view/friend/FriendRequest";
import FriendList, {loadFriendsList} from "../view/friend/FriendList";

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
        element: <ListCompany/>,
        loader: loadCompanies
      },
      {
        path: '/company/new',
        element: <NewCompany/>
      },
      {
        path: '/company/:id/detail',
        element: <CompanyDetail/>,
        loader: loadCompanyDetail,
      },
      {
        path: '/profile/:id',
        element: <Profile/>,
        loader: loadProfileData,
        errorElement: <ProfileError/>
      },
      {
        path: '/friends',
        element: <FriendView/>,
        children: [
          {
            index: true,
            element: <FriendList/>,
            loader: loadFriendsList
          },
          {
            path: 'invite',
            element: <FriendInvitations/>,
            loader: loadInvitationList,
          },
          {
            path: 'requests',
            element: <FriendRequest/>,
            loader: loadSentRequests,
          }
        ]
      },
      {
        path: '/test',
        element: <Test/>
      },
    ]
  },
  {
    path: '/sign-up',
    element: <Register/>
  },
  {
    path: '/login',
    element: <Login/>
  },

])

export default router
