import React from 'react'
import { useParams } from 'react-router-dom'
import { QueryName } from '../../../../core/data'
import { ScenarioRepository } from '../../../data/ScenarioRepository'

import FloatingActionButton from '../../../../core/presentation/FloatingActionButton'

import Scenario from '../../components/Scenario'
import usePlayScenario from '../../hooks/usePlayScenario'
import ScenarioLogs from '../../components/ScenarioLogs'

import * as classes from './PlayScenario.module.scss'
import ScenarioExecutions from '../../components/ScenarioExecutions'
import { PlayerPlay } from 'tabler-icons-react'
import { useQuery } from 'react-query'

const PlayScenario: React.FC = () => {
    const { environmentId, scenarioId } = useParams()

    const { data: scenario } = useQuery(
        [QueryName.SCENARIOS, scenarioId!],
        () => ScenarioRepository.find(scenarioId!)
    )

    const { playScenario, stepStatus, stepMessage, logs, isPlaying } =
        usePlayScenario(environmentId!, scenarioId!)

    return (
        <>
            <div className={classes.wrapper}>
                {scenario !== undefined && (
                    <>
                        <Scenario
                            environmentId={environmentId!}
                            scenario={scenario}
                            stepStatus={stepStatus}
                            stepMessage={stepMessage}
                        />
                        <div className={classes.info}>
                            <ScenarioExecutions
                                environmentId={environmentId!}
                                scenarioId={scenarioId!}
                            />
                            <ScenarioLogs logs={logs} />
                        </div>
                    </>
                )}
            </div>
            <FloatingActionButton
                icon={<PlayerPlay size={'1.5rem'} />}
                onClick={playScenario}
                disabled={isPlaying}
            />
        </>
    )
}

export default PlayScenario
