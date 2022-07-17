import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateEnvironment from './CreateEnvironment'
import SimulatorsForEnvironment from './SimulatorsForEnvironment'
import ListEnvironments from './ListEnvironments'
import ScenariosForEnvironment from './ScenariosForEnvironment'
import PlayScenario from './PlayScenario'
import ViewExecutionForScenarioInEnvironment from './ViewExecutionForScenarioInEnvironment'
import CreateSimulator from './CreateSimulator'
import EditSimulator from './EditSimulator'

const Environments: React.FC = () => (
    <Routes>
        <Route path={'create'} element={<CreateEnvironment />} />
        <Route
            path={':environmentId/simulators'}
            element={<SimulatorsForEnvironment />}
        />
        <Route
            path={':environmentId/simulators/:simulatorId/edit'}
            element={<EditSimulator />}
        />
        <Route
            path={':environmentId/simulators/create'}
            element={<CreateSimulator />}
        />
        <Route
            path={':environmentId/scenarios'}
            element={<ScenariosForEnvironment />}
        />
        <Route
            path={':environmentId/scenarios/:scenarioId'}
            element={<PlayScenario />}
        />
        <Route
            path={
                ':environmentId/scenarios/:scenarioId/executions/:executionId'
            }
            element={<ViewExecutionForScenarioInEnvironment />}
        />
        <Route index element={<ListEnvironments />} />
    </Routes>
)

export default Environments
