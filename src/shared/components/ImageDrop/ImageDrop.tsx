import { XIcon } from "@src/shared/ui/XIcon";
import { useState, useRef, type DragEvent } from "react";

interface ImageDropProps {
  imageUrl?: string | undefined;
  onImageSelect: (file: File | null) => void;
}

export const ImageDrop = ({ onImageSelect, imageUrl }: ImageDropProps) => {
  const [preview, setPreview] = useState<string | null>(imageUrl ? imageUrl : null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setPreview(URL.createObjectURL(file));
    onImageSelect(file);
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onImageSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-2xl text-center cursor-pointer transition-colors
        ${isDragging ? "border-c-yellow bg-c-yellow-lighter" : "border-c-dark-gray bg-c-light-gray"}
        ${preview ? "p-2" : "p-6"}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={() => setIsDragging(false)}
      onClick={() => inputRef.current?.click()}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {preview ? (
        <>
          <img src={preview} alt="preview" className="w-full max-h-48 object-contain rounded-xl" />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2  rounded-full p-1 hover:opacity-80 transition-opacity">
            <XIcon className="size-6 cursor-pointer text-c-dark-gray" />
          </button>
        </>
      ) : (
        <p className="text-c-dark-gray text-sm">
          Drag & drop an image or <span className="underline">click to browse</span>
        </p>
      )}
    </div>
  );
};
