import React, { useEffect, useState } from 'react'
import SimulatorForm from '../SimulatorForm'
import useQuery from '../../../../hooks/useQuery'
import { QueryName } from '../../../../data'
import { ImageRepository } from '../../../../data/repositories/ImageRepository'
import { useNavigate, useParams } from 'react-router-dom'
import { EnvironmentRepository } from '../../../../data/repositories/EnvironmentRepository'
import { useMutation } from 'react-query'
import { SimulatorRepository } from '../../../../data/repositories/SimulatorRepository'
import { toast } from 'react-toastify'

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

    const { data: simulator } = useQuery(
        [QueryName.SIMULATORS, simulatorId!],
        () =>
            EnvironmentRepository.findSimulatorInEnvironment(
                environmentId!,
                simulatorId!
            )
    )

    const { data: images } = useQuery(QueryName.IMAGES, ImageRepository.all, {
        enabled: simulator !== undefined,
    })
    const { data: environment } = useQuery(
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
        images === [] ||
        environment === undefined ||
        simulator === undefined ||
        imageVersion === undefined
    ) {
        return <p>Loading...</p>
    }

    return (
        <SimulatorForm
            images={imageVersions}
            environment={environment}
            imageVersion={imageVersion!}
            simulatorName={simulatorName!}
            configuration={configuration!}
            setImageVersion={setImageVersion}
            setSimulatorName={setSimulatorName}
            setConfiguration={setConfiguration}
            updateSimulator={submit}
        />
    )
}

export default EditSimulator
