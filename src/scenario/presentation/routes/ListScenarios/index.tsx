import React from 'react'
import { useNavigate } from 'react-router-dom'
import { QueryName } from '../../../../core/data'
import { ScenarioRepository } from '../../../data/ScenarioRepository'
import FloatingActionButton from '../../../../core/presentation/components/FloatingActionButton'

import * as classes from './ListScenarios.module.scss'
import ScenarioCard from '../../components/ScenarioCard'
import { Plus } from 'tabler-icons-react'
import { useQuery } from 'react-query'

const ListScenarios: React.FC = () => {
    const { data: scenarios, isLoading } = useQuery(
        QueryName.SCENARIOS,
        ScenarioRepository.all
    )

    const navigate = useNavigate()

    return (
        <div className={classes.wrapper}>
            <h1>Scenarios</h1>
            {isLoading && <p>Loading...</p>}
            <div className={classes.scenarios}>
                {scenarios !== undefined &&
                    scenarios.map(scenario => (
                        <ScenarioCard key={scenario.id} scenario={scenario} />
                    ))}
            </div>
            <FloatingActionButton
                icon={<Plus size={'1.5rem'} />}
                onClick={() => navigate('/scenarios/create')}
            />
        </div>
    )
}

export default ListScenarios
