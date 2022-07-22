import React from 'react'
import { QueryName } from '../../../../data'
import { ImageRepository } from '../../../../data/repositories/ImageRepository'

import { useNavigate } from 'react-router-dom'
import FloatingActionButton from '../../../components/FloatingActionButton'
import * as classes from './ListImages.module.scss'
import Card from '../../../components/Card'
import useQuery from '../../../../hooks/useQuery'
import dedupeImages from '../../../../utils/dedupeImages'
import { Plus } from 'tabler-icons-react'

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
