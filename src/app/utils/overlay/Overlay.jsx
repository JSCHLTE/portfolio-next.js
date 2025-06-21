import './overlay.css'

const Overlay = ({ closeMenu, setDeleteWarning }) => {
  return (
    <div className='overlay' onClick={() => {closeMenu ? closeMenu() : ''; setDeleteWarning ? setDeleteWarning(false) : ''}}></div>
  )
}

export default Overlay