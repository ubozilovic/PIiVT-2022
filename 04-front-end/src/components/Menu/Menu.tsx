import { useState } from 'react';
import MenuAdministrator from './MenuAdministrator';
import AppStore from '../../stores/AppStore';
import MenuUser from './MenuUser';

export default function Menu() {
    const [ role, setRole ] = useState<"visitor" | "user" | "administrator">(AppStore.getState().auth.role);

    AppStore.subscribe(() => {
        setRole(AppStore.getState().auth.role)
    });

    return (
        <>
            { role === "visitor" && <MenuUser /> }
            { role === "administrator" && <MenuAdministrator /> }
        </>
    );
}