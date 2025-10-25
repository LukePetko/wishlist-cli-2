import type { pages } from './constants';
import type {
  categories,
  difficultyLevels,
  stores,
  wishlistItems,
  wishlistLinks,
} from './db/schema';

export type WishlistLink = Omit<typeof wishlistLinks.$inferSelect, 'id'> & {
  id?: string;
  store: typeof stores.$inferSelect;
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

export type Store = typeof stores.$inferSelect;
