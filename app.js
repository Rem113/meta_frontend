import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './src/data'
import Images from './src/presentation/routes/Images'
import Navbar from './src/presentation/components/Navbar'
import Wrapper from './src/presentation/components/Wrapper'
import Environments from './src/presentation/routes/Environments'
import CreateEnvironment from './src/presentation/routes/CreateEnvironment'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import CreateImage from './src/presentation/routes/CreateImage'
import Scenarios from './src/presentation/routes/Scenarios'
import ViewScenario from './src/presentation/routes/ViewScenario'

const App = () => (
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<Wrapper>
				<Navbar />
				<Routes>
					<Route path={'/environments'} element={<Environments />} />
					<Route
						path={'/environments/create'}
						element={<CreateEnvironment />}
					/>
					<Route path={'/images'} element={<Images />} />
					<Route path={'/images/create'} element={<CreateImage />} />
					<Route path={'/scenarios'} element={<Scenarios />} />
					<Route path={'/scenarios/:id'} element={<ViewScenario />} />
				</Routes>
			</Wrapper>
			<ToastContainer />
		</BrowserRouter>
	</QueryClientProvider>
)

ReactDOM.render(<App />, document.getElementById('app'))
