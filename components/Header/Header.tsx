import { Statuses } from '@/types/enums'
import React, { Dispatch, SetStateAction, useMemo, useRef } from 'react'
import {
	Animated,
	Easing,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import CustomPicker from '../ui/CustomPicker'

const Header = ({
	setSelectedItem,
	handleFilterData,
	selectedItem,
}: {
	setSelectedItem: Dispatch<SetStateAction<Statuses>>
	handleFilterData: () => void
	selectedItem: Statuses
}) => {
	const items = useMemo(
		() => [
			{ label: Statuses.ALL, value: Statuses.ALL },
			{ label: Statuses.FINISHED, value: Statuses.FINISHED },
			{ label: Statuses.ONGOING, value: Statuses.ONGOING },
			{ label: Statuses.SCHEDULED, value: Statuses.SCHEDULED },
		],
		[setSelectedItem, handleFilterData]
	)
	const rotation = useRef(new Animated.Value(0)).current

	const onPress = () => {
		handleFilterData()
		Animated.timing(rotation, {
			toValue: 1,
			duration: 500,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start(() => {
			rotation.setValue(0)
		})
	}

	const rotate = rotation.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	})

	const onValueChange = (value: Statuses) => {
		setSelectedItem(value)
	}
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Match Tracker</Text>

				<View style={styles.option}>
					<CustomPicker
						onValueChange={onValueChange}
						selectedValue={selectedItem}
						items={items}
					/>
				</View>

				<View style={styles.headerControls}>
					<TouchableOpacity onPress={onPress} style={styles.headerButton}>
						<Text style={styles.headerButtonText}>Обновить</Text>
						<Animated.Image
							source={require('@/assets/images/Refresh.png')}
							style={{ transform: [{ rotate }] }}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	header: {
		marginBottom: 20,
	},
	headerTitle: {
		textAlign: 'center',
		color: 'white',
		fontSize: 28,
		lineHeight: 28,
		fontWeight: '400',
		fontFamily: 'italic',
		marginBottom: 14,
	},
	headerControls: {},
	headerButton: {
		padding: 17,
		borderRadius: 4,
		backgroundColor: '#EB0237',
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 10,
	},
	headerButtonText: {
		textAlign: 'center',
		color: '#fff',
		lineHeight: 21,
		fontSize: 18,
		fontWeight: 600,
	},
	option: {
		marginBottom: 10,
	},
})
const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 16,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: '#555',
		lineHeight: 24,
		cursor: 'pointer',
		borderRadius: 4,
		color: 'white',
		paddingRight: 30,
		backgroundColor: '#0B0E12',
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		lineHeight: 24,
		cursor: 'pointer',

		padding: 30,
		paddingVertical: 16,
		borderWidth: 0.5,
		borderColor: '#555',
		borderRadius: 4,
		color: 'white',
		paddingRight: 30,
		backgroundColor: '#0B0E12',
	},
	inputWeb: {
		fontSize: 16,
		cursor: 'pointer',

		paddingHorizontal: 10,
		padding: 30,
		paddingVertical: 16,
		lineHeight: 24,
		borderWidth: 0.5,
		borderColor: '#555',
		borderRadius: 4,
		color: 'white',
		paddingRight: 30,
		backgroundColor: '#0B0E12',
	},

	modalViewMiddle: {
		backgroundColor: '#1E1E1E',
	},
	modalViewBottom: {
		backgroundColor: '#1E1E1E',
	},

	placeholder: {
		color: '#999',
	},
	iconContainer: {
		top: 20,
		right: 10,
	},
})

export default Header
