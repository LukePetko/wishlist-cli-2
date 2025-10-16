import { relations } from 'drizzle-orm';
import {
  boolean,
  foreignKey,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const wishlistOrders = pgTable('wishlist_orders', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  itemId: uuid('item_id').notNull(),
  isOrdered: boolean('is_ordered').default(false).notNull(),
  note: text(),
});

export const wishlistItems = pgTable(
  'wishlist_items',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    image: varchar({ length: 2083 }),
    description: text(),
    isBought: boolean('is_bought').default(false).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    difficultyLevel: uuid('difficulty_level'),
  },
  (table) => [
    foreignKey({
      columns: [table.difficultyLevel],
      foreignColumns: [difficultyLevels.id],
      name: 'fk_wishlist_items_difficulty_level',
    }).onDelete('set null'),
  ],
);

export const difficultyLevels = pgTable('difficulty_levels', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  color: varchar({ length: 255 }),
});

export const wishlistLinks = pgTable(
  'wishlist_links',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    itemId: uuid('item_id').notNull(),
    url: varchar({ length: 2083 }).notNull(),
    price: numeric({ precision: 10, scale: 2 }).notNull(),
    currency: varchar({ length: 3 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    storeId: uuid('store_id').notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.storeId],
      foreignColumns: [stores.id],
      name: 'fk_wishlist_links_store_id',
    }),
    foreignKey({
      columns: [table.itemId],
      foreignColumns: [wishlistItems.id],
      name: 'fk_wishlist_links_item_id',
    }).onDelete('cascade'),
  ],
);

export const wishlistItemsCategories = pgTable(
  'wishlist_items_categories',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    itemId: uuid('item_id').notNull(),
    categoryId: uuid('category_id').notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.itemId],
      foreignColumns: [wishlistItems.id],
      name: 'fk_wishlist_items_categories_item_id',
    }),
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: 'fk_wishlist_items_categories_category_id',
    }),
  ],
);

export const categories = pgTable('categories', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
});

export const stores = pgTable('stores', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  icon: varchar({ length: 2083 }),
  iconType: varchar('icon_type', { length: 255 }).default('local'),
});

export const wishlistItemsRelations = relations(
  wishlistItems,
  ({ one, many }) => ({
    difficultyLevel: one(difficultyLevels, {
      fields: [wishlistItems.difficultyLevel],
      references: [difficultyLevels.id],
    }),
    wishlistLinks: many(wishlistLinks),
    wishlistItemsCategories: many(wishlistItemsCategories),
  }),
);

export const difficultyLevelsRelations = relations(
  difficultyLevels,
  ({ many }) => ({
    wishlistItems: many(wishlistItems),
  }),
);

export const wishlistLinksRelations = relations(wishlistLinks, ({ one }) => ({
  store: one(stores, {
    fields: [wishlistLinks.storeId],
    references: [stores.id],
  }),
  wishlistItem: one(wishlistItems, {
    fields: [wishlistLinks.itemId],
    references: [wishlistItems.id],
  }),
}));

export const storesRelations = relations(stores, ({ many }) => ({
  wishlistLinks: many(wishlistLinks),
}));

export const wishlistItemsCategoriesRelations = relations(
  wishlistItemsCategories,
  ({ one }) => ({
    wishlistItem: one(wishlistItems, {
      fields: [wishlistItemsCategories.itemId],
      references: [wishlistItems.id],
    }),
    category: one(categories, {
      fields: [wishlistItemsCategories.categoryId],
      references: [categories.id],
    }),
  }),
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  wishlistItemsCategories: many(wishlistItemsCategories),
}));
