import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
  Verified,
} from "lucide-react";

export const TweetSection = () => {
  return (
    <main className="flex items-center justify-center min-h-screen p-3 sm:p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border-2 border-black">
        {/* Tweet Header */}
        <div className="p-3 sm:p-4 flex items-start gap-2 sm:gap-3 border-b border-slate-200">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shrink-0">
            GP
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Guitar Pro Academy
              </h3>
              <Verified className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 fill-blue-500 shrink-0" />
              <span className="text-slate-500 text-xs sm:text-sm truncate">
                @GuitarProAcademy
              </span>
              <span className="text-slate-500 hidden sm:inline">·</span>
              <span className="text-slate-500 text-xs sm:text-sm">2h</span>
            </div>

            <p className="text-slate-900 mt-2 text-sm sm:text-base leading-relaxed">
              Just wrapped up an amazing session! 🎸✨ There's nothing quite
              like the feeling when everything clicks and the music just flows.
              Keep practicing, keep believing, and never stop chasing that
              perfect sound.
              <span className="text-blue-500">
                {" "}
                #GuitarLife #MusicIsLife #KeepPlaying
              </span>
            </p>
          </div>

          <button className="text-slate-500 hover:bg-slate-100 rounded-full p-1.5 sm:p-2 shrink-0">
            <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Image */}
        <div className="relative bg-zinc-200 dark:bg-zinc-800">
          <Image
            src="/guitar-player.png"
            alt="Guitar player performing"
            width={800}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Tweet Stats */}
        <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-slate-200">
          <div className="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm text-slate-500">
            <span>
              <strong className="text-slate-900">1.2K</strong> Retweets
            </span>
            <span>
              <strong className="text-slate-900">3.4K</strong> Quotes
            </span>
            <span>
              <strong className="text-slate-900">15.7K</strong> Likes
            </span>
            <span className="hidden sm:inline">
              <strong className="text-slate-900">234K</strong> Views
            </span>
          </div>
        </div>

        {/* Tweet Actions */}
        <div className="px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-around border-b border-slate-200">
          <button className="flex items-center gap-1 sm:gap-2 text-slate-500 hover:text-blue-500 transition-colors group">
            <div className="p-1.5 sm:p-2 rounded-full group-hover:bg-blue-50 transition-colors">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-medium hidden xs:inline">
              342
            </span>
          </button>

          <button className="flex items-center gap-1 sm:gap-2 text-slate-500 hover:text-green-500 transition-colors group">
            <div className="p-1.5 sm:p-2 rounded-full group-hover:bg-green-50 transition-colors">
              <Repeat2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-medium hidden xs:inline">
              1.2K
            </span>
          </button>

          <button className="flex items-center gap-1 sm:gap-2 text-slate-500 hover:text-pink-500 transition-colors group">
            <div className="p-1.5 sm:p-2 rounded-full group-hover:bg-pink-50 transition-colors">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-medium hidden xs:inline">
              15.7K
            </span>
          </button>

          <button className="flex items-center gap-1 sm:gap-2 text-slate-500 hover:text-blue-500 transition-colors group">
            <div className="p-1.5 sm:p-2 rounded-full group-hover:bg-blue-50 transition-colors">
              <Share className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </button>
        </div>

        {/* Reply Section */}
        <div className="p-3 sm:p-4 flex gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-purple-400 to-pink-500 rounded-full shrink-0"></div>
          <input
            type="text"
            placeholder="Post your reply"
            className="flex-1 bg-transparent outline-none text-slate-900 placeholder:text-slate-500 text-sm sm:text-base"
          />
        </div>
      </div>
    </main>
  );
};