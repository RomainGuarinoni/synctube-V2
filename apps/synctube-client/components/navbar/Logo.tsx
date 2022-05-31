export function Logo(): JSX.Element {
  const handleLogoClick = () => {
    console.log('synctube');
  };

  return (
    <h1
      id="synctube-logo"
      title="synctube"
      className="text-red-500 font-bold text-xl  tracking-[0.4em] cursor-pointer hidden lg:block "
      onClick={handleLogoClick}
    >
      SYNCTUBE
    </h1>
  );
}
