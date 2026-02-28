import { useGetBodyPartsQuery } from "@src/store/api/exerciseApi";

interface BodyPartBadgeProps {
  bodyPart: string;
}

export const BodyPartBadge = ({ bodyPart }: BodyPartBadgeProps) => {
  const { data: bodyParts } = useGetBodyPartsQuery();

  const getBodyPartImg = () => {
    return bodyParts?.data?.find((part) => part.name === bodyPart)?.imageUrl;
  };

  return (
    <div className="badge  rounded-xl  flex items-center gap-1.5 mb-3">
      <img src={getBodyPartImg()} alt={bodyPart} className="size-6 md:size-8 object-cover object-center" />
    </div>
  );
};
