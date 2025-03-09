import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Footer = () => {
	return (
		<View style={styles.footer}>
			<TouchableOpacity style={styles.footerButton}>
				<Text style={styles.footerButtonText}>Do not allow cookies</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.footerButton}>
				<Text style={styles.footerButtonText}>Allow all cookies</Text>
			</TouchableOpacity>
			<Text style={styles.footerText}>РУС 05.03.2025</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		borderTopWidth: 1,
		borderTopColor: '#333',
		backgroundColor: '#1E1E1E', // Темный фон
	},
	footerButton: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 4,
		backgroundColor: '#333', // Темные кнопки
	},
	footerButtonText: {
		color: 'white',
	},
	footerText: {
		color: '#999',
	},
})

export default Footer
