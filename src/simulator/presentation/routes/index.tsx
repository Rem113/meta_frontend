import SimulatorsForEnvironment from './SimulatorsForEnvironment'
import EditSimulator from './EditSimulator'
import CreateSimulator from './CreateSimulator'

export default [
    {
        path: '/environments/:environmentId/simulators',
        element: SimulatorsForEnvironment,
    },
    {
        path: '/environments/:environmentId/simulators/create',
        element: CreateSimulator,
    },
    {
        path: '/environments/:environmentId/simulators/:simulatorId/edit',
        element: EditSimulator,
    },
]
