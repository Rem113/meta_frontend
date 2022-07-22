import CreateImage from './CreateImage'
import ListImages from './ListImages'

export default [
    { path: '/images', element: ListImages },
    { path: '/images/create', element: CreateImage },
]
