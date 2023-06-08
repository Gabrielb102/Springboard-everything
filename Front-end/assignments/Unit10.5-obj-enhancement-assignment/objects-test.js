describe ("reworks ES5 into ES2015 with advanced object methods", () => {
    it ("produces same results when creating an object", () => {
        const firstName = "Master";
        const lastName = "Yoda";
        const instructorObj = createInstructor(firstName, lastName);
        expect(createObject(firstName,lastName)).toEqual(instructorObj);
    })

    it ("can compute properties while defining the object", () => {
        expect(newInstructor).toEqual(instructor);
    })
    it ("can put function into object with object methods", () => {
        expect(newInstrMethod.sayHi()).toEqual(instrFunction.sayHi());
        expect(newInstrMethod.sayBye()).toEqual(instrFunction.sayBye());
    })
})

describe ("createAnimal tests", () => {
    const species = "shark";
    const verb = "skulk";
    const noise = "death";
    const s = createAnimal(species, verb, noise);
    it("creates a function which can be called for the animal sound", () => {
        expect(s.skulk()).toEqual("death");
    })
})