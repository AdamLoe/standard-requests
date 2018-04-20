import { combineReducers } from "redux";

import admin from "./admin";
import pagination from "./pagination";
import navigation from "./navigation";
import user from "./user";
import requests from "./requests";
import createRequest from "./createRequest";



export default combineReducers({
	user,
	pagination,
	navigation,
	admin,
	requests,
	createRequest
});