const SET_PAGE = 1;

module.exports = {
    setPage(page) {
        if(!page) throw new Error('cannot dispatch setPage without page');
        return { type : "SET_PAGE", page }
    }
}