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
			
			<table style={{width: "100%"}}>
			<thead>
				<tr>
					<th style={{textAlign: "left"}}>My Object Id </th>
					<th style={{textAlign: "left"}}>Date added</th>
					<th style={{textAlign: "left"}}>Description</th>
					<th style={{textAlign: "left"}}>Catalogue Id</th>
				</tr>
			</thead>
			<tbody>
				{this.props.response && this.props.response.map(dt => { 
					return (
						<tr>
						<td>{dt.myObjectId}</td>
						<td>{dt.dateAdded}</td>
						<td>{dt.description}</td>
						<td>{dt.otherCatalogueId}</td>
						</tr>
					)})}
			</tbody>
			</table>
			
			
		)
	}
}

export default ListDataTable;