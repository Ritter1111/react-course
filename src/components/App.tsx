import React from 'react';
import { AppProps, AppState } from '../interfaces/Card.interface';
import styles from '../styles/App.module.css';
import Card from './Card/Card';
import { fetchCards } from '../utils/Api';
import CardFilter from './CardSearch/CardFilter';

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      data: {
        info: {
          count: 0,
          pages: 0,
          next: '',
          prev: '',
        },
        results: [],
      },
      param: '',
    };
  }

  componentDidMount(): void {
    const searchParam = localStorage.getItem('searchParam');
    if (searchParam) {
      this.getCards(searchParam);
    } else {
      this.getCards();
    }
  }

  getCards = (param?: string) => {
    fetchCards(param).then((data) => {
      this.setState({ data });
        if (param) {
          localStorage.setItem('searchParam', param);
        }
    })
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ param: event.target.value });
  };

  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if(this.state.param === '') return
    this.getCards(this.state.param);
    this.setState({param: ''})

  };

  render() {
    return (
        <div className={styles.app}>
          <div className={styles.container}>
            <CardFilter
              handleInput={this.handleInput}
              handleClick={this.handleClick}
              param={this.state.param}
            />
            {this.state.data.results.map((item) => (
              <Card key={item.id} image={item.image} species={item.species} name={item.name} />
            ))}
          </div>
        </div>
    );
  }
}

export default App;
