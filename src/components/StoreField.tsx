import { Box, Text } from 'ink';

type StoreFieldProps = {
  isHovered: boolean;
  isSelected: boolean;
};

const StoreField = ({ isHovered, isSelected }: StoreFieldProps) => {
  return (
    <Box>
      {isHovered ? (
        <Text color="cyan" bold={isSelected}>
          ❯{' '}
        </Text>
      ) : (
        <Text>{'  '}</Text>
      )}
      <Text color="cyan" bold={isSelected}>
        Store:
      </Text>
    </Box>
  );
};

export default StoreField;
