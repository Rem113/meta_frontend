import React from 'react'
import IconProps from './IconProps'

const FailureIcon: React.FC<IconProps> = ({ className }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M15 15L9 9M15 9L9 15"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="white"
            strokeWidth="2"
        />
    </svg>
)

export default FailureIcon
