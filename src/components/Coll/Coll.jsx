import React from 'react'
import './Coll.css'

function Coll({ type, typeF}) {
    return <div className={`Coll ${type} ${typeF}`} />
}

export default Coll