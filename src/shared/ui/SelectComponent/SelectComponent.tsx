import { Select, SelectItem, type Selection } from "@heroui/react";
import type { IExerciseType } from "@src/shared/interfaces/exerciseDb/IExerciseType";
import { Trash } from "../Trash";
import type { IExerciseQuery } from "@src/shared/interfaces/query/IExercisesQuery";

interface SelectComponentProps {
  items: IExerciseType[];
  selectedKeys: string[];
  onChange: (key: Selection | "all", field: keyof IExerciseQuery) => void;
  onClearItems: (field: keyof IExerciseQuery) => void;
  field: keyof IExerciseQuery;
  label: string;
  placeholder: string;
}

export const SelectComponent = ({
  items,
  selectedKeys,
  onChange,
  onClearItems,
  field,
  label,
  placeholder,
}: SelectComponentProps) => {
  return (
    <div className="flex items-center">
      <Select
        className="max-w-xs"
        classNames={{
          base: "max-w-xs !ring-0 !outline-none !shadow-none focus:!ring-0",
          trigger: "min-h-12 py-2 !ring-0 !outline-none !shadow-none focus:!ring-0",
          listboxWrapper: "!ring-0 !outline-none !shadow-none focus:!ring-0",
        }}
        variant="bordered"
        items={items ?? []}
        label={label}
        labelPlacement="outside"
        onSelectionChange={(v) => onChange(v, field)}
        placeholder={placeholder}
        selectedKeys={selectedKeys}>
        {(et) => (
          <SelectItem
            classNames={{
              base: "!ring-0 !outline-none !shadow-none focus:!ring-0",
              wrapper: "!ring-0 !outline-none !shadow-none focus:!ring-0",
            }}
            key={et.name}
            textValue={et.name}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{et.name}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
      <Trash className="size-6 mt-8 ms-2.5 cursor-pointer text-c-dark-gray" onClick={() => onClearItems(field)} />
    </div>
  );
};
