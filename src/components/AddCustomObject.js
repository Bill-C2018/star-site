import React, { Component } from "react";
import ErrorDisplay from './ErrorDisplay';
import { postCall } from './FetchHandlers';


class AddCustomObject extends Component {

	constructor(props) {
		super(props)
		this.state = { myObjectId: '',
					rightAcension: '',
					declination: '',
					description: '',
					otherCatalogueId: '',
					error: '',
					type: '',
					response: ''
				}
	}
	
	submitHandler = async (event) => {
		event.preventDefault();
		let s = JSON.stringify(this.state);
		console.log("in submit handler -> " + s)
		try {
			const response = await postCall(s,"http://localhost:8081//userobject/submitobject",this.props.token);
			console.log("response = " + response);
			this.setState({response: response['objects']});
		} catch (error)	{

			if (error.message === "403") {
				console.log("clear token");
				localStorage.clear();
				this.props.setToken('');
			}
		}
	}

	changeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		this.setState({[nam]: val});
		this.setState({error: ''});
	}


	render() {
		return (
			<>
			<form onSubmit={this.submitHandler}>
				<table>
					<tr>
						<td> objectId: </td>
						<td>
							<input
							name = 'myObjectId'
							type = 'text'
							onChange={this.changeHandler}
							/>
						</td>
					</tr><tr>
						<td> Right Acenssion </td>
						<td> Declination </td>
					</tr><tr>
						<td>
							<input
							name='rightAcension'
							type = 'text'
							onChange={this.changeHandler}
							/>							
						</td><td>
							<input
							name='declination'
							type = 'text'
							onChange={this.changeHandler}
							/>								
						</td>
					</tr><tr>
						<td> Description </td>
						<td> Catalogue ID </td>
					</tr><tr>
						<td>
							<input
							name='description'
							type = 'text'
							onChange={this.changeHandler}
							/>							
						</td><td>
							<input
							name='otherCatalogueId'
							type = 'text'
							onChange={this.changeHandler}
							/>								
						</td>
					</tr><tr>
						<td> Object Type </td>
						<td></td>
					</tr><tr>
						<td> 
							<input
							name = 'type'
							type = 'text'
							onChange={this.changeHandler}
							/>
						</td>	
						<td></td>				
					</tr><tr>
						<input
						type='submit' />
					</tr>
				</table>
			</form>
			<ErrorDisplay error={this.state.error} />
			</>
		)
	}

}

export default AddCustomObject;