//Same keys and values

function createInstructor(firstName, lastName){
    return {
      firstName: firstName,
      lastName: lastName
    }
  }

var createObject = (firstName, lastName) => ({
    firstName,
    lastName,
})

//Computed Property Names

var favoriteNumber = 42;

var instructor = {
  firstName: "Colt"
}

instructor[favoriteNumber] = "That is my favorite!"

var newInstructor = {
    firstName: "Colt",
    [favoriteNumber]: "That is my favorite!"
}

//Object Methods

var instrFunction = {
    firstName: "Colt",
    sayHi: function(){
      return "Hi!";
    },
    sayBye: function(){
      return this.firstName + " says bye!";
    }
  }

var newInstrMethod = {
    firstName: "Colt",
    sayHi() {return "Hi!"},
    sayBye() {return this.firstName + " says bye!"},
}

const createAnimal = (species, verb, noise) => {
    const animalObj = {species,}
    animalObj[verb] = function() {
        return noise;
    }
    return animalObj;
}