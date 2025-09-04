export type RootStackParamList = {
  Home: undefined;
  ListDetail: { listId: string };
  Analytics: undefined;
};

// Extender o tipo do useNavigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
