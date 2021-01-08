import React, {useState} from 'react';

import ListDataTable from './ListDataTable';
import {getCallWithToken } from './FetchHandlers';

const ListByObjectType = (props) => {
	
	const [getByObjectIdUri, setGetByObjectIdUri] = useState("");
	const [response,setResponse] = useState([]);
	
	console.log("passed in token = " + props.token)
	const changeHandler = (event ) => {
		console.log(event);
		setGetByObjectIdUri("http://localhost:8081/userobject/listall/" + event.target.value);
		console.log(getByObjectIdUri);
		setResponse([]);
	}
	
	const submitHandler = async (event) => {
		event.preventDefault();
		console.log("in submit handler -> " + props.token)
		const response = await getCallWithToken(props.token,getByObjectIdUri);
		console.log("response = " + response);
		setResponse(response['objects']);
	}
	
	return (
		<div style={{marginLeft: "10px"}}>
			<form onSubmit={submitHandler}>
				<table>
					<tr>
						<td>
						<label> 
							<input
								placeholder='Object Type'
								name='objecId'
								type='text'
								onChange={changeHandler}
							/>
						</label>
						</td>
						<td>
						<label>
							<input
								type='submit'
							/>
						</label>
						</td>
					</tr>
				</table>
			</form>
				
			<ListDataTable  response={response} />
		</div>
	)
}

export default ListByObjectType;