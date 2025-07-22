import React from 'react';
import About from '../Sections/About';
import Solution from '../Sections/Solution/Solution';
import Technology from '../Technology/Technology';
import Benefits from '../Sections/Benefits/Benefits';
import CaseUse from '../Sections/CaseUse/CaseUse';

const Home = () => {
    return (
        <div>
            <About></About>
            <Solution></Solution>
            <Technology></Technology>
            <Benefits></Benefits>
            <CaseUse></CaseUse>
        </div>
    );
};

export default Home;