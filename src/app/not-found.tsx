import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-140px)] flex-col items-center justify-center bg-[#0b0c0f] px-6 text-center">
      <p className="text-xs font-bold tracking-[0.15em] text-[#ccff00]">
        404 ERROR
      </p>

      <h1 className="mt-3 text-3xl font-black text-white">
        PAGE NOT FOUND
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-sm bg-[#ccff00] px-5 py-2 text-xs font-bold text-black"
      >
        BACK TO WORKOUTS
      </Link>
    </main>
  );
}