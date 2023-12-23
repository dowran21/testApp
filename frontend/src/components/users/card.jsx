import { Card, Image, Text, Group, Badge, Center, Button } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import classes from './card.module.css'
import { formatDate } from '../../utils/format';

const mockdata = [
  { label: '4 passengers', icon: IconUsers },
  { label: '100 km/h in 4 seconds', icon: IconGauge },
  { label: 'Automatic gearbox', icon: IconManualGearbox },
  { label: 'Electric', icon: IconGasStation },
];

export function CardBox({data}) {

  return (
    <Card withBorder radius="lg" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image 
          h={200}
          w="auto"
          fit="contain"  
          src={`http://localhost:5000/${data.image}`}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder" 
          alt="Tesla Model S" 
        />
      </Card.Section>

      <div className='flex flex-col mt-4'>
        <div>
          <Text fw={500}>{data.username}</Text>
          {/* <Text fz="xs" c="dimmed">
            
          </Text> */}
        </div>
        <div className='text-sm mt-2'>
          <span className='font-semibold'>Email: </span>
          <span>{data.email}</span>
        </div>
        <div className='text-sm mt-2'>
          <span className='font-semibold'>Bithday: </span>
          <span>{formatDate(data.birth_date)}</span>
        </div>
      </div>
    </Card>
  );
}