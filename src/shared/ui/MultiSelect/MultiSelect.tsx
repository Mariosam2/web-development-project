import { Select, SelectItem } from "@heroui/select";
import { Chip } from "@heroui/chip";
import "./MultiSelect.css";
import type { IBodyPart } from "@src/shared/interfaces/exerciseDb/IBodyPart";
import type { ITargetMuscle } from "@src/shared/interfaces/exerciseDb/ITargetMuscle";
import type { Selection } from "@heroui/react";
import type { IExerciseQuery } from "@src/shared/interfaces/query/IExercisesQuery";
import { Trash } from "../Trash";

interface MultiSelectProps {
  items: IBodyPart[] | ITargetMuscle[];
  selectedKeys: string[];
  onChange: (key: Selection | "all", field: keyof IExerciseQuery) => void;
  onClearItems: (field: keyof IExerciseQuery) => void;
  field: keyof IExerciseQuery;
  label: string;
  placeholder: string;
}

export const MultiSelect = ({
  items,
  onChange,
  field,
  selectedKeys,
  onClearItems,
  label,
  placeholder,
}: MultiSelectProps) => {
  return (
    <div className="flex items-start">
      <Select
        classNames={{
          base: "max-w-xs !ring-0 !outline-none !shadow-none focus:!ring-0",
          trigger: "min-h-12 py-2 !ring-0 !outline-none !shadow-none focus:!ring-0",
          listboxWrapper: "!ring-0 !outline-none !shadow-none focus:!ring-0",
        }}
        isMultiline={true}
        items={items}
        selectedKeys={selectedKeys}
        onSelectionChange={(v) => onChange(v, field)}
        label={label}
        aria-label={label}
        labelPlacement="outside"
        placeholder={placeholder}
        renderValue={(items) => {
          return (
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip key={item.key}>{item.data?.name}</Chip>
              ))}
            </div>
          );
        }}
        selectionMode="multiple"
        variant="bordered">
        {(bodyPart) => (
          <SelectItem
            classNames={{
              base: "!ring-0 !outline-none !shadow-none focus:!ring-0",
              wrapper: "!ring-0 !outline-none !shadow-none focus:!ring-0",
            }}
            key={bodyPart.name}
            textValue={bodyPart.name}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{bodyPart.name}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
      <Trash className="size-6 mt-8 ms-2.5 cursor-pointer text-c-dark-gray" onClick={() => onClearItems(field)} />
    </div>
  );
};
