"use client";

import { useCallback, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface PhoneInputProps {
  name: string;
  label?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

export function PhoneInput({ name, label = "Телефон", value, onChange, error }: PhoneInputProps) {
  const isDeletingRef = useRef(false);

  const stableOnChange = useCallback((v: string) => onChange(v), [onChange]);

  useEffect(() => {
    if (!value || value === "+38 (0") {
      stableOnChange("+38 (0");
    }
  }, [stableOnChange, value]);

  const extractDigits = (str: string): string => {
    const digits = str.replace(/\D/g, "");
    return digits.startsWith("380") ? digits.slice(3) : digits;
  };

  const formatPhone = (digits: string): string => {
    let d = digits || "0";

    if (!d.startsWith("0")) d = "0" + d;
    d = d.slice(0, 10);

    let result = "+38 (";
    result += d[0];

    if (d.length >= 2) result += d[1];
    if (d.length >= 3) result += d[2];

    if (d.length >= 3) result += ") ";

    if (d.length >= 4) {
      result += d.slice(3, 6);

      if (d.length >= 7) result += "-" + d.slice(6, 8);
      if (d.length >= 9) result += "-" + d.slice(8, 10);
    }

    return result;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const currentDigits = extractDigits(inputValue);
    const formatted = formatPhone(currentDigits);

    onChange(formatted);

    setTimeout(() => {
      e.target.setSelectionRange(formatted.length, formatted.length);
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const cursorPosition = input.selectionStart || 0;
    const v = input.value;

    if (e.key === "Backspace" || e.key === "Delete") {
      const digits = extractDigits(v);

      if (v.endsWith(" ")) {
        e.preventDefault();
        onChange("+38 (0" + digits.slice(0, 1));
        return;
      }

      if (digits.length === 3) {
        e.preventDefault();
        onChange("+38 (0" + digits.slice(0, 2));
        return;
      }
    }

    if (e.key === "Backspace" || e.key === "Delete") {
      isDeletingRef.current = true;

      if (cursorPosition <= 6) {
        e.preventDefault();
        return;
      }

      if (cursorPosition < v.length) {
        e.preventDefault();
        input.setSelectionRange(v.length, v.length);
      }
    } else {
      isDeletingRef.current = false;
    }
  };

  const clearInput = () => {
    onChange("+38 (0");
  };

  return (
    <div className="space-y-2 w-full relative">
      <label className="text-sm font-medium">{label}</label>
      <div className="relative">
        <Input
          name={name}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setTimeout(() => {
              const input = document.querySelector(`[name="${name}"]`) as HTMLInputElement;
              if (input) {
                input.setSelectionRange(value.length, value.length);
              }
            }, 0);
          }}
          className={`
                    transition-colors duration-300 
                    ${error ? "bg-red-100 border-red-500" : ""}
                `}
        />

        {value.length > 6 && (
          <button
            onClick={clearInput}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
