import { ReactElement } from 'react';
import { Path } from 'react-hook-form';

export interface StepModificationRule {
  condition: (formData: any) => boolean;
  removeStepIndex: number;
}

export type Step<T> = {
  title: string;
  description: string;
  needsNavButtons: boolean;
  StepElement: ReactElement;
  validateFields: Path<T>[];
};
