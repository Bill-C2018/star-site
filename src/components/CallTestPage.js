import React from 'react';
import {getCallWithToken } from './FetchHandlers';


const CallTestPage = (props) => {
	
	const onClickHandler = async () => {
		
		const uri = "http://localhost:8081/version/test"
		const response = await getCallWithToken(props.token,uri);
		console.log(response['message']);
	}
	
	return (
		<>
		<button onClick = {onClickHandler}>Test</button>
		</>
	)
}

export default CallTestPage;