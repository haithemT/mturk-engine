import * as React from 'react';
import { Card, ResourceList } from '@shopify/polaris';
import BlockedHitCard from '../../containers/BlockedHitCard';
import EmptyBlockList from './EmptyBlockList';

export interface Props {
  readonly blockedHitIds: string[];
}

class BlockList extends React.PureComponent<Props, never> {
  public render() {
    return this.props.blockedHitIds.length === 0 ? (
      <EmptyBlockList />
    ) : (
      <Card>
        <ResourceList
          items={this.props.blockedHitIds}
          renderItem={(id: string) => (
            <BlockedHitCard key={id} blockedHitId={id} />
          )}
        />
      </Card>
    );
  }
}

export default BlockList;
