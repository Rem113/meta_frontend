import React from 'react'
import { Environment, Image } from '../../../../core/data'

import * as classes from './PickImage.module.scss'
import Card from '../../../../core/presentation/components/Card'

interface PickImageProps {
    images: Image[]
    environment: Environment
    onPick: (image: Image) => void
}

const PickImage: React.FC<PickImageProps> = ({
    images,
    environment,
    onPick,
}) => {
    return (
        <div className={classes.wrapper}>
            <h1>
                Add a simulator for <strong>{environment.name}</strong>
            </h1>
            <div className={classes.images}>
                {images.map(image => (
                    <Card
                        key={image.id}
                        name={image.tag.name}
                        description={image.description}
                        onClick={() => onPick(image)}
                    />
                ))}
            </div>
        </div>
    )
}

export default PickImage
