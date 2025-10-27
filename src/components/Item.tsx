import { eq } from 'drizzle-orm';
import { Box, useInput } from 'ink';
import { useEffect } from 'react';
import { db } from '../db';
import { wishlistItems } from '../db/schema';
import useItem from '../state';
import type { WishlistItem } from '../types';
import Category from './Category';
import Difficulty from './Difficulty';
import Info from './Info';
import NavBar from './NavBar';
import Links from './Links';
import useSave from '../lib/useSave';

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

  const { handleSave } = useSave();

  const getWishlistItem = async () => {
    if (!item) return;
    if (item === 'create') {
      setActiveItem({
        name: '',
        id: null,
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

    if (input === 's') {
      handleSave();
    }
  });
  return (
    <Box flexDirection="column" marginTop={1}>
      <NavBar />
      {page === 'info' && <Info />}
      {page === 'difficulty' && <Difficulty />}
      {page === 'categories' && <Category />}
      {page === 'links' && <Links />}
    </Box>
  );
};

export default Item;
