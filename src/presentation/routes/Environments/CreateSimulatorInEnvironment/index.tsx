import React, { useEffect, useState } from 'react'

import * as classes from './CreateSimulatorInEnvironment.module.scss'
import useQuery from '../../../../hooks/useQuery'
import { Image, QueryName } from '../../../../data'
import { ImageRepository } from '../../../../data/repositories/ImageRepository'
import PickImage from './PickImage'
import SimulatorForm from '../SimulatorForm'
import { useNavigate, useParams } from 'react-router-dom'
import { EnvironmentRepository } from '../../../../data/repositories/EnvironmentRepository'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import dedupeImages from '../../../../utils/dedupeImages'

const CreateSimulatorInEnvironment: React.FC = () => {
    const { environmentId } = useParams()

    const { data: images } = useQuery(QueryName.IMAGES, ImageRepository.all)

    const { data: environment } = useQuery(
        [QueryName.ENVIRONMENTS, environmentId!],
        () => EnvironmentRepository.find(environmentId!)
    )

    const { mutateAsync: addSimulator } = useMutation(
        EnvironmentRepository.addSimulator
    )

    const navigate = useNavigate()

    const submit = () => {
        const addSimulatorParams = {
            name,
            environmentId: environmentId!,
            imageId: selectedImageVersions!.find(
                image =>
                    image.tag.name === image.tag.name &&
                    image.tag.version === version
            )!.id,
            configuration: JSON.parse(configuration),
        }

        addSimulator(addSimulatorParams).then(() => {
            toast('Simulator created!', {
                theme: 'dark',
                type: 'success',
            })
            navigate(`/environments/${environmentId}/simulators`)
        })
    }

    const [selectedImage, setSelectedImage] = useState<Image | undefined>(
        undefined
    )

    const [selectedImageVersions, setSelectedImageVersions] = useState<
        Image[] | undefined
    >(undefined)

    const [version, setVersion] = useState('')
    const [name, setName] = useState('')
    const [configuration, setConfiguration] = useState('')

    useEffect(() => {
        if (selectedImage !== undefined) {
            const selectedImageVersions = images!.filter(
                image => image.tag.name === selectedImage!.tag.name
            )
            setSelectedImageVersions(selectedImageVersions)
            setVersion(
                selectedImageVersions[selectedImageVersions.length - 1].tag
                    .version
            )
        }
    }, [selectedImage])

    if (images === undefined) return <p>Loading...</p>

    return (
        <div className={classes.wrapper}>
            {selectedImage === undefined && environment !== undefined && (
                <PickImage
                    images={dedupeImages(images)}
                    environment={environment}
                    onPick={setSelectedImage}
                />
            )}
            {selectedImage !== undefined &&
                selectedImageVersions !== undefined && (
                    <SimulatorForm
                        images={selectedImageVersions}
                        environment={environment!}
                        addSimulator={submit}
                        simulatorName={name}
                        configuration={configuration}
                        imageVersion={version!}
                        setSimulatorName={setName}
                        setConfiguration={setConfiguration}
                        setImageVersion={setVersion}
                    />
                )}
        </div>
    )
}

export default CreateSimulatorInEnvironment
