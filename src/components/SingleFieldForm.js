import React from 'react';

const SingleFieldForm = (props) => {
	
	return (
		<>
			<form onSubmit={props.submitHandler}>
				<table>
					<tr>
						<td>
						<label> 
							<input
								placeholder='Object Type'
								name='objecId'
								type='text'
								onChange={props.changeHandler}
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
		</>
			
	)
}

export default SingleFieldForm;