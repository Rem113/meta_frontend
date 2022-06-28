import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateScenario from './CreateScenario'
import ListScenarios from './ListScenarios'

import * as classes from './Scenarios.module.scss'

const Scenarios: React.FC = () => {
	return (
		<Routes>
			<Route path={'/create'} element={<CreateScenario />} />
			<Route index element={<ListScenarios />} />
		</Routes>
	)
}

export default Scenarios
