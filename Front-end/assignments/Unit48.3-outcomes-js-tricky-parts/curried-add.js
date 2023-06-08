function curriedAdd(newNumber) {
    let total = 0;
    if (!newNumber) return total;
    if (newNumber) {
        total += newNumber;
        function currFunc(newNumber) {
            if (!newNumber) return total;
            if (newNumber) {
                total += newNumber;
            }
            return currFunc;
        }  
        return currFunc;
    }
}


module.exports = { curriedAdd };
