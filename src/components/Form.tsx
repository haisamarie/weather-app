import { Input } from "../components/Input";
import { Button } from "../components/Button";

export type FormType = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export const Form = ({ onChange, value, onSubmit }: FormType) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex shadow-md rounded-full overflow-hidden bg-white"
    >
      <Input value={value} onChange={onChange} placeholder="Enter city name" />
      <Button text="search" />
    </form>
  );
};
