import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';
import { useEffect, useState } from 'react';
import { db } from '../db';
import { wishlistItems as wishlistItemsSchema } from '../db/schema';
import { count, eq } from 'drizzle-orm';
import useItem from '../state';
import Legend from './Legend';

const List = () => {
  const [wishlistItems, setWishlistItems] = useState<
    { value: string; label: string }[]
  >([]);
  const { setItem } = useItem();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [showIsBought, setShowIsBought] = useState<
    'unbought' | 'bought' | 'all'
  >('unbought');
  const [numberOfPages, setNumberOfPages] = useState(1);

  const fetchWishlistItems = async () => {
    const res = await db
      .select({
        value: wishlistItemsSchema.id,
        label: wishlistItemsSchema.name,
      })
      .from(wishlistItemsSchema)
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .execute();

    setWishlistItems(res);
  };

  const fetchNumberOfPages = async () => {
    const result = await db
      .select({ count: count() })
      .from(wishlistItemsSchema)
      .where(
        showIsBought === 'all'
          ? undefined
          : eq(wishlistItemsSchema.isBought, showIsBought === 'bought'),
      );

    if (result.length === 0) return;

    setNumberOfPages(Math.ceil(result[0].count / pageSize));
  };

  useEffect(() => {
    fetchNumberOfPages();
  }, [showIsBought]);

  useEffect(() => {
    fetchWishlistItems();
  }, [page, showIsBought]);

  useInput((input, key) => {
    if (input === 'l')
      setPage((page) => (page < numberOfPages ? page + 1 : page));
    if (input === 'h') setPage((page) => (page > 1 ? page - 1 : page));
    if (input === 'a') setItem('create');
    if (input === 'b')
      setShowIsBought((showIsBought) => {
        switch (showIsBought) {
          case 'unbought':
            return 'bought';
          case 'bought':
            return 'all';
          default:
            return 'unbought';
        }
      });
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Legend showIsBought={showIsBought} />
      <SelectInput
        items={wishlistItems}
        onSelect={(item) => setItem(item.value)}
      />
      <Box
        flexDirection="column"
        padding={1}
        paddingTop={pageSize - wishlistItems.length + 1}
      >
        <Text>
          &#8592; h {page}/{numberOfPages} l &#8594;
        </Text>
      </Box>
    </Box>
  );
};

export default List;
