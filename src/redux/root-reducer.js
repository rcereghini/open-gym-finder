import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
// import cartReducer from "./cart/cart.reducer";
// import tutorialReducer from "./tutorial/tutorial.reducer";

export default combineReducers({
  user: userReducer
  // cart: cartReducer,
  // tutorial: tutorialReducer
});
