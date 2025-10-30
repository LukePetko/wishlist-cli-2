import { Box, Text, useInput } from 'ink';
import { useEffect, useState } from 'react';
import createNewCategory from '../db/createNewCategory';
import fetchCategories from '../db/fetchCategories';
import useItem from '../state';
import type { Category as CategoryType } from '../types';
import CreateCategoryModal from './CreateCategoryModal';

const Category = () => {
  const { activeItem, setActiveItem, modal } = useItem();
  const [categories, setCategories] = useState<CategoryType[]>([
    {
      id: 'add-category',
      name: 'Add Category',
    },
  ]);
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = async (name?: string) => {
    if (!name || categories.find((c) => c.name === name)) {
      setIsModalOpen(false);
      return;
    }

    await createNewCategory(name);
    handleCategoryFetch();
    setIsModalOpen(false);
  };

  const handleCategoryFetch = async () => {
    const res = await fetchCategories();
    setCategories([
      ...res,
      {
        id: 'add-category',
        name: 'Add Category',
      },
    ]);
  };

  useEffect(() => {
    handleCategoryFetch();
  }, []);

  useInput((input, key) => {
    if (modal) return;
    const currentCategory = categories.findIndex(
      (category) => category.id === hoveredField,
    );
    if (input === 'j') {
      if (currentCategory === categories.length - 1) return;
      setHoveredField(categories[currentCategory + 1].id ?? null);
    }

    if (input === 'k') {
      if (currentCategory === 0) return;
      setHoveredField(categories[currentCategory - 1].id ?? null);
    }

    if (input === ' ') {
      if (!hoveredField) return;
      if (
        activeItem?.wishlistItemsCategories?.find((c) => c.id === hoveredField)
      ) {
        setActiveItem({
          ...activeItem,
          wishlistItemsCategories: activeItem.wishlistItemsCategories.filter(
            (c) => c.id !== hoveredField,
          ),
        });
      } else {
        setActiveItem({
          ...activeItem,
          wishlistItemsCategories: [
            ...(activeItem?.wishlistItemsCategories ?? []),
            {
              id: hoveredField,
              name: categories.find((c) => c.id === hoveredField)?.name ?? '',
            },
          ],
        });
      }
    }

    if (key.return && hoveredField === 'add-category') {
      setIsModalOpen(true);
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
            {category.id !== 'add-category' && (
              <Text color={color} bold={hoveredField === category.id}>
                [
                {activeItem?.wishlistItemsCategories?.find(
                  (c) => c.id === category.id,
                )
                  ? 'X'
                  : ' '}
                ]{' '}
              </Text>
            )}
            <Text color={color}>{category.name}</Text>
          </Box>
        );
      })}
      <CreateCategoryModal isOpen={isModalOpen} onClose={handleModalClose} />
    </Box>
  );
};

export default Category;
