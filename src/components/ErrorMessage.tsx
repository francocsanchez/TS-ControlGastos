type ErrorMessagePropos = {
  error: string;
};
export default function ErrorMessage({ error }: ErrorMessagePropos) {
  return <p className="bg-red-600 p-2 text-white font-bold text-sm text-center">{error}</p>;
}
