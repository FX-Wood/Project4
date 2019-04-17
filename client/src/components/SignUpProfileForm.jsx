import React from 'react';
import { Link } from 'react-router-dom';
import SignUpAvatar from '../components/SignupAvatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

const signupProfileForm = ({ profilePicture, skier, snowboarder, complicated, homeMountain, handleChange, submitSignup }) => {
    return (
        <div className="signup-profile-form">

            <form onSubmit={(e) => e.preventDefault()} >
                <SignUpAvatar src={profilePicture} />
                <TextField  onChange={handleChange} value={profilePicture} type="file" name="profilePicture" variant="outlined"/>
                <Checkbox 
                    name="skier" 
                    value={skier} 
                    onChange={handleChange} 
                />
                <Checkbox 
                    name="snowboarder" 
                    value={snowboarder} 
                    onChange={handleChange} 
                />
                <Checkbox 
                    name="complicated" 
                    value={complicated} 
                    onChange={handleChange} 
                />
                <TextField  onChange={handleChange} value={homeMountain} type="text" name="homeMountain" placeholder="home is where the heart is" variant="outlined"/>
            </form>
            <Button component={Link} to="/signup" variant="contained" color="primary">Back</Button>
            <Button component={Link} to="/signup/profile" variant="contained" color="primary">Forward</Button>
        </div>
    )
}

export default signupProfileForm