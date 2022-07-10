import React from 'react'
import IconProps from './IconProps'

const DownArrowIcon: React.FC<IconProps> = ({ className, onClick }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        onClick={onClick}
    >
        <path
            d="M12 20V4M5 13L12 20L19 13"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export default DownArrowIcon
