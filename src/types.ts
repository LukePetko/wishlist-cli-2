import type { pages } from './constants';
import type {
  categories,
  difficultyLevels,
  stores,
  wishlistItems,
  wishlistLinks,
} from './db/schema';

export type WishlistLink = typeof wishlistLinks.$inferSelect & {
  store: typeof stores.$inferSelect;
};

export type WishlistItem = Omit<
  typeof wishlistItems.$inferInsert,
  'difficultyLevel'
> & {
  wishlistLinks: WishlistLink[] | undefined;

  wishlistItemsCategories: (typeof categories.$inferSelect)[];
  difficultyLevel: typeof difficultyLevels.$inferSelect | null;
};

export type Page = (typeof pages)[number];

export type DifficultyLevel = typeof difficultyLevels.$inferSelect;
