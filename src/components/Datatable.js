import React, { Component } from "react";


class DataTable extends Component {

    render() {
        return (
			<div >

            <table className='MyTable'>
                <tbody>

                    {this.props.response && this.props.response.map(dt => {
						return 	(
						<>
						<tr>
                            <td > Date Added: </td><td>{dt.dateAdded}</td>
						</tr>
						<tr>
                            <td>My Object Id: </td><td>{dt.myObjectId}</td>
						</tr>
						<tr>
							<td>Object Type: </td><td>{dt.type}</td>
                        </tr>
						<tr>
							<td> Right Acension: </td><td>{dt.rightAcension}</td>
						</tr>
						<tr>
							<td> Declination: </td><td>{dt.declination}</td>
						</tr>
						<tr>
							<td>Description: </td><td>{dt.description}</td>
						</tr>
						<tr>
							<td> Other Catalogue Ids'</td><td>{dt.otherCatalogueId}</td>
						</tr>
						</>
                    )})}

                </tbody>
            </table>
			</div>

        );
    }
}

export default DataTable;