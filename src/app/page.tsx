import { FlagQuiz } from "@/components/flag-quiz"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10">
      <main className="flex w-full flex-col items-center">
        <FlagQuiz />
      </main>
    </div>
  )
}
