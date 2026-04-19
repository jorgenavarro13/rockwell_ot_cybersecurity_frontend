import React from 'react';
import {render, screen } from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext.jsx';

import { AuthProvider } from '../context/AuthContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('Navbar component', () => {
  it('Navbar renders', () => {
    render(
        <AuthProvider>
            <Router>
                <Navbar />
            </Router>
        </AuthProvider>
    );
    });


    it('Shows correct links when user is not logged in', () => {
        render(
            <AuthProvider>
                <Router>
                    <Navbar />
                </Router>
            </AuthProvider>
        );
    expect(screen.getByText('About Rockwell')).toBeInTheDocument();
    expect(screen.getByText('Ranking')).toBeInTheDocument();
    expect(screen.queryByText('Videogame')).not.toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Login')).toBeInTheDocument();
    });

});
