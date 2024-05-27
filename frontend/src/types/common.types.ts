export interface ClerkAPIError {
  code: string;
  message: string;
  longMessage?: string;
  meta?: {
    paramName?: string;
    sessionId?: string;
    emailAddresses?: string[];
    identifiers?: string[];
    zxcvbn?: {
      suggestions: {
        code: string;
        message: string;
      }[];
    };
    permissions?: string[];
  };
}

export interface SessionPublicMetadata {
  onboarded?: boolean;
}

export const MODELS = [
  "claude-3-haiku-20240307",
  "claude-3-opus-20240229",
  "claude-3-sonnet-20240229",
  "command-r",
  "command-r-plus",
  "dbrx-instruct",
  "gpt-3.5-turbo-0125",
  "gpt-4-turbo-2024-04-09",
  "llama-3-70b-instruct",
  "mistral-large",
  "mistral-medium",
  "mistral-small",
  "mixtral-8x7b-instruct",
];
