import { Pressable, StyleSheet } from 'react-native'
import ArrowSvg from './IconArrow'

const ButtonArrow = ({
	isExpanded = false,
	onPress,
}: {
	isExpanded: boolean
	onPress: () => void
}) => {
	return (
		<Pressable style={styles.button} onPress={onPress}>
			<ArrowSvg isExpanded={isExpanded} />
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		padding: 20,
	},
})
export default ButtonArrow
