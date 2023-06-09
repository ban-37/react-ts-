import {  configureStore } from '@reduxjs/toolkit'
import user  from "./modules/user"

export const store = configureStore({
    reducer:{user}
})
export type RootState = ReturnType<typeof store.getState>