
	
export const postCall = async (data,uri,token,isJson) => {

	let s2 = '';
	if( isJson) {
		console.log("is json == true");
		s2 = JSON.stringify(data);
	} else {
		s2 = data;
	}
	console.log(s2);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
						'Access-Token': token},
		body: s2
	};
	const response = await fetch(uri, requestOptions);
	if(response.status !== 200) {
		throw Error(response.status);
	}
	return response.json();
}

export const getCallWithToken = async (token,uri) => {
	
	console.log("get -> passed in token = " + token);
	

	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json',
						'Access-Token': token},

	};
	
	console.log("calling fetch -> " + requestOptions['headers']['Access-Token']);
	const response = await fetch(uri,requestOptions);
	if(response.status !== 200) {
		console.log(response.status)
		const text = response.status;
		throw Error(text);
	}
	return response.json();
	
}

export const deleteObjectCall = async (uri, token) => {

	const requestOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json',
						'Access-Token': token},

	};

	const response = await fetch(uri,requestOptions);
	if(response.status !== 200) {
		console.log(response.status)
		const text = response.status;
		throw Error(text);
	}
	return response.json();
	
}
