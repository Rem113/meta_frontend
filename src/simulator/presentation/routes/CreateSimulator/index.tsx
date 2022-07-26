import React, { useEffect, useState } from 'react'

import * as classes from './CreateSimulator.module.scss'
import { Image, QueryName } from '../../../../core/data'
import { ImageRepository } from '../../../../image/data/ImageRepository'
import PickImage from '../../components/PickImage'
import SimulatorForm from '../../components/SimulatorForm'
import { useNavigate, useParams } from 'react-router-dom'
import { EnvironmentRepository } from '../../../../environment/data/EnvironmentRepository'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import dedupeImages from '../../../../image/utils/dedupeImages'

const CreateSimulator: React.FC = () => {
    const { environmentId } = useParams()

    const { data: images, isLoading: imagesLoading } = useQuery(
        QueryName.IMAGES,
        ImageRepository.all
    )

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

    // TODO: Validate
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

    if (imagesLoading) return <p>Loading...</p>

    return (
        <div className={classes.wrapper}>
            {selectedImage === undefined && environment !== undefined && (
                <PickImage
                    images={dedupeImages(images!)}
                    environment={environment}
                    onPick={setSelectedImage}
                />
            )}
            {selectedImage !== undefined &&
                selectedImageVersions !== undefined && (
                    <div>
                        <h1>
                            Add <strong>{images![0].tag.name}</strong> to{' '}
                            <strong>{environment?.name}</strong>
                        </h1>
                        <SimulatorForm
                            images={selectedImageVersions}
                            addSimulator={submit}
                            simulatorName={name}
                            configuration={configuration}
                            imageVersion={version!}
                            setSimulatorName={setName}
                            setConfiguration={setConfiguration}
                            setImageVersion={setVersion}
                        />
                    </div>
                )}
        </div>
    )
}

export default CreateSimulator
