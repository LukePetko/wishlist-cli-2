import { Box, Text, useApp, useInput } from 'ink';
import Header from './components/Header';

export default function App() {
  const { exit } = useApp();

  useInput((input, key) => {
    if (input === 'q' || key.escape || key.return) exit();
    if (input === 'a') console.log('a');
  });

  return (
    <Box>
      <Header />
    </Box>
  );
}
