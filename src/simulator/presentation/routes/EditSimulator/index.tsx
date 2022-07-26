import React, { useEffect, useState } from 'react'
import SimulatorForm from '../../components/SimulatorForm'
import { QueryName } from '../../../../core/data'
import { ImageRepository } from '../../../../image/data/ImageRepository'
import { useNavigate, useParams } from 'react-router-dom'
import { EnvironmentRepository } from '../../../../environment/data/EnvironmentRepository'
import { useMutation, useQuery } from 'react-query'
import { SimulatorRepository } from '../../../data/SimulatorRepository'
import { toast } from 'react-toastify'

import * as classes from './EditSimulator.module.scss'

const EditSimulator: React.FC = () => {
    const [simulatorName, setSimulatorName] = useState<string | undefined>(
        undefined
    )
    const [imageVersion, setImageVersion] = useState<string | undefined>(
        undefined
    )
    const [configuration, setConfiguration] = useState<string | undefined>(
        undefined
    )

    const { environmentId, simulatorId } = useParams()

    const { data: simulator, isLoading: simulatorLoading } = useQuery(
        [QueryName.SIMULATORS, simulatorId!],
        () =>
            EnvironmentRepository.findSimulatorInEnvironment(
                environmentId!,
                simulatorId!
            )
    )

    const { data: images, isLoading: imagesLoading } = useQuery(
        QueryName.IMAGES,
        ImageRepository.all,
        {
            enabled: simulator !== undefined,
        }
    )
    const { data: environment, isLoading: environmentLoading } = useQuery(
        [QueryName.ENVIRONMENTS, environmentId!],
        () => EnvironmentRepository.find(environmentId!)
    )

    useEffect(() => {
        if (images !== undefined && simulator !== undefined) {
            setImageVersion(
                images!.find(image => image.id === simulator!.imageId)!.tag
                    .version
            )
        }
    }, [images, simulator])

    useEffect(() => {
        if (simulator !== undefined) {
            setSimulatorName(simulator.name)
            setConfiguration(JSON.stringify(simulator.configuration, null, 4))
        }
    }, [simulator])

    let imageName =
        images?.find(image => image.id === simulator?.imageId)?.tag.name ?? ''
    let imageVersions =
        images?.filter(image => image.tag.name === imageName) ?? []

    const { mutateAsync: updateSimulator } = useMutation(
        SimulatorRepository.update
    )

    const navigate = useNavigate()

    const submit = () => {
        const params = {
            environmentId: environmentId!,
            simulatorId: simulatorId!,
            name: simulatorName!,
            imageId: imageVersions.find(
                image => image.tag.version === imageVersion
            )!.id,
            port: simulator!.port,
            configuration: JSON.parse(configuration!),
        }

        updateSimulator(params).then(() => {
            toast('Simulator updated!', {
                theme: 'dark',
                type: 'success',
            })
            navigate(`/environments/${environmentId}/simulators`)
        })
    }

    if (
        imagesLoading ||
        environmentLoading ||
        simulatorLoading ||
        imageVersion === undefined
    ) {
        return <p>Loading...</p>
    }

    // TODO: Validate

    return (
        <div className={classes.wrapper}>
            <h1>
                Edit <strong>{imageName}</strong> in{' '}
                <strong>{environment!.name}</strong>
            </h1>
            <SimulatorForm
                images={imageVersions}
                imageVersion={imageVersion!}
                simulatorName={simulatorName!}
                configuration={configuration!}
                setImageVersion={setImageVersion}
                setSimulatorName={setSimulatorName}
                setConfiguration={setConfiguration}
                updateSimulator={submit}
            />
        </div>
    )
}

export default EditSimulator
