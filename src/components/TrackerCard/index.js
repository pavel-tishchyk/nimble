import React from 'react';
import { List, Header, Icon } from 'semantic-ui-react';
import styles from './styles';

const getTimeInterval = (date) => {
  let diff = (new Date() - new Date(date)) / 1000;

  let hours = Math.trunc(diff / 3600); 
  let minutes = Math.trunc((diff % 3600) / 60);
  let seconds = Math.trunc((diff % 3600) % 60); 

  hours = hours < 10 ? '0' + hours : hours; 
  minutes = minutes < 10 ? '0' + minutes : minutes; 
  seconds = seconds < 10 ? '0' + seconds : seconds; 

  return `${hours}:${minutes}:${seconds}`;
}

const TrackerCard = (props) => {
  const { tracker: { id, name, date, time }, stopTracker, deleteTracker } = props;

  const isStopped = time !== null;
  const [timerId, setTimerId] = React.useState(null);
  const [timeInterval , setTimeInterval] = React.useState(isStopped ? time : getTimeInterval(date));
  
  const handleDelete = () => {
    if(timerId) {
      stopTimer();
    }
    deleteTracker(id);
  }

  const startTimer = React.useCallback(() => {
    if(isStopped) {
      stopTracker(id, null);
    }
    let timerId = setInterval(() => setTimeInterval(getTimeInterval(date)), 1000);
    setTimerId(timerId);
  }, [isStopped, stopTracker, id, setTimerId, date]);

  const stopTimer = React.useCallback(() => {
    stopTracker(id, timeInterval);
    clearInterval(timerId);
    setTimerId(null);
  }, [stopTracker, id, timeInterval, timerId, setTimerId]);

  React.useEffect(() => {
    if(!isStopped && timerId === null) {
      startTimer();
    }
  }, [isStopped, timerId, startTimer]);

  return (
    <List.Item 
      style={isStopped
        ? styles.card
        : styles.cardActive}>
      <List.Content 
        verticalAlign='bottom'
        style={styles.cardName}>
        <Header 
          size='small'
          color={isStopped ? 'black' : 'green'}
        >
          {name}
        </Header>
      </List.Content>
      <List.Content 
        verticalAlign='middle'
        style={styles.cardTimer}>
        <Header 
          size='small'
          color={isStopped ? 'black' : 'green'}
        >
          {timeInterval}
        </Header>
      </List.Content>
      <List.Content 
        style={styles.cardActions}
      >
        <Icon 
          name={
            isStopped ? 'play circle outline' : 'pause circle outline'
          }
          size='big' 
          color='black'
          onClick={
            isStopped ? startTimer : stopTimer
          }
        />
        <Icon 
          name='times circle outline' 
          size='big' 
          color='red'
          onClick={handleDelete}
        />
      </List.Content>
    </List.Item>
  );
}

export default TrackerCard;
