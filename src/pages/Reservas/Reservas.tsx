import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import { Layout } from '../../components/Layout';
import './reservas.css';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Button } from 'react-bootstrap';
import { Moment } from 'moment';
import { Step4 } from './Step4';

export type Range = {
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  color?: string | undefined;
  key?: string | undefined;
  autoFocus?: boolean | undefined;
  disabled?: boolean | undefined;
  showDateDisplay?: boolean | undefined;
};

export enum Steps {
  Step1 = 'Step1',
  Step2 = 'Step2',
  Step3 = 'Step3',
  Step4 = 'Step4',
}

export enum Aptos {
  Apto1 = 'Apto1',
  Apto2 = 'Apto2',
  Apto3 = 'Apto3',
}

export type QuantityOfPersons = {
  babys: number;
  childs: number;
  adults: number;
};

const FORM_STEPS = (
  step: Steps,
  setStep: Dispatch<SetStateAction<Steps>>,
  startDate: Moment | null,
  setStartDate: Dispatch<SetStateAction<Moment | null>>,
  endDate: Moment | null,
  setEndDate: Dispatch<SetStateAction<Moment | null>>,
  quantityOfPersons: QuantityOfPersons,
  setQuantityOfPersons: Dispatch<SetStateAction<QuantityOfPersons>>,
  apto: Aptos,
  setApto: Dispatch<SetStateAction<Aptos>>,
  price: number,
) => ({
  [Steps.Step1]: <Step1 step={step} setStep={setStep} apto={apto} setApto={setApto} />,
  [Steps.Step2]: (
    <Step2
      step={step}
      setStep={setStep}
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
    />
  ),
  [Steps.Step3]: (
    <Step3 step={step} setStep={setStep} quantityOfPersons={quantityOfPersons} setQuantityOfPersons={setQuantityOfPersons} />
  ),
  [Steps.Step4]: <Step4 />,
});

const BASE_PRICE_PER_DAY = 35;
const BASE_PRICE_PER_PERSON = 5;

export const Reservas = () => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [step, setStep] = useState(Steps.Step1);
  const [apto, setApto] = useState(Aptos.Apto1);
  const [quantityOfPersons, setQuantityOfPersons] = useState<QuantityOfPersons>({
    babys: 0,
    childs: 0,
    adults: 0,
  });

  const quantityOfDays = Number(endDate?.diff(startDate, 'days')) + 1 ?? 0;
  console.log('quantityOfDays :>> ', quantityOfDays);
  const price =
    (BASE_PRICE_PER_DAY + BASE_PRICE_PER_PERSON * (quantityOfPersons.childs + quantityOfPersons.adults)) * quantityOfDays;

  console.log('quantityOfPersons :>> ', quantityOfPersons);
  console.log('startDate :>> ', startDate);
  console.log('endDate :>> ', endDate);
  console.log('apto :>> ', apto);

  console.log('price :>> ', price);

  return (
    <Layout>
      <div style={{ textAlign: 'center' }}>
        <h3>Reservas</h3>
        {
          FORM_STEPS(
            step,
            setStep,
            startDate,
            setStartDate,
            endDate,
            setEndDate,
            quantityOfPersons,
            setQuantityOfPersons,
            apto,
            setApto,
            price,
          )[step]
        }
      </div>
    </Layout>
  );
};

type FooterProps = {
  step: Steps;
  setStep: Dispatch<SetStateAction<Steps>>;
  continueCallback: () => void;
};

export const Footer: FC<FooterProps> = ({ step, setStep, continueCallback }) => {
  const isPreviousButtonEnabled = step === Steps.Step2 || step === Steps.Step3 || step === Steps.Step4;
  const isLastStep = step === Steps.Step4;
  const handlePreviousStep = () => {
    const currentStepNumber = parseInt(step.replace('Step', ''));
    const previousStepNumber = Math.max(1, currentStepNumber - 1);
    const previousStep = `Step${previousStepNumber}` as Steps;
    setStep(previousStep);
  };

  return (
    <div>
      {isPreviousButtonEnabled && <Button onClick={handlePreviousStep}>Anterior</Button>}
      <Button onClick={continueCallback}>{isLastStep ? 'Finalizar' : 'Continuar'}</Button>
    </div>
  );
};
