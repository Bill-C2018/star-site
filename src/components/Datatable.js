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
						<tr key={dt.id+ "_0"}>
                            <td > Date Added: </td><td>{dt.dateAdded}</td>
						</tr>
						<tr key={dt.id+ "_1"}>
                            <td>My Object Id: </td><td>{dt.myObjectId}</td>
						</tr>
						<tr key={dt.id+ "_2"}>
							<td>Object Type: </td><td>{dt.type}</td>
                        </tr>
						<tr key={dt.id+ "_3"}>
							<td> Right Acension: </td><td>{dt.rightAcension}</td>
						</tr>
						<tr key={dt.id+ "_4"}>
							<td> Declination: </td><td>{dt.declination}</td>
						</tr>
						<tr key={dt.id+ "_5"}>
							<td>Description: </td><td>{dt.description}</td>
						</tr>
						<tr key={dt.id+ "_6"}>
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