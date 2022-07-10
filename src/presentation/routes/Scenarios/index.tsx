import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateScenario from './CreateScenario'
import ListScenarios from './ListScenarios'

const Scenarios: React.FC = () => {
    return (
        <Routes>
            <Route path={'/create'} element={<CreateScenario />} />
            <Route index element={<ListScenarios />} />
        </Routes>
    )
}

export default Scenarios
