import { Box, useApp, useInput } from 'ink';
import Header from './components/Header';
import Item from './components/Item';
import List from './components/List';
import useItem from './state';

export default function App() {
  const { exit } = useApp();
  const { item, blockInput } = useItem();

  useInput((input) => {
    if (blockInput) return;
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
