"use client"

import { useMemo, useState } from "react"
import { Check, RotateCcw, Trophy, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { countries } from "@/data/countries"
import { buildQuiz, flagImageUrl, type Question } from "@/lib/quiz"

const HIGH_SCORE_KEY = "flag-quiz-high-score"

type Screen = "setup" | "playing" | "results"

function readHighScore() {
  if (typeof window === "undefined") return 0
  const raw = window.localStorage.getItem(HIGH_SCORE_KEY)
  const parsed = raw ? Number(raw) : 0
  return Number.isFinite(parsed) ? parsed : 0
}

function saveHighScore(score: number) {
  const previous = readHighScore()
  if (score > previous) {
    window.localStorage.setItem(HIGH_SCORE_KEY, String(score))
  }
}

export function FlagQuiz() {
  const [screen, setScreen] = useState<Screen>("setup")
  const questionCount = 248; //248 MAX
  const [questions, setQuestions] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const [missed, setMissed] = useState<Question[]>([])
  const [highScore, setHighScore] = useState(0)

  const question = questions[index]
  const answered = selectedCode !== null
  const progressValue = questions.length
    ? Math.round(((index + (answered ? 1 : 0)) / questions.length) * 100)
    : 0

  const resultCopy = useMemo(() => {
    if (!questions.length) return ""
    const ratio = score / questions.length
    if (ratio === 1) return "Perfect run. You know your flags."
    if (ratio >= 0.8) return "Strong score. A few more rounds and you'll own the map."
    if (ratio >= 0.5) return "Solid start. Replay to lock in the trickier flags."
    return "Keep going. The flags get easier with each round."
  }, [questions.length, score])

  function startGame(count = questionCount) {
    setQuestions(buildQuiz(count))
    setIndex(0)
    setScore(0)
    setSelectedCode(null)
    setMissed([])
    setHighScore(readHighScore())
    setScreen("playing")
  }

  function chooseAnswer(code: string) {
    if (!question || answered) return

    setSelectedCode(code)
    if (code === question.country.code) {
      setScore((current) => current + 1)
    } else {
      setMissed((current) => [...current, question])
    }
  }

  function goNext() {
    if (!answered) return

    if (index >= questions.length - 1) {
      saveHighScore(score)
      setHighScore(readHighScore())
      setScreen("results")
      return
    }

    setIndex((current) => current + 1)
    setSelectedCode(null)
  }

  if (screen === "setup") {
    return (
      <Card className="w-full max-w-xl">
        <CardHeader>
          <h1>World Flags</h1>
          <CardTitle className="text-3xl mb-2">Flag Quiz</CardTitle>
          <CardDescription>
            A flag appears. Pick the matching country from four choices.{" "}
            {countries.length} countries in the pool.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button size="lg" className="w-full" onClick={() => startGame()}>
            Start quiz
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (screen === "results") {
    return (
      <Card className="w-full max-w-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="size-5" />
            <Badge variant="secondary">Round complete</Badge>
          </div>
          <CardTitle className="text-3xl">
            {score} / {questions.length}
          </CardTitle>
          <CardDescription>{resultCopy}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge>{Math.round((score / questions.length) * 100)}% correct</Badge>
            <Badge variant="outline">Best {Math.max(highScore, score)}</Badge>
          </div>
          {missed.length > 0 ? (
            <div className="flex flex-col gap-3">
              <Separator />
              <p className="text-sm font-medium">Missed flags</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {missed.map((item) => (
                  <li
                    key={item.country.code}
                    className="flex items-center gap-3 rounded-lg border px-3 py-2"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={flagImageUrl(item.country.code, 80)}
                      alt={`Flag of ${item.country.name}`}
                      width={40}
                      height={28}
                      className="h-7 w-10 rounded-sm object-cover ring-1 ring-foreground/10"
                    />
                    <span className="text-sm">{item.country.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </CardContent>
        <CardFooter className="gap-2">
          <Button size="lg" className="flex-1" onClick={() => startGame()}>
            Play again
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setScreen("setup")}
          >
            <RotateCcw />
            Setup
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (!question) return null

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>
            Question {index + 1} of {questions.length}
          </CardTitle>
          <Badge variant="secondary">Score {score}</Badge>
        </div>
        <Progress value={progressValue} />
        <CardDescription>Which country does this flag belong to?</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={flagImageUrl(question.country.code)}
            alt="Mystery flag"
            width={640}
            height={427}
            className="aspect-3/2 w-full bg-muted object-contain p-4"
          />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {question.options.map((option) => {
            const isCorrect = option.code === question.country.code
            const isSelected = option.code === selectedCode
            let variant: "default" | "outline" | "destructive" | "secondary" | "correct" =
              "outline"

            if (answered && isCorrect) variant = "correct"
            if (answered && isSelected && !isCorrect) variant = "destructive"

            return (
              <Button
                key={option.code}
                size="lg"
                variant={variant}
                className="h-auto min-h-11 justify-start whitespace-normal px-3 py-2 text-left text-sm font-bold font-mono"
                onClick={() => chooseAnswer(option.code)}
              >
                {answered && isCorrect ? <Check /> : null}
                {answered && isSelected && !isCorrect ? <X /> : null}
                {option.name}
              </Button>
            )
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Button size="lg" className="w-full" disabled={!answered} onClick={goNext}>
          {index === questions.length - 1 ? "See results" : "Next flag"}
        </Button>
      </CardFooter>
    </Card>
  )
}
