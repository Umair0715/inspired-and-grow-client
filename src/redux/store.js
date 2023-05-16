import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import categoryReducer from "./reducers/categoryReducer";
import subCategoryReducer from "./reducers/subCategoryReducer";
import productReducer from "./reducers/productReducer";

const store = configureStore({
    reducer: {
        auth : authReducer , 
        user : userReducer ,
        category : categoryReducer ,
        subCategory : subCategoryReducer ,
        inventory : productReducer
    },
});

export default store;