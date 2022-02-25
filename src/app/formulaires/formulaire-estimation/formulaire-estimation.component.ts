import { JourSemaineType } from "./../../shared/model/jourSemaineType";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Site } from "../../shared/model/site";
import { Client } from "../../shared/model/client";
import { ChantierService } from "src/app/core/services/chantier.service";
import { ClientService } from "src/app/core/services/client.service";
import { SiteService } from "src/app/core/services/site.service";
import { Chantier } from "src/app/shared/model/chantier";
import { HttpResponse } from "@angular/common/http";
import { StatusType } from "src/app/shared/model/statusType";
import { ChantierGet } from "../../shared/model/chantierGet";
import { ActivatedRoute, Router } from "@angular/router";
import { MatOptionSelectionChange } from "@angular/material/core";

@Component({
  selector: "app-formulaire-estimation",
  templateUrl: "./formulaire-estimation.component.html",
  styleUrls: ["./formulaire-estimation.component.css"],
})
export class FormulaireEstimationComponent implements OnInit {
  states = [StatusType.ENCOURS, StatusType.ENATTENTE, StatusType.TERMINE];
  sites: Site[] = [];
  clients: Client[] = [];
  regularite = false;
  jourSemaineType: typeof JourSemaineType = JourSemaineType;
  joursRegularite: Array<JourSemaineType> = new Array();
  @Input() chantier: ChantierGet;
  @Input() standalone = true;

  checkedDay: boolean;

  currentJourRegularite: Array<JourSemaineType> = new Array();

  filtreClient = "";
  selectedSite: Site;
  selectedClient: Client;
  nouveauChantierForm: FormGroup;

  constructor(
    private router: Router,

    private chantierService: ChantierService,
    private clientService: ClientService,
    private siteService: SiteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getClients();
    console.log(this.chantier.statusChantier);
    this.getSites();
    this.selectedSite = this.chantier.site;
    this.selectedClient = this.chantier.client;
    this.nouveauChantierForm = new FormGroup({
      nbOuvrier: new FormControl(
        this.chantier.nbOuvrier != null ? this.chantier.nbOuvrier : 0
      ),
      materiel: new FormControl(
        this.chantier.materiel != null ? this.chantier.materiel : ""
      ),

      adresse: new FormControl(
        this.chantier.adresse != null ? this.chantier.adresse.split(",")[0] : ""
      ),
      complement: new FormControl(
        this.chantier.adresse != null ? this.chantier.adresse.split(",")[1] : ""
      ),
      codePostal: new FormControl(
        this.chantier.adresse != null ? this.chantier.adresse.split(",")[2] : ""
      ),
      ville: new FormControl(
        this.chantier.adresse != null ? this.chantier.adresse.split(",")[3] : ""
      ),

      estimationTemps: new FormControl(
        this.chantier.estimationTemps != null
          ? this.chantier.estimationTemps
          : 0
      ),

      telephone: new FormControl(
        this.chantier.telephone != null ? this.chantier.telephone : ""
      ),

      statusChantier: new FormControl(
        this.chantier.statusChantier != null
          ? this.convertStatus(this.chantier.statusChantier.toString())
          : ""
      ),
      nomChantier: new FormControl(
        this.chantier.nomChantier != null ? this.chantier.nomChantier : ""
      ),

      informationsInterne: new FormControl(
        this.chantier.informationsInterne != null
          ? this.chantier.informationsInterne
          : ""
      ),
      description: new FormControl(
        this.chantier.description != null ? this.chantier.description : ""
      ),

      dateDebutRegularite: new FormControl(
        this.chantier.dateDebutRegularite != null
          ? this.chantier.dateDebutRegularite
          : ""
      ),
      dateFinRegularite: new FormControl(
        this.chantier.dateFinRegularite != null
          ? this.chantier.dateFinRegularite
          : ""
      ),
    });
  }

  convertStatus(type: String): number {
    switch (type) {
      case "ENATTENTE":
        return 0;
      case "ENCOURS":
        return 1;
      case "TERMINE":
        return 2;
    }
  }
  getClients(): void {
    this.clientService.getAllClients().subscribe((data) => {
      data.forEach((element) => {
        this.clients.push(element);
      });
    });
  }

