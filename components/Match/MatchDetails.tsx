import { Match } from '@/types/types'
import { Image, StyleSheet, Text, View } from 'react-native'

const MatchDetails = ({ match }: { match: Match }) => {
	console.log('match', match)

	return (
		<View style={styles.matchDetails}>
			<View>
				<View style={styles.items}>
					{match.homeTeam.players.map((player, index) => (
						<View style={styles.item} key={index}>
							<View style={styles.top}>
								<Image
									source={require('@/assets/images/avatar.png')}
									style={styles.image}
								/>
								<Text style={styles.name}> {player.username || 'N/A'}</Text>
							</View>
							<View style={styles.bottom}>
								<Text style={styles.label}>Убийств:</Text>
								<Text style={styles.value}>{player.kills || 0}</Text>
							</View>
						</View>
					))}
				</View>
				<View style={styles.info}>
					<View style={styles.matchItemFooter}>
						<Text style={styles.label}>Points: </Text>
						<Text style={styles.value}>{match.awayTeam.total_kills}</Text>
					</View>
					<View style={styles.matchItemFooter}>
						<Text style={styles.label}>Место:</Text>
						<Text style={styles.value}>{match.awayTeam.place}</Text>
					</View>
					<View style={styles.matchItemFooter}>
						<Text style={styles.label}>Всего убийств:</Text>
						<Text style={styles.value}>{match.awayTeam.total_kills}</Text>
					</View>
				</View>
			</View>
			<View style={styles.middle}>
				<Text style={styles.sign}>VS</Text>
			</View>
			<View>
				<View style={styles.items}>
					{match.awayTeam.players.map((player, index) => (
						<View style={styles.item} key={index}>
							<View style={styles.top}>
								<Image
									source={require('@/assets/images/avatar.png')}
									style={styles.image}
								/>
								<Text style={styles.name}> {player.username || 'N/A'}</Text>
							</View>
							<View style={styles.bottom}>
								<Text style={styles.label}>Убийств:</Text>
								<Text style={styles.value}>{player.kills || 0}</Text>
							</View>
						</View>
					))}
				</View>
				<View style={styles.info}>
					<View style={styles.matchItemFooter}>
						<Text style={styles.label}>Points: </Text>
						<Text style={styles.value}>{match.awayTeam.total_kills}</Text>
					</View>
					<View style={styles.matchItemFooter}>
						<Text style={styles.label}>Место:</Text>
						<Text style={styles.value}>{match.awayTeam.place}</Text>
					</View>
					<View style={styles.matchItemFooter}>
						<Text style={styles.label}>Всего убийств:</Text>
						<Text style={styles.value}>{match.awayTeam.total_kills}</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	matchDetails: {
		paddingTop: 16,
		marginRight: -7,
		marginLeft: -7,
		// backgroundColor: '#282828',
	},
	middle: {
		paddingTop: 8,
		paddingBottom: 8,
	},
	sign: {
		fontSize: 14,
		fontWeight: 600,
		color: '#313A47',
		lineHeight: 21,
		textAlign: 'center',
	},
	items: {
		display: 'flex',
		flexDirection: 'row',
		gap: 7,
	},
	item: {
		flexGrow: 0,
		flexShrink: 0,
		flexBasis: '33.333%',
		backgroundColor: '#101318',
		paddingTop: 12,
		paddingRight: 7,
		paddingBottom: 12,
		paddingLeft: 7,
		borderRadius: 4,
	},
	top: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 4,
		gap: 8,
	},
	bottom: {
		flexDirection: 'row',
		gap: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 32,
		height: 32,
	},
	name: {
		fontSize: 14,
		lineHeight: 21,
		color: '#FAFAFA',
	},
	label: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		textAlign: 'center',
		color: '#FAFAFA66',
		opacity: 40,
	},
	value: {
		fontSize: 14,
		lineHeight: 21,
		color: '#FAFAFA',
		textAlign: 'center',
	},
	playerInfo: {
		marginBottom: 8,
	},
	playerName: {
		color: 'white',
	},
	playerKills: {
		color: '#ccc',
	},
	info: {
		flexDirection: 'row',
		width: 'auto',
	},
	matchItemFooter: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 7,
		flexGrow: 0,
		flexShrink: 0,
		flexBasis: '33.333%',
		backgroundColor: '#101318',
		marginTop: 12,
		padding: 15,
		borderRadius: 4,
	},
})
export default MatchDetails
