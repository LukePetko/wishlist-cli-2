import { Box, Text, useInput } from 'ink';

type Corner =
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

type Offsets = {
  top?: number;
  left?: number;
};

type ModalProps = {
  isOpen: boolean;
  title: string;
  message?: string;
  position?: Corner | Offsets;
  width?: number;
  padding?: number;
  children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  position = 'center',
  width = 50,
  padding = 1,
  children,
}) => {
  if (!isOpen) return null;

  const isCorner = typeof position === 'string';

  const layoutForCorner = (corner: Corner) => {
    const topGrow = corner.startsWith('bottom') ? 1 : 0;
    const bottomGrow = corner.startsWith('top') ? 1 : 0;
    const leftGrow = corner.endsWith('right') ? 1 : 0;
    const rightGrow = corner.endsWith('left') ? 1 : 0;
    const center =
      corner === 'center'
        ? { topGrow: 1, bottomGrow: 1, leftGrow: 1, rightGrow: 1 }
        : { topGrow, bottomGrow, leftGrow, rightGrow };
    return center;
  };

  const { topGrow, bottomGrow, leftGrow, rightGrow } = isCorner
    ? layoutForCorner(position as Corner)
    : { topGrow: 0, bottomGrow: 0, leftGrow: 0, rightGrow: 0 };

  const topOffset =
    !isCorner && (position as Offsets).top ? (position as Offsets).top : 0;
  const leftOffset =
    !isCorner && (position as Offsets).left ? (position as Offsets).left : 0;

  return (
    <Box flexDirection="column" width="100%">
      <Box flexGrow={topGrow} />
      {topOffset ? <Box height={topOffset} /> : null}
      <Box width="100%">
        <Box flexGrow={leftGrow} />
        {leftOffset ? <Box width={leftOffset} /> : null}
        <Content
          width={width}
          padding={padding}
          title={title}
          message={message}
        >
          {children}
        </Content>
        <Box flexGrow={rightGrow} />
      </Box>
      <Box flexGrow={bottomGrow} />
    </Box>
  );
};

const Content: React.FC<{
  title: string;
  message?: string;
  width: number;
  padding: number;
  children?: React.ReactNode;
}> = ({ title, message, width, padding, children }) => (
  <Box
    flexDirection="column"
    borderStyle="round"
    borderColor="cyan"
    padding={padding}
    width={width}
    backgroundColor="black"
  >
    <Text bold color="cyan">
      {title}
    </Text>
    <Box marginY={1}>
      {children ? children : message ? <Text>{message}</Text> : null}
    </Box>
  </Box>
);

export default Modal;
