import React, { Component } from 'react';

class App extends Component{
    
    constructor() {
        super();
        this.state = {
          title: '',
          description: '',
          _id: '',
          tasks: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
    }

    addTask(e) {
        e.preventDefault();
        if(this.state._id) {
          fetch(`/api/tasks/${this.state._id}`, {
            method: 'PUT',
            body: JSON.stringify({
              title: this.state.title,
              description: this.state.description
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              window.M.toast({html: 'Tarea Actualizada'});
              this.setState({_id: '', title: '', description: ''});
              this.fetchTasks();
            });
        } else {
          fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              window.M.toast({html: 'Tarea Guardada'});
              this.setState({title: '', description: ''});
              this.fetchTasks();
            })
            .catch(err => console.error(err));
        }
    }

    deleteTask(id) {
        if(confirm('¿Estás seguro que deseas eliminar esta tarea?')) {
          fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              M.toast({html: 'Tarea Eliminada'});
              this.fetchTasks();
            });
        }
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            this.setState({
              title: data.title,
              description: data.description,
              _id: data._id
            });
          });
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('/api/tasks')
          .then(res => res.json())
          .then(data => {
            this.setState({tasks: data});
            console.log(this.state.tasks);
          });
    }
    
    render() {
        return (
          <div>
            {/* navegacion */}
            <nav className="green darken-4">
              <div className="container">
                <div className="nav-wrapper">
                  <a href="#" className="brand-logo">ToDo App - MERN</a>
                </div>
              </div>
            </nav>
    
            <div className="container">
              <div className="row">
                <div className="col s12">
                  <div className="card">
                    <div className="card-content">
                      <form onSubmit={this.addTask}>
                        <div className="row">
                          <div className="input-field col s12">
                            <input name="title" onChange={this.handleChange} value={this.state.title} type="text" placeholder="Título de la tarea" autoFocus required/>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <textarea name="description" onChange={this.handleChange} value={this.state.description} cols="30" rows="10" placeholder="Descripción de la tarea" className="materialize-textarea" required></textarea>
                          </div>
                        </div>
    
                        <button type="submit" className="btn light-green darken-3 ">
                          Enviar <i class="material-icons right">send</i>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col s12">
                  <table className='highlight striped'>
                    <thead>
                      <tr>
                        <th>Título</th>
                        <th>Descripción</th>
                      </tr>
                    </thead>
                    <tbody>
                      { 
                        this.state.tasks.map(task => {
                          return (
                            <tr key={task._id}>
                              <td>{task.title}</td>
                              <td>{task.description}</td>
                              <td>
                                <button onClick={() => this.deleteTask(task._id)} className="btn red lighten-1">
                                  <i className="material-icons">delete</i> 
                                </button>
                                <button onClick={() => this.editTask(task._id)} className="btn teal accent-1" style={{margin: '4px'}}>
                                  <i className="material-icons">edit</i>
                                </button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
    
          </div>
        )
      }
    }
    
    export default App;