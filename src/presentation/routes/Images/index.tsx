import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateImage from './CreateImage'
import ListImages from './ListImages'

const Images: React.FC = () => (
	<Routes>
		<Route path={'create'} element={<CreateImage />} />
		<Route index element={<ListImages />} />
	</Routes>
)

export default Images
