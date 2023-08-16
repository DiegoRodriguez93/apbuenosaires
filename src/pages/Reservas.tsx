import { useState } from 'react';
import { DateRangePicker, StaticRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { es } from 'date-fns/locale';
import { addDays } from 'date-fns';

import { Layout } from '../components/Layout';

type Range = {
  startDate?: Date;
  endDate?: Date;
  key?: string;
};

export const Reservas = () => {
  const [ranges, setRanges] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: undefined,
      key: 'selection',
    },
  ]);

  const definedRanges: StaticRange[] = [
    {
      range: () => ({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }),
      isSelected: (range) => {
        const today = new Date();
        return range.startDate?.getTime() === today.getTime() && range.endDate?.getTime() === today.getTime();
      },
      label: 'Hoy',
    },
    {
      range: () => ({
        startDate: addDays(new Date(), 1),
        endDate: addDays(new Date(), 1),
        key: 'selection',
      }),
      isSelected: (range) => {
        const tomorrow = addDays(new Date(), 1);
        return range.startDate?.getTime() === tomorrow.getTime() && range.endDate?.getTime() === tomorrow.getTime();
      },
      label: 'Mañana',
    },
    // ... puedes agregar más rangos predefinidos si lo deseas
  ];

  return (
    <Layout>
      <h1>Reservas</h1>
      <DateRangePicker
        ranges={ranges}
        onChange={(item) => setRanges([item.selection])}
        locale={es}
        staticRanges={definedRanges}
      />
    </Layout>
  );
};
