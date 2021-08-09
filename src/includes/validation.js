import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate';
import {
  required,
  min,
  max,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as excluded,
  image
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('category', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('email', email);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('passwords_mismatch', confirmed);
    defineRule('country_excluded', excluded);
    defineRule('image', image);

    configure({
      generateMessage: ctx => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          category: 'The field category is required.',
          min: `The field ${ctx.field}'s min length is ${ctx.rule.params[0]}`,
          max: `The field ${ctx.field}'s max length is ${ctx.rule.params[0]}`,
          email: `The field ${ctx.field} must be a valid email`,
          min_value: `The field ${ctx.field}'s min value is ${ctx.rule.params[0]}`,
          max_value: `The field ${ctx.field}'s max value is ${ctx.rule.params[0]}`,
          excluded: `You are not allowed to use this value for the field ${ctx.field}`,
          country_excluded: 'Due to restrictions, we do not accept users from this location.',
          passwords_mismatch: "The password don't match.",
          image:
            'This type of image is not accepted, Please upload the image ends with png, jpg, or jpeg.'
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    });
  }
};
