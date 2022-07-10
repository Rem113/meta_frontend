import React, { useEffect, useState } from 'react'

import * as classes from './CreateSimulatorInEnvironment.module.scss'
import useQuery from '../../../../hooks/useQuery'
import { Image, QueryName } from '../../../../data'
import { ImageRepository } from '../../../../data/repositories/ImageRepository'
import PickImage from './PickImage'
import ConfigureImage from './ConfigureImage'
import { useNavigate, useParams } from 'react-router-dom'
import { EnvironmentRepository } from '../../../../data/repositories/EnvironmentRepository'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

const compareSemver = (first: string, second: string) => {
    const [firstMajor, firstMinor, firstPatch] = first.split('.')
    const [secondMajor, secondMinor, secondPatch] = second.split('.')

    if (firstMajor > secondMajor) return 1
    if (firstMajor < secondMajor) return -1
    if (firstMinor > secondMinor) return 1
    if (firstMinor < secondMinor) return -1
    if (firstPatch > secondPatch) return 1
    if (firstPatch < secondPatch) return -1
    return 0
}

const CreateSimulatorInEnvironment: React.FC = () => {
    const { environmentId } = useParams()

    const { data: images } = useQuery(QueryName.IMAGES, ImageRepository.unique)

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
            imageId: imageVersions!.find(
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
            navigate(`/environments/${environmentId}`)
        })
    }

    const [selectedImage, setSelectedImage] = useState<Image | undefined>(
        undefined
    )

    const [imageVersions, setImageVersions] = useState<Image[] | undefined>(
        undefined
    )

    const [version, setVersion] = useState('')
    const [name, setName] = useState('')
    const [configuration, setConfiguration] = useState('')

    useEffect(() => {
        if (selectedImage !== undefined) {
            const imageVersions = images!.filter(
                image => image.tag.name === selectedImage!.tag.name
            )
            imageVersions
                .sort((first, second) =>
                    compareSemver(first.tag.version, second.tag.version)
                )
                .reverse()
            setImageVersions(
                images!.filter(
                    image => image.tag.name === selectedImage!.tag.name
                )
            )
            setVersion(imageVersions[0].tag.version)
        }
    }, [selectedImage])

    if (images === undefined) return <p>Loading...</p>

    return (
        <div className={classes.wrapper}>
            {selectedImage === undefined && environment !== undefined && (
                <PickImage
                    images={images}
                    environment={environment}
                    onPick={setSelectedImage}
                />
            )}
            {selectedImage !== undefined && imageVersions !== undefined && (
                <ConfigureImage
                    images={imageVersions}
                    environment={environment!}
                    addSimulator={submit}
                    name={name}
                    configuration={configuration}
                    version={version!}
                    setName={setName}
                    setConfiguration={setConfiguration}
                    setVersion={setVersion}
                />
            )}
        </div>
    )
}

export default CreateSimulatorInEnvironment
