import { Text, useApp, useInput } from 'ink';

export default function App() {
  const { exit } = useApp();

  useInput((input, key) => {
    if (input === 'q' || key.escape || key.return) exit();
  });

  return (
    <>
      <Text>Hello world!</Text>
    </>
  );
}
