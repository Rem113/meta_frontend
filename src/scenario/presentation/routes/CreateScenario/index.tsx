import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as Yup from "yup"

import { queryClient, QueryName } from "../../../../core/data"
import { ImageRepository } from "../../../../image/data/ImageRepository"
import { ScenarioRepository } from "../../../data/ScenarioRepository"
import RaisedButton from "../../../../core/presentation/components/RaisedButton"
import TextInput from "../../../../core/presentation/components/TextInput"

import * as classes from "./CreateScenario.module.scss"
import StepForm from "../../components/StepForm"
import { Plus } from "tabler-icons-react"
import validate from "../../../../core/presentation/utils/validate"
import CreateScenarioParams = ScenarioRepository.CreateScenarioParams

export interface StepData {
	step: number
	imageName: string
	imageVersion: string
	commandName: string
	commandDescription: string
	arguments: string
}

interface CreateScenarioError {
	name?: string
	description?: string
}

const schema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	description: Yup.string().required("Description is required")
	// steps: Yup.array()
})

const CreateScenario: React.FC = () => {
	const [name, setName] = useState<string>("")
	const [description, setDescription] = useState<string>("")
	const [stepsData, setStepsData] = useState<StepData[]>([])
	const [errors, setErrors] = useState<CreateScenarioError>({})

	const { data: images } = useQuery(QueryName.IMAGES, ImageRepository.all)

	const { mutateAsync: createScenario } = useMutation(
		ScenarioRepository.create,
		{
			onSuccess: () => queryClient.invalidateQueries(QueryName.SCENARIOS)
		}
	)

	const navigate = useNavigate()

	useEffect(() => {
		if (images !== undefined) {
			setStepsData([
				{
					step: 0,
					imageName: images[0].tag.name,
					imageVersion: images[0].tag.version,
					commandName: images[0].commands[0].name,
					commandDescription: images[0].commands[0].description,
					arguments: ""
				}
			])
		}
	}, [images])

	const set = (stepIndex: number, field: string) => (value: string) =>
		setStepsData(stepsData =>
			stepsData.map((step, index) =>
				index === stepIndex ? { ...step, [field]: value } : step
			)
		)

	const moveUp = (stepIndex: number) => () => {
		if (stepIndex === 0) return

		setStepsData(stepsData => [
			...stepsData.slice(0, stepIndex - 1),
			{
				...stepsData[stepIndex],
				step: stepIndex - 1
			},
			{
				...stepsData[stepIndex - 1],
				step: stepIndex
			},
			...stepsData.slice(stepIndex + 1)
		])
	}

	const moveDown = (stepIndex: number) => () => {
		if (stepIndex === stepsData.length - 1) return

		setStepsData(stepsData => [
			...stepsData.slice(0, stepIndex),
			{
				...stepsData[stepIndex + 1],
				step: stepIndex
			},
			{
				...stepsData[stepIndex],
				step: stepIndex + 1
			},
			...stepsData.slice(stepIndex + 2)
		])
	}

	const duplicate = (stepIndex: number) => () =>
		setStepsData(stepsData => [
			...stepsData.slice(0, stepIndex),
			{
				...stepsData[stepIndex],
				step: stepIndex
			},
			...stepsData.slice(stepIndex).map(stepData => ({
				...stepData,
				step: stepData.step + 1
			}))
		])

	const remove = (stepIndex: number) => () => {
		if (stepsData.length === 1)
			toast("The last step cannot be removed", {
				type: "warning",
				theme: "dark"
			})
		else
			setStepsData(stepsData => [
				...stepsData.slice(0, stepIndex),
				...stepsData.slice(stepIndex + 1).map(stepData => ({
					...stepData,
					step: stepData.step - 1
				}))
			])
	}

	const submit = async () => {
		let params = {
			name,
			description,
			steps: stepsData.map(stepData => {
				const image = images?.find(
					image =>
						image.tag.name === stepData.imageName &&
						image.tag.version === stepData.imageVersion
				)
				const command = image?.commands.find(
					command => command.name === stepData.commandName
				)

				return {
					imageId: image!.id,
					command: {
						name: command!.name,
						description: stepData.commandDescription,
						path: command!.path
					},
					arguments: stepData.arguments ? JSON.parse(stepData.arguments) : {}
				}
			})
		}

		const errors = await validate<CreateScenarioParams>(params, schema)

		if (errors !== null) {
			setErrors(errors)
		} else {
			setErrors({})

			createScenario(params).then(() => {
				toast("Scenario created!", {
					theme: "dark",
					type: "success"
				})
				navigate(-1)
			})
		}
	}

	return (
		<div className={classes.wrapper}>
			<h1>Add a scenario</h1>
			<form>
				<TextInput value={name} onChange={setName} label={"Name"} error={errors.name} />
				<TextInput
					value={description}
					onChange={setDescription}
					label={"Description"}
					error={errors.description}
				/>
				{images !== undefined && (
					<>
						<div className={classes.steps}>
							{stepsData.map((step, index) => (
								<StepForm
									key={index}
									stepData={step}
									setImageName={set(index, "imageName")}
									setImageVersion={set(index, "imageVersion")}
									setCommandName={set(index, "commandName")}
									setCommandDescription={set(
										index,
										"commandDescription"
									)}
									setArguments={set(index, "arguments")}
									moveUp={moveUp(index)}
									moveDown={moveDown(index)}
									duplicate={duplicate(index)}
									remove={remove(index)}
									images={images}
								/>
							))}
						</div>
						<RaisedButton
							className={classes["add-step"]}
							text={"Add step"}
							color={"secondary"}
							icon={<Plus size={"1rem"} />}
							size={"small"}
							onClick={() =>
								setStepsData([
									...stepsData,
									{
										step: stepsData.length,
										imageName: images[0].tag.name,
										imageVersion: images[0].tag.version,
										commandName: images[0].commands[0].name,
										commandDescription:
										images[0].commands[0].description,
										arguments: ""
									}
								])
							}
						/>
					</>
				)}
				<RaisedButton
					className={classes["add-scenario"]}
					text={"Add scenario"}
					icon={<Plus size={"1.5rem"} />}
					onClick={submit}
				/>
			</form>
		</div>
	)
}

export default CreateScenario
