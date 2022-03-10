import { graphql } from 'graphql';
import { GetServerSidePropsContext } from 'next';
import { schema } from '../pages/api/graphql';

export default function queryGraphql(
  query: string,
  res: GetServerSidePropsContext['res'],
  variableValues = {},
) {
  return graphql({
    schema,
    source: query,
    variableValues,
    contextValue: {
      res,
    },
  }) as Promise<{ data: any } | { errors: Error[] }>;
}
