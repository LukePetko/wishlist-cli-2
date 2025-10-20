import { Box, Text, useInput } from 'ink';
import type { FC } from 'react';

type CheckboxProps = {
  isChecked: boolean;
  onChange: (value: boolean) => void;
  hoveredField: string;
  selectedField: string | null;
  fieldName: string;
  fieldTitle: string;
};

const Chekcbox: FC<CheckboxProps> = ({
  isChecked,
  onChange,
  hoveredField,
  selectedField,
  fieldName,
  fieldTitle,
}) => {
  useInput((input) => {
    if (input === ' ') {
      if (!selectedField) return;
      onChange(!isChecked);
    }
  });

  return (
    <Box flexDirection="row" gap={1}>
      {hoveredField === fieldName ? (
        <Text color="cyan">❯</Text>
      ) : (
        <Text color="cyan"> </Text>
      )}
      <Text color="cyan" bold={hoveredField === fieldName}>
        {fieldTitle}:
      </Text>
      <Text color={selectedField === fieldName ? 'white' : 'gray'}>
        [{isChecked ? 'X' : ' '}]
      </Text>
    </Box>
  );
};

export default Chekcbox;
