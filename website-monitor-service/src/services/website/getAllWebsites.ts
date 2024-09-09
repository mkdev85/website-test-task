import { AppDataSource } from '../../data-source'; // Adjust path as needed

interface Website {
  id: string;
  url: string;
  status: string;
}

export const getAllWebsites = async (): Promise<Website[]> => {
  const websites = await AppDataSource
    .createQueryBuilder()
    .select('*')
    .from('websites', 'website') 
    .execute();

  return websites;
};
