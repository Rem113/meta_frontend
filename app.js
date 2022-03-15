import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './src/data'
import Home from './src/presentation/routes/Home'

const App = () => (
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
			</Routes>
		</BrowserRouter>
	</QueryClientProvider>
)

ReactDOM.render(<App />, document.getElementById('app'))
