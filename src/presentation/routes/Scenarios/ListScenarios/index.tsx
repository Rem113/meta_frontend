import React from 'react'
import { useNavigate } from 'react-router-dom'
import FloatingActionButton from '../../../components/FloatingActionButton'
import AddIcon from '../../../components/Icons/AddIcon'

import * as classes from './ListScenarios.module.scss'

const ListScenarios: React.FC = () => {
	const navigate = useNavigate()

	return (
		<div className={classes.wrapper}>
			<h1>Scenarios</h1>
			<FloatingActionButton
				icon={<AddIcon />}
				onClick={() => navigate('/scenarios/create')}
			/>
		</div>
	)
}

export default ListScenarios
