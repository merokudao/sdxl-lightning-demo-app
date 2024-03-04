import { FC, FormEvent, useEffect, useRef } from "react";

export interface PromptInputProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleFocus: () => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
}

const PromptInput: FC<PromptInputProps> = (props: PromptInputProps) => {
  const { value, placeholder, onChange, handleFocus, handleSubmit, disabled } =
    props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      if (value.length > 50) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      } else {
        textareaRef.current.style.height = "2rem";
      }
    }
  }, [value]);

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      !disabled && handleSubmit(e);
    }
  };

  return (
    <textarea
      className="flex pl-8 pr-0 resize-none h-4 max-h-fit text-lg w-full border-none outline-none focus:outline-none bg-transparent"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleFocus}
      onKeyDown={handleUserKeyPress}
      autoComplete="off"
      ref={textareaRef}
    />
  );
};

export { PromptInput };
