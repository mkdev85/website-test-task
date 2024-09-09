import { AppDataSource } from "../../data-source";

interface Website {
  id: string;
  url: string;
  status: string;
}

export const getRandomWebsiteData = async (): Promise<Website[]> => {
  const websites = await AppDataSource.createQueryBuilder()
    .select("*")
    .from("websites", "")
    .orderBy("RANDOM()")
    .limit(10)
    .execute();

  return websites;
};
