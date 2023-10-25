import React from 'react';
import { AppProps, AppState, ICard } from '../interfaces/Card.interface';
import styles from '../styles/App.module.css';
import CardSearch from './CardSearch/CardSearch';
import Card from './Card/Card'

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      data: {
        count: 0,
        next: '',
        previous: '',
        results: [],
      },
    };
  }

  componentDidMount(): void {
    fetch('https://swapi.dev/api/people')
      .then((response) => response.json())
      .then((data: ICard) => this.setState({ data }))
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <>
        <div className={styles.app}>
          <div className={styles.container}>
            <CardSearch />
              {this.state.data.results.map((item) => (
                <Card key={item.name} name={item.name}/>
              ))}
          </div>
        </div>
      </>
    );
  }
}

export default App;
