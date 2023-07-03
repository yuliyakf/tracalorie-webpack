import '@fortawesome/fontawesome-free/js/all';
import {Modal, Collapse} from 'bootstrap';  //from node_modules
import CalorieTracker from './Tracker';
import { Meal, Workout } from './Item';
import './css/bootstrap.css';
import './css/style.css';


  //Initialize class
  class App {
    constructor(){
      this._tracker = new CalorieTracker();
      this._loadEventListeners();  
      this._tracker.loadItems();
    }
    
    _loadEventListeners(){
      document.getElementById('meal-form').addEventListener('submit', this._newItem.bind(this, 'meal')) //'this' is on event listener so we have to use bind to refer it to App class instead. We need to distinguish newItem by meal or workout, so we are passing the 'typeof' as argument with 'this'
      document.getElementById('workout-form').addEventListener('submit', this._newItem.bind(this, 'workout'))
  
      document.getElementById('meal-items').addEventListener('click', this._removeItems.bind(this, 'meal'))
      document.getElementById('workout-items').addEventListener('click', this._removeItems.bind(this, 'workout'));
      document.getElementById('filter-meals').addEventListener('keyup', this._filterItems.bind(this, 'meal'));
      document.getElementById('filter-workouts').addEventListener('keyup', this._filterItems.bind(this, 'workout'));
      document.getElementById('reset').addEventListener('click', this._reset.bind(this));
      document.getElementById('limit-form').addEventListener('submit', this._setLimit.bind(this));
    }
    _newItem(type, e){
      e.preventDefault();
      const name= document.getElementById(`${type}-name`);  //type as in meal or workout
      const calories = document.getElementById(`${type}-calories`);
  
      //validate inputs
      if(name.value === '' || calories.value === ''){
        alert('Please fill in all fields'); 
        return;
      }
  
      if (type === 'meal'){
        const meal = new Meal(name.value, parseInt(calories.value));
        this._tracker.addMeal(meal);
      } else {
        const workout = new Workout(name.value, parseInt(calories.value));
      this._tracker.addWorkout(workout);
      }
  
      name.value = '';
      calories.value = '';
  
      //collapse meal field
      const collapseItem = document.getElementById(`collapse-${type}`);
      const bsCollapse = new Collapse(collapseItem, {toggle: true});
    }
  
    _removeItems(type, e){
      if (e.target.classList.contains ('delete') || e.target.classList.contains('fa-xmark')){
        if (confirm('Are you sure?')){
          const id = e.target.closest('.card').getAttribute('data-id')
          
          type === 'meal' ? this._tracker.removeMeal(id) : this._tracker.removeWorkout(id)
  
         e.target.closest('.card').remove();
        }
      }
    }
  
    _filterItems(type, e){
      const text = e.target.value.toLowerCase();
      document.querySelectorAll(`#${type}-items .card`).forEach(item => {
        const name = item.firstElementChild.firstElementChild.textContent;
  
        if (name.toLowerCase().indexOf(text) !== -1){   //-1 means not a match
          item.style.display = 'block';
        } else{
          item.style.display ='none';
        }
      })
    }
  
    _reset(){
      this._tracker.reset();
      document.getElementById('meal-items').innerHTML = '';
      document.getElementById('workout-items').innerHTML = '';
      document.getElementById('filter-meals').value = '';
      document.getElementById('filter-workouts').value = '';
    }
  
    _setLimit(e){
      e.preventDefault();
      const limit = document.getElementById('limit');
  
      if (limit.value === '') {
        alert('please add limit');
        return
  }
  this._tracker.setLimit(+limit.value); //we want it not as a string but as a number. Can use either  parseInit or '+'
  limit.value ='';
  
  const modalEl = document.getElementById('limit-modal');
  const modal = Modal.getInstance(modalEl);
  modal.hide();
  }
  }
  
  const app = new App();
  