class Meal{
    constructor(name, calories){
      this.id = Math.random().toString(16).slice(2)  //making it hexadecimal and removing 0.before the number
      this.name = name;
      this.calories = calories;
  }
  }
  
  class Workout{
    constructor(name, calories){
      this.id = Math.random().toString(16).slice(2)  //making random id hexadecimal and removing 0.before the number
      this.name = name;
      this.calories = calories;
  }
  }
  export { Meal, Workout}