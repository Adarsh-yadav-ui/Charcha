"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { FileUploader } from "@/components/upload/multi-file";
import {
  UploaderProvider,
  type UploadFn,
} from "@/components/upload/uploader-provider";
import { useEdgeStore } from "@/lib/edgestore";

// Form Schema
const postFormSchema = z.object({
  content: z
    .string()
    .min(1, "Post content cannot be empty")
    .max(5000, "Post content must be less than 5000 characters")
    .trim(),
});

type PostFormValues = z.infer<typeof postFormSchema>;

export function PostUploadDialog() {
  const [open, setOpen] = useState(false);

  // Store the uploaded file URLs returned by EdgeStore
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const currentUser = useQuery(api.users.current);
  const createPost = useMutation(api.posts.createPost);
  const { edgestore } = useEdgeStore();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      content: "",
    },
  });

  // ✅ uploadFn is defined at component level (not inside onSubmit)
  // It uploads the file to EdgeStore and captures the returned URL
  const uploadFn: UploadFn = useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange,
      });

      // ✅ Capture the URL returned by EdgeStore (res.url)
      setUploadedUrls((prev) => [...prev, res.url]);

      console.log("Uploaded file URL:", res.url);
      return res;
    },
    [edgestore],
  );

  const onSubmit = async (data: PostFormValues) => {
    if (!currentUser?._id) {
      toast.error("You must be logged in to create a post");
      return;
    }

    try {
      // ✅ Pass the collected URLs (strings) to Convex, not the uploadFn itself
      await createPost({
        content: data.content,
        authorId: currentUser._id as Id<"users">,
        attachments: uploadedUrls, // e.g. ["https://files.edgestore.dev/..."]
      });

      toast.success("Post created successfully!");
      form.reset();
      setUploadedUrls([]); // Reset URLs for next post
      setOpen(false);
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
      console.error("Error creating post:", error);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#A4C8E1]">Create a post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Create a post</DialogTitle>
          <DialogDescription>
            Share your thoughts with the community. Click Post when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={currentUser?.imageUrl}
                          alt={`${currentUser?.firstName} ${currentUser?.lastName}`}
                        />
                        <AvatarFallback>
                          {currentUser?.firstName
                            ?.slice(0, 1)
                            .concat(currentUser?.lastName?.slice(0, 1) ?? "") ||
                            "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="What's on your mind?"
                          className="min-h-30 resize-none"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />

                  {/* ✅ uploadFn is now properly defined above and passed here */}
                  <UploaderProvider uploadFn={uploadFn} autoUpload>
                    <FileUploader
                      maxFiles={5}
                      maxSize={1024 * 1024 * 25} // 25 MB
                      accept={{
                        "application/pdf": [".pdf"],
                        "image/*": [".png", ".jpg", ".jpeg", ".gif"],
                        "video/*": [".mp4", ".webm", ".ogg"],
                      }}
                      className="max-w-80 m-2 mx-auto mr-1"
                    />
                  </UploaderProvider>

                  {/* Optional: show collected URLs for debugging */}
                  {uploadedUrls.length > 0 && (
                    <p className="text-muted-foreground text-xs">
                      {uploadedUrls.length} file
                      {uploadedUrls.length > 1 ? "s" : ""} ready to attach
                    </p>
                  )}
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="neutral" disabled={isSubmitting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Post"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
