(function (graph) {
    'use strict'

    window.globalVars = graph()
}(async function () {

    async function fetchData(query) {
        const res = await fetch('https://dcjzedyg2zbo7b6gzyao4h4diu.appsync-api.eu-west-3.amazonaws.com/graphql', {
            method: 'post',
            body: query,
            headers: {
                'X-Api-Key': 'da2-ogqdfxf57vaadluzhs4or5g6om'
            }
        })
        const { data } = await res.json();
        return data
    }

    async function listCommunications() {
        const query = JSON.stringify({
            query: `
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
  }`
        })
        const data = await fetchData(query)
        return data.listCommunications.items
    }

    async function listDefaultCategories() {
        const query = JSON.stringify({
            query: `
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
        __typename
      }
      nextToken
      __typename
    }
  }
`
        })
        const data = await fetchData(query)
        return data.listDefaultCategories.items
    }

    window.listCommunications = listCommunications
    window.listDefaultCategories = listDefaultCategories
}))