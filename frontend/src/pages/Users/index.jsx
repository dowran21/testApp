import { SimpleGrid } from '@mantine/core';
import { CardBox } from '../../components/users/card';

export function Users() {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 5 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
      className='bg-blue-50 w-full p-4'
    >
      <div>
        <CardBox />
      </div>
      <div>
        <CardBox />
      </div>
      <div>
        <CardBox />
      </div>
    </SimpleGrid>
  );
}