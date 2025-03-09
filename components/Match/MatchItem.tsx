import { Statuses } from '@/types/enums'
import { Match } from '@/types/types'
import React, { useEffect, useState } from 'react'
import {
	Animated,
	Image,
	LayoutAnimation,
	Platform,
	StyleSheet,
	Text,
	UIManager,
	View,
} from 'react-native'
import ButtonArrow from '../ui/ButtonArrow'
import MatchDetails from './MatchDetails'

const MatchItem = ({ match }: { match: Match }) => {
	const [isExpanded, setIsExpanded] = useState(false)

	const homeScoreAnimated = new Animated.Value(match.homeScore)
	const awayScoreAnimated = new Animated.Value(match.awayScore)

	const fontSizeAnimated = new Animated.Value(14)

	useEffect(() => {
		Animated.timing(homeScoreAnimated, {
			toValue: match.homeScore,
			duration: 500,
			useNativeDriver: false,
		}).start()

		Animated.timing(awayScoreAnimated, {
			toValue: match.awayScore,
			duration: 500,
			useNativeDriver: false,
		}).start()

		Animated.sequence([
			Animated.timing(fontSizeAnimated, {
				toValue: 21,
				duration: 200,
				useNativeDriver: false,
			}),
			Animated.timing(fontSizeAnimated, {
				toValue: 14,
				duration: 200,
				useNativeDriver: false,
			}),
		]).start()
	}, [match.homeScore, match.awayScore])

	useEffect(() => {
		if (Platform.OS === 'android') {
			if (UIManager.setLayoutAnimationEnabledExperimental) {
				UIManager.setLayoutAnimationEnabledExperimental(true)
			}
		}
	}, [])

	const toggleMatch = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
		setIsExpanded(!isExpanded)
	}

	return (
		<View style={styles.matchItem}>
			<View>
				<View>
					<View style={styles.matchHeader}>
						<View style={styles.item}>
							<Image source={require('@/assets/images/role.png')} />
							<Text style={styles.text}> {match.homeTeam.name}</Text>
						</View>
						<View style={styles.actions}>
							<Animated.Text
								style={[styles.text, { fontSize: fontSizeAnimated }]}
							>
								{match.homeScore} : {match.awayScore}
							</Animated.Text>
							<Text
								style={[
									styles.status,

									match.status === Statuses.FINISHED && styles.statusFinished,
									match.status === Statuses.ONGOING && styles.statusLive,
									match.status === Statuses.SCHEDULED && styles.statusScheduled,
								]}
							>
								{' '}
								{match.status}{' '}
							</Text>
							<View style={styles.arrow}>
								{!isExpanded && (
									<ButtonArrow isExpanded={isExpanded} onPress={toggleMatch} />
								)}
							</View>
						</View>

						<View style={styles.item}>
							<Text style={styles.text}>{match.awayTeam.name}</Text>
							<Image source={require('@/assets/images/role.png')} />
						</View>
					</View>
				</View>
			</View>
			{isExpanded && <MatchDetails match={match} />}
			{isExpanded && (
				<ButtonArrow isExpanded={isExpanded} onPress={toggleMatch} />
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	matchItem: {
		padding: 8,
		backgroundColor: '#0B0E12',
	},

	item: {
		flexDirection: 'row',
		gap: 6,
		alignItems: 'center',
	},
	actions: {
		alignItems: 'center',
		gap: 4,
	},
	text: {
		fontSize: 14,
		fontWeight: 600,
		color: '#fff',
	},
	textActive: {
		fontSize: 21,
	},
	matchHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	teamName: {
		color: 'white',
		fontSize: 16,
	},
	score: {
		color: '#ccc',
		fontSize: 16,
	},
	status: {
		paddingTop: 4,
		paddingBottom: 4,

		width: 70,
		marginRight: 'auto',
		marginLeft: 'auto',
		color: '#fff',
		fontSize: 12,
		fontWeight: 600,
		backgroundColor: '#43AD28',
		borderRadius: 4,
		textAlign: 'center',
		flexDirection: 'row',
	},
	statusFinished: {
		backgroundColor: '#EB0237',
	},
	statusLive: {
		backgroundColor: '#EB0237',
	},
	statusScheduled: {
		backgroundColor: '#eb6402',
	},
	arrow: {},
})

export default MatchItem
