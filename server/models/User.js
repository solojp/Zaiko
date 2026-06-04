import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: false,
    },
    role: {
      type: String,
      enum: ['owner', 'manager', 'staff'],
      default: 'staff',
    },
    notifications: {
      email: { type: Boolean, default: true },
      inApp: { type: Boolean, default: true },
    },
    connectedEmail: {
      provider: { type: String, enum: ['gmail', 'outlook'], default: null },
      email: { type: String, default: null },
      accessToken: { type: String, default: null },
      refreshToken: { type: String, default: null },
      expiresAt: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//static login method
userSchema.statics.login = async function(email, password) {
   //Validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  //validating credentials
  const user = await this.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return user
  } else {
    throw Error('Invalid email or password');
  }
}

export default mongoose.model('User', userSchema);
