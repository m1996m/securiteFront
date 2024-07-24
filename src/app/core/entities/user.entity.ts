import {HopitalEntity} from "./hopital.entity";
import {DeclarationNaissanceEntity} from "./declarationNaissance.entity";
import {UserHopitalEntity} from "./userHopital.entity";

export interface UserEntity {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  type_user: 'Hopital' | 'Patient' | 'Personnel' | 'Admin';
  slug: string;
  tier: string;
  pays: string;
  statut:  'Actif' | 'Suspendu' | 'Supprimé';
  image?: string;
  role: 'USER_SANTE' | 'USER_PATIENT' | 'USER_PERSONNEL' | 'USER_ADMIN';
  createdAt: Date;
  userHopital: UserHopitalEntity[];
  declarationNaissance: DeclarationNaissanceEntity[];
}


