import { useRef, useState, type DragEvent } from "react";
import "./AvatarImageDrop.css";
import { XIcon } from "@src/shared/ui/XIcon";
import { UserRound } from "@src/shared/ui/UserRound";

interface AvatartImageDropProps {
  onImageSelect: (file: File | null, imageRemoved: boolean) => void;
  imageUrl?: string | null;
}

export const AvatarImageDrop = ({ onImageSelect, imageUrl }: AvatartImageDropProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(imageUrl ? imageUrl : null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setPreview(URL.createObjectURL(file));
    onImageSelect(file, false);
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onImageSelect(null, true);
    if (inputRef.current) inputRef.current.value = "";
  };
  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div
      className={`relative size-24 rounded-full border-2 border-dashed border-c-gray flex items-center justify-center cursor-pointer overflow-hidden  ${isDragging ? "border-c-yellow-400 bg-c-yellow-200" : "border-c-dark-gray bg-c-light-gray"}`}
      onClick={() => inputRef.current?.click()}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={() => setIsDragging(false)}>
      {preview ? (
        <>
          <img src={preview} className="w-full h-full object-cover" />
          <button
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            onClick={removeImage}>
            <XIcon className="text-white size-5" />
          </button>
        </>
      ) : (
        <UserRound className="size-8 text-c-dark-gray fill-c-gray" />
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files?.[0])}
      />
    </div>
  );
};
