type ScoreProps = {
  score: number
}

export default function Score ({ score }: ScoreProps) {
  return (
    <div>
      <h3>Score: {score}</h3>
    </div>
  )
}