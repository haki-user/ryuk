"use client";
import { useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Component() {
  const [summary, setSummary] = useState("");

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("audio", file);
    console.log("Uploading audio to server...", formData);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001"}/summarize`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Audio</CardTitle>
        <CardDescription>
          {/* Drag and drop your images or click the button below to select files. */}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg p-10 space-y-6">
        <UploadCloudIcon className="w-16 h-16 text-zinc-500 dark:text-zinc-400" />
        <Label htmlFor="audio-input">Select Files</Label>
        <Input
          id="audio-input"
          type="file"
          onChange={handleFileUpload}
          accept="audio/*"
          className="w-48"
        />
      </CardContent>
      <CardContent>
        <Textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={10}
        />
        <CopyToClipboad text={summary} />
      </CardContent>
    </Card>
  );
}

function UploadCloudIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}

import {
  TooltipTrigger,
  TooltipContent,
  Tooltip,
  TooltipProvider,
} from "@/components/ui/tooltip";

export function CopyToClipboad({ text }: { text: string }) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(text);
              }}
            >
              Copy to Clipboard
              <ClipboardIcon className="ml-2 h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to copy</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

function ClipboardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}
