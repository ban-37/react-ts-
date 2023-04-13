import { createSlice } from '@reduxjs/toolkit'
const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,  //表达用户登录状态
        isLoading: false,  //控制登录交互
        userInfo: null  //存储用户信息
    },
    reducers: {
        loginStart(state){
            state.isLoading = true
        },
        loginSuccess(){} ,
        loginFail(){}
    }
})
export const  {loginStart,loginSuccess,loginFail}  = userSlice.actions
export default userSlice.reducer