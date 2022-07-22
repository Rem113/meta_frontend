import CreateScenario from './CreateScenario'
import ListScenarios from './ListScenarios'
import ScenariosForEnvironment from './ScenariosForEnvironment'
import PlayScenario from './PlayScenario'
import EditScenario from './EditScenario'

export default [
    { path: '/scenarios', element: ListScenarios },
    { path: '/scenarios/create', element: CreateScenario },
    {
        path: '/scenarios/:scenarioId/edit',
        element: EditScenario,
    },
    {
        path: '/environments/:environmentId/scenarios',
        element: ScenariosForEnvironment,
    },
    {
        path: '/environments/:environmentId/scenarios/:scenarioId',
        element: PlayScenario,
    },
]
