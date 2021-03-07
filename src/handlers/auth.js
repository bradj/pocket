/**
 * Performs login
 * @param {import("koa").Context} ctx 
 * @param {Function} next 
 */
const login = async (ctx, next) => {
    ctx.body = 'Login';
};

/**
 * Performs logout
 * @param {import("koa").Context} ctx
 * @param {Function} next
 */
const logout = async (ctx, next) => {
    ctx.body = 'Logout';
};

module.exports = {
    login,
    logout
}
