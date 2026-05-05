import { useEffect, useMemo, useState } from 'react'
import './AccountPage.css'
import { AccountHeader } from './components/AccountHeader.jsx'
import { ProfileCard } from './components/ProfileCard.jsx'
import { StatsSection } from './components/StatsSection.jsx'
import { ReadingListSection } from './components/ReadingListSection.jsx'
import { BookmarksSection } from './components/BookmarksSection.jsx'
import { ActivitySection } from './components/ActivitySection.jsx'
import {
  getBookmarks,
  getCurrentProfile,
  getReadingHistory,
} from './api/accountApi.js'
import { extractResults } from '../../shared/lib/extractResults.js'

const LOAD_PROFILE_ERROR_MESSAGE = 'Не удалось загрузить профиль.'

export function AccountPage({ onNavigateHome, onNavigateBook, onLogout }) {
  const [profile, setProfile] = useState(null)
  const [readingHistory, setReadingHistory] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isCancelled = false

    async function loadAccount() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const [profileData, historyData, bookmarksData] = await Promise.all([
          getCurrentProfile(),
          getReadingHistory(),
          getBookmarks(),
        ])

        if (!isCancelled) {
          setProfile(profileData)
          setReadingHistory(extractResults(historyData))
          setBookmarks(extractResults(bookmarksData))
        }
      } catch (error) {
        if (!isCancelled) {
          setErrorMessage(
            error instanceof Error ? error.message : LOAD_PROFILE_ERROR_MESSAGE,
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
      bookmarkCount: bookmarks.length,
      commentCount: profile?.reader_profile?.reviews_written ?? 0,
    }
  }, [bookmarks, profile, readingHistory])

  const activityItems = useMemo(
    () =>
      readingHistory.slice(0, 3).map((item) => ({
        id: item.id,
        title: item.book_title,
        description: `Последняя прочитанная страница: ${item.last_page_read}`,
      })),
    [readingHistory],
  )

  return (
    <main className="account-page">
      <div className="account-page-shell">
        <AccountHeader
          onNavigateHome={onNavigateHome}
          onNavigateBook={onNavigateBook}
          onLogout={onLogout}
        />

        {isLoading && <section className="account-block">Загрузка профиля...</section>}

        {!isLoading && errorMessage && (
          <section className="account-block">{errorMessage}</section>
        )}

        {!isLoading && !errorMessage && profile && (
          <>
            <ProfileCard profile={profile} />
            <StatsSection stats={stats} />
            <ReadingListSection books={readingHistory} onOpenBook={onNavigateBook} />
            <BookmarksSection bookmarks={bookmarks} onOpenBook={onNavigateBook} />
            <ActivitySection items={activityItems} />
          </>
        )}
      </div>
    </main>
  )
}
