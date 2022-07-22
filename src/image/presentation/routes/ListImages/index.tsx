import React from 'react'
import { QueryName } from '../../../../core/data'
import { ImageRepository } from '../../../data/ImageRepository'

import { useNavigate } from 'react-router-dom'
import FloatingActionButton from '../../../../core/presentation/FloatingActionButton'
import * as classes from './ListImages.module.scss'
import Card from '../../../../core/presentation/Card'
import dedupeImages from '../../../utils/dedupeImages'
import { Plus } from 'tabler-icons-react'
import { useQuery } from 'react-query'

const ListImages: React.FC = () => {
    const {
        data: images,
        isFetching,
        isError,
    } = useQuery(QueryName.IMAGES, ImageRepository.all)

    const navigate = useNavigate()

    return (
        <div className={classes.wrapper}>
            <h1>Images</h1>
            {isFetching && <p>Loading...</p>}
            {isError && (
                <p>
                    There was an error while fetching the images from the
                    server. Please try again later
                </p>
            )}
            <div className={classes.images}>
                {images !== undefined &&
                    dedupeImages(images).map(image => (
                        <Card
                            key={image.id}
                            name={image.tag.name}
                            description={image.description}
                        />
                    ))}
            </div>
            <FloatingActionButton
                icon={<Plus size={'1.5rem'} />}
                onClick={() => navigate('/images/create')}
            />
        </div>
    )
}

export default ListImages
