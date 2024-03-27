import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {doReqAuthLogin, fetchUserData} from "@utils/api-requests/user";


export const loadUser = createAsyncThunk(
	'user/loadUser',
	async () => {
		return await fetchUserData()
	}
)

const initialState = {
	profile: null,
	isAuth: false,
}

export const userSlice = createSlice({
	name: "user",
	initialState: structuredClone(initialState),
	reducers: builder => ({
		updateUser: builder.preparedReducer(
			profile => {
				// console.log("reducers:updateUser::prepare", profile)
				return {payload: {profile}};
			},
			(state, {payload}) => {
				// console.log("reducers::updateUser::reduce::", payload)
				state.isAuth = !!payload.profile;
				state.profile = payload.profile;
				return state;
			}
		),
		clearUser: () => structuredClone(initialState)
	}),
	extraReducers: builder => {
		builder.addCase(loadUser.rejected, (state, action) => {
			// console.log("userSlice::loadUser.rejected::", {state}, {action})
			userSlice.caseReducers.clearUser(
				state,
				userSlice.actions.clearUser()
			)
		});
		builder.addCase(loadUser.fulfilled, (state, action) => {
			// console.log("userSlice::loadUser.fulfilled::", {state}, {action}, action.payload, typeof userSlice.actions.updateUser)
			userSlice.caseReducers.updateUser(
				state,
				userSlice.actions.updateUser(action.payload)
			);
		});
		
		
	}
})

export const {
	reducer: userReducer,
	actions: userActions,
} = userSlice;