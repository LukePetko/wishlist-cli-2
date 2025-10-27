import useItem from '../state';
import { db } from '../db';
import {
  wishlistItems,
  wishlistItemsCategories,
  wishlistLinks,
} from '../db/schema';

const useSave = () => {
  const { activeItem } = useItem();

  const handleSave = async () => {
    if (!activeItem) return;

    return await db.transaction(async (tx) => {
      const [wishlistItem] = await tx
        .insert(wishlistItems)
        .values({
          name: activeItem.name,
          image: activeItem.image,
          description: activeItem.description,
          difficultyLevel: activeItem.difficultyLevel?.id,
        })
        .returning();

      if (activeItem.wishlistLinks && activeItem.wishlistLinks.length > 0) {
        await tx.insert(wishlistLinks).values(
          activeItem.wishlistLinks.map((link) => ({
            itemId: wishlistItem.id,
            url: link.url,
            price: link.price,
            currency: link.currency || 'EUR',
            storeId: link.storeId,
          })),
        );
      }

      if (
        activeItem.wishlistItemsCategories &&
        activeItem.wishlistItemsCategories.length > 0
      ) {
        await tx.insert(wishlistItemsCategories).values(
          activeItem.wishlistItemsCategories.map((wishlistItemCategory) => ({
            itemId: wishlistItem.id,
            categoryId: wishlistItemCategory.id,
          })),
        );
      }

      return wishlistItem;
    });
  };

  return {
    handleSave,
  };
};

export default useSave;
