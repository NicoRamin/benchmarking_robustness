const Header = () => {
  return (
    <div>
      <h1 className="header-title">Benchmarking robustness</h1>
      <p className="header-context">
        The goal of RobustBench is to systematically track the real progress in
        adversarial robustness. There are already more than 3'000 papers on this
        topic, but it is still unclear which approaches really work and which
        only lead to overestimated robustness.
      </p>
    </div>
  );
};

export default Header;
