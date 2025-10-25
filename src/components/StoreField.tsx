import { Box, Text, useInput } from 'ink';
import { useEffect, useState } from 'react';
import fetchStores from '../db/fetchStores';
import type { Store } from '../types';
import chunk from '../utils/chunk';

type StoreFieldProps = {
  isHovered: boolean;
  isSelected: boolean;
  unselect?: () => void;
  currentStoreId?: string;
  setCurrentStoreId?: (storeId: string) => void;
};

const StoreField = ({
  isHovered,
  isSelected,
  unselect,
  currentStoreId,
  setCurrentStoreId,
}: StoreFieldProps) => {
  const [chunkedStores, setChunkedStores] = useState<Store[][]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [hoveredStoreId, setHoveredStoreId] = useState<string | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  const handleFetchStores = async () => {
    const res = await fetchStores();
    setChunkedStores(chunk(res, res.length > 15 ? res.length / 3 : 5));
    setStores(res);
  };

  useEffect(() => {
    handleFetchStores();
  }, []);

  useInput((input, key) => {
    if (!isSelected) return;

    const currentHoveredStoreIndex =
      stores.findIndex((store) => store.id === hoveredStoreId) ?? 0;

    if (input === 'j') {
      if (currentHoveredStoreIndex === stores.length - 1) {
        return;
      }
      setHoveredStoreId(
        stores[currentHoveredStoreIndex + 1]?.id ?? stores[0]?.id,
      );
    }

    if (input === 'k') {
      if (currentHoveredStoreIndex === 0) {
        return;
      }
      setHoveredStoreId(
        stores[currentHoveredStoreIndex - 1]?.id ?? stores[0]?.id,
      );
    }

    if (input === ' ') {
      if (!hoveredStoreId) return;
      setSelectedStoreId(hoveredStoreId);
      // if (setCurrentStoreId) setCurrentStoreId(hoveredStoreId);
    }

    if (key.return) {
      if (unselect) unselect();
    }
  });

  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
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
      <Box flexDirection="row" gap={1}>
        {chunkedStores.map((storesChunk) => (
          <Box key={storesChunk[0].id} flexDirection="column">
            {storesChunk.map((store) => {
              const color = hoveredStoreId === store.id ? 'cyan' : 'white';
              return (
                <Box key={store.id}>
                  {store.id === currentStoreId ? (
                    <Text color={color}> (X)</Text>
                  ) : (
                    <Text color={color}>( )</Text>
                  )}
                  <Text color={color}> {store.name}</Text>
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StoreField;
