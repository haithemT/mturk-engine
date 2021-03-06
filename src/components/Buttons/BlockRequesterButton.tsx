import * as React from 'react';
import { Requester, BlockedRequester } from '../../types';
import { Button } from '@shopify/polaris';
import { Tooltip, Position } from '@blueprintjs/core';
import { createBlockedRequester } from '../../utils/blocklist';
import { connect } from 'react-redux';
import { blockSingleRequester } from '../../actions/blockRequester';
import { showPlainToast } from 'utils/toaster';

interface OwnProps {
  readonly requester: Requester;
  readonly withToast?: boolean;
  readonly withTooltip?: boolean;
}

interface Handlers {
  readonly onBlockRequester: (requester: BlockedRequester) => void;
}

interface State {
  readonly hovering: boolean;
}

class BlockRequesterButton extends React.PureComponent<
  OwnProps & Handlers,
  State
> {
  public readonly state: State = {
    hovering: false
  };

  private handleBlockRequester = () => {
    const { requester, withToast = false } = this.props;

    this.props.onBlockRequester(createBlockedRequester(requester));
    if (withToast) {
      showPlainToast(`${requester.name} has been added to your blocklist.`);
    }
  };

  private handleMouseEnter = () => {
    this.setState({ hovering: true });
  };

  private handleMouseLeave = () => {
    this.setState({ hovering: false });
  };

  public render() {
    const { withTooltip = true } = this.props;

    return (
      <Tooltip
        disabled={!withTooltip}
        content="You can unblock a requester from the Blocklist tab."
        position={Position.RIGHT}
        isOpen={this.state.hovering}
      >
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <Button destructive size="slim" onClick={this.handleBlockRequester}>
            Block Requester
          </Button>
        </div>
      </Tooltip>
    );
  }
}

const mapDispatch: Handlers = {
  onBlockRequester: blockSingleRequester
};

export default connect(
  null,
  mapDispatch
)(BlockRequesterButton);
