import React from 'react'
import IconProps from './IconProps'

const AddIcon: React.FC<IconProps> = ({ className }) => (
	<svg
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M12 20V12M12 12V4M12 12H20M12 12H4'
			stroke='white'
			strokeWidth='2'
			strokeLinecap='round'
		/>
	</svg>
)

export default AddIcon
