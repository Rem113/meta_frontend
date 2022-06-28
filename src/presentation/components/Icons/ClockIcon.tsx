import React from 'react'
import IconProps from './IconProps'

const ClockIcon: React.FC<IconProps> = ({ className }) => (
	<svg
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
			stroke='white'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M15 16L12.586 13.586C12.2109 13.211 12.0001 12.7024 12 12.172V6'
			stroke='white'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export default ClockIcon
