import { TopBar } from '@/components/layout'
import { Avatar, Button } from '@/components/atoms'
import { StorageBar } from '@/components/molecules'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'

const AVATAR_SRC = '/assets/figma/6cd0e6362a73050667423418aae84ecb14f0f736.png'

export function ProfilePage() {
  const navigate = useNavigate()
  const { phoneNumber, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="flex flex-col min-h-dvh bg-surface-0">
      <TopBar title="Profile" />

      <div className="flex-1 overflow-y-auto pb-24 px-4 pt-6 scrollbar-hide">
        {/* Profile card */}
        <div className="flex flex-col items-center gap-4 py-6 bg-surface-2 rounded-2xl px-4">
          <Avatar
            src={AVATAR_SRC}
            fallback="U"
            size="xl"
            ring="primary"
          />
          <div className="text-center">
            <p className="text-content-primary text-lg font-bold">Jio User</p>
            {phoneNumber && (
              <p className="text-content-secondary text-sm">+91 {phoneNumber}</p>
            )}
          </div>
        </div>

        {/* Storage */}
        <div className="mt-4 p-4 bg-surface-2 rounded-2xl flex flex-col gap-3">
          <p className="text-content-primary text-sm font-semibold">Storage</p>
          <StorageBar used={14.2} total={50} />
          <Button variant="outline" size="sm" className="self-start">
            Get more storage
          </Button>
        </div>

        {/* Settings list */}
        <ul className="mt-4 flex flex-col gap-1">
          {['Account', 'Notifications', 'Privacy', 'Help & Support', 'About'].map((item) => (
            <li key={item}>
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-surface-2 text-content-primary text-sm font-medium active:bg-surface-3 transition-colors"
              >
                {item}
                <span className="text-content-tertiary">›</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <Button
          variant="danger"
          size="md"
          fullWidth
          className="mt-6"
          onClick={handleLogout}
        >
          Sign out
        </Button>
      </div>
    </div>
  )
}
