import { Route, Routes } from 'react-router-dom'
import NotFound from '../NotFound'
import WaiterList from './WaiterList'
import WaiterForm from './WaiterForm'
import WaiterDetails from './WaiterDetails'

export default function WaiterRoutes() {
    return (
        <Routes>
            <Route path='/' element={<WaiterList />} />
            <Route path='/create' element={<WaiterForm />} />
            <Route path='/:id/edit' element={<WaiterForm />} />
            <Route path='/:id/details' element={<WaiterDetails />} />
            <Route path='/*' element={<NotFound />} />
        </Routes>
    )
}