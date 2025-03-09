import { ChangeEvent, useEffect, useRef, useState } from 'react'
import './List.css'
import Category from '../../../models/category/Category'
import categoriesServices from '../../../services/categories'
import Card from '../card/Card'
import Store from '../../../models/main/Main'
// import storesServices from '../../../services/mains'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Toast } from 'primereact/toast'

export default function List(): JSX.Element {

    const toast = useRef<Toast | null>(null)
    const location = useLocation()
    const categoryChosen = location.state?.categoryChosen
    const newStoreId = location.state?.newStoreId

    const [categories, setCategories] = useState<Category[]>([])
    const [stores, setStores] = useState<Store[]>([])
    const [searchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState<string>(categoryChosen || "")
    const [price, setPrice] = useState(0)

    const searchTerm = searchParams.get('search') || '';

    useEffect(() => {
        (async () => {
            try {
                const categories = await categoriesServices.getCategories()
                setCategories(categories)

                if (categoryChosen) {
                    setSelectedCategory(categoryChosen)
                    // const categoryItems = await itemsServices.getItemsPerCategory(categoryChosen)
                    // setItems(categoryItems)
                }

                else if (searchTerm) {
                    // const allStores = await storesServices.getAllStores();
                    // const filteredStores = allStores.filter(s =>
                        // s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        // s.address.toLowerCase().includes(searchTerm.toLowerCase())
                        // setStores(filteredStores)
                    } else {
                    // const allStores = await storesServices.getAllStores();
                    // setStores(allStores)
                }

            } catch {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Failed to load page`,
                    life: 3000
                })
            }

        })()
    }, [searchTerm, categoryChosen])


    async function categoryChanged(event: ChangeEvent<HTMLSelectElement>) {
        try {
            const selectedCategoryId = event.currentTarget.value
            setSelectedCategory(selectedCategoryId)

            if (selectedCategoryId) {
                // const stores = await storesServices.getStoresPerCategory(selectedCategoryId)
                setStores(stores)
            } else {
                // const allStores = await storesServices.getAllStores();
                // setStores(allStores)
            }

        } catch {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: `Failed to load content from server`,
                life: 3000
            })
        }


    }

    function removeStore(id: string) {
        setStores(stores.filter(s => s.id !== id))
    }

    async function handlePrice() {
        try {
            if (price > 0) {
                // const items = await itemsServices.getItemsPerPrice(price)
                // setItems(items)
                setSelectedCategory("")
            }
        } catch {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: `Failed to search by price`,
                life: 3000
            })
        }
    }

    return (
        <div className='List'>
            <Toast ref={toast} />

            <select
                onChange={categoryChanged}
                value={selectedCategory}
            >
                <option value="" disabled>All Stores</option>
                {categories.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
            </select>


            <input
                type='number'
                placeholder='Max Price Search'
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handlePrice()
                    }
                }}
            />
            <button onClick={handlePrice}>Search Price</button>

            <div className='CardContainer'>
                {stores.map(store =>
                    <Card
                        key={store.id}
                        store={store}
                        removeStore={removeStore}
                        isNew={store.id === newStoreId}
                    />
                )}
            </div>
        </div>
    )
}