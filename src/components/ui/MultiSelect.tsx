type Option = {
  label: string;
  value: string;
};

export function MultiSelect({ options, selected, onChange }: { options: Option[]; selected: string[]; onChange: (next: string[]) => void }) {
  const toggleValue = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggleValue(option.value)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              isActive ? "bg-lime-200 text-slate-900" : "border border-white/20 text-white hover:bg-white/10"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

