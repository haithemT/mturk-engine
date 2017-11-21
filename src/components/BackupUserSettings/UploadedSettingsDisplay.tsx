import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Card, FormLayout } from '@shopify/polaris';
import { RootState, PersistedState, PersistedStateKeys } from '../../types';
import { writePersistedState, WritePersistedState } from '../../actions/backup';
import {
  validatePersistedStateKey,
  selectReduxPersistStateKey
} from '../../utils/validation';
import { stateKeyMap } from '../../utils/backup';
import StateKeyCheckbox from './StateKeyCheckbox';

export interface Props {
  readonly uploadedState: Partial<PersistedState> | null;
}

export interface Handlers {
  readonly saveFromBackup: (payload: Partial<PersistedState>) => void;
}

export interface State {
  readonly checkedStateKeys: Map<PersistedStateKeys, boolean>;
}

class UploadedSettingsDisplay extends React.Component<Props & Handlers, never> {
  private displayKeys = (uploadedState: Partial<PersistedState>) => {
    const stateKeys = Object.keys(uploadedState)
      .filter(validatePersistedStateKey)
      .map(selectReduxPersistStateKey);

    return stateKeys.length > 0 ? (
      stateKeys.map((stateKey: PersistedStateKeys) => (
        <StateKeyCheckbox
          key={stateKey}
          label={stateKeyMap.get(stateKey) || 'Invalid Key'}
          checked
        />
      ))
    ) : (
      <p>The uploaded file contains no valid data.</p>
    );
  };

  public render() {
    return this.props.uploadedState ? (
      <Card.Section>
        <FormLayout>{this.displayKeys(this.props.uploadedState)}</FormLayout>
      </Card.Section>
    ) : null;
  }
}

const mapState = (state: RootState): Props => ({
  uploadedState: state.uploadedState
});

const mapDispatch = (dispatch: Dispatch<WritePersistedState>): Handlers => ({
  saveFromBackup: (payload: Partial<PersistedState>) =>
    dispatch(writePersistedState(payload))
});

export default connect(mapState, mapDispatch)(UploadedSettingsDisplay);