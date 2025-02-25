import { useState } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaviconProps {
  url: string;
  size?: number;
  className?: string;
  fallback?: React.ReactNode;
}

export function Favicon({ url, size = 16, className, fallback }: FaviconProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!url) {
    return fallback || <Globe size={size} className={className} />;
  }

  const domain = new URL(url.startsWith("http") ? url : `https://${url}`)
    .hostname;
  const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;

  return (
    <>
      {(isLoading || error) &&
        (fallback || <Globe size={size} className={className} />)}
      <img
        src={googleFaviconUrl}
        alt={`${domain} favicon`}
        width={size}
        height={size}
        className={cn(className, {
          hidden: isLoading || error,
          block: !isLoading && !error,
        })}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
      />
    </>
  );
}
