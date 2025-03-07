import { Plugin } from '../application/Plugin';
import { CreateChildInitializer } from '../modules/actions/add-child/CreateChildInitializer';
import { CreateActionInitializer } from '../modules/actions/add-new/CreateActionInitializer';
import {
  createFormBlockInitializers,
  createFormBlockInitializers_deprecated,
} from '../modules/actions/add-new/createFormBlockInitializers';
import { CustomizeAddRecordActionInitializer } from '../modules/actions/add-record/CustomizeAddRecordActionInitializer';
import {
  customizeCreateFormBlockInitializers,
  customizeCreateFormBlockInitializers_deprecated,
} from '../modules/actions/add-record/customizeCreateFormBlockInitializers';
import { BulkDestroyActionInitializer } from '../modules/actions/bulk-destroy/BulkDestroyActionInitializer';
import { DestroyActionInitializer } from '../modules/actions/delete/DestroyActionInitializer';
import { DisassociateActionInitializer } from '../modules/actions/disassociate/DisassociateActionInitializer';
import { ExpandableActionInitializer } from '../modules/actions/expand-collapse/ExpandableActionInitializer';
import { FilterActionInitializer } from '../modules/actions/filter/FilterActionInitializer';
import { RefreshActionInitializer } from '../modules/actions/refresh/RefreshActionInitializer';
import { SaveRecordActionInitializer } from '../modules/actions/save-record/SaveRecordActionInitializer';
import { CreateSubmitActionInitializer } from '../modules/actions/submit/CreateSubmitActionInitializer';
import { UpdateSubmitActionInitializer } from '../modules/actions/submit/UpdateSubmitActionInitializer';
import { UpdateRecordActionInitializer } from '../modules/actions/update-record/UpdateRecordActionInitializer';
import { PopupActionInitializer } from '../modules/actions/view-edit-popup/PopupActionInitializer';
import { recordFormBlockInitializers } from '../modules/actions/view-edit-popup/RecordFormBlockInitializers';
import { UpdateActionInitializer } from '../modules/actions/view-edit-popup/UpdateActionInitializer';
import { ViewActionInitializer } from '../modules/actions/view-edit-popup/ViewActionInitializer';
import {
  detailsActionInitializers,
  detailsActionInitializers_deprecated,
} from '../modules/blocks/data-blocks/details-multi/DetailsActionInitializers';
import { DetailsBlockInitializer } from '../modules/blocks/data-blocks/details-multi/DetailsBlockInitializer';
import {
  readPrettyFormActionInitializers,
  readPrettyFormActionInitializers_deprecated,
} from '../modules/blocks/data-blocks/details-single/ReadPrettyFormActionInitializers';
import {
  readPrettyFormItemInitializers,
  readPrettyFormItemInitializers_deprecated,
} from '../modules/blocks/data-blocks/details-single/ReadPrettyFormItemInitializers';
import { RecordReadPrettyFormBlockInitializer } from '../modules/blocks/data-blocks/details-single/RecordReadPrettyFormBlockInitializer';
import {
  createFormActionInitializers,
  createFormActionInitializers_deprecated,
} from '../modules/blocks/data-blocks/form/createFormActionInitializers';
import { CreateFormBlockInitializer } from '../modules/blocks/data-blocks/form/CreateFormBlockInitializer';
import { formActionInitializers } from '../modules/blocks/data-blocks/form/formActionInitializers';
import { FormBlockInitializer } from '../modules/blocks/data-blocks/form/FormBlockInitializer';
import {
  formItemInitializers,
  formItemInitializers_deprecated,
} from '../modules/blocks/data-blocks/form/formItemInitializers';
import { RecordFormBlockInitializer } from '../modules/blocks/data-blocks/form/RecordFormBlockInitializer';
import {
  updateFormActionInitializers,
  updateFormActionInitializers_deprecated,
} from '../modules/blocks/data-blocks/form/updateFormActionInitializers';
import {
  gridCardActionInitializers,
  gridCardActionInitializers_deprecated,
} from '../modules/blocks/data-blocks/grid-card/GridCardActionInitializers';
import { GridCardBlockInitializer } from '../modules/blocks/data-blocks/grid-card/GridCardBlockInitializer';
import {
  gridCardItemActionInitializers,
  gridCardItemActionInitializers_deprecated,
} from '../modules/blocks/data-blocks/grid-card/gridCardItemActionInitializers';
import {
  listActionInitializers,
  listActionInitializers_deprecated,
} from '../modules/blocks/data-blocks/list/ListActionInitializers';
import { ListBlockInitializer } from '../modules/blocks/data-blocks/list/ListBlockInitializer';
import {
  listItemActionInitializers,
  listItemActionInitializers_deprecated,
} from '../modules/blocks/data-blocks/list/listItemActionInitializers';
import { TableSelectorInitializer } from '../modules/blocks/data-blocks/table-selector/TableSelectorInitializer';
import {
  tableActionColumnInitializers,
  tableActionColumnInitializers_deprecated,
} from '../modules/blocks/data-blocks/table/TableActionColumnInitializers';
import {
  tableActionInitializers,
  tableActionInitializers_deprecated,
} from '../modules/blocks/data-blocks/table/TableActionInitializers';
import { TableBlockInitializer } from '../modules/blocks/data-blocks/table/TableBlockInitializer';
import {
  tableColumnInitializers,
  tableColumnInitializers_deprecated,
} from '../modules/blocks/data-blocks/table/TableColumnInitializers';
import { FilterCollapseBlockInitializer } from '../modules/blocks/filter-blocks/collapse/FilterCollapseBlockInitializer';
import {
  filterFormActionInitializers,
  filterFormActionInitializers_deprecated,
} from '../modules/blocks/filter-blocks/form/FilterFormActionInitializers';
import { FilterFormBlockInitializer } from '../modules/blocks/filter-blocks/form/FilterFormBlockInitializer';
import {
  filterFormItemInitializers,
  filterFormItemInitializers_deprecated,
} from '../modules/blocks/filter-blocks/form/filterFormItemInitializers';
import { MarkdownBlockInitializer } from '../modules/blocks/other-blocks/markdown/MarkdownBlockInitializer';
import { MarkdownFormItemInitializer } from '../modules/blocks/other-blocks/markdown/MarkdownFormItemInitializer';
import {
  tableSelectorInitializers,
  tableSelectorInitializers_deprecated,
} from '../modules/fields/component/Picker/TableSelectorInitializers';
import { CollectionFieldInitializer } from '../modules/fields/initializer/CollectionFieldInitializer';
import { TableCollectionFieldInitializer } from '../modules/fields/initializer/TableCollectionFieldInitializer';
import { menuItemInitializer, menuItemInitializer_deprecated } from '../modules/menu/menuItemInitializer';
import { blockInitializers, blockInitializers_deprecated } from '../modules/page/BlockInitializers';
import {
  customFormItemInitializers,
  customFormItemInitializers_deprecated,
  recordBlockInitializers,
  recordBlockInitializers_deprecated,
  subTableActionInitializers,
  subTableActionInitializers_deprecated,
  tabPaneInitializers_deprecated,
  tabPaneInitializersForBulkEditFormBlock,
  tabPaneInitializersForRecordBlock,
} from './buttons';
import * as initializerComponents from './components';
import * as items from './items';
import { FilterFormItemCustom } from './items';

