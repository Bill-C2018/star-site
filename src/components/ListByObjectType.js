import React, {useState} from 'react';

import ListDataTable from './ListDataTable';
import {getCallWithToken } from './FetchHandlers';
import {deleteObjectCall } from './FetchHandlers';
import { Confirm } from 'react-st-modal';
import ModalEditDialog from './EditObjectDialog';


const ListByObjectType = (props) => {
	
	const numberOfRows = 10;
	
	const [getByObjectIdUri, setGetByObjectIdUri] = useState("");
	const [response,setResponse] = useState([]);
	const [isModalOpen, setModalOpen] = useState(false);
	const [objectData, setObjectData] = useState([]);
	const [currentPage,setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState();
	const [searchString,setSearchString] = useState();
	

	const fetchData = async (uri) => {
		
		try {
			const response = await getCallWithToken(props.token,uri);
			setResponse(response['objects']);
			setTotalPages(response['totalPages']);
			setCurrentPage(response['currentPage']);
		} catch (error)	{

			if (error.message === "403") {

				localStorage.clear();
				props.setToken('');
			}
		}
		
	}
	const changeHandler = (event ) => {
		console.log(props.column);
		setSearchString(event.target.value);
		setGetByObjectIdUri("http://localhost:8081/userobject/" 
		+ props.column + event.target.value 
		+ ":" + currentPage + ":" + numberOfRows);
		setResponse([]);
		setTotalPages(0);
		setCurrentPage(0);
	}
	
	const submitHandler = async (event) => {
		event.preventDefault();
		

		try {
			const response = await getCallWithToken(props.token,getByObjectIdUri);
			setResponse(response['objects']);
			setTotalPages(response['totalPages']);
			setCurrentPage(response['currentPage']);
		} catch (error)	{

			if (error.message === "403") {

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
			+ props.column + searchString 
			+ ":" + newPage + ":" + numberOfRows;
			
			fetchData(newURI);

		}
		

		
	}
	
	const handleNextClick = async (searchString) => {

		if(currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
			let newPage = parseInt(currentPage) + 1;
			let newURI = "http://localhost:8081/userobject/" 
			+ props.column + searchString
			+ ":" + newPage + ":" + numberOfRows;
			fetchData(newURI);

		}

		
	}
	
	const doSetModalOpen = (value) => {
		setModalOpen(value);
	}

	const onEditHandler = async (baseId) => {

		for (let index = 0; index < response.length; index++) {

			if (response[index]['myObjectId'] === baseId) {

				setObjectData(response[index]);
			}
		};
		doSetModalOpen(true);

	}
//==========================================================
	const onClickHandler = async (baseId) => {

          const result = await Confirm('Сonfirmation text', 
            'Сonfirmation title');
          
          if (result) {

			const uri = "http://localhost:8081/userobject/" + baseId;
			try {
				const response = await deleteObjectCall(uri,props.token);
				console.log("object deleted" + response)
				const response2 = await getCallWithToken(props.token,getByObjectIdUri);

				setResponse(response2['objects']);
			} catch( error ) {

				if (error.message === "403") {

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
							handlePrev = {handlePreviousClick}
							currentPage = {currentPage}
							totalPages = {totalPages}
							searchString = {searchString}/>
		</div>
	)
}

export default ListByObjectType;