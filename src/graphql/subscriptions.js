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
        autoRedirect
        redirectTo
        autoQuote
        quoteOption
        autoTrigger
        triggerOption
        autoRetargeting
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
        autoRedirect
        redirectTo
        autoQuote
        quoteOption
        autoTrigger
        triggerOption
        autoRetargeting
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
        autoRedirect
        redirectTo
        autoQuote
        quoteOption
        autoTrigger
        triggerOption
        autoRetargeting
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
        autoRedirect
        redirectTo
        autoQuote
        quoteOption
        autoTrigger
        triggerOption
        autoRetargeting
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
        autoRedirect
        redirectTo
        autoQuote
        quoteOption
        autoTrigger
        triggerOption
        autoRetargeting
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
        autoRedirect
        redirectTo
        autoQuote
        quoteOption
        autoTrigger
        triggerOption
        autoRetargeting
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
      clientId
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
      clientId
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
      clientId
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
      threadId
      thread
      actions
      createdAt
      updatedAt
      __typename
    }
  }
`;
