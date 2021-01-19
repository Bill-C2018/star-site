import React, {useState} from 'react';

import ListDataTable from './ListDataTable';
import {getCallWithToken } from './FetchHandlers';
import {deleteObjectCall } from './FetchHandlers';
import { Confirm } from 'react-st-modal';
import ModalEditDialog from './EditObjectDialog';


const ListByObjectType = (props) => {
	
	const [getByObjectIdUri, setGetByObjectIdUri] = useState("");
	const [response,setResponse] = useState([]);
	const [isModalOpen, setModalOpen] = useState(false);
	const [objectData, setObjectData] = useState([]);
	
	console.log("passed in token = " + props.token)
	const changeHandler = (event ) => {
		console.log(event);
		setGetByObjectIdUri("http://localhost:8081/userobject/" + event.target.value);
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
//==========================================================
//==========================================================

	
	const doSetModalOpen = (value) => {
		setModalOpen(value);
	}

	const onEditHandler = async (baseId) => {
		console.log("in edit handler " + baseId);
		for (let index = 0; index < response.length; index++) {
			console.log(response[index]);
			if (response[index]['myObjectId'] === baseId) {
				console.log("found");
				setObjectData(response[index]);
			}
		};
		doSetModalOpen(true);

	}
//==========================================================
	const onClickHandler = async (baseId) => {
		console.log("deleting " + baseId);
          const result = await Confirm('Сonfirmation text', 
            'Сonfirmation title');
          
          if (result) {
            console.log("confirmed")
			const uri = "http://localhost:8081/userobject/" + baseId;
			try {
				const response = await deleteObjectCall(uri,props.token);
				console.log("response = " + response);
				const response2 = await getCallWithToken(props.token,getByObjectIdUri);
				console.log("response2 = " + response);
				setResponse(response2['objects']);
			} catch( error ) {
				console.log("Error on delete " + error.message)
				if (error.message === "403") {
					console.log("clear token");
					localStorage.clear();
					props.setToken('');
				}

			}

          } else {
            console.log("not confirmed")
          }
		
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
			<ModalEditDialog token = {props.token}
							isModalOpen = {isModalOpen}
							setModalOpen = {doSetModalOpen}
							objectData = {objectData}/>
			<ListDataTable  response={response}
							clickHandler = {onClickHandler} 
							editHandler = {onEditHandler}/>
		</div>
	)
}

export default ListByObjectType;