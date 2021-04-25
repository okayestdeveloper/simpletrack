interface DividerProps {
  color?: string; // should be one of the tailwind border-<color> classes.
}

function Divider({ color = '' }: DividerProps) {
  return <hr className={`navbar-divider ${color}`} />;
}

export default Divider;
