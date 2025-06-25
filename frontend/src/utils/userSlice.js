import {createSlice} from "@reduxjs/toolkit"
const userSlice=createSlice({
    name:"userSlice",
    initialState:JSON.parse(localStorage.getItem("user"))|| {
    token: null,
    name: null,
    username: null,
    email: null,
    id: null,
    profilePic: null,
    followers: [],
    following: [],
  },

    reducers:{
login(state,action){
// state.name=action.payload.name;
// state.email=action.payload.email;
// state.token=action.payload.token;
// localStorage.setItem("user",JSON.stringify(action.payload))
// return action.payload;
localStorage.setItem(
        "user",
        JSON.stringify({ followers: [], following: [], ...action.payload })
      );
      return { followers: [], following: [], ...action.payload };
}
    ,
    logout(state,action ){
          localStorage.removeItem("user");
  return { token: null }; 
    },
    updateUser(state, action) {
        // console.log(action.payload);
      const updatedUser = { ...state, ...action.payload };
      // console.log("updateduser :",updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    },
     updateData(state, action) {
      const data = action.payload;
      if (data[0] === "visibility") {
        localStorage.setItem("user", JSON.stringify({ ...state, ...data[1] }));
        return { ...state, ...data };
      } else if (data[0] === "followers") {
        const finalData = {
          ...state,
          following: state?.following?.includes(data[1])
            ? state?.following?.filter((id) => id !== data[1])
            : [...state.following, data[1]],
        };

        localStorage.setItem("user", JSON.stringify(finalData));
        return finalData;
      }
    }
}


})


export const {login,logout,updateUser,updateData}=userSlice.actions;
export default userSlice.reducer;