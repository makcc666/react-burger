export const DOMAIN = "https://norma.nomoreparties.space";


const fetchResponse = async res => {
	const resJson = await res.json();
	if (!res.ok) throw {
		message: resJson?.message,
		statusCode: res.status
	};
	
	// console.log("resJson::", resJson);
	if (resJson.success !== true) throw resJson.data || resJson.error || "Невалидные данный от сервера";
	return resJson;
}

export const sendApiRequest = async (endpoint, body, method = "GET", extraHeaders = null) => {
	method = method.toUpperCase();
	const options = {
		method,
		headers: new Map()
	};
	let url = DOMAIN + endpoint;
	
	if (extraHeaders) {
		for (const [key, value] of Object.entries(extraHeaders)) {
			options.headers.set(key, value);
		}
	}
	
	switch (method) {
		case "GET": {
			if (body) url += '?' + (new URLSearchParams(body)).toString();
			break;
		}
		case "POST":
		case "PATCH":
		{
			options.body = JSON.stringify(body);
			options.headers.set("Accept", "application/json");
			options.headers.set("Content-Type", "application/json");
			break;
		}
		default: {
			throw new Error("Unknown HTTP method")
		}
	}
	// console.log("options::", {options, url});
	
	const preparedOptions = {
		...options,
		headers: options.headers.size === 0 ? undefined : Object.fromEntries(options.headers)
	};
	
	return fetchResponse(
		await fetch(url, preparedOptions)
	)
}

export const wrapFetchResponse = responsePromise => {
	return responsePromise.then(
		data => ({success: true, body: data}),
		data => ({success: false, body: data}),
	)
}
