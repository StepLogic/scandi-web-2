import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export default class Api {
  client = new ApolloClient({
    cache: new InMemoryCache({ addTypename: false }),
    uri: "http://localhost:4000/graphql",
    name: "react-web-client",
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });
  fetchCategories = async () => {
    // console.log("Query");
    try {
      const data = await this.client
        .query({
          query: gql`
            {
              categories {
                name
              }
            }
          `,
        })
        .then((result) => {
          // console.log("Results", result);
          return result.data.categories;
        });
      return data;
    } catch (e) {
      return { msg: e };
    }
  };
  fetchProductsById = async (id: string) => {
    try {
      const data = await this.client
        .query({
          query: gql`
         {
          category(input: { title: "${id}" }) {
           products{
                id
                  name
                  inStock
                  gallery
                  description
                  brand
                  attributes{
                    id
                    name
                    type
                    items{
                      id
                      displayValue
                      value
                      
                    }
                  }
                  prices{
                    currency{
                      label
                      symbol
                    }
                    amount
                  }
              }
          }
        }
          `,
        })
        .then((result) => {
          // console.log("Results", result);
          return result.data.category.products;
        });
      return data;
    } catch (e) {
      // console.log("Result", e);
      return { msg: e };
    }
  };
  fetchProductById = async (id: string) => {
    // console.log("Query", id);
    try {
      const data = await this.client
        .query({
          query: gql`
            {
              product(id: "${id}") {
                id
                name
                inStock
                gallery
                description
                brand
                attributes {
                  id
                  name
                  type
                  items {
                    id
                    displayValue
                    value
                  }
                }
                prices {
                  currency {
                    label
                    symbol
                  }
                  amount
                }
              }
            }
          `,
        })
        .then((result) => {
          // console.log("Results", result);
          return result.data.product;
        });
      return data;
    } catch (e) {
      // console.log("Result", e);
      return { msg: e };
    }
  };
  fetchCurrencies = async () => {
    try {
      const data = await this.client
        .query({
          query: gql`
            {
              currencies {
                label
                symbol
              }
            }
          `,
        })
        .then((result) => {
          // console.log("Results", result);
          return result.data.currencies;
        });
      return data;
    } catch (e) {
      // console.log("Result", e);
      return { msg: e };
    }
  };
}
