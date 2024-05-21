import { Plugin } from '@tachybase/client';
import { tval } from '../../locale';
import { PluginKitApprovalCommon } from '../approval-common/plugin';
import { RecordApprovalsDecorator } from './RecordApprovals.decorator';
import { RecordApprovalsInitializer } from './RecordApprovals.initializer';
import { RecordApprovals } from './RecordApprovals.view';

export class PluginKitApprovalRecordBlock extends Plugin {
  async afterAdd() {
    this.pm.add(PluginKitApprovalCommon);
  }
  async beforeLoad() {}
  async load() {
    this.app.addComponents({
      'ApprovalRecordBlock.Decorator': RecordApprovalsDecorator,
      'ApprovalRecordBlock.BlockInitializer': RecordApprovalsInitializer,
      'ApprovalRecordBlock.ViewComponent': RecordApprovals,
    });

    this.app.schemaInitializerManager.get('popup:common:addBlock').add('otherBlocks.approvalRecordBlock', {
      type: 'item',
      name: 'approvalRecordBlock',
      title: tval('Related approvals'),
      Component: 'ApprovalRecordBlock.BlockInitializer',
    });
  }
}
