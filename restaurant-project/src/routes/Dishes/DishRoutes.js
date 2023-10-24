import {Route, Routes} from 'react-router-dom'
import DishList from './DishList'
import DishForm from './DishForm'
import DishDetails from './DishDetails'
import NotFound from '../NotFound'


export default function DishRoutes() {
    return (
        <Routes>
            <Route path = '/' element= {<DishList/>}/>
            <Route path = '/create' element= {<DishForm/>}/>
            <Route path = '/:id/edit' element= {<DishForm/>}/>
            <Route path = '/:id/details' element= {<DishDetails/>}/>
            <Route path = '/*' element= {<NotFound/>}/>
        </Routes>
    )
}