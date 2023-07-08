import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface reducerInterface {
    lang : string;
    texts : Array<string>;
    balance : number;
}

const initialState : reducerInterface = {
    lang : 'ru',
    texts : [],
    balance : 0
}

export const userSlice = createSlice({
    name : 'database',
    initialState,
    reducers : {
        enLanguage(state) {
            state.lang = 'en'
        },
        ruLanguage(state) {
            state.lang = 'ru'
        },
        importMoney(state , action : PayloadAction<number>) {
            state.balance += action.payload
        },
        addText(state , action : PayloadAction<string>) {
            state.texts.push(action.payload)
        },
        removetext(state , action : PayloadAction<string>) {
            state.texts = state.texts.filter((elem) => elem !== action.payload)
        },
        changeText(state , action : PayloadAction<{index: number, text: string}>) {
            state.texts[action.payload.index] = action.payload.text
        }
    }
})

export default userSlice.reducer