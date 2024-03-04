import { FC, useEffect, useRef } from "react";

export interface PromptInputProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleFocus: () => void;
}

const PromptInput: FC<PromptInputProps> = (props: PromptInputProps) => {
  const { value, placeholder, onChange, handleFocus } = props;

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

  return (
    <textarea
      className="flex pl-8 pr-0 resize-none h-8 max-h-fit text-2xl w-full border-none outline-none focus:outline-none bg-transparent"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleFocus}
      autoComplete="off"
      ref={textareaRef}
    />
  );
};

export { PromptInput };
