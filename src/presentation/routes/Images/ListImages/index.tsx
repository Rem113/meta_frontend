import React from 'react'
import { QueryName } from '../../../../data'
import { ImageRepository } from '../../../../data/repositories/ImageRepository'

import { useNavigate } from 'react-router-dom'
import FloatingActionButton from '../../../components/FloatingActionButton'
import AddIcon from '../../../components/Icons/AddIcon'
import * as classes from './ListImages.module.scss'
import Card from '../../../components/Card'
import useQuery from '../../../../hooks/useQuery'

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
					There was an error while fetching the images from the server. Please
					try again later
				</p>
			)}
			<div className={classes.images}>
				{images !== undefined &&
					images.map(image => (
						<Card
							key={image.id}
							name={`${image.tag.name}:${image.tag.version}`}
							description={image.description}
						/>
					))}
			</div>
			<FloatingActionButton
				icon={<AddIcon />}
				onClick={() => navigate('/images/create')}
			/>
		</div>
	)
}

export default ListImages
