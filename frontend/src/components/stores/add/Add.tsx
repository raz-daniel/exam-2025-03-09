import { useEffect, useRef, useState } from 'react'
import Category from '../../../models/category/Category'
import './Add.css'
import categoriesServices from '../../../services/categories'
import { useForm } from 'react-hook-form'
import Draft from '../../../models/main/Draft'
import { useNavigate } from 'react-router-dom'
import storesServices from '../../../services/mains'
import { Toast } from 'primereact/toast'

export default function Add(): JSX.Element {

    const toast = useRef<Toast | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const { register, handleSubmit, formState } = useForm<Draft>()
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const categories = await categoriesServices.getCategories()
                setCategories(categories)
            } catch {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Failed to load categories`,
                    life: 3000
                })
            }

        })()
    }, [])


    async function submit(draft: Draft) {
        try {

            const newStore = await storesServices.add(draft)
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Item added successfully',
                life: 3000
            })
            setTimeout(() => {
                navigate('/items/list', { 
                    state: { 
                        newItemId: newStore.id, 
                        categoryChosen: newStore.categoryId 
                    } 
                })
            }, 1000)
        } catch {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: `Failed to submit form`,
                life: 3000
            })
        }
    }
    
    return (
        <div className='Add'>
            <Toast ref={toast} />
            <form onSubmit={handleSubmit(submit)}>
                <div className="input-group">
                    <input placeholder='Item name' {...register('name', {
                        required: {
                            value: true,
                            message: 'must enter name'
                        }
                    })} />
                    <span className='error'>{formState.errors.name?.message}</span>
                </div>

                <div className="input-group">
                    <input type='datetime-local' {...register('date', {
                        required: {
                            value: true,
                            message: 'must insert date'
                        }
                    })} />
                    <span className='error'>{formState.errors.date?.message}</span>
                </div>

                <div className="input-group">
                    <select defaultValue='' {...register('categoryId', {
                        required: {
                            value: true,
                            message: 'must choose category'
                        }
                    })}>
                        <option value="" disabled>select category...</option>
                        {categories.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                    </select>
                    <span className='error'>{formState.errors.categoryId?.message}</span>
                </div>

                <div className="input-group">
                    <input type='number' step='0.01' placeholder='price' {...register('price', {
                        required: {
                            value: true,
                            message: 'must enter price'
                        },
                        min: {
                            value: 0,
                            message: 'price must be positive'
                        }
                    })} />
                    <span className='error'>{formState.errors.price?.message}</span>
                    </div>

                        <button disabled={formState.isSubmitting}>Add Item</button>

                    </form>
                </div>
                )
}