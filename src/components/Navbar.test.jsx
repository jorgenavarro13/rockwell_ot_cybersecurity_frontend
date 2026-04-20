import React from 'react';
import {render, screen } from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext.jsx';

import { AuthProvider } from '../context/AuthContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

//Necesario para hacer mocks
import {vi} from 'vitest';
vi.mock('../context/AuthContext.jsx');

describe('Navbar component', () => {
    // Uso de mock para poder ver las propiedades
    it('Properties when user is not logged in', ()=>{
        useAuth.mockReturnValue({user:null});

        render(
            <Router>
                <Navbar/>
            </Router>
        )

        // Verifica el efecto en el DOM (no la variable interna)
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.queryByText('Videogame')).not.toBeInTheDocument();
        //expect(screen.getByText('Dashboard')).not.toBeInTheDocument(); 
    });


    it('Properties when user IS logged in as admin', () => {
        useAuth.mockReturnValue({
            user: { username: 'jorge', isAdmin: true }
        });

        render(
            <Router>
                <Navbar />
            </Router>
        );

        expect(screen.getByText(/jorge/i)).toBeInTheDocument(); 
        expect(screen.getByText('Dashboard')).toBeInTheDocument(); 
        expect(screen.getByText('Videogame')).toBeInTheDocument();
    });

    
    it('Properties when user IS logged in as a user', () => {
        useAuth.mockReturnValue({
            user: { username: 'jorge', isAdmin: false }
        });

        render(
            <Router>
                <Navbar />
            </Router>
        );

        expect(screen.getByText(/jorge/i)).toBeInTheDocument(); 
        // expect(screen.getByText('Dashboard')).not.toBeInTheDocument(); 
        expect(screen.getByText('Videogame')).toBeInTheDocument();
    });

});
