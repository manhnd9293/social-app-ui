import UserActionType from "./UserActionType";

const logInUser = (currentUser) => {
  return {
    type: UserActionType.Login,
    payload: currentUser
  }
}

const fetchUserData = (data) => {
  return {
    type: UserActionType.FetchData,
    payload: data
  }
}

const logOutUser = () => {
  return {
    type: UserActionType.Logout
  }
}

export {logOutUser, logInUser, fetchUserData};