import React, {useState} from 'react';
import {  StaticDialog, ModalContent, ModalFooter, ModalButton, useDialog } from 'react-st-modal';

export const CustomDialogContent2 = () => {
  const dialog = useDialog();

  const [value, setValue] = useState();

  return (
      <div>
        <ModalContent>
          <div>Custom dialog content</div>
          <label>
            Input value:
            <input
              type="text"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </label>
        </ModalContent>
        <ModalFooter>
          <ModalButton
            onClick={() => {
              dialog.close(value);
            }}
          >
            Custom button
          </ModalButton>
        </ModalFooter>
      </div>
  );
}

export const CustomDialogContent = () => {
  // use this hook to control the dialog
  const dialog = useDialog();

  const [value, setValue] = useState();

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          // Сlose the dialog and return the value
          dialog.close(value);
        }}
      >
        Custom button
      </button>
    </div>
  );
}

const CustomStaticExample = (props) => {
//  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      <StaticDialog
        isOpen={props.isModalOpen}
        title="bobs burgers"
        onAfterClose={(result) => {
          props.setModalOpen(false);
          // do something with dialog result
        }}
    >
        {/* see previous demo */}
          <CustomDialogContent2 />
      </StaticDialog>


      <div>
        <button
          onClick={() => {
              props.setModalOpen(true);
          }}
        >
          Custom static
        </button>
      </div>
    </div>
    );
}

export default CustomStaticExample;
