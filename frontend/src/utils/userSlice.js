import {createSlice} from "@reduxjs/toolkit"
const userSlice=createSlice({
    name:"userSlice",
    initialState:JSON.parse(localStorage.getItem("user"))||{token:null},

    reducers:{
login(state,action){
// state.name=action.payload.name;
// state.email=action.payload.email;
// state.token=action.payload.token;
localStorage.setItem("user",JSON.stringify(action.payload))
return action.payload;
}
    ,
    logout(state,action ){
          localStorage.removeItem("user");
  return { token: null }; 
    },
    updateUser(state, action) {
        console.log(action.payload);
      const updatedUser = { ...state, ...action.payload };
      console.log("updateduser :",updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    },
}


})


export const {login,logout,updateUser}=userSlice.actions;
export default userSlice.reducer;