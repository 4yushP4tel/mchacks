import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import "../style.css"

const Socials = () => {
    const profiles = [
        { name: 'Ayush Patel', linkedin: 'https://www.linkedin.com/in/ayush-patel-montreal/', descript: "I am a software engineering student who enjoys building projects which solve problems in other fields, such as medical and finance" },
        { name: 'David Preda', linkedin: 'https://www.linkedin.com/in/david-preda/',descript: "As a software engineering student, learning the ins and outs of web development is my passion" },
        { name: 'Jimmy Zhang', linkedin: 'https://www.linkedin.com/in/jmmyzhang/',descript: "Aspiring Software Developer with a passion for learning new programming languages and tools."},
        { name: 'Isaiah Abella', linkedin: 'https://www.linkedin.com/in/isaiah-abella/',descript: "a"},
    ];

    return (
        <div>
            <Header/>
            <div className='socials_container'>
            <h1>LinkedIn Profiles</h1>
            <ul>
                {profiles.map((profile, index) => (
                    <li key={index}>
                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                            {profile.name}
                        </a>
                        <p>{profile.descript}</p>
                    </li>
                ))}
            </ul>
            </div>
            <Footer/>

        </div>
        

    );
};

export default Socials;