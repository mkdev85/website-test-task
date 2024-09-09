import { AppDataSource } from '../../data-source'; // Adjust path as needed

// Define a Website type or interface
interface Website {
  id: string;
  url: string;
  status: string;
}

// Function to retrieve all websites
export const getAllWebsites = async (): Promise<Website[]> => {
  const websites = await AppDataSource
    .createQueryBuilder()
    .select('*')
    .from('websites', 'website') 
    .execute();

  return websites;
};
