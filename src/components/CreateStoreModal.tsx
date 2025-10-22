import { Box, Text, useInput } from 'ink';
import { type FC, useEffect, useState } from 'react';
import useItem from '../state';
import Modal from './Modal';
import TextInput from './TextInput';

type CreateStoreModalProps = {
  isOpen: boolean;
  onClose: (name?: string, icon?: string) => void;
};

const CreateStoreModal: FC<CreateStoreModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [storeIcon, setStoreIcon] = useState('');
  const [selectedField, setSelectedField] = useState<'name' | 'icon' | null>(
    null,
  );
  const [hoveredField, setHoveredField] = useState<'name' | 'icon'>('name');
  const { setModal } = useItem();

  useEffect(() => {
    if (!isOpen) return;
    setModal('create-category');
  }, [isOpen, setModal]);

  const handleModalClose = async (name?: string, storeIcon?: string) => {
    setName('');
    setStoreIcon('');
    setSelectedField(null);
    setHoveredField('name');
    setModal(null);
    onClose(name, storeIcon);
  };

  useInput((input, key) => {
    if (key.return) {
      setSelectedField(selectedField ? null : hoveredField);
      return;
    }

    if (selectedField) return;

    if (input === 'j') {
      switch (hoveredField) {
        case 'name':
          setHoveredField('icon');
          break;
        default:
          setHoveredField(hoveredField);
          break;
      }
    }

    if (input === 'k') {
      switch (hoveredField) {
        case 'icon':
          setHoveredField('name');
          break;
        default:
          setHoveredField(hoveredField);
          break;
      }
    }

    if (input === 'y') {
      handleModalClose(name, storeIcon);
    }

    if (input === 'n') {
      handleModalClose();
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      title="Add Store"
      message="Enter the name of the category"
    >
      <Box flexDirection="column">
        <Box marginBottom={1}>
          {selectedField === 'name' ? (
            <Text color="gray">{name.length > 0 ? name : 'Store name'}</Text>
          ) : (
            <TextInput
              value={name}
              onChange={(e) => setName(e)}
              fieldPlaceholder="Store name"
              hoveredField={hoveredField}
              selectedField={selectedField}
              fieldName="name"
              fieldTitle="Name"
            />
          )}
          {selectedField === 'icon' ? (
            <Text color="gray">{name.length > 0 ? name : 'Store name'}</Text>
          ) : (
            <TextInput
              value={name}
              onChange={(e) => setName(e)}
              fieldPlaceholder="Store name"
              hoveredField={hoveredField}
              selectedField={selectedField}
              fieldName="icon"
              fieldTitle="Icon"
            />
          )}
        </Box>
        <Text color="cyan">Press [y] to confirm</Text>
        <Text color="cyan">Press [n] to cancel</Text>
      </Box>
    </Modal>
  );
};

export default CreateStoreModal;
