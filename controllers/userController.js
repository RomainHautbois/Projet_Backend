const { Op } = require('sequelize');
const User = require('../models/user');

const userController = {};

userController.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Une erreur est survenue lors de la récupération des utilisateurs.');
    }
};
userController.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create({ username, email, password });
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Une erreur est survenue lors de la création de l\'utilisateur.');
    }
};
userController.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Une erreur est survenue lors de la récupération de l\'utilisateur.');
    }
};
userController.updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        const [rowsUpdated] = await User.update({ username, email, password }, { where: { id } });
        if (rowsUpdated === 0) {
            res.sendStatus(404);
        } else {
            res.json({ message: 'L\'utilisateur a été mis à jour avec succès.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Une erreur est survenue lors de la mise à jour de l\'utilisateur.');
    }
};

userController.deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const rowsDeleted = await User.destroy({ where: { id } });
        if (rowsDeleted === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(204);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Une erreur est survenue lors de la suppression de l\'utilisateur.');
    }
};

userController.findByEmail = async (email) => {
    try {
        return await User.findOne({where: {email}});
    } catch (error) {
        console.error(error);
        return null;
    }
}



module.exports = userController;