export * from './buttons';
export * from './items';
export {
  createDetailsBlockSchema,
  createFormBlockSchema,
  createReadPrettyFormBlockSchema,
  createTableBlockSchema,
  gridRowColWrap,
  itemsMerge,
  useAssociatedFormItemInitializerFields,
  useAssociatedTableColumnInitializerFields,
  useCollectionDataSourceItems,
  useCurrentSchema,
  useFormItemInitializerFields,
  useInheritsTableColumnInitializerFields,
  useRecordCollectionDataSourceItems,
  useRemoveGridFormItem,
  useTableColumnInitializerFields,
} from './utils';

export class SchemaInitializerPlugin extends Plugin {
  async load() {
    this.app.addComponents({
      ...initializerComponents,
      ...items,
      DestroyActionInitializer,
      CreateFormBlockInitializer,
      FormBlockInitializer,
      RecordFormBlockInitializer,
      TableBlockInitializer,
      TableSelectorInitializer,
      RecordReadPrettyFormBlockInitializer,
      DetailsBlockInitializer,
      ListBlockInitializer,
      GridCardBlockInitializer,
      FilterFormBlockInitializer,
      FilterCollapseBlockInitializer,
      MarkdownBlockInitializer,
      MarkdownFormItemInitializer,
      TableCollectionFieldInitializer,
      CollectionFieldInitializer,
      CreateActionInitializer,
      CustomizeAddRecordActionInitializer,
      CreateChildInitializer,
      ViewActionInitializer,
      UpdateActionInitializer,
      PopupActionInitializer,
      SaveRecordActionInitializer,
      UpdateRecordActionInitializer,
      CreateSubmitActionInitializer,
      UpdateSubmitActionInitializer,
      BulkDestroyActionInitializer,
      ExpandableActionInitializer,
      DisassociateActionInitializer,
      FilterActionInitializer,
      RefreshActionInitializer,
      FilterFormItemCustom,
    } as any);

    this.app.schemaInitializerManager.add(blockInitializers_deprecated);
    this.app.schemaInitializerManager.add(blockInitializers);
    this.app.schemaInitializerManager.add(tableActionInitializers_deprecated);
    this.app.schemaInitializerManager.add(tableActionInitializers);
    this.app.schemaInitializerManager.add(tableColumnInitializers_deprecated);
    this.app.schemaInitializerManager.add(tableColumnInitializers);
    this.app.schemaInitializerManager.add(tableActionColumnInitializers_deprecated);
    this.app.schemaInitializerManager.add(tableActionColumnInitializers);
    this.app.schemaInitializerManager.add(formItemInitializers_deprecated);
    this.app.schemaInitializerManager.add(formItemInitializers);
    this.app.schemaInitializerManager.add(formActionInitializers);
    this.app.schemaInitializerManager.add(detailsActionInitializers_deprecated);
    this.app.schemaInitializerManager.add(detailsActionInitializers);
    this.app.schemaInitializerManager.add(readPrettyFormItemInitializers_deprecated);
    this.app.schemaInitializerManager.add(readPrettyFormItemInitializers);
    this.app.schemaInitializerManager.add(readPrettyFormActionInitializers_deprecated);
    this.app.schemaInitializerManager.add(readPrettyFormActionInitializers);
    this.app.schemaInitializerManager.add(createFormBlockInitializers_deprecated);
    this.app.schemaInitializerManager.add(createFormBlockInitializers);
    this.app.schemaInitializerManager.add(customizeCreateFormBlockInitializers_deprecated);
    this.app.schemaInitializerManager.add(customizeCreateFormBlockInitializers);
    this.app.schemaInitializerManager.add(customFormItemInitializers_deprecated);
    this.app.schemaInitializerManager.add(customFormItemInitializers);
    this.app.schemaInitializerManager.add(filterFormActionInitializers_deprecated);
    this.app.schemaInitializerManager.add(filterFormActionInitializers);
    this.app.schemaInitializerManager.add(createFormActionInitializers_deprecated);
    this.app.schemaInitializerManager.add(createFormActionInitializers);
    this.app.schemaInitializerManager.add(updateFormActionInitializers_deprecated);
    this.app.schemaInitializerManager.add(updateFormActionInitializers);
    this.app.schemaInitializerManager.add(filterFormItemInitializers_deprecated);
    this.app.schemaInitializerManager.add(filterFormItemInitializers);
    this.app.schemaInitializerManager.add(gridCardActionInitializers_deprecated);
    this.app.schemaInitializerManager.add(gridCardActionInitializers);
    this.app.schemaInitializerManager.add(gridCardItemActionInitializers_deprecated);
    this.app.schemaInitializerManager.add(gridCardItemActionInitializers);

    this.app.schemaInitializerManager.add(listActionInitializers_deprecated);
    this.app.schemaInitializerManager.add(listActionInitializers);
    this.app.schemaInitializerManager.add(listItemActionInitializers_deprecated);
    this.app.schemaInitializerManager.add(listItemActionInitializers);
    this.app.schemaInitializerManager.add(recordBlockInitializers_deprecated);
    this.app.schemaInitializerManager.add(recordBlockInitializers);
    this.app.schemaInitializerManager.add(recordFormBlockInitializers);
    this.app.schemaInitializerManager.add(subTableActionInitializers_deprecated);
    this.app.schemaInitializerManager.add(subTableActionInitializers);
    this.app.schemaInitializerManager.add(tableSelectorInitializers_deprecated);
    this.app.schemaInitializerManager.add(tableSelectorInitializers);
    this.app.schemaInitializerManager.add(tabPaneInitializers_deprecated);
    this.app.schemaInitializerManager.add(tabPaneInitializersForRecordBlock);
    this.app.schemaInitializerManager.add(tabPaneInitializersForBulkEditFormBlock);
    this.app.schemaInitializerManager.add(menuItemInitializer_deprecated);
    this.app.schemaInitializerManager.add(menuItemInitializer);
  }
}
