import { useFetchMatches } from '@/services/api'
import { View } from 'react-native'

const Match = () => {
	const { data, error, isLoading } = useFetchMatches('/fronttemp')

	return <View>{/* <MatchList matches={data} /> */}</View>
}
export default Match
