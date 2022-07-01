import React from 'react'
import { useQuery } from 'react-query'
import { QueryName } from '../../../../data'
import { ImageRepository } from '../../../../data/repositories/ImageRepository'

import { useNavigate } from 'react-router-dom'
import FloatingActionButton from '../../../components/FloatingActionButton'
import AddIcon from '../../../components/Icons/AddIcon'
import * as classes from './ListImages.module.scss'

const ListImages: React.FC = () => {
	const {
		data: images,
		isFetching,
		isError,
	} = useQuery(QueryName.IMAGES, ImageRepository.all, {
		refetchOnWindowFocus: false,
	})

	const navigate = useNavigate()

	return (
		<>
			<h1 className={classes.h1}>Images</h1>
			{isFetching && <p>Loading...</p>}
			{isError && (
				<p>
					There was an error while fetching the images from the server. Please
					try again later
				</p>
			)}
			{images !== undefined && (
				<ul>
					{images.map(image => (
						<li key={`${image.tag.name}:${image.tag.version}`}>
							{image.tag.name}: {image.tag.version}
						</li>
					))}
				</ul>
			)}
			<FloatingActionButton
				icon={<AddIcon />}
				onClick={() => navigate('/images/create')}
			/>
		</>
	)
}

export default ListImages
