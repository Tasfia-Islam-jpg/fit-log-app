import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#0b0c0f] px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex min-h-[300px] items-center justify-between overflow-hidden rounded-lg border border-[#24262d] bg-[#111318] px-8 py-8">

          {/* Left */}
          <div className="max-w-xl">
            <p className="mb-3 text-[10px] font-bold tracking-[0.15em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            <h1 className="text-4xl font-black uppercase leading-[0.95] text-white md:text-5xl">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="mt-4 max-w-lg text-xs leading-5 text-gray-400">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link
              href="#library"
              className="mt-5 inline-flex items-center gap-2 rounded-sm bg-[#ccff00] px-4 py-2 text-[10px] font-bold text-black"
            >
              BROWSE WORKOUTS
              <span>↓</span>
            </Link>
          </div>

          {/* Right */}
          <div className="relative hidden h-[240px] w-[320px] md:block">
            <Image
              src="/banner.png"
              alt="Workout illustration"
              fill
              priority
              className="object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}