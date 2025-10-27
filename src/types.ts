import type { pages } from './constants';
import type {
  categories,
  difficultyLevels,
  stores,
  wishlistItems,
} from './db/schema';

export type WishlistLink = {
  id?: string;
  storeId: string | null;
  itemId: string | null;
  url: string | null;
  price: number | null;
  currency: string | null;
  store: Store;
};

export type WishlistItem = Omit<
  typeof wishlistItems.$inferInsert,
  'difficultyLevel' | 'id'
> & {
  id: string | null;
  wishlistLinks: WishlistLink[] | undefined;

  wishlistItemsCategories: (typeof categories.$inferSelect)[];
  difficultyLevel: typeof difficultyLevels.$inferSelect | null;
};

export type Page = (typeof pages)[number];

export type DifficultyLevel = typeof difficultyLevels.$inferSelect;

export type Category = typeof categories.$inferSelect;

export type Store = typeof stores.$inferInsert;
