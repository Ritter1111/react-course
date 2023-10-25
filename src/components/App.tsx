import React from 'react';
import { AppProps, AppState } from '../interfaces/Card.interface';
import Card from './Card/Card';
import { fetchCards } from '../utils/Api';
import CardFilter from './CardSearch/CardFilter';
import styles from '../styles/App.module.css';

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      data: {
        results: [],
      },
      param: '',
    };
  }

  componentDidMount(): void {
    if (this.getSearchParam()) {
      this.getCards(this.getSearchParam());
    } else {
      this.getCards();
    }
  }

  getSearchParam = () => {
    const searchParam = localStorage.getItem('searchParam') || '';
    return searchParam;
  };

  setSearchParam = (param: string) => {
    localStorage.setItem('searchParam', param);
  };

  getCards = async (param?: string) => {
    const cardsData = await fetchCards(param);
    this.setState({ data: cardsData });
    if (param) {
      this.setSearchParam(param);
    }
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ param: event.target.value });
  };

  handleClick = () => {
    if (this.state.param === '') return;
    this.getCards(this.state.param);
    this.setState({ param: '' });
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
            <Card
              key={item.id}
              image={item.image}
              species={item.species}
              name={item.name}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;