import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateEnvironment from './CreateEnvironment'
import SimulatorsForEnvironment from './SimulatorsForEnvironment'
import ListEnvironments from './ListEnvironments'
import ScenariosForEnvironment from './ScenariosForEnvironment'
import PlayScenarioInEnvironment from './PlayScenarioInEnvironment'
import ViewExecutionForScenarioInEnvironment from './ViewExecutionForScenarioInEnvironment'
import CreateSimulatorInEnvironment from './CreateSimulatorInEnvironment'
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
            element={<CreateSimulatorInEnvironment />}
        />
        <Route
            path={':environmentId/scenarios'}
            element={<ScenariosForEnvironment />}
        />
        <Route
            path={':environmentId/scenarios/:scenarioId'}
            element={<PlayScenarioInEnvironment />}
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
