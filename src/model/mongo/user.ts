import { Schema, model } from 'mongoose';
import ICrud from '../Icrud';

interface IUser {
  id: string;
  name: string;
  mail: string;
  pass: string;
  salt: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
}, { id: true });

const userModel = model('user', userSchema);

class User implements ICrud<IUser> {
  selectByid(id: string): IUser {

  }

  selectAll(): IUser {

  }

  select(params: Record<string, unknown>): IUser {

  }

  insert(ele: T): IUser {

  }

  update(ele: T): IUser {

  }

  delete(id: string): void {

  }
}

export default User;
