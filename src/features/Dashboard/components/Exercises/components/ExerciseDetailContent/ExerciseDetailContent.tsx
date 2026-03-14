import { useMemo } from "react";
import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Chip } from "@heroui/chip";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Divider } from "@heroui/divider";
import type { IExerciseDetail } from "@src/shared/interfaces/exerciseDb/IExerciseDetail";
import "./ExerciseDetailContent.css";
import { getMuscleLabel } from "@src/shared/helpers";

interface ExerciseDetailContentProps {
  exerciseDetail: IExerciseDetail;
  onClose: () => void;
}

export const ExerciseDetailContent = ({ exerciseDetail, onClose }: ExerciseDetailContentProps) => {
  const {
    name,
    imageUrls,
    videoUrl,
    exerciseType,
    equipments,
    bodyParts,
    targetMuscles,
    secondaryMuscles,
    keywords,
    overview,
    instructions,
    exerciseTips,
    variations,
  } = exerciseDetail;

  const accordionItems = useMemo(() => {
    let items: { key: string; title: string; items: string[] }[] = [];
    if (instructions.length > 0) items = [{ key: "instructions", title: "Instructions", items: instructions }];
    if (exerciseTips.length > 0) items = [...items, { key: "tips", title: "Tips", items: exerciseTips }];
    if (variations.length > 0) items = [...items, { key: "variations", title: "Variations", items: variations }];
    return items;
  }, [instructions, exerciseTips, variations]);

  return (
    <>
      <ModalHeader className="flex-col gap-1">
        <h2 className="text-2xl font-bold leading-tight">{name}</h2>
        <div className="flex items-center gap-2">
          <Chip
            size="sm"
            variant="flat"
            classNames={{ base: "bg-default-200", content: "text-[10px] px-0.5 text-default-600" }}>
            {exerciseType}
          </Chip>
          {equipments?.map((eq) => (
            <Chip
              key={eq}
              size="sm"
              variant="bordered"
              classNames={{
                base: "bg-transparent border-c-dark-gray",
                content: "text-[10px] px-0.5 flex items-center gap-1 ",
              }}>
              <span className="w-2 h-2 rounded-full bg-c-yellow inline-block border border-c-dark" />
              {eq}
            </Chip>
          ))}
        </div>
      </ModalHeader>

      <ModalBody className="gap-5">
        <div className="exercise-modal__media">
          {videoUrl ? (
            <video
              src={videoUrl}
              controls
              muted
              autoPlay
              playsInline
              preload="metadata"
              poster={imageUrls?.["720p"] ?? imageUrls?.["480p"]}
              className="exercise-modal__video max-w-full"
            />
          ) : (
            <img
              src={imageUrls?.["720p"] ?? imageUrls?.["480p"]}
              alt={name}
              className="exercise-modal__image"
              loading="lazy"
            />
          )}
        </div>

        {overview && <p className="exercise-modal__overview">{overview}</p>}

        <div className="exercise-modal__muscles">
          <div className="exercise-modal__muscle-group">
            <span className="exercise-modal__label">Target</span>
            <div className="flex flex-wrap gap-1.5">
              {targetMuscles.map((m) => (
                <Chip
                  key={m}
                  size="sm"
                  variant="flat"
                  classNames={{ base: "bg-c-yellow", content: "text-[10px] font-semibold px-1 text-c-dark" }}>
                  {getMuscleLabel(m)}
                </Chip>
              ))}
            </div>
          </div>

          {secondaryMuscles.length > 0 && (
            <div className="exercise-modal__muscle-group flex-col sm:flex-row">
              <span className="exercise-modal__label">Secondary Muscles</span>
              <div className="flex flex-wrap gap-1.5">
                {secondaryMuscles.map((m) => (
                  <Chip
                    key={m}
                    size="sm"
                    variant="bordered"
                    classNames={{
                      base: "bg-transparent border-c-dark-gray",
                      content: "text-[10px] px-0.5 flex items-center gap-1 ",
                    }}>
                    <span className="w-2 h-2 rounded-full bg-c-yellow inline-block border border-c-dark" />
                    {getMuscleLabel(m)}
                  </Chip>
                ))}
              </div>
            </div>
          )}

          {bodyParts.length > 0 && (
            <div className="exercise-modal__muscle-group">
              <span className="exercise-modal__label">Body Parts</span>
              <div className="flex flex-wrap gap-1.5">
                {bodyParts.map((bp) => (
                  <Chip
                    key={bp}
                    size="sm"
                    variant="bordered"
                    classNames={{ base: "border-c-dark-gray", content: "text-[10px] px-0.5" }}>
                    {bp}
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </div>

        <Divider className="opacity-40" />

        {accordionItems.length > 0 && (
          <Accordion
            variant="shadow"
            selectionMode="multiple"
            defaultExpandedKeys={["instructions"]}
            className="exercise-modal__accordion">
            {accordionItems.map((item) => (
              <AccordionItem
                key={item.key}
                aria-label={item.title}
                title={item.title}
                classNames={{ title: "text-sm font-semibold ps-4", content: "p-4", trigger: "pe-4 cursor-pointer" }}>
                {item.key === "instructions" ? (
                  <ol className="exercise-modal__steps">
                    {item.items.map((step, i) => (
                      <li key={i}>
                        <span className="exercise-modal__step-num">{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul className="exercise-modal__tips">
                    {item.items.map((text, i) => (
                      <li key={i}>{text}</li>
                    ))}
                  </ul>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((kw) => (
              <Chip
                key={kw}
                size="sm"
                variant="flat"
                color="default"
                classNames={{ content: "text-[11px] opacity-70" }}>
                #{kw}
              </Chip>
            ))}
          </div>
        )}
      </ModalBody>

      <ModalFooter>
        <button className="btn-primary rounded-xl px-5 py-2.5 text-sm font-medium" onClick={onClose}>
          Close
        </button>
      </ModalFooter>
    </>
  );
};
