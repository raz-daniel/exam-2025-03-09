import axios from "axios"
import Main from "../models/main/Main"
import Draft from "../models/main/Draft"

class Mains {

    async getAll(): Promise<Main[]> {
        const response = await axios.get<Main[]>(`${import.meta.env.VITE_REST_SERVER_URL}/main`)
        return response.data
    }

    async getMainPerSome(categoryId: string): Promise<Main[]> {
        const response = await axios.get<Main[]>(`${import.meta.env.VITE_REST_SERVER_URL}/main/${categoryId}`)
        return response.data
    }

    async getMainPerQuery(query: string): Promise<Main[]> {
        const response = await axios.get<Main[]>(`${import.meta.env.VITE_REST_SERVER_URL}/main/query?query=${query}`)
        return response.data
    }

    async add(draft: Draft): Promise<Main> {
        const response = await axios.post<Main>(`${import.meta.env.VITE_REST_SERVER_URL}/main/`, draft)
        return response.data
    }

    async remove(id: string): Promise<boolean> {
        const response = await axios.delete<boolean>(`${import.meta.env.VITE_REST_SERVER_URL}/main/${id}`)
        return response.data
    }
}

const mainServices = new Mains()
export default mainServices