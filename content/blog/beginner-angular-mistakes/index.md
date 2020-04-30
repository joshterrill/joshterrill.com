---
title: 4 Beginner Angular Mistakes
description: Angular is an attractive language for a lot of people just getting into web development, here are a list of 4 common mistakes beginners make, and how to fix them.
date: "2020-04-29T23:48:03.284Z"
---

### Mistake 1: Using `[(ngModel)]` instead of ReactiveForms

When learning Angular, one of the first things that you learn is how to do one and two-way binding to input fields using `[(ngModel)]`. If you're not used to frameworks that give you two-way binding this can seem magical. The syntax is so easy and powerful, why wouldn't you use it everywhere? After writing some `ngModel` input bindings, you now need to write some validation. Then maybe you need to display some text to inform a user that they need to fill something out, maybe highlight the input with a red border, etc. Using `ngModel`, all of this would need to be written from scratch, and it's not very portable or reusable. Angular offers another API called `ReactiveForms` which comes from `@angular/forms`. Although it may take a bit longer to set a form up, it gives you all of the API's to check individual input and overall form validation.

Example:


```html
<form [formGroup]="loginForm" (submit)="onFormSubmit()">
    <input
        type="email"
        placeholder="Email" 
        formControlName="email"
        [ngClass]="{'invalid': !loginForm.email.valid}"
    />
    <p class="error" *ngIf="!loginForm.email.valid">Email is required</p>
    <input
        type="password"
        placeholder="Password"
        formControlName="password"
        [ngClass]="{'invalid': !loginForm.password.valid}"
    />
    <p class="error" *ngIf="!loginForm.password.valid">Password is required</p>
    <button type="submit">Submit</button>
</form>
```

```javascript
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// ...
loginForm: FormGroup;
//...
constructor(private formBuilder: FormBuilder) { }
// ...
initializeForms() {
    this.loginForm = this.formBuilder.group({
        email: ["", Validators.required],
        password: ["", Validators.required],
    });
}
onFormSubmit() {
    if (!this.loginForm.valid) {
        // throw some error
        return;
    }
    this.login({email: this.loginForm.value.email, password: this.loginForm.value.password});
}
```

With just a little more initial setup, we have the ability to add validators in the `formBuilder`, we have access to overall form validation using `this.loginForm.valid` and we have access to individual input validation using `this.loginForm.email.valid`. Using these properties, we can handle all of the validation UI that we might want to put on a form.

### Mistake 2: Returning BehaviorSubjects instead of Promises in REST calls

As of `@angular/http` version TODO, all REST calls return as a BehaviorSubject. I think this is a little annoying and makes the syntax a bit harder to read compared to promises. Thankfully, all Behavior Subjects can be turned into promises just by adding `.toPromise()` to the end of them. Returning these as promises allows for taking this syntax:

```javascript
this.someBehaviorSubject().subscribe(res => {
    // do something with res
}, error => {
    // do something with error
});
```

And turn it into:

```javascript
try {
    const res = await this.someBehaviorSubject().toPromise();
    // do something with res
} catch (error) {
    // do something with error
}
```

Which is I believe is easier to read, and also makes more sense considering REST calls in *MOST* cases do not take advantage of the things that a BehaviorSubject offers. *MOST* of the time, REST calls are single calls, either they work, or they don't and you handle the error.

### Mistake 3: Importing all of your components in one `app.module.ts`

TODO

### Mistake 4: Thinking about components as *pages* instead of **components**

For some reason, I have seen many people think about Angular Components more as *pages* of a web application rather than individual components. It appears that this ends up leading to Angular Components having functionality that should be broken up into several smaller components. TODO

