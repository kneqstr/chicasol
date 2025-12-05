"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  id?: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  isPending?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export function AnimatedErrorInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  isPending,
  showPassword,
  onTogglePassword,
}: Props) {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    if (error && !isPending) {
      Promise.resolve().then(() => {
        setIsHighlighted(true);
      });

      const timer = setTimeout(() => setIsHighlighted(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [error, isPending]);

  return (
    <div className="space-y-2 w-full relative">
      <label htmlFor={id || name} className="text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <Input
          id={id || name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            pr-10 
            transition-colors duration-700 
            ${isHighlighted ? "bg-red-100 border-red-500" : ""}
          `}
          placeholder={label}
        />

        {onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
