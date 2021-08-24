module.exports = (req, res, next) => {
    const {email, password, emailRegister, name, passwordRegister } = req.body;

    const validEmail = (userEmail) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    };
 
    if (req.path === '/register') {
        if (![emailRegister, name, passwordRegister].every(Boolean)) {
            return res.status(401).json('Missing Credentials');
        } else if (!validEmail(emailRegister)) {
            return res.status(401).json('Invalid Email');
        }
    } else if (req.path === '/') {
        if (![email, password].every(Boolean)) {
           return res.status(401).json('Missing Credentials'); 
        } else if (!validEmail(email)) {
            return res.status(401).json('Invalid Email');
        }
    }
    next();
};