import {sendApiRequest, wrapFetchResponse} from "@utils/api-requests/index";
import {
	authFinisherHandler, authStageFlagsStore,
	clearTokens,
	getTokens,
	setTokens
} from "@store/user/user.utils";

export const fetchFreshTokens = async () => {
	let res = null
	try {
		const resJSON = await sendApiRequest("/api/auth/token", {token: getTokens().refresh}, "POST");
		res = {access: resJSON.accessToken, refresh: resJSON.refreshToken}
	} catch (e) {
		console.log("fetchFreshTokens::error::", e);
	}
	
	return res;
}
/*
export const withAccessToken = async (endpoint, body, method) => {
	const tokens = getTokens();
	const firstCallApi = await wrapFetchResponse(
		sendApiRequest(
			endpoint, body, method,
			{
				"Authorization": `Bearer ${tokens.access}`
			}
		)
	);
	console.log("firstCallApi::", firstCallApi);
	if (firstCallApi.success === true) return firstCallApi.body;
	if (firstCallApi.body?.statusCode !== 403) {
		throw firstCallApi.body;
	}
	
	const tryFetchFreshTokens = await fetchFreshTokens();
	if (!tryFetchFreshTokens) {
		clearTokens();
		throw "Токены доступа просрочены";
	}
	
	
}
*/

export const fetchUserData = async () => {
	const tokens = getTokens();
	if (!tokens.refresh || !tokens.access) return null;
	const res = await wrapFetchResponse(
		sendApiRequest(
			"/api/auth/user", null, "GET",
			{
				"Authorization": tokens.access
			}
		)
	);
	
	if (res.success === true) return res.body.user;
	if (res.body?.statusCode !== 403) return null;
	
	const tryUpdateTokens = await fetchFreshTokens();
	
	if (tryUpdateTokens === null) {
		authFinisherHandler.logout();
		return null;
	}
	
	const resSecondTry = await sendApiRequest(
		"/api/auth/user", null, "GET",
		{
			"Authorization": tryUpdateTokens.access
		}
	);
	
	if (!resSecondTry?.user) {
		authFinisherHandler.logout();
		return null;
	}
	
	setTokens(resSecondTry);
	return resSecondTry.user;
}


export const doReqAuthLogin = async ({password, email}) => {
	const res = await wrapFetchResponse(
		sendApiRequest(
			"/api/auth/login", {password, email}, "POST",
		)
	);
	
	if (!res.success) throw res.body.message;
	
	authFinisherHandler.login({
		access: res.body.accessToken,
		refresh: res.body.refreshToken,
	});
	return res.body.user;
}

export const doReqAuthRegister = async ({password, email, name}) => {
	const res = await wrapFetchResponse(
		sendApiRequest(
			"/api/auth/register", {password, email, name}, "POST",
		)
	);
	
	if (!res.success) throw res.body.message;
	
	authFinisherHandler.login({
		access: res.body.accessToken,
		refresh: res.body.refreshToken,
	});
	return res.body.user;
}

export const doReqAuthForgotPassword = async ({email}) => {
	const res = await wrapFetchResponse(
		sendApiRequest(
			"/api/password-reset", {email}, "POST",
		)
	);
	// console.log("doReqAuthForgotPassword::res::", res);
	if (!res.success) throw res.body.message;
	
	authStageFlagsStore.add("logout", "reset-password");
	return res.body;
}

export const doReqAuthResetPassword = async ({token,password}) => {
	const res = await wrapFetchResponse(
		sendApiRequest(
			"/api/password-reset/reset", {token,password}, "POST",
		)
	);
	console.log("doReqAuthResetPassword::res::", res);
	if (!res.success) throw res.body.message;
	
	authStageFlagsStore.remove("logout", "reset-password");
	
	return res.body;
}


export const doReqAuthLogout = async () => {
	const res = await wrapFetchResponse(
		sendApiRequest(
			"/api/auth/logout", {token: getTokens().refresh}, "POST",
		)
	);
	// console.log("doReqAuthLogout::res::", res);
	if (!res.success) throw res.body.message;
	
	authFinisherHandler.logout();
	return res.body;
}

export const doReqUserProfileUpdate = async ({password, email, name}) => {
	const res = await wrapFetchResponse(
		sendApiRequest(
			"/api/auth/user", {password, email, name}, "PATCH",
			{
				"Authorization": getTokens().access
			}
		)
	);
	
	if (!res.success) throw res.body.message;

	return res.body.user;
}
