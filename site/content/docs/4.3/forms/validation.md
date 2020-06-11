---
layout: docs
title: Validation
description: Provide valuable, actionable feedback to your users with HTML5 form validation, via browser default behaviors or custom styles and JavaScript.
group: forms
toc: true
---

{{< callout warning >}}
We currently recommend using custom validation styles, as native browser default validation messages are not consistently exposed to assistive technologies in all browsers (most notably, Chrome on desktop and mobile).
{{< /callout >}}

## How it works

Here's how form validation works with Bootstrap:

- HTML form validation is applied via CSS's two pseudo-classes, `:invalid` and `:valid`. It applies to `<input>`, `<select>`, and `<textarea>` elements.
- Bootstrap scopes the `:invalid` and `:valid` styles to parent `.was-validated` class, usually applied to the `<form>`. Otherwise, any required field without a value shows up as invalid on page load. This way, you may choose when to activate them (typically after form submission is attempted).
- To reset the appearance of the form (for instance, in the case of dynamic form submissions using AJAX), remove the `.was-validated` class from the `<form>` again after submission.
- As a fallback, `.is-invalid` and `.is-valid` classes may be used instead of the pseudo-classes for [server-side validation](#server-side). They do not require a `.was-validated` parent class.
- Due to constraints in how CSS works, we cannot (at present) apply styles to a `<label>` that comes before a form control in the DOM without the help of custom JavaScript.
- All modern browsers support the [constraint validation API](https://www.w3.org/TR/html5/sec-forms.html#the-constraint-validation-api), a series of JavaScript methods for validating form controls.
- Feedback messages may utilize the [browser defaults](#browser-defaults) (different for each browser, and unstylable via CSS) or our custom feedback styles with additional HTML and CSS.
- You may provide custom validity messages with `setCustomValidity` in JavaScript.

With that in mind, consider the following demos for our custom form validation styles, optional server-side classes, and browser defaults.

## Form validation styles

Our form validation styles apply custom colors, borders, focus styles, and background icons to better communicate feedback.

For form validation styles, you'll need to add the `novalidate` boolean attribute to your `<form>`. This disables the browser default form validatiom, but still provides access to the form validation APIs in JavaScript. Try to submit the form below, you'll see the `:invalid` and `:valid` styles applied to your form controls. Our JavaScript will intercept the submit button and call the `reportValidity()` method of the form validation API.

{{< example >}}
<form class="row g-3 needs-validation" novalidate>
  <div class="col-md-4">
    <label for="validationCustom01">First name</label>
    <input type="text" class="form-control" id="validationCustom01" value="Mark" required>
  </div>
  <div class="col-md-4">
    <label for="validationCustom02">Last name</label>
    <input type="text" class="form-control" id="validationCustom02" value="Otto" required>
  </div>
  <div class="col-md-4">
    <label for="validationCustomUsername">Username</label>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroupPrepend">@</span>
      </div>
      <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required>
    </div>
  </div>
  <div class="col-md-6">
    <label for="validationCustom03">City</label>
    <input type="text" class="form-control" id="validationCustom03" required>
  </div>
  <div class="col-md-3">
    <label for="validationCustom04">State</label>
    <select class="form-select" id="validationCustom04" required>
      <option selected disabled value="">Choose...</option>
      <option>...</option>
    </select>
  </div>
  <div class="col-md-3">
    <label for="validationCustom05">Zip</label>
    <input type="text" class="form-control" id="validationCustom05" required>
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
      <label class="form-check-label" for="invalidCheck">
        Agree to terms and conditions
      </label>
    </div>
  </div>
  <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
  </div>
</form>

<script>
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          form.reportValidity();
        }

        form.classList.add('was-validated');
      }, false);
    });
})();
</script>
{{< /example >}}

## Browser defaults

Not interested in custom validation feedback messages or writing JavaScript to change form behaviors? All good, you can use the browser defaults. Try submitting the form below. Depending on your browser and OS, you'll see a slightly different style of feedback.