  getSites(): void {
    this.siteService.getAllSites().subscribe((data) => {
      data.forEach((element) => {
        this.sites.push(element);
      });
    });
  }

  status(state: StatusType): string {
    switch (state) {
      case StatusType.ENATTENTE:
        return "En attente";
      case StatusType.ENCOURS:
        return "En cours";
      case StatusType.TERMINE:
        return "Terminé";
    }
  }

  onSubmit(): void {
    const site = this.selectedSite;
    const client = this.selectedClient;
    const nbOuvrier =
      this.nouveauChantierForm.controls.nbOuvrier.value === ""
        ? null
        : this.nouveauChantierForm.controls.nbOuvrier.value;

    const adresse =
      this.nouveauChantierForm.controls.adresse.value +
      "," +
      this.nouveauChantierForm.controls.complement.value +
      "," +
      this.nouveauChantierForm.controls.codePostal.value +
      "," +
      this.nouveauChantierForm.controls.ville.value;

    const estimationTemps =
      this.nouveauChantierForm.controls.estimationTemps.value === ""
        ? null
        : this.nouveauChantierForm.controls.estimationTemps.value;

    const telephone =
      this.nouveauChantierForm.controls.telephone.value === ""
        ? null
        : this.nouveauChantierForm.controls.telephone.value;
    const statusChantier =
      this.nouveauChantierForm.controls.statusChantier.value === ""
        ? StatusType.ENATTENTE
        : this.nouveauChantierForm.controls.statusChantier.value;
    const nomChantier =
      this.nouveauChantierForm.controls.nomChantier.value === ""
        ? null
        : this.nouveauChantierForm.controls.nomChantier.value;
    const materiel =
      this.nouveauChantierForm.controls.materiel.value === ""
        ? null
        : this.nouveauChantierForm.controls.materiel.value;

    const regularite = this.regularite;
    const description =
      this.nouveauChantierForm.controls.description.value === ""
        ? null
        : this.nouveauChantierForm.controls.description.value;
    const informationsInterne =
      this.nouveauChantierForm.controls.informationsInterne.value === ""
        ? null
        : this.nouveauChantierForm.controls.informationsInterne.value;

    const dateDebutRegularite =
      this.nouveauChantierForm.controls.dateDebutRegularite.value === ""
        ? null
        : this.nouveauChantierForm.controls.dateDebutRegularite.value;
    const dateFinRegularite =
      this.nouveauChantierForm.controls.dateFinRegularite.value === ""
        ? null
        : this.nouveauChantierForm.controls.dateFinRegularite.value;
    const joursRegularite = this.joursRegularite;
    let chantierUpdated: Chantier;

    if (
      adresse === null ||
      telephone === null ||
      statusChantier === null ||
      nomChantier === null ||
      materiel === null ||
      description === null ||
      informationsInterne === null ||
      dateFinRegularite === null ||
      dateDebutRegularite === null
    ) {
      window.alert("Veuillez remplir les champs obligatoires!");
      return;
    } else if (this.regularite) {
      chantierUpdated = new Chantier(
        site.id,
        client.id,
        null,
        null,
        adresse,
        null,
        nbOuvrier,
        materiel,
        null,
        null,
        estimationTemps,
        telephone,
        statusChantier,
        nomChantier,
        informationsInterne,
        description,
        null,
        null,
        this.chantier.conducteurPresent,
        regularite,
        this.chantier.statusIntervention,
        null,
        null,
        null,
        joursRegularite,
        dateDebutRegularite,
        dateFinRegularite
      );
    } else {
      chantierUpdated = new Chantier(
        site.id,
        client.id,
        null,
        null,
        adresse,
        null,
        nbOuvrier,
        materiel,
        null,
        null,
        estimationTemps,
        telephone,
        statusChantier,
        nomChantier,
        informationsInterne,
        description,
        null,
        null,
        this.chantier.conducteurPresent,
        regularite,
        this.chantier.statusIntervention,
        null,
        null,
        null
      );
    }
    this.chantierService
      .updateChantierById(this.chantier.id + "", chantierUpdated)
      .subscribe((res: HttpResponse<any>) => {
        this.router.navigateByUrl("liste-chantier");
      });
  }

  changeSite(site: Site): void {
    this.selectedSite = site;
  }
  changeClient(client: Client): void {
    this.selectedClient = client;
  }
}
