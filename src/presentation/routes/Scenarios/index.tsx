import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateScenario from './CreateScenario'
import ListScenarios from './ListScenarios'
import EditScenario from './EditScenario'

const Scenarios: React.FC = () => {
    return (
        <Routes>
            <Route path={'/create'} element={<CreateScenario />} />
            <Route path={'/:scenarioId/edit'} element={<EditScenario />} />
            <Route index element={<ListScenarios />} />
        </Routes>
    )
}

export default Scenarios
