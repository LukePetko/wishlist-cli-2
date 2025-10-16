import { relations } from "drizzle-orm/relations";
import { difficultyLevels, wishlistItems, stores, wishlistLinks, wishlistItemsCategories, categories } from "./schema";

export const wishlistItemsRelations = relations(wishlistItems, ({one, many}) => ({
	difficultyLevel: one(difficultyLevels, {
		fields: [wishlistItems.difficultyLevel],
		references: [difficultyLevels.id]
	}),
	wishlistLinks: many(wishlistLinks),
	wishlistItemsCategories: many(wishlistItemsCategories),
}));

export const difficultyLevelsRelations = relations(difficultyLevels, ({many}) => ({
	wishlistItems: many(wishlistItems),
}));

export const wishlistLinksRelations = relations(wishlistLinks, ({one}) => ({
	store: one(stores, {
		fields: [wishlistLinks.storeId],
		references: [stores.id]
	}),
	wishlistItem: one(wishlistItems, {
		fields: [wishlistLinks.itemId],
		references: [wishlistItems.id]
	}),
}));

export const storesRelations = relations(stores, ({many}) => ({
	wishlistLinks: many(wishlistLinks),
}));

export const wishlistItemsCategoriesRelations = relations(wishlistItemsCategories, ({one}) => ({
	wishlistItem: one(wishlistItems, {
		fields: [wishlistItemsCategories.itemId],
		references: [wishlistItems.id]
	}),
	category: one(categories, {
		fields: [wishlistItemsCategories.categoryId],
		references: [categories.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	wishlistItemsCategories: many(wishlistItemsCategories),
}));