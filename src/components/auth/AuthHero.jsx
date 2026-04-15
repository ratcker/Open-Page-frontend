import { BrandHeader } from './BrandHeader.jsx'
import { InsightCard } from './InsightCard.jsx'

const heroHighlights = [
  'Объединяйте команды, документы и сценарии доступа в одном рабочем пространстве.',
  'Управляйте онбордингом без разрозненных форм и ручных подтверждений.',
  'Поддерживайте чистый, современный интерфейс для регистрации и входа.',
]

const heroStats = [
  { value: '24/7', label: 'доступ к рабочему пространству' },
  { value: '12', label: 'интеграций можно подключить за день' },
  { value: '99.9%', label: 'стабильности в интерфейсных сценариях' },
]

export function AuthHero({ isLoginMode }) {
  return (
    <section className="hero-panel">
      <BrandHeader />

      <div className="hero-copy">
        <p className="hero-kicker">
          {isLoginMode ? 'Возвращение в рабочее пространство' : 'Новый старт для команды'}
        </p>
        <h1 className="hero-title">
          {isLoginMode
            ? 'Войдите и продолжайте работу с OpenPage без лишних шагов.'
            : 'Соберите современный процесс регистрации в большом интерфейсе приложения.'}
        </h1>
        <p className="hero-description">
          Интерфейс теперь построен как полноценное React-приложение: с отдельными
          блоками, информационными зонами, действиями и местом для дальнейшего роста.
        </p>
      </div>

      <div className="hero-highlights">
        {heroHighlights.map((item) => (
          <div key={item} className="highlight-item">
            <span className="highlight-dot" aria-hidden="true" />
            <p>{item}</p>
          </div>
        ))}
      </div>

      <div className="hero-stats">
        {heroStats.map((stat) => (
          <InsightCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  )
}
