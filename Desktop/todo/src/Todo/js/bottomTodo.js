import React, { PureComponent } from 'react'
import classes from "../css/bottomTodo.module.css"
let temp=[]
class BottomTodo extends PureComponent {
    state = {
        addTodoBtn: false,
        todoList: [],
        checkedList:[],
    }
    componentDidMount(){
        if(localStorage.getItem("todos")===null && localStorage.getItem("todos")!==[]){
            localStorage.setItem("todos",[])
        }
        else{
            this.setState({todoList :JSON.parse(localStorage.getItem("todos"))})
        }
        if(localStorage.getItem("checkTodos")===null && localStorage.getItem("todos")!==[]){
            localStorage.setItem("checkTodos",[])
        }
        else{
            this.setState({checkedList : JSON.parse(localStorage.getItem("checkTodos"))})
        }
    }
    addTodoBtnHandler = () => {
        this.setState((prevState) => ({
            addTodoBtn: !prevState.addTodoBtn
        }))
    }
    keyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            temp = [...this.state.todoList]
            temp.push(e.target.value)
            this.setState({ todoList: temp })
            e.target.value = ''
        }
        localStorage.setItem("todos",JSON.stringify(temp))
    }
    strikeTodo = (index, e) => {
        let tempe = [...this.state.checkedList]
        let strikedTemp = e.target.checked 
        tempe[index] = strikedTemp
        this.setState({ checkedList: tempe })
        localStorage.setItem("checkTodos",JSON.stringify(tempe))
    }
    render() {
        let disp = null
        if (this.props.modal) {
            disp = <div className={classes.modal}>
                <p>TODO's</p>
                <button onClick={this.addTodoBtnHandler}>Add Todo</button>
                <div className={classes.todos}>
                    {this.state.todoList.length >= 1 ? this.state.todoList.map((ele, index) => {
                        return (<div className={classes.todoItem} key={index+12}>
                            <input type="checkbox" onChange={(e) => { this.strikeTodo(index, e) }} checked={this.state.checkedList[index]} />
                            <p key={index} style={this.state.checkedList[index]?{textDecoration:'line-through',opacity:0.7}:{textDecoration:'none'}}>{ele}</p></div>)
                    }) : null}
                </div>
                {this.state.addTodoBtn ? <input className={classes.input}
                    type="text"
                    placeholder="add todo"
                    onKeyDown={this.keyDown} /> : null}
            </div>
        }
        const ExpiryTime=1000*60*60*24
        setTimeout(()=>{
            localStorage.setItem("todos",[])
            localStorage.setItem("checkTodos",[])
        },ExpiryTime)
        return (
            <div className={classes.bottomTodo} title="TodoList">
                {disp}
                <p onClick={this.props.clicked} className={classes.todo}>Todo</p>
            </div>
        )
    }



}

export default BottomTodo