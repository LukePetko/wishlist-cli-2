import { Box, Text, useInput } from 'ink';
import useItem from '../state';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { wishlistItems } from '../db/schema';
import { useEffect } from 'react';
import type { WishlistItem } from '../types';
import { v4 as uuidv4 } from 'uuid';
import NavBar from './NavBar';
import Info from './Info';
import Difficulty from './Difficulty';
import Category from './Category';

const Item = () => {
  const {
    item,
    setItem,
    page,
    setPage,
    setActiveItem,
    activeItem,
    backHome,
    modal,
  } = useItem();

  const getWishlistItem = async () => {
    if (!item) return;
    if (item === 'create') {
      setActiveItem({
        name: '',
        id: uuidv4(),
        image: null,
        description: null,
        isBought: false,
        difficultyLevel: null,
        wishlistLinks: [],
        wishlistItemsCategories: [],
      });
      return;
    }

    const data = await db.query.wishlistItems.findFirst({
      where: eq(wishlistItems.id, item),
      with: {
        wishlistLinks: {
          with: {
            store: true,
          },
        },
        wishlistItemsCategories: {
          with: {
            category: true,
          },
        },
        difficultyLevel: true,
      },
    });

    if (!data) return;

    const parsedData = {
      ...data,
      wishlistItemsCategories: data.wishlistItemsCategories.map(
        (item) => item.category,
      ),
    } satisfies WishlistItem;

    setActiveItem(parsedData);
  };

  useEffect(() => {
    getWishlistItem();
  }, [item]);

  useInput((input, key) => {
    if (modal) return;
    if (input === 'p') setItem(null);

    if (input === 'l') {
      switch (page) {
        case 'info':
          setPage('difficulty');
          break;
        case 'difficulty':
          setPage('categories');
          break;
        case 'categories':
          setPage('links');
          break;
        default:
          setPage(page);
          break;
      }
    }

    if (input === 'h') {
      switch (page) {
        case 'difficulty':
          setPage('info');
          break;
        case 'categories':
          setPage('difficulty');
          break;
        case 'links':
          setPage('categories');
          break;
        default:
          setPage(page);
          break;
      }
    }

    if (input === 'x') {
      console.log(activeItem);
    }

    if (input === 'b') {
      backHome();
    }
  });
  return (
    <Box flexDirection="column" marginTop={1}>
      <NavBar />
      {page === 'info' && <Info />}
      {page === 'difficulty' && <Difficulty />}
      {page === 'categories' && <Category />}
    </Box>
  );
};

export default Item;
