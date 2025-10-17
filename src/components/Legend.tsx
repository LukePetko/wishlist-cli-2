import { Box, Text } from 'ink';
import type { FC } from 'react';

type LegendProps = {
  showIsBought: 'all' | 'bought' | 'unbought';
};

const Legend: FC<LegendProps> = ({ showIsBought }) => {
  return (
    <Box flexDirection="column" paddingX={1} borderStyle="single">
      <Text>
        Welcome to the <Text bold>wishlist-cli-2</Text>. Here you can manage
        your wishlist items.
      </Text>
      <Text bold>Legend:</Text>
      <Text>
        <Text bold>a</Text>: Add new item
      </Text>
      <Text>
        <Text bold>b</Text>: Toggle show bought items
      </Text>
      <Text>
        <Text bold>h</Text>: Previous page
      </Text>
      <Text>
        <Text bold>l</Text>: Next page
      </Text>
      <Box marginTop={1}>
        <Text>
          Showing: <Text bold>{''}</Text>
          <Text bold={showIsBought === 'unbought'}>Unbought</Text> |{' '}
          <Text bold={showIsBought === 'bought'}>Bought</Text> |{' '}
          <Text bold={showIsBought === 'all'}>All Items</Text>
        </Text>
      </Box>
    </Box>
  );
};

export default Legend;
