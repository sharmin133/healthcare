import React from 'react';
import About from '../Sections/About';
import Solution from '../Sections/Solution/Solution';
import Technology from '../Technology/Technology';
import Benefits from '../Sections/Benefits/Benefits';
import CaseUse from '../Sections/CaseUse/CaseUse';
import GetStarted from '../Sections/GetStarted/GetStarted';
import SolutionInAction from '../Sections/InActions/SolutionInAction';

const Home = () => {
    return (
        <div>
            <About></About>
            <Solution></Solution>
            <SolutionInAction></SolutionInAction>
            <Technology></Technology>
            <Benefits></Benefits>
            <CaseUse></CaseUse>
            <GetStarted></GetStarted>
        </div>
    );
};

export default Home;