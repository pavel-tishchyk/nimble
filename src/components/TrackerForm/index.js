import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Grid, Icon } from 'semantic-ui-react';
import { Input } from 'react-semantic-redux-form';
import styles from './styles';

const TrackerForm = (props) => {
  const { handleSubmit, reset } = props;

  const onSubmit = (e) => {
    handleSubmit();
    reset();
    e.preventDefault();
  }

  return (
    <Grid.Row as='form' onSubmit={onSubmit}>
      <Field
        name='name'
        component={Input}
        fluid 
        size='large'
        placeholder='Enter tracker name...' 
        style={styles.wrapper}
        icon
      >
        <input style={styles.input}/>
        <Icon 
            link
            name='play circle'
            size='big' 
            color='green'
            onClick={onSubmit} 
        />
      </Field>
    </Grid.Row>
  );
}

export default reduxForm({form: 'tracker'})(TrackerForm);
