import { Match } from '@/types/types'
import { useEffect, useState } from 'react'

const useWebSocket = () => {
	const [socket, setSocket] = useState<
		{ type: string; data: Match[] } | undefined
	>(undefined)
	const targetWsUrl = 'wss://app.ftoyd.com/fronttemp-service/ws'
	const interval = 2000
	let isReconnecting = false
	let reconnectAttempts = 0
	const maxReconnectAttempts = 7
	const reconnectDelay = 3000
	let isProcessing = false

	useEffect(() => {
		const targetWs = new WebSocket(targetWsUrl)

		const connectWebSocket = () => {
			let intervalId: NodeJS.Timeout | null = null
			targetWs.onopen = () => {
				console.log('Соединение установлено')
				isReconnecting = false
				reconnectAttempts = 0
			}

			targetWs.onmessage = event => {
				if (isProcessing) {
					return
				}

				isProcessing = true

				try {
					const parsedData = JSON.parse(event.data)
					setSocket(parsedData)
					console.log('Обработано сообщение:', parsedData)
				} catch (error) {
					console.error('Ошибка разбора JSON:', error)
				}

				setTimeout(() => {
					isProcessing = false
				}, interval)
			}
			targetWs.onerror = error => {
				console.error('Ошибка:', error)
			}

			targetWs.onclose = () => {
				console.log('Соединение закрыто')
				if (!isReconnecting && reconnectAttempts < maxReconnectAttempts) {
					isReconnecting = true
					reconnectAttempts++
					console.log(
						`Попытка переподключения через ${reconnectDelay / 1000} секунд...`
					)
					setTimeout(connectWebSocket, reconnectDelay)
				} else if (reconnectAttempts >= maxReconnectAttempts) {
					console.log(
						'Достигнуто максимальное количество попыток переподключения.'
					)
				}
			}
		}

		connectWebSocket()
	}, [])

	return socket
}

export default useWebSocket
// try {
// 	if (message instanceof ArrayBuffer) {
// 		const uint8Array = new Uint8Array(message)
// 		const decoder = new TextDecoder('utf-8')
// 		const text = decoder.decode(uint8Array)
// 		const data = JSON.parse(text)
// 		setSocket(data)
// 	} else {
// 		console.log('Получено сообщение:', message)
// 	}
// } catch (error) {
// 	console.error('Ошибка разбора JSON:', error)
// }
