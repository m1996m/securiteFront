export interface DeclarationNaissanceEntity {
  id: number;
  [key: string]: string | number | boolean | Date | null,
  childFirstName: string;
  childLastName: string;
  fatherFirstName: string;
  fatherLastName: string;
  fatherBirthDate: string;
  fatherPhone: string;
  fatherNumberChild: number;
  fatherAddress: string;
  motherFirstName: string;
  motherLastName: string;
  motherBirthDate: string;
  motherPhone: string;
  motherNumberChild: number;
  motherAddress: string;
  birthDateChild: string;
  numeroUnique: string;
  hopital: string;
  genderChild: string;
  slug: string;
  userId: string;
  createdAt: Date;
  statut: string;
  typeNaissance: string;
}
