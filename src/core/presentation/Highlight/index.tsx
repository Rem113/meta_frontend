import hljs from 'highlight.js'
import React, { useEffect, useRef } from 'react'

interface HighlightProps {
    className: string
    value: string
}

const Highlight: React.FC<HighlightProps> = ({ className, value }) => {
    const ref = useRef<HTMLPreElement>(null)

    useEffect(() => {
        if (ref.current === null) return

        const node = ref.current.querySelector('pre code')

        hljs.highlightElement(node as HTMLElement)
    }, [value])

    let displayValue = value

    try {
        displayValue = JSON.stringify(JSON.parse(value), null, 4)
    } catch (_) {}

    return (
        <pre ref={ref} className={className}>
            <code>{displayValue}</code>
        </pre>
    )
}

export default Highlight
