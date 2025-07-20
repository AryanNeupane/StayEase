

const Joi = require('joi');

const listingJoiSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().uri().allow('').default(
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ).custom((value, helpers) => {
    // if empty string, replace with default URL (same as your setter in mongoose)
    if (value === '') {
      return "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }
    return value;
  }),
  price: Joi.number().required().min(0),
  location: Joi.string().required(),
  country: Joi.string().required()
});

module.exports = { listingJoiSchema };
