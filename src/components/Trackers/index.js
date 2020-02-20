import React from 'react';
import { Grid, Header, List } from 'semantic-ui-react';
import TrackerForm from '../TrackerForm';
import TrackerCard from '../TrackerCard';
import { connect } from 'react-redux';
import { getTrackers, setTrackers } from '../../thunks/trackers';
import styles from './styles';

const Trackers = (props) => {
  const { trackersData, getTrackers, setTrackers } = props;
  
  React.useEffect(() => {
    getTrackers();
  },[getTrackers])

  const addTracker = ({name}) => {
    let trackerId = trackersData.length + 1;
    let trackerName = name ? name : `No name tracker #${trackerId}`;
    let trackerDate = new Date().toISOString();
    let tracker = { 
          id: trackerId, 
          name: trackerName,
          date: trackerDate,
          isStopped: false  
        };
        
    setTrackers([ ...trackersData, { ...tracker } ]);
  }

  const deleteTracker = (trackerId) => {
    let changedTrackersData = trackersData
      .filter(tracker => {
        return tracker.id !== trackerId  
      })

    setTrackers(changedTrackersData); 
  }

  const handleIsStopped = (trackerId) => {
    let changedTrackersData = trackersData
      .map(tracker => {
        return tracker.id === trackerId 
          ? {...tracker, isStopped: !tracker.isStopped} 
          : tracker
      })

    setTrackers(changedTrackersData);
  }

  const trackersElements = trackersData
    .map(tracker => <TrackerCard 
                      key={tracker.id} 
                      tracker={tracker} 
                      handleIsStopped={handleIsStopped}
                      deleteTracker={deleteTracker}/>)

  return (
    <Grid centered>
      <Grid.Column computer={6} mobile={16}>
        <Grid.Row>
          <Header 
            size='huge' 
            textAlign='center'
            style={styles.logo}
          >
            tracker
          </Header>
        </Grid.Row>
        <TrackerForm onSubmit={addTracker}/>
        <Grid.Row 
          as={List} 
          style={styles.trackersList}
          divided
          >
            {trackersElements}
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}

const mapStateToProps = state => ({
  trackersData: state.trackers.trackersData,
})

const mapDispatchToProps = {
  getTrackers,
  setTrackers,
}

export default connect(mapStateToProps, mapDispatchToProps)(Trackers);
