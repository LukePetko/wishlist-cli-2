import { Text, useStdout } from 'ink';
import Gradient from 'ink-gradient';
import figlet from 'figlet';

import Big from 'figlet/importable-fonts/Big.js';
import AnsiShadow from 'figlet/importable-fonts/ANSI Shadow.js';
import Banner3D from 'figlet/importable-fonts/Banner3-D.js';
import Cyberlarge from 'figlet/importable-fonts/Cyberlarge.js';

// register a few “filled” fonts
figlet.parseFont('Big', Big);
figlet.parseFont('ANSI Shadow', AnsiShadow);
figlet.parseFont('Banner3-D', Banner3D);
figlet.parseFont('Cyberlarge', Cyberlarge);

type Props = {
  text: string;
  font?: 'Big' | 'ANSI Shadow' | 'Banner3-D' | 'Cyberlarge';
  colors?: string[];
  align?: 'left' | 'center' | 'right';
};

export function Banner({
  text,
  font = 'Big',
  colors = ['#FF6EC7', '#9D7DF9', '#6DD3FF'],
  align = 'left',
}: Props) {
  const { stdout } = useStdout();
  const width = stdout?.columns ?? 80;

  const ascii = figlet.textSync(text, {
    font,
    horizontalLayout: 'default', // denser look than 'fitted'
    verticalLayout: 'fitted',
    width,
    whitespaceBreak: true,
  });

  const lines = ascii.split('\n');
  const pad = (line: string) => {
    if (align === 'left') return line;
    const padLeft = Math.max(
      0,
      Math.floor((width - line.length) / (align === 'center' ? 2 : 1)),
    );
    return ' '.repeat(padLeft) + line;
  };

  return (
    <Gradient colors={colors}>
      <Text>{lines.map(pad).join('\n')}</Text>
    </Gradient>
  );
}

export default Banner;
