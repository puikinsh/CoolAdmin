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
        categoryName
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
        categoryName
      }
      nextToken
      __typename
    }
  }
`;

export const getCommunications = /* GraphQL */ `
  query GetCommunications($id: ID!) {
    getCommunications(id: $id) {
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

export const listCommunications = /* GraphQL */ `
  query ListCommunications(
    $filter: ModelCommunicationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommunications(filter: $filter, limit: $limit, nextToken: $nextToken) {
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

export const getMessageDetails = /* GraphQL */ `
  query GetCommunications($id: ID!) {
    getCommunications(id: $id) {
      messageId
      category
      fromId
      dateTime
      messagSummary
      messageSubject
      messageBody
      messageAttachment
    }
  }
`;

export const getResponseDetails = /* GraphQL */ `
  query GetCommunications($id: ID!) {
    getCommunications(id: $id) {
      responseAttachment
      responseAi
      responseSubject
      responseBody
    }
  }
`;