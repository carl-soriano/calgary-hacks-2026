import type { PlayerProfile } from '../hooks/usePlayerProfile'
import '../styles/player.css'

interface PlayerBadgeProps {
  profile: PlayerProfile
}

export default function PlayerBadge({ profile }: PlayerBadgeProps) {
  return (
    <div className="player-badge">
      <span className="player-badge__name">{profile.name}</span>
      <span className="player-badge__tier" data-tier={profile.tier.toLowerCase()}>
        {profile.tier}
      </span>
    </div>
  )
}
