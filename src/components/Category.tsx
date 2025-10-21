import { Box, Text, useInput } from 'ink';
import { useEffect, useState } from 'react';
import fetchCategories from '../db/fetchCategories';
import useItem from '../state';
import type { Category as CategoryType } from '../types';

const Category = () => {
  const { activeItem, setActiveItem } = useItem();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  const handleCategoryFetch = async () => {
    const res = await fetchCategories();
    setCategories((prev) => [...prev, ...res]);
  };

  useEffect(() => {
    handleCategoryFetch();
  }, []);

  useInput((input, key) => {
    const currentCategory = categories.findIndex(
      (category) => category.id === hoveredField,
    );
    if (input === 'j') {
      if (currentCategory === categories.length - 1) return;
      setHoveredField(categories[currentCategory + 1].id);
    }

    if (input === 'k') {
      if (currentCategory === 0) return;
      setHoveredField(categories[currentCategory - 1].id);
    }
  });

  return (
    <Box flexDirection="column">
      {categories.map((category) => {
        const color = category.id === hoveredField ? 'cyan' : 'white';
        return (
          <Box key={category.id}>
            {hoveredField === category.id ? (
              <Text color={color}> ❯ </Text>
            ) : (
              <Text>{'   '}</Text>
            )}
            <Text color={color} bold={hoveredField === category.id}>
              [{category.id === activeItem?.difficultyLevel?.id ? 'X' : ' '}]
            </Text>
            <Text color={color}> {category.name}</Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default Category;
