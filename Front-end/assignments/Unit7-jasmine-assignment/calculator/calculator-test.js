
it('should calculate the monthly rate correctly', function () {
  const values = {amount: 10000, years: 5, rate: 5};
  expect (calculateMonthlyPayment(values)).toBe('188.71');
});


it("should return a result with 2 decimal places", function() {
  const values = {amount: 10000, years: 5, rate: 5};
  const testNumber = (Number.parseFloat(calculateMonthlyPayment(values))) * 100;
  const referenceNumber = Math.floor((Number.parseFloat(calculateMonthlyPayment(values))) * 100);
  expect(referenceNumber).toEqual(testNumber);
});