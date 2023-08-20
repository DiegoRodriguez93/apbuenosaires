import { Dispatch, FC, SetStateAction } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Footer, QuantityOfPersons, Steps } from "./Reservas";

type Step2Type = {
  step: Steps;
  setStep: Dispatch<SetStateAction<Steps>>;
  quantityOfPersons: QuantityOfPersons;
  setQuantityOfPersons: Dispatch<SetStateAction<QuantityOfPersons>>;
};

enum Operations {
  sum = "sum",
  rest = "rest",
}

export const Step2: FC<Step2Type> = ({
  step,
  setStep,
  quantityOfPersons,
  setQuantityOfPersons,
}) => {
  const handleSetPersons = (
    key: keyof QuantityOfPersons,
    operation: Operations
  ) => {
    if (quantityOfPersons[key] === 0 && operation === Operations.rest) {
      return;
    }
    const newValue =
      operation === Operations.sum
        ? quantityOfPersons[key] + 1
        : quantityOfPersons[key] - 1;
    setQuantityOfPersons({ ...quantityOfPersons, [key]: newValue });
  };

  const continueCallback = () => {
    setStep(Steps.Step3);
  };

  return (
    <>
      <h3>Elige la cantidad de personas</h3>
      <Row>
        <Col md={4} sm={12}></Col>
        <Col md={4} sm={12} style={{ textAlign: "justify" }}>
          <div style={{ marginBottom: "10px" }}>
            <Button onClick={() => handleSetPersons("babys", Operations.rest)}>
              -
            </Button>
            Bebes ({quantityOfPersons.babys})
            <Button onClick={() => handleSetPersons("babys", Operations.sum)}>
              +
            </Button>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Button onClick={() => handleSetPersons("childs", Operations.rest)}>
              -
            </Button>
            Niños/Adolescentes ({quantityOfPersons.childs})
            <Button onClick={() => handleSetPersons("childs", Operations.sum)}>
              +
            </Button>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Button onClick={() => handleSetPersons("adults", Operations.rest)}>
              -
            </Button>
            Adultos ({quantityOfPersons.adults})
            <Button onClick={() => handleSetPersons("adults", Operations.sum)}>
              +
            </Button>
          </div>
          <Footer
            step={step}
            setStep={setStep}
            continueCallback={continueCallback}
          />
        </Col>
        <Col md={4} sm={12}></Col>
      </Row>
    </>
  );
};
