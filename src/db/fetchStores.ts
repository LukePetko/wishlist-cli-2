import { db } from '.';

const fetchStores = async () => {
  const res = await db.query.stores.findMany();

  return res;
};

export default fetchStores;
