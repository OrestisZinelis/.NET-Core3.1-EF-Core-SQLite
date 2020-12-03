const apiUrl = `${Cypress.env("apiUrl")}`

describe('Account Management Backend - Level 3', () => {

  it('should create a transaction, read it, and fetch the updated account balance', () => {
    cy.request({ // create transaction
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "7943f961-a733-43cf-ba3d-905a5856f6da"
      },
      body: {
        account_id: "a40bcc03-6f39-418c-ad0b-97e14f522ec1",
        amount: 7
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    }).request({ // read transaction
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/transaction/7943f961-a733-43cf-ba3d-905a5856f6da`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.account_id).to.eq("a40bcc03-6f39-418c-ad0b-97e14f522ec1")
      expect(response.body.amount).to.eq(7)
    }).request({ // read account balance
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/balance/a40bcc03-6f39-418c-ad0b-97e14f522ec1`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.balance).to.eq(7)
    })
  })

  it('should create transactions with negative and zero amounts', () => {
    cy.request({ // positive amount
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "3dc5b8b7-55b3-4c7e-bd34-3c1f2aedf0c2"
      },
      body: {
        account_id: "0b230303-0156-45a9-b996-16574b6be525",
        amount: 4
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    }).request({ // read account balance
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/balance/0b230303-0156-45a9-b996-16574b6be525`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.balance).to.eq(4)
    }).request({ // negative amount
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "05a9b3c7-6e4e-4e7b-b161-cf64188a7ec9"
      },
      body: {
        account_id: "0b230303-0156-45a9-b996-16574b6be525",
        amount: -3
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    }).request({ // read account balance
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/balance/0b230303-0156-45a9-b996-16574b6be525`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.balance).to.eq(1)
    }).request({ // zero amount
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "e5c8e767-54c3-4156-acf3-617a5a15c053"
      },
      body: {
        account_id: "0b230303-0156-45a9-b996-16574b6be525",
        amount: 0
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    }).request({ // read account balance
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/balance/0b230303-0156-45a9-b996-16574b6be525`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.balance).to.eq(1)
    })
  })

  it('should create transactions idempotently', () => {
    cy.request({ // new transaction
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "98438cc1-83f4-441a-a002-88838c259f83"
      },
      body: {
        account_id: "ddb28326-25b5-431d-92bd-7a1b4372a10f",
        amount: 9
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    }).request({ // same transaction
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "98438cc1-83f4-441a-a002-88838c259f83"
      },
      body: {
        account_id: "ddb28326-25b5-431d-92bd-7a1b4372a10f",
        amount: 9
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    }).request({ // read account balance
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/balance/ddb28326-25b5-431d-92bd-7a1b4372a10f`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.balance).to.eq(9)
    })
  })

  it('should return NOT_FOUND for non-existent accounts and transactions', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/balance/96a11d04-4a69-47be-9e40-923d962eb7b4`,
    }).then((response) => {
      expect(response.status).to.eq(404)
    }).request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/transaction/3b9fe297-665b-4e31-a492-d9a08740ebb5`,
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })

  it('should handle invalid requests gracefully', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'PUT', // wrong method
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "417a48dd-b73e-45fc-9ee0-c5d97c46748f"
      },
      body: {
        account_id: "a40bcc03-6f39-418c-ad0b-97e14f522ec1",
        amount: 10
      }
    }).then((response) => {
      expect(response.status).to.eq(405)
    }).request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/xml", // wrong Content-Type
        "Transaction-Id": "59b2917e-6407-40eb-8fbf-287435fcd6f8"
      },
      body: {
        account_id: "a40bcc03-6f39-418c-ad0b-97e14f522ec1",
        amount: 10
      }
    }).then((response) => {
      expect(response.status).to.eq(415)
    }).request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "6eadf15c-fc8a-4584-b708-31a56df13563"
      },
      body: { // missing account_id
        amount: 7
      }
    }).then((response) => {
      expect(response.status).to.eq(400)
    }).request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "a02beed9-c81f-4030-a868-b9cb308d961c"
      },
      body: { // missing amount
        account_id: "a40bcc03-6f39-418c-ad0b-97e14f522ec1"
      }
    }).then((response) => {
      expect(response.status).to.eq(400)
    }).request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "29b0370f-05c0-4d17-a406-3f825997b0f5"
      },
      body: {
        account_id: 10, // bad format
        amount: 7
      }
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('should caclulate max transaction volume', () => {
    cy.request({ // create a bunch of transactions
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "a1455c8b-1c4a-4fc0-ae05-167175e30fd1"
      },
      body: {
        account_id: "134aa5a1-488f-4c84-b434-1d61d44de6eb",
        amount: 100
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    }).request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "d03daf10-36b6-4661-a07a-39fa331f2b53"
      },
      body: {
        account_id: "134aa5a1-488f-4c84-b434-1d61d44de6eb",
        amount: 23
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    }).request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "a85bff34-9016-455b-acfa-40e9c47fdd23"
      },
      body: {
        account_id: "7c9be9e8-a6df-4f43-9a44-38c10ad0de4a",
        amount: 500
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    }).request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "23d23f3d-2df9-4142-bb47-2651d86b959d"
      },
      body: {
        account_id: "7c9be9e8-a6df-4f43-9a44-38c10ad0de4a",
        amount: 20
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    }).request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "356f629b-792a-443a-9267-a858f1a29f86"
      },
      body: {
        account_id: "7c9be9e8-a6df-4f43-9a44-38c10ad0de4a",
        amount: 36
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    }).request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "c997dcda-841a-4e2c-9098-0d74954cd606"
      },
      body: {
        account_id: "7c9be9e8-a6df-4f43-9a44-38c10ad0de4a",
        amount: 10
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    }).request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "6e5337e5-7b8b-44a2-baf2-7be612a9799a"
      },
      body: {
        account_id: "75108c41-0002-4778-95ed-f6a1bd897b58",
        amount: 456
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    }).request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "cdc5aa85-1c71-4f3d-bb0c-dc69fecfe484"
      },
      body: {
        account_id: "44a92331-a533-4dd3-82e3-3ff75219e33b",
        amount: 700
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    }).request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "51150df2-27d6-47ef-ba63-43b3443091c7"
      },
      body: {
        account_id: "44a92331-a533-4dd3-82e3-3ff75219e33b",
        amount: 49
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    }).request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "13d62286-bdf1-4caf-9473-5be5856784b5"
      },
      body: {
        account_id: "44a92331-a533-4dd3-82e3-3ff75219e33b",
        amount: 40
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    }).request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "62eadcfb-2e8f-4f15-9ecf-ebc3814bb581"
      },
      body: {
        account_id: "44a92331-a533-4dd3-82e3-3ff75219e33b",
        amount: 10
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    }).request({ // return max transaction volume
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/max_transaction_volume`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.maxVolume).to.eq(4)
      expect(response.body.accounts.length).to.eq(2)
      expect(response.body.accounts).to.include('44a92331-a533-4dd3-82e3-3ff75219e33b')
      expect(response.body.accounts).to.include('7c9be9e8-a6df-4f43-9a44-38c10ad0de4a')
    })
  })
})
