import { Box, useApp, useInput } from 'ink';
import Header from './components/Header';
import Item from './components/Item';
import List from './components/List';
import useItem from './state';

export default function App() {
  const { exit } = useApp();
  const { item } = useItem();

  useInput((input, key) => {
    if (input === 'q') exit();
  });

  return (
    <Box flexDirection="column">
      <Header />
      {!item && <List />}
      {item && <Item />}
    </Box>
  );
}
