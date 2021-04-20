interface DividerProps {
  color?: string; // should be one of the tailwind border-<color> classes.
}

function Divider({ color = 'border-gray-400' }: DividerProps) {
  return <div className={`w-full border-top border-solid ${color} my-1 p-0 mx-0 h-0.5`} />;
}

export default Divider;
