import { Box, Text } from 'ink';
import { pages } from '../constants';
import useItem from '../state';
import capitalize from '../utils/capitalize';

const NavBar = () => {
  const { page: currentPage } = useItem();
  return (
    <Box paddingX={1} paddingBottom={1}>
      {pages.map((page) => (
        <Text key={page} backgroundColor={currentPage === page ? 'blue' : ''}>
          {' '}
          {capitalize(page)}{' '}
        </Text>
      ))}
    </Box>
  );
};

export default NavBar;
