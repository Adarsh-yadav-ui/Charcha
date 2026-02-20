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

interface PostCardProps {
  content: string;
  attachments?: string[];
  authorId: any;
  replyTo?: string;
  createdAt: number;
  updatedAt: number;
  edited?: boolean;
}

export function PostCard({
  content,
  attachments,
  authorId,
  replyTo,
  createdAt,
  updatedAt,
  edited,
}: PostCardProps) {
  return (
    <Card className="min-h-fit max-w-160">
      <CardHeader>
        <CardTitle>
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={authorId.imageUrl}
              alt={`${authorId.firstName} ${authorId.lastName}`}
            />
            <AvatarFallback>
              {authorId.firstName
                ?.slice(0, 1)
                .concat(authorId.lastName?.slice(0, 1) ?? "Hell") || "?"}
            </AvatarFallback>
          </Avatar>
        </CardTitle>
        <CardDescription>
          {authorId.firstName} {authorId.lastName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="neutral" className="w-full">
          Login with Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
