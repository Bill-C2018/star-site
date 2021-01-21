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
	const [currentPage,setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState();
	

	const fetchData = async (uri) => {
		
		try {
			const response = await getCallWithToken(props.token,uri);
			console.log("response = " + response['objects']);
			console.log("back from pagination #pages = " + response['totalPages'])
			setResponse(response['objects']);
			setTotalPages(response['totalPages']);
			setCurrentPage(response['currentPage']);
		} catch (error)	{

			if (error.message === "403") {
				console.log("clear token");
				localStorage.clear();
				props.setToken('');
			}
		}
		
	}
	const changeHandler = (event ) => {
		console.log(event);
		setGetByObjectIdUri("http://localhost:8081/userobject/" 
		+ event.target.value 
		+ ":" + currentPage + ":5");
		console.log(getByObjectIdUri);
		setResponse([]);
	}
	
	const submitHandler = async (event) => {
		event.preventDefault();
		console.log("in submit handler -> " + props.token)
		try {
			const response = await getCallWithToken(props.token,getByObjectIdUri);
			console.log("response = " + response['objects']);
			console.log("back from pagination #pages = " + response['totalPages'])
			setResponse(response['objects']);
			setTotalPages(response['totalPages']);
			setCurrentPage(response['currentPage']);
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
	const handlePreviousClick = () => {
		if(currentPage > 0) {
			setCurrentPage(currentPage-1);
			let newPage = parseInt(currentPage) - 1;
			let newURI = "http://localhost:8081/userobject/" 
			+ "Star" 
			+ ":" + newPage + ":5";
			
			fetchData(newURI);

		}
		

		
	}
	
	const handleNextClick = async () => {
		console.log("handl next click")
		if(currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
			let newPage = parseInt(currentPage) + 1;
			let newURI = "http://localhost:8081/userobject/" 
			+ "Star" 
			+ ":" + newPage + ":5";
			
			fetchData(newURI);

		}

		
	}
	
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
							editHandler = {onEditHandler}
							handleNext = {handleNextClick}
							handlePrev = {handlePreviousClick}/>
		</div>
	)
}

export default ListByObjectType;