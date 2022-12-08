import { configureStore } from '@reduxjs/toolkit';
import loggedReducer from './logged';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import userRecipes from './userhasrecipes';
import { combineReducers } from 'redux';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
}

const rootReducer = combineReducers({ 
    logged: loggedReducer,
    userentries: userRecipes
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);

























// import { configureStore } from '@reduxjs/toolkit';
// import loggedReducer from './logged';
// import counterReducer from './counter'; 
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
// import userRecipes from './userhasrecipes';

// const persistConfig = {
//     key: 'root',
//     storage,
//     stateReconciler: hardSet,
// }

// const persistedReducer = persistReducer(persistConfig, loggedReducer);
// const persistedReducerEntries = persistReducer(persistConfig, userRecipes);

// // const reducers = combineReducers({logged: loggedReducer, userentries: userRecipes});
// // const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = configureStore({
//     reducer: {
//         counter: counterReducer,
//         logged: persistedReducer,
//         // userentries: persistedReducerEntries,
//     }
// });

// // export const store = configureStore({
// //     reducer: persistedReducer,
// // });


// export const persistor = persistStore(store);
