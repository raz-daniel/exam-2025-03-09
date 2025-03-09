import { useEffect, useRef, useState } from 'react'
import Store from '../../../models/main/Main'
import storesServices from '../../../services/mains'
import './Card.css'
import { Toast } from 'primereact/toast'

interface CardProps {
    store: Store
    removeStore(id: string): void
    isNew?: boolean
}

export default function Card(props: CardProps): JSX.Element {

    const toast = useRef<Toast | null>(null)
    const { id, name } = props.store
    const { isNew } = props
    const [highlight, setHighlight] = useState(isNew || false)

    useEffect(() => {
        if (isNew) {
            setHighlight(true)
            const timer = setTimeout(() => {
                setHighlight(false)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [isNew])

    async function deleteMe() {
        try {
            if (confirm("Are you sure you want to delete this item?")) {
                await storesServices.remove(id)
                props.removeStore(id)
            }
        } catch {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: `Failed to delete card`,
                life: 3000
            })
        }
    }

    return (
        <div className={`Card ${highlight ? 'highlight' : ''}`}>
            <Toast ref={toast} />
            <h4>{name}</h4>
            <p>{ }</p>
            <p>{ }</p>
            <div>
                <button onClick={deleteMe}>delete</button>
            </div>
        </div>

    )
}