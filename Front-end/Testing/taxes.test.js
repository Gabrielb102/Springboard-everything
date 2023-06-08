it ("calculates low bracket", function() {
    expect(calculateTaxes(10000)).toEqual(1500);
    expect(calculateTaxes(20000)).toEqual(3000);
    })

it ("calculates high bracket", function() {
    expect(calculateTaxes(40000)).toEqual(10000);
    expect(calculateTaxes(60000)).toEqual(15000);
})
