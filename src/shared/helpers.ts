import { addToast } from "@heroui/toast";
import { ToastType } from "./enums/ToastType.enum";

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const showToast = (title: string, message: string, color: ToastType = ToastType.SUCCESS) => {
  addToast({
    title,
    description: message,
    color,
    timeout: 3000,
    variant: "flat",
  });
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getErrorMessage = (error: unknown): string => {
  let message = "Unknown Error";

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "object" && error != null) {
    if ("error" in error) {
      const inner = (error as { error: { data?: { message?: string } } }).error;
      message = inner?.data?.message ?? "Something went wrong";
    } else if ("data" in error) {
      message = (error as { data: { message?: string } }).data?.message ?? "Something went wrong";
    }
  }

  return message;
};

export const isValid = (value: unknown) => {
  return value !== null && value !== undefined && value !== 0 && value !== "";
};

export const formatDuration = (duration: number | undefined) => {
  if (!duration) return "n.d.";
  if (duration < 60) return `${duration} min`;

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}min`;
};

export const TARGET_MUSCLE_LABELS: Record<string, string> = {
  "ADDUCTOR LONGUS": "Adductor Longus",
  "ADDUCTOR BREVIS": "Adductor Brevis",
  "ADDUCTOR MAGNUS": "Adductor Magnus",
  "BICEPS BRACHII": "Biceps",
  BRACHIALIS: "Brachialis",
  BRACHIORADIALIS: "Brachioradialis",
  "DEEP HIP EXTERNAL ROTATORS": "Hip External Rotators",
  "ANTERIOR DELTOID": "Front Delts",
  "LATERAL DELTOID": "Side Delts",
  "POSTERIOR DELTOID": "Rear Delts",
  "ERECTOR SPINAE": "Lower Back",
  GASTROCNEMIUS: "Calves",
  "GLUTEUS MAXIMUS": "Glutes",
  "GLUTEUS MEDIUS": "Glute Med",
  "GLUTEUS MINIMUS": "Glute Min",
  GRACILIS: "Gracilis",
  HAMSTRINGS: "Hamstrings",
  ILIOPSOAS: "Hip Flexors",
  INFRASPINATUS: "Infraspinatus",
  "LATISSIMUS DORSI": "Lats",
  "LEVATOR SCAPULAE": "Levator Scapulae",
  OBLIQUES: "Obliques",
  PECTINEUS: "Pectineus",
  "PECTORALIS MAJOR CLAVICULAR HEAD": "Upper Chest",
  "PECTORALIS MAJOR STERNAL HEAD": "Lower Chest",
  POPLITEUS: "Popliteus",
  QUADRICEPS: "Quads",
  "RECTUS ABDOMINIS": "Abs",
  SARTORIUS: "Sartorius",
  "SERRATUS ANTE": "Serratus",
  "SERRATUS ANTERIOR": "Serratus Anterior",
  SOLEUS: "Soleus",
  SPLENIUS: "Splenius",
  STERNOCLEIDOMASTOID: "Neck (SCM)",
  SUBSCAPULARIS: "Subscapularis",
  "TENSOR FASCIAE LATAE": "TFL",
  "TERES MAJOR": "Teres Major",
  "TERES MINOR": "Teres Minor",
  "TIBIALIS ANTERIOR": "Tibialis",
  "TRANSVERSUS ABDOMINIS": "Deep Core",
  "TRAPEZIUS LOWER FIBERS": "Lower Traps",
  "TRAPEZIUS MIDDLE FIBERS": "Mid Traps",
  "TRAPEZIUS UPPER FIBERS": "Upper Traps",
  "TRICEPS BRACHII": "Triceps",
  "WRIST EXTENSORS": "Wrist Extensors",
  "WRIST FLEXORS": "Wrist Flexors",
};

export const getMuscleLabel = (name: string) => TARGET_MUSCLE_LABELS[name] ?? name;
