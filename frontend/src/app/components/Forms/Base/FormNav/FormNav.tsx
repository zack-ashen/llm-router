import { Button } from "@/app/components/Inputs/Button/Button";
import { FormEvent } from "react";

interface FormNavProps {
  submitButtonText: string;
  isLastStep: boolean;
  isFirstStep: boolean;
  useWideButtons: boolean;
  className?: string;
  loading?: boolean;
  back: (event: FormEvent) => void;
  next: (event: FormEvent) => void;
}

export default function FormNav({
  isFirstStep,
  isLastStep,
  useWideButtons,
  next,
  back,
  submitButtonText,
  loading,
  className,
}: FormNavProps) {
  const buttonWidthCn = useWideButtons ? "full" : "default";
  return (
    <div className={`flex flex-row gap-5 ${className}`}>
      {!isFirstStep && (
        <Button variant={"secondary"} width={buttonWidthCn} onClick={back}>
          Back
        </Button>
      )}
      {isLastStep ? (
        <Button
          variant={"primary"}
          width={buttonWidthCn}
          type="submit"
          loading={loading}
        >
          {submitButtonText}
        </Button>
      ) : (
        <Button variant={"primary"} width={buttonWidthCn} onClick={next}>
          Continue
        </Button>
      )}
    </div>
  );
}
