const { createUser, updateUser } = require("./api/users");
const { validationMessages, printErrors } = require("./pro/validation");

function saveUser(user) {
  if (user.id == null) {
    console.log("Created user");
    createUser(user);
  } else {
    console.log("Updated user");
    updateUser(user);
  }
}

function validateUser(user) {
  const validations = {
    username: {
      required: true,
      length: 3,
    },
    password: {
      required: true,
      length: 8,
    },
  };

  const errors = validationMessages(validations, user);

  return {
    valid: Object.values(errors).every((message) => message.length === 0),
    errors: errors,
  };
}

const user = {
  username: "WDS",
  password: "password",
};

const { valid, errors } = validateUser(user);

if (valid) {
  saveUser(user);
} else {
  printErrors(errors);
}
