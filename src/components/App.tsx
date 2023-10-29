import React from 'react';
import { IAppProps, IAppState } from '../interfaces/Card.interface';
import { fetchCards } from '../utils/api';
import { getSearchParam, setSearchParam } from '../utils/localStorage';
import NotFound from './NotFound/NotFound';
import Loader from './Loader/Loader';
import CardSearch from './CardSearch/CardSearch';
import CardList from './CardList/CardList';
import styles from '../styles/App.module.css';

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      data: {
        results: [],
      },
      value: '',
      hasError: false,
      loading: false,
    };
  }

  componentDidMount(): void {
    this.setState({ loading: true });
    setTimeout(() => {
      if (getSearchParam('searchValue')) {
        this.getCards(getSearchParam('searchValue'));
        this.setState({ value: `${getSearchParam('searchValue')}` });
      } else {
        this.getCards();
      }
      this.setState({ loading: false });
    }, 1500);
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

  throwError = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Error on click');
    }
    return (
      <div className={styles.app}>
        <div className={styles.container}>
          <CardSearch
            handleInput={this.handleInput}
            handleClick={this.handleClick}
            throwError={this.throwError}
            value={this.state.value}
          />
          {this.state.loading ? (
            <Loader />
          ) : !this.state.data.results ? (
            <NotFound />
          ) : (
            <CardList results={this.state.data.results} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