While these feedback styles cannot be styled with CSS, you can still customize the feedback text through JavaScript.

{{< example >}}
<form class="row g-3">
  <div class="col-md-4">
    <label for="validationDefault01">First name</label>
    <input type="text" class="form-control" id="validationDefault01" value="Mark" required>
  </div>
  <div class="col-md-4">
    <label for="validationDefault02">Last name</label>
    <input type="text" class="form-control" id="validationDefault02" value="Otto" required>
  </div>
  <div class="col-md-4">
    <label for="validationDefaultUsername">Username</label>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroupPrepend2">@</span>
      </div>
      <input type="text" class="form-control" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" required>
    </div>
  </div>
  <div class="col-md-6">
    <label for="validationDefault03">City</label>
    <input type="text" class="form-control" id="validationDefault03" required>
  </div>
  <div class="col-md-3">
    <label for="validationDefault04">State</label>
    <select class="form-select" id="validationDefault04" required>
      <option selected disabled value="">Choose...</option>
      <option>...</option>
    </select>
  </div>
  <div class="col-md-3">
    <label for="validationDefault05">Zip</label>
    <input type="text" class="form-control" id="validationDefault05" required>
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required>
      <label class="form-check-label" for="invalidCheck2">
        Agree to terms and conditions
      </label>
    </div>
  </div>
  <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
  </div>
</form>
{{< /example >}}

## Server side

We recommend using client-side validation, but in case you require server-side validation, you can indicate invalid and valid form fields with `.is-invalid` and `.is-valid`.

{{< example >}}
<form class="row g-3">
  <div class="col-md-4">
    <label for="validationServer01">First name</label>
    <input type="text" class="form-control is-valid" id="validationServer01" value="Mark" required>
  </div>
  <div class="col-md-4">
    <label for="validationServer02">Last name</label>
    <input type="text" class="form-control is-valid" id="validationServer02" value="Otto" required>
  </div>
  <div class="col-md-4">
    <label for="validationServerUsername">Username</label>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroupPrepend3">@</span>
      </div>
      <input type="text" class="form-control is-invalid" id="validationServerUsername" aria-describedby="inputGroupPrepend3" required>
    </div>
  </div>
  <div class="col-md-6">
    <label for="validationServer03">City</label>
    <input type="text" class="form-control is-invalid" id="validationServer03" required>
  </div>
  <div class="col-md-3">
    <label for="validationServer04">State</label>
    <select class="form-select is-invalid" id="validationServer04" required>
      <option selected disabled value="">Choose...</option>
      <option>...</option>
    </select>
  </div>
  <div class="col-md-3">
    <label for="validationServer05">Zip</label>
    <input type="text" class="form-control is-invalid" id="validationServer05" required>
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3" required>
      <label class="form-check-label" for="invalidCheck3">
        Agree to terms and conditions
      </label>
    </div>
  </div>
  <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
  </div>
</form>
{{< /example >}}

## Supported elements

Validation styles are available for the following form controls and components:

- `<input>`s and `<textarea>`s with `.form-control` (including up to one `.form-control` in input groups)
- `.form-select`s
- `.form-check`s
- `.form-file`s

{{< example >}}
<form class="was-validated">
  <input type="text" class="form-control mb-3" placeholder="Required form control" required>

  <textarea class="form-control mb-3" placeholder="Required textarea" required></textarea>

  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="supportedInputGroupPrepend">@</span>
    </div>
    <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="supportedInputGroupPrepend" required>
  </div>

  <select class="form-select mb-3" required>
    <option value="">Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>

  <div class="form-check mb-3">
    <input type="checkbox" class="form-check-input" id="supportedCheckbox" required>
    <label class="form-check-label" for="supportedCheckbox">Check this checkbox</label>
  </div>

  <div class="form-check">
    <input type="radio" class="form-check-input" id="supportedRadio1" name="radio-supported" required>
    <label class="form-check-label" for="supportedRadio1">Toggle this radio</label>
  </div>
  <div class="form-check mb-3">
    <input type="radio" class="form-check-input" id="supportedRadio2" name="radio-supported" required>
    <label class="form-check-label" for="supportedRadio2">Or toggle this other radio</label>
  </div>

  <div class="form-file">
    <input type="file" class="form-file-input" id="supportedFormFile" required>
    <label class="form-file-label" for="supportedFormFile">
      <span class="form-file-text">Choose file...</span>
      <span class="form-file-button">Browse</span>
    </label>
  </div>
