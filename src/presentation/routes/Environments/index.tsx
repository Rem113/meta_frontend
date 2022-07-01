import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateEnvironment from './CreateEnvironment'
import SimilatorsForEnvironment from './SimulatorsForEnvironment'
import ListEnvironments from './ListEnvironments'
import ScenariosForEnvironment from './ScenariosForEnvironment'
import PlayScenarioInEnvironment from './PlayScenarioInEnvironment'
import ViewExecutionForScenarioInEnvironment from './ViewExecutionForScenarioInEnvironment'

const Environments: React.FC = () => (
	<Routes>
		<Route path={'create'} element={<CreateEnvironment />} />
		<Route
			path={':environmentId/simulators'}
			element={<SimilatorsForEnvironment />}
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
			path={':environmentId/scenarios/:scenarioId/executions/:executionId'}
			element={<ViewExecutionForScenarioInEnvironment />}
		/>
		<Route index element={<ListEnvironments />} />
	</Routes>
)

export default Environments
