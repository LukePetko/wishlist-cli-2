import { db } from '.';

const fetchDifficulties = async () => {
  const res = await db.query.difficultyLevels.findMany();

  return res;
};

export default fetchDifficulties;
