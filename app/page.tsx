"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import * as fal from "@fal-ai/serverless-client";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/components/wallet-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RefreshCcw } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const DEFAULT_PROMPT =
  "A cinematic shot of a baby panda wearing an intricate chinese priest robe sitting on a tesla bonnet";

function randomSeed() {
  return Math.floor(Math.random() * 10000000).toFixed(0);
}

fal.config({
  proxyUrl: "/api/proxy",
});

const INPUT_DEFAULTS = {
  _force_msgpack: new Uint8Array([]),
  enable_safety_checker: true,
  image_size: "square_hd",
  sync_mode: true,
  num_images: 1,
  num_inference_steps: "2",
};

export default function Lightning() {
  const [image, setImage] = useState<null | string>(null);
  const [prompt, setPrompt] = useState<string>(DEFAULT_PROMPT);
  const [seed, setSeed] = useState<string>(randomSeed());
  const [inferenceTime, setInferenceTime] = useState<number>(NaN);
  const [loading, setLoading] = useState<boolean>(false);

  const { canExecuteOperation, executeOperation } = useWallet();

  const connection = fal.realtime.connect("fal-ai/fast-lightning-sdxl", {
    connectionKey: "lightning-sdxl",
    throttleInterval: 64,
    onResult: (result) => {
      const blob = new Blob([result.images[0].content], { type: "image/jpeg" });
      setImage(URL.createObjectURL(blob));
      setInferenceTime(result.timings.inference);
      executeOperation();
      setLoading(false);
    },
  });

  const timer = useRef<any | undefined>(undefined);

  const handleOnChange = async (prompt: string) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setPrompt(prompt);
    if (canExecuteOperation()) {
      const input = {
        ...INPUT_DEFAULTS,
        prompt: prompt,
        seed: seed ? Number(seed) : Number(randomSeed()),
      };
      setLoading(true);
      connection.send(input);
      timer.current = setTimeout(() => {
        connection.send({ ...input, num_inference_steps: "4" });
      }, 500);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.document.cookie = "fal-app=true; path=/; samesite=strict; secure;";
    }

    // initial image
    if (canExecuteOperation()) {
      setLoading(true);
      connection.send({
        ...INPUT_DEFAULTS,
        num_inference_steps: "4",
        prompt: prompt,
        seed: seed ? Number(seed) : Number(randomSeed()),
      });
    }
  }, []);

  return (
    <main className="flex flex-col w-full h-full mx-auto md:w-2/4 px-2">
      <div className="container py-4 px-1.5 space-y-4 lg:space-y-8 mx-auto">
        <div className="flex flex-col space-y-2">
          <div className="flex gap-4 max-md:space-y-4 md:space-x-4">
            <div className="flex flex-col w-full space-y-1">
              <label>Prompt</label>
              <Input
                onChange={(e) => {
                  handleOnChange(e.target.value);
                }}
                className="font-light w-full"
                placeholder="Type something..."
                value={prompt}
              />
            </div>
            {/* <div className="flex flex-col w-full space-y-1">
                <label>Seed</label>
                <Input
                  onChange={(e) => {
                    setSeed(e.target.value);
                    handleOnChange(prompt);
                  }}
                  className="font-light w-full"
                  placeholder="random"
                  type="number"
                  value={seed}
                />
              </div> */}
            <button
              className="flex w-fit ml-auto items-end pb-2 justify-center"
              onClick={() => {
                const newSeed = randomSeed();
                setSeed(newSeed);
                handleOnChange(prompt);
              }}
            >
              <RefreshCcw />
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0">
          <div className="flex-1 flex-col gap-8 flex items-center justify-center">
            {image && inferenceTime && (
              <div className="flex flex-row justify-center items-center gap-4 space-x-1">
                <span>inference time</span>
                <strong>
                  {inferenceTime
                    ? `${(inferenceTime * 1000).toFixed(0)}ms`
                    : `n/a`}
                </strong>
                {loading ? <Spinner /> : null}
              </div>
            )}
            <div className="min-h-[256px] h-[256px] aspect-square md:min-h-[512px] max-w-fit ">
              {image && (
                <img id="imageDisplay" src={image} alt="Dynamic Image" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-col items-center justify-center my-4 mt-auto">
        <p className="text-sm text-base-content/70 py-4 text-center">
          This is a demo of super fast AI with Meroku MicroTransactions
        </p>
      </div>
      <ToastContainer />
    </main>
  );
}
