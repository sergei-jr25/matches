import App from '@/components/App'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeScreen() {
	const insets = useSafeAreaInsets()

	return (
		<View
			style={{
				flex: 1,
				paddingTop: insets.top || 20,
				paddingHorizontal: 15,
				paddingBottom: 10,
			}}
		>
			<App />
		</View>
	)
}
