import React, { useState } from 'react'
import { Step } from '../../../../data'
import AddIcon from '../../../components/Icons/AddIcon'
import RaisedButton from '../../../components/RaisedButton'
import TextInput from '../../../components/TextInput'

import * as classes from './CreateScenario.module.scss'

const CreateScenario: React.FC = () => {
	const [name, setName] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [steps, setSteps] = useState<Step[]>([])

	return (
		<div className={classes.wrapper}>
			<h1>Add a scenario</h1>
			<form>
				<TextInput value={name} onChange={setName} label={'Name'} />
				<TextInput
					value={description}
					onChange={setDescription}
					label={'Description'}
				/>
				{steps.map((_, index) => (
					<div key={index} className={classes.step}>
						<p>Step</p>
					</div>
				))}
				<RaisedButton
					text={'Add step'}
					color={'secondary'}
					icon={<AddIcon />}
					size={'small'}
					onClick={() =>
						setSteps([
							...steps,
							{
								arguments: {},
								command: {
									name: '',
									description: '',
									path: '',
								},
								imageId: '',
							},
						])
					}
				/>
			</form>
		</div>
	)
}

export default CreateScenario
