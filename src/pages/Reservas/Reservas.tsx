import { Dispatch, FC, SetStateAction, useState, useEffect } from "react";

import { Layout } from "../../components/Layout";
import "./reservas.css";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Button } from "react-bootstrap";
import { useGetScheduleDates } from "../../hooks/useGetScheduleDates";

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
  Step1 = "Step1",
  Step2 = "Step2",
  Step3 = "Step3",
}

export type QuantityOfPersons = {
  babys: number;
  childs: number;
  adults: number;
};

const FORM_STEPS = (
  step: Steps,
  setStep: Dispatch<SetStateAction<Steps>>,
  ranges: Range[],
  setRanges: Dispatch<SetStateAction<Range[]>>,
  quantityOfPersons: QuantityOfPersons,
  setQuantityOfPersons: Dispatch<SetStateAction<QuantityOfPersons>>
) => ({
  [Steps.Step1]: (
    <Step1
      step={step}
      setStep={setStep}
      ranges={ranges}
      setRanges={setRanges}
    />
  ),
  [Steps.Step2]: (
    <Step2
      step={step}
      setStep={setStep}
      quantityOfPersons={quantityOfPersons}
      setQuantityOfPersons={setQuantityOfPersons}
    />
  ),
  [Steps.Step3]: <Step3 />,
});

export const Reservas = () => {
  const [ranges, setRanges] = useState<Range[]>([
    {
      startDate: new Date("1980-01-01"),
      endDate: new Date(),
      color: "rgb(232, 233, 235)",
      key: "saved",
      disabled: true,
    },
    {
      startDate: new Date(),
      endDate: undefined,
      color: "green",
      key: "initial",
    },
  ]);
  const { formattedData } = useGetScheduleDates();
  const [step, setStep] = useState(Steps.Step1);
  const [quantityOfPersons, setQuantityOfPersons] = useState<QuantityOfPersons>(
    {
      babys: 0,
      childs: 0,
      adults: 0,
    }
  );

  console.log("ranges", ranges);

  useEffect(() => {
    setRanges([...ranges, ...formattedData]);
    // eslint-disable-next-line
  }, [formattedData]);

  return (
    <Layout>
      <div style={{ textAlign: "center" }}>
        <h3>Reservas</h3>
        {
          FORM_STEPS(
            step,
            setStep,
            ranges,
            setRanges,
            quantityOfPersons,
            setQuantityOfPersons
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

export const Footer: FC<FooterProps> = ({
  step,
  setStep,
  continueCallback,
}) => {
  const isPreviousButtonEnabled = step === Steps.Step2 || step === Steps.Step3;
  const isLastStep = step === Steps.Step3;
  const handlePreviousStep = () => {
    setStep(step === Steps.Step3 ? Steps.Step2 : Steps.Step1);
  };

  return (
    <div>
      {isPreviousButtonEnabled && (
        <Button onClick={handlePreviousStep}>Anterior</Button>
      )}
      <Button onClick={continueCallback}>
        {isLastStep ? "Finalizar" : "Continuar"}
      </Button>
    </div>
  );
};
