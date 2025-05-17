// components/shared/GenericCard.tsx
import { ReactNode } from 'react';

export default function GenericCard({
  children,
  className = '',
  hasBorder = true,
  hasShadow = true,
  isHoverable = false,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  hasBorder?: boolean;
  hasShadow?: boolean;
  isHoverable?: boolean;
  onClick?: () => void;
}) {
  const base = 'bg-white rounded-lg p-6';
  const border = hasBorder ? 'border border-gray-200' : '';
  const shadow = hasShadow ? 'shadow-md' : '';
  const hover = isHoverable
    ? 'hover:shadow-lg transition transform hover:-translate-y-1'
    : '';
  const cursor = onClick ? 'cursor-pointer' : '';
  return (
    <div
      className={[base, border, shadow, hover, cursor, className]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
