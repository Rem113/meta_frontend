import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ViewScenario from './ViewScenario'
import ListScenarios from './ListScenarios'

const Scenarios: React.FC = () => (
	<Routes>
		<Route path={':id'} element={<ViewScenario />} />
		<Route index element={<ListScenarios />} />
	</Routes>
)

export default Scenarios
