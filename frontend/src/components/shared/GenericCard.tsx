import { ReactNode } from 'react';
import { tw } from '../../utils/styles/tailwindClasses';

interface GenericCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
  hasBorder?: boolean;
  hasShadow?: boolean;
  isHoverable?: boolean;
}

export default function GenericCard({
  title,
  subtitle,
  children,
  className = '',
  icon,
  onClick,
  hasBorder = true,
  hasShadow = true,
  isHoverable = false,
}: GenericCardProps) {
  const cardClasses = tw(
    'bg-white rounded-lg p-6',
    hasBorder && 'border border-gray-200',
    hasShadow && 'shadow-md',
    isHoverable &&
      'hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1',
    onClick && 'cursor-pointer',
    className
  );

  const Card = (
    <div className={cardClasses} onClick={onClick}>
      {icon && <div className="mb-4">{icon}</div>}
      {title && <h3 className="text-xl font-bold mb-2">{title}</h3>}
      {subtitle && <p className="text-gray-600 mb-4">{subtitle}</p>}
      {children}
    </div>
  );

  return Card;
}
