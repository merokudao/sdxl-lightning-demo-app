import { FC, useState } from "react";
import { PromptInput, PromptInputProps } from "../input";
import { MoveUp } from "lucide-react";

interface InputFormProps extends Omit<PromptInputProps, "handleFocus"> {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const InputForm: FC<InputFormProps> = (props: InputFormProps) => {
  const { handleSubmit, value, placeholder, onChange } = props;

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused((prev) => !prev);

  return (
    <div className="flex w-full min-h-12 py-4 px-6">
      <form
        onSubmit={handleSubmit}
        className={`flex w-full h-full pr-6 py-2 rounded-full border-2 shadow-md ${
          isFocused ? "" : "shadow-red-500"
        } ${isFocused ? "border-red-700" : ""}`}
      >
        <PromptInput
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          handleFocus={handleFocus}
        />
        <button className="">
          <MoveUp />
        </button>
      </form>
    </div>
  );
};

export { InputForm };
