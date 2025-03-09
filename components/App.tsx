import { useFetchMatches } from '@/services/api'
import useWebSocket from '@/services/websocket'
import { Statuses } from '@/types/enums'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from './Header/Header'
import MatchList from './Match/MatchList'

const App = () => {
	const [selectedItem, setSelectedItem] = useState<Statuses>(Statuses.ALL)

	const socket = useWebSocket()
	const { data, error, isLoading, setData, originalData, refetch } =
		useFetchMatches('/fronttemp')

	const handleFilterData = () => {
		refetch()
	}

	useEffect(() => {
		setData(prev => {
			if (!socket?.data) return prev

			const filteredMatches =
				selectedItem === Statuses.ALL
					? socket.data
					: socket.data.filter(curr => curr.status === selectedItem)

			return {
				...prev,
				data: {
					...prev?.data,
					matches: filteredMatches,
				},
				ok: true,
			}
		})
	}, [socket, selectedItem])

	if (isLoading) {
		return (
			<View>
				<Text>Loading ...</Text>
			</View>
		)
	}

	if (error) {
		return (
			<View style={styles.container}>
				<Text>{error}</Text>
			</View>
		)
	}

	return (
		<>
			<Header
				setSelectedItem={setSelectedItem}
				handleFilterData={handleFilterData}
				selectedItem={selectedItem}
			/>
			<MatchList matches={data?.data.matches || []} />
		</>
	)
}
const styles = StyleSheet.create({
	container: {
		paddingTop: 15,
		flex: 1,
		backgroundColor: '#06080C',
	},
})
export default App
