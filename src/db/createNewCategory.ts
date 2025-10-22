import { db } from '.';
import { categories } from './schema';

const createNewCategory = async (name: string) => {
  const res = await db.insert(categories).values({ name });

  return res;
};

export default createNewCategory;
