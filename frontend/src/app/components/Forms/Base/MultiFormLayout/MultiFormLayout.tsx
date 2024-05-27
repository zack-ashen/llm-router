import { FormEvent } from "react";
import FormHeader from "../FormHeader/FormHeader";
import FormNav from "../FormNav/FormNav";
import { Step } from "../forms.types";

interface MultiFormLayoutProps<StepType> {
  currentStep: Step<StepType>;
  submitButtonText: string;
  isFirstStep: boolean;
  isLastStep: boolean;
  loading?: boolean;
  stepPosition: [number, number];
  back: (event: FormEvent) => void;
  next: (event: FormEvent) => void;
  useWideButtons?: boolean;
}

export default function MultiFormLayout<StepType>({
  currentStep,
  submitButtonText,
  isFirstStep,
  isLastStep,
  stepPosition,
  loading,
  next,
  back,
  useWideButtons = false,
}: MultiFormLayoutProps<StepType>) {
  return (
    <>
      <FormHeader
        title={currentStep.title}
        subtitle={currentStep.description}
        steps={stepPosition}
        className="mb-5"
      />

      <div className="form-elements">{currentStep.StepElement}</div>

      {currentStep.needsNavButtons && (
        <FormNav
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          submitButtonText={submitButtonText}
          loading={loading}
          next={next}
          back={back}
          useWideButtons={useWideButtons}
          className="form-actions"
        />
      )}
    </>
  );
}
