interface FlexibleIconProps {
  type: number;
}

const iconMap: { [key: number]: JSX.Element } = {
  1: <span className="text-6xl">💌</span>,
  2: <span className="text-6xl -ml-3">🚩</span>,
  3: <span className="text-6xl -ml-3">🔥</span>,
  4: <span className="text-6xl -ml-3">🧭</span>,
  5: <span className="text-6xl -ml-3">🎁</span>,
};

export function FlexibleIcon({ type }: FlexibleIconProps) {
  return iconMap[type] || null;
}
