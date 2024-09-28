import Cross from '../icons/Cross'

type ModalProps = {
    toggleMenu: (btnClick: string) => void
    menuOpen: boolean
    children: React.ReactNode
}
  
  function Modal({ toggleMenu, menuOpen, children }: ModalProps) {

    return (
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-60 transition-transform transform ${menuOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-500`}
      >
        <div className="absolute right-0 top-0 bg-white/9 size-full p-4 backdrop-blur-2xl flex justify-center">
          <button type="button" onClick={() => toggleMenu('')} className="text-white focus:outline-none absolute top-4 right-4"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <Cross />
          </button>

          {children}
        </div>
      </div>
    )
  }
  
  export default Modal
  