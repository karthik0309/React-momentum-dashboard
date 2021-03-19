import React from 'react'
import Todo from './Todo/js/Todo'

const App = () => {
  //clears local storage every day
  (function () {
    var lastclear = localStorage.getItem('lastclear'),
        time_now  = (new Date()).getTime();
    if ((time_now - lastclear) > 1000 * 60 * 60 * 24) {
      localStorage.clear();
      localStorage.setItem('lastclear', time_now);
    }
  })();
  return (
      <Todo/>
  )
}

export default App