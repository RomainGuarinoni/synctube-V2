import { FormEvent } from 'react';
import { IClose } from '../icons/IClose';

interface Props {
  Icon: React.FC;
  children: React.ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

export const FormContainer: React.FC<Props> = ({
  children,
  Icon,
  onSubmit,
  onClose,
}) => {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={submit}>
      <div className="bg-zinc-800 rounded-md relative p-5 pt-14">
        <button
          className="text-zinc-200 w-4 absolute top-4 right-5 cursor-pointer z-10"
          onClick={onClose}
        >
          <IClose />
        </button>
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
