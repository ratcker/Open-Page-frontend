function getProfileName(profile) {
  const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(' ')
  return fullName || profile.username
}

export function ProfileCard({ profile }) {
  return (
    <section className="account-profile-card">
      <div className="account-avatar">Фото</div>

      <div>
        <h2 className="account-title">{getProfileName(profile)}</h2>
        <p className="account-text">Логин: {profile.username}</p>
        <p className="account-text">Почта: {profile.email}</p>
        <p className="account-text">Роль: {profile.role || 'reader'}</p>
      </div>
    </section>
  )
}
