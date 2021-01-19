import React, {useState} from 'react';
import { StaticDialog,ModalContent, ModalFooter, ModalButton, useDialog } from 'react-st-modal';


//==============================================================
export const ModalDialogContent = (props) => {
	
	const dialog = useDialog();

	const [rightAcension, setRightAcension] = useState(props.data['rightAcension']);
	const [declination, setDeclination] = useState(props.data['declination']);

	const genOutput = () => {
		props.data['rightAcension'] = rightAcension;
		props.data['declination'] = declination;
	}
	
	return (
		<div>
			<ModalContent>
				<div>Custom dialog content</div>
				<table>
				<tr><td>
					<label>
						Right Acension:
						<input
							type="text"
							value = {props.data['rightAcension']}
							onChange={(e) => {
								setRightAcension(e.target.value);
							}}
						/>
					</label>
				</td><td>
					<label>
						Declination:
						<input
							type="text"
							value = {props.data['declination']}
							onChange={(e) => {
								setDeclination(e.target.value);
							}}
						/>
					</label>
				</td></tr>
				<tr><td>
					<label>
						Right Acension:
						<input
							type="text"
							value = {props.data['rightAcension']}
							onChange={(e) => {
								setRightAcension(e.target.value);
							}}
						/>
					</label>
				</td><td>
					<label>
						Declination:
						<input
							type="text"
							value = {props.data['declination']}
							onChange={(e) => {
								setDeclination(e.target.value);
							}}
						/>
					</label>
				</td></tr>
				<tr><td>
					<label>
						Right Acension:
						<input
							type="text"
							value = {props.data['rightAcension']}
							onChange={(e) => {
								setRightAcension(e.target.value);
							}}
						/>
					</label>
				</td><td>
					<label>
						Declination:
						<input
							type="text"
							value = {props.data['declination']}
							onChange={(e) => {
								setDeclination(e.target.value);
							}}
						/>
					</label>
				</td></tr>

				</table>
			</ModalContent>
			<ModalFooter>
				<ModalButton
					onClick={() => {
						dialog.close([]);
					}}
				>
					Cancel
				</ModalButton>

				<ModalButton
					onClick={() => {
						genOutput();
						dialog.close(props.data);
					}}
				>
					Update
			</ModalButton>
		</ModalFooter>
	</div>
	);
}
//=============================================================
const ModalEditDialog = (props) => {


  return (
    <div>
      <StaticDialog
        isOpen={props.isModalOpen}
        title="bobs burgers"
        onAfterClose={(result) => {
          props.setModalOpen(false);
          // do something with dialog result
			console.log(result);
        }}
		onAfterOpen={() => {
			console.log("dialog opended with ", props.objectData);
		}}
    >

          <ModalDialogContent data = {props.objectData}/>
      </StaticDialog>
    </div>
    );
}

export default ModalEditDialog
