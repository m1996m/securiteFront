import {DeclarationNaissanceEntity} from "./declarationNaissance.entity";
import {UserHopitalEntity} from "./userHopital.entity";

export interface HopitalEntity {
  id: number;
  numeroUnique: string;
  adresse: string;
  email: string;
  slug: string;
  tel: string;
  designation: string;
  dateCreation: Date;
  pays: string;
  createdAt: Date;
  declarationNaissance: DeclarationNaissanceEntity[];
  userHopital: UserHopitalEntity[];
}
