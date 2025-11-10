import { Box, Text } from 'ink';

const ItemLegend = () => {
  return (
    <Box flexDirection="column" paddingX={1} borderStyle="single">
      <Text bold>Legend:</Text>
      <Text>
        <Text bold>s</Text>: Save changes
      </Text>
      <Text>
        <Text bold>h</Text>: Previous tab
      </Text>
      <Text>
        <Text bold>l</Text>: Next tab
      </Text>
    </Box>
  );
};

export default ItemLegend;
