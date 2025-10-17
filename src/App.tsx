import { Box, useApp, useInput } from 'ink';
import Header from './components/Header';
import List from './components/List';

export default function App() {
  const { exit } = useApp();

  useInput((input, key) => {
    if (input === 'q') exit();
    if (input === 'a') console.log('a');
  });

  return (
    <Box flexDirection="column">
      <Header />
      <List />
    </Box>
  );
}
