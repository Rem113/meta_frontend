import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './src/data'
import Images from './src/presentation/routes/Images'
import Navbar from './src/presentation/components/Navbar'
import Wrapper from './src/presentation/components/Wrapper'
import Environments from './src/presentation/routes/Environments'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Scenarios from './src/presentation/routes/Scenarios'

const App = () => (
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<Wrapper>
				<Navbar />
				<Routes>
					<Route path={'environments/*'} element={<Environments />} />
					<Route path={'images/*'} element={<Images />} />
					<Route path={'scenarios/*'} element={<Scenarios />} />
				</Routes>
			</Wrapper>
			<ToastContainer />
		</BrowserRouter>
	</QueryClientProvider>
)

ReactDOM.render(<App />, document.getElementById('app'))
