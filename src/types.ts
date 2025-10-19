import { pages } from './constants';
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

export type WishlistItem = typeof wishlistItems.$inferInsert & {
  wishlistLinks: WishlistLink[];

  wishlistItemsCategories: (typeof categories.$inferSelect)[];
  difficultyLevel: typeof difficultyLevels.$inferSelect | null;
};

export type Page = (typeof pages)[number];
