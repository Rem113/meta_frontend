import React from 'react'
import { useQuery } from 'react-query'
import { QueryName, Simulator } from '../../../../../data'
import { ImageRepository } from '../../../../../data/repositories/ImageRepository'
import DeleteIcon from '../../../../components/Icons/DeleteIcon'
import EditIcon from '../../../../components/Icons/EditIcon'
import FileIcon from '../../../../components/Icons/FileIcon'
import RightArrowIcon from '../../../../components/Icons/RightArrowIcon'
import TagIcon from '../../../../components/Icons/TagIcon'

import * as classes from './SimulatorCard.module.scss'

interface SimulatorCardProps {
	simulator: Simulator
}

const SimulatorCard: React.FC<SimulatorCardProps> = ({ simulator }) => {
	const { data: image } = useQuery(
		[QueryName.IMAGES, simulator.imageId],
		() => ImageRepository.find(simulator.imageId),
		{ refetchOnWindowFocus: false }
	)
	return (
		<div className={classes.wrapper}>
			<div className={classes.info}>
				<h2>{simulator.name}</h2>
				<div className={classes.image}>
					<div>
						<FileIcon className={classes.icon} />
						{image !== undefined && image.tag.name}
					</div>
					<div>
						<TagIcon className={classes.icon} />
						{image !== undefined && image.tag.version}
					</div>
				</div>
			</div>
			<div className={classes.config}>
				{Object.keys(simulator.configuration).map(key => (
					<div key={key} className={classes.value}>
						<p>{key}</p>
						<RightArrowIcon className={classes.arrow} />
						<p>{simulator.configuration[key]}</p>
					</div>
				))}
			</div>
			<div className={classes.actions}>
				<div className={classes.edit}>
					<EditIcon className={classes['edit-icon']} />
					<p>Edit</p>
				</div>
				<div className={classes.delete}>
					<DeleteIcon className={classes['delete-icon']} />
					<p>Delete</p>
				</div>
			</div>
		</div>
	)
}

export default SimulatorCard
