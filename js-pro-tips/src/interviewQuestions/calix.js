/*
 * Technical requirements:
 *
 *  Expose a function that returns a list of accounts with new/updated opportunities and quotes as per the functional requirements
 *  This function accepts an array of account ids
 *  This function must query the accounts from an API that returns a promise (use the mocked data from getAccounts())
 *  This function must return a promise
 *
 *  Note: You can create as many functions as needed to deliver this result
 *
 *  Functional Requirements:
 *
 *  In the function you expose, iterate through the passed in array of account ids
 *    • When the account id doesn't exist in the list of accounts returned from getAccounts
 *       - log an error 'Account <id> could not be found'
 *       - then move to the next account
 *    • When the account region is 'Domestic'
 *       - Then generate an Opportunity named 'New Opportunity' AND
 *       - Then create two quotes on this opportunity
 *          = The quote name should be the account name appended with '-1' and '-2'
 *          = The quote target value should be 100 if the account has spent more than 0, otherwise the target value should be 10
 *    • When the account region is 'International'
 *       - Then increment the opportunity Revision by 1 for all Opportunities
 */

// Data Structure
/*
    Account
    {
      id: string
      name: string
      region: string
      lifetimeSpend: number
      opportunities: Opportunity[]
    }

    Opportunity
    {
      name: string
      revision: number
      quotes: Quote[]
    }

    Quote
    {
      name: string
      targetValue: number
    }
*/

const processAccounts = (accounts) => {
  const accountsWithAccountIds = {};
  accounts.forEach((account) => {
    accountsWithAccountIds[account.id] = account;
  });
  return accountsWithAccountIds;
};

// [{id: account}];

// const getAccountIDs = (accounts) => {

// }

/**
 *  Exposes a function that returns a list of accounts with new/updated opportunities and quotes
 *  @param accountIds  array of account ids
 *
 */
export default getAccountDetails = async (accountIds) => {
  const accounts = await getAccounts();
  const accountsWithAccountIds = processAccounts(accounts);
  const accountIdFromRes = new Set();
  accounts.forEach((account) => {
    accountIdFromRes.add(account.id);
  });
  for (let i = 0; i < accountIds.length; i++) {
    if (!accountIdFromRes.has(accountIds[i])) {
      console.error(`Account ${accountIds[i]} could not be found`);
    } else {
      const account = Object.keys(accountsWithAccountIds).find(accountIds[i]);

      //             //  When the account region is 'Domestic'
      //  *       - Then generate an Opportunity named 'New Opportunity' AND
      //  *       - Then create two quotes on this opportunity
      //  *          = The quote name should be the account name appended with '-1' and '-2'
      //  *          = The quote target value should be 100 if the account has spent more than 0, otherwise the target value should be 10
      if (account.region === "Domestic") {
        // const opportunities = account.opportunities;
        const newOpportunity = { name: "New Opportunity" };
        const quotes = generateQuotes(account);
        newOpportunity[quotes] = quotes;
        account.opportunities.push(newOpportunity);
      } else if (account.region === "International") {
        //             • When the account region is 'International'
        //  *       - Then increment the opportunity Revision by 1 for all Opportunities
        account.opportunities.forEach((opportunity) => {
          return (opportunity.revision += 1);
        });
      }
    }
  }
};

// const generateQuotes = (a)

const getAccounts = () => {
  return Promise.resolve([
    {
      id: "acct1",
      name: "International Account 1",
      region: "International",
      lifetimeSpend: 600,
      opportunities: [
        {
          name: "Opportunity 1",
          revision: 5,
          quotes: [],
        },
      ],
    },
    {
      id: "acct2",
      name: "Domestic Account 1",
      region: "Domestic",
      lifetimeSpend: 0,
      opportunities: [
        {
          name: "Opportunity 2",
          revision: 2,
          quotes: [
            {
              name: "Old Quote",
              targetValue: 10,
            },
          ],
        },
      ],
    },
    {
      id: "acct3",
      name: "Domestic Account 2",
      region: "Domestic",
      lifetimeSpend: 20,
      opportunities: [],
    },
    {
      id: "acct4",
      name: "International Account 2",
      region: "International",
      lifetimeSpend: 20,
      opportunities: [
        {
          name: "Opportunity 1",
          revision: 0,
          quotes: [
            {
              name: "Old Int. Quote",
              targetValue: 100,
            },
          ],
        },
      ],
    },
  ]);
};
