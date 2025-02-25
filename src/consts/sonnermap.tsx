import { Ban, CheckCircle2, LucideProps } from "lucide-react";
import { ExternalToast } from "sonner";

/**
 * Sonner Data Map, work as a template for sonner data
 */
const iconProps: LucideProps = {
  size: 24,
};

const defaultToastData: ExternalToast = {
  duration: 1000,
  dismissible: true,
};

export const sonnerMap: {
  [key: string]: ExternalToast;
} = {
  success: {
    icon: <CheckCircle2 {...iconProps} />,
    ...defaultToastData,
  },
  error: {
    icon: <Ban {...iconProps} />,
    ...defaultToastData,
  },
};
