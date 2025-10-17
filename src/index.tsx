import { render } from 'ink';
import App from './App.tsx';

console.clear();
const { waitUntilExit } = render(<App />);

await waitUntilExit();
