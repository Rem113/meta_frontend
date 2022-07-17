import React from 'react'
import { QueryName, Simulator } from '../../../../../data'
import { ImageRepository } from '../../../../../data/repositories/ImageRepository'
import useQuery from '../../../../../hooks/useQuery'
import DeleteIcon from '../../../../components/Icons/DeleteIcon'
import EditIcon from '../../../../components/Icons/EditIcon'
import FileIcon from '../../../../components/Icons/FileIcon'
import RightArrowIcon from '../../../../components/Icons/RightArrowIcon'
import TagIcon from '../../../../components/Icons/TagIcon'
import WifiIcon from '../../../../components/Icons/WifiIcon'

import * as classes from './SimulatorCard.module.scss'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import { SimulatorRepository } from '../../../../../data/repositories/SimulatorRepository'
import { toast } from 'react-toastify'

interface SimulatorCardProps {
    simulator: Simulator
    environmentId: string
}

const SimulatorCard: React.FC<SimulatorCardProps> = ({
    simulator,
    environmentId,
}) => {
    const { data: image } = useQuery(
        [QueryName.IMAGES, simulator.imageId!],
        () => ImageRepository.find(simulator.imageId)
    )

    const { mutateAsync: removeSimulator } = useMutation(
        SimulatorRepository.remove
    )

    const handleRemove = async () => {
        if (confirm('Are you sure you want to remove this simulator?')) {
            removeSimulator(simulator!.id)
                .then(() => {
                    toast('Simulator removed', {
                        type: 'success',
                        theme: 'dark',
                    })
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.info}>
                <h2>{simulator.name}</h2>
                <div className={classes.image}>
                    <div title="image name">
                        <FileIcon className={classes.icon} />
                        {image !== undefined && <p>{image.tag.name}</p>}
                    </div>
                    <div title="version">
                        <TagIcon className={classes.icon} />
                        {image !== undefined && <p>{image.tag.version}</p>}
                    </div>
                    <div title="port">
                        <WifiIcon className={classes.icon} />
                        <p>{simulator.port}</p>
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
                <Link
                    className={classes.edit}
                    to={`/environments/${environmentId}/simulators/${simulator.id}/edit`}
                >
                    <EditIcon className={classes['edit-icon']} />
                    Edit
                </Link>
                <div className={classes.delete} onClick={handleRemove}>
                    <DeleteIcon className={classes['delete-icon']} />
                    <p>Delete</p>
                </div>
            </div>
        </div>
    )
}

export default SimulatorCard
