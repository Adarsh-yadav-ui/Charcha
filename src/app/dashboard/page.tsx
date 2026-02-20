"use client";

import { PostUploadDialog } from "@/components/postUploadDialog";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelativeTime } from "@/hooks/use-format-date";
import { BarChart3, Heart, MessageCircle, Repeat2 } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  const currentUser = useQuery(api.users.current);
  const getAllPosts = useQuery(api.posts.getAllPosts);
  return (
    <div className="space-y-8">
      <PostUploadDialog />
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      {getAllPosts?.map((post) => (
        <Card className="min-h-fit max-w-160" key={post?._id}>
          <CardHeader className="flex items-center">
            <CardTitle>
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={currentUser?.imageUrl}
                  alt={`${currentUser?.firstName} ${currentUser?.lastName}`}
                />
                <AvatarFallback>
                  {currentUser?.firstName
                    ?.slice(0, 1)
                    .concat(currentUser?.lastName?.slice(0, 1) ?? "Hell") ||
                    "?"}
                </AvatarFallback>
              </Avatar>
            </CardTitle>
            <CardDescription className="ml-2 font-bold text-md">
              {currentUser?.firstName} {currentUser?.lastName}
              <span className="text-xs text-muted-foreground">{` · ${formatRelativeTime(post?.updatedAt ?? 0)}`}</span>
              <p className="text-sm font-normal text-muted-foreground">
                {currentUser?.email && `@${currentUser.email.split("@")[0]}`}
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {post?.content} {post?.edited ? "edited" : ""}{" "}
            {post?.attachments?.length
              ? `(${post?.attachments?.length} attachments)`
              : ""}
            {post?.attachments?.map((attachment, index) => (
              <img
                key={index}
                src={attachment}
                alt={`Attachment ${index + 1}`}
                height={536}
                width={354}
                className="m-2 h-fit w-fit"
              />
            ))}
          </CardContent>

          <CardFooter className="flex-row gap-2">
            <Button className="w-full" variant="neutral">
              Comment <MessageCircle />
            </Button>
            <Button className="w-full" variant="neutral">
              Reply <Repeat2 />
            </Button>
            <Button className="w-full" variant="neutral">
              Like <Heart />
            </Button>
            <Button className="w-full" variant="neutral">
              Views <BarChart3 />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
