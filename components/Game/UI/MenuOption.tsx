import styles from '../gamestyle.module.css'

const MenuOption = ({
  text,
  isSelected,
  onClick,
  onMouseOver
}: {
  text: JSX.Element
  isSelected: boolean
  onClick: undefined | (() => void)
  onMouseOver: undefined | (() => void)
}) => {
  return (
    <div
      className={`${styles['menu-option']} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      onMouseOver={onMouseOver}
    >
      {text}
    </div>
  )
}

export default MenuOption
