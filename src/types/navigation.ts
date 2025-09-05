export type RootStackParamList = {
  Home: undefined;
  ListDetail: { listId: string };
  Analytics: undefined;
  BudgetHistory: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
