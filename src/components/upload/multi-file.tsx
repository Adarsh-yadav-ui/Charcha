"use client";

import { cn } from "@/lib/utils";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  FileIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import * as React from "react";
import { type DropzoneOptions } from "react-dropzone";
import { Dropzone } from "./dropzone";
import { ProgressBar } from "./progress-bar";
import { formatFileSize, useUploader } from "./uploader-provider";

const FileList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { fileStates, removeFile, cancelUpload } = useUploader();

  if (!fileStates.length) return null;

  return (
    <div
      ref={ref}
      className={cn("mt-3 flex w-full flex-col gap-2", className)}
      {...props}
    >
      {fileStates.map(({ file, abortController, progress, status, key }) => {
        return (
          <div
            key={key}
            // ✅ overflow-hidden here prevents the row itself from bursting out
            className="shadow-xs flex flex-col justify-center rounded border border-border px-4 py-3 overflow-hidden"
          >
            <div className="flex items-center gap-3 text-foreground min-w-0">
              <FileIcon className="h-8 w-8 shrink-0 text-muted-foreground" />

              {/* ✅ min-w-0 is essential — without it flex children ignore truncate */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  {/* ✅ Name + size block must also have min-w-0 to truncate */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>

                  {/* Right-side controls — shrink-0 so they never get squeezed */}
                  <div className="shrink-0 flex items-center gap-2">
                    {status === "ERROR" && (
                      <AlertCircleIcon className="h-4 w-4 text-destructive" />
                    )}

                    {status === "UPLOADING" && (
                      <div className="flex flex-col items-end">
                        {abortController && (
                          <button
                            type="button"
                            className="rounded-md p-0.5 transition-colors duration-200 hover:bg-secondary"
                            disabled={progress === 100}
                            onClick={() => cancelUpload(key)}
                          >
                            <XIcon className="block h-4 w-4 shrink-0 text-muted-foreground" />
                          </button>
                        )}
                        <div className="text-xs">{Math.round(progress)}%</div>
                      </div>
                    )}

                    {status !== "UPLOADING" && status !== "COMPLETE" && (
                      <button
                        type="button"
                        className="rounded-md p-1 text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-destructive"
                        onClick={() => removeFile(key)}
                        title="Remove"
                      >
                        <Trash2Icon className="block h-4 w-4 shrink-0" />
                      </button>
                    )}

                    {status === "COMPLETE" && (
                      <CheckCircleIcon className="h-5 w-5 shrink-0 text-primary" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {status === "UPLOADING" && <ProgressBar progress={progress} />}
          </div>
        );
      })}
    </div>
  );
});
FileList.displayName = "FileList";

export interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  maxFiles?: number;
  maxSize?: number;
  accept?: DropzoneOptions["accept"];
  disabled?: boolean;
  dropzoneClassName?: string;
  fileListClassName?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}

const FileUploader = React.forwardRef<HTMLDivElement, FileUploaderProps>(
  (
    {
      maxFiles,
      maxSize,
      accept,
      disabled,
      className,
      dropzoneClassName,
      fileListClassName,
      inputRef,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("w-full space-y-4", className)} {...props}>
        <Dropzone
          ref={inputRef}
          dropzoneOptions={{
            maxFiles,
            maxSize,
            accept,
          }}
          disabled={disabled}
          className={dropzoneClassName}
        />

        <FileList className={fileListClassName} />
      </div>
    );
  },
);
FileUploader.displayName = "FileUploader";

export { FileList, FileUploader };