</form>
{{< /example >}}

## Feedback messages

You can insert custom feedback messages with the `.valid-feedback` or `.invalid-feedback` that replaces the browser’s default feedback messages.

{{< example >}}
<form>
  <div class="mb-3">
    <input type="text" class="form-control is-valid" value="Form control" aria-describedby="messageFeedbackFormControl" required>
    <div class="valid-feedback" id="messageFeedbackFormControl">
      Example valid feedback text
    </div>
  </div>

  <div class="mb-3">
    <textarea class="form-control is-valid" aria-describedby="messageFeedbackTextarea" required>Textarea</textarea>
    <div class="valid-feedback" id="messageFeedbackTextarea">
      Example valid feedback text
    </div>
  </div>

  <div class="mb-3">
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text" id="feedbackInputGroupPrepend">@</span>
      </div>
      <input type="text" class="form-control is-invalid" placeholder="Username" aria-label="Username" aria-describedby="feedbackInputGroupPrepend messageFeedbackInputGroup" required>
    </div>
    <div class="invalid-feedback" id="messageFeedbackInputGroup">
      Example invalid feedback text
    </div>
  </div>

  <div class="mb-3">
    <select class="form-select is-invalid" aria-describedby="messageFeedbackSelect" required>
      <option value="">Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
    <div class="invalid-feedback" id="messageFeedbackSelect">
      Example invalid feedback text
    </div>
  </div>

  <div class="mb-3">
    <div class="form-check">
      <input type="checkbox" class="form-check-input is-invalid" id="feedbackCheckbox" aria-describedby="messageFeedbackCheckbox" required>
      <label class="form-check-label" for="feedbackCheckbox">Check this checkbox</label>
    </div>
    <div class="invalid-feedback" id="messageFeedbackCheckbox">
      Example invalid feedback text
    </div>
  </div>

  <div class="mb-3" aria-describedby="messageFeedbackRadioGroup">
    <div class="form-check">
      <input type="radio" class="form-check-input is-invalid" id="feedbackRadio1" name="radio-feedback" required>
      <label class="form-check-label" for="feedbackRadio1">Toggle this radio</label>
    </div>
    <div class="form-check">
      <input type="radio" class="form-check-input is-invalid" id="feedbackRadio2" name="radio-feedback" required>
      <label class="form-check-label" for="feedbackRadio2">Or toggle this other radio</label>
    </div>
    <div class="invalid-feedback" id="messageFeedbackRadioGroup">
      Example invalid feedback text
    </div>
  </div>

  <div class="form-file">
    <input type="file" class="form-file-input is-invalid" id="feedbackFile" aria-describedby="messageFeedbackFile" required>
    <label class="form-file-label" for="feedbackFile">
      <span class="form-file-text">Choose file...</span>
      <span class="form-file-button">Browse</span>
    </label>
  </div>
  <div class="invalid-feedback" id="messageFeedbackFile">
    Example invalid feedback text
  </div>
</form>
{{< /example >}}

## Tooltips

If your form layout allows it, you can swap the `.{valid|invalid}-feedback` classes for `.{valid|invalid}-tooltip` classes to display validation feedback in a styled tooltip. Be sure to have a parent with `position: relative` on it for tooltip positioning. In the example below, our column classes have this already, but your project may require an alternative setup.

