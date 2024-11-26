import { formatCurrency } from "../helpers";

type AmountDisplayPropos = {
  label?: string;
  amount: number;
};

export default function AmountDisplay({ label, amount }: AmountDisplayPropos) {
  return (
    <p className="text-2xl text-blue-600 font-bold">
      {label} {""} <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  );
}
