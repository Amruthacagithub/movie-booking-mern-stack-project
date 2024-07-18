import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { isLoggedIn: false},
    reducers: {
        login(state){
            localStorage.removeItem("userId");
            state.isLoggedIn = true;
        },
        logout(state){
            state.isLoggedIn = false;
        }
    }
});

const adminSlice = createSlice({
    name: "admin",
    initialState: { isLoggedIn: false},
    reducers: {
        login(state){
            localStorage.removeItem("adminId");
            localStorage.removeItem("token");
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        }
    }
});

export const userActions = userSlice.actions; // here actions are login and logout functions => actions used to change the initialState => like useState => count(initialState) , setCount(actions/reducers)
export const adminActions = adminSlice.actions;


//useSelector (state)
export const store = configureStore({
    reducer:{
        user: userSlice.reducer, // state.user
        admin: adminSlice.reducer // state.admin
    },
})