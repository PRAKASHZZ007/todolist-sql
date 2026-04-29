function ThemeToggle({ isDark, setIsDark }) {
  return (
    <div className="theme">
      <button
        className="theme-toggle"
        onClick={() => setIsDark(!isDark)}
      >
        <i className={`fa ${isDark ? "fa-sun" : "fa-moon"}`}></i>
      </button>
    </div>
  );
}

export default ThemeToggle;