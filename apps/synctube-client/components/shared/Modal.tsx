interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<Props> = ({ children, onClose }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/80">
      <div className="absolute z-50">{children}</div>
    </div>
  );
};
