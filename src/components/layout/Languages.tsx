const Languages = () => {
  return (
    <div className="flex gap-4 font-bold text-xl uppercase text-base">
      <a href="/fr/" className="lang">
        <span className="hidden sm:block">FRENCH</span>
        <span className="sm:hidden">FR</span>
      </a>
      <a href="/en/" className="lang">
        <span className="hidden sm:block">ENGLISH</span>
        <span className="sm:hidden">EN</span>
      </a>
    </div>
  );
};

export default Languages;
