export type ButtonType = {
  type?: "submit" | "button";
  text: string;
};
export const Button = ({ type = "submit", text }: ButtonType) => {
  return (
    <button
      type={type}
      className="bg-blue-300 text-white px-7 py-3 font-bold hover:bg-blue-400 transition"
    >
      {text}
    </button>
  );
};
