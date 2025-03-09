import { ApiResponse, ApiResponseSchema } from '@/types/types'
import { useEffect, useState } from 'react'

const API_BASE_URL = 'https://app.ftoyd.com/fronttemp-service'

export const useFetchMatches = (url: string) => {
	const [data, setData] = useState<ApiResponse | undefined>(undefined)
	const [originalData, setOriginalData] = useState<ApiResponse | undefined>(
		undefined
	)

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const fetchData = async () => {
		try {
			setIsLoading(true)

			const response = await fetch(API_BASE_URL + url)
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			const data = await response.json()
			const parsedData = ApiResponseSchema.parse(data)
			setData(parsedData)
			setOriginalData(parsedData)
			return data
		} catch (error: any) {
			console.error('Error fetching matches:', error)
			setError('Ошибка: не удалось загрузить информацию')
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [url])

	const refetch = () => {
		fetchData()
	}

	return { data, isLoading, error, setData, originalData, refetch }
}
