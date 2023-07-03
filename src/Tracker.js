import Storage from "./Storage";


class CalorieTracker {
    constructor(){  
      this._calorieLimit = Storage.getCalorieLimit();
      this._totalCalories = Storage.getTotalCalories(0); //defaule
      this._meals = Storage.getMeals();
      this._workouts =Storage.getWorkouts();
  
      this._displayCaloriesLimit();
      this._displayCaloriesTotal();//calling it here since constructor runs immediately- show cal at 0
      this._displayCaloriesConsumed();
      this._displayCaloriesBurned();
      this._displayCarloriesRemaining();
      this._displayCaloriesProgress();
  
      document.getElementById('limit').value = this._calorieLimit;
    }
    //Public Methods or API
    addMeal(meal){
      this._meals.push(meal);
      this._totalCalories += meal.calories;
      Storage.updateTotalCalories(this._totalCalories);
      Storage.saveMeal(meal);
      this._displayNewMeal(meal);
      this._render(); //calling render method with changes to total calories
    }
    addWorkout(workout){
      this._workouts.push(workout);
      this._totalCalories -= workout.calories;
      Storage.updateTotalCalories(this._totalCalories);
      Storage.saveWorkout(workout)
      this._displayNewWorkout(workout);
      this._render();  //calling render method with changes to total calories
    }
    
  removeMeal(id){
      const index = this._meals.findIndex((meal) => meal.id === id);
  
      if (index !== -1) {   //-1 means not a match
        const meal = this._meals[index];
        this._totalCalories -= meal.calories;
        Storage.updateTotalCalories(this._totalCalories);
        this._meals.splice(index, 1); 
        Storage.removeMeal(id);
        this._render();
      }
    }
  
    removeWorkout(id){
      const index = this._workouts.findIndex((workout) => workout.id === id);
  
      if (index !== -1) {    //-1 means not a match
        const workout = this._workouts[index];
        this._totalCalories += workout.calories;
        Storage.updateTotalCalories(this._totalCalories);
        this._workouts.splice(index, 1); 
        Storage.removeWorkout(id);
        this._render();
      }
    }
  
    reset(){
      this._totalCalories = 0;
      this._meals = [];
      this.workouts = [];
      Storage.clearAll();
      this._render();
    }
  
    setLimit(calorieLimit){
      this._calorieLimit = calorieLimit;
      Storage.setCalorieLimit(calorieLimit);
      this._displayCaloriesLimit();
      this._render();
    }
  
    loadItems(){
      this._meals.forEach(meal => this._displayNewMeal(meal));
      this._workouts.forEach(workout => this._displayNewWorkout(workout));
    }
  
    //private methods
    _displayCaloriesTotal(){
      const totalCaloriesEL = document.getElementById('calories-total');
      totalCaloriesEL.innerHTML = this._totalCalories;
  }
  _displayCaloriesLimit(){
    const caloriesLimitEL = document.getElementById('calories-limit');
    caloriesLimitEL.innerHTML = this._calorieLimit;
  }
  _displayCaloriesConsumed(){
    const caloriesConsumedEL = document.getElementById('calories-consumed');
  
    const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0);
    caloriesConsumedEL.innerHTML= consumed;
  }
  _displayCaloriesBurned(){
    const caloriesBurnedEL = document.getElementById('calories-burned');
  
    const burned = this._workouts.reduce((total, workout) => total + workout.calories, 0);
    caloriesBurnedEL.innerHTML= burned;
  }
  _displayCarloriesRemaining(){
    const progressEl = document.getElementById('calorie-progress');
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const remaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEl.innerHTML = remaining;
  
    //changing color of remaining box and progress bar to red if over limit
    if (remaining <= 0){
      caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
      progressEl.classList.remove('bg-success');
      progressEl.classList.add('bg-danger');
    } else{
      caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
      progressEl.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
    }
  }
  //tracker bar
  _displayCaloriesProgress(){
    const progressEl = document.getElementById('calorie-progress');
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100) //whichever is the lowest
    progressEl.style.width = `${width}%`;
  }
  
  _displayNewMeal(meal){
    const mealsEl = document.getElementById('meal-items');
    const mealEl = document.createElement('div');
    mealEl.classList.add('card', 'my-2');
    mealEl.setAttribute('data-id', meal.id);
    mealEl.innerHTML = `
    <div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
      <h4 class="mx-1">${meal.name}</h4>
      <div
        class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
      >
       ${meal.calories}
      </div>
      <button class="delete btn btn-danger btn-sm mx-2">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>
    `
    mealsEl.appendChild(mealEl);
  }
  
  _displayNewWorkout(workout){
    const workoutsEl = document.getElementById('workout-items');
    const workoutEl = document.createElement('div');
    workoutEl.classList.add('card', 'my-2');
    workoutEl.setAttribute('data-id', workout.id);
    workoutEl.innerHTML = `
    <div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
      <h4 class="mx-1">${workout.name}</h4>
      <div
        class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
      >
       ${workout.calories}
      </div>
      <button class="delete btn btn-danger btn-sm mx-2">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>
    `
    workoutsEl.appendChild(workoutEl);
  }
  
  _render(){      //now we have to render calories since we changed it wiht addMeal and addWorkout
    this._displayCaloriesTotal(); 
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCarloriesRemaining();
    this._displayCaloriesProgress();
  }
  };
  export default CalorieTracker;