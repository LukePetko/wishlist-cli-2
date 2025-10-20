import { Box, useInput } from 'ink';
import { useState } from 'react';
import useItem from '../state';
import Checkbox from './Checkbox';
import TextInput from './TextInput';

const fields = ['name', 'description', 'image', 'isBought'] as const;
type Field = (typeof fields)[number];

const Info = () => {
  const { activeItem, setActiveItem } = useItem();
  const [hoveredField, setHoveredField] = useState<Field>('name');
  const [selectedField, setSelectedField] = useState<Field | null>(null);

  useInput((input, key) => {
    if (key.return) {
      if (selectedField) setSelectedField(null);
      else setSelectedField(hoveredField);
    }

    if (selectedField) return;

    if (input === 'j') {
      switch (hoveredField) {
        case 'name':
          setHoveredField('description');
          break;
        case 'description':
          setHoveredField('image');
          break;
        case 'image':
          setHoveredField('isBought');
          break;
        default:
          setHoveredField(hoveredField);
          break;
      }
    }

    if (input === 'k') {
      switch (hoveredField) {
        case 'description':
          setHoveredField('name');
          break;
        case 'image':
          setHoveredField('description');
          break;
        case 'isBought':
          setHoveredField('image');
          break;
        default:
          setHoveredField(hoveredField);
          break;
      }
    }
  });

  return (
    <Box flexDirection="column">
      <TextInput
        value={activeItem?.name ?? ''}
        onChange={(value) => setActiveItem({ ...activeItem, name: value })}
        fieldPlaceholder="Name"
        hoveredField={hoveredField}
        selectedField={selectedField}
        fieldName="name"
        fieldTitle="Name"
      />
      <TextInput
        value={activeItem?.description ?? ''}
        onChange={(value) =>
          setActiveItem({ ...activeItem, description: value })
        }
        fieldPlaceholder="Description"
        hoveredField={hoveredField}
        selectedField={selectedField}
        fieldName="description"
        fieldTitle="Description"
      />
      <TextInput
        value={activeItem?.image ?? ''}
        onChange={(value) => setActiveItem({ ...activeItem, image: value })}
        fieldPlaceholder="Image"
        hoveredField={hoveredField}
        selectedField={selectedField}
        fieldName="image"
        fieldTitle="Image"
      />
      <Checkbox
        isChecked={activeItem?.isBought ?? false}
        onChange={(value) => setActiveItem({ ...activeItem, isBought: value })}
        hoveredField={hoveredField}
        selectedField={selectedField}
        fieldName="isBought"
        fieldTitle="Is Bought"
      />
    </Box>
  );
};

export default Info;
