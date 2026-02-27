"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, User } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function InngestTestPage() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const inngestRequestChats = useQuery(api.cognition.getAllChats);

  const handleClick = async () => {
    if (loading) return;

    const trimmedInput = input.trim();

    if (!trimmedInput) {
      toast.error("Please enter something first.");
      return;
    }

    setLoading(true);
    setInput(""); // ✅ Clear input immediately

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ask: trimmedInput }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 p-4 space-y-4 max-h-[calc(100vh-240px)] overflow-y-scroll">
        {inngestRequestChats?.map((item) => {
          return (
            <div key={item._id}>
              <p>Question: {item?.ask}</p>

              <div className="prose max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {item?.response}
                </ReactMarkdown>
              </div>
            </div>
          );
        }) || "No chats yet. Ask something to get started!"}

        {/* ✅ Loading shown inside chat area */}
        {loading && (
          <div className="flex items-center gap-2 text-slate-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <p>Processing your request...</p>
          </div>
        )}
      </div>

      <div className="w-[calc(100vw-100px)] space-y-8 fixed bottom-5 right-2 backdrop-blur-md border-t">
        <Card className="shadow-xl overflow-hidden">
          <CardContent className="p-6 py-3 space-y-6 w-full ">
            <div className="flex gap-3 items-end">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <User className="w-4 h-4 text-slate-400" />
                  Your Question
                </div>
                <Input
                  placeholder="E.g. Explain quantum computing in simple terms..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="h-12 text-lg"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !loading) {
                      handleClick();
                    }
                  }}
                />
              </div>

              <Button
                onClick={handleClick}
                disabled={loading || !input.trim()}
                className="h-12 w-12 rounded-xl"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Send className="w-6 h-6" />
                )}
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-6 space-y-2 text-slate-400"
                >
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  <p className="font-medium">Processing your request...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
