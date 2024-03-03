import { FC } from "react";

export interface PromptInputProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
}

const PromptInput: FC<PromptInputProps> = (props: PromptInputProps) => {
  const { value, placeholder, onChange, handleFocus } = props;

  return (
    <input
      className="flex px-8 pr-40 py-2 text-2xl w-full h-full min-h-fit border-0 focus:outline-none bg-transparent"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleFocus}
    />
  );
};

export { PromptInput };
