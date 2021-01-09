import React, {useState} from 'react';

import DataTable from './Datatable';
import {getCallWithToken } from './FetchHandlers';

const ListByCustomId = (props) => {
	
	const [getByObjectIdUri, setGetByObjectIdUri] = useState("");
	const [response,setResponse] = useState([]);
	
	console.log("passed in token = " + props.token)
	const changeHandler = (event ) => {
		console.log(event);
		setGetByObjectIdUri("http://localhost:8081/userobject/userobject?objectId=" + event.target.value);
		console.log(getByObjectIdUri);
		setResponse([]);
	}
	
	const submitHandler = async (event) => {
		event.preventDefault();
		console.log("in submit handler -> " + props.token)
		try {
			const response = await getCallWithToken(props.token,getByObjectIdUri);
			console.log("response = " + response);
			setResponse(response['objects']);
		} catch (error)	{

			if (error.message === "403") {
				console.log("clear token");
				localStorage.clear();
				props.setToken('');
			}

		}
	}
	
	return (
		<div >
			<form onSubmit={submitHandler}>
				<table>
					<tr>
						<td>
						<input
							placeholder='Custom object Id'
							name='objecId'
							type='text'
							onChange={changeHandler}
						/>
						</td>
						<td>
						<input
							type='submit'
						/>
						</td>
					</tr>
				</table>
			</form>
				
			<DataTable  response={response} />
		</div>
	)
}

export default ListByCustomId;