{{< example >}}
<form>
  <div class="position-relative mb-5">
    <input type="text" class="form-control is-valid" value="Form control" aria-describedby="messageTooltipFormControl" required>
    <div class="valid-tooltip" id="messageTooltipFormControl">
      Example valid feedback text
    </div>
  </div>

  <div class="position-relative mb-5">
    <textarea class="form-control is-valid" aria-describedby="messageTooltipTextarea" required>Textarea</textarea>
    <div class="valid-tooltip" id="messageTooltipTextarea">
      Example valid feedback text
    </div>
  </div>

  <div class="position-relative mb-5">
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text" id="tooltipInputGroupPrepend">@</span>
      </div>
      <input type="text" class="form-control is-invalid" placeholder="Username" aria-label="Username" aria-describedby="tooltipInputGroupPrepend messageTooltipInputGroup" required>
    </div>
    <div class="invalid-tooltip" id="messageTooltipInputGroup">
      Example invalid feedback text
    </div>
  </div>

  <div class="position-relative mb-5">
    <select class="form-select is-invalid" aria-describedby="messageTooltipSelect" required>
      <option value="">Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
    <div class="invalid-tooltip" id="messageTooltipSelect">
      Example invalid feedback text
    </div>
  </div>

  <div class="position-relative mb-5">
    <div class="form-check">
      <input type="checkbox" class="form-check-input is-invalid" id="tooltipCheckbox" aria-describedby="messageTooltipCheckbox" required>
      <label class="form-check-label" for="tooltipCheckbox">Check this checkbox</label>
    </div>
    <div class="invalid-tooltip" id="messageTooltipCheckbox">
      Example invalid feedback text
    </div>
  </div>

  <div class="position-relative mb-5" aria-describedby="messageTooltipRadioGroup">
    <div class="form-check">
      <input type="radio" class="form-check-input is-invalid" id="tooltipRadio1" name="radio-feedback" required>
      <label class="form-check-label" for="tooltipRadio1">Toggle this radio</label>
    </div>
    <div class="form-check">
      <input type="radio" class="form-check-input is-invalid" id="tooltipRadio2" name="radio-feedback" required>
      <label class="form-check-label" for="tooltipRadio2">Or toggle this other radio</label>
    </div>
    <div class="invalid-tooltip" id="messageTooltipRadioGroup">
      Example invalid feedback text
    </div>
  </div>

  <div class="position-relative mb-5">
    <div class="form-file">
      <input type="file" class="form-file-input is-invalid" id="tooltipFile" aria-describedby="messageTooltipFile" required>
      <label class="form-file-label" for="tooltipFile">
        <span class="form-file-text">Choose file...</span>
        <span class="form-file-button">Browse</span>
      </label>
    </div>
    <div class="invalid-tooltip" id="messageTooltipFile">
      Example invalid feedback text
    </div>
  </div>
</form>
{{< /example >}}

## Customizing

Validation states can be customized via Sass with the `$form-validation-states` map. Located in our `_variables.scss` file, this Sass map is looped over to generate the default `valid`/`invalid` validation states. Included is a nested map for customizing each state's color and icon. While no other states are supported by browsers, those using custom styles can easily add more complex form feedback.

Please note that we do not recommend customizing these values without also modifying the `form-validation-state` mixin.

{{< highlight scss >}}
// Sass map from `_variables.scss`
// Override this and recompile your Sass to generate different states
$form-validation-states: (
  "valid": (
    "color": $form-feedback-valid-color,
    "icon": $form-feedback-icon-valid
  ),
  "invalid": (
    "color": $form-feedback-invalid-color,
    "icon": $form-feedback-icon-invalid
  )
);

// Loop from `_forms.scss`
// Any modifications to the above Sass map will be reflected in your compiled
// CSS via this loop.
@each $state, $data in $form-validation-states {
  @include form-validation-state($state, map-get($data, color), map-get($data, icon));
}
{{< /highlight >}}
