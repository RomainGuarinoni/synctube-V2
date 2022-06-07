interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: 'small' | 'medium' | 'large';
}

export function Button({ children, size, ...props }: ButtonProps): JSX.Element {
  return (
    <button
      className={`bg-red-500  ease-in duration-75 hover:bg-red-500/80 text-zinc-300 ${
        size === 'small'
          ? 'text-sm px-3 py-2 rounded-3xl'
          : size === 'medium'
          ? 'text-base px-3 py-2 rounded-xl'
          : 'text-lg px-4 py-3 rounded-xl'
      } `}
      {...props}
    >
      {children}
    </button>
  );
}
