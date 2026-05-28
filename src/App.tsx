import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const [phase, setPhase] = useState<'loading' | 'message'>('loading')
  const [typedLength, setTypedLength] = useState(0)

  const message = useMemo(
    () =>
      'Добрый день команда Jobs Tile Expert.\nЯ не выполнил тестовое задание по нескольким причинам.\nВо-первых, задание оказалось слишком объемным для выполнения в рамках моего текущего графика и доступного времени.\nВо-вторых, я не вижу большого смысла тратить значительные ресурсы на полноценную реализацию без предварительного общения с HR или технической командой, чтобы хотя бы понять взаимный интерес и основные ожидания сторон.\nКроме того, предоставленный дизайн в формате PNG не подходит для качественной реализации интерфейса в обозначенные сроки. Для полноценной и аккуратной разработки обычно необходимы исходники в Figma или другом рабочем формате, где доступны размеры, состояния элементов, отступы и адаптивные сценарии. Считаю, что подобные процессы должны быть более уважительными к времени кандидатов и начинаться хотя бы с короткого первичного общения.\nЕсли вам действительно интересна моя кандидатура, вы можете ознакомиться с моим сайтом-портфолио, где представлены проекты и опыт, накопленные за 8+ лет работы frontend-разработчиком. Думаю, этого более чем достаточно, чтобы оценить мой уровень и принять решение о целесообразности дальнейшего интервью.',
    [],
  )

  useEffect(() => {
    const t = window.setTimeout(() => setPhase('message'), 2000)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (phase !== 'message') return
    setTimeout(() => setTypedLength(0), 0)

    const cps = 280
    const intervalMs = Math.max(15, Math.round(1000 / cps))

    const id = window.setInterval(() => {
      setTypedLength((prev) => (prev >= message.length ? prev : prev + 1))
    }, intervalMs)

    return () => window.clearInterval(id)
  }, [phase, message.length])

  return (
    <main className="screen" aria-live="polite">
      {phase === 'loading' ? (
        <div className="loaderWrap" role="status" aria-label="Загрузка">
          <div className="spinner" aria-hidden="true" />
        </div>
      ) : (
        <div className="messageWrap">
          <p className="message">
            <span className="typed">{message.slice(0, typedLength)}</span>
            <span className="caret" aria-hidden="true" />
          </p>
        </div>
      )}
    </main>
  )
}

export default App
