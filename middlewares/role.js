'use strict';

const role = (capability) => {
    return (req, res, next) => {
        try {
        if (req.user.capabilities.includes(capability)) {
            next();
        } else {
            next('Access Denied');
        }
        } catch (e) {
        next('Invalid Login');
        }
    };
    }

module.exports = role;