import CreateEnvironment from './CreateEnvironment'
import ListEnvironments from './ListEnvironments'

export default [
    { path: '/environments', element: ListEnvironments },
    { path: '/environments/create', element: CreateEnvironment },
]
