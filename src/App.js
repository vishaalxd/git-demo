import React, {Component} from 'react';
import './App.css';
import repo from './repo.ico';
import corp from './corp.ico';
import mail from './mail-5.svg';
import location from './location.svg';

class App extends Component {
  constructor (props) {
    super (props);

    this.state = {
      user: {
        name: '',
        company: '',
        avatar_url: '',
        location: '',
        login: '',
        email: '',
      },
      search: [],
      repos: [],
    };
  }
  componentDidMount () {
    fetch ('https://api.github.com/users/supreetsingh247')
      .then (response => response.json ())
      .then (data => this.setState ({user: data}));

    this.getrepos ();
  }

  getrepos = () => {
    fetch ('https://api.github.com/users/supreetsingh247/repos')
      .then (response => response.json ())
      .then (data => {
        this.setState ({repos: data});
        console.log (this.state.repos);
      });
  };

  onchange = e => {
    this.setState ({search: e.target.value});
    if (
      (e.target.value =
        null && this.state.repoName.indexOf (e.target.value) === -1)
    ) {
      return null;
    }
    var a = this.state.repos.name.indexOf (e.target.value);
    this.setState.search ({search: a});
    // else return (a = this.state.repoName.indexOf (e.target.value));
  };

  render () {
    return (
      <div className="App">
        <div className="leftSection left">
          <div>
            <img className="pics" src={this.state.user.avatar_url} />
          </div>
          <h1 className="name">{this.state.user.name}</h1>
          <p className="idname">{this.state.user.login}</p>
          <div>
            <button className="addBio">Add a bio</button>
            <div className="email">
              <img
                className="logo"
                style={{width: 20, height: 20}}
                src={corp}
              />
              {' '}
              <p className="corp">
                {this.state.user.company}
              </p><br />
              <img
                className="logo"
                style={{width: 20, height: 20}}
                src={location}
              />
              {' '}
              <p className="location">{this.state.user.location}</p><br />
              <img
                className="logo"
                style={{width: 20, height: 15, marginTop: 0}}
                src={mail}
              />
              <a href="#" style={{transform: 'translate(2px,-5px)'}}>

                abc@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="rightSection left">
          <div className="navAlign">
            <ul>
              <li><a href="#">Overview</a></li>
              <li>
                <a className="repository" href="#">
                  Repositories<span className="badge">11</span>
                </a>
              </li>
              <li><a href="#">Stars<span className="badge">15</span></a></li>
              <li>
                <a href="#">Followers<span className="badge">12</span></a>
              </li>
              <li>
                <a href="#">Following<span className="badge">12</span></a>
              </li>
            </ul>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Find a repository..."
                onChange={this.onchange}
              />
              <div className="dropdown">
                <button className="buttonType">Type:<b>All</b></button>
                <div className="dropdown-content">
                  <p>Javascript</p>
                </div>
              </div>
              <div className="dropdown">
                <button className="buttonType">Language:<b>All</b></button>
                <div className="dropdown-content">
                  <p>Javascript</p>
                </div>
              </div>
              <button className="buttonNew">
                New

              </button>
            </div>
            <div>
              {this.state.repos.map (p => {
                return (
                  <div key={p.name} className="project-box">
                    {' '}<h2>{p.name}</h2>
                    <label style={{display: 'block', marginBottom: 10}}>
                      {p.description}
                    </label>
                    <label>{p.language}</label>
                    <label style={{marginLeft: 50}}>{p.updated_at}</label>
                  </div>
                );
              })}

            </div>

          </div>

        </div>
        <div className="clear" />
      </div>
    );
  }
}

export default App;
