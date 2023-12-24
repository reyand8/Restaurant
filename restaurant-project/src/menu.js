import { NavLink} from 'react-router-dom';
import './App.css';
const active = ({isActive}) => isActive ? 'active' : '';

export const menu = [
    {
        label: <NavLink to="/" className={active}>Home</NavLink>,
        key: 'home',
    },
    {
        label: <NavLink to="/waiters" className={active}>Waiters</NavLink>,
        key: 'waiters',
    },
    {
        label: <NavLink to="/dishes" className={active}>Dishes</NavLink>,
        key: 'dishes',
    },
    {
        label: <NavLink to="/tables" className={active}>Tables</NavLink>,
        key: 'tables',
    },
    {
        label: <NavLink to="/orders" className={active}>Orders</NavLink>,
        key: 'orders',
    },
];
