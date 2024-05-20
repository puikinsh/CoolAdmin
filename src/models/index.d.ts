import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerCategoryConfiguration = {
  readonly autoResponse?: boolean | null;
  readonly redirect?: boolean | null;
  readonly redirectTo?: string | null;
  readonly quote?: boolean | null;
  readonly quoteOption?: string | null;
  readonly trigger?: boolean | null;
  readonly triggerOption?: string | null;
  readonly retargeting?: string | null;
  readonly retargetingOption?: string | null;
  readonly retargetingTime?: string | null;
}

type LazyCategoryConfiguration = {
  readonly autoResponse?: boolean | null;
  readonly redirect?: boolean | null;
  readonly redirectTo?: string | null;
  readonly quote?: boolean | null;
  readonly quoteOption?: string | null;
  readonly trigger?: boolean | null;
  readonly triggerOption?: string | null;
  readonly retargeting?: string | null;
  readonly retargetingOption?: string | null;
  readonly retargetingTime?: string | null;
}

export declare type CategoryConfiguration = LazyLoading extends LazyLoadingDisabled ? EagerCategoryConfiguration : LazyCategoryConfiguration

export declare const CategoryConfiguration: (new (init: ModelInit<CategoryConfiguration>) => CategoryConfiguration)

type EagerDefaultCategories = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DefaultCategories, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly clientId?: string | null;
  readonly categoryName?: string | null;
  readonly configuration?: CategoryConfiguration | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDefaultCategories = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DefaultCategories, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly clientId?: string | null;
  readonly categoryName?: string | null;
  readonly configuration?: CategoryConfiguration | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DefaultCategories = LazyLoading extends LazyLoadingDisabled ? EagerDefaultCategories : LazyDefaultCategories

export declare const DefaultCategories: (new (init: ModelInit<DefaultCategories>) => DefaultCategories) & {
  copyOf(source: DefaultCategories, mutator: (draft: MutableModel<DefaultCategories>) => MutableModel<DefaultCategories> | void): DefaultCategories;
}

type EagerCategories = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Categories, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly clientId?: string | null;
  readonly categoryName?: string | null;
  readonly configuration?: CategoryConfiguration | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategories = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Categories, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly clientId?: string | null;
  readonly categoryName?: string | null;
  readonly configuration?: CategoryConfiguration | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Categories = LazyLoading extends LazyLoadingDisabled ? EagerCategories : LazyCategories

export declare const Categories: (new (init: ModelInit<Categories>) => Categories) & {
  copyOf(source: Categories, mutator: (draft: MutableModel<Categories>) => MutableModel<Categories> | void): Categories;
}

type EagerCommunications = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Communications, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly messageId?: string | null;
  readonly channel?: string | null;
  readonly category?: string | null;
  readonly dateTime?: string | null;
  readonly fromId?: string | null;
  readonly toId?: string | null;
  readonly responseAi?: string | null;
  readonly messageSubject?: string | null;
  readonly messageBody?: string | null;
  readonly messagSummary?: string | null;
  readonly messageAttachment?: string | null;
  readonly responseBody?: string | null;
  readonly responseSubject?: string | null;
  readonly responseAttachment?: string | null;
  readonly execute?: boolean | null;
  readonly clientId?: string | null;
  readonly threadId?: string | null;
  readonly thread?: string | null;
  readonly actions?: string | null;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCommunications = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Communications, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly messageId?: string | null;
  readonly channel?: string | null;
  readonly category?: string | null;
  readonly dateTime?: string | null;
  readonly fromId?: string | null;
  readonly toId?: string | null;
  readonly responseAi?: string | null;
  readonly messageSubject?: string | null;
  readonly messageBody?: string | null;
  readonly messagSummary?: string | null;
  readonly messageAttachment?: string | null;
  readonly responseBody?: string | null;
  readonly responseSubject?: string | null;
  readonly responseAttachment?: string | null;
  readonly execute?: boolean | null;
  readonly clientId?: string | null;
  readonly threadId?: string | null;
  readonly thread?: string | null;
  readonly actions?: string | null;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Communications = LazyLoading extends LazyLoadingDisabled ? EagerCommunications : LazyCommunications

export declare const Communications: (new (init: ModelInit<Communications>) => Communications) & {
  copyOf(source: Communications, mutator: (draft: MutableModel<Communications>) => MutableModel<Communications> | void): Communications;
}