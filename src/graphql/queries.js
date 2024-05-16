/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDefaultCategories = /* GraphQL */ `
  query GetDefaultCategories($id: ID!) {
    getDefaultCategories(id: $id) {
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
export const listDefaultCategories = /* GraphQL */ `
  query ListDefaultCategories(
    $filter: ModelDefaultCategoriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDefaultCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        clientId
        categoryName
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCategories = /* GraphQL */ `
  query GetCategories($id: ID!) {
    getCategories(id: $id) {
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
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        clientId
        categoryName
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCommunications = /* GraphQL */ `
  query GetCommunications($clientId: String!, $dateTime: AWSDateTime!) {
    getCommunications(clientId: $clientId, dateTime: $dateTime) {
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
export const listCommunications = /* GraphQL */ `
  query ListCommunications(
    $clientId: String
    $dateTime: ModelStringKeyConditionInput
    $filter: ModelCommunicationsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCommunications(
      clientId: $clientId
      dateTime: $dateTime
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection) {
      items {
        messageId
        channel
        category
        dateTime
        fromId
        toId
        responseAi
        responseAttachment
      }
      nextToken
      __typename
    }
  }
`;

export const messageDetails = `
  query listCommunications(
    $clientId: String
    $dateTime: ModelStringKeyConditionInput
    $filter: ModelCommunicationsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCommunications(
      clientId: $clientId
      dateTime: $dateTime
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection) {
    items {
      category
      fromId
      dateTime
      messagSummary
      messageSubject
      messageBody
    }
    nextToken
      __typename
  }
}
`
export const responseDetails = `
query listCommunications(
    $clientId: String
    $dateTime: ModelStringKeyConditionInput
    $filter: ModelCommunicationsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCommunications(
      clientId: $clientId
      dateTime: $dateTime
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection) {
    items {
      responseAttachment
      responseAi
      responseSubject
      responseBody
    }
    nextToken
      __typename
  }
}
`
export const actionsQuery = `
  query listCommunications(
    $clientId: String
    $dateTime: ModelStringKeyConditionInput
    $filter: ModelCommunicationsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCommunications(
      clientId: $clientId
      dateTime: $dateTime
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection) {
    items {
      fromId
      dateTime
      category
      responseAttachment
      responseAi
      messageSubject
      messageBody
      responseSubject
      responseBody
    }
    nextToken
      __typename
  }
}
`