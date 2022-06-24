import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateEnvironment from './CreateEnvironment'
import ViewEnvironment from './ViewEnvironment'
import ListEnvironments from './ListEnvironments'

const Environments: React.FC = () => (
	<Routes>
		<Route path={'create'} element={<CreateEnvironment />} />
		<Route path={':id'} element={<ViewEnvironment />} />
		<Route index element={<ListEnvironments />} />
	</Routes>
)

export default Environments
