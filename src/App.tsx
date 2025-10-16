import { Box, Text, useApp, useInput } from 'ink';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { db } from './db';
import { wishlistItems as wishlistItemsSchema } from './db/schema';

export default function App() {
  const { exit } = useApp();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  useInput((input, key) => {
    if (input === 'q' || key.escape || key.return) exit();
    if (input === 'a') console.log('a');
  });

  const testFetch = async () => {
    const res = await db
      .select({
        id: wishlistItemsSchema.id,
        name: wishlistItemsSchema.name,
      })
      .from(wishlistItemsSchema)
      .limit(10)
      .execute();

    setWishlistItems(res);
  };

  useEffect(() => {
    testFetch();
  }, []);

  return (
    <Box flexDirection="column">
      <Header />
      {wishlistItems.map((item) => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </Box>
  );
}
