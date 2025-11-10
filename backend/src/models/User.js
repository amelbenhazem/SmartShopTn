const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom est requis'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est requis'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['client', 'admin'],
      default: 'client',
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new) and is not already hashed
  if (!this.isModified('password')) return next();
  
  // Check if password is already hashed (bcrypt hashes start with $2a$ or $2b$)
  if (this.password && (this.password.startsWith('$2a$') || this.password.startsWith('$2b$'))) {
    return next();
  }
  
  // Hash the password
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);


