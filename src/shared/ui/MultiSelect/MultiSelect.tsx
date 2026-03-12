import { Select, SelectItem } from "@heroui/select";
import { Chip } from "@heroui/chip";
import "./MultiSelect.css";
import { Trash } from "../Trash";
import type { SharedSelection } from "@heroui/react";

interface MultiSelectProps<T extends { name: string } = { name: string }> {
  items: T[];
  selectedKeys: string[];
  onChange: (keys: SharedSelection) => void;
  onClear: () => void;
  label: string;
  placeholder: string;
  isInvalid?: boolean;
}

export const MultiSelect = ({
  items,
  onChange,
  selectedKeys,
  label,
  placeholder,
  onClear,
  isInvalid,
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
        onSelectionChange={onChange}
        label={label}
        aria-label={label}
        isInvalid={isInvalid}
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
      <Trash className="size-6 mt-8 ms-2.5 cursor-pointer text-c-dark-gray" onClick={onClear} />
    </div>
  );
};
