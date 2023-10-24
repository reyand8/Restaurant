import {Route, Routes} from 'react-router-dom'
import { Layout, Menu } from 'antd'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import DishRoutes from './routes/Dishes/DishRoutes'
import WaiterRoutes from './routes/Waiters/WaiterRoutes'
import OrderRoutes from './routes/Orders/OrderRoutes'
import TableRoutes from './routes/Tables/TableRoutes'
import {menu} from './menu'
import './App.css'


function App() {
    return (
        <Layout>
            <Layout.Header className='header'>
                <Menu className='navigation' mode='horizontal' items={menu}/>
            </Layout.Header>
            <Layout>
                <Layout.Content className='main-content'>
                    <Routes>
                        <Route path='/' element={<Home />}/>
                        <Route path='/waiters/*' element={<WaiterRoutes />}/>
                        <Route path='/dishes/*' element={<DishRoutes />}/>
                        <Route path='/tables/*' element={<TableRoutes/>}/>
                        <Route path='/orders/*' element={<OrderRoutes />}/>
                        <Route path='/*' element={<NotFound />}/>
                    </Routes>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default App