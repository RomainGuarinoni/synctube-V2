import { IHearth } from '../icons/IHearth';

interface Props {
  Icon: React.FC;
  children: React.ReactNode;
}

export const FormContainer: React.FC<Props> = ({ children, Icon }) => {
  return (
    <div className="bg-zinc-800 rounded-md relative p-5">
      <div className="absolute w-full -top-9 left-0 flex ">
        <div className="rounded-full w-20 h-20 green-gradient m-auto flex justify-center items-center">
          <span className="w-9 text-zinc-200">
            <Icon />
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};
