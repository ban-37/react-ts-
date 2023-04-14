import { IUserType, userLogin } from '@/api/user'
import { Dispatch, createSlice } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'

export interface UserInfoType {
    username: string;
    objectId: string;
    sessionToken: string;
    avatar: string;
}
export interface UserStateType {
    isLogin: boolean;
    isLoading: boolean;
    userInfo: UserInfoType | null;
}
let initialState: UserStateType = {
    isLogin: false,  //表达用户登录状态
    isLoading: false,  //控制登录交互
    userInfo: null  //存储用户信息
}
let info =
    localStorage.getItem("fx-admin-userinfo")
if (info) {
    initialState.isLogin = true;
    initialState.userInfo = JSON.parse(info);
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart(state) {
            state.isLoading = true
        },

        loginSuccess(state, actions) {
            state.isLogin = true
            state.isLoading = false
            let {autoLogin,userInfo} = actions.payload
            state.userInfo = userInfo
            // 本地持久化存储
            let auto = autoLogin ? true : false;
            localStorage.setItem("autoLogin", auto.toString()); //登录成功后，记录自动登录状态
            if (autoLogin) {
                localStorage.setItem("fx-admin-userinfo", JSON.stringify(userInfo));
            } 
                sessionStorage.setItem("fx-admin-userinfo", JSON.stringify(userInfo));
        },

        loginFail(state) {
            state.isLogin = false
            state.isLoading = false
            state.userInfo = null
            localStorage.removeItem("fx-admin-userinfo")
            sessionStorage.removeItem("fx-admin-userinfo")
        },
        //刷新页面后判断从哪拿数据
        loginUpdate(state, action) {
            let auto = localStorage.getItem("autoLogin") //登录成功后，记录自动登录状态
            state.userInfo = action.payload;
            if (auto) {
                localStorage.setItem("fx-admin-userinfo", JSON.stringify(action.payload));
            } else {
                sessionStorage.setItem("fx-admin-userinfo", JSON.stringify(action.payload));
            }
        },
    }
})
export const userLoginAsync = (params: IUserType, dispatch: Dispatch, navigate: NavigateFunction
) => {
    dispatch(loginStart())
    setTimeout(() => {
        userLogin(params).then(res => {
            navigate("/");
            dispatch(loginSuccess({ userInfo: res.data, autoLogin: params.autoLogin }))
            console.log(res.data)
        }).catch((err) => {
            console.log(err, "---失败了")
            navigate("/");
            dispatch(loginFail())
        })
    }, 1000);
}
export const { loginStart, loginSuccess, loginFail,loginUpdate } = userSlice.actions
export default userSlice.reducer