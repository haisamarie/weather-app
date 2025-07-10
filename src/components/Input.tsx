export type Input = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
};
export const Input = ({ onChange, value, placeholder }: Input) => {
  return (
    <input
      onChange={onChange}
      value={value}
      type="text"
      placeholder={placeholder}
      className="flex-1 px-5 py-3 bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400"
    />
  );
};
