import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../view/rootLayout/RootLayout";
import EmployeeList from "../view/employee/EmployeeList";
import Register from "../view/register/Register";
import Test from "../view/test/Test";
import Login from "../view/login/Login";
import Home from "../view/home/Home";
import NewEmployee from "../view/employee/newEmployee/NewEmployee";
import NewCompany, {loadNewCompanyData} from "../view/company/newCompany/NewCompany";
import ListCompany, {loadCompanies} from "../view/company/companyList/ListCompany";
import CompanyDetail, {loadCompanyDetail} from "../view/company/companyDetail/CompanyDetail";
import Profile, {loadProfileData} from "../view/profile/Profile";
import ProfileError from "../view/profile/ProfileError";
import FriendView from "../view/friend/FriendView";
import FriendInvitations, {loadInvitationList} from "../view/friend/FriendInvitaion";
import FriendRequest, {loadSentRequests} from "../view/friend/FriendRequest";
import FriendList, {loadFriendsList} from "../view/friend/FriendList";
import ConversationList, {conversationsLoader} from "../view/conversation/ConversationList";
import ChatFrame, {messageLoader} from "../view/conversation/ChatFrame";
import RootError from "../view/rootLayout/RootError";
import SearchResult, {loadSearchResult} from "../view/searchResult/SearchResult";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <RootError/>,
    children: [
      {
        index: true,
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
        element: <NewCompany/>,
        loader: loadNewCompanyData
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
        path: '/search',
        element: <SearchResult/>,
        loader: loadSearchResult,
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
          }
        ]
      },
      {
        path: 'conversations',
        element: <ConversationList/>,
        loader: conversationsLoader,
        children: [
          {
            path: ':id',
            element: <ChatFrame/>,
            loader: messageLoader
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
