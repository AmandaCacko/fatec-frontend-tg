export type RootStackParamList = {
  Auth: undefined;
  Login: undefined;
  Register: undefined;
  CreatePatient: undefined;
  CaregiverOption: undefined;
  ChoosePatientOption: undefined;
  EnterPatientCode: undefined;
  Home: undefined;
  Stock: undefined;
  ProfileType: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}