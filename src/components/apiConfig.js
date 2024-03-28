import { gql } from "@apollo/client";
// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
// let query = `
// query ($id: Int, $page: Int, $perPage: Int, $search: String) {
//   Page (page: $page, perPage: $perPage) {
//     pageInfo {
//       total
//       currentPage
//       lastPage
//       hasNextPage
//       perPage
//     }
//     media (id: $id, search: $search) {
//       id
//       title {
//         romaji
//       }
//     }
//   }
// }
// `

 export const getAnimeListQuery = gql`
  query GetAnimeList($page: Int!, $perPage: Int!) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media {
        id
        title {
          english
        }
        episodes
        status
        averageScore
        description
        startDate {
          year
        }
      }
    }
  }
`;
