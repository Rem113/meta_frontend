import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './src/core/data'
import environmentRoutes from './src/environment/presentation/routes'
import imageRoutes from './src/image/presentation/routes'
import simulatorRoutes from './src/scenario/presentation/routes'
import scenarioRoutes from './src/simulator/presentation/routes'
import executionRoutes from './src/execution/presentation/routes'
import Navbar from './src/core/presentation/components/Navbar'
import Wrapper from './src/core/presentation/components/Wrapper'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const App = () => (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Wrapper>
                <Navbar />
                <Routes>
                    {[
                        ...environmentRoutes,
                        ...imageRoutes,
                        ...scenarioRoutes,
                        ...executionRoutes,
                        ...simulatorRoutes,
                    ].map(route => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.element />}
                        />
                    ))}
                </Routes>
            </Wrapper>
            <ToastContainer />
        </BrowserRouter>
    </QueryClientProvider>
)

ReactDOM.render(<App />, document.getElementById('app'))
