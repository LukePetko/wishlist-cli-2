import { useState } from 'react';
import useItem from '../state';
import { Box, Text, useInput } from 'ink';
import codeToSymbol from '../utils/codeToSymbol';
import LinkModal from './LinkModal';

const Links = () => {
  const { activeItem, modal, setModal } = useItem();

  const [hoveredField, setHoveredField] = useState<string | null>(null);

  useInput((input, key) => {
    if (modal) return;

    if (key.return) {
      setModal('create-link');
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
        setHoveredField(activeItem?.wishlistLinks[currentLink + 1].id);
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

  return (
    <Box flexDirection="column">
      {activeItem?.wishlistLinks?.map((link) => (
        <Box key={link.id}>
          {hoveredField === link.id ? (
            <Text color="cyan"> ❯ </Text>
          ) : (
            <Text color="cyan">{'   '}</Text>
          )}
          <Text color={hoveredField === link.id ? 'cyan' : 'white'}>
            {link.store.name} - {link.price}
            {codeToSymbol(link.currency)}
          </Text>
        </Box>
      ))}
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
        link={
          activeItem?.wishlistLinks?.find((link) => link.id === hoveredField) ??
          null
        }
      />
    </Box>
  );
};

export default Links;
