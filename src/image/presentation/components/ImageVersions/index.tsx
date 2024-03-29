import React from 'react'

import * as classes from './ImageVersions.module.scss'
import compareSemver from '../../../utils/compareSemver'
import Chip from '../../../../core/presentation/components/Chip'
import { Image } from '../../../../core/data'
import { Tag } from 'tabler-icons-react'

interface ImageVersionsProps {
    images: Image[]
    imageVersion: string
    setImageVersion: (value: string) => void
}

const ImageVersions: React.FC<ImageVersionsProps> = ({
    images,
    imageVersion,
    setImageVersion,
}) => {
    const sorted = images
        .sort((first, second) =>
            compareSemver(first.tag.version, second.tag.version)
        )
        .reverse()

    return (
        <div className={classes.wrapper}>
            <div className={classes.images}>
                {sorted.map(image => (
                    <Chip
                        key={image.id}
                        selected={imageVersion === image.tag.version}
                        onClick={() => setImageVersion(image.tag.version)}
                        icon={<Tag size="1rem" />}
                        text={image.tag.version}
                    />
                ))}
            </div>
            <h3 className={classes.description}>
                {
                    images.find(image => image.tag.version === imageVersion)!
                        .description
                }
            </h3>
        </div>
    )
}

export default ImageVersions
