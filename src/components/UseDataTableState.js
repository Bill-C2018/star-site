import React, {useState} from 'react';

import {getCallWithToken } from './FetchHandlers';
import {deleteObjectCall } from './FetchHandlers';
import { Confirm } from 'react-st-modal';

const useDataTableState = (props,numberOfRows) => {

	const [getByObjectIdUri, setGetByObjectIdUri] = useState("");
	const [response,setResponse] = useState([]);
	const [searchString,setSearchString] = useState();
	const [isModalOpen, setModalOpen] = useState(false);
	const [objectData, setObjectData] = useState([]);
	const [currentPage,setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState();


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
	
	return {getByObjectIdUri,
		response,
		searchString,
		changeHandler,
		isModalOpen,
		objectData,
		currentPage,
		totalPages,
		changeHandler,
		fetchData,
		submitHandler,
		handlePreviousClick,
		handleNextClick,
		doSetModalOpen,
		onEditHandler,
		onClickHandler
		};
};


export default useDataTableState;