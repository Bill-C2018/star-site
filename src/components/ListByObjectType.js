import React, {useState} from 'react';

import useDataTableState from './UseDataTableState';
import ListDataTable from './ListDataTable';
import SingleFieldForm from './SingleFieldForm';
import ModalEditDialog from './EditObjectDialog';


const ListByObjectType = (props) => {
	
	const numberOfRows = 10;
	

	const {response,
		searchString,
		changeHandler,
		isModalOpen,
		objectData,
		currentPage,
		totalPages,
		submitHandler,
		handlePreviousClick,
		handleNextClick,
		doSetModalOpen,
		onEditHandler,
		onClickHandler} = useDataTableState(props,numberOfRows);
		
	


	
//==========================================================
//==========================================================
//==========================================================
	
	return (
		<div style={{marginLeft: "10px"}}>
		
			<SingleFieldForm submitHandler = {submitHandler}
							changeHandler = {changeHandler} />
							
		
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