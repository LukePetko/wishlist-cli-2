import { Box, Text, useInput } from 'ink';
import type { WishlistLink } from '../types';
import Modal from './Modal';
import { useState } from 'react';
import TextInput from './TextInput';

type LinkModalProps = {
  link: WishlistLink | null;
  isOpen: boolean;
  onClose: () => void;
};

const LinkModal = ({ link, isOpen, onClose }: LinkModalProps) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  const handleModalClose = async (name?: string) => {
    onClose();
  };

  useInput((input, key) => {
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
        <Text color="cyan">Press [y] to confirm</Text>
        <Text color="cyan">Press [n] to cancel</Text>
      </Box>
    </Modal>
  );
};

export default LinkModal;
