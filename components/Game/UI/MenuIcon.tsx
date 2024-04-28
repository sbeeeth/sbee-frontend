import HelpIcon from '../icons/HelpIcon'
import LeaderboardIcon from '../icons/LeaderboardIcon'
import SoundOffIcon from '../icons/SoundOffIcon'
import SoundOnIcon from '../icons/SoundOnIcon'

import styles from '../gamestyle.module.css'

const MenuIcon = ({
  iconType,
  isSelected,
  onClick,
  onMouseOver
}: {
  iconType: string
  isSelected: boolean
  onClick: undefined | (() => void)
  onMouseOver: undefined | (() => void)
}) => {
  return (
    <div
      className={styles['menu-icon']}
      onClick={onClick}
      onMouseOver={onMouseOver}
    >
      {iconType === 'HelpIcon' ? (
        <HelpIcon size='48px' color={isSelected ? '#fff' : '#cccc00'} />
      ) : iconType === 'LeaderboardIcon' ? (
        <LeaderboardIcon size='48px' color={isSelected ? '#fff' : '#cccc00'} />
      ) : iconType === 'SoundOnIcon' ? (
        <SoundOnIcon size='48px' color={isSelected ? '#fff' : '#cccc00'} />
      ) : iconType === 'SoundOffIcon' ? (
        <SoundOffIcon size='48px' color={isSelected ? '#fff' : '#cccc00'} />
      ) : null}
    </div>
  )
}

export default MenuIcon
