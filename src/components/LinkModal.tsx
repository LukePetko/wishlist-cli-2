import { Box, Text, useInput } from 'ink';
import { useEffect, useState } from 'react';
import useItem from '../state';
import type { Store, WishlistLink } from '../types';
import Modal from './Modal';
import StoreField from './StoreField';
import TextInput from './TextInput';

type LinkModalProps = {
  linkId: string | null;
  isOpen: boolean;
  onClose: () => void;
};

type HoveredField = 'url' | 'store' | 'price' | 'currency';

const LinkModal = ({ linkId, isOpen, onClose }: LinkModalProps) => {
  const [selectedField, setSelectedField] = useState<HoveredField | null>(null);
  const [hoveredField, setHoveredField] = useState<HoveredField>('url');

  const [link, setLink] = useState<WishlistLink | undefined>();

  const { setActiveItem, activeItem } = useItem();

  useEffect(() => {
    if (linkId) {
      setLink(activeItem?.wishlistLinks?.find((link) => link.id === linkId));
    }
  }, [linkId]);

  useEffect(() => {
    if (link) {
      setActiveItem({
        ...activeItem,
        wishlistLinks: activeItem?.wishlistLinks?.map((currentLink) => {
          if (currentLink.id !== linkId) {
            return currentLink;
          }
          return link;
        }),
      });
    }
  }, [link]);

  const handleModalClose = async () => {
    setHoveredField('url');
    onClose();
  };

  const handleDeleteLink = async () => {
    setActiveItem({
      ...activeItem,
      wishlistLinks: activeItem?.wishlistLinks?.filter(
        (link) => link.id !== linkId,
      ),
    });
    handleModalClose();
  };

  const handleStoreChange = (store: Store) => {
    setLink({ ...link, storeId: store.id ?? null, store });
  };

  useInput((input, key) => {
    if (!isOpen) return;

    if (key.return) {
      setSelectedField(selectedField ? null : hoveredField);
    }

    if (selectedField) return;

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

    if (input === 'c') {
      handleModalClose();
    }

    if (input === 'd') {
      handleDeleteLink();
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      title={link?.store?.name ? link.store.name : 'Add New Link'}
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
            currentStore={link?.store}
            setCurrentStore={handleStoreChange}
          />
        </Box>
        <Text color="cyan">Press [c] to confirm</Text>
        <Text color="cyan">Press [d] to delete</Text>
      </Box>
    </Modal>
  );
};

export default LinkModal;
