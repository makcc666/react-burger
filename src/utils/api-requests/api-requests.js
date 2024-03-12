export const DOMAIN = "https://norma.nomoreparties.space";


const fetchResponse = async res => {
	if (!res.ok) throw new Error("Не удалось получить данные от сервера");
	const resJson = await res.json();
	// console.log("resJson::", resJson);
	if (resJson.success !== true) throw new Error(resJson.data || resJson.error || "Невалидные данный от сервера");
	return resJson;
}

export const sendApiRequest = async (endpoint, body, method = "GET") => {
	method = method.toUpperCase();
	const options = {
		method,
		headers: new Map()
	};
	let url = DOMAIN + endpoint;
	
	switch (method) {
		case "GET": {
			if (body) url += '?' + (new URLSearchParams(body)).toString();
			break;
		}
		case "POST": {
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