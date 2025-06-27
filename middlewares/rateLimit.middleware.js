const ipAttempts = {};

const createAccountLimiter = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const windowMs = 60 * 60 * 1000; // 1 hour
    const maxAttempts = 5;

    if (!ipAttempts[ip]) {
        ipAttempts[ip] = [];
    }

    // Remove timestamps older than windowMs
    ipAttempts[ip] = ipAttempts[ip].filter(timestamp => now - timestamp < windowMs);

    if (ipAttempts[ip].length >= maxAttempts) {
        return res.status(429).json({
            message: "Too many accounts created from this IP, try again later"
        });
    }

    // Log current attempt
    ipAttempts[ip].push(now);
    next();
};

module.exports = { createAccountLimiter };