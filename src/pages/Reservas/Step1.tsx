import { useCallback, Dispatch, SetStateAction, FC } from 'react';
import { Aptos, Footer, Steps } from './Reservas';

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

  return (
    <>
      <h3>Por favor elige el apto</h3>
      <div>
        <label>
          <input type="radio" value={Aptos.Apto1} checked={apto === Aptos.Apto1} onChange={handleOptionChange} />
          Apto 1
        </label>
        <label>
          <input type="radio" value={Aptos.Apto2} checked={apto === Aptos.Apto2} onChange={handleOptionChange} />
          Apto 2
        </label>
        <label>
          <input type="radio" value={Aptos.Apto3} checked={apto === Aptos.Apto3} onChange={handleOptionChange} />
          Apto 3
        </label>
      </div>
      <Footer step={step} setStep={setStep} continueCallback={continueCallback} />
    </>
  );
};
