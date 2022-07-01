import { FormEvent } from 'react';

interface Props {
  Icon: React.FC;
  children: React.ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const FormContainer: React.FC<Props> = ({
  children,
  Icon,
  onSubmit,
}) => {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={submit}>
      <div className="bg-zinc-800 rounded-md relative p-5 pt-14">
        <div className="absolute w-full -top-9 left-0 flex ">
          <div className="rounded-full w-20 h-20 green-gradient m-auto flex justify-center items-center">
            <span className="w-9 text-zinc-200">
              <Icon />
            </span>
          </div>
        </div>
        {children}
      </div>
    </form>
  );
};
