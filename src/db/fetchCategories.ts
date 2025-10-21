import { db } from '.';

const fetchCategories = async () => {
  const res = await db.query.categories.findMany();

  return res;
};

export default fetchCategories;
