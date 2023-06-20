require('dotenv').config();

const bcrypt = require('bcrypt');
const User = require('../models/user');
const {findByEmail} = require("./userController");
const authController = {};
authController.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Un utilisateur avec cette adresse e-mail existe déjà" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ username, email, password: hashedPassword });
        res.json({ user: newUser});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

authController.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Mot de passe invalide.' });
        }
        res.status(200).json( "utilisateur connecté" );
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}


module.exports = authController;