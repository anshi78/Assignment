import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight mb-6">
        Assignment <span className="text-blue-600">Fullstack</span>
      </h1>
      <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-12">
        A scalable REST API with JWT authentication, role-based access control,
        and a stunning Next.js frontend experience.
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-blue-500/30"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 border border-zinc-200 dark:border-zinc-700 dark:text-white font-semibold py-3 px-8 rounded-full transition-all shadow-sm"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
