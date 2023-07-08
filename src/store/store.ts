import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/userSlice'
const rootReducer = combineReducers({
    userReducer
})

export const setUpStore = () => {
    return configureStore({
        reducer : rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>

export type AppStore = ReturnType<typeof setUpStore>

export type AppDispatch = AppStore['dispatch']