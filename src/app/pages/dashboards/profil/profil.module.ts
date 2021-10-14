import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilComponent } from "./profil.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { IconModule } from "@visurel/iconify-angular";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSliderModule } from "@angular/material/slider";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { SecondaryToolbarModule } from "../../../../@vex/components/secondary-toolbar/secondary-toolbar.module";
import { BreadcrumbsModule } from "../../../../@vex/components/breadcrumbs/breadcrumbs.module";
import { ContainerModule } from "../../../../@vex/directives/container/container.module";
import { FormElementsRoutingModule } from "../../ui/forms/form-elements/form-elements-routing.module";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { MatFileUploadModule } from "mat-file-upload";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


@NgModule({
  declarations: [ProfilComponent],
  imports: [
    CommonModule,
    FormElementsRoutingModule,
    FlexLayoutModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    IconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    ContainerModule,
    AngularFileUploaderModule,
    MatFileUploadModule,
    MaterialFileInputModule,
    MatProgressSpinnerModule
  ],
})
export class ProfilModule {}
