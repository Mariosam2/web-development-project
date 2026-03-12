import { Select, SelectItem, type Selection } from "@heroui/react";
import { Trash } from "../Trash";
import "./SelectComponent.css";
import { capitalize } from "@src/shared/helpers";
interface SelectComponentProps<T extends { name: string } = { name: string }> {
  items: T[];
  selectedKeys: string[];
  onChange: (keys: Selection) => void;
  onClear: () => void;
  label: string;
  placeholder: string;
  isInvalid?: boolean;
}

export const SelectComponent = ({
  items,
  selectedKeys,
  onChange,
  onClear,
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
        onSelectionChange={onChange}
        placeholder={placeholder}
        selectedKeys={selectedKeys}>
        {(item) => (
          <SelectItem
            classNames={{
              base: "!ring-0 !outline-none !shadow-none focus:!ring-0",
              wrapper: "!ring-0 !outline-none !shadow-none focus:!ring-0",
            }}
            key={item.name}
            textValue={capitalize(item.name)}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{capitalize(item.name)}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
      <Trash className="size-6 mt-8 ms-2.5 cursor-pointer text-c-dark-gray" onClick={onClear} />
    </div>
  );
};
