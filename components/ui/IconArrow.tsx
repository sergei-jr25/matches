import Svg, { Path } from 'react-native-svg'

const ArrowSvg = ({ isExpanded = false }: { isExpanded?: boolean }) => {
	const rotation = isExpanded ? '360deg' : '-180deg'
	return (
		<Svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			style={{ transform: [{ rotate: `${rotation}` }], alignSelf: 'center' }}
		>
			<Path d='M18 15L12 9L6 15' stroke='#fff' strokeWidth='1.5' />
		</Svg>
	)
}
export default ArrowSvg
