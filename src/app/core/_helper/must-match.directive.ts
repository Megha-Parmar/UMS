import { Directive, Input } from "@angular/core";
import { NG_VALIDATORS, Validator, FormGroup, ValidationErrors } from "@angular/forms";
import { MustMatch } from "./must-match.validator";


@Directive({
    selector: '[mustMatch]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true }],
    standalone:true
})
export class MustMatchDirective implements Validator {
    @Input('mustMatch') mustMatch: string[] = [];

    validate(formGroup: FormGroup): ValidationErrors | null {
        return MustMatch(this.mustMatch[0], this.mustMatch[1])(formGroup);
    }
}