import { Box, Text } from 'ink';
import InkTextInput from 'ink-text-input';
import type { FC } from 'react';

type TextInputProps<T> = {
  value: string;
  onChange: (value: string) => void;
  hoveredField: T;
  selectedField: T | null;
  fieldName: T;
  fieldTitle: string;
  fieldPlaceholder?: string;
};

const TextInput = <T,>({
  value,
  onChange,
  hoveredField,
  selectedField,
  fieldName,
  fieldTitle,
  fieldPlaceholder,
}: TextInputProps<T>) => {
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
