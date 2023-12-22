import { Card, Image, Text, Group, Badge, Center, Button } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import classes from './card.module.css'

const mockdata = [
  { label: '4 passengers', icon: IconUsers },
  { label: '100 km/h in 4 seconds', icon: IconGauge },
  { label: 'Automatic gearbox', icon: IconManualGearbox },
  { label: 'Electric', icon: IconGasStation },
];

export function CardBox() {

  return (
    <Card withBorder radius="lg" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
      </Card.Section>

      <div className='flex flex-col mt-4'>
        <div>
          <Text fw={500}>Tesla Model S</Text>
          <Text fz="xs" c="dimmed">
            Free recharge at any station
          </Text>
        </div>
        <div className='text-sm mt-2'>
          <span className='font-semibold'>Email: </span>
          <span>emilmy@digital.com</span>
        </div>
        <div className='text-sm mt-2'>
          <span className='font-semibold'>Bithday: </span>
          <span>22.12.2023</span>
        </div>
      </div>
    </Card>
  );
}