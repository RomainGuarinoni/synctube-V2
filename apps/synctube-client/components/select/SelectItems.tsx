export interface SelectItemsProps {
  label: string;
  callback: () => void;
}

export function SelectItems({
  label,
  callback,
}: SelectItemsProps): JSX.Element {
  return (
    <p
      onClick={callback}
      className="ease-linear duration-100 hover:bg-zinc-700 w-full px-5 py-2 flex items-center justify-center"
    >
      {label}
    </p>
  );
}
