import { Check, ChevronDown } from "lucide-react";

export type SelectOption<T extends string> = {
  value: T;
  label: string;
};

type FilterSelectProps<T extends string> = {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  options: Array<SelectOption<T>>;
  onSelect: (value: T) => void;
  selectedValue?: T;
  menuWidthClass?: string;
  align?: "left" | "right";
};

export function FilterSelect<T extends string>({
  label,
  isOpen,
  onToggle,
  onClose,
  options,
  onSelect,
  selectedValue,
  menuWidthClass = "w-36",
  align = "left",
}: FilterSelectProps<T>) {
  const alignmentClass = align === "left" ? "left-0" : "right-0";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:border-foreground hover:text-foreground"
      >
        {label} <ChevronDown className="h-3.5 w-3.5" />
      </button>

      {isOpen && (
        <div
          className={`absolute ${alignmentClass} top-[34px] z-20 ${menuWidthClass} rounded-lg border border-border bg-card py-1 shadow-lg`}
        >
          {options.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                onSelect(item.value);
                onClose();
              }}
              className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-foreground hover:bg-muted"
            >
              <span>{item.label}</span>
              {selectedValue === item.value ? (
                <Check className="h-4 w-4" />
              ) : null}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
