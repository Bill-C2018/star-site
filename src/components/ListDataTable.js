import React, { Component } from "react";


	
class ListDataTable extends Component {
	
	
	
	render() {
		console.log(this.props.response.length === 0);
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
					<th style={{textAlign: "left"}}>My Object Id </th>
					<th style={{textAlign: "left"}}>Description</th>
					<th style={{textAlign: "left"}}>Catalogue Id</th>
					<th style={{textAlign: "left"}}>Tools</th>
				</tr>
			</thead>
			<tbody>
				{this.props.response && this.props.response.map(dt => { 
					return (
						<tr key = {dt.id}>
						<td style={{display: "none"}}>{dt.id}</td>
						<td>{dt.myObjectId}</td>
						<td>{dt.description}</td>
						<td>{dt.otherCatalogueId}</td>
						<td><button style={{width: "20"}} 
							onClick={() => this.props.clickHandler(dt.myObjectId)}>Del</button>
						</td>	
						<td><button style={{width: "20"}}
							onClick={() => this.props.editHandler(dt.myObjectId,this.props.isMOpen,this.props.setMOpen)}>Edit</button>
						</td>
						</tr>
					)})}
			</tbody>
			</table>
			</>

			
			
		)
	}
}

export default ListDataTable;