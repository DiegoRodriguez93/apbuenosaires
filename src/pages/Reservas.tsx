import { useState } from "react";
import { DateRangePicker, StaticRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { es } from "date-fns/locale";
import { addDays } from "date-fns";

import { Layout } from "../components/Layout";
import "./reservas.css";
import { Button, Col, Row } from "react-bootstrap";
import PaypalButtonDiv from "../components/Paypal";

type Range = {
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  color?: string | undefined;
  key?: string | undefined;
  autoFocus?: boolean | undefined;
  disabled?: boolean | undefined;
  showDateDisplay?: boolean | undefined;
};

export const Reservas = () => {
  const [ranges, setRanges] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: undefined,
      key: "selection",
    },
  ]);

  console.log("ranges", ranges);

  const definedRanges: StaticRange[] = [
    {
      range: () => ({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      }),
      isSelected: (range) => {
        const today = new Date();
        return (
          range.startDate?.getTime() === today.getTime() &&
          range.endDate?.getTime() === today.getTime()
        );
      },
      label: "Hoy",
    },
    {
      range: () => ({
        startDate: addDays(new Date(), 1),
        endDate: addDays(new Date(), 1),
        key: "selection",
      }),
      isSelected: (range) => {
        const tomorrow = addDays(new Date(), 1);
        return (
          range.startDate?.getTime() === tomorrow.getTime() &&
          range.endDate?.getTime() === tomorrow.getTime()
        );
      },
      label: "Mañana",
    },
    // ... puedes agregar más rangos predefinidos si lo deseas
  ];

  return (
    <Layout>
      <div style={{ textAlign: "center" }}>
        <h3>Reservas</h3>
        <DateRangePicker
          ranges={ranges}
          onChange={(item) => {
            const newArr: Range[] = [...ranges];
            if (Array.isArray(newArr) && newArr.length > 0) {
              newArr.pop();
            }
            console.log("item", item);
            newArr.push({
              startDate: item.selection.startDate,
              endDate: item.selection.endDate,
              key: "selection",
            });
            setRanges(newArr);
          }}
          locale={es}
          staticRanges={[]}
          inputRanges={[]}
          months={2} // Muestra dos meses
          direction="horizontal" // Organiza los meses en dirección horizontal
        />

        <h3>Elige la cantidad de personas</h3>
        <Row>
          <Col md={4} sm={12}></Col>
          <Col md={4} sm={12} style={{ textAlign: "justify" }}>
            <div style={{ marginBottom: "10px" }}>
              <Button>-</Button> Bebes (0) <Button>+</Button>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <Button>-</Button> Niños/Adolescentes (0) <Button>+</Button>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <Button>-</Button> Adultos (0) <Button>+</Button>
            </div>
          </Col>
          <Col md={4} sm={12}></Col>
        </Row>

        <h3>Realiza el pago</h3>
        <Row>
          <Col md={4} sm={12}></Col>
          <Col md={4} sm={12}>
            <PaypalButtonDiv />
          </Col>
          <Col md={4} sm={12}></Col>
        </Row>
      </div>
    </Layout>
  );
};
