import type { pages } from './constants';
import type {
  categories,
  difficultyLevels,
  stores,
  wishlistItems,
} from './db/schema';

export type WishlistLink = {
  id?: string;
  storeId?: string | null;
  itemId?: string | null;
  url?: string | null;
  price?: string | null;
  currency?: string | null;
  store: Store;
};

export type WishlistItem = Omit<
  typeof wishlistItems.$inferInsert,
  'difficultyLevel' | 'id' | 'name'
> & {
  id?: string | null;
  name?: string | null;
  wishlistLinks?: WishlistLink[] | undefined;

  wishlistItemsCategories?: (typeof categories.$inferInsert)[];
  difficultyLevel?: typeof difficultyLevels.$inferInsert | null;
};

export type Page = (typeof pages)[number];

export type DifficultyLevel = typeof difficultyLevels.$inferInsert;

export type Category = typeof categories.$inferInsert;

export type Store = typeof stores.$inferInsert;
