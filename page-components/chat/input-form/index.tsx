import { FC, useEffect, useState } from "react";
import { PromptInput, PromptInputProps } from "../input";
import { MoveUp } from "lucide-react";

interface InputFormProps extends Omit<PromptInputProps, "handleFocus"> {
  isLoading?: boolean;
}

const InputForm: FC<InputFormProps> = (props: InputFormProps) => {
  const { handleSubmit, value, placeholder, onChange } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleFocus = () => setIsFocused((prev) => !prev);

  useEffect(() => {
    if (value.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [value]);

  return (
    <div className="flex w-full min-h-8 h-fit px-6 mt-auto">
      <form
        onSubmit={handleSubmit}
        className={`flex w-full h-fit justify-center items-center pr-4 py-2 rounded-3xl border-2 shadow-md ${
          isFocused ? "" : "shadow-blue-500"
        } ${isFocused ? "border-blue-700" : ""}`}
      >
        <PromptInput
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          handleFocus={handleFocus}
          handleSubmit={handleSubmit}
        />
        <button
          className={`rounded-full outline-none border-0 ${
            disabled ? "disabled:bg-zinc-700" : "bg-blue-700"
          } w-8 h-8 flex items-center justify-center font-extrabold text-white`}
          disabled={disabled}
        >
          <MoveUp size={16} className={`${disabled ? "text-zinc-400" : ""}`} />
        </button>
      </form>
    </div>
  );
};

export { InputForm };
