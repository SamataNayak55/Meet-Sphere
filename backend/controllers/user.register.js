import {User} from '../models/user.model.js';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import crypto from 'crypto';
import {Meeting} from "../models/meeting.models.js";

const login = async (req, res) => {
    const { password, email } = req.body;

    if(!email || !password)  {
        return res.status(httpStatus.BAD_REQUEST).json({ message: 'Email and password are required' });
    }

    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
        }
        let isPasswordValid = bcrypt.compare(password, user.password);
        if(isPasswordValid){
            let token = crypto.randomBytes(64).toString('hex');
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token });
        } else{
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
}

const register = async (req, res) => {

    const { email, name, username, password, confirmPassword } = req.body;

    try{
        const existingUser = await User.findOne({ username,email });
        if(existingUser){
            return res.status(httpStatus.FOUND).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = new User({
           name: name,
            username: username,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            email: email,
        });

        await newUser.save();
        res.status(httpStatus.CREATED).json({ message: 'User registered successfully' });

    }catch (e) {
        res.json({ message: "hii" });
}
}

const getUserHistory = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ token: token });
        const meetings = await Meeting.find({ user_id: user.username })
        res.json(meetings)
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}

const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;

    try {
        const user = await User.findOne({ token: token });

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({ message: "Added code to history" })
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}

export { login, register,getUserHistory,addToHistory };