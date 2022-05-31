import { Locales } from './Locales';

export default function Footer(): JSX.Element {
  return (
    <footer className={`w-full h-14 flex items-center justify-center `}>
      <Locales />
    </footer>
  );
}
