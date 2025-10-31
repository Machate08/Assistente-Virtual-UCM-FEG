import React from 'react';

export const LibraryIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 6l4 14"></path>
    <path d="M12 6v14"></path>
    <path d="M8 8v12"></path>
    <path d="M4 4v16"></path>
  </svg>
);
