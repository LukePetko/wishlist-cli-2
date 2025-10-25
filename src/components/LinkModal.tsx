import { Box, Text, useInput } from 'ink';
import type { WishlistLink } from '../types';
import Modal from './Modal';
import { useState } from 'react';
import TextInput from './TextInput';
import StoreField from './StoreField';

type LinkModalProps = {
  link: WishlistLink | null;
  setLink: (link: WishlistLink) => void;
  isOpen: boolean;
  onClose: () => void;
};

type HoveredField = 'url' | 'store' | 'price' | 'currency';

const LinkModal = ({ link, isOpen, onClose, setLink }: LinkModalProps) => {
  const [selectedField, setSelectedField] = useState<HoveredField | null>(null);
  const [hoveredField, setHoveredField] = useState<HoveredField>('url');

  const handleModalClose = async (name?: string) => {
    onClose();
  };

  useInput((input, key) => {
    if (!isOpen || selectedField === 'store') return;

    if (key.return) {
      setSelectedField(selectedField ? null : hoveredField);
    }

    if (input === 'j') {
      switch (hoveredField) {
        case 'url':
          setHoveredField('price');
          break;
        case 'price':
          setHoveredField('currency');
          break;
        case 'currency':
          setHoveredField('store');
          break;
        case 'store':
          setHoveredField(hoveredField);
          break;
        default:
          setHoveredField(hoveredField);
      }
    }

    if (input === 'k') {
      switch (hoveredField) {
        case 'url':
          setHoveredField(hoveredField);
          break;
        case 'price':
          setHoveredField('url');
          break;
        case 'currency':
          setHoveredField('price');
          break;
        case 'store':
          setHoveredField('currency');
          break;
        default:
          setHoveredField(hoveredField);
      }
    }

    if (input === 'y') {
      handleModalClose();
    }

    if (input === 'n') {
      handleModalClose();
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      title={link?.store.name ? link.store.name : 'Add New Link'}
    >
      <Box flexDirection="column">
        <Box flexDirection="column" marginBottom={1}>
          <TextInput
            value={link?.url ?? ''}
            onChange={(value) => setLink({ ...link, url: value })}
            fieldPlaceholder="https://"
            fieldName="url"
            fieldTitle="URL"
            hoveredField={hoveredField}
            selectedField={selectedField}
          />
          <TextInput
            value={link?.price ?? ''}
            onChange={(value) => setLink({ ...link, price: value })}
            fieldPlaceholder="0.00"
            fieldName="price"
            fieldTitle="Price"
            hoveredField={hoveredField}
            selectedField={selectedField}
          />
          <TextInput
            value={link?.currency ?? ''}
            onChange={(value) => setLink({ ...link, currency: value })}
            fieldPlaceholder="EUR"
            fieldName="currency"
            fieldTitle="Currency"
            hoveredField={hoveredField}
            selectedField={selectedField}
          />
          <StoreField
            isHovered={hoveredField === 'store'}
            isSelected={selectedField === 'store'}
            unselect={() => setSelectedField(null)}
            currentStoreId={link?.store.id}
            setCurrentStoreId={(storeId) => setLink({ ...link, storeId })}
          />
        </Box>
        <Text color="cyan">Press [y] to confirm</Text>
        <Text color="cyan">Press [n] to cancel</Text>
      </Box>
    </Modal>
  );
};

export default LinkModal;
