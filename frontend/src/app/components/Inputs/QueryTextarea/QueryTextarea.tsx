"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "../Button/Button";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
}

const QueryTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, prompt, setPrompt, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const submitButtonRef = useRef<HTMLButtonElement>(null);

    const adjustHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        const maxHeight = 200;
        const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
        textareaRef.current.style.height = `${newHeight}px`;
        // Textarea scrollable if content exceeds max height
        if (textareaRef.current.scrollHeight > maxHeight) {
          textareaRef.current.style.overflowY = "auto";
        } else {
          textareaRef.current.style.overflowY = "hidden";
        }
      }
    };

    useEffect(() => {
      adjustHeight();
      window.addEventListener("resize", adjustHeight);
      return () => window.removeEventListener("resize", adjustHeight);
    }, []);

    const handleKeyDown = async (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        submitButtonRef.current?.click();
      }
    };

    return (
      <div
        className={`relative flex w-full items-center border ${isFocused ? "border-primary-200 outline-none ring-2 ring-primary-50/50" : "border-input"} rounded-md`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <textarea
          className={`flex w-full resize-none rounded-md bg-white px-3 py-2 text-normal shadow-sm overflow-hidden focus:outline-none disabled:cursor-not-allowed ${className}`}
          ref={textareaRef}
          {...props}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onInput={adjustHeight}
          onKeyDown={handleKeyDown}
          style={{ paddingRight: "4rem" }}
          name="prompt"
          placeholder="Ask Parakeet..."
        />
        <div className="absolute right-2 bottom-[0.4rem]">
          <Button
            type="submit"
            variant="primary"
            ref={submitButtonRef}
            disabled={props.disabled}
          >
            <FaArrowRight />
          </Button>
        </div>
      </div>
    );
  }
);

QueryTextarea.displayName = "QueryTextarea";

export { QueryTextarea };
