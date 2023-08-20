import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { es } from "date-fns/locale";
import { Footer, Range, Steps } from "./Reservas";
import { Dispatch, FC, SetStateAction, useCallback, useMemo } from "react";
import { cloneDeep } from "lodash";

type Step1Type = {
  step: Steps;
  setStep: Dispatch<SetStateAction<Steps>>;
  ranges: Range[];
  setRanges: Dispatch<SetStateAction<Range[]>>;
};

export const Step1: FC<Step1Type> = ({ step, setStep, ranges, setRanges }) => {
  console.log("ranges", ranges);
  const continueCallback = useCallback(() => {
    setStep(Steps.Step2);
  }, [setStep]);

  const memoRanges = useMemo(() => ranges, [ranges]);

  return (
    <>
      <h3>Por favor elige los días</h3>
      <DateRangePicker
        onChange={(item) => {
          console.log("item", item);
          const newRange = cloneDeep(ranges);
          const selectionItem = newRange.find(({ key }) => key === "selection");

          if (!item?.initial && !selectionItem) {
            return;
          }

          console.log("item", item);

          if (selectionItem) {
            if (item?.selection?.startDate !== undefined) {
              selectionItem.startDate = item.selection.startDate;
            }

            if (item?.selection?.endDate !== undefined) {
              selectionItem.endDate = item.selection.endDate;
            }

            if (item?.initial?.startDate !== undefined) {
              selectionItem.startDate = item.initial.startDate;
            }

            if (item?.initial?.endDate !== undefined) {
              selectionItem.endDate = item.initial.endDate;
            }
          } else {
            newRange.push({
              endDate: item.initial.endDate,
              color: "#007bff",
              startDate: item.initial.startDate,
              key: "selection",
            });
          }

          setRanges([...newRange]);
        }}
        moveRangeOnFirstSelection={false}
        ranges={memoRanges}
        locale={es}
        staticRanges={[]}
        inputRanges={[]}
        months={2}
        direction="horizontal"
        displayMode="dateRange"
      />
      <Footer
        step={step}
        setStep={setStep}
        continueCallback={continueCallback}
      />
    </>
  );
};
