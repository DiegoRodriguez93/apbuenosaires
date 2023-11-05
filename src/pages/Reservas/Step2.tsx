import { useState, useCallback, Dispatch, SetStateAction, FC, useMemo } from 'react';
import 'react-dates/initialize';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment, { Moment } from 'moment';
import { Footer, Steps } from './Reservas';
import { useGetScheduleDates } from '../../hooks/useGetScheduleDates';

type Step2Type = {
  step: Steps;
  setStep: Dispatch<SetStateAction<Steps>>;
  startDate: Moment | null;
  setStartDate: Dispatch<SetStateAction<Moment | null>>;
  endDate: Moment | null;
  setEndDate: Dispatch<SetStateAction<Moment | null>>;
};

export const Step2: FC<Step2Type> = ({ step, setStep, startDate, setStartDate, endDate, setEndDate }) => {
  const { formattedData } = useGetScheduleDates();
  const continueCallback = useCallback(() => {
    setStep(Steps.Step3);
  }, [setStep]);

  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);

  const onDatesChange = useCallback(({ startDate, endDate }: any) => {
    setStartDate(startDate);
    setEndDate(endDate);
  }, [setStartDate, setEndDate]);

  const onFocusChange = useCallback((focusedInput: FocusedInputShape | null) => {
    setFocusedInput(focusedInput);
  }, []);

  const blockedDays = useMemo(() => {
    const days: any = [];
    formattedData?.forEach((range) => {
      const start = moment(range.endDate, 'YYYY-MM-DD');
      const end = moment(range.startDate, 'YYYY-MM-DD');

      // Se agrega un control por si las fechas vienen en orden inverso
      const [minDate, maxDate] = start.isAfter(end) ? [end, start] : [start, end];

      for (let m = minDate; m.diff(maxDate, 'days') <= 0; m.add(1, 'days')) {
        days.push(m.clone());
      }
    });
    return days;
  }, [formattedData]);

  const isDayBlocked = useCallback(
    (day: Moment) => {
      // Comprobar si el día está en el rango de días bloqueados
      return blockedDays.some((blockedDay: any) => day.isSame(blockedDay, 'day'));
    },
    [blockedDays],
  );

  return (
    <>
      <h3>Por favor elige los días</h3>
      <DateRangePicker
        startDate={startDate}
        startDateId="your_unique_start_date_id"
        endDate={endDate}
        endDateId="your_unique_end_date_id"
        onDatesChange={onDatesChange}
        focusedInput={focusedInput}
        onFocusChange={onFocusChange}
        keepOpenOnDateSelect
        isDayBlocked={isDayBlocked}
      />
      <Footer step={step} setStep={setStep} continueCallback={continueCallback} />
    </>
  );
};
