import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-neutral-500 py-3 overflow-x-auto whitespace-nowrap">
      <Link to="/" className="inline-flex items-center gap-1 hover:text-emerald-700 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-neutral-400 shrink-0" />
            {item.path && !isLast ? (
              <Link to={item.path} className="hover:text-emerald-700 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-neutral-900 truncate max-w-xs">{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
