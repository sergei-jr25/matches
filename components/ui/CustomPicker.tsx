import { Statuses } from '@/types/enums'
import React, { useEffect, useRef, useState } from 'react'
import {
	Animated,
	Easing,
	FlatList,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'

interface CustomPickerProps {
	selectedValue: Statuses // Или более конкретный тип, если известно
	onValueChange: (value: Statuses) => void // Или более конкретный тип, если известно
	items: { label: Statuses; value: Statuses }[]
}

const CustomPicker: React.FC<CustomPickerProps> = ({
	selectedValue,
	onValueChange,
	items,
}) => {
	const [modalVisible, setModalVisible] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const animation = useRef(new Animated.Value(0)).current

	const toggleModal = () => {
		setModalVisible(!modalVisible)
		setIsExpanded(!isExpanded)
	}

	useEffect(() => {
		Animated.timing(animation, {
			toValue: isExpanded ? 1 : 0,
			duration: 300,
			easing: Easing.ease,
			useNativeDriver: true,
		}).start()
	}, [isExpanded])

	const rotate = animation.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '180deg'],
	})
	console.log('isExpanded', isExpanded)

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={toggleModal} style={styles.input}>
				<Text style={styles.placeholder}>
					{selectedValue
						? items.find(item => item.value === selectedValue)?.label
						: Statuses.ALL}
				</Text>
				<Animated.View style={{ transform: [{ rotate }] }}>
					<Text style={styles.arrow}>▼</Text>
				</Animated.View>
			</TouchableOpacity>

			<Modal visible={modalVisible} animationType='slide' transparent={true}>
				<TouchableWithoutFeedback onPress={toggleModal}>
					<View style={styles.modalOverlay}>
						<View style={[styles.modalContent, styles.modalContent]}>
							<FlatList
								data={items}
								renderItem={({ item }) => (
									<TouchableOpacity
										style={styles.item}
										onPress={() => {
											onValueChange(item.value)
											setModalVisible(false)
											setIsExpanded(false)
										}}
									>
										{selectedValue === item.value ? (
											<Text style={styles.itemTextActive}>{item.label}</Text>
										) : (
											<Text style={styles.itemText}>{item.label}</Text>
										)}
									</TouchableOpacity>
								)}
								keyExtractor={item => item.value.toString()}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},

	item: {
		paddingVertical: 15,
	},
	container: {
		backgroundColor: '#0B0E12',
		borderRadius: 4,
	},
	input: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
	},
	placeholder: {
		color: '#B4B5B6',
		fontSize: 16,
	},
	modalContent: {
		backgroundColor: '#1E1E1E',
		padding: 10,
		borderRadius: 10,
		width: '80%',
	},
	itemText: {
		color: '#B4B5B6',
		fontSize: 16,
		padding: 10,
	},
	itemTextActive: {
		color: 'white',
		fontSize: 16,
		padding: 10,
		borderRadius: 4,
		backgroundColor: '#454545',
	},
	arrow: {
		color: '#B4B5B6',
	},
})

export default CustomPicker
