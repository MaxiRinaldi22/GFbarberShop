export type AdminContextType = {
  admin: boolean | null;
  setAdmin: React.Dispatch<React.SetStateAction<boolean | null>>;
};