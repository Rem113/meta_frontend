import React from 'react'

import * as classes from './ImageVersions.module.scss'
import compareSemver from '../../../utils/compareSemver'
import Chip from '../Chip'
import TagIcon from '../Icons/TagIcon'
import { Image } from '../../../data'

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
    return (
        <div className={classes.wrapper}>
            <div className={classes.images}>
                {images
                    .sort((first, second) =>
                        compareSemver(first.tag.version, second.tag.version)
                    )
                    .reverse()
                    .map(image => (
                        <Chip
                            key={image.id}
                            selected={imageVersion === image.tag.version}
                            onClick={() => setImageVersion(image.tag.version)}
                            icon={<TagIcon className={classes.icon} />}
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
