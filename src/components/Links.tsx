import { Box, Text, useInput } from 'ink';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useItem from '../state';
import type { WishlistLink } from '../types';
import codeToSymbol from '../utils/codeToSymbol';
import LinkModal from './LinkModal';

const Links = () => {
  const { setActiveItem, activeItem, modal, setModal, setBlockInput } =
    useItem();

  const [hoveredField, setHoveredField] = useState<string | null>(null);

  useInput((input, key) => {
    if (modal) return;

    if (key.return) {
      const newLinkId = uuidv4();
      if (hoveredField === 'create-link') {
        setLink({
          id: newLinkId,
          storeId: null,
          itemId: null,
          store: {
            name: '',
            icon: null,
          },
          url: null,
          price: null,
          currency: 'EUR',
        });
        setHoveredField(newLinkId);
      }
      setModal('create-link');
      setBlockInput(true);
    }

    if (activeItem?.wishlistLinks) {
      const currentLink = activeItem?.wishlistLinks?.findIndex(
        (link) => link.id === hoveredField,
      );
      if (input === 'j') {
        if (hoveredField === 'create-link') {
          return;
        }
        if (currentLink === activeItem?.wishlistLinks.length - 1) {
          setHoveredField('create-link');
          return;
        }
        setHoveredField(activeItem?.wishlistLinks[currentLink + 1].id ?? null);
      }

      if (input === 'k') {
        if (currentLink === 0) return;
        if (hoveredField === 'create-link') {
          setHoveredField(activeItem?.wishlistLinks.at(-1)?.id ?? null);
          return;
        }
        setHoveredField(activeItem?.wishlistLinks[currentLink - 1].id);
      }
    }
  });

  const setLink = (newLink: WishlistLink) => {
    const currentLink = activeItem?.wishlistLinks?.find(
      (link) => link.id === newLink.id,
    );

    if (currentLink) {
      setActiveItem({
        ...activeItem,
        wishlistLinks: activeItem.wishlistLinks.map((link) => {
          if (link.id === currentLink.id) {
            return newLink;
          }
          return link;
        }),
      });
      return;
    }

    setActiveItem({
      ...activeItem,
      wishlistLinks: [...activeItem.wishlistLinks, newLink],
    });
  };

  return (
    <Box flexDirection="column">
      {activeItem?.wishlistLinks?.map((link) => {
        if (!link.storeId || !link.price || !link.currency) return;
        return (
          <Box key={link.id}>
            {hoveredField === link.id ? (
              <Text color="cyan"> ❯ </Text>
            ) : (
              <Text color="cyan">{'   '}</Text>
            )}
            <Text color={hoveredField === link.id ? 'cyan' : 'white'}>
              {link.store?.name} - {link.price}
              {codeToSymbol(link.currency)}
            </Text>
          </Box>
        );
      })}
      <Box>
        {hoveredField === 'create-link' ? (
          <Text color="cyan"> ❯ </Text>
        ) : (
          <Text>{'   '}</Text>
        )}
        <Text color={hoveredField === 'create-link' ? 'cyan' : 'white'} bold>
          Add Link
        </Text>
      </Box>
      <LinkModal
        isOpen={modal === 'create-link'}
        onClose={() => setModal(null)}
        linkId={hoveredField}
      />
    </Box>
  );
};

export default Links;
