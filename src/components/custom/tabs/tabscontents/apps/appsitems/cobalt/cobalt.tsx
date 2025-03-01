import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalize } from "@/lib/stringlib";
import { getUrlHostname } from "@/lib/utils";
import axios from "axios";
import { ClipboardPaste } from "lucide-react";
import { useEffect, useState } from "react";

export default function AppCobalt() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [type, setType] = useState("auto");
  const [audioBitrate, setAudioQuality] = useState("128");
  const [videoQuality, setVideoQuality] = useState("1080");
  const [tiktokFullAudio, setTiktokFullAudio] = useState(false);
  const [url, setUrl] = useState("");
  const isTiktok = getUrlHostname(url).includes("tiktok");
  const [serverInfo, setServerInfo] = useState<{
    cobalt: {
      url: string;
      startTime: string;
      services: string[];
    };
  } | null>(null);

  useEffect(() => {
    const checkServer = () => {
      axios
        .get("/api/cobalt/")
        .then((res) => {
          setServerInfo(res.data);
        })
        .catch(() => {
          setServerInfo(null);
        })
        .finally(() => {
          setInitialLoading(false);
        });
    };
    checkServer();
    const interval = setInterval(checkServer, 5000);
    return () => clearInterval(interval);
  }, []);

  const options = {
    url: url,
    filenameStyle: "pretty",
    audioFormat: "best",
    downloadMode: type,
    tiktokFullAudio: tiktokFullAudio,
    audioBitrate: audioBitrate,
    videoQuality: videoQuality,
  };

  const handleDownload = async () => {
    if (!url) return;
    try {
      const response = await axios.post("/api/cobalt/", options, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response) throw new Error("No data returned");
      const { data } = response;
      switch (data.status) {
        case "tunnel":
          {
            const a = document.createElement("a");
            a.href = data.url;
            a.download = data.filename;
            a.click();
          }
          break;
        case "redirect":
          window.open(data.url, "_self");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  function BuildSelect({
    options,
    value,
    setValue,
    placeholder,
  }: {
    options: {
      value: string;
      label: string;
    }[];
    value?: string;
    setValue: (value: string) => void;
    placeholder?: string;
  }) {
    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="bg-glass bg-black/20">
          <SelectValue placeholder={placeholder || "Select"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Alert>
        <AlertTitle>
          <div className="flex items-center">
            {initialLoading ? (
              <>
                <div className="w-1 h-1 mr-2 rounded-full bg-neutral-500" />
                <div>Loading server status...</div>
              </>
            ) : serverInfo ? (
              <>
                <div className="w-1 h-1 mr-2 rounded-full bg-green-500" />
                <div>Server is online</div>
              </>
            ) : (
              <>
                <div className="w-1 h-1 mr-2 rounded-full bg-red-500" />
                <div>Server is offline</div>
              </>
            )}
          </div>
        </AlertTitle>
        <AlertDescription>
          {initialLoading ? (
            "Please wait..."
          ) : serverInfo ? (
            <div className="text-sm text-neutral-300">
              <div>
                Server is running on{" "}
                <span className=" text-white">
                  <a href={serverInfo.cobalt.url} className="underline">
                    {getUrlHostname(serverInfo.cobalt.url)}
                  </a>
                </span>
              </div>
              <div>
                Server started at{" "}
                <span className=" text-white">
                  {new Date(
                    parseInt(serverInfo.cobalt.startTime)
                  ).toLocaleString()}
                </span>
              </div>
              <div>
                Available Service:{" "}
                <span className=" text-white">
                  <HoverCard>
                    <HoverCardTrigger>
                      <span className="underline cursor-pointer">
                        hover to see
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="flex flex-wrap gap-1.5">
                      {serverInfo.cobalt.services.map((service, index) => (
                        <div
                          className="text-white p-1 rounded-md bg-white/10 text-xs"
                          key={index}
                        >
                          {capitalize(service, true, 3, true)}
                        </div>
                      ))}
                    </HoverCardContent>
                  </HoverCard>
                </span>
              </div>
            </div>
          ) : (
            <div className="text-sm">
              Turn on the server to start using this feature
            </div>
          )}
        </AlertDescription>
      </Alert>

      {serverInfo && (
        <>
          <div className="flex gap-1.5">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URL"
              className="bg-glass flex-1 bg-black/20"
            />
            <Button
              size="icon"
              variant="outline"
              className="bg-glass bg-black/20"
              onClick={() =>
                navigator.clipboard.readText().then((text) => setUrl(text))
              }
            >
              <ClipboardPaste />
            </Button>
          </div>
          <BuildSelect
            options={[
              { value: "auto", label: "Auto" },
              { value: "audio", label: "Audio" },
              { value: "mute", label: "Mute" },
            ]}
            value={type}
            setValue={setType}
            placeholder="Type"
          />
          {/* if type is audio or auto */}
          {(type === "audio" || type === "auto") && (
            <BuildSelect
              options={[
                { value: "320", label: "320 kbps" },
                { value: "256", label: "256 kbps" },
                { value: "128", label: "128 kbps" },
                { value: "96", label: "96 kbps" },
                { value: "64", label: "64 kbps" },
                { value: "8", label: "8 kbps" },
              ]}
              value={audioBitrate}
              setValue={setAudioQuality}
              placeholder="Bitrate"
            />
          )}
          {/* if type is auto or muted */}
          {(type === "auto" || type === "mute") && (
            <BuildSelect
              options={[
                { value: "max", label: "Best 🔁" },
                { value: "4320", label: "4k ✨" },
                { value: "2160", label: "2k ✨" },
                { value: "1440", label: "1440p 💻" },
                { value: "1080", label: "1080p 💻" },
                { value: "720", label: "720p 📱" },
                { value: "480", label: "480p 📱" },
                { value: "360", label: "360p 🛜" },
              ]}
              value={videoQuality}
              setValue={setVideoQuality}
              placeholder="Quality"
            />
          )}
          {type === "audio" && isTiktok ? (
            <div className="flex items-center gap-1.5">
              <Checkbox
                id="terms1"
                className="border border-white/20"
                onCheckedChange={(isChecked) => setTiktokFullAudio(!!isChecked)}
              />
              <label htmlFor="terms1" className="text-sm text-white/80">
                Download tiktok full audio
              </label>
            </div>
          ) : null}
          {/* submit */}
          <Button onClick={() => handleDownload()}>Download</Button>
        </>
      )}
    </div>
  );
}
