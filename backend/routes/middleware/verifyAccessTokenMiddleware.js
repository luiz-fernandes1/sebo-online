const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        if(!req.headers['authorization']) {
            return res.status(400).json({msg: 'Access token não informado...'});
        }

        const token = req.headers['authorization'].split(' ');

        if(token[0] != 'Bearer') {
            return res.status(400).json({msg: "Access token informado mas em formato inválido..."})
        }

        const user = await jwt.verify(token[1], 'TOP_SECRET');
        req.body.user = await User.findOne({username: user.username});

        next();
    } catch(error) {
        return res.status(400).json({msg: 'Não foi possível validar o token...'});
    }
}