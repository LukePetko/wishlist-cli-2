import { Box, Text } from 'ink';
import InkTextInput from 'ink-text-input';
import type { FC } from 'react';

type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  hoveredField: string;
  selectedField: string | null;
  fieldName: string;
  fieldTitle: string;
  fieldPlaceholder?: string;
};

const TextInput: FC<TextInputProps> = ({
  value,
  onChange,
  hoveredField,
  selectedField,
  fieldName,
  fieldTitle,
  fieldPlaceholder,
}) => {
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
      {selectedField === fieldName ? (
        <InkTextInput
          value={value}
          placeholder={fieldPlaceholder}
          onChange={onChange}
        />
      ) : (
        <Text color="gray">{value}</Text>
      )}
    </Box>
  );
};

export default TextInput;
