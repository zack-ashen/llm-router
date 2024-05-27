"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  DefaultValues,
  FieldValues,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import {
  Step,
  StepModificationRule,
} from "../../components/Forms/Base/forms.types";

export type MultiStepFormHook<T extends FieldValues> = {
  next: (event: FormEvent) => void;
  back: (event: FormEvent) => void;
  currentStep: Step<T>;
  isLastStep: boolean;
  isFirstStep: boolean;
  stepPosition: [number, number];
  needsNavButtons: boolean;
  form: UseFormReturn<T>;
};

export default function useMultiStepForm<T extends FieldValues>(
  steps: Step<T>[],
  schema: z.Schema<T, any>,
  defaultValues: DefaultValues<T>,
  stepModificationRules?: StepModificationRule[]
): MultiStepFormHook<T> {
  const [current, setCurrent] = useState(0);
  const [activeStepFlags, setActiveStepFlags] = useState(steps.map(() => true));
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const activeSteps: Step<T>[] = steps.filter(
    (_, index) => activeStepFlags[index]
  );

  const updateActiveSteps = useCallback(
    (formData: any) => {
      if (!stepModificationRules) return;

      const newActiveStepFlags = steps.map((_, index) => {
        const rule = stepModificationRules.find(
          (rule) => rule.removeStepIndex === index
        );
        return rule ? !rule.condition(formData) : true;
      });

      // Conditionally update state:
      const shouldUpdate = !newActiveStepFlags.every(
        (flag, index) => flag === activeStepFlags[index]
      );
      if (shouldUpdate) {
        setActiveStepFlags(newActiveStepFlags);
      }
    },
    [steps, stepModificationRules, activeStepFlags]
  );

  const isLastStep = current === activeSteps.length - 1;
  const isFirstStep = current === 0;
  const { needsNavButtons, validateFields } = activeSteps[current];

  const values = form.getValues();

  useEffect(() => {
    updateActiveSteps(form.getValues());
  }, [form, updateActiveSteps, values]);

  const next = async (event: FormEvent) => {
    event.preventDefault();
    const isValid = await form.trigger(validateFields);
    if (isValid) {
      setCurrent((prev) => prev + 1);
    }
  };

  const back = (event: FormEvent) => {
    event.preventDefault();

    const formData = form.getValues();
    updateActiveSteps(formData);
    setCurrent((prev) => prev - 1);
  };

  return {
    next,
    back,
    currentStep: activeSteps[current],
    isLastStep,
    isFirstStep,
    stepPosition: [current + 1, activeSteps.length] as [number, number],
    needsNavButtons,
    form,
  };
}
