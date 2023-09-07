import React from "react"

const Modal = ({ isOpen, hasCloseBtn, onClose, children }) => {
    const [isModalOpen, setModalOpen] = useState(isOpen)
    const modalRef = useRef(null)
  
    return (
      <dialog ref={modalRef} className="modal">
        {children}
      </dialog>
    )
  }

export default Modal