import UserActionType from "./UserActionType";


function User() {
  this._id = null;
  this.username = ''
}

const initialUser = new User();


const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    case UserActionType.FetchData:
      return {...state, ...action.payload}

    case UserActionType.Login:
      const currentUser = action.payload;
      const accessToken = currentUser.accessToken;
      localStorage.setItem("accessToken", accessToken);
      return {...state, ...currentUser};

    case UserActionType.Logout:
      localStorage.setItem("accessToken", "");
      return new User();

    default:
      return state;
  }
}

export default userReducer;
