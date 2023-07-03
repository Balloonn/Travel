import { configureStore } from "@reduxjs/toolkit";
import ACTIONS from "./action";
import reducer from "./reducer";

const store = configureStore({
    reducer
});

export default store;