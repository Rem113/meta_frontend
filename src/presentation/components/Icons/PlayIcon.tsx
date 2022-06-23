import React from 'react'
import IconProps from './IconProps'

const PlayIcon: React.FC<IconProps> = ({ className }) => (
	<svg
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M6 4V20M20 12L6 20M20 12L6 4'
			stroke='white'
			stroke-width='2'
			stroke-linecap='round'
			stroke-linejoin='round'
		/>
	</svg>
)

export default PlayIcon
