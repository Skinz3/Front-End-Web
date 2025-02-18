import { JourSemaineType } from "./jourSemaineType";
import { Media } from "./media";
import { Probleme } from "./probleme";
import { RapportChantierRegulier } from "./rapportChantierRegulier";
import { StatusType } from "./statusType";
import { StatusIntervention } from "./statusIntervention";

export class Chantier {
  constructor(
    public siteId: number,
    public clientId: number,
    public problemes: Set<Probleme>,
    public medias: Set<Media>,
    public adresse: string,
    public ouvriers: string[],
    public nbOuvrier: number,
    public materiel: string,
    public dateDebutTheorique: Date,
    public dateFinTheorique: Date,
    public estimationTemps: number,
    public telephone: string,
    public statusChantier: StatusType,
    public nomChantier: string,
    public informationsInterne: string,
    public description: string,
    public dateDebutEffectif: Date,
    public dateFinEffectif: Date,
    public conducteurPresent: boolean,
    public regularite: boolean,
    public statusIntervention?: StatusIntervention,
    public volume?: string,
    public poid?: string,
    public accessibilite?: string,
    // TOUT CE QUI EST REGULARITE EST OPTIONNEL
    public joursRegularite?: Array<JourSemaineType>,
    public dateDebutRegularite?: Date,
    public dateFinRegularite?: Date,
    public rapportsRegulier?: Set<RapportChantierRegulier>
  ) {}
}
