import React from 'react'
import cn from 'classnames'

import './Modal.css'


function Modal({ backModal, reloadPage, show }) {
    return (
        <div className={cn('div', { active: show })}>
            <div className="modalTitle">Вы выиграли!!!</div>
            <div className="modalBlock">
                <div className="modalBtn" onClick={backModal}>Зыкрыть</div>
                <div className="modalBtn" onClick={reloadPage}>Продолжить</div>
            </div>
        </div>
    )

}

export default Modal 