interface FormHeaderProps {
  title: string;
  subtitle?: string;
  steps?: [number, number]; // [currentStep, totalSteps]
  className?: string;
}

export default function FormHeader({
  title,
  subtitle,
  steps,
  className,
}: FormHeaderProps) {
  const [currentStep, totalSteps] = steps ? steps : [undefined, undefined];
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {steps && (
        <p className="font-regular mb-1 text-sm text-medium-grey">
          Step {currentStep}/{totalSteps}
        </p>
      )}
      <p className="text-lg font-semibold">{title}</p>
      <p className="font-regular text-sm text-medium-grey">{subtitle}</p>
    </div>
  );
}
