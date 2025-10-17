import type {
  categories,
  difficultyLevels,
  stores,
  wishlistItems,
  wishlistLinks,
} from './db/schema';

export type WishlistLink = typeof wishlistLinks.$inferSelect & {
  store: typeof stores.$inferSelect;
  priceEur: string;
};

export type WishlistItem = typeof wishlistItems.$inferSelect & {
  links: WishlistLink[];
  lowestPrice: WishlistLink;

  categories: (typeof categories.$inferSelect)[];
  difficultyLevel: typeof difficultyLevels.$inferSelect | null;
};
