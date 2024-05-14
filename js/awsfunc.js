(function (fetchEmails) {
    'use strict'

    window.globalVars = fetchEmails()
}(async function () {
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

        const res = await fetch('https://dcjzedyg2zbo7b6gzyao4h4diu.appsync-api.eu-west-3.amazonaws.com/graphql', {
            method: 'post',
            body: query,
            headers: {
                'X-Api-Key': 'da2-ogqdfxf57vaadluzhs4or5g6om'
            }
        })

        const { data } = await res.json()

        return data.listCommunications.items
    }
    return {
        listCommunications
    }
}))