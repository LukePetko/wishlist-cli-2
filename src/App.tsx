import { Text, useApp, useInput } from 'ink';
import { useEffect } from 'react';
import { db } from './db';
import { wishlistItems } from './db/schema';

export default function App() {
  const { exit } = useApp();

  const fetchData = async () => {
    const res = await db.select().from(wishlistItems).execute();
    console.log(res);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useInput((input, key) => {
    if (input === 'q' || key.escape || key.return) exit();
  });

  return (
    <>
      <Text>Hello world!</Text>
    </>
  );
}
