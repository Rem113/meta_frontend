import React from 'react'

import * as classes from './ScenarioCard.module.scss'
import { queryClient, QueryName, Scenario } from '../../../../../data'
import EditIcon from '../../../../components/Icons/EditIcon'
import { Link, useNavigate } from 'react-router-dom'
import DeleteIcon from '../../../../components/Icons/DeleteIcon'
import CopyIcon from '../../../../components/Icons/CopyIcon'
import { useMutation } from 'react-query'
import { ScenarioRepository } from '../../../../../data/repositories/ScenarioRepository'
import { toast } from 'react-toastify'

interface ScenarioCardProps {
    scenario: Scenario
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario }) => {
    const navigate = useNavigate()

    const { mutateAsync: removeScenario } = useMutation(
        () => ScenarioRepository.remove(scenario.id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(QueryName.SCENARIOS)
                toast('Scenario deleted!', { theme: 'dark', type: 'success' })
            },
        }
    )

    const { mutateAsync: duplicateScenario } = useMutation(
        ScenarioRepository.create,
        {
            onSuccess: scenario => {
                queryClient.invalidateQueries(QueryName.SCENARIOS)
                toast('Scenario duplicated!', {
                    theme: 'dark',
                    type: 'success',
                })
                navigate(`/scenarios/${scenario.id}/edit`)
            },
        }
    )

    const handleRemove = () => {
        if (confirm('Are you sure you want to delete this scenario?')) {
            removeScenario()
        }
    }

    const handleDuplicate = () => {
        if (confirm('Are you sure you want to duplicate this scenario?')) {
            duplicateScenario({
                name: `Copy of ${scenario.name}`,
                description: scenario.description,
                steps: scenario.steps,
            })
        }
    }

    return (
        <div className={classes.wrapper}>
            <h3 className={classes.name}>{scenario.name}</h3>
            <p className={classes.description}>{scenario.description}</p>
            <div className={classes.actions}>
                <div className={classes.duplicate} onClick={handleDuplicate}>
                    <CopyIcon />
                    <p>Duplicate</p>
                </div>
                <Link
                    to={`/scenarios/${scenario.id}/edit`}
                    className={classes.edit}
                >
                    <EditIcon />
                    <p>Edit</p>
                </Link>
                <div className={classes.delete} onClick={handleRemove}>
                    <DeleteIcon />
                    <p>Delete</p>
                </div>
            </div>
        </div>
    )
}

export default ScenarioCard
