import { Match } from '@/types/types'
import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import MatchItem from './MatchItem'

const MatchList = ({ matches }: { matches: Match[] | [] }) => {
	return (
		<FlatList
			data={matches}
			renderItem={({ item }) => <MatchItem match={item} />}
			keyExtractor={item => item.time}
			style={styles.list}
			contentContainerStyle={styles.contentContainer}
		/>
	)
}

const styles = StyleSheet.create({
	list: {},
	contentContainer: {
		gap: 8,
	},
})
export default MatchList
