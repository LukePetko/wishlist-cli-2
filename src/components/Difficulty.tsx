import { Box, Text, useInput } from 'ink';
import { useEffect, useState } from 'react';
import fetchDifficulties from '../db/fetchDifficulties';
import useItem from '../state';
import type { DifficultyLevel } from '../types';

const Difficulty = () => {
  const { activeItem, setActiveItem } = useItem();
  const [difficulties, setDifficulties] = useState<DifficultyLevel[]>([
    {
      id: 'no-difficulty',
      name: 'No Difficulty',
      color: null,
    },
  ]);
  const [hoveredField, setHoveredField] = useState<string | null>(
    difficulties[0].id,
  );

  const handleDifficultyFetch = async () => {
    const res = await fetchDifficulties();
    setDifficulties((prev) => [...prev, ...res]);
  };

  useEffect(() => {
    handleDifficultyFetch();
  }, []);

  useInput((input, key) => {
    const currentDifficulty = difficulties.findIndex(
      (difficulty) => difficulty.id === hoveredField,
    );
    if (input === 'j') {
      if (currentDifficulty === difficulties.length - 1) return;
      setHoveredField(difficulties[currentDifficulty + 1].id);
    }

    if (input === 'k') {
      if (currentDifficulty === 0) return;
      setHoveredField(difficulties[currentDifficulty - 1].id);
    }

    if (input === ' ') {
      if (!hoveredField) return;
      setActiveItem({
        ...activeItem,
        difficultyLevel:
          difficulties.find((d) => d.id === hoveredField) ?? null,
      });
    }
  });

  return (
    <Box flexDirection="column">
      {difficulties.map((difficulty) => {
        const color = difficulty.id === hoveredField ? 'cyan' : 'white';
        return (
          <Box key={difficulty.id}>
            {hoveredField === difficulty.id ? (
              <Text color={color}> ❯ </Text>
            ) : (
              <Text>{'   '}</Text>
            )}
            <Text color={color} bold={hoveredField === difficulty.id}>
              [{difficulty.id === activeItem?.difficultyLevel?.id ? 'X' : ' '}]
            </Text>
            <Text color={color}> {difficulty.name}</Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default Difficulty;
