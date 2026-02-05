import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Zap, ArrowRight } from "lucide-react";
import { TweetSection } from "./tweetCard";

export const HeroSection = () => {
  return (
    <main className="relative overflow-hidden bg-linear-to-br from-purple-50 via-blue-50 to-cyan-50 py-8 sm:py-12 md:py-16 lg:py-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-purple-300 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-12 relative z-10">
          {/* Content Section */}
          <div className="flex-1 space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-purple-100 to-blue-100 text-purple-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-purple-200">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Where conversations come alive</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight">
              Connect, Share,{" "}
              <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Engage
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Join the conversation. Share your thoughts in threads, connect
              with friends through messages, and be part of a vibrant community
              that never stops talking.
            </p>

            {/* Feature highlights */}
            <div className="flex flex-col gap-3 sm:gap-4 pt-2 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 rounded-full p-2">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </div>
                <span className="text-sm sm:text-base text-slate-700 font-medium">
                  Real-time messaging with friends
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <span className="text-sm sm:text-base text-slate-700 font-medium">
                  Thread conversations that matter
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-cyan-100 rounded-full p-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />
                </div>
                <span className="text-sm sm:text-base text-slate-700 font-medium">
                  Stay updated with trending topics
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 max-w-md mx-auto lg:mx-0">
              <Button
                size="lg"
                className="gap-2 text-sm sm:text-base bg-emerald-400 w-full sm:w-auto"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                size="lg"
                className="gap-2 text-sm sm:text-base border-2 w-full sm:w-auto"
              >
                Explore Features
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-slate-200">
              <div>
                <div className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  1M+
                </div>
                <div className="text-xs sm:text-sm text-slate-600">
                  Active Users
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  50M+
                </div>
                <div className="text-xs sm:text-sm text-slate-600">
                  Messages Sent
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-xs sm:text-sm text-slate-600">
                  Live Conversations
                </div>
              </div>
            </div>
          </div>

          {/* Image/Mockup Section */}
          <div className="w-full lg:w-1/2 shrink-0 relative mt-8 lg:mt-0">
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-linear-to-br from-purple-400 to-blue-400 rounded-3xl blur-2xl opacity-20" />

            <div className="relative">
              <TweetSection />

              {/* Active users indicator */}
              <div className="absolute -bottom-2 sm:-bottom-4 left-1/4 bg-white rounded-full shadow-xl px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 border-2 border-black">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-linear-to-br from-pink-400 to-red-400 rounded-full border-2 border-white" />
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-linear-to-br from-blue-400 to-cyan-400 rounded-full border-2 border-white" />
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-linear-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-700">
                  +12k online now
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
