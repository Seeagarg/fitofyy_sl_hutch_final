import {configureStore,combineReducers} from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage";
import LanguageSliceReducer from './Slices/LanguageSlice';
import persistReducer from "redux-persist/lib/persistReducer";
import persistStore from "redux-persist/es/persistStore";


const persistConfig = {
    key:'root',
    storage
}

const rootReducer=combineReducers({
    LanguageSlice:LanguageSliceReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer);


export const store = configureStore({
    reducer:persistedReducer
})

export const persistor = persistStore(store);