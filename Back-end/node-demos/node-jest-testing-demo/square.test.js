const {square} = require('./square')


describe('tests the square function', function() {
    test('should accurately square numbers', function() {
        const res = square(3)
        expect(res).toEqual(9)
    })
    
    test('should accurately square negative numbers', function() {
        const res = square(-3)
        expect(res).toEqual(9)
    })
})
