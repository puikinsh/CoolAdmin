/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDefaultCategories = /* GraphQL */ `
  subscription OnCreateDefaultCategories(
    $filter: ModelSubscriptionDefaultCategoriesFilterInput
  ) {
    onCreateDefaultCategories(filter: $filter) {
      id
      clientId
      categoryName
      configuration {
        autoResponse
        redirect
        redirectTo
        quote
        quoteOption
        trigger
        triggerOption
        retargeting
        retargetingOption
        retargetingTime
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateDefaultCategories = /* GraphQL */ `
  subscription OnUpdateDefaultCategories(
    $filter: ModelSubscriptionDefaultCategoriesFilterInput
  ) {
    onUpdateDefaultCategories(filter: $filter) {
      id
      clientId
      categoryName
      configuration {
        autoResponse
        redirect
        redirectTo
        quote
        quoteOption
        trigger
        triggerOption
        retargeting
        retargetingOption
        retargetingTime
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteDefaultCategories = /* GraphQL */ `
  subscription OnDeleteDefaultCategories(
    $filter: ModelSubscriptionDefaultCategoriesFilterInput
  ) {
    onDeleteDefaultCategories(filter: $filter) {
      id
      clientId
      categoryName
      configuration {
        autoResponse
        redirect
        redirectTo
        quote
        quoteOption
        trigger
        triggerOption
        retargeting
        retargetingOption
        retargetingTime
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCategories = /* GraphQL */ `
  subscription OnCreateCategories(
    $filter: ModelSubscriptionCategoriesFilterInput
  ) {
    onCreateCategories(filter: $filter) {
      id
      clientId
      categoryName
      configuration {
        autoResponse
        redirect
        redirectTo
        quote
        quoteOption
        trigger
        triggerOption
        retargeting
        retargetingOption
        retargetingTime
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCategories = /* GraphQL */ `
  subscription OnUpdateCategories(
    $filter: ModelSubscriptionCategoriesFilterInput
  ) {
    onUpdateCategories(filter: $filter) {
      id
      clientId
      categoryName
      configuration {
        autoResponse
        redirect
        redirectTo
        quote
        quoteOption
        trigger
        triggerOption
        retargeting
        retargetingOption
        retargetingTime
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCategories = /* GraphQL */ `
  subscription OnDeleteCategories(
    $filter: ModelSubscriptionCategoriesFilterInput
  ) {
    onDeleteCategories(filter: $filter) {
      id
      clientId
      categoryName
      configuration {
        autoResponse
        redirect
        redirectTo
        quote
        quoteOption
        trigger
        triggerOption
        retargeting
        retargetingOption
        retargetingTime
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCommunications = /* GraphQL */ `
  subscription OnCreateCommunications(
    $filter: ModelSubscriptionCommunicationsFilterInput
  ) {
    onCreateCommunications(filter: $filter) {
      id
      messageId
      channel
      category
      dateTime
      fromId
      toId
      responseAi
      messageSubject
      messageBody
      messagSummary
      messageAttachment
      responseBody
      responseSubject
      responseAttachment
      execute
      clientId
      threadId
      thread
      actions
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCommunications = /* GraphQL */ `
  subscription OnUpdateCommunications(
    $filter: ModelSubscriptionCommunicationsFilterInput
  ) {
    onUpdateCommunications(filter: $filter) {
      id
      messageId
      channel
      category
      dateTime
      fromId
      toId
      responseAi
      messageSubject
      messageBody
      messagSummary
      messageAttachment
      responseBody
      responseSubject
      responseAttachment
      execute
      clientId
      threadId
      thread
      actions
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCommunications = /* GraphQL */ `
  subscription OnDeleteCommunications(
    $filter: ModelSubscriptionCommunicationsFilterInput
  ) {
    onDeleteCommunications(filter: $filter) {
      id
      messageId
      channel
      category
      dateTime
      fromId
      toId
      responseAi
      messageSubject
      messageBody
      messagSummary
      messageAttachment
      responseBody
      responseSubject
      responseAttachment
      execute
      clientId
      threadId
      thread
      actions
      createdAt
      updatedAt
      __typename
    }
  }
`;
