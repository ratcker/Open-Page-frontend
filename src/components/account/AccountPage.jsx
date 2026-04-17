import { useEffect, useMemo, useState } from 'react'
import './AccountPage.css'
import { AccountHeader } from './components/AccountHeader.jsx'
import { ProfileCard } from './components/ProfileCard.jsx'
import { StatsSection } from './components/StatsSection.jsx'
import { ReadingListSection } from './components/ReadingListSection.jsx'
import { ActivitySection } from './components/ActivitySection.jsx'
import { getCurrentProfile, getReadingHistory } from './api/accountApi.js'

export function AccountPage({ onNavigateHome, onNavigateBook }) {
  const [profile, setProfile] = useState(null)
  const [readingHistory, setReadingHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isCancelled = false

    async function loadAccount() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const [profileData, historyData] = await Promise.all([
          getCurrentProfile(),
          getReadingHistory(),
        ])

        if (!isCancelled) {
          setProfile(profileData)
          setReadingHistory(Array.isArray(historyData) ? historyData : historyData.results ?? [])
        }
      } catch (error) {
        if (!isCancelled) {
          setErrorMessage(
            error instanceof Error ? error.message : 'Не удалось загрузить профиль.',
          )
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    loadAccount()

    return () => {
      isCancelled = true
    }
  }, [])

  const stats = useMemo(() => {
    const readCount = readingHistory.filter((item) => item.is_completed).length

    return {
      libraryCount: readingHistory.length,
      readCount,
      commentCount: profile?.reader_profile?.reviews_written ?? 0,
    }
  }, [profile, readingHistory])

  const activityItems = useMemo(() => {
    return readingHistory.slice(0, 2).map((item) => ({
      id: item.id,
      title: item.book_title,
      description: `Последняя прочитанная страница: ${item.last_page_read}`,
    }))
  }, [readingHistory])

  return (
    <main className="account-page">
      <div className="account-page-shell">
        <AccountHeader
          onNavigateHome={onNavigateHome}
          onNavigateBook={onNavigateBook}
        />

        {isLoading && <section className="account-block">Загрузка профиля...</section>}

        {!isLoading && errorMessage && (
          <section className="account-block">{errorMessage}</section>
        )}

        {!isLoading && !errorMessage && profile && (
          <>
            <ProfileCard profile={profile} />
            <StatsSection stats={stats} />
            <ReadingListSection books={readingHistory} />
            <ActivitySection items={activityItems} />
          </>
        )}
      </div>
    </main>
  )
}
