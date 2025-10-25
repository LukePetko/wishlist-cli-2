import { Box, Text } from 'ink';
import { useEffect, useState } from 'react';
import fetchStores from '../db/fetchStores';
import type { Store } from '../types';
import chunk from '../utils/chunk';

type StoreFieldProps = {
  isHovered: boolean;
  isSelected: boolean;
  selectedStoreId?: string;
};

const StoreField = ({
  isHovered,
  isSelected,
  selectedStoreId,
}: StoreFieldProps) => {
  const [stores, setStores] = useState<Store[][]>([]);

  const handleFetchStores = async () => {
    const res = await fetchStores();
    setStores(chunk(res, res.length > 15 ? res.length / 3 : 5));
  };

  useEffect(() => {
    handleFetchStores();
  }, []);

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
        {stores.map((storesChunk) => (
          <Box key={storesChunk[0].id} flexDirection="column">
            {storesChunk.map((store) => (
              <Box key={store.id}>
                {store.id === selectedStoreId ? (
                  <Text>(X)</Text>
                ) : (
                  <Text>( )</Text>
                )}
                <Text> {store.name}</Text>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StoreField;
