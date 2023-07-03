class Storage{
    static getCalorieLimit(defaultLimit = 2000){
      let calorieLimit;
      if(localStorage.getItem('calorieLimit') === null){
        calorieLimit = defaultLimit;
      }else{
        calorieLimit = +localStorage.getItem('calorieLimit') //we want a number by adding '+'
      }
      return calorieLimit;
    }
    static setCalorieLimit(calorieLimit){
      localStorage.setItem('calorieLimit', calorieLimit);   //key, value 
    }
    static getTotalCalories(defaultCalories=0){
      let totalCalories;
      if(localStorage.getItem('totalCalories') === null){
        totalCalories = defaultCalories;
      }else{
        totalCalories = +localStorage.getItem('totalCalories') //we want a number by adding '+'
      }
      return totalCalories;
    }
  
    static updateTotalCalories(calories){
      localStorage.setItem('totalCalories', calories);
    }
  
    static getMeals(){
      let meals;
      if(localStorage.getItem('meals') === null){
        meals = [];
      }else{
        meals = JSON.parse(localStorage.getItem('meals')); //we want to return it in a strinigfy array
      }
      return meals;
    }
  
    static saveMeal(meal){
      const meals = Storage.getMeals();
      meals.push(meal);
      localStorage.setItem('meals', JSON.stringify(meals));
    }
  
    static removeMeal(id){
      const meals = Storage.getMeals();
      meals.forEach((meal, index)=>{
        if (meal.id === id){
          meals.splice(index, 1)
        }
      });
  
      localStorage.setItems('meals', JSON.stringify(meals));
    }
  
    static getWorkouts(){
      let workouts;
      if(localStorage.getItem('workouts') === null){
        workouts = [];
      }else{
        workouts = JSON.parse(localStorage.getItem('workouts')); //we want to return it in a strinigfy array
      }
      return workouts;
    }
  
    static saveWorkout(workout){
      const workouts = Storage.getWorkouts();
      workouts.push(workout);
      localStorage.setItem('workouts', JSON.stringify(workouts));
    }
  
    static removeWorkout(id){
      const workouts = Storage.getWorkouts();
      workouts.forEach((workout, index)=>{
        if (workout.id === id){
          workouts.splice(index, 1) //splice at the index and remove 1
        }
      });
  
      localStorage.setItems('workouts', JSON.stringify(workouts));
    }
  
    static clearAll(){
      localStorage.removeItem('totalCalories');
      localStorage.removeItem('meals');
      localStorage.removeItem('workouts');
  
      //we want to keep calorieLimit, otherwise we would just remove all storage:
      //localStorage.clear();
    }
  }
  
  export default Storage;