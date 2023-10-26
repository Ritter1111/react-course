import React from 'react';
import { AppProps, AppState } from '../interfaces/Card.interface';
import Card from './Card/Card';
import CardFilter from './CardSearch/CardFilter';
import NotFound from './NotFound/NotFound';
import { fetchCards } from '../utils/api';
import { getSearchParam, setSearchParam } from '../utils/localStorage';
import styles from '../styles/App.module.css';

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      data: {
        results: [],
      },
      value: '',
    };
  }

  componentDidMount(): void {
    if (getSearchParam('searchValue')) {
      this.getCards(getSearchParam('searchValue'));
      this.setState({ value: `${getSearchParam('searchValue')}` });
    } else {
      this.getCards();
    }
  }

  getCards = async (value?: string) => {
    const cardsData = await fetchCards(value);
    this.setState({ data: cardsData });
    if (value) {
      setSearchParam('searchValue', value);
    }
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  handleClick = () => {
    if (this.state.value === '') return;
    this.getCards(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.container}>
          <CardFilter
            handleInput={this.handleInput}
            handleClick={this.handleClick}
            param={this.state.value}
          />
          {!this.state.data.results ? (
            <NotFound />
          ) : (
            this.state.data.results.map((item) => (
              <Card
                key={item.id}
                image={item.image}
                species={item.species}
                name={item.name}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default App;
