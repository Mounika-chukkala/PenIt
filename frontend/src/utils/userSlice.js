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
localStorage.setItem(
        "user",
        JSON.stringify({ followers: [], following: [], ...action.payload })
      );
      return { followers: [], following: [], ...action.payload };
},
addInterest(state,action){
if (state) {
    state.interests = action.payload;
    localStorage.setItem("user", JSON.stringify(state));
  }
}
    ,
    logout(state,action ){
          localStorage.removeItem("user");
  return { token: null }; 
    },
    updateUser(state, action) {
      const updatedUser = { ...state, ...action.payload };
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


export const {login,logout,updateUser,updateData,addInterest}=userSlice.actions;
export default userSlice.reducer;