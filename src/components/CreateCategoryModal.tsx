import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { type FC, useEffect, useState } from 'react';
import useItem from '../state';
import Modal from './Modal';

type CreateCategoryModalProps = {
  isOpen: boolean;
  onClose: (name?: string) => void;
};

const CreateCategoryModal: FC<CreateCategoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [isInputSelected, setIsInputSelected] = useState(false);
  const { setModal } = useItem();

  useEffect(() => {
    if (!isOpen) return;
    setModal('create-category');
  }, [isOpen, setModal]);

  const handleModalClose = async (name?: string) => {
    setName('');
    setIsInputSelected(false);
    setModal(null);
    onClose(name);
  };

  useInput((input, key) => {
    if (key.return) {
      setIsInputSelected(!isInputSelected);
      return;
    }

    if (isInputSelected) return;

    if (input === 'y') {
      handleModalClose(name);
    }

    if (input === 'n') {
      handleModalClose();
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      title="Add Category"
      message="Enter the name of the category"
    >
      <Box flexDirection="column">
        <Box marginBottom={1}>
          {!isInputSelected ? (
            <Text color="gray">{name.length > 0 ? name : 'Category name'}</Text>
          ) : (
            <TextInput
              value={name}
              onChange={(e) => setName(e)}
              placeholder="Category name"
            />
          )}
        </Box>
        <Text color="cyan">Press [y] to confirm</Text>
        <Text color="cyan">Press [n] to cancel</Text>
      </Box>
    </Modal>
  );
};

export default CreateCategoryModal;
