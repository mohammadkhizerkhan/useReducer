import React, { useEffect } from 'react'

function Modal({modalContent,closeModal}) {
    useEffect(() => {
        setInterval(() => {
            closeModal();
        }, 4000);
    })
    return (
        <div>
            <h2>{modalContent}</h2>
        </div>
    )
}

export default Modal
