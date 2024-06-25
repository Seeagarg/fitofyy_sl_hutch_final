import {createSlice} from '@reduxjs/toolkit'

const initialState = {lang:'en'};

const LanguageSlice = createSlice({
    name:"LanguageSlice",
    initialState:initialState,
    reducers:{
        setLang:(state,action)=>{
            state.lang = action.payload;
            return state;
        }
    }
})

export const {setLang} = LanguageSlice.actions
export default LanguageSlice.reducer