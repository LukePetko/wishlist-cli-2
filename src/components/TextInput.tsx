import { Box, Text } from 'ink';
import InkTextInput from 'ink-text-input';
import { useEffect } from 'react';
import useItem from '../state';

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
  const { setBlockInput } = useItem();

  useEffect(() => {
    if (selectedField) setBlockInput(true);
    else setBlockInput(false);
  }, [hoveredField, selectedField]);

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
