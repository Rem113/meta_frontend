import React from 'react'
import IconProps from './IconProps'

const WifiIcon: React.FC<IconProps> = ({ className }) => (
	<svg
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M2 10C8 3.33301 16 3.33301 22 10M6 14C9.6 10 14.4 10 18 14'
			stroke='white'
			stroke-width='2'
			stroke-linecap='round'
			stroke-linejoin='round'
		/>
		<path
			d='M12 19C12.5523 19 13 18.5523 13 18C13 17.4477 12.5523 17 12 17C11.4477 17 11 17.4477 11 18C11 18.5523 11.4477 19 12 19Z'
			stroke='white'
			stroke-width='2'
			stroke-linecap='round'
			stroke-linejoin='round'
		/>
	</svg>
)

export default WifiIcon
