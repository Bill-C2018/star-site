import React, { Component } from "react";
import './datatable.css';


	
class ListDataTable extends Component {
	
	
	
	render() {
		if (this.props.response.length === 0) {
			return (
				<>
				</>
			)
		};
		return (

			<>
			<table style={{width: "80%", marginLeft: "10%"}}>
			<thead>
				<tr>
					<th style={{display: "none"}}>Id</th>
					<th style={{textAlign: "left"}}>Type </th>
					<th style={{textAlign: "left"}}>Description</th>
					<th style={{textAlign: "left"}}>Right Acension</th>
					<th style={{textAlign: "left"}}>Declination</th>
					<th style={{textAlign: "left"}}>Catalogue Id</th>
					<th style={{textAlign: "left"}}>Magnitude</th>
					<th style={{textAlign: "left"}}>FWHM</th>
					<th style={{textAlign: "left"}}>Tools</th>
				</tr>
			</thead>
			<tbody>
				{this.props.response && this.props.response.map(dt => { 
					return (
						<tr key = {dt.id}>
						<td style={{display: "none"}}>{dt.id}</td>
						<td>{dt.type}</td>
						<td>{dt.description}</td>
						<td>{dt.rightAcension}</td>
						<td>{dt.declination}</td>
						<td>{dt.otherCatalogueId}</td>
						<td>{dt.magnitude}</td>
						<td>{dt.fwhm}</td>
						<td><button style={{width: "20", backgroundColor: 'lightgray'}} 
							onClick={() => this.props.clickHandler(dt.myObjectId)}>Del</button>
						</td>	
						<td><button style={{width: "20", backgroundColor: 'lightgray'}}
							onClick={() => this.props.editHandler(dt.myObjectId,this.props.isMOpen,this.props.setMOpen)}>Edit</button>
						</td>
						</tr>
					)})}
			</tbody>
			</table>
			<div className='buttonrow'>
			<div className = 'buttonlcol'></div>
			<div className='buttonothercol'>
			<button style = {{ backgroundColor: 'lightgray', display: this.props.currentPage == 0 ? 'none' : ''}}
				onClick = {() => { this.props.handlePrev()}}>
				prev
			</button>
			</div>
			<div className='buttonothercol'>
			<button style = {{backgroundColor: 'lightgray', display: this.props.currentPage == this.props.totalPages -1 ? 'none' : ''}}
			onClick = { () => { this.props.handleNext(this.props.searchString);}}>
			next</button>
			</div>

			</div>
			</>

			
			
		)
	}
}

export default ListDataTable;