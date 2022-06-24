import React from 'react'
import IconProps from './IconProps'

const RightArrowIcon: React.FC<IconProps> = ({ className }) => (
	<svg
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M4 12H20M13 5L20 12L13 19'
			stroke='white'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export default RightArrowIcon
