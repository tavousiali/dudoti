const Languages = () => {
  return (
    <div className="flex gap-4 font-bold uppercase">
      <a href="/en/" className="lang">
        <span className="hidden sm:block">ENGLISH</span>
        <span className="sm:hidden">EN</span>
      </a>
      <a href="/fr/" className="lang">
        <span className="hidden sm:block">FRENCH</span>
        <span className="sm:hidden">FR</span>
      </a>
    </div>
  );
};

export default Languages;
