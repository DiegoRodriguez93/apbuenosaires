import { useCallback, Dispatch, SetStateAction, FC } from 'react';
import { Aptos, Footer, Steps } from './Reservas';
import MainContentPropertyList from '../../components/MainContentPropertyList';

type Step1Type = {
  step: Steps;
  setStep: Dispatch<SetStateAction<Steps>>;
  apto: Aptos;
  setApto: Dispatch<SetStateAction<Aptos>>;
};

export const Step1: FC<Step1Type> = ({ step, setStep, apto, setApto }) => {
  const continueCallback = useCallback(() => {
    setStep(Steps.Step2);
  }, [setStep]);

  const handleOptionChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setApto(event.target.value as Aptos);
    },
    [setApto],
  );

  //<Footer step={step} setStep={setStep} continueCallback={continueCallback} />

  return (
    <>
      <h2 className="step-heading">Seleccioná el apartamento de tu interés</h2>
    
      <MainContentPropertyList />


      
    </>
  );
};
