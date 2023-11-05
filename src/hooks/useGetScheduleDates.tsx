import { useState, useEffect } from 'react';

import { APTO_ENDPOINTS } from '../api/apto_api';

type ScheduleDate = {
  id: number;
  initial_date: string;
  final_date: string;
  apto_id: number;
};

type ResponseFromApi = {
  data: ScheduleDate[];
};

export const useGetScheduleDates = () => {
  const [refetch, setRefetch] = useState(1);
  const [data, setData] = useState<ResponseFromApi['data']>([]);
  const [formattedData, setFormattedData] = useState<{ startDate: any; endDate: any }[]>([]);

  useEffect(() => {
    const getScheduleDates = async () => {
      try {
        const res: any = await fetch(APTO_ENDPOINTS.GET_SCHEDULE_DATES).then((res) => res.json());
        setData(res.data as ResponseFromApi['data']);
        const formattedRes = res.data.map((scheduleDate: ScheduleDate) => ({
          startDate: new Date(scheduleDate.initial_date).toISOString(),
          endDate: new Date(scheduleDate.final_date).toISOString(),
          color: 'red',
          key: 'saved',
          autoFocus: false,
          disabled: true,
        }));
        setFormattedData(formattedRes);
      } catch (error) {
        console.error(error);
      }
    };
    getScheduleDates();
  }, [refetch]);

  return { data, formattedData, refetch, setRefetch };
};
